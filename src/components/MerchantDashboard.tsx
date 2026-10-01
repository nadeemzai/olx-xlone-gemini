import React, { useState } from 'react';
import { 
  Store, 
  CheckCircle2, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Zap, 
  Plus, 
  FileText, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Download,
  Building2,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Listing } from '../types';

export const MerchantDashboard: React.FC = () => {
  const { 
    language, 
    currentUser, 
    listings, 
    transactions, 
    initiatePayment, 
    setIsPostAdOpen,
    setSelectedListingDetail,
    boostListing,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'transactions' | 'verification'>('listings');
  const [listingFilter, setListingFilter] = useState<'all' | 'active' | 'pending' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get current user's listings
  const userListings = listings.filter(l => l.seller.id === currentUser.id);

  const filteredListings = userListings.filter(l => {
    const matchesFilter = listingFilter === 'all' || l.status === listingFilter;
    const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalViews = userListings.reduce((sum, l) => sum + l.views, 0);
  const totalFavorites = userListings.reduce((sum, l) => sum + l.favoritesCount, 0);
  const activeCount = userListings.filter(l => l.status === 'active').length;
  const pendingCount = userListings.filter(l => l.status === 'pending').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Merchant Identity & Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-teal-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                {currentUser.merchantProfile?.companyName || currentUser.name}
              </h1>
              {currentUser.verified && (
                <span className="flex items-center gap-1 bg-teal-50 text-teal-700 text-xs font-bold px-2 py-0.5 rounded-full border border-teal-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Merchant
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              NTN: {currentUser.merchantProfile?.ntnNumber || '7492019-3'} · Member Since {currentUser.memberSince} · {currentUser.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPostAdOpen(true)}
          className="px-5 py-2.5 bg-[#002f34] hover:bg-[#002226] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Ad</span>
        </button>
      </div>

      {/* Real-time Business Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Active Inventory</span>
            <Store className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-[#002f34] tabular-nums">{activeCount}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Live on Andaza Pakistan</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Ad Impressions</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-[#002f34] tabular-nums">{totalViews.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">+18.4% vs last week</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Customer Inquiries</span>
            <MessageSquare className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-[#002f34] tabular-nums">{totalFavorites + 12}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Chats & Phone calls</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 tabular-nums">{pendingCount}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Moderation Queue</span>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-slate-200 px-4 pt-2">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === 'listings' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>My Inventory & Listings ({userListings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === 'transactions' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>Transactions & Tax Invoices ({transactions.filter(t => t.userId === currentUser.id).length})</span>
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === 'verification' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>Merchant KYC & Business Profile</span>
          </button>
        </div>

        {/* TAB 1: LISTINGS INVENTORY */}
        {activeTab === 'listings' && (
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
                <button
                  onClick={() => setListingFilter('all')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${listingFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All ({userListings.length})
                </button>
                <button
                  onClick={() => setListingFilter('active')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${listingFilter === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Active ({activeCount})
                </button>
                <button
                  onClick={() => setListingFilter('pending')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${listingFilter === 'pending' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Pending ({pendingCount})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34]"
                />
              </div>
            </div>

            {/* Listings Table / Cards */}
            <div className="divide-y divide-slate-100">
              {filteredListings.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No listings found under this filter.
                </div>
              ) : (
                filteredListings.map(listing => (
                  <div key={listing.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 
                            onClick={() => setSelectedListingDetail(listing)}
                            className="text-xs font-bold text-slate-900 hover:underline cursor-pointer"
                          >
                            {listing.title}
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${listing.status === 'active' ? 'bg-emerald-50 text-emerald-700' : listing.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                            {listing.status}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-[#002f34] mt-0.5 tabular-nums">
                          Rs {listing.price.toLocaleString()} PKR
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                          <span>{listing.location.city}</span>
                          <span>·</span>
                          <span>{listing.views} views</span>
                          <span>·</span>
                          <span>{listing.favoritesCount} saves</span>
                        </div>
                      </div>
                    </div>

                    {/* Promotion Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {!listing.featured && (
                        <button
                          onClick={() => initiatePayment(listing, 'featured_7d')}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>Feature (Rs 1,499)</span>
                        </button>
                      )}
                      <button
                        onClick={() => boostListing(listing.id)}
                        className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-lg transition-colors"
                      >
                        Bump Up
                      </button>
                      <button
                        onClick={() => setSelectedListingDetail(listing)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: TRANSACTIONS & RECEIPTS */}
        {activeTab === 'transactions' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Invoice #</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Package</th>
                    <th className="py-2.5 px-3">Gateway</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map(txn => (
                    <tr key={txn.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-800">{txn.invoiceNumber}</td>
                      <td className="py-3 px-3 text-slate-500">{txn.date}</td>
                      <td className="py-3 px-3 font-medium text-slate-800">{txn.packageName}</td>
                      <td className="py-3 px-3 uppercase font-semibold text-slate-600">{txn.paymentMethod}</td>
                      <td className="py-3 px-3 font-extrabold text-[#002f34] tabular-nums">
                        Rs {txn.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => showToast(`Invoice ${txn.invoiceNumber} receipt downloaded`)}
                          className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 justify-end ml-auto"
                        >
                          <Download className="w-3.5 h-3.5" />
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: VERIFICATION */}
        {activeTab === 'verification' && (
          <div className="p-6 space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Verified Merchant Status: Approved</h4>
                <p className="text-xs text-emerald-700">
                  Your enterprise entity is recognized under Pakistan Trade Regulatory standards. All listings receive priority moderation.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Registered Company Name</label>
                  <p className="p-2.5 bg-slate-50 border border-slate-200 rounded font-bold text-slate-800">
                    OZ Tech Automotive & Estates
                  </p>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">National Tax Number (NTN)</label>
                  <p className="p-2.5 bg-slate-50 border border-slate-200 rounded font-bold text-slate-800">
                    7492019-3
                  </p>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Principal Commercial Address</label>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded font-bold text-slate-800">
                  Plot 41-B, Blue Area, Islamabad, Pakistan
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
