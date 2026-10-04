'use client';

import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { TIME_SLOTS } from '@/data/pricingData';
import { TimeSlotOption } from '@/types';

interface StepDateTimeProps {
  date: Date | null;
  slot: TimeSlotOption | null;
  park: string;
  openId: string;
  doneMap: Record<string, boolean>;
  badId: string | null;
  onDateChange: (date: Date) => void;
  onSlotChange: (slot: TimeSlotOption) => void;
  onParkChange: (park: string) => void;
  onOpenQ: (id: string) => void;
  stepNumMap: Record<string, number>;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function StepDateTime({
  date,
  slot,
  park,
  openId,
  doneMap,
  badId,
  onDateChange,
  onSlotChange,
  onParkChange,
  onOpenQ,
  stepNumMap
}: StepDateTimeProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const limitDate = new Date(today);
  limitDate.setDate(limitDate.getDate() + 60);

  // Month navigation
  const prevDisabled =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const nextDisabled = new Date(viewYear, viewMonth, 1) > limitDate;

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  // Build calendar days
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(viewYear, viewMonth, d);
    cellDate.setHours(0, 0, 0, 0);

    const isPast = cellDate < today;
    const isBeyondLimit = cellDate > limitDate;
    const isDisabled = isPast || isBeyondLimit;
    const isToday = cellDate.getTime() === today.getTime();
    const isSelected = date ? cellDate.getTime() === date.getTime() : false;

    calendarCells.push(
      <button
        key={`d-${d}`}
        type="button"
        className={`cal-d ${isToday ? 'today' : ''}`}
        disabled={isDisabled}
        aria-pressed={isSelected}
        aria-label={cellDate.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        })}
        onClick={() => onDateChange(cellDate)}
      >
        {d}
      </button>
    );
  }

  const dateSummary = date
    ? date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      })
    : '';

  const parkingOptions = [
    'No restrictions',
    'Permit zone',
    'Pay and display',
    'Timed or red route',
    'Not sure'
  ];

  return (
    <>
      {/* Q: date */}
      <QuestionCard
        id="date"
        stepNum={stepNumMap.date || 12}
        title="Which day suits you?"
        summary={dateSummary}
        isOpen={openId === 'date'}
        isDone={!!doneMap.date}
        isBad={badId === 'date'}
        onEdit={() => onOpenQ('date')}
      >
        <div className="cal">
          <div className="cal-hd">
            <button
              className="cal-nav"
              id="calPrev"
              type="button"
              aria-label="Previous month"
              disabled={prevDisabled}
              onClick={handlePrevMonth}
            >
              ‹
            </button>
            <strong id="calLabel">
              {MONTHS[viewMonth]} {viewYear}
            </strong>
            <button
              className="cal-nav"
              id="calNext"
              type="button"
              aria-label="Next month"
              disabled={nextDisabled}
              onClick={handleNextMonth}
            >
              ›
            </button>
          </div>
          <div className="cal-grid" id="calGrid">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="cal-dow">{d}</div>
            ))}
            {calendarCells}
          </div>
        </div>
        <p className="q-err">Please choose a collection date.</p>
      </QuestionCard>

      {/* Q: slot */}
      <QuestionCard
        id="slot"
        stepNum={stepNumMap.slot || 13}
        title="Which time window?"
        summary={slot ? slot.label : ''}
        isOpen={openId === 'slot'}
        isDone={!!doneMap.slot}
        isBad={badId === 'slot'}
        hint="Daytime slots carry no surcharge. Evening and late-night collections cost more because they run outside normal crew hours."
        onEdit={() => onOpenQ('slot')}
      >
        <div className="slots">
          {TIME_SLOTS.map(s => {
            const isSelected = slot?.v === s.v;
            let feeText = 'No surcharge';
            if (s.v === '6-9') feeText = '+£29.99 off-peak';
            if (s.v === '9-12') feeText = '+£49.99, £229 minimum';
            if (s.v === 'exact1') feeText = '+£29.99, time agreed with you';

            return (
              <label key={s.v} className={`slot ${s.fee > 0 ? 'sur' : ''}`}>
                <input
                  type="radio"
                  name="slot"
                  value={s.v}
                  checked={isSelected}
                  onChange={() => onSlotChange(s)}
                />
                <span className="t">{s.label}</span>
                <span className="f">{feeText}</span>
              </label>
            );
          })}
        </div>
        <p className="q-err">Please choose a time window.</p>
      </QuestionCard>

      {/* Q: parking */}
      <QuestionCard
        id="park"
        stepNum={stepNumMap.park || 14}
        title="Any parking restrictions there?"
        summary={park}
        isOpen={openId === 'park'}
        isDone={!!doneMap.park}
        isBad={badId === 'park'}
        hint="This tells the crew whether to allow for a permit or a bay suspension. It does not change your price."
        onEdit={() => onOpenQ('park')}
      >
        <div className="chips">
          {parkingOptions.map(p => (
            <label key={p} className="chip">
              <input
                type="radio"
                name="park"
                value={p}
                checked={park === p}
                onChange={() => onParkChange(p)}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="q-err">Please tell us about parking at the address.</p>
      </QuestionCard>
    </>
  );
}
