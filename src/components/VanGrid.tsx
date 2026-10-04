import React from 'react';
import { PRICING } from '@/data/pricingData';
import VanCard from './rates/VanCard';
import RateItemsTable from './rates/RateItemsTable';

export default function VanGrid() {
  return (
    <section id="rates" className="sec">
      <div className="wrap">
        <div className="sec-hd">
          <h2>Van sizes and prices</h2>
          <p>
            Every collection goes in the same tipper, which carries an 18 cubic yard cage.
            The shaded area shows exactly how much of that cage each load size takes up.
          </p>
        </div>

        <div className="vangrid" id="vanGrid">
          {PRICING.loads.map(load => (
            <VanCard key={load.id} load={load} />
          ))}
        </div>

        <div style={{ marginTop: '36px' }} className="sec-hd">
          <h2 style={{ fontSize: '23px' }}>Individual items</h2>
          <p>Charged on top of the van size, because they cost more to dispose of than general waste.</p>
        </div>

        <RateItemsTable />

        <p className="fine">
          <b>A minimum charge applies to individual items and bags.</b>{' '}
          Removing waste from inside a property adds <b>£25</b>, with stairs quoted separately.{' '}
          Dismantling costs <b>£25</b> for the first two items, then <b>£10</b> for each item after that.{' '}
          A <b>6pm to 9pm</b> collection adds <b>£29.99</b>. A <b>9pm to 12am</b> collection adds <b>£49.99</b> and carries a <b>£229</b> minimum total.{' '}
          All prices include disposal at a licensed facility and your waste transfer note.
        </p>
      </div>
    </section>
  );
}
