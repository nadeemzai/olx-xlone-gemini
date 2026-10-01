import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  MapPin, 
  CheckCircle, 
  Zap, 
  Image as ImageIcon,
  Smartphone,
  Car,
  Home,
  Tv,
  Bike,
  Briefcase,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { PAKISTAN_CITIES } from '../data/locations';

export const PostAdModal: React.FC = () => {
  const { 
    language, 
    isPostAdOpen, 
    setIsPostAdOpen, 
    addListing, 
    currentUser, 
    initiatePayment 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCatId, setSelectedCatId] = useState<string>('mobiles');
  const [selectedSubcatId, setSelectedSubcatId] = useState<string>('mobile-phones');
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'New' | 'Used'>('Used');
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [selectedArea, setSelectedArea] = useState('DHA Phase 5');
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string>('/src/assets/images/product_iphone15_andaza_1790771642176.jpg');
  const [promotionChoice, setPromotionChoice] = useState<'none' | 'featured' | 'bump'>('none');

  if (!isPostAdOpen) return null;

  const currentCategory = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0];
  const currentSubcategory = currentCategory.subcategories.find(s => s.id === selectedSubcatId) || currentCategory.subcategories[0];
  const cityData = PAKISTAN_CITIES.find(c => c.city === selectedCity) || PAKISTAN_CITIES[0];

  const presetImages = [
    { label: 'iPhone 15 Pro Max', url: '/src/assets/images/product_iphone15_andaza_1790771642176.jpg' },
    { label: 'Honda Civic RS Turbo', url: '/src/assets/images/product_civic_andaza_1790771658037.jpg' },
    { label: '1 Kanal Luxury House', url: '/src/assets/images/product_house_dha_andaza_1790771670366.jpg' },
    { label: 'Yamaha YBR 125G', url: '/src/assets/images/product_yamaha_andaza_1790771682075.jpg' }
  ];

  const handleAttributeChange = (name: string, value: string) => {
    setAttributes(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseInt(price.replace(/,/g, ''), 10) || 0;

    addListing({
      title,
      description,
      price: numericPrice,
      currency: 'PKR',
      categoryId: selectedCatId,
      subcategoryId: selectedSubcatId,
      location: {
        city: selectedCity,
        cityUrdu: cityData.cityUrdu,
        province: cityData.province,
        area: selectedArea
      },
      images: [selectedImage],
      seller: {
        id: currentUser.id,
        name: currentUser.name,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
        memberSince: currentUser.memberSince,
        responseRate: '100%',
        verified: currentUser.verified,
        isMerchant: currentUser.role === 'merchant',
        businessName: currentUser.merchantProfile?.companyName,
        rating: 5.0,
        reviewCount: 1
      },
      condition,
      attributes
    }, promotionChoice);

    // Reset & close
    setIsPostAdOpen(false);
    setStep(1);
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between z-20">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002f34]">
              {language === 'ur' ? 'اشتہار درج کریں (پوسٹ کریں)' : 'POST YOUR AD'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>Step {step} of 3</span>
              <span>·</span>
              <span className="font-semibold text-teal-700">
                {step === 1 ? 'Choose Category' : step === 2 ? 'Details & Photos' : 'Location & Promotion'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPostAdOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">

          {/* STEP 1: CATEGORY SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                1. Select Category
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.slice(0, 9).map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      setSelectedSubcatId(cat.subcategories[0]?.id || '');
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${selectedCatId === cat.id ? 'border-[#002f34] bg-teal-50/50 shadow-xs ring-1 ring-[#002f34]' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  >
                    <div className={`p-2 rounded-lg ${selectedCatId === cat.id ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-700'}`}>
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{cat.name}</p>
                      <p className="text-[11px] text-slate-500">{cat.subcategories.length} subcategories</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Subcategories */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Subcategory
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentCategory.subcategories.map(sub => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubcatId(sub.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedSubcatId === sub.id ? 'bg-[#002f34] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-[#002f34] text-white font-bold text-xs rounded-lg hover:bg-[#002226] transition-colors"
                >
                  Continue to Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS, ATTRIBUTES & PHOTOS */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                2. Ad Details & Specifications
              </h3>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ad Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apple iPhone 15 Pro Max 256GB PTA Approved"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Mention key features (brand, model, condition)</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the condition, reason for selling, accessories included..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34]"
                  />
                </div>

                {/* Dynamic Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCondition('Used')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded border ${condition === 'Used' ? 'bg-[#002f34] text-white border-[#002f34]' : 'bg-white text-slate-700 border-slate-300'}`}
                      >
                        Used
                      </button>
                      <button
                        type="button"
                        onClick={() => setCondition('New')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded border ${condition === 'New' ? 'bg-[#002f34] text-white border-[#002f34]' : 'bg-white text-slate-700 border-slate-300'}`}
                      >
                        New
                      </button>
                    </div>
                  </div>

                  {currentSubcategory?.attributes.map(attr => (
                    <div key={attr.name}>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{attr.label}</label>
                      {attr.type === 'select' && attr.options ? (
                        <select
                          value={attributes[attr.name] || ''}
                          onChange={(e) => handleAttributeChange(attr.name, e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:border-[#002f34]"
                        >
                          <option value="">Select {attr.label}</option>
                          {attr.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={attr.type}
                          placeholder={`Enter ${attr.label}`}
                          value={attributes[attr.name] || ''}
                          onChange={(e) => handleAttributeChange(attr.name, e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:border-[#002f34]"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Price in PKR */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price (PKR) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-500">Rs</span>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 450000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34] font-bold"
                    />
                  </div>
                </div>

                {/* Photo Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select High-Res Photo <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {presetImages.map(img => (
                      <button
                        key={img.label}
                        type="button"
                        onClick={() => setSelectedImage(img.url)}
                        className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${selectedImage === img.url ? 'border-[#002f34] ring-2 ring-[#002f34]' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img.url} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold p-1 truncate text-center">
                          {img.label}
                        </span>
                        {selectedImage === img.url && (
                          <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!title.trim() || !price}
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-[#002f34] disabled:opacity-50 text-white font-bold text-xs rounded-lg hover:bg-[#002226]"
                >
                  Continue to Promotion →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION & PROMOTION PACKAGES */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                3. Location & Promotion Plan
              </h3>

              {/* Location Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City in Pakistan</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      const matched = PAKISTAN_CITIES.find(c => c.city === e.target.value);
                      setSelectedArea(matched?.areas[1] || 'All Areas');
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#002f34]"
                  >
                    {PAKISTAN_CITIES.map(c => (
                      <option key={c.city} value={c.city}>{c.city} ({c.cityUrdu})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Locality / Area</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#002f34]"
                  >
                    {cityData.areas.filter(a => a !== 'All Areas').map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Promotion Package Tier */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Select Promotion Package (Optional):
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Standard Free */}
                  <div
                    onClick={() => setPromotionChoice('none')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${promotionChoice === 'none' ? 'border-[#002f34] bg-teal-50/40 ring-1 ring-[#002f34]' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <p className="text-xs font-bold text-slate-800">Standard Free Ad</p>
                    <p className="text-lg font-black text-[#002f34] my-1">Rs 0</p>
                    <p className="text-[11px] text-slate-500">Live for 30 days in normal search ranking.</p>
                  </div>

                  {/* Featured */}
                  <div
                    onClick={() => setPromotionChoice('featured')}
                    className={`p-3.5 rounded-xl border cursor-pointer relative transition-all ${promotionChoice === 'featured' ? 'border-amber-400 bg-amber-50/70 ring-2 ring-amber-400' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <span className="absolute top-2 right-2 bg-amber-400 text-[#002f34] text-[9px] font-black px-1.5 py-0.5 rounded">
                      TOP RECOMMENDED
                    </span>
                    <p className="text-xs font-bold text-amber-900 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Featured Ad
                    </p>
                    <p className="text-lg font-black text-[#002f34] my-1">Rs 1,499</p>
                    <p className="text-[11px] text-slate-600">Highlighted in yellow, ranked on top page, 5x buyers.</p>
                  </div>

                  {/* Bump to Top */}
                  <div
                    onClick={() => setPromotionChoice('bump')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${promotionChoice === 'bump' ? 'border-[#002f34] bg-teal-50/40 ring-1 ring-[#002f34]' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <p className="text-xs font-bold text-slate-800">Bump to Top</p>
                    <p className="text-lg font-black text-[#002f34] my-1">Rs 799</p>
                    <p className="text-[11px] text-slate-500">Instant boost to the very top of recent listings.</p>
                  </div>
                </div>
              </div>

              {/* Verified Seller Note */}
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Posting as <strong>{currentUser.name}</strong> ({currentUser.phone}) · Verified Seller
                </span>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#002f34] text-white font-bold text-xs rounded-lg hover:bg-[#002226] shadow-sm transition-colors"
                >
                  {promotionChoice !== 'none' ? 'Proceed to Pay & Publish Ad' : 'Post Ad Now'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
