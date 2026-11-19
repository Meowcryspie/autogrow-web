import React, { useState } from 'react';
import { 
  Eye, 
  Check, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink, 
  Sliders, 
  ShoppingBag, 
  BookOpen, 
  Layers, 
  PhoneCall, 
  FileCode, 
  AlertTriangle,
  ShoppingCart,
  Inbox
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { ImageUploader } from './ImageUploader';
import { AdminOrdersTab } from './AdminOrdersTab';
import { AdminInquiriesTab } from './AdminInquiriesTab';
import type { HeroSlideItem, ShowcaseSectionItem, StoreProduct, BlogPost, DistributorLocation } from '../../types';

interface AdminConsoleProps {
  onExitToSite: () => void;
  onPreview: () => void;
}

type AdminTab = 'orders' | 'inquiries' | 'hero' | 'store' | 'blog' | 'showcase' | 'support' | 'json';

export const AdminConsole: React.FC<AdminConsoleProps> = ({ onExitToSite, onPreview }) => {
  const { 
    draftContent, 
    isDraftModified, 
    updateHeroSlides, 
    updateShowcaseSections, 
    updateStoreProducts, 
    updateBlogPosts, 
    updateDistributors, 
    updateSupportContacts,
    publishDraft, 
    discardDraft, 
    resetToDefaults, 
    exportJson, 
    importJson 
  } = useContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [storeFilter, setStoreFilter] = useState<'all' | 'controllers' | 'hardware' | 'parts'>('all');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSaveAndPublish = () => {
    publishDraft();
    showStatus('Changes saved and published to live website!');
  };

  // --- HERO SLIDES HELPERS ---
  const handleHeroChange = (index: number, field: keyof HeroSlideItem, value: any) => {
    const updated = [...draftContent.heroSlides];
    updated[index] = { ...updated[index], [field]: value };
    updateHeroSlides(updated);
  };

  const handleAddHeroSlide = () => {
    const newSlide: HeroSlideItem = {
      id: `slide-${Date.now()}`,
      tag: 'New Product Release',
      title: 'Precision Commercial Agriculture',
      subtitle: 'Engineered for commercial glasshouses and CEA facilities worldwide.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=80',
      buttonText: 'Explore System',
      targetSection: 'suite',
    };
    updateHeroSlides([...draftContent.heroSlides, newSlide]);
    showStatus('New hero slide added');
  };

  const handleDeleteHeroSlide = (index: number) => {
    if (draftContent.heroSlides.length <= 1) {
      alert('You must have at least one hero slide.');
      return;
    }
    const updated = draftContent.heroSlides.filter((_, i) => i !== index);
    updateHeroSlides(updated);
    showStatus('Hero slide removed');
  };

  const handleMoveHeroSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= draftContent.heroSlides.length) return;
    const updated = [...draftContent.heroSlides];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    updateHeroSlides(updated);
  };

  // --- SHOWCASE SECTIONS HELPERS ---
  const handleShowcaseChange = (index: number, field: keyof ShowcaseSectionItem, value: any) => {
    const updated = [...draftContent.showcaseSections];
    updated[index] = { ...updated[index], [field]: value };
    updateShowcaseSections(updated);
  };

  // --- STORE PRODUCTS HELPERS ---
  const handleStoreProductChange = (index: number, field: keyof StoreProduct, value: any) => {
    const updated = [...draftContent.storeProducts];
    updated[index] = { ...updated[index], [field]: value };
    updateStoreProducts(updated);
  };

  const handleAddStoreProduct = () => {
    const newProduct: StoreProduct = {
      id: `prod-${Date.now()}`,
      modelCode: 'AG-NEW-01',
      name: 'Commercial Expansion Module',
      category: storeFilter === 'all' ? 'hardware' : storeFilter,
      price: 499,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=1200&q=80',
      description: 'Rugged DIN-rail expansion module with isolated industrial I/O.',
      specs: '12V/24V DC · Modbus RTU · IP65 Enclosure',
    };
    updateStoreProducts([newProduct, ...draftContent.storeProducts]);
    showStatus('New store product created');
  };

  const handleDeleteStoreProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = draftContent.storeProducts.filter(p => p.id !== id);
      updateStoreProducts(updated);
      showStatus('Product removed');
    }
  };

  // --- BLOG POSTS HELPERS ---
  const handleBlogPostChange = (index: number, field: keyof BlogPost, value: any) => {
    const updated = [...draftContent.blogPosts];
    updated[index] = { ...updated[index], [field]: value };
    updateBlogPosts(updated);
  };

  const handleAddBlogPost = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: 'Optimizing Microclimate Dynamics in High-Density CEA',
      subtitle: 'Technical guide to humidity deficit and transpiration rates.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '6 min read',
      category: 'Systems Engineering',
      excerpt: 'Learn how automated sensor networks dynamically align fertigation with light accumulation curves.',
      content: [
        'Commercial yield stability depends on maintaining tight vapor pressure deficit parameters.',
        'Continuous sensing eliminates localized stagnation zones and ensures consistent transpiration.'
      ],
      author: 'Autogrow Engineering Team',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    };
    updateBlogPosts([newPost, ...draftContent.blogPosts]);
    showStatus('New blog post draft created');
  };

  const handleDeleteBlogPost = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const updated = draftContent.blogPosts.filter(p => p.id !== id);
      updateBlogPosts(updated);
      showStatus('Blog post removed');
    }
  };

  // --- DISTRIBUTOR HELPERS ---
  const handleDistributorChange = (index: number, field: keyof DistributorLocation, value: any) => {
    const updated = [...draftContent.distributors];
    updated[index] = { ...updated[index], [field]: value };
    updateDistributors(updated);
  };

  const handleAddDistributor = () => {
    const newDist: DistributorLocation = {
      id: `dist-${Date.now()}`,
      region: 'North America',
      country: 'United States',
      partnerName: 'Certified AgTech Partner',
      territory: 'Regional Commercial Hub',
      supportPhone: '+1 (800) 555-0199',
      email: 'support@partneragtech.com',
      website: 'https://autogrow.com',
      address: 'Industrial Parkway, Tech District',
    };
    updateDistributors([...draftContent.distributors, newDist]);
    showStatus('New distributor partner added');
  };

  const handleDeleteDistributor = (id: string) => {
    if (confirm('Delete this distributor record?')) {
      const updated = draftContent.distributors.filter(d => d.id !== id);
      updateDistributors(updated);
      showStatus('Distributor removed');
    }
  };

  return (
    <div style={{ backgroundColor: '#0B0F10', minHeight: '100vh', color: '#E5E7EB', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header Toolbar */}
      <header 
        style={{
          backgroundColor: '#161B18',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '14px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '7px',
              backgroundColor: '#76b82a',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(118, 184, 42, 0.4)',
            }}
          >
            A
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                AUTOGROW CMS
              </span>
              <span 
                style={{
                  backgroundColor: 'rgba(118, 184, 42, 0.15)',
                  color: '#86EFAC',
                  border: '1px solid rgba(118, 184, 42, 0.3)',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontFamily: 'monospace',
                }}
              >
                STATIC ZERO-DB
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>
              Client-Side Content Management & Live Visual Publisher
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onPreview}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              backgroundColor: '#1F2937',
              color: '#FFFFFF',
              border: '1px solid #374151',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Eye size={14} style={{ color: '#60A5FA' }} />
            Preview Website
          </button>

          <button
            onClick={handleSaveAndPublish}
            style={{
              padding: '8px 18px',
              borderRadius: '6px',
              backgroundColor: isDraftModified ? '#76b82a' : '#15803D',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: isDraftModified ? '0 0 12px rgba(118, 184, 42, 0.5)' : 'none',
            }}
          >
            <Check size={15} />
            {isDraftModified ? 'Publish Changes' : 'Saved (Published)'}
          </button>

          <button
            onClick={exportJson}
            title="Download full JSON config backup"
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              backgroundColor: '#1E2421',
              color: '#D1D5DB',
              border: '1px solid rgba(255,255,255,0.15)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Download size={13} />
            Export JSON
          </button>

          <button
            onClick={onExitToSite}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              backgroundColor: 'transparent',
              color: '#9CA3AF',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '12px',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <ExternalLink size={13} />
            Exit to Site
          </button>
        </div>
      </header>

      {/* 2. Notification / Modified Status Bar */}
      {statusMessage && (
        <div 
          style={{
            backgroundColor: '#15803D',
            color: '#FFFFFF',
            padding: '10px 24px',
            fontSize: '13px',
            fontWeight: 600,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Check size={16} />
          {statusMessage}
        </div>
      )}

      {isDraftModified && !statusMessage && (
        <div 
          style={{
            backgroundColor: '#854D0E',
            color: '#FEF08A',
            padding: '8px 24px',
            fontSize: '12.5px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={15} />
            <span>You have unsaved changes in your draft. They are visible in Preview Mode but not yet saved to published localStorage.</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={discardDraft}
              style={{
                background: 'none',
                border: '1px solid rgba(254, 240, 138, 0.4)',
                color: '#FEF08A',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSaveAndPublish}
              style={{
                backgroundColor: '#FEF08A',
                border: 'none',
                color: '#713F12',
                borderRadius: '4px',
                padding: '2px 10px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Publish Now
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Body: Sidebar Tabs + Editor Surface */}
      <div style={{ flex: 1, display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
        
        {/* Navigation Rail */}
        <aside 
          style={{
            width: '260px',
            backgroundColor: '#111827',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#76b82a', textTransform: 'uppercase', padding: '0 12px 6px', letterSpacing: '0.05em' }}>
              Operations & Orders
            </div>

            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'orders' ? 700 : 500,
                backgroundColor: activeTab === 'orders' ? '#1E2421' : 'transparent',
                color: activeTab === 'orders' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'orders' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <ShoppingCart size={16} style={{ color: activeTab === 'orders' ? '#76b82a' : '#9CA3AF' }} />
              Customer Orders
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'inquiries' ? 700 : 500,
                backgroundColor: activeTab === 'inquiries' ? '#1E2421' : 'transparent',
                color: activeTab === 'inquiries' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'inquiries' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                marginBottom: '10px'
              }}
            >
              <Inbox size={16} style={{ color: activeTab === 'inquiries' ? '#76b82a' : '#9CA3AF' }} />
              Inquiries & Feedback
            </button>

            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', padding: '0 12px 6px', letterSpacing: '0.05em' }}>
              Content Sections
            </div>

            <button
              onClick={() => setActiveTab('hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'hero' ? 700 : 500,
                backgroundColor: activeTab === 'hero' ? '#1E2421' : 'transparent',
                color: activeTab === 'hero' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'hero' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <Sliders size={16} style={{ color: activeTab === 'hero' ? '#76b82a' : '#9CA3AF' }} />
              Hero Banners ({draftContent.heroSlides.length})
            </button>

            <button
              onClick={() => setActiveTab('store')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'store' ? 700 : 500,
                backgroundColor: activeTab === 'store' ? '#1E2421' : 'transparent',
                color: activeTab === 'store' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'store' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <ShoppingBag size={16} style={{ color: activeTab === 'store' ? '#76b82a' : '#9CA3AF' }} />
              Store Products ({draftContent.storeProducts.length})
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'blog' ? 700 : 500,
                backgroundColor: activeTab === 'blog' ? '#1E2421' : 'transparent',
                color: activeTab === 'blog' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'blog' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <BookOpen size={16} style={{ color: activeTab === 'blog' ? '#76b82a' : '#9CA3AF' }} />
              Grower Blog ({draftContent.blogPosts.length})
            </button>

            <button
              onClick={() => setActiveTab('showcase')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'showcase' ? 700 : 500,
                backgroundColor: activeTab === 'showcase' ? '#1E2421' : 'transparent',
                color: activeTab === 'showcase' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'showcase' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <Layers size={16} style={{ color: activeTab === 'showcase' ? '#76b82a' : '#9CA3AF' }} />
              Feature Highlights ({draftContent.showcaseSections.length})
            </button>

            <button
              onClick={() => setActiveTab('support')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'support' ? 700 : 500,
                backgroundColor: activeTab === 'support' ? '#1E2421' : 'transparent',
                color: activeTab === 'support' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'support' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <PhoneCall size={16} style={{ color: activeTab === 'support' ? '#76b82a' : '#9CA3AF' }} />
              Support & Network
            </button>

            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />

            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', padding: '0 12px 8px', letterSpacing: '0.05em' }}>
              Portability
            </div>

            <button
              onClick={() => setActiveTab('json')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '13.5px',
                fontWeight: activeTab === 'json' ? 700 : 500,
                backgroundColor: activeTab === 'json' ? '#1E2421' : 'transparent',
                color: activeTab === 'json' ? '#86EFAC' : '#D1D5DB',
                border: activeTab === 'json' ? '1px solid rgba(118, 184, 42, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <FileCode size={16} style={{ color: activeTab === 'json' ? '#76b82a' : '#9CA3AF' }} />
              Raw JSON & Import
            </button>
          </nav>

          {/* Reset Defaults */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <button
              onClick={() => {
                if (confirm('Reset all CMS content to factory defaults? This clears your localStorage changes.')) {
                  resetToDefaults();
                  showStatus('Reset to factory defaults.');
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                color: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              Reset All to Defaults
            </button>
          </div>
        </aside>

        {/* Editor Main Content Area */}
        <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', maxWidth: '1200px' }}>
          
          {/* TAB: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <AdminOrdersTab />
            </div>
          )}

          {/* TAB: INQUIRIES & FEEDBACK */}
          {activeTab === 'inquiries' && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <AdminInquiriesTab />
            </div>
          )}

          {/* TAB 1: HERO SLIDES */}
          {activeTab === 'hero' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                    Hero Slider Banners
                  </h1>
                  <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13.5px' }}>
                    Configure the main full-width banner slides shown on the homepage. Upload high-res images, edit copy, and link to products.
                  </p>
                </div>
                <button
                  onClick={handleAddHeroSlide}
                  style={{
                    padding: '9px 16px',
                    backgroundColor: '#76b82a',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={15} />
                  Add Slide
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {draftContent.heroSlides.map((slide, index) => (
                  <div 
                    key={slide.id}
                    style={{
                      backgroundColor: '#161B18',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '24px',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
                      gap: '24px',
                      position: 'relative',
                    }}
                  >
                    {/* Left: Image Uploader */}
                    <div>
                      <ImageUploader 
                        label={`Slide #${index + 1} Image`}
                        value={slide.image}
                        onChange={(url) => handleHeroChange(index, 'image', url)}
                        aspectRatio="video"
                      />
                    </div>

                    {/* Right: Text Fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#76b82a', fontFamily: 'monospace' }}>
                          SLIDE {index + 1} OF {draftContent.heroSlides.length}
                        </span>
                        
                        {/* Slide Management Buttons */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            disabled={index === 0}
                            onClick={() => handleMoveHeroSlide(index, 'up')}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#1F2937',
                              border: '1px solid #374151',
                              borderRadius: '4px',
                              color: index === 0 ? '#4B5563' : '#D1D5DB',
                              cursor: index === 0 ? 'not-allowed' : 'pointer',
                            }}
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            disabled={index === draftContent.heroSlides.length - 1}
                            onClick={() => handleMoveHeroSlide(index, 'down')}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#1F2937',
                              border: '1px solid #374151',
                              borderRadius: '4px',
                              color: index === draftContent.heroSlides.length - 1 ? '#4B5563' : '#D1D5DB',
                              cursor: index === draftContent.heroSlides.length - 1 ? 'not-allowed' : 'pointer',
                            }}
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteHeroSlide(index)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              borderRadius: '4px',
                              color: '#EF4444',
                              cursor: 'pointer',
                            }}
                            title="Delete Slide"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '4px' }}>
                            Category Badge Tag
                          </label>
                          <input 
                            type="text" 
                            value={slide.tag} 
                            onChange={(e) => handleHeroChange(index, 'tag', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '4px' }}>
                            Headline Title
                          </label>
                          <input 
                            type="text" 
                            value={slide.title} 
                            onChange={(e) => handleHeroChange(index, 'title', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '4px' }}>
                          Subtitle Description
                        </label>
                        <textarea 
                          rows={2}
                          value={slide.subtitle} 
                          onChange={(e) => handleHeroChange(index, 'subtitle', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '4px' }}>
                            Button CTA Text
                          </label>
                          <input 
                            type="text" 
                            value={slide.buttonText} 
                            onChange={(e) => handleHeroChange(index, 'buttonText', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '4px' }}>
                            Target Section Destination
                          </label>
                          <select 
                            value={slide.targetSection}
                            onChange={(e) => handleHeroChange(index, 'targetSection', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                          >
                            <option value="suite">Specialized Hardware Suite (#suite)</option>
                            <option value="app-preview">Autogrow App Preview (#app-preview)</option>
                            <option value="where-to-buy">Where to Buy & Support (#where-to-buy)</option>
                            <option value="grower-stories">Grower Case Studies (#grower-stories)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: STORE PRODUCTS */}
          {activeTab === 'store' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                    Online Store & Spare Parts Catalog
                  </h1>
                  <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13.5px' }}>
                    Manage controllers, hardware lineups, and factory spare parts available in the online direct store.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleAddStoreProduct}
                    style={{
                      padding: '9px 16px',
                      backgroundColor: '#76b82a',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={15} />
                    Add Product
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                {(['all', 'controllers', 'hardware', 'parts'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setStoreFilter(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: storeFilter === cat ? 700 : 500,
                      backgroundColor: storeFilter === cat ? '#76b82a' : '#1F2937',
                      color: storeFilter === cat ? '#FFFFFF' : '#D1D5DB',
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {cat === 'all' ? 'All Products' : cat === 'parts' ? 'Spare Parts' : cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
                {draftContent.storeProducts
                  .filter(p => storeFilter === 'all' || p.category === storeFilter)
                  .map((product) => {
                    const originalIndex = draftContent.storeProducts.findIndex(p => p.id === product.id);
                    return (
                      <div 
                        key={product.id}
                        style={{
                          backgroundColor: '#161B18',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          padding: '18px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#76b82a', fontWeight: 700 }}>
                            {product.modelCode}
                          </span>
                          <button
                            onClick={() => handleDeleteStoreProduct(product.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#EF4444',
                              cursor: 'pointer',
                              padding: '2px',
                            }}
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <ImageUploader 
                          label="Product Photo"
                          value={product.image}
                          onChange={(url) => handleStoreProductChange(originalIndex, 'image', url)}
                          aspectRatio="card"
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Model Code</label>
                            <input 
                              type="text" 
                              value={product.modelCode}
                              onChange={(e) => handleStoreProductChange(originalIndex, 'modelCode', e.target.value)}
                              style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px', fontFamily: 'monospace' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Category</label>
                            <select
                              value={product.category}
                              onChange={(e) => handleStoreProductChange(originalIndex, 'category', e.target.value as any)}
                              style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                            >
                              <option value="controllers">Controllers</option>
                              <option value="hardware">Hardware</option>
                              <option value="parts">Spare Parts</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Product Name</label>
                          <input 
                            type="text" 
                            value={product.name}
                            onChange={(e) => handleStoreProductChange(originalIndex, 'name', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Price (USD $)</label>
                            <input 
                              type="number" 
                              value={product.price}
                              onChange={(e) => handleStoreProductChange(originalIndex, 'price', parseFloat(e.target.value) || 0)}
                              style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                            />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '16px' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', color: product.inStock ? '#86EFAC' : '#EF4444' }}>
                              <input 
                                type="checkbox" 
                                checked={product.inStock}
                                onChange={(e) => handleStoreProductChange(originalIndex, 'inStock', e.target.checked)}
                              />
                              {product.inStock ? 'In Stock (Ready)' : 'Out of Stock'}
                            </label>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Description</label>
                          <textarea 
                            rows={2}
                            value={product.description}
                            onChange={(e) => handleStoreProductChange(originalIndex, 'description', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px', resize: 'vertical' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Specs Badge</label>
                          <input 
                            type="text" 
                            value={product.specs}
                            onChange={(e) => handleStoreProductChange(originalIndex, 'specs', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '11px', fontFamily: 'monospace' }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 3: GROWER BLOG */}
          {activeTab === 'blog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                    Grower Blog & Technical Guides
                  </h1>
                  <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13.5px' }}>
                    Publish educational articles, agronomic whitepapers, and customer case studies.
                  </p>
                </div>
                <button
                  onClick={handleAddBlogPost}
                  style={{
                    padding: '9px 16px',
                    backgroundColor: '#76b82a',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={15} />
                  New Article
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {draftContent.blogPosts.map((post, index) => (
                  <div 
                    key={post.id}
                    style={{
                      backgroundColor: '#161B18',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '24px',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(260px, 1fr) 2fr',
                      gap: '24px',
                    }}
                  >
                    <div>
                      <ImageUploader 
                        label="Article Cover Photo"
                        value={post.image}
                        onChange={(url) => handleBlogPostChange(index, 'image', url)}
                        aspectRatio="card"
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#76b82a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {post.category} · {post.readTime}
                        </span>
                        <button
                          onClick={() => handleDeleteBlogPost(post.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                          }}
                          title="Delete Article"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Article Title</label>
                        <input 
                          type="text" 
                          value={post.title}
                          onChange={(e) => handleBlogPostChange(index, 'title', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '14px', fontWeight: 700 }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Category</label>
                          <input 
                            type="text" 
                            value={post.category}
                            onChange={(e) => handleBlogPostChange(index, 'category', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Date</label>
                          <input 
                            type="text" 
                            value={post.date}
                            onChange={(e) => handleBlogPostChange(index, 'date', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Read Time</label>
                          <input 
                            type="text" 
                            value={post.readTime}
                            onChange={(e) => handleBlogPostChange(index, 'readTime', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Author Byline</label>
                        <input 
                          type="text" 
                          value={post.author}
                          onChange={(e) => handleBlogPostChange(index, 'author', e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>Short Summary Excerpt</label>
                        <textarea 
                          rows={2}
                          value={post.excerpt}
                          onChange={(e) => handleBlogPostChange(index, 'excerpt', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '12.5px', resize: 'vertical' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', color: '#9CA3AF', marginBottom: '3px' }}>
                          Article Content Paragraphs (separate paragraphs with blank lines)
                        </label>
                        <textarea 
                          rows={4}
                          value={post.content.join('\n\n')}
                          onChange={(e) => handleBlogPostChange(index, 'content', e.target.value.split('\n\n').filter(Boolean))}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '12.5px', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SHOWCASE SECTIONS */}
          {activeTab === 'showcase' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  Full-Bleed Feature Highlights
                </h1>
                <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13.5px' }}>
                  The 4 prominent background banner sections on the homepage (tekst-met-achtergrond format).
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {draftContent.showcaseSections.map((sec, index) => (
                  <div 
                    key={sec.id}
                    style={{
                      backgroundColor: '#161B18',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '24px',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
                      gap: '24px',
                    }}
                  >
                    <ImageUploader 
                      label={`Section #${index + 1} Background`}
                      value={sec.image}
                      onChange={(url) => handleShowcaseChange(index, 'image', url)}
                      aspectRatio="video"
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#76b82a', fontFamily: 'monospace' }}>
                        SECTION {index + 1} (ID: {sec.id})
                      </span>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Headline</label>
                        <input 
                          type="text" 
                          value={sec.title}
                          onChange={(e) => handleShowcaseChange(index, 'title', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '14px', fontWeight: 700 }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Description</label>
                        <textarea 
                          rows={3}
                          value={sec.description}
                          onChange={(e) => handleShowcaseChange(index, 'description', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Button Text</label>
                          <input 
                            type="text" 
                            value={sec.buttonText}
                            onChange={(e) => handleShowcaseChange(index, 'buttonText', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Target Section</label>
                          <select 
                            value={sec.targetSection}
                            onChange={(e) => handleShowcaseChange(index, 'targetSection', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                          >
                            <option value="suite">Hardware Suite (#suite)</option>
                            <option value="where-to-buy">Where to Buy (#where-to-buy)</option>
                            <option value="app-preview">App Preview (#app-preview)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SUPPORT & NETWORK */}
          {activeTab === 'support' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  Support Hotlines & Global Distributors
                </h1>
                <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13.5px' }}>
                  Manage the telephone hotlines shown in the header/support bar and official commercial distribution partners.
                </p>
              </div>

              {/* Support Contacts Card */}
              <div 
                style={{
                  backgroundColor: '#161B18',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '24px',
                  marginBottom: '32px',
                }}
              >
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#86EFAC', margin: '0 0 16px 0' }}>
                  Global Helpdesk Contact Information
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>North America Hotline</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.phoneUs}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, phoneUs: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>New Zealand Global HQ</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.phoneNz}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, phoneNz: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>South East Asia Hub</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.phoneSea}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, phoneSea: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Support Operating Hours</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.supportHours}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, supportHours: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Helpdesk Email</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.emailHelp}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, emailHelp: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginBottom: '3px' }}>Engineering Support Email</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.emailEngineering}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, emailEngineering: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '6px', color: '#FFFFFF', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Distributors Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px 0' }}>
                    Distributor Partners ({draftContent.distributors.length})
                  </h2>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#9CA3AF' }}>
                    Locations shown on the interactive distributor finder map.
                  </p>
                </div>
                <button
                  onClick={handleAddDistributor}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#76b82a',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={14} />
                  Add Partner
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {draftContent.distributors.map((d, index) => (
                  <div 
                    key={d.id}
                    style={{
                      backgroundColor: '#161B18',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#76b82a', fontWeight: 700 }}>{d.region}</span>
                      <button
                        onClick={() => handleDeleteDistributor(d.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                        title="Delete Distributor"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '10px', color: '#9CA3AF' }}>Partner Name</label>
                      <input 
                        type="text" 
                        value={d.partnerName}
                        onChange={(e) => handleDistributorChange(index, 'partnerName', e.target.value)}
                        style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: '#9CA3AF' }}>Country</label>
                        <input 
                          type="text" 
                          value={d.country}
                          onChange={(e) => handleDistributorChange(index, 'country', e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: '#9CA3AF' }}>Phone</label>
                        <input 
                          type="text" 
                          value={d.supportPhone}
                          onChange={(e) => handleDistributorChange(index, 'supportPhone', e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '10px', color: '#9CA3AF' }}>Email Helpdesk</label>
                      <input 
                        type="text" 
                        value={d.email}
                        onChange={(e) => handleDistributorChange(index, 'email', e.target.value)}
                        style={{ width: '100%', padding: '6px 8px', backgroundColor: '#0B0F10', border: '1px solid #374151', borderRadius: '4px', color: '#FFFFFF', fontSize: '12px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RAW JSON & BACKUPS */}
          {activeTab === 'json' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                  Static JSON Config & Zero-DB Portability
                </h1>
                <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13.5px' }}>
                  Download or import complete website states as pure JSON. You can commit exported JSON directly into your git repository or transfer configurations across browsers.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Export Card */}
                <div 
                  style={{
                    backgroundColor: '#161B18',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '24px',
                  }}
                >
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={18} style={{ color: '#76b82a' }} />
                    Download JSON Backup
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#9CA3AF', lineHeight: 1.5, marginBottom: '16px' }}>
                    Downloads the active draft configuration with all hero banners, products, articles, and image data URLs.
                  </p>
                  <button
                    onClick={exportJson}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: '#76b82a',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Download size={15} />
                    Download autogrow-cms-content.json
                  </button>
                </div>

                {/* Import Card */}
                <div 
                  style={{
                    backgroundColor: '#161B18',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '24px',
                  }}
                >
                  <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload size={18} style={{ color: '#60A5FA' }} />
                    Import JSON File
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#9CA3AF', lineHeight: 1.5, marginBottom: '16px' }}>
                    Upload an existing JSON export to restore or switch site configuration.
                  </p>
                  <label 
                    style={{
                      padding: '10px 18px',
                      backgroundColor: '#1F2937',
                      color: '#FFFFFF',
                      border: '1px solid #374151',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Upload size={15} style={{ color: '#60A5FA' }} />
                    Choose JSON File
                    <input 
                      type="file" 
                      accept=".json"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const str = event.target?.result as string;
                            if (importJson(str)) {
                              showStatus('JSON imported successfully into working draft!');
                            } else {
                              alert('Failed to parse JSON. Please ensure it follows the Autogrow CMS format.');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Paste JSON directly */}
              <div 
                style={{
                  backgroundColor: '#161B18',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    Direct JSON Paste / Inspect
                  </h2>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(draftContent, null, 2));
                      showStatus('Active JSON copied to clipboard!');
                    }}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#1F2937',
                      color: '#D1D5DB',
                      border: '1px solid #374151',
                      borderRadius: '4px',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                    }}
                  >
                    Copy Active JSON
                  </button>
                </div>
                <textarea 
                  rows={12}
                  placeholder="Paste JSON content here..."
                  value={importJsonText || JSON.stringify(draftContent, null, 2)}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#0B0F10',
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: '#86EFAC',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    resize: 'vertical',
                  }}
                />
                {importJsonText && (
                  <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => {
                        if (importJson(importJsonText)) {
                          showStatus('Custom JSON applied to draft!');
                          setImportJsonText('');
                        } else {
                          alert('Invalid JSON structure.');
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#76b82a',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Apply Pasted JSON
                    </button>
                    <button
                      onClick={() => setImportJsonText('')}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: 'transparent',
                        color: '#9CA3AF',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
