import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { IntroColumns } from './components/IntroColumns';
import { CategoryShowcase } from './components/CategoryShowcase';
import { SpecializedSuite } from './components/SpecializedSuite';
import { GrowerSuccessStories } from './components/GrowerSuccessStories';
import { AppDownloadSection } from './components/AppDownloadSection';
import { WhereToBuySupport } from './components/WhereToBuySupport';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { StorePage } from './components/StorePage';
import { SupportChatWidget } from './components/SupportChatWidget';
import type { ProductItem } from './types';
import './index.css';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'blog' | 'store'>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigateToPage = (page: 'home' | 'about' | 'blog' | 'store') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      
      {/* 1. TrolMaster Top Bar & Sticky Header with Mega-Menu + Page Switcher */}
      <Navbar 
        onSearchClick={() => setIsSearchOpen(true)}
        onNavigateToSection={handleNavigateToSection}
        currentPage={currentPage}
        onNavigateToPage={handleNavigateToPage}
        onOpenSupportChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <>
            {/* 2. TrolMaster Banner Slider (Swiper Hero Banner) */}
            <HeroSlider onNavigateToSection={handleNavigateToSection} />

            {/* 3. TrolMaster Centered Intro Columns */}
            <IntroColumns />

            {/* 4. TrolMaster Full-Bleed Background Image Sections (tekst-met-achtergrond) */}
            <CategoryShowcase onNavigateToSection={handleNavigateToSection} />

            {/* 5. TrolMaster Specialized Suite (post-slider) */}
            <SpecializedSuite onSelectProduct={handleSelectProduct} />

            {/* 6. TrolMaster Grower Success Stories (Case Studies) */}
            <GrowerSuccessStories />

            {/* 7. TrolMaster "Grow in your POCKET!" App Section + 1:1 Responsive Phone Scaler */}
            <AppDownloadSection />

            {/* 8. TrolMaster Where to Buy, Technical Support & Economic Calculator (Dual Buttons + Live Chat) */}
            <WhereToBuySupport 
              onNavigateToStore={() => handleNavigateToPage('store')}
              onOpenSupportChat={() => setIsChatOpen(true)}
            />
          </>
        )}

        {/* Dedicated About Us Page (1994 New Zealand Heritage, MIT Jeff Broad, Bluelab & Excel Seeds) */}
        {currentPage === 'about' && (
          <AboutPage 
            onBackToHome={() => handleNavigateToPage('home')}
            onNavigateToSection={handleNavigateToSection}
          />
        )}

        {/* Dedicated Commercial Grower Blog & Guides Page */}
        {currentPage === 'blog' && (
          <BlogPage 
            onBackToHome={() => handleNavigateToPage('home')}
          />
        )}

        {/* Dedicated Direct Parts & Probes Store Page */}
        {currentPage === 'store' && (
          <StorePage 
            onBackToHome={() => handleNavigateToPage('home')}
            onNavigateToSection={handleNavigateToSection}
          />
        )}
      </main>

      {/* 9. TrolMaster 4-Tier Footer */}
      <Footer 
        onNavigateToSection={handleNavigateToSection}
        onNavigateToPage={handleNavigateToPage}
        onOpenSupportChat={() => setIsChatOpen(true)}
      />

      {/* Product Detail & Wiring Pinouts Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Quick Global Search Modal (Products, Store, Blog, CAD, Distributors) */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigateToSection={handleNavigateToSection}
        onNavigateToPage={handleNavigateToPage}
      />

      {/* Interactive Technical Grower Support Chatbox (Diagnose alarms, calibration, wiring, hotlines) */}
      <SupportChatWidget 
        isOpen={isChatOpen}
        onToggle={setIsChatOpen}
        onNavigateToStore={() => handleNavigateToPage('store')}
      />

    </div>
  );
};

export default App;
