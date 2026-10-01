import React from 'react';
import { 
  SlidersHorizontal, 
  MapPin, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Search, 
  Smartphone, 
  Car, 
  Home, 
  Building, 
  Tv, 
  Bike, 
  Briefcase, 
  Wrench, 
  PawPrint, 
  Armchair, 
  Shirt,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ListingCard } from './ListingCard';
import { CATEGORIES } from '../data/categories';

export const MarketplaceView: React.FC = () => {
  const { 
    language, 
    listings, 
    selectedCity, 
    setSelectedCity,
    selectedArea,
    setSelectedArea,
    selectedCategory, 
    setSelectedCategory,
    searchQuery, 
    setSearchQuery,
    conditionFilter, 
    setConditionFilter,
    verifiedOnly, 
    setVerifiedOnly,
    featuredOnly, 
    setFeaturedOnly,
    sortBy, 
    setSortBy,
    setIsPostAdOpen,
    setSelectedListingDetail
  } = useApp();

  // Filter listings
  const filteredListings = listings.filter(item => {
    // Only active listings in public marketplace
    if (item.status !== 'active') return false;

    // City & Area filter
    if (selectedCity !== 'All Pakistan' && item.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (selectedArea !== 'All Areas' && item.location.area.toLowerCase() !== selectedArea.toLowerCase()) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q) || (item.titleUrdu && item.titleUrdu.includes(q));
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchArea = item.location.area.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchArea) return false;
    }

    // Condition filter
    if (conditionFilter !== 'All' && item.condition !== conditionFilter) {
      return false;
    }

    // Verified only
    if (verifiedOnly && !item.seller.verified) {
      return false;
    }

    // Featured only
    if (featuredOnly && !item.featured) {
      return false;
    }

    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'popular') return b.views - a.views;
    // newest default: featured first, then boosted
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const getCatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      case 'Tv': return <Tv className="w-6 h-6" />;
      case 'Bike': return <Bike className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'PawPrint': return <PawPrint className="w-6 h-6" />;
      case 'Armchair': return <Armchair className="w-6 h-6" />;
      case 'Shirt': return <Shirt className="w-6 h-6" />;
      default: return <Smartphone className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Promotional Hero Banner: Authentic Andaza Brand Accent */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#002f34] via-[#00474e] to-[#002f34] text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#23e5db] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Pakistan's #1 Marketplace
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {language === 'ur'
              ? 'پاکستان میں گاڑی، گھر اور موبائل خریدیں اور بیچیں'
              : 'Buy & Sell Vehicles, Real Estate & Electronics in Pakistan'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Connect directly with verified buyers and sellers in Karachi, Lahore, Islamabad, and across Pakistan with zero middlemen.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsPostAdOpen(true)}
              className="px-6 py-2.5 bg-[#ffce32] hover:bg-amber-400 text-[#002f34] font-extrabold text-xs sm:text-sm rounded-lg shadow-xs transition-colors"
            >
              {language === 'ur' ? 'اشتہار لگائیں (مفت)' : 'Post an Ad (Sell Free)'}
            </button>
            <button
              onClick={() => {
                setSelectedCategory('vehicles');
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-lg backdrop-blur-xs transition-colors"
            >
              Browse Cars & Bikes
            </button>
          </div>
        </div>

        {/* Decorative Background Mesh Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#23e5db]/20 to-transparent pointer-events-none hidden md:block"></div>
      </div>

      {/* Circular Category Browser Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#002f34] uppercase tracking-wider">
            {language === 'ur' ? 'تمام کیٹیگریز' : 'All Categories'}
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold"
            >
              View All Categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {CATEGORIES.slice(0, 9).map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-3 rounded-xl flex flex-col items-center justify-center text-center transition-all ${isSelected ? 'bg-[#002f34] text-white shadow-sm ring-2 ring-[#002f34]' : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isSelected ? 'bg-white/20 text-[#23e5db]' : 'bg-slate-100 text-[#002f34]'}`}>
                  {getCatIcon(cat.iconName)}
                </div>
                <span className="text-xs font-bold line-clamp-1">
                  {language === 'ur' ? cat.nameUrdu : cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Filter & Sort Controls Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Condition Segmented Control */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              {(['All', 'Used', 'New'] as const).map(cond => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${conditionFilter === cond ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {cond}
                </button>
              ))}
            </div>

            {/* Verified Seller Toggle Button */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border ${verifiedOnly ? 'bg-teal-50 text-teal-800 border-teal-300 ring-1 ring-teal-300' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-teal-600' : 'text-slate-400'}`} />
              <span>Verified Sellers Only</span>
            </button>

            {/* Featured Only Toggle Button */}
            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border ${featuredOnly ? 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-300' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
            >
              <Zap className={`w-3.5 h-3.5 ${featuredOnly ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
              <span>Featured Only</span>
            </button>

          </div>

          {/* Right: Sorting & Results Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 tabular-nums">
              <strong>{sortedListings.length}</strong> Ads
            </span>

            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="newest">Newly Listed</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filter Chips */}
        {(selectedCity !== 'All Pakistan' || selectedCategory !== 'all' || conditionFilter !== 'All' || verifiedOnly || featuredOnly || searchQuery) && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Active Filters:</span>
            
            {selectedCity !== 'All Pakistan' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded">
                <MapPin className="w-3 h-3 text-slate-500" />
                {selectedCity} {selectedArea !== 'All Areas' ? `(${selectedArea})` : ''}
                <button onClick={() => { setSelectedCity('All Pakistan'); setSelectedArea('All Areas'); }} className="text-slate-400 hover:text-slate-700 ml-1">✕</button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded capitalize">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="text-slate-400 hover:text-slate-700 ml-1">✕</button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700 ml-1">✕</button>
              </span>
            )}

            <button
              onClick={() => {
                setSelectedCity('All Pakistan');
                setSelectedArea('All Areas');
                setSelectedCategory('all');
                setSearchQuery('');
                setConditionFilter('All');
                setVerifiedOnly(false);
                setFeaturedOnly(false);
              }}
              className="text-xs text-rose-600 hover:underline font-semibold ml-2"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Classifieds Product Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#002f34] uppercase tracking-wider">
          {selectedCategory !== 'all' ? `${selectedCategory.toUpperCase()} IN PAKISTAN` : 'FRESH RECOMMENDATIONS'}
        </h3>

        {sortedListings.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No matching classified ads found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search criteria, selecting a different city, or removing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCity('All Pakistan');
                setSelectedCategory('all');
                setSearchQuery('');
                setConditionFilter('All');
                setVerifiedOnly(false);
                setFeaturedOnly(false);
              }}
              className="px-4 py-2 bg-[#002f34] text-white text-xs font-bold rounded-lg hover:bg-[#002226]"
            >
              Show All Pakistan Ads
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
