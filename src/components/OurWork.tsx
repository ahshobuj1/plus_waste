import React from 'react';
import OurWorkSlider from './work/OurWorkSlider';

export default function OurWork() {
  return (
    <section id="work" className="sec rule-t tinted">
      <div className="wrap">
        <div className="sec-hd">
          <h2>Where we work</h2>
          <p>Recent collections across Westminster, Kensington &amp; Chelsea and the City.</p>
        </div>
        <OurWorkSlider />
      </div>
    </section>
  );
}
