import React, { useState } from 'react';
import { PLANTS_DATA } from './data/plants';
import { Plant, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { PlantDetailModal } from './components/PlantDetailModal';
import { PlantFinderModal } from './components/PlantFinderModal';
import { DigitalCareCardModal } from './components/DigitalCareCardModal';
import { StickyNotesSection } from './components/StickyNotesSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [plants] = useState<Plant[]>(PLANTS_DATA);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isFinderOpen, setIsFinderOpen] = useState<boolean>(false);
  const [isCareCardOpen, setIsCareCardOpen] = useState<boolean>(false);
  const [careCardPlant, setCareCardPlant] = useState<Plant | null>(PLANTS_DATA[0]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeRecommendationIds, setActiveRecommendationIds] = useState<string[]>([]);

  // Navigation helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open detail view
  const handleOpenDetail = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsDetailOpen(true);
  };

  // Add to cart
  const handleAddToCart = (
    plant: Plant,
    selectedPot: 'Nursery Plastik' | 'Keramik Terakota' | 'Keramik Ivory Matte' = 'Nursery Plastik',
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.plant.id === plant.id && item.selectedPot === selectedPot
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { plant, quantity, selectedPot }];
    });
    setIsCartOpen(true);
  };

  // Cart Qty update
  const handleUpdateQty = (plantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.plant.id === plantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item
  const handleRemoveCartItem = (plantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.plant.id !== plantId));
  };

  // After checkout: trigger automated digital care card
  const handleCheckoutSuccess = (purchasedPlant: Plant) => {
    setCartItems([]);
    setIsCartOpen(false);
    setCareCardPlant(purchasedPlant);
    setIsCareCardOpen(true);
  };

  // Open Care Card directly
  const handleOpenCareCard = (plant: Plant) => {
    setCareCardPlant(plant);
    setIsCareCardOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-950">
      {/* 3-Zone Top Bar Contract */}
      <Navbar
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsFinderOpen(true)}
        onOpenCareCardDemo={() => {
          setCareCardPlant(PLANTS_DATA[0]);
          setIsCareCardOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartQuiz={() => setIsFinderOpen(true)}
          onExploreCatalog={() => handleNavigateSection('katalog')}
          onOpenStickyNotes={() => handleNavigateSection('sticky-notes')}
        />

        {/* Catalog Section with Quick Filters & Multi-select & Sort */}
        <CatalogSection
          plants={plants}
          onSelectPlant={handleOpenDetail}
          onAddToCart={(plant) => handleAddToCart(plant)}
          onOpenFinder={() => setIsFinderOpen(true)}
          activeRecommendationIds={activeRecommendationIds}
          onClearRecommendations={() => setActiveRecommendationIds([])}
        />

        {/* Sticky Notes Kebun (Community & Expert Interaction) */}
        <StickyNotesSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenFinder={() => setIsFinderOpen(true)}
      />

      {/* MODAL 1: Plant Detail Modal (Key Info Summary + Sleek Status Bar + Collapsible Technical Guide) */}
      <PlantDetailModal
        plant={selectedPlant}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenCareCard={(plant) => {
          setIsDetailOpen(false);
          handleOpenCareCard(plant);
        }}
      />

      {/* MODAL 2: Plant Finder 4-Question Interactive Quiz */}
      <PlantFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        plants={plants}
        onSelectPlant={handleOpenDetail}
        onApplyRecommendations={(matchedIds) => {
          setActiveRecommendationIds(matchedIds);
          handleNavigateSection('katalog');
        }}
      />

      {/* MODAL 3: Automated Digital Care Card with Smart Schedule & Sleek Status Bar */}
      <DigitalCareCardModal
        plant={careCardPlant}
        isOpen={isCareCardOpen}
        onClose={() => setIsCareCardOpen(false)}
      />

      {/* DRAWER: Cart & Checkout Drawer with automated Care Card issuance */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />
    </div>
  );
}
