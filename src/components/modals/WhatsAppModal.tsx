import React from 'react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal on"
      id="waModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waTitle"
    >
      <button className="x" id="waX" type="button" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <div className="wa-ic">
        <svg viewBox="0 0 24 24" fill="#fff" width="24" height="24" aria-hidden="true">
          <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z"/>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/>
        </svg>
      </div>
      <h3 id="waTitle">Prefer to finish on WhatsApp?</h3>
      <p>
        We can send this quote straight to your phone and take it from there — useful if you want to send extra photos or ask the crew a question before paying.
      </p>
      <div className="acts">
        <a
          className="wa"
          id="waGo"
          href="https://wa.me/message/3MIZAJGYOMJQD1"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          Continue on WhatsApp
        </a>
        <button className="keep" id="waKeep" type="button" onClick={onClose}>
          Finish here
        </button>
      </div>
    </div>
  );
}
