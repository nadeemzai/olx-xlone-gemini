import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Eye, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  BadgeCheck, 
  AlertTriangle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';

interface ListingDetailModalProps {
  listing: Listing;
  onClose: () => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose }) => {
  const { 
    language, 
    favorites, 
    toggleFavorite, 
    openChatWithListing,
    initiatePayment,
    currentUser,
    showToast
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [offerInput, setOfferInput] = useState<string>('');
  const [showOfferBox, setShowOfferBox] = useState(false);

  const isFav = favorites.includes(listing.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(offerInput.replace(/,/g, ''), 10);
    if (!amount || isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid offer amount');
      return;
    }
    openChatWithListing(listing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-3 border-b border-slate-200 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">Ad ID: {listing.id}</span>
            <span>·</span>
            <span className="capitalize">{listing.location.city}, {listing.location.province}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavorite(listing.id)}
              className="p-2 text-slate-500 hover:text-rose-500 hover:bg-slate-100 rounded-full transition-colors"
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Image Gallery & Description (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Showcase Image */}
            <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <img
                src={listing.images[activeImageIndex] || listing.images[0]}
                alt={listing.title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
              {listing.featured && (
                <div className="absolute top-3 left-3 bg-[#ffce32] text-[#002f34] text-xs font-black uppercase px-2.5 py-1 rounded shadow-md flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'ur' ? 'نمایاں اشتہار' : 'FEATURED'}</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip (if multiple images) */}
            {listing.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${activeImageIndex === idx ? 'border-[#002f34]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications & Attributes */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#002f34] uppercase tracking-wider">
                {language === 'ur' ? 'تفصیلات اور خصوصیات' : 'Specifications'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">{language === 'ur' ? 'حالت' : 'Condition'}</span>
                  <span className="font-bold text-slate-800">{listing.condition}</span>
                </div>
                {Object.entries(listing.attributes).map(([key, val]) => (
                  <div key={key} className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[11px] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-bold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#002f34] uppercase tracking-wider">
                {language === 'ur' ? 'تفصیل' : 'Description'}
              </h4>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-200">
                {language === 'ur' && listing.descriptionUrdu ? listing.descriptionUrdu : listing.description}
              </div>
            </div>

            {/* Safety Guidelines */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">
                  {language === 'ur' ? 'محفوظ خریداری کے اصول' : 'Safety Tips for Buyers in Pakistan'}
                </span>
                <ul className="list-disc pl-4 space-y-1 text-amber-800">
                  <li>Meet in a safe, public place (e.g. Shopping Mall, Bank, or verified showroom).</li>
                  <li>Check the item thoroughly before paying any money.</li>
                  <li>Never make advance online deposits or wire transfers via JazzCash/Easypaisa without physical verification.</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Seller Contact Module (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Pricing Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#002f34] tabular-nums">
                    Rs {listing.price.toLocaleString()}
                  </span>
                  {listing.originalPrice && (
                    <span className="ml-2 text-xs line-through text-slate-400 tabular-nums">
                      Rs {listing.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {language === 'ur' && listing.titleUrdu ? listing.titleUrdu : listing.title}
              </h2>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {listing.location.area}, {listing.location.city}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {listing.createdAt}
                </span>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 truncate">{listing.seller.name}</h3>
                    {listing.seller.verified && (
                      <span title="Verified Merchant">
                        <BadgeCheck className="w-4 h-4 text-teal-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">Member since {listing.seller.memberSince}</p>
                </div>
              </div>

              {listing.seller.isMerchant && (
                <div className="p-2.5 bg-teal-50 rounded-lg text-xs text-teal-900 border border-teal-100">
                  <span className="font-bold block text-teal-800">{listing.seller.businessName}</span>
                  <span className="text-[11px] text-teal-700">Official Merchant · Verified Business Entity</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Chat with Seller Button */}
                <button
                  type="button"
                  onClick={() => {
                    openChatWithListing(listing);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#002f34] hover:bg-[#002226] text-white font-bold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'ur' ? 'بیچنے والے سے چیٹ کریں' : 'Chat with Seller'}</span>
                </button>

                {/* Make Offer Button Toggle */}
                <button
                  type="button"
                  onClick={() => setShowOfferBox(!showOfferBox)}
                  className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-xs transition-colors border border-amber-300 flex items-center justify-center gap-2"
                >
                  <span>{language === 'ur' ? 'قیمت کی پیشکش کریں' : 'Make an Offer (Negotiate)'}</span>
                </button>

                {showOfferBox && (
                  <form onSubmit={handleSendOffer} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <label className="text-[11px] font-semibold text-slate-700 block">
                      Your Offer Price (PKR):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="e.g. 9000000"
                        value={offerInput}
                        onChange={(e) => setOfferInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-[#002f34]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#002f34] text-white text-xs font-bold rounded hover:bg-[#002226]"
                      >
                        Send Offer
                      </button>
                    </div>
                  </form>
                )}

                {/* Reveal Phone Number Button */}
                <button
                  type="button"
                  onClick={() => setIsPhoneRevealed(true)}
                  className="w-full py-2.5 border-2 border-[#002f34] text-[#002f34] hover:bg-slate-50 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {isPhoneRevealed ? (
                    <span className="tabular-nums font-mono text-sm">{listing.seller.phone}</span>
                  ) : (
                    <span>{language === 'ur' ? 'فون نمبر دیکھیں' : 'Show Phone Number'}</span>
                  )}
                </button>
              </div>

              {/* Response Stats */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-[11px] text-slate-500">
                <div>
                  <span className="block font-semibold text-slate-700">{listing.seller.responseRate}</span>
                  <span>Response Rate</span>
                </div>
                <div className="h-6 w-[1px] bg-slate-200"></div>
                <div>
                  <span className="block font-semibold text-slate-700">Under 1 hour</span>
                  <span>Avg. Reply</span>
                </div>
              </div>
            </div>

            {/* Owner Promotion Banner if Current User owns this listing */}
            {currentUser.id === listing.seller.id && (
              <div className="bg-gradient-to-br from-teal-50 to-amber-50 p-4 rounded-xl border border-teal-200 space-y-2">
                <span className="text-xs font-bold text-[#002f34] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Owner Controls: Boost this Listing
                </span>
                <p className="text-[11px] text-slate-600">
                  Get up to 10x more views and buyers by featuring this listing with Easypaisa / JazzCash.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      initiatePayment(listing, 'featured_7d');
                      onClose();
                    }}
                    className="flex-1 py-1.5 bg-[#ffce32] text-[#002f34] font-bold text-xs rounded hover:bg-amber-400"
                  >
                    Feature (Rs 1,499)
                  </button>
                  <button
                    onClick={() => {
                      initiatePayment(listing, 'bump_up');
                      onClose();
                    }}
                    className="flex-1 py-1.5 bg-[#002f34] text-white font-bold text-xs rounded hover:bg-[#002226]"
                  >
                    Bump to Top (Rs 799)
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
