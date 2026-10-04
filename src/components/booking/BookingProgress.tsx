import React from 'react';
import Logo from '@/components/common/Logo';

interface BookingProgressProps {
  pct: number;
  activeStep: number;
  completedSteps: number[];
}

const STEPS = [
  { num: 1, label: 'Where' },
  { num: 2, label: 'What' },
  { num: 3, label: 'Size' },
  { num: 4, label: 'When & pay' }
];

export default function BookingProgress({
  pct,
  activeStep,
  completedSteps
}: BookingProgressProps) {
  return (
    <div className="prog bg-white/95 backdrop-blur-md border border-[#e6e3de] rounded-xl p-3.5 mb-4 shadow-sm">
      <div className="prog-top flex items-center gap-2.5 mb-2.5">
        <Logo />
        <span className="lbl text-[12.5px] font-bold text-[#141416]">
          Four steps to a booked collection
        </span>
        <span className="pct ml-auto text-[12px] font-bold text-[#d32d1f] tabular-nums">
          {pct}%
        </span>
      </div>

      <div className="prog-bar h-1.5 bg-[#e6e3de] rounded-full overflow-hidden mb-3">
        <i
          className="block h-full bg-[#d32d1f] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="prog-steps grid grid-cols-4 gap-2">
        {STEPS.map(s => {
          const isActive = s.num === activeStep;
          const isDone = completedSteps.includes(s.num);

          let containerClass =
            'flex items-center justify-center sm:justify-start gap-2 py-2 px-2.5 rounded-lg border text-[12.5px] font-bold transition-all';
          let numClass =
            'w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-bold shrink-0';

          if (isActive) {
            containerClass +=
              ' bg-[#d32d1f] border-[#d32d1f] text-white shadow-md shadow-[#d32d1f]/20 -translate-y-0.5';
            numClass += ' bg-white/30 text-white';
          } else if (isDone) {
            containerClass +=
              ' bg-[#f2faf6] border-[#c9e4d6] text-[#141416]';
            numClass += ' bg-[#127a4a] text-white';
          } else {
            containerClass +=
              ' bg-white border-[#e6e3de] text-[#4a4744] hover:border-[#d6d2cb]';
            numClass += ' bg-[#f4f2ef] text-[#6a6864]';
          }

          const state = isActive ? 'active' : isDone ? 'done' : 'todo';

          return (
            <div
              key={s.num}
              className={`pstep ${containerClass}`}
              data-state={state}
              style={{
                backgroundColor: isActive ? '#d32d1f' : isDone ? '#f2faf6' : '#ffffff',
                borderColor: isActive ? '#d32d1f' : isDone ? '#c9e4d6' : '#e6e3de',
                color: isActive ? '#ffffff' : isDone ? '#141416' : '#4a4744'
              }}
            >
              <span
                className={`n ${numClass}`}
                style={{
                  color: isActive || isDone ? '#ffffff' : '#6a6864',
                  backgroundColor: isActive
                    ? 'rgba(255, 255, 255, 0.3)'
                    : isDone
                    ? '#127a4a'
                    : '#f4f2ef'
                }}
              >
                {isDone && !isActive ? '✓' : s.num}
              </span>
              <span
                className="tx truncate font-bold"
                style={{
                  color: isActive ? '#ffffff' : isDone ? '#141416' : '#4a4744',
                  display: 'inline-block'
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
