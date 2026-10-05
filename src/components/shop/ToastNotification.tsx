import React from 'react';

interface ToastNotificationProps {
  message: string | null;
  subMessage?: string | null;
}

export default function ToastNotification({
  message,
  subMessage
}: ToastNotificationProps) {
  if (!message) return null;

  return (
    <div className="toast up" role="status" aria-live="polite">
      <span className="dot">✓</span>
      <span className="tx">
        <b>{message}</b>
        {subMessage && <span>{subMessage}</span>}
      </span>
    </div>
  );
}
