import React, {useEffect, useState} from 'react';

type RootProps = {
  children: React.ReactNode;
};

export default function Root({children}: RootProps): JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowSplash(false), 1400);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      {showSplash ? (
        <div className="rumpty-docs-splash" role="status" aria-live="polite">
          <div className="rumpty-docs-splash__mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="rumpty-docs-splash__label">Loading docs</div>
        </div>
      ) : null}
      {children}
    </>
  );
}
