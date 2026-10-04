import React from 'react';
import QuestionCard from './QuestionCard';

interface StepLocationProps {
  place: 'inside' | 'outside' | '';
  floor: string;
  access: string;
  spot: string;
  openId: string;
  doneMap: Record<string, boolean>;
  badId: string | null;
  onPlaceChange: (val: 'inside' | 'outside') => void;
  onFloorChange: (val: string) => void;
  onAccessChange: (val: string) => void;
  onSpotChange: (val: string) => void;
  onOpenQ: (id: string) => void;
  stepNumMap: Record<string, number>;
}

export default function StepLocation({
  place,
  floor,
  access,
  spot,
  openId,
  doneMap,
  badId,
  onPlaceChange,
  onFloorChange,
  onAccessChange,
  onSpotChange,
  onOpenQ,
  stepNumMap
}: StepLocationProps) {
  return (
    <>
      {/* Q: place */}
      <QuestionCard
        id="place"
        stepNum={stepNumMap.place || 3}
        title="Is it inside or outside the property?"
        summary={place === 'inside' ? 'Inside the property' : place === 'outside' ? 'Outside the property' : ''}
        isOpen={openId === 'place'}
        isDone={!!doneMap.place}
        isBad={badId === 'place'}
        onEdit={() => onOpenQ('place')}
      >
        <div className="chips">
          <label className="chip">
            <input
              type="radio"
              name="place"
              value="outside"
              checked={place === 'outside'}
              onChange={() => onPlaceChange('outside')}
            />
            Outside the property
          </label>
          <label className="chip">
            <input
              type="radio"
              name="place"
              value="inside"
              checked={place === 'inside'}
              onChange={() => onPlaceChange('inside')}
            />
            Inside the property <span className="fee">+£25</span>
          </label>
        </div>
        <p className="q-err">Please tell us whether the waste is inside or outside.</p>
      </QuestionCard>

      {/* Q: floor (inside only) */}
      {place === 'inside' && (
        <QuestionCard
          id="floor"
          stepNum={stepNumMap.floor || 4}
          title="Which floor is it on?"
          summary={floor}
          isOpen={openId === 'floor'}
          isDone={!!doneMap.floor}
          isBad={badId === 'floor'}
          onEdit={() => onOpenQ('floor')}
        >
          <div className="chips">
            {['Ground floor', 'First floor', 'Second floor or higher'].map(f => (
              <label key={f} className="chip">
                <input
                  type="radio"
                  name="floor"
                  value={f}
                  checked={floor === f}
                  onChange={() => onFloorChange(f)}
                />
                {f}
              </label>
            ))}
          </div>
          <p className="q-err">Please tell us which floor it is on.</p>
        </QuestionCard>
      )}

      {/* Q: access (inside only) */}
      {place === 'inside' && (
        <QuestionCard
          id="access"
          stepNum={stepNumMap.access || 5}
          title="How does the crew reach it?"
          summary={access}
          isOpen={openId === 'access'}
          isDone={!!doneMap.access}
          isBad={badId === 'access'}
          onEdit={() => onOpenQ('access')}
        >
          <div className="chips">
            {['Lift available', 'Stairs only'].map(a => (
              <label key={a} className="chip">
                <input
                  type="radio"
                  name="access"
                  value={a}
                  checked={access === a}
                  onChange={() => onAccessChange(a)}
                />
                {a}
              </label>
            ))}
          </div>
          <p className="q-err">Please tell us whether there is a lift or stairs.</p>
        </QuestionCard>
      )}

      {/* Q: spot (outside only) */}
      {place === 'outside' && (
        <QuestionCard
          id="spot"
          stepNum={stepNumMap.spot || 4}
          title="Whereabouts outside is it?"
          summary={spot}
          isOpen={openId === 'spot'}
          isDone={!!doneMap.spot}
          isBad={badId === 'spot'}
          onEdit={() => onOpenQ('spot')}
        >
          <div className="chips">
            {[
              'Front of the property',
              'Garden',
              'Alleyway',
              'Car park',
              'Pavement or roadside'
            ].map(s => (
              <label key={s} className="chip">
                <input
                  type="radio"
                  name="spot"
                  value={s}
                  checked={spot === s}
                  onChange={() => onSpotChange(s)}
                />
                {s}
              </label>
            ))}
          </div>
          <p className="q-err">Please tell us where outside it is.</p>
        </QuestionCard>
      )}
    </>
  );
}
