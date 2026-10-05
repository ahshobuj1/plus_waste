import type { Metadata } from 'next';
import ShopContent from '@/components/shop/ShopContent';

export const metadata: Metadata = {
  title: 'Shop PPE, Heavy Duty Rubbish Bags & Equipment',
  description:
    'Trade-quality rubble sacks, heavy duty bin liners, hi-vis vests, puncture-resistant gloves and cleaning kit delivered across London. Free delivery over £75.',
  alternates: {
    canonical: 'https://pluswaste.co.uk/shop',
  },
  openGraph: {
    title: 'Plus Waste Shop — Trade-Quality Bags, Gloves & PPE',
    description:
      'Trade-quality rubbish bags, PPE and collection supplies at trade prices. Next working day delivery across London.',
    url: 'https://pluswaste.co.uk/shop',
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
