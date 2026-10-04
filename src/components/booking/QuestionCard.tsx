import React from 'react';

interface QuestionCardProps {
  id: string;
  stepNum: number | string;
  title: string;
  summary?: string;
  isOpen: boolean;
  isDone: boolean;
  isBad?: boolean;
  isHidden?: boolean;
  hint?: string;
  onEdit?: () => void;
  children: React.ReactNode;
}

export default function QuestionCard({
  id,
  stepNum,
  title,
  summary,
  isOpen,
  isDone,
  isBad = false,
  isHidden = false,
  hint,
  onEdit,
  children
}: QuestionCardProps) {
  if (isHidden || (!isOpen && !isDone)) return null;

  return (
    <div
      className={`q ${isOpen ? 'open' : ''} ${isDone && !isOpen ? 'done' : ''} ${isBad ? 'bad' : ''}`}
      id={`q-${id}`}
    >
      <div className="q-head" onClick={isDone && !isOpen ? onEdit : undefined}>
        <span className="q-num">{isDone && !isOpen ? '✓' : stepNum}</span>
        <span className="q-ttl">{title}</span>
        <span className="q-sum">{isDone && !isOpen ? summary : ''}</span>
        {isDone && !isOpen && (
          <button
            className="q-edit"
            type="button"
            onClick={e => {
              e.stopPropagation();
              onEdit?.();
            }}
          >
            Edit
          </button>
        )}
      </div>

      <div className="q-body">
        {hint && <p className="q-hint">{hint}</p>}
        {children}
      </div>
    </div>
  );
}
