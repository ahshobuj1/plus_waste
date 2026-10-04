import React from 'react';
import QuestionCard from './QuestionCard';

interface StepLabourProps {
  labour: string;
  dis: string | null;
  openId: string;
  doneMap: Record<string, boolean>;
  badId: string | null;
  onLabourChange: (val: string) => void;
  onDisChange: (label: string, count: number) => void;
  onOpenQ: (id: string) => void;
  stepNumMap: Record<string, number>;
}

export default function StepLabour({
  labour,
  dis,
  openId,
  doneMap,
  badId,
  onLabourChange,
  onDisChange,
  onOpenQ,
  stepNumMap
}: StepLabourProps) {
  const labourOptions = [
    'Self-load',
    "Driver's help",
    'Driver loads',
    'Two-man team',
    'Three-man team'
  ];

  const disOptions = [
    { label: 'Nothing', count: 0, fee: '' },
    { label: 'One or two items', count: 2, fee: '+£25' },
    { label: 'Three or four items', count: 4, fee: '+£45' },
    { label: 'Five or six items', count: 6, fee: '+£65' }
  ];

  return (
    <>
      {/* Q: labour */}
      <QuestionCard
        id="labour"
        stepNum={stepNumMap.labour || 10}
        title="Who is doing the loading?"
        summary={labour}
        isOpen={openId === 'labour'}
        isDone={!!doneMap.labour}
        isBad={badId === 'labour'}
        onEdit={() => onOpenQ('labour')}
      >
        <div className="chips">
          {labourOptions.map(opt => (
            <label key={opt} className="chip">
              <input
                type="radio"
                name="labour"
                value={opt}
                checked={labour === opt}
                onChange={() => onLabourChange(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
        <p className="q-err">Please tell us who is doing the loading.</p>
      </QuestionCard>

      {/* Q: dismantling */}
      <QuestionCard
        id="dis"
        stepNum={stepNumMap.dis || 11}
        title="Does anything need dismantling?"
        summary={dis || ''}
        isOpen={openId === 'dis'}
        isDone={!!doneMap.dis}
        isBad={badId === 'dis'}
        onEdit={() => onOpenQ('dis')}
      >
        <div className="chips">
          {disOptions.map(opt => (
            <label key={opt.label} className="chip">
              <input
                type="radio"
                name="dis"
                value={opt.label}
                checked={dis === opt.label}
                onChange={() => onDisChange(opt.label, opt.count)}
              />
              {opt.label} {opt.fee && <span className="fee">{opt.fee}</span>}
            </label>
          ))}
        </div>
        <p className="q-err">Please tell us whether anything needs dismantling.</p>
      </QuestionCard>
    </>
  );
}
