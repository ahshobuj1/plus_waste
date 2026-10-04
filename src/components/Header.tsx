import Link from 'next/link';
import Logo from '@/components/common/Logo';

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr-in">
        <Link className="brand" href="/" aria-label="Plus Waste home">
          <Logo isDraw />
          <span className="wm"><span className="p">PLUS</span><span className="w">WASTE</span></span>
        </Link>
        <nav className="hdr-nav" aria-label="Primary">
          <Link href="/#flow">Get a price</Link>
          <Link href="/#rates">Van sizes</Link>
          <Link href="/#work">Our work</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#faq">FAQs</Link>
        </nav>
        <div className="hdr-cta">
          <a className="tel" href="tel:+447764242821">+44 7764 242821</a>
          <a className="btn-wa" href="https://wa.me/message/3MIZAJGYOMJQD1" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </header>
  );
}
