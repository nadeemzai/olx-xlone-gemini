import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  MessageSquare, 
  Heart, 
  User, 
  Plus, 
  Globe, 
  ShieldCheck, 
  Store, 
  SlidersHorizontal,
  Code2,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PAKISTAN_CITIES } from '../data/locations';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    currentUser, 
    availableUsers, 
    setCurrentUser,
    activeView, 
    setActiveView,
    selectedCity, 
    setSelectedCity,
    selectedArea,
    setSelectedArea,
    searchQuery, 
    setSearchQuery,
    favorites,
    conversations,
    setIsChatOpen,
    setIsPostAdOpen
  } = useApp();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const filteredCities = PAKISTAN_CITIES.filter(c => 
    c.city.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
    c.cityUrdu.includes(citySearchTerm)
  );

  const currentCityData = PAKISTAN_CITIES.find(c => c.city === selectedCity);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Meta Bar: Navigation Persona / Architecture Switcher */}
      <div className="bg-[#002f34] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#23e5db] tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ANDAZA PAKISTAN MONOLITH
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setActiveView('marketplace')}
                className={`px-2.5 py-1 rounded transition-colors ${activeView === 'marketplace' ? 'bg-[#00474e] text-white font-bold' : 'text-slate-300 hover:text-white'}`}
              >
                {language === 'ur' ? 'مرکزی مارکیٹ' : 'Marketplace'}
              </button>
              <button 
                onClick={() => setActiveView('merchant-dashboard')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${activeView === 'merchant-dashboard' ? 'bg-[#00474e] text-white font-bold' : 'text-slate-300 hover:text-white'}`}
              >
                <Store className="w-3.5 h-3.5 text-[#ffce32]" />
                {language === 'ur' ? 'کمپنی ڈیش بورڈ' : 'Company Dashboard'}
              </button>
              <button 
                onClick={() => setActiveView('admin-panel')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${activeView === 'admin-panel' ? 'bg-[#00474e] text-white font-bold' : 'text-slate-300 hover:text-white'}`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ur' ? 'ایڈمن موڈریشن' : 'Admin & Moderation'}
              </button>
              <button 
                onClick={() => setActiveView('architecture-studio')}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${activeView === 'architecture-studio' ? 'bg-[#23e5db] text-[#002f34] font-extrabold' : 'text-[#23e5db] hover:bg-[#00474e]'}`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Laravel 13 & MySQL Studio
              </button>
              <button 
                onClick={() => setActiveView('architecture-studio')}
                className="px-2.5 py-1 bg-[#ffce32] hover:bg-amber-400 text-[#002f34] font-extrabold rounded transition-colors flex items-center gap-1 shadow-2xs"
                title="Download Frontend, Admin Backend and Company Panel Code"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Code</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-600 hover:border-slate-400 transition-colors text-xs text-slate-200"
              title="Toggle English / Urdu Language"
            >
              <Globe className="w-3 h-3 text-[#ffce32]" />
              <span className="font-semibold">{language === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white"
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="w-4 h-4 rounded-full object-cover" />
                <span className="truncate max-w-[110px]">{currentUser.name}</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-1 py-0.2 rounded uppercase">
                  {currentUser.role}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isUserDropdownOpen && (
                <div className={`absolute top-full mt-1.5 w-56 bg-white text-[#002f34] rounded-lg shadow-xl border border-slate-200 py-1 z-50 ${language === 'ur' ? 'left-0' : 'right-0'}`}>
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">Switch Demo Persona</p>
                    <p className="text-[11px] text-slate-500">Test different permission roles</p>
                  </div>
                  {availableUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => {
                        setCurrentUser(user);
                        setIsUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${currentUser.id === user.id ? 'bg-teal-50 font-bold text-teal-800' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={user.avatar} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p>{user.name}</p>
                          <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                      {currentUser.id === user.id && <span className="text-teal-600 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Andaza Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Authentic Andaza Logo */}
          <button 
            onClick={() => setActiveView('marketplace')}
            className="flex items-center gap-1.5 focus:outline-none shrink-0"
          >
            <div className="flex items-center font-black tracking-tight text-2xl sm:text-3xl select-none">
              <span className="text-[#002f34]">And</span>
              <span className="text-[#23e5db]">aza</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Pakistan
            </span>
          </button>

          {/* Pakistan City & Locality Selector */}
          <div className="relative shrink-0 w-44 sm:w-56" ref={cityDropdownRef}>
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border-2 border-[#002f34] rounded text-xs font-semibold text-[#002f34] hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-4 h-4 text-[#002f34] shrink-0" />
                <span className="truncate">
                  {selectedCity} {selectedArea !== 'All Areas' ? `(${selectedArea})` : ''}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* City Selector Dropdown Menu */}
            {isCityDropdownOpen && (
              <div className="absolute top-full mt-1 left-0 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-3 z-50">
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={citySearchTerm}
                    onChange={(e) => setCitySearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-[#002f34]"
                    autoFocus
                  />
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 text-xs">
                  <button
                    onClick={() => {
                      setSelectedCity('All Pakistan');
                      setSelectedArea('All Areas');
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full text-left py-2 px-2 hover:bg-slate-50 rounded font-semibold ${selectedCity === 'All Pakistan' ? 'text-teal-700 bg-teal-50' : 'text-slate-800'}`}
                  >
                    🇵🇰 All Pakistan (پورے پاکستان میں)
                  </button>

                  {filteredCities.map(c => (
                    <div key={c.city} className="py-1">
                      <button
                        onClick={() => {
                          setSelectedCity(c.city);
                          setSelectedArea('All Areas');
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full text-left py-1.5 px-2 hover:bg-slate-50 rounded flex items-center justify-between font-medium ${selectedCity === c.city ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-700'}`}
                      >
                        <span>{c.city}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{c.cityUrdu}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Sub-areas selector if a city is active */}
                {currentCityData && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-[11px] font-semibold text-slate-500 mb-1">
                      Popular Neighborhoods in {currentCityData.city}:
                    </p>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                      {currentCityData.areas.map(area => (
                        <button
                          key={area}
                          onClick={() => {
                            setSelectedArea(area);
                            setIsCityDropdownOpen(false);
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${selectedArea === area ? 'bg-[#002f34] text-white border-[#002f34]' : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-400'}`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 relative">
            <div className="flex items-center border-2 border-[#002f34] rounded overflow-hidden bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ur' ? 'گاڑیاں، موبائل فونز اور مزید تلاش کریں...' : 'Find Cars, Mobile Phones, Real Estate, and more...'}
                className="w-full px-4 py-2 text-sm text-[#002f34] placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
              <button 
                onClick={() => setActiveView('marketplace')}
                className="bg-[#002f34] hover:bg-[#002226] text-white px-5 py-2.5 transition-colors flex items-center justify-center shrink-0"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Right Action Icons & Sell Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Real-Time Chat Button with unread badge */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="relative p-2 text-[#002f34] hover:bg-slate-100 rounded-full transition-colors"
              title="Open Live Chat & Negotiations"
            >
              <MessageSquare className="w-5 h-5" />
              {totalUnreadMessages > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalUnreadMessages}
                </span>
              )}
            </button>

            {/* Saved Favorites */}
            <button
              onClick={() => setActiveView('marketplace')}
              className="relative p-2 text-[#002f34] hover:bg-slate-100 rounded-full transition-colors hidden sm:flex"
              title={`Saved Favorites (${favorites.length})`}
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#ffce32] text-[#002f34] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Iconic Andaza "+ SELL" Button with distinctive border styling */}
            <button
              onClick={() => setIsPostAdOpen(true)}
              className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full font-bold focus:outline-none transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#23e5db] via-[#ffce32] to-[#002f34]"></span>
              <span className="relative px-4 sm:px-6 py-1.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-90 flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#002f34]">
                <Plus className="w-4 h-4 stroke-[3]" />
                {language === 'ur' ? 'اشتہار لگائیں' : 'SELL'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
