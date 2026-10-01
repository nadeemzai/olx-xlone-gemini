import React from 'react';
import { Heart, CheckCircle2, Zap } from 'lucide-react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    language, 
    favorites, 
    toggleFavorite, 
    setSelectedListingDetail 
  } = useApp();

  const isFav = favorites.includes(listing.id);

  return (
    <div 
      onClick={() => setSelectedListingDetail(listing)}
      className="group bg-white rounded-lg border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col relative"
    >
      {/* Featured / Urgent Strip */}
      {listing.featured && (
        <div className="absolute top-2 left-2 z-10 bg-[#ffce32] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
          <Zap className="w-3 h-3 fill-current" />
          <span>{language === 'ur' ? 'نمایاں' : 'FEATURED'}</span>
        </div>
      )}

      {/* Favorite Heart Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(listing.id);
        }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 shadow-xs backdrop-blur-xs transition-colors"
        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'stroke-current'}`} />
      </button>

      {/* Image Container with Fallback */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={listing.images[0] || '/src/assets/images/product_civic_andaza_1790771658037.jpg'}
          alt={listing.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          onError={(e) => {
            // Styled graceful CSS fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {listing.boosted && (
          <span className="absolute bottom-2 right-2 bg-[#002f34]/80 text-[#23e5db] text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
            BOOSTED
          </span>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-lg font-extrabold text-[#002f34] tabular-nums tracking-tight">
              Rs {listing.price.toLocaleString()}
            </span>
            {listing.seller.verified && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-teal-700" title="Verified Seller">
                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                <span className="hidden sm:inline">Verified</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 mb-2 leading-relaxed group-hover:text-[#002f34]">
            {language === 'ur' && listing.titleUrdu ? listing.titleUrdu : listing.title}
          </h3>
        </div>

        {/* Unboxed Metadata with Typographic Separator */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate max-w-[140px]">
            {listing.location.area}, {listing.location.city}
          </span>
          <span aria-hidden="true">·</span>
          <span className="shrink-0">{listing.createdAt}</span>
        </div>
      </div>
    </div>
  );
};
