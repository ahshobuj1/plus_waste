'use client';

import React from 'react';
import SocialAuthModal from './modals/SocialAuthModal';
import WhatsAppModal from './modals/WhatsAppModal';
import ShopCrossSellModal from './modals/ShopCrossSellModal';
import CookieBanner from './modals/CookieBanner';
import Toast from './modals/Toast';

interface ModalsProps {
  socModalOpen?: boolean;
  isMembership?: boolean;
  waModalOpen?: boolean;
  shopModalOpen?: boolean;
  toastState?: { isOpen: boolean; title: string; message: string };
  onCloseSoc?: () => void;
  onSelectSocial?: (provider: string) => void;
  onCloseWa?: () => void;
  onCloseShop?: () => void;
  onCloseToast?: () => void;
}

export default function Modals({
  socModalOpen = false,
  isMembership = false,
  waModalOpen = false,
  shopModalOpen = false,
  toastState = { isOpen: false, title: '', message: '' },
  onCloseSoc = () => {},
  onSelectSocial = () => {},
  onCloseWa = () => {},
  onCloseShop = () => {},
  onCloseToast = () => {}
}: ModalsProps) {
  const isAnyModalOpen = socModalOpen || waModalOpen || shopModalOpen;

  const handleScrimClick = () => {
    if (socModalOpen) onCloseSoc();
    if (waModalOpen) onCloseWa();
    if (shopModalOpen) onCloseShop();
  };

  return (
    <>
      <div
        className={`scrim ${isAnyModalOpen ? 'on' : ''}`}
        id="scrim"
        onClick={handleScrimClick}
      />

      <SocialAuthModal
        isOpen={socModalOpen}
        isMembership={isMembership}
        onClose={onCloseSoc}
        onSelectProvider={onSelectSocial}
      />

      <WhatsAppModal
        isOpen={waModalOpen}
        onClose={onCloseWa}
      />

      <ShopCrossSellModal
        isOpen={shopModalOpen}
        onClose={onCloseShop}
      />

      <CookieBanner />

      <Toast
        isOpen={toastState.isOpen}
        title={toastState.title}
        message={toastState.message}
        onClose={onCloseToast}
      />
    </>
  );
}
