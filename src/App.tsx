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
import type { ProductItem } from './types';
import './index.css';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigateToSection = (sectionId: string) => {
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
      
      {/* 1. TrolMaster Top Bar & Sticky Header with Mega-Menu */}
      <Navbar 
        onSearchClick={() => setIsSearchOpen(true)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Content Sections - Exact TrolMaster Layout */}
      <main style={{ flex: 1 }}>
        
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

        {/* 8. TrolMaster Where to Buy, Technical Support & Economic Calculator */}
        <WhereToBuySupport />

      </main>

      {/* 9. TrolMaster 4-Tier Footer */}
      <Footer onNavigateToSection={handleNavigateToSection} />

      {/* Product Detail & Wiring Pinouts Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Quick Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigateToSection={handleNavigateToSection}
      />

    </div>
  );
};

export default App;
