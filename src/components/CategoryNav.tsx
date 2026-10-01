import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Smartphone, 
  Car, 
  Home, 
  Building, 
  Tv, 
  Bike, 
  Briefcase, 
  Wrench, 
  UserCheck, 
  PawPrint, 
  Armchair, 
  Shirt, 
  X,
  LayoutGrid
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';

export const CategoryNav: React.FC = () => {
  const { 
    language, 
    selectedCategory, 
    setSelectedCategory, 
    setActiveView 
  } = useApp();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Building': return <Building className="w-4 h-4" />;
      case 'Tv': return <Tv className="w-4 h-4" />;
      case 'Bike': return <Bike className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'UserCheck': return <UserCheck className="w-4 h-4" />;
      case 'PawPrint': return <PawPrint className="w-4 h-4" />;
      case 'Armchair': return <Armchair className="w-4 h-4" />;
      case 'Shirt': return <Shirt className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="bg-white border-b border-slate-200 shadow-2xs relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 py-2 overflow-x-auto no-scrollbar">
          
          {/* "ALL CATEGORIES" Button with Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#002f34] hover:text-[#00a49f] py-1 transition-colors"
            >
              <span>{language === 'ur' ? 'تمام کیٹیگریز' : 'ALL CATEGORIES'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Category Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === 'ur' ? 'براؤز کیٹیگریز' : 'Browse All Categories'}
                  </span>
                  <button 
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setIsDropdownOpen(false);
                      setActiveView('marketplace');
                    }}
                    className={`text-left p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${selectedCategory === 'all' ? 'bg-teal-50 text-[#002f34]' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <LayoutGrid className="w-4 h-4 text-[#002f34]" />
                    <span>{language === 'ur' ? 'تمام اشتہارات' : 'All Listings'}</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsDropdownOpen(false);
                        setActiveView('marketplace');
                      }}
                      className={`text-left p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${selectedCategory === cat.id ? 'bg-teal-50 text-[#002f34]' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <span className="text-[#002f34]">{getCategoryIcon(cat.iconName)}</span>
                      <span className="truncate">{language === 'ur' ? cat.nameUrdu : cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0 hidden sm:block"></div>

          {/* Top Categories Inline Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs whitespace-nowrap">
            {CATEGORIES.slice(0, 8).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveView('marketplace');
                }}
                className={`py-1 transition-colors flex items-center gap-1.5 ${selectedCategory === cat.id ? 'font-bold text-[#002f34] border-b-2 border-[#002f34]' : 'text-slate-600 hover:text-[#002f34]'}`}
              >
                <span>{getCategoryIcon(cat.iconName)}</span>
                <span>{language === 'ur' ? cat.nameUrdu : cat.name}</span>
              </button>
            ))}
          </div>

          {/* Active Filter Clear Tag */}
          {selectedCategory !== 'all' && activeCategoryObj && (
            <div className="ml-auto shrink-0 flex items-center gap-1.5 bg-slate-100 text-[#002f34] text-xs px-2.5 py-1 rounded">
              <span>{language === 'ur' ? activeCategoryObj.nameUrdu : activeCategoryObj.name}</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-slate-400 hover:text-slate-700"
                title="Clear category filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
