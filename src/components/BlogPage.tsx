import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockProducts';
import type { BlogPost } from '../types';

interface BlogPageProps {
  onBackToHome: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Agronomic Strategy', 'Systems Engineering', 'Tropical Agriculture', 'Climate Control', 'Regional AgTech'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '40px', paddingBottom: '96px' }}>

      {/* Top Breadcrumb Header */}
      <div className="container" style={{ marginBottom: '36px' }}>
        <button
          onClick={onBackToHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#6B7280',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            padding: '6px 0',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </button>
      </div>

      {/* Hero Header */}
      <div className="container" style={{ marginBottom: '48px' }}>
        <div style={{ maxWidth: '800px' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            Autogrow Commercial Agronomy & Field Engineering
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '18px',
            }}
          >
            Blog
          </h1>

          <p style={{ fontSize: '17px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
            Practical, field-tested articles from our New Zealand engineers and global agronomists on alarm configurations, closed-loop VPD regulation, and multi-crop protected cropping.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="container" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid #76b82a' : '1px solid #E5E7EB',
                backgroundColor: selectedCategory === cat ? '#F0FDF4' : '#FFFFFF',
                color: selectedCategory === cat ? '#15803D' : '#4B5563',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '32px',
          }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  {post.category}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#9CA3AF', marginBottom: '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', lineHeight: 1.35, marginBottom: '8px' }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: '13.5px', color: '#6B7280', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#76b82a', fontWeight: 700, fontSize: '13px' }}>
                  Read full article
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(17, 24, 39, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveArticle(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '820px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }} />
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
              <div style={{ position: 'absolute', bottom: '24px', left: '28px', right: '28px', color: '#FFFFFF' }}>
                <span style={{ backgroundColor: '#76b82a', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block' }}>
                  {activeArticle.category}
                </span>
                <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '24px', fontSize: '13px', color: '#6B7280' }}>
                <div>By <strong style={{ color: '#111827' }}>{activeArticle.author}</strong> · {activeArticle.date}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {activeArticle.readTime}
                </div>
              </div>

              <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {activeArticle.content.map((p, idx) => (
                  <p key={idx} style={{ margin: 0 }}>
                    {p}
                  </p>
                ))}
              </div>

              <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="btn btn-secondary"
                  style={{ padding: '10px 24px', fontSize: '13px' }}
                >
                  Close Article
                </button>

                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                  Published by Autogrow Systems Ltd, New Zealand
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

