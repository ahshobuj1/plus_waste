import React from 'react';
import QuestionCard from './QuestionCard';
import { WASTE_TYPES } from '@/data/pricingData';

interface StepWasteTypeProps {
  stepNum: number;
  isOpen: boolean;
  isDone: boolean;
  isBad?: boolean;
  selectedTypes: string[];
  onChange: (types: string[]) => void;
  onAdvance: () => void;
  onEdit: () => void;
}

export default function StepWasteType({
  stepNum,
  isOpen,
  isDone,
  isBad = false,
  selectedTypes,
  onChange,
  onAdvance,
  onEdit
}: StepWasteTypeProps) {
  const toggleType = (id: string) => {
    if (selectedTypes.includes(id)) {
      onChange(selectedTypes.filter(t => t !== id));
    } else {
      onChange([...selectedTypes, id]);
    }
  };

  const summary = selectedTypes
    .map(t => WASTE_TYPES.find(w => w.id === t)?.label || t)
    .join(', ');

  return (
    <QuestionCard
      id="types"
      stepNum={stepNum}
      title="What kind of waste is it?"
      summary={summary}
      isOpen={isOpen}
      isDone={isDone}
      isBad={isBad}
      hint="Select everything that applies. This helps us send the right team and recycling equipment."
      onEdit={onEdit}
    >
      <div className="tiles" id="wasteTiles">
        {WASTE_TYPES.map(w => {
          const checked = selectedTypes.includes(w.id);
          return (
            <label key={w.id} className="tile">
              <input
                type="checkbox"
                name="wtype"
                value={w.id}
                checked={checked}
                onChange={() => toggleType(w.id)}
              />
              <svg
                className="ic"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={w.iconPath} />
              </svg>
              <span className="lb">{w.label}</span>
            </label>
          );
        })}
      </div>
      <div className="q-nav">
        <button
          className="btn-go"
          type="button"
          disabled={selectedTypes.length === 0}
          onClick={onAdvance}
        >
          Continue
        </button>
      </div>
    </QuestionCard>
  );
}
