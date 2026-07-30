import React, {useEffect, useState} from 'react';

const SPLASH_SEEN_KEY = 'rumpty-docs-splash-seen';
// Matches the console: 1.8s minimum display + 0.4s fade-out.
const SPLASH_DURATION_MS = 2200;

// Same boot messages as the console's splash screen.
const BOOT_MESSAGES = [
  'Teaching tiny computers big cloud dreams…',
  'Finding spare CPU cycles under the couch…',
  'Negotiating with the hypervisor…',
  'Allocating vibes… 99% complete.',
  'Unlimited Void...',
  "Booting from Ola's Closet... you read that right!",
  'Tuning the cooling fans to jet engine mode…',
  'Rescuing packets lost in the closet dust…',
  'Preparing your slice of the sky…',
  'Whispering sweet words to the dataplane',
  'Summoning your compute from Mount Myōboku…',
  "Don't Stop 'Til You Get Enough...",
  'It’s clobberin’ time!',
];

type RootProps = {
  children: React.ReactNode;
};

export default function Root({children}: RootProps): JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  // Picked in useEffect (not at render time) so server and client HTML match.
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Only play the splash once per browser session — repeat visits and
    // refreshes go straight to content.
    if (window.sessionStorage.getItem(SPLASH_SEEN_KEY)) {
      setShowSplash(false);
      return;
    }
    window.sessionStorage.setItem(SPLASH_SEEN_KEY, '1');
    setMessage(BOOT_MESSAGES[Math.floor(Math.random() * BOOT_MESSAGES.length)]);
    const timeout = window.setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
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
          <div className="rumpty-docs-splash__wordmark">
            Rumpty<span>Cloud</span>
          </div>
          <div className="rumpty-docs-splash__status">
            <span className="rumpty-docs-splash__led" aria-hidden="true" />
            <span className="rumpty-docs-splash__message">{message}</span>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}
