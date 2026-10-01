import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, setSelectedCategory, setActiveView } = useApp();

  return (
    <footer className="bg-[#ebeeef] border-t border-slate-300 text-xs text-[#002f34] mt-16">
      
      {/* Top Pre-Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Col 1: Popular Categories */}
        <div className="space-y-3">
          <h4 className="font-extrabold uppercase tracking-wider text-[11px] text-[#002f34]">
            {language === 'ur' ? 'مقبول کیٹیگریز' : 'POPULAR CATEGORIES'}
          </h4>
          <ul className="space-y-1.5 text-slate-600">
            <li>
              <button 
                onClick={() => { setSelectedCategory('vehicles'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Cars
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategory('property-rent'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Flats for rent
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategory('mobiles'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Mobile Phones
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategory('jobs'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Jobs in Pakistan
              </button>
            </li>
          </ul>
        </div>

        {/* Col 2: Trending Searches */}
        <div className="space-y-3">
          <h4 className="font-extrabold uppercase tracking-wider text-[11px] text-[#002f34]">
            {language === 'ur' ? 'رجحانات' : 'TRENDING SEARCHES'}
          </h4>
          <ul className="space-y-1.5 text-slate-600">
            <li>
              <button 
                onClick={() => { setSelectedCategory('bikes'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Bikes & Motorcycles
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategory('fashion'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Watches & Luxury
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategory('property-sale'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Houses in DHA Lahore
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategory('electronics'); setActiveView('marketplace'); }}
                className="hover:text-slate-900 transition-colors"
              >
                Laptops & MacBooks
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: About Us */}
        <div className="space-y-3">
          <h4 className="font-extrabold uppercase tracking-wider text-[11px] text-[#002f34]">
            ABOUT US
          </h4>
          <ul className="space-y-1.5 text-slate-600">
            <li><a href="#" className="hover:text-slate-900">About Dubizzle Group</a></li>
            <li><a href="#" className="hover:text-slate-900">Andaza Blog</a></li>
            <li><a href="#" className="hover:text-slate-900">Contact Us</a></li>
            <li><a href="#" className="hover:text-slate-900">Andaza for Businesses</a></li>
          </ul>
        </div>

        {/* Col 4: Andaza */}
        <div className="space-y-3">
          <h4 className="font-extrabold uppercase tracking-wider text-[11px] text-[#002f34]">
            ANDAZA PAKISTAN
          </h4>
          <ul className="space-y-1.5 text-slate-600">
            <li><a href="#" className="hover:text-slate-900">Help & Support</a></li>
            <li><a href="#" className="hover:text-slate-900">Sitemap</a></li>
            <li><a href="#" className="hover:text-slate-900">Terms of use</a></li>
            <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Col 5: App Download Badges */}
        <div className="space-y-3 col-span-2 md:col-span-1">
          <h4 className="font-extrabold uppercase tracking-wider text-[11px] text-[#002f34]">
            FOLLOW US
          </h4>
          <div className="flex gap-2">
            <span className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center font-bold text-[10px]">f</span>
            <span className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center font-bold text-[10px]">𝕏</span>
            <span className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center font-bold text-[10px]">▶</span>
            <span className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center font-bold text-[10px]">in</span>
          </div>
          <div className="pt-2 space-y-1.5">
            <div className="bg-[#002f34] text-white p-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-[#002226]">
              <span className="text-lg"></span>
              <div className="text-[9px] leading-tight">
                <span>Download on the</span>
                <p className="font-bold text-[10px]">App Store</p>
              </div>
            </div>
            <div className="bg-[#002f34] text-white p-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-[#002226]">
              <span className="text-lg">▶</span>
              <div className="text-[9px] leading-tight">
                <span>GET IT ON</span>
                <p className="font-bold text-[10px]">Google Play</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-[#002f34] text-white text-[11px] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Free Classifieds in Pakistan. © 2006-2026 Andaza Pakistan</span>
          <span className="text-slate-400">Classifieds Marketplace · Monolithic in Laravel 13 & MySQL</span>
        </div>
      </div>

    </footer>
  );
};
