import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MarketplaceView } from './components/MarketplaceView';
import { MerchantDashboard } from './components/MerchantDashboard';
import { AdminPanel } from './components/AdminPanel';
import { ArchitectureStudio } from './components/ArchitectureStudio';
import { ListingDetailModal } from './components/ListingDetailModal';
import { PostAdModal } from './components/PostAdModal';
import { ChatModal } from './components/ChatModal';
import { PaymentModal } from './components/PaymentModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { 
    activeView, 
    selectedListingDetail, 
    setSelectedListingDetail,
    toastMessage 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8f9] text-[#002f34]">
      {/* 1. Header with Persona Switcher & Search Bar */}
      <Header />

      {/* 2. Category Navigation Bar (visible across views) */}
      <CategoryNav />

      {/* 3. Main Viewport Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {activeView === 'marketplace' && <MarketplaceView />}
        {activeView === 'merchant-dashboard' && <MerchantDashboard />}
        {activeView === 'admin-panel' && <AdminPanel />}
        {activeView === 'architecture-studio' && <ArchitectureStudio />}
      </main>

      {/* 4. Global Modals */}
      {selectedListingDetail && (
        <ListingDetailModal
          listing={selectedListingDetail}
          onClose={() => setSelectedListingDetail(null)}
        />
      )}
      <PostAdModal />
      <ChatModal />
      <PaymentModal />

      {/* 5. Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002f34] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-[#23e5db]/40 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#23e5db]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
