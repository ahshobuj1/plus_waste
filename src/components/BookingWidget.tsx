'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  BookingState,
  LoadTier,
  TimeSlotOption,
  UploadedFile
} from '@/types';
import { calculateQuote } from '@/utils/pricing';
import BookingProgress from './booking/BookingProgress';
import BookingRail from './booking/BookingRail';
import StepAddress from './booking/StepAddress';
import StepWasteType from './booking/StepWasteType';
import StepLocation from './booking/StepLocation';
import StepPhotos from './booking/StepPhotos';
import StepSize from './booking/StepSize';
import StepAddons from './booking/StepAddons';
import StepLabour from './booking/StepLabour';
import StepDateTime from './booking/StepDateTime';
import StepDetails from './booking/StepDetails';
import StepPayment from './booking/StepPayment';

const ALL_QUESTIONS = [
  'address', 'types', 'place', 'floor', 'access', 'spot', 'photos',
  'load', 'addons', 'labour', 'dis', 'date', 'slot', 'park', 'details', 'acct', 'pay'
] as const;

type QuestionId = typeof ALL_QUESTIONS[number];

const STEP_OF: Record<QuestionId, number> = {
  address: 1,
  types: 2, place: 2, floor: 2, access: 2, spot: 2, photos: 2,
  load: 3, addons: 3, labour: 3, dis: 3,
  date: 4, slot: 4, park: 4, details: 4, acct: 4, pay: 4
};

const BOOKING_ENDPOINT = 'https://hook.eu2.make.com/46g39gftbdjtvxafxibnqqf3twiwgxib';

interface BookingWidgetProps {
  initialPostcode?: string;
  onOpenSocialModal?: (isMembership: boolean) => void;
  onOpenWhatsAppModal?: () => void;
  onOpenShopModal?: () => void;
  onShowToast?: (title: string, message: string) => void;
}

export default function BookingWidget({
  initialPostcode = '',
  onOpenSocialModal,
  onOpenWhatsAppModal,
  onOpenShopModal,
  onShowToast
}: BookingWidgetProps) {
  const [shopBasket, setShopBasket] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pw_basket');
      if (stored) setShopBasket(JSON.parse(stored));
    } catch {}
  }, []);

  const [state, setState] = useState<BookingState>({
    postcode: initialPostcode,
    address: initialPostcode,
    types: [],
    place: '',
    floor: '',
    access: '',
    spot: '',
    files: [],
    noPhotos: false,
    load: null,
    items: {},
    addonsSeen: false,
    labour: '',
    dis: null,
    disN: 0,
    date: null,
    slot: null,
    park: '',
    name: '',
    business: '',
    phone: '',
    email: '',
    notes: '',
    ctype: '',
    acct: '',
    signedIn: '',
    pay: ''
  });

  const [openId, setOpenId] = useState<QuestionId>('address');
  const [badId, setBadId] = useState<string | null>(null);

  // Sync initial postcode if changed externally
  useEffect(() => {
    if (initialPostcode) {
      setState(prev => ({
        ...prev,
        postcode: initialPostcode,
        address: prev.address || initialPostcode
      }));
    }
  }, [initialPostcode]);

  // Dynamic visible questions
  const liveQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(id => {
      if (id === 'floor' || id === 'access') return state.place === 'inside';
      if (id === 'spot') return state.place === 'outside';
      return true;
    });
  }, [state.place]);

  // Validation map
  const doneMap = useMemo(() => {
    const isPhoneValid = /^(\+?44|0)7\d{9}$/.test(state.phone.replace(/[\s-]/g, ''));
    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(state.email.trim());

    return {
      address: state.address.trim().length > 3,
      types: state.types.length > 0,
      place: !!state.place,
      floor: !!state.floor,
      access: !!state.access,
      spot: !!state.spot,
      photos: state.noPhotos || state.files.filter(f => f.type === 'image').length >= 3,
      load: !!state.load,
      addons: !!state.addonsSeen,
      labour: !!state.labour,
      dis: state.dis !== null && state.dis !== '',
      date: !!state.date,
      slot: !!state.slot,
      park: !!state.park,
      details: state.name.trim().length > 1 && isPhoneValid && isEmailValid && !!state.ctype,
      acct: !!state.acct,
      pay: !!state.pay
    } as Record<QuestionId, boolean>;
  }, [state]);

  // Progress metrics
  const progressPercent = useMemo(() => {
    const total = liveQuestions.length;
    const doneCount = liveQuestions.filter(id => doneMap[id]).length;
    return total > 0 ? Math.round((doneCount / total) * 100) : 0;
  }, [liveQuestions, doneMap]);

  const activeStepNum = STEP_OF[openId] || 1;

  const completedSteps = useMemo(() => {
    const steps = [1, 2, 3, 4];
    return steps.filter(s => {
      const qInStep = liveQuestions.filter(id => STEP_OF[id] === s);
      return qInStep.length > 0 && qInStep.every(id => doneMap[id]);
    });
  }, [liveQuestions, doneMap]);

  // Step Number map (for sequential numbering of visible questions)
  const stepNumMap = useMemo(() => {
    const map: Record<string, number> = {};
    liveQuestions.forEach((id, idx) => {
      map[id] = idx + 1;
    });
    return map;
  }, [liveQuestions]);

  // Quote calculation
  const quote = useMemo(() => {
    return calculateQuote(state, shopBasket);
  }, [state, shopBasket]);

  // Auto-advance helper
  const advanceFrom = useCallback((fromId: QuestionId) => {
    const vs = liveQuestions;
    const currentIndex = vs.indexOf(fromId);
    for (let k = currentIndex + 1; k < vs.length; k++) {
      const nextId = vs[k];
      if (!doneMap[nextId]) {
        setOpenId(nextId);
        return;
      }
    }
    // If all answered, open the last
    setOpenId(vs[vs.length - 1]);
  }, [liveQuestions, doneMap]);

  // Trigger modals on reaching certain questions
  const [hasShownShopPrompt, setHasShownShopPrompt] = useState(false);
  const [hasShownWaPrompt, setHasShownWaPrompt] = useState(false);

  useEffect(() => {
    if (openId === 'acct' && !hasShownShopPrompt) {
      setHasShownShopPrompt(true);
      try {
        const seen = sessionStorage.getItem('pw_shop');
        if (!seen) {
          setTimeout(() => onOpenShopModal?.(), 700);
          sessionStorage.setItem('pw_shop', '1');
        }
      } catch {}
    }
    if (openId === 'pay' && !hasShownWaPrompt) {
      setHasShownWaPrompt(true);
      try {
        const seen = sessionStorage.getItem('pw_wa');
        if (!seen) {
          setTimeout(() => onOpenWhatsAppModal?.(), 900);
          sessionStorage.setItem('pw_wa', '1');
        }
      } catch {}
    }
  }, [openId, hasShownShopPrompt, hasShownWaPrompt, onOpenShopModal, onOpenWhatsAppModal]);

  // Submission handler
  const handleSubmit = (saveOnly: boolean) => {
    // Validate all required questions
    for (const id of liveQuestions) {
      if (id === 'pay' && saveOnly) continue;
      if (!doneMap[id]) {
        setOpenId(id);
        setBadId(id);
        setTimeout(() => setBadId(null), 2200);
        return;
      }
    }

    const ref = 'PW' + Date.now().toString().slice(-6);
    const payload = {
      ref,
      status: saveOnly ? 'Saved quote' : 'Awaiting payment',
      name: state.name.trim(),
      business: state.business.trim(),
      phone: state.phone.trim(),
      email: state.email.trim(),
      address: state.address.trim(),
      postcode: state.postcode,
      date: state.date ? state.date.toISOString().slice(0, 10) : '',
      slot: state.slot ? state.slot.label : '',
      wasteTypes: state.types.join(', '),
      place: state.place === 'inside'
        ? `Inside — ${state.floor}, ${state.access}`
        : `Outside — ${state.spot}`,
      labour: state.labour,
      vanSize: state.load ? `${state.load.name} (${state.load.cuyd} cu yd)` : '',
      addons: Object.entries(state.items)
        .filter(([, q]) => q > 0)
        .map(([id, q]) => `${q} x ${id}`)
        .join(', ') || 'None',
      dismantle: state.dis || 'Nothing',
      parking: state.park,
      photoCount: state.noPhotos
        ? 'No photos supplied'
        : String(state.files.filter(f => f.type === 'image').length),
      total: quote.total.toFixed(2),
      notes: state.notes.trim(),
      accountType: state.acct,
      shopTotal: quote.shop.toFixed(2),
      priority: quote.shop > 0 ? 'SHOP ORDER — despatch required' : 'Collection only'
    };

    fetch(BOOKING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});

    const title = saveOnly ? 'Quote saved' : 'Booking received';
    const message = saveOnly
      ? ` Reference ${ref}. Your price of £${quote.total.toFixed(2)} is locked in — we will send the payment link whenever you are ready.`
      : ` Reference ${ref}, £${quote.total.toFixed(2)}. We have sent the details to your WhatsApp and our office.`;

    onShowToast?.(title, message);

    if (quote.shop > 0) {
      try {
        localStorage.removeItem('pw_basket');
      } catch {}
      setShopBasket({});
    }
  };

  const scrollToRail = () => {
    const rail = document.querySelector('.rail');
    if (rail) {
      rail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section id="flow" className="sec tinted" style={{ scrollMarginTop: '70px', paddingTop: '16px' }}>
        <div className="wrap">
          <div className="sec-hd" style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', marginBottom: '4px' }}>Build your collection</h2>
            <p style={{ marginTop: '4px', fontSize: '14.5px' }}>Answer one question at a time. The page moves you along, and the price updates as you go.</p>
          </div>

          <div className="flow-wrap">
            <div>
              <BookingProgress
                pct={progressPercent}
                activeStep={activeStepNum}
                completedSteps={completedSteps}
              />

              {/* Step 1: Address */}
              <StepAddress
                stepNum={stepNumMap.address || 1}
                isOpen={openId === 'address'}
                isDone={doneMap.address}
                isBad={badId === 'address'}
                address={state.address}
                postcode={state.postcode}
                onAddressChange={addr => setState(prev => ({ ...prev, address: addr }))}
                onPostcodeChange={pc => setState(prev => ({ ...prev, postcode: pc }))}
                onAdvance={() => advanceFrom('address')}
                onEdit={() => setOpenId('address')}
              />

              {/* Step 2: What */}
              <StepWasteType
                stepNum={stepNumMap.types || 2}
                isOpen={openId === 'types'}
                isDone={doneMap.types}
                isBad={badId === 'types'}
                selectedTypes={state.types}
                onChange={types => setState(prev => ({ ...prev, types }))}
                onAdvance={() => advanceFrom('types')}
                onEdit={() => setOpenId('types')}
              />

              <StepLocation
                place={state.place}
                floor={state.floor}
                access={state.access}
                spot={state.spot}
                openId={openId}
                doneMap={doneMap}
                badId={badId}
                stepNumMap={stepNumMap}
                onPlaceChange={val => {
                  setState(prev => ({
                    ...prev,
                    place: val,
                    floor: '',
                    access: '',
                    spot: ''
                  }));
                  setOpenId(val === 'inside' ? 'floor' : 'spot');
                }}
                onFloorChange={val => {
                  setState(prev => ({ ...prev, floor: val }));
                  setOpenId('access');
                }}
                onAccessChange={val => {
                  setState(prev => ({ ...prev, access: val }));
                  setOpenId('photos');
                }}
                onSpotChange={val => {
                  setState(prev => ({ ...prev, spot: val }));
                  setOpenId('photos');
                }}
                onOpenQ={id => setOpenId(id as QuestionId)}
              />

              <StepPhotos
                stepNum={stepNumMap.photos || 6}
                isOpen={openId === 'photos'}
                isDone={doneMap.photos}
                isBad={badId === 'photos'}
                files={state.files}
                noPhotos={state.noPhotos}
                onFilesChange={files => setState(prev => ({ ...prev, files }))}
                onNoPhotosChange={noPhotos => setState(prev => ({ ...prev, noPhotos }))}
                onAdvance={() => advanceFrom('photos')}
                onEdit={() => setOpenId('photos')}
              />

              {/* Step 3: Size */}
              <StepSize
                stepNum={stepNumMap.load || 7}
                isOpen={openId === 'load'}
                isDone={doneMap.load}
                isBad={badId === 'load'}
                selectedLoad={state.load}
                onSelectLoad={load => {
                  setState(prev => ({ ...prev, load }));
                  advanceFrom('load');
                }}
                onEdit={() => setOpenId('load')}
              />

              <StepAddons
                stepNum={stepNumMap.addons || 8}
                isOpen={openId === 'addons'}
                isDone={doneMap.addons}
                isBad={badId === 'addons'}
                items={state.items}
                onItemChange={(id, qty) => {
                  setState(prev => ({
                    ...prev,
                    items: { ...prev.items, [id]: qty },
                    addonsSeen: true
                  }));
                }}
                onAdvance={() => {
                  setState(prev => ({ ...prev, addonsSeen: true }));
                  advanceFrom('addons');
                }}
                onEdit={() => setOpenId('addons')}
              />

              <StepLabour
                labour={state.labour}
                dis={state.dis}
                openId={openId}
                doneMap={doneMap}
                badId={badId}
                stepNumMap={stepNumMap}
                onLabourChange={val => {
                  setState(prev => ({ ...prev, labour: val }));
                  advanceFrom('labour');
                }}
                onDisChange={(label, count) => {
                  setState(prev => ({ ...prev, dis: label, disN: count }));
                  advanceFrom('dis');
                }}
                onOpenQ={id => setOpenId(id as QuestionId)}
              />

              {/* Step 4: When & pay */}
              <StepDateTime
                date={state.date}
                slot={state.slot}
                park={state.park}
                openId={openId}
                doneMap={doneMap}
                badId={badId}
                stepNumMap={stepNumMap}
                onDateChange={date => {
                  setState(prev => ({ ...prev, date }));
                  advanceFrom('date');
                }}
                onSlotChange={slot => {
                  setState(prev => ({ ...prev, slot }));
                  advanceFrom('slot');
                }}
                onParkChange={park => {
                  setState(prev => ({ ...prev, park }));
                  advanceFrom('park');
                }}
                onOpenQ={id => setOpenId(id as QuestionId)}
              />

              <StepDetails
                stepNum={stepNumMap.details || 14}
                isOpen={openId === 'details'}
                isDone={doneMap.details}
                isBad={badId === 'details'}
                name={state.name}
                business={state.business}
                phone={state.phone}
                email={state.email}
                notes={state.notes}
                ctype={state.ctype}
                onNameChange={name => setState(prev => ({ ...prev, name }))}
                onBusinessChange={business => setState(prev => ({ ...prev, business }))}
                onPhoneChange={phone => setState(prev => ({ ...prev, phone }))}
                onEmailChange={email => setState(prev => ({ ...prev, email }))}
                onNotesChange={notes => setState(prev => ({ ...prev, notes }))}
                onCtypeChange={ctype => setState(prev => ({ ...prev, ctype }))}
                onAdvance={() => advanceFrom('details')}
                onEdit={() => setOpenId('details')}
              />

              <StepPayment
                acct={state.acct}
                signedIn={state.signedIn}
                payMethod={state.pay}
                openId={openId}
                doneMap={doneMap}
                badId={badId}
                stepNumMap={stepNumMap}
                onAcctChange={val => {
                  setState(prev => ({ ...prev, acct: val }));
                  if (val === 'guest') {
                    advanceFrom('acct');
                  } else {
                    onOpenSocialModal?.(val === 'sub');
                  }
                }}
                onChangeSignedIn={() => {
                  setState(prev => ({ ...prev, signedIn: '' }));
                  onOpenSocialModal?.(state.acct === 'sub');
                }}
                onPayMethodChange={val => setState(prev => ({ ...prev, pay: val }))}
                onSubmit={handleSubmit}
                onOpenQ={id => setOpenId(id as QuestionId)}
              />
            </div>

            {/* Sticky price rail on desktop */}
            <BookingRail state={state} quote={quote} />
          </div>
        </div>
      </section>

      {/* Ornament divider matching index.html */}
      <div className="ornament" style={{ paddingBlock: '6px' }}>
        <svg className="mark" viewBox="0 0 512 512" aria-hidden="true">
          <g className="stroke">
            <path d="M150 112 H350 A96 96 0 0 1 350 304 H150" />
            <path d="M174 280 V423" />
            <path d="M39 208 H350" />
          </g>
          <circle cx="350" cy="208" r="24" fill="currentColor" />
          <rect x="66" y="157" width="47" height="101" fill="currentColor" />
        </svg>
      </div>
    </>
  );
}
