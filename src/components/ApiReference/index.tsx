import React, {useState, type ReactNode} from 'react';
import clsx from 'clsx';

export function ApiPage({children}: {children: ReactNode}) {
  return <div className="api-page">{children}</div>;
}

export function ApiMain({children}: {children: ReactNode}) {
  return <div className="api-page__main">{children}</div>;
}

export function ApiAside({children}: {children: ReactNode}) {
  return (
    <aside className="api-page__aside" aria-label="Request and response examples">
      <div className="api-page__aside-inner">{children}</div>
    </aside>
  );
}

export function MethodBadge({method}: {method: string}) {
  return <span className={clsx('api-method', `api-method--${method.toLowerCase()}`)}>{method}</span>;
}

export function Endpoint({method, path}: {method: string; path: string}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(path).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  };
  return (
    <div className="api-endpoint">
      <MethodBadge method={method} />
      <code className="api-endpoint__path">
        {path.split(/(\{[^}]+\})/g).map((part, i) =>
          part.startsWith('{') ? <span key={i} className="api-endpoint__param">{part}</span> : part,
        )}
      </code>
      <button type="button" className="api-endpoint__copy" onClick={copy} aria-label="Copy path">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

type ParamProps = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  enumValues?: string[];
  constraints?: string;
  children?: ReactNode;
};

export function Param({name, type, required, defaultValue, enumValues, constraints, children}: ParamProps) {
  return (
    <div className="api-param">
      <div className="api-param__head">
        <code className="api-param__name">{name}</code>
        <span className="api-param__type">{type}</span>
        {required ? <span className="api-param__required">required</span> : <span className="api-param__optional">optional</span>}
      </div>
      <div className="api-param__body">
        {children}
        {(defaultValue !== undefined || enumValues || constraints) && (
          <div className="api-param__meta">
            {defaultValue !== undefined && (
              <span>Default: <code>{defaultValue}</code></span>
            )}
            {enumValues && (
              <span>
                One of:{' '}
                {enumValues.map((v, i) => (
                  <React.Fragment key={v}>{i > 0 && ' '}<code>{v}</code></React.Fragment>
                ))}
              </span>
            )}
            {constraints && <span>{constraints}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export function ParamChildren({label = 'attributes', open = false, children}: {label?: string; open?: boolean; children: ReactNode}) {
  return (
    <details className="api-param-children" open={open}>
      <summary>
        <span className="api-param-children__show">Show {label}</span>
        <span className="api-param-children__hide">Hide {label}</span>
      </summary>
      <div className="api-param-children__list">{children}</div>
    </details>
  );
}

export function ResponseBlock({status, children}: {status: string; children: ReactNode}) {
  const tone = status.startsWith('2') ? 'ok' : status.startsWith('4') ? 'warn' : 'err';
  return (
    <div className="api-response">
      <span className={clsx('api-status', `api-status--${tone}`)}>{status}</span>
      <div className="api-response__desc">{children}</div>
    </div>
  );
}
