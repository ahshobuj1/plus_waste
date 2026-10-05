import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Plus Waste terms of service, customer agreement, booking rules, and waste disposal policies for London clients.',
  alternates: {
    canonical: 'https://pluswaste.co.uk/terms-of-service',
  },
};

export default function TermsOfService() {
  return (
    <div className="wrap" style={{ padding: '100px 0', minHeight: '60vh' }}>
      <h1>Terms of Service</h1>
      <p style={{ marginTop: '20px', color: 'var(--steel)' }}>This page is currently under construction. Please check back later.</p>
    </div>
  );
}
