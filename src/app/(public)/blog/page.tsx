import type {Metadata} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {BLOG_POSTS} from '@/data/blogData';

export const metadata: Metadata = {
  title: 'News, Case Studies & Waste Reduction Tips',
  description:
    'Recent clearance jobs, local London events, and practical ways to cut domestic and commercial waste disposal costs from Plus Waste.',
  alternates: {
    canonical: 'https://pluswaste.co.uk/blog',
  },
  openGraph: {
    title: 'Plus Waste Blog — News, Tips & London Clearance Jobs',
    description:
      'Recent clearance jobs, local London events, and practical ways to cut waste costs from Plus Waste.',
    url: 'https://pluswaste.co.uk/blog',
  },
};

export default function BlogPage() {
  return (
    <main>
      <section className="bhero wrap">
        <h1>
          News and <span>tips</span>
        </h1>
        <p>
          Recent jobs, local events and ways to cut your waste costs, from the
          Plus Waste crew in Westminster, Kensington and Chelsea, and the City.
        </p>
        <p className="demo-note">
          These are example posts showing the layout. On the live site this page
          fills itself from your Google Business posts every morning.
        </p>
      </section>

      <div className="posts wrap">
        {BLOG_POSTS.map((post) => (
          <article className="post in" id={post.id} key={post.id}>
            <Image
              src={post.img}
              alt={post.title}
              width={600}
              height={380}
              style={{width: '100%', height: 'auto', objectFit: 'cover'}}
              unoptimized
            />
            <div className="post-body">
              <time>{post.date}</time>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>

              <div className="post-links">
                {post.links.map((link, idx) => (
                  <a
                    key={idx}
                    className="btn-lt"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="wrap">
        <div className="bcta">
          <div>
            <h2>Need a fast clearance?</h2>
            <p>Book online in 3 minutes, same-day available.</p>
          </div>
          <Link className="btn-go" href="/#flow">
            Check prices &amp; book
          </Link>
        </div>
      </div>
    </main>
  );
}
