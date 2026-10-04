import React from 'react';
import Logo from '@/components/common/Logo';

interface SocialAuthModalProps {
  isOpen: boolean;
  isMembership?: boolean;
  onClose: () => void;
  onSelectProvider: (provider: string) => void;
}

export default function SocialAuthModal({
  isOpen,
  isMembership = false,
  onClose,
  onSelectProvider
}: SocialAuthModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal on"
      id="socModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="socTitle"
    >
      <button className="x" id="socX" type="button" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <Logo />
      <h3 id="socTitle">
        {isMembership ? 'Set up your membership' : 'Set up your account'}
      </h3>
      <p id="socBlurb">
        {isMembership
          ? 'One tap to create the account your membership sits on. We will bring you straight back to your payment.'
          : 'One tap and you are done. We will bring you straight back to your payment.'}
      </p>
      <div className="soc-list">
        <button
          className="soc"
          type="button"
          data-soc="Google"
          onClick={() => onSelectProvider('Google')}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.9-1.5 4.7-4.3 6.6l6.6 5.1C42.2 35.3 45 30.1 45 24z"/>
            <path fill="#34A853" d="M24 46c5.7 0 10.5-1.9 14-5.1l-6.6-5.1c-1.8 1.2-4.2 2.1-7.4 2.1-5.6 0-10.4-3.7-12.1-8.8l-6.9 5.3C8.4 41.1 15.6 46 24 46z"/>
            <path fill="#FBBC05" d="M11.9 29.1c-.4-1.3-.7-2.6-.7-4.1s.3-2.8.7-4.1l-6.9-5.4C3.5 18.4 2.7 21.1 2.7 24s.8 5.6 2.3 8.4l6.9-5.3z"/>
            <path fill="#EA4335" d="M24 10.6c3.2 0 5.3 1.4 6.5 2.5l5.8-5.7C32.8 4.1 29.7 2 24 2 15.6 2 8.4 6.9 5 14.1l6.9 5.4c1.7-5.1 6.5-8.9 12.1-8.9z"/>
          </svg>
          Continue with Google
        </button>
        <button
          className="soc"
          type="button"
          data-soc="Apple"
          onClick={() => onSelectProvider('Apple')}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.4 12.8c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.7 0-1.9-.9-3.2-.8-1.6 0-3.1.9-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.9zM14 5.5c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/>
          </svg>
          Continue with Apple
        </button>
        <button
          className="soc email"
          type="button"
          data-soc="Email"
          onClick={() => onSelectProvider('Email')}
        >
          Use my email address instead
        </button>
      </div>
    </div>
  );
}
