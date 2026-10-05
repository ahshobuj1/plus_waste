import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Plus Waste London privacy policy. Learn how we collect, store, and safeguard your personal data in accordance with UK GDPR and data protection laws.',
  alternates: {
    canonical: 'https://pluswaste.co.uk/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="wrap" style={{ padding: '100px 0', minHeight: '60vh' }}>
      <h1>Privacy Policy</h1>
      <p style={{ marginTop: '20px', color: 'var(--steel)' }}>This page is currently under construction. Please check back later.</p>
    </div>
  );
}
