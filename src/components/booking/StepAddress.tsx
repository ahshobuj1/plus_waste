'use client';

import React, { useState, useEffect, useRef } from 'react';
import QuestionCard from './QuestionCard';

interface StepAddressProps {
  stepNum: number;
  isOpen: boolean;
  isDone: boolean;
  isBad?: boolean;
  address: string;
  postcode: string;
  onAddressChange: (address: string) => void;
  onPostcodeChange: (postcode: string) => void;
  onAdvance: () => void;
  onEdit: () => void;
}

export default function StepAddress({
  stepNum,
  isOpen,
  isDone,
  isBad = false,
  address,
  postcode,
  onAddressChange,
  onPostcodeChange,
  onAdvance,
  onEdit
}: StepAddressProps) {
  const [query, setQuery] = useState(address);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuery(address);
  }, [address]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onAddressChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(val.trim())}/autocomplete`
        );
        if (res.ok) {
          const data = await res.json();
          const results: string[] = data.result || [];
          setSuggestions(results.slice(0, 6));
          setShowDropdown(results.length > 0);
        }
      } catch {}
    }, 260);
  };

  const handleSelectSuggestion = (p: string) => {
    const current = query.trim();
    const house = current
      .replace(/[A-Z]{1,2}\d[A-Z\d]?\s?\d?[A-Z]{0,2}$/i, '')
      .trim()
      .replace(/,$/, '');
    const finalAddr = (house ? house + ', ' : '') + p;
    setQuery(finalAddr);
    onAddressChange(finalAddr);
    onPostcodeChange(p);
    setShowDropdown(false);
  };

  return (
    <QuestionCard
      id="address"
      stepNum={stepNum}
      title="What is the full address?"
      summary={address.trim()}
      isOpen={isOpen}
      isDone={isDone}
      isBad={isBad}
      hint="Start typing and pick your postcode from the list, then add the building number or name."
      onEdit={onEdit}
    >
      <div className={`fld ${isBad ? 'bad' : ''}`} id="fAddr" style={{ position: 'relative' }}>
        <input
          type="text"
          id="addr"
          placeholder="e.g. 42 Great Titchfield Street, W1W 7PR"
          autoComplete="street-address"
          value={query}
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        {showDropdown && suggestions.length > 0 && (
          <div className="ac-list on" id="acList">
            {suggestions.map(s => (
              <button
                key={s}
                type="button"
                data-ac={s}
                onMouseDown={() => handleSelectSuggestion(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="q-next mt-5 pt-2 flex items-center gap-3">
        <button
          className="btn btn-go"
          type="button"
          disabled={query.trim().length <= 3}
          onClick={onAdvance}
        >
          Continue
        </button>
      </div>
    </QuestionCard>
  );
}
