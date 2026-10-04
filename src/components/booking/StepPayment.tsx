import React from 'react';
import QuestionCard from './QuestionCard';

interface StepPaymentProps {
  acct: 'guest' | 'account' | 'sub' | '';
  signedIn: string;
  payMethod: string;
  openId: string;
  doneMap: Record<string, boolean>;
  badId: string | null;
  onAcctChange: (val: 'guest' | 'account' | 'sub') => void;
  onChangeSignedIn: () => void;
  onPayMethodChange: (val: string) => void;
  onSubmit: (saveOnly: boolean) => void;
  onOpenQ: (id: string) => void;
  stepNumMap: Record<string, number>;
}

export default function StepPayment({
  acct,
  signedIn,
  payMethod,
  openId,
  doneMap,
  badId,
  onAcctChange,
  onChangeSignedIn,
  onPayMethodChange,
  onSubmit,
  onOpenQ,
  stepNumMap
}: StepPaymentProps) {
  const acctLabels: Record<string, string> = {
    account: 'New account',
    guest: 'Guest',
    sub: 'Membership'
  };

  return (
    <>
      {/* Q: account */}
      <QuestionCard
        id="acct"
        stepNum={stepNumMap.acct || 16}
        title="How would you like to book?"
        summary={acct ? acctLabels[acct] : ''}
        isOpen={openId === 'acct'}
        isDone={!!doneMap.acct}
        isBad={badId === 'acct'}
        onEdit={() => onOpenQ('acct')}
      >
        <div className="opts">
          <label className="opt">
            <input
              type="radio"
              name="acct"
              value="account"
              checked={acct === 'account'}
              onChange={() => onAcctChange('account')}
            />
            <span className="t">Create an account</span>
            <span className="d">Saves your job history and addresses.</span>
            <span className="tag">10% off this job</span>
          </label>
          <label className="opt">
            <input
              type="radio"
              name="acct"
              value="guest"
              checked={acct === 'guest'}
              onChange={() => onAcctChange('guest')}
            />
            <span className="t">Continue as a guest</span>
            <span className="d">No account and no password.</span>
          </label>
          <label className="opt">
            <input
              type="radio"
              name="acct"
              value="sub"
              checked={acct === 'sub'}
              onChange={() => onAcctChange('sub')}
            />
            <span className="t">Plus Waste membership</span>
            <span className="d">£29.99 a month, cancel at any time.</span>
            <span className="tag">15% off every collection</span>
          </label>
        </div>

        {signedIn && (
          <div id="signedBox">
            <div className="signed">
              <span className="ok">✓</span>
              <span>
                Signed in with <b>{signedIn}</b>
                {acct === 'sub' ? ' · membership applied' : ''}
              </span>
              <button type="button" id="soOut" onClick={onChangeSignedIn}>
                Change
              </button>
            </div>
          </div>
        )}
        <p className="q-err">Please choose how you would like to book.</p>
      </QuestionCard>

      {/* Q: payment */}
      <QuestionCard
        id="pay"
        stepNum={stepNumMap.pay || 17}
        title="How would you like to pay?"
        summary={payMethod}
        isOpen={openId === 'pay'}
        isDone={!!doneMap.pay}
        isBad={badId === 'pay'}
        onEdit={() => onOpenQ('pay')}
      >
        <div className="pay-row">
          <label className="pay">
            <input
              type="radio"
              name="pay"
              value="Card"
              checked={payMethod === 'Card'}
              onChange={() => onPayMethodChange('Card')}
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="2" y="5" width="20" height="14" rx="2.5"/>
              <path d="M2 10h20"/>
            </svg>
            Card
          </label>

          <label className="pay">
            <input
              type="radio"
              name="pay"
              value="Google Pay"
              checked={payMethod === 'Google Pay'}
              onChange={() => onPayMethodChange('Google Pay')}
            />
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.9-1.5 4.7-4.3 6.6l6.6 5.1C42.2 35.3 45 30.1 45 24z"/>
              <path fill="#34A853" d="M24 46c5.7 0 10.5-1.9 14-5.1l-6.6-5.1c-1.8 1.2-4.2 2.1-7.4 2.1-5.6 0-10.4-3.7-12.1-8.8l-6.9 5.3C8.4 41.1 15.6 46 24 46z"/>
              <path fill="#FBBC05" d="M11.9 29.1c-.4-1.3-.7-2.6-.7-4.1s.3-2.8.7-4.1l-6.9-5.4C3.5 18.4 2.7 21.1 2.7 24s.8 5.6 2.3 8.4l6.9-5.3z"/>
              <path fill="#EA4335" d="M24 10.6c3.2 0 5.3 1.4 6.5 2.5l5.8-5.7C32.8 4.1 29.7 2 24 2 15.6 2 8.4 6.9 5 14.1l6.9 5.4c1.7-5.1 6.5-8.9 12.1-8.9z"/>
            </svg>
            Google Pay
          </label>

          <label className="pay">
            <input
              type="radio"
              name="pay"
              value="Apple Pay"
              checked={payMethod === 'Apple Pay'}
              onChange={() => onPayMethodChange('Apple Pay')}
            />
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.4 12.8c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.7 0-1.9-.9-3.2-.8-1.6 0-3.1.9-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.9zM14 5.5c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/>
            </svg>
            Apple Pay
          </label>

          <label className="pay">
            <input
              type="radio"
              name="pay"
              value="Klarna"
              checked={payMethod === 'Klarna'}
              onChange={() => onPayMethodChange('Klarna')}
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2.5"/>
              <path d="M8 9v6M16 9v6M8 12h8"/>
            </svg>
            Klarna, pay in 3
          </label>
        </div>

        <p className="fine" style={{ marginTop: '14px' }}>
          <b>Prices are an estimate until the crew sees the load.</b> Your photos and price are reviewed before dispatch. Anything added after you submit is charged on weight, volume and the time it takes to load.
        </p>

        <div className="q-next" style={{ marginTop: '16px' }}>
          <button
            className="btn btn-go"
            type="button"
            id="submitBtn"
            disabled={!payMethod}
            onClick={() => onSubmit(false)}
          >
            Confirm collection
          </button>
          <button
            className="btn-lnk"
            type="button"
            id="saveBtn"
            onClick={() => onSubmit(true)}
          >
            Save this quote and pay later
          </button>
        </div>
        <p className="q-err">Please choose a payment method.</p>
      </QuestionCard>
    </>
  );
}
