import React from 'react';
import QuestionCard from './QuestionCard';
import { PRICING } from '@/data/pricingData';
import { formatMoney } from '@/utils/pricing';

interface StepAddonsProps {
  stepNum: number;
  isOpen: boolean;
  isDone: boolean;
  isBad?: boolean;
  items: Record<string, number>;
  onItemChange: (id: string, qty: number) => void;
  onAdvance: () => void;
  onEdit: () => void;
}

export default function StepAddons({
  stepNum,
  isOpen,
  isDone,
  isBad = false,
  items,
  onItemChange,
  onAdvance,
  onEdit
}: StepAddonsProps) {
  const totalCount = Object.values(items).reduce((a, b) => a + b, 0);
  const summary = totalCount > 0
    ? `${totalCount} item${totalCount > 1 ? 's' : ''} added`
    : 'None';

  return (
    <QuestionCard
      id="addons"
      stepNum={stepNum}
      title="Any items that cost extra to dispose of?"
      summary={summary}
      isOpen={isOpen}
      isDone={isDone}
      isBad={isBad}
      hint="Fridges, mattresses and similar cost more to dispose of than general waste, so they are charged on top of the van size. Leave everything at zero if none apply."
      onEdit={onEdit}
    >
      <div className="items" id="itemList">
        {PRICING.items.map(item => {
          const qty = items[item.id] || 0;
          return (
            <div
              key={item.id}
              className={`item ${qty > 0 ? 'has' : ''}`}
              id={`row-${item.id}`}
            >
              <span>
                <span className="nm">{item.name}</span>{' '}
                <span className="pr">{formatMoney(item.price)} each</span>
              </span>
              <span className="stepper">
                <button
                  type="button"
                  aria-label={`Remove one ${item.name}`}
                  onClick={() => onItemChange(item.id, Math.max(0, qty - 1))}
                >
                  −
                </button>
                <output id={`q-${item.id}`} aria-live="polite">
                  {qty}
                </output>
                <button
                  type="button"
                  aria-label={`Add one ${item.name}`}
                  onClick={() => onItemChange(item.id, qty + 1)}
                >
                  +
                </button>
              </span>
            </div>
          );
        })}
      </div>

      <div className="q-next">
        <button
          className="btn btn-go mt-4"
          type="button"
          onClick={onAdvance}
        >
          Continue
        </button>
        <button
          className="btn-lnk"
          type="button"
          onClick={onAdvance}
        >
          None of these
        </button>
      </div>
    </QuestionCard>
  );
}
