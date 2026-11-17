import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CropSolutionsSection } from './components/CropSolutionsSection';
import { ProductsSection } from './components/ProductsSection';
import { PhoneScalingAppSection } from './components/PhoneScalingAppSection';
import { EcosystemSection } from './components/EcosystemSection';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { CommercialSolutionsSection } from './components/CommercialSolutionsSection';
import { DistributorNetworkSection } from './components/DistributorNetworkSection';
import { TechnicalDownloadsSection } from './components/TechnicalDownloadsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { products } from './data/mockProducts';
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
      const navOffset = 85;
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

  const handleSelectProductById = (productId: string) => {
    const found = products.find((p: ProductItem) => p.id === productId || p.modelCode === productId);
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-void)' }}>
      {/* Navbar with hotline, dropdowns, and search */}
      <Navbar 
        onSearchClick={() => setIsSearchOpen(true)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Tactical Asymmetrical Split Hero with Live MultiGrow Console */}
        <HeroSection onNavigateToSection={handleNavigateToSection} />

        {/* Plant-Centric Crop Steering Section (Tomatoes, Berries, NFT Greens, Indoor CEA) */}
        <CropSolutionsSection onSelectProductById={handleSelectProductById} />

        {/* Controllers, Dosing Skids & Sensors Catalog */}
        <ProductsSection onSelectProduct={handleSelectProduct} />

        {/* 1:1 Responsive Phone Scaling Studio (IntelliGrow™ Mobile App) */}
        <PhoneScalingAppSection />

        {/* Hub-and-Spoke Architecture & Bus Signaling */}
        <EcosystemSection />

        {/* Economic Model: Automated Fertigation & Water Savings Calculator */}
        <RoiCalculatorSection onNavigateToSection={handleNavigateToSection} />

        {/* Turnkey Commercial Greenhouse & CEA Facility Solutions */}
        <CommercialSolutionsSection onNavigateToSection={handleNavigateToSection} />

        {/* Where to Buy: Global Certified Distributor Directory */}
        <DistributorNetworkSection />

        {/* Technical Downloads, Firmware Binaries & CAD Schematics */}
        <TechnicalDownloadsSection />
      </main>

      {/* Industrial Footer with Factory Support & Compliance Decals */}
      <Footer onNavigateToSection={handleNavigateToSection} />

      {/* Product Specification & Terminal Pinout Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Quick Search Modal across Hardware, Crops, Distributors & CAD */}
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