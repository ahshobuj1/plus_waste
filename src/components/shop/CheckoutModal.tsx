import React, { useState } from 'react';
import { CheckoutFormData, ShopTotals } from '@/types';

interface CheckoutModalProps {
  isOpen: boolean;
  totals: ShopTotals;
  onClose: () => void;
  onOrderPlaced: (formData: CheckoutFormData) => void;
}

export default function CheckoutModal({
  isOpen,
  totals,
  onClose,
  onOrderPlaced
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    company: '',
    mobile: '',
    email: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.mobile.trim() || formData.mobile.replace(/\s+/g, '').length < 10) {
      errs.mobile = 'Please enter a valid UK mobile number.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.address.trim()) errs.address = 'Please enter the delivery address.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
    onOrderPlaced(formData);
  };

  return (
    <>
      <div className="scrim on" onClick={onClose} aria-hidden="true" />
      <div
        className="modal on"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coTitle"
        style={{ zIndex: 210 }}
      >
        <button
          className="x"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#e8f5e9',
              color: 'var(--go)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '28px',
              margin: '0 auto 16px'
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Order received!</h3>
            <p style={{ color: 'var(--steel)', fontSize: '14px', marginBottom: '20px' }}>
              Thank you, {formData.name}. We have sent an order confirmation to <b>{formData.email}</b>.
              Our dispatch team will contact you on <b>{formData.mobile}</b> prior to delivery.
            </p>
            <div style={{ background: 'var(--paper-2)', padding: '14px', borderRadius: '10px', marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                <span>Items ({totals.totalQuantity}):</span>
                <b>£{totals.subtotal.toFixed(2)}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                <span>Delivery:</span>
                <b>{totals.deliveryFee > 0 ? `£${totals.deliveryFee.toFixed(2)}` : 'Free'}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--rule)', paddingTop: '8px', fontSize: '16px' }}>
                <span>Total:</span>
                <b style={{ color: 'var(--red)' }}>£{totals.grandTotal.toFixed(2)}</b>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-go"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 id="coTitle">Where shall we deliver?</h3>
            <p>
              Delivery runs Monday to Friday, 8:00am–5:30pm. Order by 3:30pm for next working day delivery.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid2">
                <div className={`fld ${errors.name ? 'bad' : ''}`}>
                  <label htmlFor="dName">Full name <span className="req">*</span></label>
                  <input
                    id="dName"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                  />
                  {errors.name && <span className="err">{errors.name}</span>}
                </div>
                <div className="fld">
                  <label htmlFor="dCo">Company <span style={{ color: 'var(--steel)', fontWeight: 400 }}>— optional</span></label>
                  <input
                    id="dCo"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid2">
                <div className={`fld ${errors.mobile ? 'bad' : ''}`}>
                  <label htmlFor="dTel">Mobile <span className="req">*</span></label>
                  <input
                    id="dTel"
                    type="tel"
                    autoComplete="tel"
                    placeholder="07700 900123"
                    value={formData.mobile}
                    onChange={(e) => {
                      setFormData({ ...formData, mobile: e.target.value });
                      if (errors.mobile) setErrors({ ...errors, mobile: '' });
                    }}
                  />
                  {errors.mobile && <span className="err">{errors.mobile}</span>}
                </div>
                <div className={`fld ${errors.email ? 'bad' : ''}`}>
                  <label htmlFor="dEm">Email <span className="req">*</span></label>
                  <input
                    id="dEm"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                  />
                  {errors.email && <span className="err">{errors.email}</span>}
                </div>
              </div>

              <div className={`fld ${errors.address ? 'bad' : ''}`}>
                <label htmlFor="dAddr">Delivery address <span className="req">*</span></label>
                <input
                  id="dAddr"
                  autoComplete="street-address"
                  placeholder="Street address, city, postcode"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: '' });
                  }}
                />
                {errors.address && <span className="err">{errors.address}</span>}
              </div>

              <div className="fld">
                <label htmlFor="dNotes">Delivery notes <span style={{ color: 'var(--steel)', fontWeight: 400 }}>— optional</span></label>
                <textarea
                  id="dNotes"
                  rows={2}
                  placeholder="Site access, gate code, recipient contact..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button className="btn btn-go" type="submit" style={{ marginTop: '12px' }}>
                Place order · £{totals.grandTotal.toFixed(2)}
              </button>
            </form>

            <div className="note">
              <b>Surcharge postcodes:</b> Scottish Highlands and remote areas may carry an extra charge — we will confirm before despatch.
            </div>
          </>
        )}
      </div>
    </>
  );
}
