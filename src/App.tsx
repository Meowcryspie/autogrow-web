import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EcosystemSection } from './components/EcosystemSection';
import { ProductsSection } from './components/ProductsSection';
import { PhoneScalingAppSection } from './components/PhoneScalingAppSection';
import { CommercialSolutionsSection } from './components/CommercialSolutionsSection';
import { TechnicalDownloadsSection } from './components/TechnicalDownloadsSection';
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
      const navOffset = 90;
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
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar with hotline, dropdowns, and search */}
      <Navbar 
        onSearchClick={() => setIsSearchOpen(true)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Tactical Hero */}
        <HeroSection onNavigateToSection={handleNavigateToSection} />

        {/* Hub-and-Spoke Ecosystem Architecture (TrolMaster style) */}
        <EcosystemSection />

        {/* Tactical Products Grid with Specs & Badges */}
        <ProductsSection onSelectProduct={handleSelectProduct} />

        {/* 1:1 Responsive Phone Scaling Studio with Live IntelliGrow App */}
        <PhoneScalingAppSection />

        {/* Commercial Greenhouse & CEA Solutions */}
        <CommercialSolutionsSection onNavigateToSection={handleNavigateToSection} />

        {/* Technical Downloads, Firmware & Manuals */}
        <TechnicalDownloadsSection />
      </main>

      {/* TrolMaster Obsidian Dark Footer */}
      <Footer onNavigateToSection={handleNavigateToSection} />

      {/* Product Specification & Wiring Modal */}
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