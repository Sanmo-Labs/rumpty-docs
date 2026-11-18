#!/usr/bin/env node
// Generates the API reference from the OpenAPI spec in rumpty-backend.
//
//   npm run api:gen                         # reads ../rumpty-backend/docs/openapi
//   RUMPTY_OPENAPI_DIR=/path npm run api:gen
//   RUMPTY_API_CHECK=1 npm run api:gen      # validate only, write nothing
//
// Outputs (committed, so the site builds without the backend checked out):
//   static/openapi.json          bundled spec, downloadable from the docs
//   docs/api/<tag>/*.mdx         one overview page per tag, one page per operation
//   src/api/sidebar.json         sidebar items consumed by sidebars.ts
import {readFile, writeFile, readdir, rm, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const specDir = path.resolve(process.env.RUMPTY_OPENAPI_DIR ?? path.join(siteDir, '../rumpty-backend/docs/openapi'));
const apiDocsDir = path.join(siteDir, 'docs/api');
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];
const errors = [];

// ---------- load & merge ----------
async function loadSpec() {
  const base = YAML.parse(await readFile(path.join(specDir, 'base.yaml'), 'utf8'));
  const order = YAML.parse(await readFile(path.join(specDir, 'resources/_order.yaml'), 'utf8'));
  const spec = {...base, tags: [], paths: {}, components: Object.fromEntries(Object.entries(base.components).map(([k, v]) => [k, {...v}]))};
  for (const file of order) {
    const doc = YAML.parseDocument(await readFile(path.join(specDir, 'resources', file), 'utf8'));
    const frag = doc.toJS();
    // JS objects iterate integer-like keys ("200", "202") numerically; keep the spec's response order.
    for (const [p, item] of Object.entries(frag.paths ?? {})) {
      for (const m of Object.keys(item)) {
        const node = doc.getIn(['paths', p, m, 'responses']);
        if (node?.items) item[m]['x-response-order'] = node.items.map(i => String(i.key.value ?? i.key));
      }
    }
    spec.tags.push(...(frag.tags ?? []));
    for (const [p, item] of Object.entries(frag.paths ?? {})) {
      spec.paths[p] = {...spec.paths[p]};
      for (const [m, op] of Object.entries(item)) {
        if (spec.paths[p][m]) errors.push(`${file}: duplicate operation ${m.toUpperCase()} ${p}`);
        spec.paths[p][m] = op;
      }
    }
    for (const [section, entries] of Object.entries(frag.components ?? {})) {
      spec.components[section] ??= {};
      for (const [name, value] of Object.entries(entries)) {
        if (spec.components[section][name]) errors.push(`${file}: duplicate components.${section}.${name}`);
        spec.components[section][name] = value;
      }
    }
  }
  return spec;
}

// ---------- schema helpers ----------
function makeResolver(spec) {
  const deref = (node, seen = new Set()) => {
    if (!node || typeof node !== 'object') return node;
    if (node.$ref) {
      if (seen.has(node.$ref)) return {type: 'object', description: '(recursive)'};
      const target = node.$ref.replace(/^#\//, '').split('/').reduce((o, k) => o?.[k], spec);
      if (!target) { errors.push(`unresolved $ref ${node.$ref}`); return {}; }
      const {$ref, ...rest} = node;
      return deref({...target, ...rest}, new Set([...seen, node.$ref]));
    }
    if (node.allOf) {
      const parts = node.allOf.map(p => deref(p, seen));
      const {allOf, ...rest} = node;
      return parts.reduce(mergeSchemas, deref(rest, seen));
    }
    if (Array.isArray(node)) return node.map(n => deref(n, seen));
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, k === 'example' ? v : deref(v, seen)]));
  };
  return deref;
}

function mergeSchemas(a, b) {
  const out = {...a, ...b};
  if (a.properties || b.properties) {
    out.properties = {...a.properties};
    for (const [k, v] of Object.entries(b.properties ?? {})) {
      out.properties[k] = out.properties[k] ? mergeSchemas(out.properties[k], v) : v;
    }
  }
  if (a.required || b.required) out.required = [...new Set([...(a.required ?? []), ...(b.required ?? [])])];
  if (!b.type && a.type) out.type = a.type;
  return out;
}

function typeLabel(s) {
  if (!s) return 'any';
  const types = [].concat(s.type ?? (s.properties ? 'object' : 'any'));
  const nullable = types.includes('null');
  let t = types.filter(x => x !== 'null')[0] ?? 'any';
  if (t === 'array') t = `array of ${typeLabel(s.items)}s`.replace(/ys$/, 'ies').replace(/(ss|xs)s$/, '$1');
  if (s.format && t === 'string') t = `string (${s.format})`;
  return nullable ? `${t} | null` : t;
}

function exampleFor(s, depth = 0) {
  if (!s || depth > 6) return null;
  if (s.example !== undefined) return s.example;
  if (s.default !== undefined) return s.default;
  if (s.enum) return s.enum[0];
  const t = [].concat(s.type ?? (s.properties ? 'object' : 'string')).find(x => x !== 'null');
  if (t === 'object') return Object.fromEntries(Object.entries(s.properties ?? {}).map(([k, v]) => [k, exampleFor(v, depth + 1)]));
  if (t === 'array') return [exampleFor(s.items, depth + 1)];
  return {integer: 0, number: 0, boolean: false}[t] ?? (s.format === 'date-time' ? '2026-11-18T10:24:00Z' : 'string');
}

// ---------- MDX helpers ----------
// Escape MDX-significant characters in prose, leaving code spans/blocks alone.
const mdx = text => {
  if (text != null && typeof text !== 'string') {
    errors.push(`description is not a string (unquoted ": " in YAML?): ${JSON.stringify(text).slice(0, 120)}`);
    return '';
  }
  return mdxText(text);
};
const mdxText = text => (text ?? '').trim().split(/(```[\s\S]*?```|`[^`\n]*`)/g)
  .map((part, i) => (i % 2 ? part : part.replace(/[{}]/g, c => `\\${c}`).replace(/<(?!br\s*\/?>)/g, '&lt;')))
  .join('');
const attr = v => `{${JSON.stringify(v)}}`;
const firstSentence = text => (text ?? '').replace(/[`*_]/g, '').split(/(?<=\.)\s/)[0].replace(/\s+/g, ' ').trim();
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function renderParam(name, schema, required, depth = 0, open = false) {
  const props = [`name=${attr(name)}`, `type=${attr(typeLabel(schema))}`];
  if (required) props.push('required');
  if (schema.default !== undefined) props.push(`defaultValue=${attr(typeof schema.default === 'string' ? schema.default : JSON.stringify(schema.default))}`);
  const enumValues = schema.enum ?? schema.items?.enum;
  if (enumValues) props.push(`enumValues=${attr(enumValues)}`);
  const constraints = [];
  if (schema.minimum !== undefined) constraints.push(`min ${schema.minimum}`);
  if (schema.maximum !== undefined) constraints.push(`max ${schema.maximum}`);
  if (schema.minLength !== undefined) constraints.push(`min length ${schema.minLength}`);
  if (schema.maxLength !== undefined) constraints.push(`max length ${schema.maxLength}`);
  if (constraints.length) props.push(`constraints=${attr(constraints.join(' · '))}`);
  const children = childProps(schema);
  const lines = [`<Param ${props.join(' ')}>`, ''];
  if (schema.description) lines.push(mdx(schema.description), '');
  if (children) {
    lines.push(`<ParamChildren${open ? ' open' : ''} label=${attr(schema.type === 'array' || [].concat(schema.type).includes('array') ? 'item attributes' : 'attributes')}>`, '');
    for (const [k, v] of Object.entries(children.properties)) lines.push(renderParam(k, v, children.required?.includes(k), depth + 1), '');
    lines.push('</ParamChildren>', '');
  }
  lines.push('</Param>');
  return lines.join('\n');
}

function childProps(schema) {
  const s = [].concat(schema.type).includes('array') ? schema.items : schema;
  return s?.properties && Object.keys(s.properties).length ? s : null;
}

// ---------- code samples ----------
function pyLiteral(v, indent = 0) {
  const pad = '    '.repeat(indent + 1), end = '    '.repeat(indent);
  if (v === null) return 'None';
  if (typeof v === 'boolean') return v ? 'True' : 'False';
  if (typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return v.length ? `[\n${v.map(x => pad + pyLiteral(x, indent + 1)).join(',\n')},\n${end}]` : '[]';
  const e = Object.entries(v);
  return e.length ? `{\n${e.map(([k, x]) => `${pad}${JSON.stringify(k)}: ${pyLiteral(x, indent + 1)}`).join(',\n')},\n${end}}` : '{}';
}

// download: the file name to save a non-JSON success response (e.g. a PDF) to.
function codeSamples({method, url, headers, body, download}) {
  const M = method.toUpperCase();
  const curl = [`curl -X ${M} "${url}"`, `  -H "Authorization: Bearer $RUMPTY_TOKEN"`,
    ...Object.entries(headers).map(([k, v]) => `  -H "${k}: ${v}"`)];
  if (body !== undefined) curl.push(`  -H "Content-Type: application/json"`, `  -d '${JSON.stringify(body, null, 2).replace(/'/g, "'\\''")}'`);
  if (download) curl.push(`  -o ${download}`);

  const jsHeaders = [`    Authorization: \`Bearer \${process.env.RUMPTY_TOKEN}\`,`,
    ...Object.entries(headers).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`)];
  if (body !== undefined) jsHeaders.push(`    "Content-Type": "application/json",`);
  const js = [`const response = await fetch("${url}", {`, `  method: "${M}",`, '  headers: {', ...jsHeaders, '  },'];
  if (body !== undefined) js.push(`  body: JSON.stringify(${JSON.stringify(body, null, 2).replace(/\n/g, '\n  ')}),`);
  js.push('});', '');
  if (download) js.unshift('import {writeFile} from "node:fs/promises";', ''), js.push(`await writeFile("${download}", Buffer.from(await response.arrayBuffer()));`);
  else js.push('const result = await response.json();');

  const pyHeaders = [`"Authorization": f"Bearer {os.environ['RUMPTY_TOKEN']}"`, ...Object.entries(headers).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`)];
  const py = ['import os', 'import requests', '', `response = requests.${method}(`, `    "${url}",`,
    `    headers={${pyHeaders.join(', ')}},`];
  if (body !== undefined) py.push(`    json=${pyLiteral(body, 1)},`);
  py.push(')', '');
  if (download) py.push(`with open("${download}", "wb") as f:`, '    f.write(response.content)');
  else py.push('result = response.json()');

  return [['cURL', 'bash', curl.join(' \\\n')], ['JavaScript', 'js', js.join('\n')], ['Python', 'python', py.join('\n')]];
}

// ---------- page rendering ----------
function renderOperation(spec, deref, {pathKey, method, op, tag}) {
  const params = (op.parameters ?? []).map(p => deref(p));
  const byIn = where => params.filter(p => p.in === where);
  const server = spec.servers[0].url;
  const workspaceScoped = byIn('header').some(p => p.name === 'X-Workspace-Slug');
  const isPublic = Array.isArray(op.security) && op.security.length === 0;

  const pathExample = pathKey.replace(/\{(\w+)\}/g, (_, n) => {
    const p = byIn('path').find(x => x.name === n);
    return p?.example ?? p?.schema?.example ?? `<${n}>`;
  });
  const query = byIn('query').filter(p => p.required).map(p => `${p.name}=${encodeURIComponent(p.example ?? p.schema?.example ?? exampleFor(p.schema))}`);
  const url = `${server}${pathExample}${query.length ? `?${query.join('&')}` : ''}`;
  const headers = Object.fromEntries(byIn('header').map(p => [p.name, p.example ?? p.schema?.example ?? 'value']));

  const json = op.requestBody?.content?.['application/json'];
  const bodySchema = json ? deref(json.schema) : null;
  const bodyExample = json ? (json.example ?? exampleFor(bodySchema)) : undefined;

  const order = op['x-response-order'] ?? Object.keys(op.responses ?? {});
  const responses = order.map(status => [status, op.responses[status]]).map(([status, r]) => {
    const res = deref(r);
    const c = res.content?.['application/json'];
    return {status, description: res.description, schema: c?.schema ? deref(c.schema) : null, example: c?.example ?? (c?.schema ? exampleFor(deref(c.schema)) : undefined)};
  });
  const success = responses.filter(r => r.status.startsWith('2'));
  // A success response with no JSON body (e.g. application/pdf) is a file download.
  const fileType = order.filter(s => s.startsWith('2')).map(s => Object.keys(deref(op.responses[s]).content ?? {}))
    .find(types => types.length && !types.includes('application/json'))?.[0];
  const download = fileType ? `${op['x-slug'].replace(/^(get|download)-(a|an|the)-/, '').replace(/-(pdf|csv|zip)$/, '')}.${fileType.split('/').pop()}` : undefined;
  const failures = responses.filter(r => !r.status.startsWith('2'));

  const L = [];
  L.push('---', `title: ${JSON.stringify(op.summary)}`, `sidebar_label: ${JSON.stringify(op.summary)}`,
    `description: ${JSON.stringify(firstSentence(op.description) || op.summary)}`,
    `sidebar_class_name: api-sidebar-item api-sidebar-item--${method}`, 'hide_table_of_contents: true',
    `custom_edit_url: null`, '---', '',
    '{/* Generated by scripts/gen-api-docs.mjs from rumpty-backend/docs/openapi. Do not edit by hand. */}',
    '',
    "import Tabs from '@theme/Tabs';", "import TabItem from '@theme/TabItem';",
    "import {ApiPage, ApiMain, ApiAside, Endpoint, Param, ParamChildren, ResponseBlock} from '@site/src/components/ApiReference';",
    '', '<ApiPage>', '<ApiMain>', '',
    `<Endpoint method=${attr(method.toUpperCase())} path=${attr(pathKey)} />`, '', mdx(op.description), '');

  L.push('## Authentication', '');
  if (isPublic) L.push('This endpoint is public. No API key is needed.', '');
  else L.push(`Send your [API key](/api#authentication) as \`Authorization: Bearer <token>\`.${workspaceScoped ? ' The request is scoped to the workspace in `X-Workspace-Slug`.' : ''}`, '');

  for (const [where, title] of [['path', 'Path parameters'], ['query', 'Query parameters'], ['header', 'Headers']]) {
    const list = byIn(where);
    if (!list.length) continue;
    L.push(`## ${title}`, '');
    for (const p of list) L.push(renderParam(p.name, {...p.schema, description: p.description ?? p.schema?.description}, p.required), '');
  }

  if (bodySchema) {
    L.push('## Request body', '');
    if (bodySchema.description) L.push(mdx(bodySchema.description), '');
    for (const [k, v] of Object.entries(bodySchema.properties ?? {})) L.push(renderParam(k, v, bodySchema.required?.includes(k)), '');
  }

  for (const r of success) {
    L.push(`## Response`, '', `<ResponseBlock status=${attr(r.status)}>`, '', mdx(r.description), '', '</ResponseBlock>', '');
    for (const [k, v] of Object.entries(r.schema?.properties ?? {})) L.push(renderParam(k, v, r.schema.required?.includes(k), 0, k === 'data'), '');
  }

  if (failures.length) {
    L.push('## Errors', '', '| Status | Meaning |', '|---|---|');
    for (const r of failures) L.push(`| \`${r.status}\` | ${mdx(r.description).replace(/\n+/g, ' ').replace(/\|/g, '\\|')} |`);
    L.push('', 'Errors use the [standard error format](/api#errors).', '');
  }

  L.push('</ApiMain>', '<ApiAside>', '', '<Tabs groupId="api-language" className="api-code-tabs">', '');
  for (const [label, lang, code] of codeSamples({method, url, headers, body: bodyExample, download})) {
    L.push(`<TabItem value=${attr(slugify(label))} label=${attr(label)}>`, '', '```' + lang, code, '```', '', '</TabItem>', '');
  }
  L.push('</Tabs>', '');
  const shown = [...success, ...failures.slice(0, 1)].filter(r => r.example !== undefined);
  if (shown.length) {
    L.push('<Tabs groupId="api-response" className="api-response-tabs">', '');
    for (const r of shown) {
      L.push(`<TabItem value=${attr(r.status)} label=${attr(`Response ${r.status}`)}>`, '', '```json', JSON.stringify(r.example, null, 2), '```', '', '</TabItem>', '');
    }
    L.push('</Tabs>', '');
  }
  L.push('</ApiAside>', '</ApiPage>', '');
  return L.join('\n');
}

function renderTagIndex(tag, ops) {
  const L = ['---', `title: ${JSON.stringify(tag.name)}`, `sidebar_label: Overview`,
    `description: ${JSON.stringify(firstSentence(tag.description) || `${tag.name} API`)}`, 'custom_edit_url: null', '---', '',
    '{/* Generated by scripts/gen-api-docs.mjs. Do not edit by hand. */}', '',
    "import {MethodBadge} from '@site/src/components/ApiReference';", '', mdx(tag.description), '', '## Endpoints', '',
    '| Endpoint | Description |', '|---|---|'];
  for (const o of ops) {
    L.push(`| <MethodBadge method=${attr(o.method.toUpperCase())} /> [\`${o.pathKey}\`](/api/${tag['x-slug']}/${o.op['x-slug']}) | ${mdx(o.op.summary)} |`);
  }
  return L.join('\n') + '\n';
}

// ---------- main ----------
async function main() {
  try { await readdir(specDir); } catch {
    console.warn(`[api:gen] spec not found at ${specDir}; keeping committed API docs.`);
    return;
  }
  const spec = await loadSpec();
  const deref = makeResolver(spec);

  const byTag = new Map(spec.tags.map(t => [t.name, {tag: t, ops: []}]));
  const slugs = new Set(), opIds = new Set();
  for (const [pathKey, item] of Object.entries(spec.paths)) {
    for (const method of METHODS) {
      const op = item[method];
      if (!op) continue;
      const where = `${method.toUpperCase()} ${pathKey}`;
      for (const field of ['operationId', 'summary', 'x-slug', 'description']) if (!op[field]) errors.push(`${where}: missing ${field}`);
      const group = byTag.get(op.tags?.[0]);
      if (!group) { errors.push(`${where}: unknown tag ${op.tags?.[0]}`); continue; }
      const slug = `${group.tag['x-slug']}/${op['x-slug']}`;
      if (slugs.has(slug)) errors.push(`${where}: duplicate page slug ${slug}`);
      if (opIds.has(op.operationId)) errors.push(`${where}: duplicate operationId ${op.operationId}`);
      slugs.add(slug); opIds.add(op.operationId);
      group.ops.push({pathKey, method, op, tag: group.tag});
    }
  }

  // Render everything first so a broken spec leaves the committed output untouched.
  const files = new Map();
  const tagCategories = new Map();
  for (const {tag, ops} of byTag.values()) {
    if (!tag['x-slug']) { errors.push(`tag ${tag.name}: missing x-slug`); continue; }
    const dir = tag['x-slug'];
    files.set(`${dir}/index.mdx`, renderTagIndex(tag, ops));
    const items = [];
    for (const o of ops) {
      files.set(`${dir}/${o.op['x-slug']}.mdx`, renderOperation(spec, deref, o));
      items.push(`api/${dir}/${o.op['x-slug']}`);
    }
    tagCategories.set(tag.name, {type: 'category', label: tag.name, link: {type: 'doc', id: `api/${dir}/index`}, items});
  }

  // Top-level sections are fixed headings (the theme styles level-1 categories as non-clickable labels);
  // resource groups inside them are collapsible.
  const sections = spec['x-sidebar-sections'] ?? [];
  const placed = new Set();
  const sidebar = sections.map((section, i) => ({
    type: 'category', label: section.label, collapsible: false, collapsed: false,
    items: [...(i === 0 ? ['api/index'] : []), ...section.tags.map(name => {
      if (!tagCategories.has(name)) errors.push(`x-sidebar-sections: unknown tag ${name}`);
      if (placed.has(name)) errors.push(`x-sidebar-sections: tag ${name} listed twice`);
      placed.add(name);
      return tagCategories.get(name);
    }).filter(Boolean)],
  }));
  for (const name of tagCategories.keys()) if (!placed.has(name)) errors.push(`x-sidebar-sections: tag ${name} is not in any section`);

  if (errors.length) {
    console.error(`[api:gen] spec has ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}`);
    process.exit(1);
  }

  if (process.env.RUMPTY_API_CHECK) {
    console.log(`[api:gen] check passed: ${opIds.size} operations across ${byTag.size} groups (nothing written)`);
    return;
  }

  for (const entry of await readdir(apiDocsDir, {withFileTypes: true}).catch(() => [])) {
    if (entry.isDirectory()) await rm(path.join(apiDocsDir, entry.name), {recursive: true});
  }
  for (const [rel, content] of files) {
    await mkdir(path.dirname(path.join(apiDocsDir, rel)), {recursive: true});
    await writeFile(path.join(apiDocsDir, rel), content);
  }
  await mkdir(path.join(siteDir, 'src/api'), {recursive: true});
  await writeFile(path.join(siteDir, 'src/api/sidebar.json'), JSON.stringify(sidebar, null, 2) + '\n');
  await writeFile(path.join(siteDir, 'static/openapi.json'), JSON.stringify(spec, null, 2) + '\n');
  console.log(`[api:gen] ${opIds.size} operations across ${byTag.size} groups → docs/api`);
}

main().catch(err => { console.error(err); process.exit(1); });
