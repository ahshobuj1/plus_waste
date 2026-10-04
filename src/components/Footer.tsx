import Link from 'next/link';
import Logo from '@/components/common/Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ft bg-[#141416] text-[#e2e0dc] py-14 text-[14px]">
      <div className="wrap max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="ft-in grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link className="brand inline-flex items-center gap-2 mb-4" href="/">
              <Logo />
              <span className="wm on-dark text-[18px] font-extrabold tracking-tight">
                <span className="text-[#d32d1f]">PLUS</span>
                <span className="text-white">WASTE</span>
              </span>
            </Link>
            <p className="text-[#d4d1cc] leading-relaxed mb-4">
              Licensed rubbish removal and waste clearance across London, for homes and businesses.
            </p>
            <div className="inline-block border border-[#44444c] rounded-lg px-3 py-1.5 text-[12px] font-medium text-white bg-[#1c1c20]">
              Registered waste carrier &amp; eco-friendly disposal
            </div>
          </div>

          <div>
            <h4 className="text-[13px] text-white font-bold tracking-wider uppercase mb-3">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              <li>
                <a href="tel:+447764242821" className="text-[#e2e0dc] hover:text-white font-semibold transition-colors">
                  +44 7764 242821
                </a>
              </li>
              <li>
                <a href="mailto:pluswastelondon@gmail.com" className="text-[#d4d1cc] hover:text-white transition-colors">
                  pluswastelondon@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/message/3MIZAJGYOMJQD1" target="_blank" rel="noreferrer" className="text-[#25d366] hover:underline font-medium transition-colors">
                  Message us on WhatsApp
                </a>
              </li>
              <li className="text-[#b5b2ac] leading-snug">
                Great Titchfield Street<br />London W1W 7PR
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] text-white font-bold tracking-wider uppercase mb-3">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              <li><Link href="/#rates" className="text-[#d4d1cc] hover:text-white transition-colors">Van sizes</Link></li>
              <li><Link href="/#faq" className="text-[#d4d1cc] hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shop" className="text-[#d4d1cc] hover:text-white transition-colors">Shop &amp; PPE</Link></li>
              <li><Link href="/blog" className="text-[#d4d1cc] hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/delivery-terms" className="text-[#d4d1cc] hover:text-white transition-colors">Delivery terms</Link></li>
              <li><Link href="/privacy-policy" className="text-[#d4d1cc] hover:text-white transition-colors">Privacy policy</Link></li>
              <li><Link href="/terms-of-service" className="text-[#d4d1cc] hover:text-white transition-colors">Terms of service</Link></li>
            </ul>
          </div>
        </div>

        <div className="ft-btm border-t border-[#2a2a30] mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-[12.5px] text-[#a09d98]">
          <span>&copy; {year} Plus Waste, London. Plus Waste, today, tomorrow, now… keeping London&apos;s waste moving.</span>
          <span className="text-[#c0bdb8]">Licensed and eco-friendly waste removal</span>
        </div>
      </div>
    </footer>
  );
}
