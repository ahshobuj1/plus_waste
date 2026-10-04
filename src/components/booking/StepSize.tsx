import React from 'react';
import QuestionCard from './QuestionCard';
import { PRICING, CAGE_YD } from '@/data/pricingData';
import { LoadTier } from '@/types';
import VanFigure from '@/components/common/VanFigure';

interface StepSizeProps {
  stepNum: number;
  isOpen: boolean;
  isDone: boolean;
  isBad?: boolean;
  selectedLoad: LoadTier | null;
  onSelectLoad: (load: LoadTier) => void;
  onEdit: () => void;
}

export default function StepSize({
  stepNum,
  isOpen,
  isDone,
  isBad = false,
  selectedLoad,
  onSelectLoad,
  onEdit
}: StepSizeProps) {
  const summary = selectedLoad
    ? `${selectedLoad.name}, £${selectedLoad.price}`
    : '';

  return (
    <QuestionCard
      id="load"
      stepNum={stepNum}
      title="How much is there?"
      summary={summary}
      isOpen={isOpen}
      isDone={isDone}
      isBad={isBad}
      hint="Our tipper carries an 18 cubic yard cage. The shaded area on each van shows how much of that cage your load takes up."
      onEdit={onEdit}
    >
      <div className="vanpick" id="vanPick">
        {PRICING.loads.map(load => {
          const isSelected = selectedLoad?.id === load.id;
          return (
            <label
              key={load.id}
              className={`vopt ${load.best ? 'best' : ''} ${isSelected ? 'selected' : ''}`}
            >
              {load.best && (
                <span
                  className="bestflag"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 20,
                    backgroundColor: '#d32d1f',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    padding: '6px 12px',
                    borderRadius: '13px 0 11px 0',
                    textTransform: 'uppercase',
                    boxShadow: '0 3px 10px rgba(211, 45, 31, 0.45)',
                    lineHeight: 1.2,
                    display: 'inline-block',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Best value for money
                </span>
              )}
              <input
                type="radio"
                name="load"
                value={load.id}
                checked={isSelected}
                onChange={() => onSelectLoad(load)}
              />
              <VanFigure
                cuyd={load.cuyd}
                hideCap={true}
                alt={load.name}
              />
              <span className="vb">
                <span className="nm">{load.name}</span>
                <span className="pr">£{load.price}</span>
                <span className="specs">
                  <span><b>{load.kg}kg</b></span>
                  <span><b>{load.cuyd}</b>/{CAGE_YD} cu yd</span>
                  <span>{load.bags}</span>
                </span>
              </span>
            </label>
          );
        })}
      </div>
      <p className="q-err">Please choose a van size.</p>
    </QuestionCard>
  );
}
