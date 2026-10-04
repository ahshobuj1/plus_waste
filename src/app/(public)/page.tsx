'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import ReviewTicker from '@/components/ReviewTicker';
import Credentials from '@/components/Credentials';
import BookingWidget from '@/components/BookingWidget';
import VanGrid from '@/components/VanGrid';
import OurWork from '@/components/OurWork';
import FAQ from '@/components/FAQ';
import Modals from '@/components/Modals';

export default function Home() {
  const [postcode, setPostcode] = useState('');
  const [socOpen, setSocOpen] = useState(false);
  const [isMembership, setIsMembership] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [toastState, setToastState] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  const handlePostcodeAccepted = (pc: string) => {
    setPostcode(pc);
  };

  const handleShowToast = (title: string, message: string) => {
    setToastState({ isOpen: true, title, message });
    setTimeout(() => {
      setToastState(prev => ({ ...prev, isOpen: false }));
    }, 9500);
  };

  return (
    <main>
      <ReviewTicker />
      <Hero onPostcodeAccepted={handlePostcodeAccepted} />
      <Credentials />
      <BookingWidget
        initialPostcode={postcode}
        onOpenSocialModal={isMem => {
          setIsMembership(isMem);
          setSocOpen(true);
        }}
        onOpenWhatsAppModal={() => setWaOpen(true)}
        onOpenShopModal={() => setShopOpen(true)}
        onShowToast={handleShowToast}
      />
      <VanGrid />
      <OurWork />
      <FAQ />
      <Modals
        socModalOpen={socOpen}
        isMembership={isMembership}
        waModalOpen={waOpen}
        shopModalOpen={shopOpen}
        toastState={toastState}
        onCloseSoc={() => setSocOpen(false)}
        onSelectSocial={() => setSocOpen(false)}
        onCloseWa={() => setWaOpen(false)}
        onCloseShop={() => setShopOpen(false)}
        onCloseToast={() => setToastState(prev => ({ ...prev, isOpen: false }))}
      />
    </main>
  );
}
