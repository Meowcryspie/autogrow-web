import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff,
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
  Globe,
  ShoppingCart,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Users,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { SUPERADMIN_EMAIL } from '../../lib/authSecurity';
import { ImageUploader } from './ImageUploader';
import type { HeroSlideItem, ShowcaseSectionItem, StoreProduct, BlogPost, DistributorLocation } from '../../types';

interface AdminConsoleProps {
  onExitToSite: () => void;
  onPreview: () => void;
}

type AdminTab = 'hero' | 'store' | 'blog' | 'showcase' | 'support' | 'staff' | 'json';

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

  const { 
    user: currentAuthUser, 
    isSuperAdmin, 
    getAllUsers, 
    promoteUser, 
    demoteUser, 
    authorizeStaff, 
    revokeStaff, 
    getStaffList 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [storeFilter, setStoreFilter] = useState<'all' | 'controllers' | 'hardware' | 'parts'>('all');
  const [storeVisibilityFilter, setStoreVisibilityFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [blogVisibilityFilter, setBlogVisibilityFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');

  // Staff & Admin Access State
  const [staffUsers, setStaffUsers] = useState<any[]>([]);
  const [whitelistEmails, setWhitelistEmails] = useState<string[]>([]);
  const [newStaffEmailInput, setNewStaffEmailInput] = useState('');
  const [staffLoading, setStaffLoading] = useState(false);

  const loadStaffData = async () => {
    setStaffLoading(true);
    try {
      const uList = await getAllUsers();
      setStaffUsers(uList);
      setWhitelistEmails(getStaffList());
    } finally {
      setStaffLoading(false);
    }
  };

  React.useEffect(() => {
    if (activeTab === 'staff') {
      loadStaffData();
    }
  }, [activeTab]);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleSaveAndPublish = () => {
    publishDraft();
    showStatus('Changes saved and published to production live website!');
  };

  // Active vs Deactivated Counts for summary KPIs and badges
  const heroTotal = draftContent.heroSlides.length;
  const heroActive = draftContent.heroSlides.filter(s => s.isActive !== false).length;
  const heroDeactivated = heroTotal - heroActive;

  const showcaseTotal = draftContent.showcaseSections.length;
  const showcaseActive = draftContent.showcaseSections.filter(s => s.isActive !== false).length;
  const showcaseDeactivated = showcaseTotal - showcaseActive;

  const storeTotal = draftContent.storeProducts.length;
  const storeActive = draftContent.storeProducts.filter(p => p.isActive !== false).length;
  const storeDeactivated = storeTotal - storeActive;

  const blogTotal = draftContent.blogPosts.length;
  const blogActive = draftContent.blogPosts.filter(b => b.isActive !== false).length;
  const blogDeactivated = blogTotal - blogActive;

  const distTotal = draftContent.distributors.length;
  const distActive = draftContent.distributors.filter(d => d.isActive !== false).length;
  const distDeactivated = distTotal - distActive;

  // --- HERO SLIDES HELPERS ---
  const handleToggleHeroActive = (index: number) => {
    const updated = [...draftContent.heroSlides];
    const current = updated[index].isActive !== false;
    updated[index] = { ...updated[index], isActive: !current };
    updateHeroSlides(updated);
    showStatus(current ? `Deactivated Slide #${index + 1} (hidden from public site)` : `Re-activated Slide #${index + 1} (visible on public site)`);
  };

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
    showStatus('New hero slide added to working draft');
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
  const handleToggleShowcaseActive = (index: number) => {
    const updated = [...draftContent.showcaseSections];
    const current = updated[index].isActive !== false;
    updated[index] = { ...updated[index], isActive: !current };
    updateShowcaseSections(updated);
    showStatus(current ? `Deactivated Section #${index + 1} (hidden from public site)` : `Re-activated Section #${index + 1} (visible on public site)`);
  };

  const handleShowcaseChange = (index: number, field: keyof ShowcaseSectionItem, value: any) => {
    const updated = [...draftContent.showcaseSections];
    updated[index] = { ...updated[index], [field]: value };
    updateShowcaseSections(updated);
  };

  // --- STORE PRODUCTS HELPERS ---
  const handleToggleStoreProductActive = (id: string) => {
    const target = draftContent.storeProducts.find(p => p.id === id);
    if (!target) return;
    const current = target.isActive !== false;
    const updated = draftContent.storeProducts.map(p => p.id === id ? { ...p, isActive: !current } : p);
    updateStoreProducts(updated);
    showStatus(current ? `Deactivated "${target.name}" (hidden from online store)` : `Re-activated "${target.name}" (visible in online store)`);
  };

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
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
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
  const handleToggleBlogPostActive = (id: string) => {
    const target = draftContent.blogPosts.find(b => b.id === id);
    if (!target) return;
    const current = target.isActive !== false;
    const updated = draftContent.blogPosts.map(b => b.id === id ? { ...b, isActive: !current } : b);
    updateBlogPosts(updated);
    showStatus(current ? `Deactivated article "${target.title}" (hidden from blog)` : `Re-activated article "${target.title}" (visible on blog)`);
  };

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
  const handleToggleDistributorActive = (id: string) => {
    const target = draftContent.distributors.find(d => d.id === id);
    if (!target) return;
    const current = target.isActive !== false;
    const updated = draftContent.distributors.map(d => d.id === id ? { ...d, isActive: !current } : d);
    updateDistributors(updated);
    showStatus(current ? `Deactivated distributor "${target.partnerName}" (hidden from directory)` : `Re-activated distributor "${target.partnerName}" (visible in directory)`);
  };

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

  const tabLabels: Record<AdminTab, string> = {
    hero: 'Hero Slider Banners',
    store: 'Store & Spare Parts Catalog',
    blog: 'Grower Blog & Technical Guides',
    showcase: 'Feature Highlights',
    support: 'Support Hotlines & Distributors',
    staff: 'Staff & Admin Access Control',
    json: 'Raw JSON & Data Backup',
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', color: '#0F172A', display: 'flex' }}>
      
      {/* ======================================================== */}
      {/* 1. WORDPRESS / WIX STYLE ADMIN SIDEBAR (DEEP SLATE CHROME) */}
      {/* ======================================================== */}
      <aside 
        style={{
          width: '270px',
          backgroundColor: '#0F172A',
          borderRight: '1px solid #1E293B',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
        }}
      >
        <div>
          {/* Site Identity Header (Wix/WordPress Site Selector) */}
          <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #1E293B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                A
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  Autogrow Web
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Globe size={11} style={{ color: '#64748B' }} />
                  <span>autogrow.co.nz</span>
                  <ExternalLink size={10} style={{ color: '#64748B' }} />
                </div>
              </div>
            </div>

            {/* Production Status Tag */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(22, 163, 74, 0.15)',
                border: '1px solid rgba(22, 163, 74, 0.3)',
                padding: '3px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#86EFAC',
                marginTop: '4px',
              }}
            >
              <ShieldCheck size={12} style={{ color: '#22C55E' }} />
              Production Live
            </div>
          </div>

          {/* Navigation Groups */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            
            <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', padding: '8px 10px 4px', letterSpacing: '0.08em' }}>
              Site Content
            </div>

            {/* 1. Hero Banners */}
            <button
              onClick={() => setActiveTab('hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'hero' ? 700 : 500,
                backgroundColor: activeTab === 'hero' ? '#1E293B' : 'transparent',
                color: activeTab === 'hero' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'hero' ? '1px solid #334155' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sliders size={16} style={{ color: activeTab === 'hero' ? '#22C55E' : '#64748B' }} />
                Hero Banners
              </div>
              <span 
                title={heroDeactivated > 0 ? `${heroActive} active, ${heroDeactivated} deactivated` : `${heroTotal} active slides`}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: heroDeactivated > 0 ? '#B45309' : activeTab === 'hero' ? '#16A34A' : '#334155',
                  color: '#FFFFFF'
                }}
              >
                {heroDeactivated > 0 ? `${heroActive}/${heroTotal}` : heroTotal}
              </span>
            </button>

            {/* 2. Solutions Showcase */}
            <button
              onClick={() => setActiveTab('showcase')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'showcase' ? 700 : 500,
                backgroundColor: activeTab === 'showcase' ? '#1E293B' : 'transparent',
                color: activeTab === 'showcase' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'showcase' ? '1px solid #334155' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={16} style={{ color: activeTab === 'showcase' ? '#22C55E' : '#64748B' }} />
                Feature Highlights
              </div>
              <span 
                title={showcaseDeactivated > 0 ? `${showcaseActive} active, ${showcaseDeactivated} deactivated` : `${showcaseTotal} active highlights`}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: showcaseDeactivated > 0 ? '#B45309' : activeTab === 'showcase' ? '#16A34A' : '#334155',
                  color: '#FFFFFF'
                }}
              >
                {showcaseDeactivated > 0 ? `${showcaseActive}/${showcaseTotal}` : showcaseTotal}
              </span>
            </button>

            {/* 3. Store Products */}
            <button
              onClick={() => setActiveTab('store')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'store' ? 700 : 500,
                backgroundColor: activeTab === 'store' ? '#1E293B' : 'transparent',
                color: activeTab === 'store' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'store' ? '1px solid #334155' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={16} style={{ color: activeTab === 'store' ? '#22C55E' : '#64748B' }} />
                Store Catalog
              </div>
              <span 
                title={storeDeactivated > 0 ? `${storeActive} active, ${storeDeactivated} deactivated` : `${storeTotal} active products`}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: storeDeactivated > 0 ? '#B45309' : activeTab === 'store' ? '#16A34A' : '#334155',
                  color: '#FFFFFF'
                }}
              >
                {storeDeactivated > 0 ? `${storeActive}/${storeTotal}` : storeTotal}
              </span>
            </button>

            {/* 4. Grower Blog */}
            <button
              onClick={() => setActiveTab('blog')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'blog' ? 700 : 500,
                backgroundColor: activeTab === 'blog' ? '#1E293B' : 'transparent',
                color: activeTab === 'blog' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'blog' ? '1px solid #334155' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={16} style={{ color: activeTab === 'blog' ? '#22C55E' : '#64748B' }} />
                Grower Articles
              </div>
              <span 
                title={blogDeactivated > 0 ? `${blogActive} published, ${blogDeactivated} deactivated` : `${blogTotal} published articles`}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: blogDeactivated > 0 ? '#B45309' : activeTab === 'blog' ? '#16A34A' : '#334155',
                  color: '#FFFFFF'
                }}
              >
                {blogDeactivated > 0 ? `${blogActive}/${blogTotal}` : blogTotal}
              </span>
            </button>

            {/* 5. Support & Distributors */}
            <button
              onClick={() => setActiveTab('support')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'support' ? 700 : 500,
                backgroundColor: activeTab === 'support' ? '#1E293B' : 'transparent',
                color: activeTab === 'support' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'support' ? '1px solid #334155' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PhoneCall size={16} style={{ color: activeTab === 'support' ? '#22C55E' : '#64748B' }} />
                Support & Network
              </div>
              <span 
                title={distDeactivated > 0 ? `${distActive} active, ${distDeactivated} deactivated` : `${distTotal} active hubs`}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: distDeactivated > 0 ? '#B45309' : activeTab === 'support' ? '#16A34A' : '#334155',
                  color: '#FFFFFF'
                }}
              >
                {distDeactivated > 0 ? `${distActive}/${distTotal}` : distTotal}
              </span>
            </button>

            <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', padding: '16px 10px 4px', letterSpacing: '0.08em' }}>
              System & Permissions
            </div>

            {/* Staff & Admin Access Control (Superadmin) */}
            <button
              onClick={() => setActiveTab('staff')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'staff' ? 700 : 500,
                backgroundColor: activeTab === 'staff' ? '#1E293B' : 'transparent',
                color: activeTab === 'staff' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'staff' ? '1px solid #334155' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={16} style={{ color: activeTab === 'staff' ? '#22C55E' : '#64748B' }} />
                Staff & Admin Access
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '1px 6px', borderRadius: '999px', backgroundColor: '#15803D', color: '#FFFFFF' }}>
                {staffUsers.filter(u => u.role === 'admin').length || 1}
              </span>
            </button>

            {/* 6. Raw JSON & Import */}
            <button
              onClick={() => setActiveTab('json')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'json' ? 700 : 500,
                backgroundColor: activeTab === 'json' ? '#1E293B' : 'transparent',
                color: activeTab === 'json' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'json' ? '1px solid #334155' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <FileCode size={16} style={{ color: activeTab === 'json' ? '#22C55E' : '#64748B' }} />
              Data Backup & Sync
            </button>

            {/* Quick Links to Management Pages */}
            <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', padding: '16px 10px 4px', letterSpacing: '0.08em' }}>
              Direct Operations
            </div>

            <a
              href="#orders"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#94A3B8',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <ShoppingCart size={15} style={{ color: '#F59E0B' }} />
              Manage Orders
            </a>

            <a
              href="#feedback"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#94A3B8',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <MessageSquare size={15} style={{ color: '#38BDF8' }} />
              Grower Feedback
            </a>

          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div style={{ padding: '16px', borderTop: '1px solid #1E293B', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => {
              if (confirm('Reset all CMS content to factory defaults? This clears your localStorage working changes.')) {
                resetToDefaults();
                showStatus('Reset to factory defaults.');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '7px 10px',
              borderRadius: '6px',
              fontSize: '11.5px',
              color: '#F87171',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={12} />
            Reset to Factory Defaults
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#334155',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                CO
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>Chief Admin</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Operations Lead</div>
              </div>
            </div>

            <button
              onClick={onExitToSite}
              title="Return to public site"
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <ExternalLink size={15} />
            </button>
          </div>
        </div>

      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN APPLICATION CANVAS (DAYLIGHT CMS WORKSPACE)      */}
      {/* ======================================================== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        
        {/* Top Header App Bar (Wix / WordPress Admin Bar) */}
        <header 
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            padding: '12px 32px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          {/* Breadcrumbs & Active Page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ color: '#64748B', fontWeight: 500 }}>Autogrow NZ</span>
            <ChevronRight size={13} style={{ color: '#94A3B8' }} />
            <span style={{ color: '#64748B', fontWeight: 500 }}>Site Management</span>
            <ChevronRight size={13} style={{ color: '#94A3B8' }} />
            <span style={{ color: '#0F172A', fontWeight: 700 }}>{tabLabels[activeTab]}</span>
          </div>

          {/* Action Buttons Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Unsaved Draft Changes Pill */}
            {isDraftModified && (
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  color: '#92400E',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                <AlertTriangle size={13} style={{ color: '#D97706' }} />
                <span>Unsaved Changes</span>
                <button
                  onClick={discardDraft}
                  style={{
                    marginLeft: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#B45309',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Discard
                </button>
              </div>
            )}

            {/* Preview Button */}
            <button
              onClick={onPreview}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <Eye size={14} style={{ color: '#0284C7' }} />
              Preview Site
            </button>

            {/* Export JSON Button */}
            <button
              onClick={exportJson}
              title="Download full JSON backup"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <Download size={13} />
              Export JSON
            </button>

            {/* Publish Changes Button */}
            <button
              onClick={handleSaveAndPublish}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                backgroundColor: '#16A34A',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(22, 163, 74, 0.3)',
              }}
            >
              <Check size={15} />
              {isDraftModified ? 'Publish Changes' : 'Saved (Published)'}
            </button>

            {/* Exit to Site Button */}
            <button
              onClick={onExitToSite}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: '#F1F5F9',
                color: '#475569',
                border: '1px solid #E2E8F0',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <ExternalLink size={13} />
              Exit
            </button>

          </div>
        </header>

        {/* Status Notification Toast */}
        {statusMessage && (
          <div 
            style={{
              backgroundColor: '#ECFDF5',
              borderBottom: '1px solid #A7F3D0',
              color: '#065F46',
              padding: '10px 32px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={16} style={{ color: '#059669' }} />
            {statusMessage}
          </div>
        )}

        {/* Content Area Main Scrollable View */}
        <main style={{ flex: 1, padding: '28px 36px', maxWidth: '1240px', width: '100%', boxSizing: 'border-box' }}>
          
          {/* Quick Metrics Ribbon (Wix / WordPress Style Summary Cards) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Hero Banners
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                {heroActive} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>Active Slides</span>
              </div>
              <div style={{ fontSize: '11px', color: heroDeactivated > 0 ? '#B45309' : '#16A34A', marginTop: '4px', fontWeight: 600 }}>
                {heroDeactivated > 0 ? `⚠️ ${heroDeactivated} slide(s) deactivated (hidden)` : '● All hero slides active on website'}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Store Catalog
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                {storeActive} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>Live SKUs</span>
              </div>
              <div style={{ fontSize: '11px', color: storeDeactivated > 0 ? '#B45309' : '#64748B', marginTop: '4px', fontWeight: storeDeactivated > 0 ? 600 : 400 }}>
                {storeDeactivated > 0 ? `⚠️ ${storeDeactivated} product(s) deactivated (kept in CMS)` : 'Controllers, Skids & Sensors'}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Grower Articles
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                {blogActive} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>Live Articles</span>
              </div>
              <div style={{ fontSize: '11px', color: blogDeactivated > 0 ? '#B45309' : '#64748B', marginTop: '4px', fontWeight: blogDeactivated > 0 ? 600 : 400 }}>
                {blogDeactivated > 0 ? `⚠️ ${blogDeactivated} article(s) deactivated (kept in CMS)` : 'Agronomy & CEA Engineering'}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Global Network
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                {distActive} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748B' }}>Active Hubs</span>
              </div>
              <div style={{ fontSize: '11px', color: distDeactivated > 0 ? '#B45309' : '#16A34A', marginTop: '4px', fontWeight: 600 }}>
                {distDeactivated > 0 ? `⚠️ ${distDeactivated} partner(s) deactivated` : '● 24/7 Support Hotlines Connected'}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: HERO SLIDES (EASY HUMAN CONTENT EDITING)          */}
          {/* ======================================================== */}
          {activeTab === 'hero' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                    Hero Slider Banners
                  </h1>
                  <p style={{ margin: 0, color: '#64748B', fontSize: '13.5px' }}>
                    Configure the main homepage hero slides. Upload high-res images, edit typography, and set target CTA links.
                  </p>
                </div>
                <button
                  onClick={handleAddHeroSlide}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(22, 163, 74, 0.25)',
                  }}
                >
                  <Plus size={15} />
                  Add Slide
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {draftContent.heroSlides.map((slide, index) => {
                  const isDeactivated = slide.isActive === false;
                  return (
                    <div 
                      key={slide.id}
                      style={{
                        backgroundColor: isDeactivated ? '#FFFDF5' : '#FFFFFF',
                        border: isDeactivated ? '1px dashed #F59E0B' : '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '24px',
                        display: 'grid',
                        gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
                        gap: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        position: 'relative',
                      }}
                    >
                      {/* Left: Image Uploader */}
                      <div style={{ opacity: isDeactivated ? 0.75 : 1 }}>
                        <ImageUploader 
                          label={`Slide #${index + 1} Image ${isDeactivated ? '(Deactivated)' : ''}`}
                          value={slide.image}
                          onChange={(url) => handleHeroChange(index, 'image', url)}
                          aspectRatio="video"
                        />
                      </div>

                      {/* Right: Text Fields */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {isDeactivated && (
                          <div 
                            style={{
                              backgroundColor: '#FEF3C7',
                              border: '1px solid #FDE68A',
                              borderRadius: '6px',
                              padding: '8px 12px',
                              fontSize: '12px',
                              color: '#92400E',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px',
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <EyeOff size={14} style={{ color: '#D97706' }} />
                              Deactivated · This hero banner is hidden from website visitors but kept in your system.
                            </span>
                            <button
                              onClick={() => handleToggleHeroActive(index)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#15803D',
                                fontWeight: 800,
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '12px',
                              }}
                            >
                              Re-activate now
                            </button>
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          {isDeactivated ? (
                            <span 
                              style={{ 
                                fontSize: '11px', 
                                fontWeight: 700, 
                                color: '#B45309', 
                                backgroundColor: '#FEF3C7',
                                border: '1px solid #FDE68A',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <EyeOff size={11} />
                              SLIDE {index + 1} · DEACTIVATED (HIDDEN)
                            </span>
                          ) : (
                            <span 
                              style={{ 
                                fontSize: '11.5px', 
                                fontWeight: 700, 
                                color: '#15803D', 
                                backgroundColor: '#DCFCE7',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                              SLIDE {index + 1} OF {heroTotal} {index === 0 && '· (DEFAULT HERO)'}
                            </span>
                          )}
                          
                          {/* Slide Management Buttons: Activate/Deactivate, Move, Delete */}
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={() => handleToggleHeroActive(index)}
                              style={{
                                padding: '5px 10px',
                                backgroundColor: isDeactivated ? '#16A34A' : '#F8FAFC',
                                border: `1px solid ${isDeactivated ? '#16A34A' : '#CBD5E1'}`,
                                borderRadius: '4px',
                                color: isDeactivated ? '#FFFFFF' : '#475569',
                                fontSize: '11.5px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                boxShadow: isDeactivated ? '0 1px 2px rgba(22, 163, 74, 0.25)' : 'none',
                              }}
                              title={isDeactivated ? "Re-activate to show on website again" : "Deactivate to hide from website without deleting"}
                            >
                              {isDeactivated ? (
                                <>
                                  <Eye size={13} />
                                  Re-activate
                                </>
                              ) : (
                                <>
                                  <EyeOff size={13} style={{ color: '#D97706' }} />
                                  Deactivate
                                </>
                              )}
                            </button>

                            <button
                              disabled={index === 0}
                              onClick={() => handleMoveHeroSlide(index, 'up')}
                              style={{
                                padding: '5px 8px',
                                backgroundColor: '#F8FAFC',
                                border: '1px solid #CBD5E1',
                                borderRadius: '4px',
                                color: index === 0 ? '#94A3B8' : '#334155',
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
                                padding: '5px 8px',
                                backgroundColor: '#F8FAFC',
                                border: '1px solid #CBD5E1',
                                borderRadius: '4px',
                                color: index === draftContent.heroSlides.length - 1 ? '#94A3B8' : '#334155',
                                cursor: index === draftContent.heroSlides.length - 1 ? 'not-allowed' : 'pointer',
                              }}
                              title="Move Down"
                            >
                              <ArrowDown size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteHeroSlide(index)}
                              style={{
                                padding: '5px 8px',
                                backgroundColor: '#FEF2F2',
                                border: '1px solid #FECACA',
                                borderRadius: '4px',
                                color: '#DC2626',
                                cursor: 'pointer',
                              }}
                              title="Delete Slide Permanently"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                            Category Badge Tag
                          </label>
                          <input 
                            type="text" 
                            value={slide.tag} 
                            onChange={(e) => handleHeroChange(index, 'tag', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                            Headline Title
                          </label>
                          <input 
                            type="text" 
                            value={slide.title} 
                            onChange={(e) => handleHeroChange(index, 'title', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px', fontWeight: 600 }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                          Subtitle Description
                        </label>
                        <textarea 
                          rows={2}
                          value={slide.subtitle} 
                          onChange={(e) => handleHeroChange(index, 'subtitle', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px', resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                            Button CTA Text
                          </label>
                          <input 
                            type="text" 
                            value={slide.buttonText} 
                            onChange={(e) => handleHeroChange(index, 'buttonText', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                            Target Section Destination
                          </label>
                          <select 
                            value={slide.targetSection}
                            onChange={(e) => handleHeroChange(index, 'targetSection', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                          >
                            <option value="suite">Specialized Hardware Suite (#suite)</option>
                            <option value="showcase">Solutions Showcase (#showcase)</option>
                            <option value="app">Autogrow Mobile App (#app)</option>
                            <option value="where-to-buy">Where to Buy & Support (#where-to-buy)</option>
                            <option value="stories">Grower Case Studies (#stories)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: STORE PRODUCTS CATALOG                            */}
          {/* ======================================================== */}
          {activeTab === 'store' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                    Online Store & Spare Parts Catalog
                  </h1>
                  <p style={{ margin: 0, color: '#64748B', fontSize: '13.5px' }}>
                    Manage commercial controllers, dosing skids, aspirated canopy pods, and direct parts in the store catalog.
                  </p>
                </div>
                <button
                  onClick={handleAddStoreProduct}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(22, 163, 74, 0.25)',
                  }}
                >
                  <Plus size={15} />
                  Add Product
                </button>
              </div>

              {/* Category & Visibility Filter Pills */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['all', 'controllers', 'hardware', 'parts'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setStoreFilter(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: storeFilter === cat ? 700 : 500,
                        backgroundColor: storeFilter === cat ? '#16A34A' : '#FFFFFF',
                        color: storeFilter === cat ? '#FFFFFF' : '#475569',
                        border: storeFilter === cat ? '1px solid #16A34A' : '1px solid #CBD5E1',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                      }}
                    >
                      {cat === 'all' ? 'All Categories' : cat === 'parts' ? 'Spare Parts' : cat}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', backgroundColor: '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
                  <button
                    onClick={() => setStoreVisibilityFilter('all')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: storeVisibilityFilter === 'all' ? 700 : 500,
                      backgroundColor: storeVisibilityFilter === 'all' ? '#FFFFFF' : 'transparent',
                      color: storeVisibilityFilter === 'all' ? '#0F172A' : '#64748B',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: storeVisibilityFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    All ({storeTotal})
                  </button>
                  <button
                    onClick={() => setStoreVisibilityFilter('active')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: storeVisibilityFilter === 'active' ? 700 : 500,
                      backgroundColor: storeVisibilityFilter === 'active' ? '#FFFFFF' : 'transparent',
                      color: storeVisibilityFilter === 'active' ? '#15803D' : '#64748B',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: storeVisibilityFilter === 'active' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    ● Live Only ({storeActive})
                  </button>
                  <button
                    onClick={() => setStoreVisibilityFilter('deactivated')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: storeVisibilityFilter === 'deactivated' ? 700 : 500,
                      backgroundColor: storeVisibilityFilter === 'deactivated' ? '#FFFFFF' : 'transparent',
                      color: storeVisibilityFilter === 'deactivated' ? '#B45309' : '#64748B',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: storeVisibilityFilter === 'deactivated' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    ⚠️ Deactivated ({storeDeactivated})
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {draftContent.storeProducts
                  .filter(p => storeFilter === 'all' || p.category === storeFilter)
                  .filter(p => {
                    if (storeVisibilityFilter === 'active') return p.isActive !== false;
                    if (storeVisibilityFilter === 'deactivated') return p.isActive === false;
                    return true;
                  })
                  .map((product) => {
                    const originalIndex = draftContent.storeProducts.findIndex(p => p.id === product.id);
                    const isDeactivated = product.isActive === false;
                    return (
                      <div 
                        key={product.id}
                        style={{
                          backgroundColor: isDeactivated ? '#FFFDF5' : '#FFFFFF',
                          border: isDeactivated ? '1px dashed #F59E0B' : '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      >
                        {isDeactivated && (
                          <div 
                            style={{
                              backgroundColor: '#FEF3C7',
                              border: '1px solid #FDE68A',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              fontSize: '11.5px',
                              color: '#92400E',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '6px',
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <EyeOff size={13} style={{ color: '#D97706' }} />
                              Deactivated · Hidden from buyers
                            </span>
                            <button
                              onClick={() => handleToggleStoreProductActive(product.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#15803D',
                                fontWeight: 800,
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '11px',
                              }}
                            >
                              Show in Store
                            </button>
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#16A34A', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '2px 6px', borderRadius: '4px' }}>
                              {product.modelCode}
                            </span>
                            {isDeactivated ? (
                              <span style={{ fontSize: '10.5px', color: '#B45309', fontWeight: 700, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', padding: '1px 6px', borderRadius: '4px' }}>
                                Hidden
                              </span>
                            ) : (
                              <span style={{ fontSize: '10.5px', color: '#15803D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                                Live
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {/* Deactivate / Re-activate Button */}
                            <button
                              onClick={() => handleToggleStoreProductActive(product.id)}
                              style={{
                                padding: '4px 8px',
                                backgroundColor: isDeactivated ? '#16A34A' : '#F8FAFC',
                                border: `1px solid ${isDeactivated ? '#16A34A' : '#CBD5E1'}`,
                                borderRadius: '4px',
                                color: isDeactivated ? '#FFFFFF' : '#475569',
                                fontSize: '11px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                boxShadow: isDeactivated ? '0 1px 2px rgba(22, 163, 74, 0.25)' : 'none',
                              }}
                              title={isDeactivated ? "Re-activate product to show on storefront" : "Deactivate product to hide from online store without deleting"}
                            >
                              {isDeactivated ? (
                                <>
                                  <Eye size={12} />
                                  Re-activate
                                </>
                              ) : (
                                <>
                                  <EyeOff size={12} style={{ color: '#D97706' }} />
                                  Deactivate
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleDeleteStoreProduct(product.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#EF4444',
                                cursor: 'pointer',
                                padding: '2px',
                              }}
                              title="Delete Product Permanently"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <div style={{ opacity: isDeactivated ? 0.75 : 1 }}>
                          <ImageUploader 
                            label={`Product Photo ${isDeactivated ? '(Deactivated)' : ''}`}
                            value={product.image}
                            onChange={(url) => handleStoreProductChange(originalIndex, 'image', url)}
                            aspectRatio="card"
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Model Code</label>
                            <input 
                              type="text" 
                              value={product.modelCode}
                              onChange={(e) => handleStoreProductChange(originalIndex, 'modelCode', e.target.value)}
                              style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px', fontFamily: 'monospace' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Category</label>
                            <select
                              value={product.category}
                              onChange={(e) => handleStoreProductChange(originalIndex, 'category', e.target.value as any)}
                              style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                            >
                              <option value="controllers">Controllers</option>
                              <option value="hardware">Hardware</option>
                              <option value="parts">Spare Parts</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Product Name</label>
                          <input 
                            type="text" 
                            value={product.name}
                            onChange={(e) => handleStoreProductChange(originalIndex, 'name', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '13px', fontWeight: 600 }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Price (USD $)</label>
                            <input 
                              type="number" 
                              value={product.price}
                              onChange={(e) => handleStoreProductChange(originalIndex, 'price', parseFloat(e.target.value) || 0)}
                              style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                            />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '16px' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', color: product.inStock ? '#15803D' : '#DC2626', fontWeight: 600 }}>
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
                          <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Description</label>
                          <textarea 
                            rows={2}
                            value={product.description}
                            onChange={(e) => handleStoreProductChange(originalIndex, 'description', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px', resize: 'vertical' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Specs Badge</label>
                          <input 
                            type="text" 
                            value={product.specs}
                            onChange={(e) => handleStoreProductChange(originalIndex, 'specs', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '11px', fontFamily: 'monospace' }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: GROWER BLOG ARTICLES                              */}
          {/* ======================================================== */}
          {activeTab === 'blog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                    Grower Blog & Technical Guides
                  </h1>
                  <p style={{ margin: 0, color: '#64748B', fontSize: '13.5px' }}>
                    Publish educational articles, agronomic whitepapers, and customer case studies for commercial growers.
                  </p>
                </div>
                <button
                  onClick={handleAddBlogPost}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(22, 163, 74, 0.25)',
                  }}
                >
                  <Plus size={15} />
                  New Article
                </button>
              </div>

              {/* Visibility Filter Row */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', backgroundColor: '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
                  <button
                    onClick={() => setBlogVisibilityFilter('all')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: blogVisibilityFilter === 'all' ? 700 : 500,
                      backgroundColor: blogVisibilityFilter === 'all' ? '#FFFFFF' : 'transparent',
                      color: blogVisibilityFilter === 'all' ? '#0F172A' : '#64748B',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: blogVisibilityFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    All Articles ({blogTotal})
                  </button>
                  <button
                    onClick={() => setBlogVisibilityFilter('active')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: blogVisibilityFilter === 'active' ? 700 : 500,
                      backgroundColor: blogVisibilityFilter === 'active' ? '#FFFFFF' : 'transparent',
                      color: blogVisibilityFilter === 'active' ? '#15803D' : '#64748B',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: blogVisibilityFilter === 'active' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    ● Published Live ({blogActive})
                  </button>
                  <button
                    onClick={() => setBlogVisibilityFilter('deactivated')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: blogVisibilityFilter === 'deactivated' ? 700 : 500,
                      backgroundColor: blogVisibilityFilter === 'deactivated' ? '#FFFFFF' : 'transparent',
                      color: blogVisibilityFilter === 'deactivated' ? '#B45309' : '#64748B',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: blogVisibilityFilter === 'deactivated' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    ⚠️ Deactivated ({blogDeactivated})
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {draftContent.blogPosts
                  .filter(post => {
                    if (blogVisibilityFilter === 'active') return post.isActive !== false;
                    if (blogVisibilityFilter === 'deactivated') return post.isActive === false;
                    return true;
                  })
                  .map((post) => {
                    const originalIndex = draftContent.blogPosts.findIndex(b => b.id === post.id);
                    const isDeactivated = post.isActive === false;
                    return (
                      <div 
                        key={post.id}
                        style={{
                          backgroundColor: isDeactivated ? '#FFFDF5' : '#FFFFFF',
                          border: isDeactivated ? '1px dashed #F59E0B' : '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '24px',
                          display: 'grid',
                          gridTemplateColumns: 'minmax(260px, 1fr) 2fr',
                          gap: '24px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ opacity: isDeactivated ? 0.75 : 1 }}>
                          <ImageUploader 
                            label={`Article Cover Photo ${isDeactivated ? '(Deactivated)' : ''}`}
                            value={post.image}
                            onChange={(url) => handleBlogPostChange(originalIndex, 'image', url)}
                            aspectRatio="card"
                          />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {isDeactivated && (
                            <div 
                              style={{
                                backgroundColor: '#FEF3C7',
                                border: '1px solid #FDE68A',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                fontSize: '11.5px',
                                color: '#92400E',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '6px',
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <EyeOff size={13} style={{ color: '#D97706' }} />
                                Deactivated · Hidden from blog readers (kept safely in CMS)
                              </span>
                              <button
                                onClick={() => handleToggleBlogPostActive(post.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#15803D',
                                  fontWeight: 800,
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  fontSize: '11px',
                                }}
                              >
                                Publish to Blog
                              </button>
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '4px' }}>
                                {post.category} · {post.readTime}
                              </span>
                              {isDeactivated ? (
                                <span style={{ fontSize: '10.5px', color: '#B45309', fontWeight: 700, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', padding: '1px 6px', borderRadius: '4px' }}>
                                  Hidden Draft
                                </span>
                              ) : (
                                <span style={{ fontSize: '10.5px', color: '#15803D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                                  Live
                                </span>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {/* Deactivate / Re-activate Button */}
                              <button
                                onClick={() => handleToggleBlogPostActive(post.id)}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: isDeactivated ? '#16A34A' : '#F8FAFC',
                                  border: `1px solid ${isDeactivated ? '#16A34A' : '#CBD5E1'}`,
                                  borderRadius: '4px',
                                  color: isDeactivated ? '#FFFFFF' : '#475569',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  boxShadow: isDeactivated ? '0 1px 2px rgba(22, 163, 74, 0.25)' : 'none',
                                }}
                                title={isDeactivated ? "Publish article back onto blog" : "Deactivate article to hide from blog without deleting"}
                              >
                                {isDeactivated ? (
                                  <>
                                    <Eye size={12} />
                                    Re-activate
                                  </>
                                ) : (
                                  <>
                                    <EyeOff size={12} style={{ color: '#D97706' }} />
                                    Deactivate
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleDeleteBlogPost(post.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#DC2626',
                                  cursor: 'pointer',
                                  padding: '2px',
                                }}
                                title="Delete Article Permanently"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Article Title</label>
                        <input 
                          type="text" 
                          value={post.title} 
                          onChange={(e) => handleBlogPostChange(originalIndex, 'title', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '14px', fontWeight: 700 }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Category</label>
                          <input 
                            type="text" 
                            value={post.category} 
                            onChange={(e) => handleBlogPostChange(originalIndex, 'category', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Date</label>
                          <input 
                            type="text" 
                            value={post.date} 
                            onChange={(e) => handleBlogPostChange(originalIndex, 'date', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Read Time</label>
                          <input 
                            type="text" 
                            value={post.readTime} 
                            onChange={(e) => handleBlogPostChange(originalIndex, 'readTime', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Author Byline</label>
                        <input 
                          type="text" 
                          value={post.author} 
                          onChange={(e) => handleBlogPostChange(originalIndex, 'author', e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Short Summary Excerpt</label>
                        <textarea 
                          rows={2}
                          value={post.excerpt} 
                          onChange={(e) => handleBlogPostChange(originalIndex, 'excerpt', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '12.5px', resize: 'vertical' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>
                          Article Content Paragraphs (separate paragraphs with blank lines)
                        </label>
                        <textarea 
                          rows={4}
                          value={post.content.join('\n\n')} 
                          onChange={(e) => handleBlogPostChange(originalIndex, 'content', e.target.value.split('\n\n').filter(Boolean))}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '12.5px', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: FEATURE HIGHLIGHTS (SHOWCASE SECTIONS)            */}
          {/* ======================================================== */}
          {activeTab === 'showcase' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                  Full-Bleed Feature Highlights
                </h1>
                <p style={{ margin: 0, color: '#64748B', fontSize: '13.5px' }}>
                  The 4 prominent background banner sections on the homepage (Solutions Showcase).
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {draftContent.showcaseSections.map((sec, index) => {
                  const isDeactivated = sec.isActive === false;
                  return (
                    <div 
                      key={sec.id}
                      style={{
                        backgroundColor: isDeactivated ? '#FFFDF5' : '#FFFFFF',
                        border: isDeactivated ? '1px dashed #F59E0B' : '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '24px',
                        display: 'grid',
                        gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
                        gap: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div style={{ opacity: isDeactivated ? 0.75 : 1 }}>
                        <ImageUploader 
                          label={`Section #${index + 1} Background ${isDeactivated ? '(Deactivated)' : ''}`}
                          value={sec.image}
                          onChange={(url) => handleShowcaseChange(index, 'image', url)}
                          aspectRatio="video"
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {isDeactivated && (
                          <div 
                            style={{
                              backgroundColor: '#FEF3C7',
                              border: '1px solid #FDE68A',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              fontSize: '11.5px',
                              color: '#92400E',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '6px',
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <EyeOff size={13} style={{ color: '#D97706' }} />
                              Deactivated · This highlight section is hidden from homepage visitors.
                            </span>
                            <button
                              onClick={() => handleToggleShowcaseActive(index)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#15803D',
                                fontWeight: 800,
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '11px',
                              }}
                            >
                              Show on site
                            </button>
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#15803D', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                              SECTION {index + 1} (ID: {sec.id})
                            </span>
                            {isDeactivated ? (
                              <span style={{ fontSize: '10.5px', color: '#B45309', fontWeight: 700, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', padding: '1px 6px', borderRadius: '4px' }}>
                                Hidden
                              </span>
                            ) : (
                              <span style={{ fontSize: '10.5px', color: '#15803D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                                Live
                              </span>
                            )}
                          </div>

                          {/* Deactivate / Re-activate Button */}
                          <button
                            onClick={() => handleToggleShowcaseActive(index)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: isDeactivated ? '#16A34A' : '#F8FAFC',
                              border: `1px solid ${isDeactivated ? '#16A34A' : '#CBD5E1'}`,
                              borderRadius: '4px',
                              color: isDeactivated ? '#FFFFFF' : '#475569',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              boxShadow: isDeactivated ? '0 1px 2px rgba(22, 163, 74, 0.25)' : 'none',
                            }}
                            title={isDeactivated ? "Re-activate to display on homepage" : "Deactivate section to hide from homepage"}
                          >
                            {isDeactivated ? (
                              <>
                                <Eye size={12} />
                                Re-activate
                              </>
                            ) : (
                              <>
                                <EyeOff size={12} style={{ color: '#D97706' }} />
                                Deactivate
                              </>
                            )}
                          </button>
                        </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Headline</label>
                        <input 
                          type="text" 
                          value={sec.title} 
                          onChange={(e) => handleShowcaseChange(index, 'title', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '14px', fontWeight: 700 }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Description</label>
                        <textarea 
                          rows={3}
                          value={sec.description} 
                          onChange={(e) => handleShowcaseChange(index, 'description', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px', resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Button Text</label>
                          <input 
                            type="text" 
                            value={sec.buttonText} 
                            onChange={(e) => handleShowcaseChange(index, 'buttonText', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Target Section</label>
                          <select 
                            value={sec.targetSection}
                            onChange={(e) => handleShowcaseChange(index, 'targetSection', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                          >
                            <option value="suite">Hardware Suite (#suite)</option>
                            <option value="where-to-buy">Where to Buy (#where-to-buy)</option>
                            <option value="app">App Section (#app)</option>
                            <option value="stories">Case Studies (#stories)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: SUPPORT & NETWORK                                 */}
          {/* ======================================================== */}
          {activeTab === 'support' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                  Support Hotlines & Global Distributors
                </h1>
                <p style={{ margin: 0, color: '#64748B', fontSize: '13.5px' }}>
                  Manage the telephone hotlines shown in the header/support bar and official commercial distribution partners.
                </p>
              </div>

              {/* Support Contacts Card */}
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '24px',
                  marginBottom: '28px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PhoneCall size={16} style={{ color: '#16A34A' }} />
                  Global Helpdesk Contact Information
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>North America Hotline</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.phoneUs}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, phoneUs: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>New Zealand Global HQ</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.phoneNz}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, phoneNz: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>South East Asia Hub</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.phoneSea}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, phoneSea: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>Support Operating Hours</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.supportHours}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, supportHours: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>Helpdesk Email</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.emailHelp}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, emailHelp: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>Engineering Support Email</label>
                    <input 
                      type="text" 
                      value={draftContent.supportContacts.emailEngineering}
                      onChange={(e) => updateSupportContacts({ ...draftContent.supportContacts, emailEngineering: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#0F172A', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Distributors Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
                    Distributor Partners ({draftContent.distributors.length})
                  </h2>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B' }}>
                    Locations shown on the interactive distributor finder directory.
                  </p>
                </div>
                <button
                  onClick={handleAddDistributor}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(22, 163, 74, 0.25)',
                  }}
                >
                  <Plus size={14} />
                  Add Partner
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {draftContent.distributors.map((d, index) => {
                  const isDeactivated = d.isActive === false;
                  return (
                    <div 
                      key={d.id}
                      style={{
                        backgroundColor: isDeactivated ? '#FFFDF5' : '#FFFFFF',
                        border: isDeactivated ? '1px dashed #F59E0B' : '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                      }}
                    >
                      {isDeactivated && (
                        <div 
                          style={{
                            backgroundColor: '#FEF3C7',
                            border: '1px solid #FDE68A',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '11px',
                            color: '#92400E',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '6px',
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <EyeOff size={13} style={{ color: '#D97706' }} />
                            Deactivated · Hidden from buyers
                          </span>
                          <button
                            onClick={() => handleToggleDistributorActive(d.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#15803D',
                              fontWeight: 800,
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              fontSize: '11px',
                            }}
                          >
                            Show
                          </button>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
                            {d.region}
                          </span>
                          {isDeactivated ? (
                            <span style={{ fontSize: '10.5px', color: '#B45309', fontWeight: 700, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', padding: '1px 6px', borderRadius: '4px' }}>
                              Hidden
                            </span>
                          ) : (
                            <span style={{ fontSize: '10.5px', color: '#15803D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                              Live
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {/* Deactivate / Re-activate Button */}
                          <button
                            onClick={() => handleToggleDistributorActive(d.id)}
                            style={{
                              padding: '3px 8px',
                              backgroundColor: isDeactivated ? '#16A34A' : '#F8FAFC',
                              border: `1px solid ${isDeactivated ? '#16A34A' : '#CBD5E1'}`,
                              borderRadius: '4px',
                              color: isDeactivated ? '#FFFFFF' : '#475569',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              boxShadow: isDeactivated ? '0 1px 2px rgba(22, 163, 74, 0.25)' : 'none',
                            }}
                            title={isDeactivated ? "Re-activate partner to show on directory" : "Deactivate partner to hide from directory without deleting"}
                          >
                            {isDeactivated ? (
                              <>
                                <Eye size={12} />
                                Re-activate
                              </>
                            ) : (
                              <>
                                <EyeOff size={12} style={{ color: '#D97706' }} />
                                Deactivate
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleDeleteDistributor(d.id)}
                            style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                            title="Delete Distributor Permanently"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Partner Name</label>
                      <input 
                        type="text" 
                        value={d.partnerName} 
                        onChange={(e) => handleDistributorChange(index, 'partnerName', e.target.value)}
                        style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px', fontWeight: 600 }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Country</label>
                        <input 
                          type="text" 
                          value={d.country} 
                          onChange={(e) => handleDistributorChange(index, 'country', e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Phone</label>
                        <input 
                          type="text" 
                          value={d.supportPhone} 
                          onChange={(e) => handleDistributorChange(index, 'supportPhone', e.target.value)}
                          style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '3px' }}>Email Helpdesk</label>
                      <input 
                        type="text" 
                        value={d.email} 
                        onChange={(e) => handleDistributorChange(index, 'email', e.target.value)}
                        style={{ width: '100%', padding: '6px 8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontSize: '12px' }}
                      />
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: STAFF & ADMIN ACCESS CONTROL (SUPERADMIN)           */}
          {/* ======================================================== */}
          {activeTab === 'staff' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '3px 10px', borderRadius: '999px', color: '#065F46', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                  <ShieldCheck size={13} style={{ color: '#059669' }} />
                  <span>{isSuperAdmin ? 'Superadmin Authority' : 'Operations Admin'} · Active Session: {currentAuthUser?.email || 'Authenticated'}</span>
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                  Staff Members & Admin Delegation
                </h1>
                <p style={{ margin: 0, color: '#64748B', fontSize: '14px', lineHeight: 1.5, maxWidth: '820px' }}>
                  Public visitors only register as commercial growers without access to CMS or global order controls. As Superadmin, you can pre-authorize staff emails or instantly promote registered accounts to Operations Administrator.
                </p>
              </div>

              {/* Status & Pre-Authorization Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '32px' }}>
                
                {/* Pre-Authorize Staff by Email */}
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserCheck size={18} style={{ color: '#16A34A' }} />
                    Pre-Authorize Staff Member
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                    Add an Auckland staff or regional operations email address. When this person signs in or registers, they are automatically granted Operations Admin authority.
                  </p>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="email"
                      placeholder="e.g. engineer.vance@autogrow.co.nz"
                      value={newStaffEmailInput}
                      onChange={(e) => setNewStaffEmailInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                    <button
                      onClick={() => {
                        if (!newStaffEmailInput.trim()) return;
                        const res = authorizeStaff(newStaffEmailInput.trim());
                        showStatus(res.message);
                        if (res.success) {
                          setNewStaffEmailInput('');
                          loadStaffData();
                        }
                      }}
                      style={{
                        padding: '9px 18px',
                        backgroundColor: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Plus size={15} />
                      Authorize Staff
                    </button>
                  </div>

                  {/* Whitelist Display */}
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Current Whitelisted Staff Emails ({whitelistEmails.length})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {whitelistEmails.map(em => {
                        const isRoot = em.toLowerCase() === SUPERADMIN_EMAIL.toLowerCase();
                        return (
                          <div 
                            key={em} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              fontSize: '12.5px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontWeight: 600, color: '#0F172A' }}>{em}</span>
                              {isRoot && (
                                <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                                  ROOT SUPERADMIN
                                </span>
                              )}
                            </div>
                            {!isRoot && (
                              <button
                                onClick={() => {
                                  if (confirm(`Revoke admin privileges for ${em}?`)) {
                                    const res = revokeStaff(em);
                                    showStatus(res.message);
                                    loadStaffData();
                                  }
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#DC2626',
                                  fontSize: '11.5px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  padding: '2px 6px'
                                }}
                              >
                                Revoke
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Superadmin Security Protocol Card */}
                <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #1E293B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <ShieldAlert size={20} style={{ color: '#4ADE80' }} />
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Access Control Directives
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#4ADE80', fontWeight: 800 }}>✓</span>
                      <span><strong>Zero Public Elevation:</strong> Visitors who sign up publicly are strictly registered as Commercial Growers (customer role).</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#4ADE80', fontWeight: 800 }}>✓</span>
                      <span><strong>Superadmin Gate:</strong> Only you or pre-whitelisted operations staff can log into the CMS and manage quotes.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#4ADE80', fontWeight: 800 }}>✓</span>
                      <span><strong>Protected Root Account:</strong> <code style={{ color: '#86EFAC', backgroundColor: '#1E293B', padding: '2px 4px', borderRadius: '4px' }}>{SUPERADMIN_EMAIL}</code> cannot be locked out or demoted.</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Registered Users Directory & Instant Elevation */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                      Registered User Directory ({staffUsers.length})
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                      All active grower and administrator accounts registered in the local/cloud directory.
                    </p>
                  </div>
                  <button
                    onClick={loadStaffData}
                    disabled={staffLoading}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: staffLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {staffLoading ? 'Refreshing...' : 'Refresh Directory'}
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#475569', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        <th style={{ padding: '10px 12px' }}>User & Facility</th>
                        <th style={{ padding: '10px 12px' }}>Email Address</th>
                        <th style={{ padding: '10px 12px' }}>Role</th>
                        <th style={{ padding: '10px 12px' }}>Registered Date</th>
                        <th style={{ padding: '10px 12px', textAlign: 'right' }}>Administrative Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffUsers.map((u: any) => {
                        const isAdm = u.role === 'admin';
                        const isRoot = u.email?.toLowerCase() === SUPERADMIN_EMAIL.toLowerCase();

                        return (
                          <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '12px' }}>
                              <div style={{ fontWeight: 700, color: '#0F172A' }}>{u.fullName || 'Commercial Client'}</div>
                              <div style={{ fontSize: '11px', color: '#64748B' }}>{u.facilityName || 'Greenhouse Facility'}</div>
                            </td>
                            <td style={{ padding: '12px', fontFamily: 'monospace', color: '#334155', fontSize: '12px' }}>
                              {u.email}
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span 
                                style={{
                                  backgroundColor: isAdm ? '#DCFCE7' : '#EFF6FF',
                                  color: isAdm ? '#15803D' : '#1D4ED8',
                                  fontSize: '11px',
                                  fontWeight: 800,
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                  letterSpacing: '0.04em'
                                }}
                              >
                                {isAdm ? 'OPERATIONS ADMIN' : 'GROWER'}
                              </span>
                            </td>
                            <td style={{ padding: '12px', color: '#64748B', fontSize: '12px' }}>
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right' }}>
                              {isRoot ? (
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', backgroundColor: '#FEF3C7', padding: '3px 8px', borderRadius: '4px' }}>
                                  Root Superadmin
                                </span>
                              ) : isAdm ? (
                                <button
                                  onClick={async () => {
                                    if (confirm(`Demote ${u.fullName || u.email} to normal commercial grower?`)) {
                                      const res = await demoteUser(u.id);
                                      if (res.success) {
                                        showStatus(`Demoted ${u.email} to grower role.`);
                                        loadStaffData();
                                      } else {
                                        alert(res.message || 'Failed to demote user.');
                                      }
                                    }
                                  }}
                                  style={{
                                    padding: '5px 12px',
                                    backgroundColor: '#FEF2F2',
                                    color: '#DC2626',
                                    border: '1px solid #FECACA',
                                    borderRadius: '6px',
                                    fontSize: '11.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Revoke Admin Access
                                </button>
                              ) : (
                                <button
                                  onClick={async () => {
                                    if (confirm(`Grant operations admin access to ${u.fullName || u.email}?`)) {
                                      const success = await promoteUser(u.id);
                                      if (success) {
                                        showStatus(`Granted Operations Admin access to ${u.email}!`);
                                        loadStaffData();
                                      }
                                    }
                                  }}
                                  style={{
                                    padding: '5px 12px',
                                    backgroundColor: '#F0FDF4',
                                    color: '#15803D',
                                    border: '1px solid #BBF7D0',
                                    borderRadius: '6px',
                                    fontSize: '11.5px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Grant Operations Admin
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: RAW JSON & DATA BACKUPS                           */}
          {/* ======================================================== */}
          {activeTab === 'json' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                  Static JSON Config & Zero-DB Portability
                </h1>
                <p style={{ margin: 0, color: '#64748B', fontSize: '13.5px' }}>
                  Download or import complete website states as pure JSON. You can commit exported JSON directly into your git repository or transfer configurations across browsers.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {/* Export Card */}
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={17} style={{ color: '#16A34A' }} />
                    Download JSON Backup
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                    Downloads the active draft configuration with all hero banners, products, articles, and image data URLs.
                  </p>
                  <button
                    onClick={exportJson}
                    style={{
                      padding: '9px 16px',
                      backgroundColor: '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 1px 2px rgba(22, 163, 74, 0.25)',
                    }}
                  >
                    <Download size={15} />
                    Download autogrow-cms-content.json
                  </button>
                </div>

                {/* Import Card */}
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload size={17} style={{ color: '#0284C7' }} />
                    Import JSON File
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '16px' }}>
                    Upload an existing JSON export to restore or switch site configuration.
                  </p>
                  <label 
                    style={{
                      padding: '9px 16px',
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Upload size={15} style={{ color: '#0284C7' }} />
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
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Direct JSON Paste / Inspect
                  </h2>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(draftContent, null, 2));
                      showStatus('Active JSON copied to clipboard!');
                    }}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Copy size={13} />
                    Copy Active JSON
                  </button>
                </div>
                <textarea 
                  rows={10}
                  placeholder="Paste JSON content here..."
                  value={importJsonText || JSON.stringify(draftContent, null, 2)}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    color: '#0F172A',
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
                        backgroundColor: '#16A34A',
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
                        color: '#64748B',
                        border: '1px solid #CBD5E1',
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
