import React from 'react';
import HeroPoints from './hero/HeroPoints';
import HeroSlider from './hero/HeroSlider';
import CoverageChecker from './hero/CoverageChecker';
import Logo from '@/components/common/Logo';

interface HeroProps {
  onPostcodeAccepted?: (postcode: string, area?: string) => void;
}

export default function Hero({ onPostcodeAccepted }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-in">
        <div>
          <h1 className="a-up d1 font-extrabold text-[44px] sm:text-[54px] md:text-[66px] lg:text-[76px] leading-[1.02] tracking-[-0.035em] text-[#141416] max-w-[15ch]">
            Rubbish gone today.<br />
            Priced before you <span className="text-[#d32d1f]">book</span>.
          </h1>
          <p className="lede a-up d2 text-[#6a6864] text-[16px] sm:text-[17.5px] md:text-[18.5px] leading-[1.55] max-w-[44ch] mt-4">
            Plus Waste, today, tomorrow, now… keeping London&apos;s waste moving. A licensed carrier covering the capital, with the price on screen before you commit to anything.
          </p>
          <HeroPoints />
        </div>
        <div className="pc-panel a-up d4">
          <HeroSlider />
          <div className="pc-body">
            <span className="pc-tag">
              <Logo />
              <span className="dot"></span>Crews out across London now
            </span>
            <CoverageChecker onPostcodeAccepted={onPostcodeAccepted} />
          </div>
        </div>
      </div>
    </section>
  );
}
