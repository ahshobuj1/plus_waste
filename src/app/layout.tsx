import type {Metadata} from 'next';
import {Archivo, Inter} from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:
      'Plus Waste — London Rubbish Removal & Waste Clearance, Booked in Minutes',
    template: '%s | Plus Waste London',
  },
  description:
    "Licensed London waste carrier. Same-day rubbish removal, builders' waste, house and office clearance. See your price before you book — loads from £89.",
  metadataBase: new URL('https://pluswaste.co.uk'),
  alternates: {
    canonical: 'https://pluswaste.co.uk/',
  },
  keywords: [
    'London rubbish removal',
    'waste clearance London',
    'same day rubbish collection London',
    'licensed waste carrier London',
    "builders' waste clearance",
    'office clearance London',
    'house clearance London',
    'waste collection Westminster',
    'rubbish removal Kensington and Chelsea',
    'City of London rubbish clearance',
  ],
  authors: [{name: 'Plus Waste London'}],
  creator: 'Plus Waste',
  publisher: 'Plus Waste',
  icons: {
    icon: [
      {url: '/assets/image_0.png', sizes: '32x32', type: 'image/png'},
      {url: '/assets/image_1.png', sizes: '192x192', type: 'image/png'},
    ],
    shortcut: '/assets/image_0.png',
    apple: [{url: '/assets/image_1.png', sizes: '180x180', type: 'image/png'}],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Plus Waste — London Rubbish Removal & Waste Clearance',
    description:
      "Plus Waste, today, tomorrow, now… keeping London's waste moving. Licensed collections, priced upfront, booked in minutes.",
    url: 'https://pluswaste.co.uk/',
    siteName: 'Plus Waste',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/assets/image_1.png',
        width: 800,
        height: 800,
        alt: 'Plus Waste London Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plus Waste — London Rubbish Removal & Waste Clearance',
    description:
      "Licensed London waste carrier. Same-day rubbish removal, builders' waste, house and office clearance. See your price before you book.",
    images: ['/assets/image_1.png'],
  },
  other: {
    'geo.region': 'GB-LND',
    'geo.placename': 'London',
    'geo.position': '51.5187;-0.1404',
    ICBM: '51.5187, -0.1404',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://pluswaste.co.uk/#business',
  name: 'Plus Waste',
  description:
    'Licensed rubbish removal and waste clearance across London for homes and businesses.',
  image: 'https://pluswaste.co.uk/assets/logo-tile-red.png',
  logo: 'https://pluswaste.co.uk/assets/logo-tile-red.png',
  url: 'https://pluswaste.co.uk/',
  telephone: '+447764242821',
  email: 'pluswastelondon@gmail.com',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Great Titchfield Street',
    addressLocality: 'London',
    postalCode: 'W1W 7PR',
    addressCountry: 'GB',
  },
  areaServed: [
    {'@type': 'City', name: 'London'},
    {'@type': 'Place', name: 'Westminster'},
    {'@type': 'Place', name: 'Kensington and Chelsea'},
    {'@type': 'Place', name: 'Mayfair'},
    {'@type': 'Place', name: 'Soho'},
    {'@type': 'Place', name: 'Marylebone'},
    {'@type': 'Place', name: 'Fitzrovia'},
    {'@type': 'Place', name: 'Oxford Circus'},
    {'@type': 'Place', name: 'Belgravia'},
    {'@type': 'Place', name: 'Knightsbridge'},
    {'@type': 'Place', name: 'Chelsea'},
    {'@type': 'Place', name: 'City of London'},
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Waste collection',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Minimum load',
        price: '89',
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        name: 'Small load',
        price: '149',
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        name: 'Medium load',
        price: '289',
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        name: 'Large load',
        price: '369',
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        name: 'Large+ load',
        price: '449',
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        name: 'Large++ load',
        price: '549',
        priceCurrency: 'GBP',
      },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '00:00',
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </head>
      <body>{children}</body>
    </html>
  );
}
