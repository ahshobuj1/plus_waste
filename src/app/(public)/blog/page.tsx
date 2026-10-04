'use client';

import { BLOG_POSTS } from '@/data/blogData';
import Image from 'next/image';

export default function BlogPage() {
  return (
    <main>
      <section className="bhero wrap">
        <h1>News and <span>tips</span></h1>
        <p>Recent jobs, local events and ways to cut your waste costs, from the Plus Waste crew in Westminster, Kensington and Chelsea, and the City.</p>
        <p className="demo-note">These are example posts showing the layout. On the live site this page fills itself from your Google Business posts every morning.</p>
      </section>
      
      <div className="posts wrap">
        {BLOG_POSTS.map(post => (
          <article className="post in" id={post.id} key={post.id}>
            <img src={post.img} alt={post.title} onError={(e) => { e.currentTarget.src = '/assets/image_100.jpg'; }} />
            <div className="post-body">
              <time>{post.date}</time>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              
              <div className="post-links">
                {post.links.map((link, idx) => (
                  <a key={idx} className="btn-lt" href={link.url} target="_blank" rel="noreferrer">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="bcta wrap">
        <div>
          <h2>Need a fast clearance?</h2>
          <p>Book online in 3 minutes, same-day available.</p>
        </div>
        <a className="btn-go" href="/#flow">Check prices &amp; book</a>
      </div>
    </main>
  );
}
