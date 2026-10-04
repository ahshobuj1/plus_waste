import React from 'react';

interface ToastProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function Toast({ isOpen, title, message, onClose }: ToastProps) {
  return (
    <div className={`toast ${isOpen ? 'up' : ''}`} id="toast" role="status" aria-live="polite">
      <span className="dot">✓</span>
      <span className="tx">
        <b id="toastTitle">{title}</b>
        <span id="toastMsg">{message}</span>
      </span>
      <button type="button" aria-label="Dismiss" id="toastX" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
