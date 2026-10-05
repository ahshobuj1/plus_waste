'use client';

import React, {useState} from 'react';

const LONDON_REGEX =
  /^(E|EC|N|NW|SE|SW|W|WC|BR|CR|DA|EN|HA|IG|KT|RM|SM|TW|UB|WD)\d/i;

interface CoverageCheckerProps {
  onPostcodeAccepted?: (postcode: string, area?: string) => void;
}

export default function CoverageChecker({
  onPostcodeAccepted,
}: CoverageCheckerProps) {
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [msgState, setMsgState] = useState<{
    kind: 'ok' | 'no';
    content: React.ReactNode;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = postcode.trim();
    if (!raw) {
      setMsgState({
        kind: 'no',
        content: 'Please enter a postcode so we can check coverage.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(raw)}`,
      );
      if (res.status === 404) {
        setMsgState({
          kind: 'no',
          content: (
            <>
              We could not find <b>{raw.toUpperCase()}</b>. Please check it and
              try again.
            </>
          ),
        });
      } else if (!res.ok) {
        throw new Error('lookup error');
      } else {
        const data = await res.json();
        const d = data.result;
        if (d.region === 'London' || LONDON_REGEX.test(d.outcode)) {
          setMsgState({
            kind: 'ok',
            content: (
              <>
                We cover <b>{d.postcode}</b>
                {d.admin_district ? ` in ${d.admin_district}` : ''}. Carry on
                below.
              </>
            ),
          });
          onPostcodeAccepted?.(d.postcode, d.admin_district);
          const flow = document.getElementById('flow');
          if (flow) {
            flow.scrollIntoView({behavior: 'smooth'});
          }
        } else {
          setMsgState({
            kind: 'no',
            content: (
              <>
                <b>{d.postcode}</b> is in {d.admin_district}, outside our usual
                London area. Message us on WhatsApp and we will tell you
                honestly whether we can reach you.
              </>
            ),
          });
        }
      }
    } catch {
      const clean = raw.toUpperCase().replace(/\s+/g, '');
      if (/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(clean)) {
        const formatted = clean.slice(0, -3) + ' ' + clean.slice(-3);
        setMsgState({
          kind: 'ok',
          content: (
            <>
              We cover <b>{formatted}</b>. Carry on below.
            </>
          ),
        });
        onPostcodeAccepted?.(formatted);
        const flow = document.getElementById('flow');
        if (flow) {
          flow.scrollIntoView({behavior: 'smooth'});
        }
      } else {
        setMsgState({
          kind: 'no',
          content:
            'We could not check that postcode just now. Please check the format, or message us on WhatsApp.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-end gap-3">
        <span className="font-extrabold text-[22px] sm:text-[25px] md:text-[28px] text-white tracking-tight drop-shadow-md">
          Enter your postcode
        </span>
        <svg
          className="w-[44px] h-[30px] sm:w-[52px] sm:h-[36px] text-[#e8402f] shrink-0 mb-[-4px]"
          viewBox="0 0 64 44"
          fill="none"
          aria-hidden="true">
          <path
            d="M4 6c14 2 26 10 31 22"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M28 20l8 9 1-12"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <form
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full"
        id="pcForm"
        onSubmit={handleSubmit}
        noValidate>
        <label className="sr-only" htmlFor="pc">
          Collection postcode
        </label>
        <input
          id="pc"
          type="text"
          placeholder="e.g. W1W 7PR"
          autoComplete="postal-code"
          spellCheck={false}
          maxLength={9}
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          required
          style={{color: '#ffffff'}}
          className="w-full sm:flex-1 h-[54px] sm:h-[58px] px-4 rounded-xl border-2 border-white/80 bg-black/40 backdrop-blur-md !text-white caret-white [color-scheme:dark] text-[18px] sm:text-[20px] font-extrabold tracking-wider uppercase placeholder:text-white/60 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:border-[#e8402f] focus:ring-1 focus:ring-[#d32d1f]/30 transition-all box-border leading-normal"
        />
        <button
          id="pcBtn"
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto h-[54px] sm:h-[58px] px-7 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-[0.98] font-bold text-[16px] whitespace-nowrap shadow-lg shadow-black/40 transition-all cursor-pointer disabled:opacity-60 flex !text-white items-center justify-center shrink-0 box-border">
          {loading ? 'Checking…' : 'Check coverage'}
        </button>
      </form>
      {msgState && (
        <div
          className={`pc-msg on ${msgState.kind}`}
          id="pcMsg"
          role="status"
          aria-live="polite">
          {msgState.content}
        </div>
      )}
    </div>
  );
}
