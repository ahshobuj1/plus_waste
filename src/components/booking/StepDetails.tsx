'use client';

import React, { useState } from 'react';
import QuestionCard from './QuestionCard';

interface StepDetailsProps {
  stepNum: number;
  isOpen: boolean;
  isDone: boolean;
  isBad?: boolean;
  name: string;
  business: string;
  phone: string;
  email: string;
  notes: string;
  ctype: 'Residential' | 'Business' | 'Other' | '';
  onNameChange: (val: string) => void;
  onBusinessChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onNotesChange: (val: string) => void;
  onCtypeChange: (val: 'Residential' | 'Business' | 'Other') => void;
  onAdvance: () => void;
  onEdit: () => void;
}

export default function StepDetails({
  stepNum,
  isOpen,
  isDone,
  isBad = false,
  name,
  business,
  phone,
  email,
  notes,
  ctype,
  onNameChange,
  onBusinessChange,
  onPhoneChange,
  onEmailChange,
  onNotesChange,
  onCtypeChange,
  onAdvance,
  onEdit
}: StepDetailsProps) {
  const [touched, setTouched] = useState(false);

  const isNameValid = name.trim().length > 1;
  const isPhoneValid = /^(\+?44|0)7\d{9}$/.test(phone.replace(/[\s-]/g, ''));
  const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.trim());
  const isCtypeValid = !!ctype;

  const handleContinue = () => {
    setTouched(true);
    if (isNameValid && isPhoneValid && isEmailValid && isCtypeValid) {
      onAdvance();
    }
  };

  const summary = name.trim() + (business.trim() ? ` · ${business.trim()}` : '');

  return (
    <QuestionCard
      id="details"
      stepNum={stepNum}
      title="Who shall we send it to?"
      summary={summary}
      isOpen={isOpen}
      isDone={isDone}
      isBad={isBad}
      onEdit={onEdit}
    >
      <p className="ctype-ask" id="ctypeAsk">
        <b>Tap one to continue.</b> Who is this booking for?
      </p>

      <div
        className={`chips ctype-group ${!ctype ? 'need' : ''} ${touched && !ctype ? 'bad shake' : ''}`}
        id="ctypeGroup"
        role="radiogroup"
        aria-labelledby="ctypeAsk"
        aria-required="true"
        style={{ marginBottom: '15px' }}
      >
        {(['Residential', 'Business', 'Other'] as const).map(ct => (
          <label key={ct} className="chip">
            <input
              type="radio"
              name="ctype"
              value={ct}
              checked={ctype === ct}
              onChange={() => onCtypeChange(ct)}
            />
            {ct}
          </label>
        ))}
      </div>
      {touched && !ctype && (
        <p className="ctype-err" role="alert">
          Choose Residential, Business or Other to continue.
        </p>
      )}

      <div className={`fld ${touched && !isNameValid ? 'bad' : ''}`} id="fName">
        <label htmlFor="nm">
          Full name <span className="req">*</span>
        </label>
        <input
          id="nm"
          autoComplete="name"
          placeholder="Jane Smith"
          value={name}
          onChange={e => onNameChange(e.target.value)}
        />
        <span className="err">Please enter your full name.</span>
      </div>

      <div className="fld" id="fBiz">
        <label htmlFor="biz">
          Business name <span className="opt-tag">— if applicable</span>
        </label>
        <input
          id="biz"
          autoComplete="organization"
          placeholder="Riverside Construction Ltd"
          value={business}
          onChange={e => onBusinessChange(e.target.value)}
        />
      </div>

      <div className="grid2">
        <div className={`fld ${touched && !isPhoneValid ? 'bad' : ''}`} id="fTel">
          <label htmlFor="tel">
            Mobile <span className="req">*</span>
          </label>
          <input
            id="tel"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="07700 900123"
            value={phone}
            onChange={e => onPhoneChange(e.target.value)}
          />
          <span className="err">Please enter a valid UK mobile number.</span>
        </div>

        <div className={`fld ${touched && !isEmailValid ? 'bad' : ''}`} id="fMail">
          <label htmlFor="em">
            Email <span className="req">*</span>
          </label>
          <input
            id="em"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="jane@example.com"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
          />
          <span className="err">Please enter a valid email address.</span>
        </div>
      </div>

      <div className="fld" style={{ marginBottom: 0 }}>
        <label htmlFor="notes">
          Anything the crew should know <span className="opt-tag">— optional</span>
        </label>
        <textarea
          id="notes"
          rows={2}
          placeholder="Gate code, where to find the keys, awkward access…"
          value={notes}
          onChange={e => onNotesChange(e.target.value)}
        />
      </div>

      <div className="q-next">
        <button
          className="btn btn-go"
          type="button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      <p className="q-err">Please fill in your name, mobile and email.</p>
    </QuestionCard>
  );
}
