import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  Eye, 
  FileText,
  Search,
  Filter,
  Zap,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Listing } from '../types';

export const AdminPanel: React.FC = () => {
  const { 
    language, 
    listings, 
    approveListing, 
    rejectListing, 
    toggleFeatured, 
    auditLogs, 
    availableUsers, 
    setSelectedListingDetail,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'users' | 'analytics' | 'security'>('moderation');
  const [rejectingAdId, setRejectingAdId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Violates community policy (counterfeit or unverified product)');
  const [moderationFilter, setModerationFilter] = useState<'all' | 'pending' | 'active' | 'rejected'>('pending');

  const pendingListings = listings.filter(l => l.status === 'pending');
  const filteredListings = listings.filter(l => moderationFilter === 'all' || l.status === moderationFilter);

  const totalGMV = listings
    .filter(l => l.status === 'active')
    .reduce((sum, l) => sum + l.price, 0);

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingAdId) return;
    rejectListing(rejectingAdId, rejectionReason);
    setRejectingAdId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#002f34] text-white rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#23e5db]" />
            <h1 className="text-xl font-bold tracking-tight">
              Andaza Pakistan Trust & Safety Admin Console
            </h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time ad listing moderation, merchant verification oversight, and platform telemetry.
          </p>
        </div>

        {/* Live Pending Counter */}
        <div className="bg-[#00474e] border border-[#23e5db]/30 px-4 py-2 rounded-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></div>
          <div>
            <span className="text-[11px] text-slate-300 block">Queue Backlog</span>
            <span className="text-sm font-extrabold text-[#ffce32] tabular-nums">
              {pendingListings.length} Ads Pending
            </span>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Gross Merchandise Value (GMV)</span>
          <p className="text-2xl font-extrabold text-[#002f34] tabular-nums">
            Rs {(totalGMV / 1000000).toFixed(1)}M
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Live Platform Inventory</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Live Listings</span>
          <p className="text-2xl font-extrabold text-[#002f34] tabular-nums">
            {listings.filter(l => l.status === 'active').length}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Across 10 Pakistani Cities</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Verified Merchants</span>
          <p className="text-2xl font-extrabold text-[#002f34] tabular-nums">
            {availableUsers.filter(u => u.verified).length}
          </p>
          <span className="text-[11px] text-teal-600 font-semibold mt-1 block">100% NTN Verified</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Avg. Moderation SLA</span>
          <p className="text-2xl font-extrabold text-[#002f34] tabular-nums">
            3.8 min
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Automated AI + Human Review</span>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 px-4 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'moderation' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>Ad Moderation Queue</span>
            {pendingListings.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {pendingListings.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 shrink-0 ${activeTab === 'users' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>User & Merchant Oversight</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 shrink-0 ${activeTab === 'analytics' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>Behavior & City Metrics</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 shrink-0 ${activeTab === 'security' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>Security & Audit Trails ({auditLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: MODERATION QUEUE */}
        {activeTab === 'moderation' && (
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Filter Queue:</span>
              <button
                onClick={() => setModerationFilter('pending')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${moderationFilter === 'pending' ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Pending Review ({pendingListings.length})
              </button>
              <button
                onClick={() => setModerationFilter('active')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${moderationFilter === 'active' ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Active Published
              </button>
              <button
                onClick={() => setModerationFilter('rejected')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${moderationFilter === 'rejected' ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Rejected / Flagged
              </button>
              <button
                onClick={() => setModerationFilter('all')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${moderationFilter === 'all' ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All
              </button>
            </div>

            {/* Listings Queue List */}
            <div className="divide-y divide-slate-100">
              {filteredListings.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No listings waiting in this queue.
                </div>
              ) : (
                filteredListings.map(listing => (
                  <div key={listing.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400">#{listing.id}</span>
                          <h4 
                            onClick={() => setSelectedListingDetail(listing)}
                            className="text-xs font-bold text-slate-900 hover:underline cursor-pointer"
                          >
                            {listing.title}
                          </h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${listing.status === 'active' ? 'bg-emerald-50 text-emerald-700' : listing.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                            {listing.status}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-[#002f34] mt-0.5 tabular-nums">
                          Rs {listing.price.toLocaleString()} PKR · <span className="capitalize">{listing.categoryId}</span>
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                          <span>Seller: <strong>{listing.seller.name}</strong></span>
                          <span>·</span>
                          <span>{listing.location.city}</span>
                          <span>·</span>
                          <span className="text-slate-400">{listing.createdAt}</span>
                        </div>
                        {listing.rejectionReason && (
                          <p className="text-[11px] text-rose-600 font-semibold mt-1">
                            Reason: {listing.rejectionReason}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Moderation Controls */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      {listing.status !== 'active' && (
                        <button
                          onClick={() => approveListing(listing.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                          title="Approve and publish ad immediately"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Ad</span>
                        </button>
                      )}

                      {listing.status !== 'rejected' && (
                        <button
                          onClick={() => setRejectingAdId(listing.id)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                          title="Reject ad with compliance reason"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleFeatured(listing.id)}
                        className={`px-3 py-1.5 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 ${listing.featured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        title="Toggle Featured placement"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{listing.featured ? 'Featured ✓' : 'Make Featured'}</span>
                      </button>

                      <button
                        onClick={() => setSelectedListingDetail(listing)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs"
                        title="Inspect full details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Reject Reason Modal Dialog */}
            {rejectingAdId && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
                  <h3 className="font-bold text-sm text-slate-900">
                    Reject Ad Listing #{rejectingAdId}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select a reason to record in the audit log and notify the seller:
                  </p>

                  <select
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Counterfeit or trademark policy violation">Counterfeit / Replica Trademark Violation</option>
                    <option value="Duplicate listing violation">Duplicate Listing Violation</option>
                    <option value="Inaccurate pricing or misleading details">Inaccurate / Misleading Price</option>
                    <option value="Prohibited item under Pakistan laws">Prohibited Item (Weapons, Medicines)</option>
                    <option value="Unreachable contact number">Unreachable Contact Number</option>
                  </select>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setRejectingAdId(null)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmReject}
                      className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: USERS & MERCHANTS */}
        {activeTab === 'users' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">User / Company</th>
                    <th className="py-2.5 px-3">Email & Phone</th>
                    <th className="py-2.5 px-3">Account Role</th>
                    <th className="py-2.5 px-3">NTN / CNIC</th>
                    <th className="py-2.5 px-3">Verification</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {availableUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-slate-900">{user.name}</p>
                            {user.merchantProfile && (
                              <p className="text-[10px] text-teal-700 font-medium">{user.merchantProfile.companyName}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-slate-800">{user.email}</p>
                        <p className="text-[10px] text-slate-400">{user.phone}</p>
                      </td>
                      <td className="py-3 px-3 uppercase font-semibold text-slate-700">
                        {user.role}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px]">
                        {user.merchantProfile?.ntnNumber || 'N/A'}
                      </td>
                      <td className="py-3 px-3">
                        {user.verified ? (
                          <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => showToast(`User ${user.name} status updated`)}
                          className="text-xs font-semibold text-teal-700 hover:text-teal-900"
                        >
                          Manage Access
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS & CITY METRICS */}
        {activeTab === 'analytics' && (
          <div className="p-6 space-y-6">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              City-Wise Inventory & Engagement Distribution
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { city: 'Lahore', listings: 4, share: '40%', gmv: 'Rs 89.4M' },
                { city: 'Islamabad', listings: 3, share: '30%', gmv: 'Rs 10.2M' },
                { city: 'Karachi', listings: 2, share: '20%', gmv: 'Rs 20.2M' },
                { city: 'Rawalpindi', listings: 1, share: '10%', gmv: 'Rs 0.36M' },
              ].map(item => (
                <div key={item.city} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800 text-sm">{item.city}</span>
                    <span className="text-xs font-bold text-teal-700">{item.share}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.listings} Active Listings</p>
                  <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between text-[11px]">
                    <span className="text-slate-400">City GMV</span>
                    <span className="font-bold text-slate-800 tabular-nums">{item.gmv}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Insights */}
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-teal-700" />
                Growth & Optimization Intelligence
              </span>
              <p className="text-xs text-teal-800 leading-relaxed">
                Vehicles and Real Estate in Lahore DHA and Islamabad Blue Area generate the highest buyer inquiries per listing. Featured ads convert at 4.2x compared to standard free listings.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & AUDIT */}
        {activeTab === 'security' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Listing ID / Title</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Moderator / Actor</th>
                    <th className="py-2.5 px-3">Notes & Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono text-slate-500">{log.timestamp}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800 truncate max-w-xs">{log.listingTitle}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${log.action === 'approved' ? 'bg-emerald-50 text-emerald-700' : log.action === 'featured' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium">{log.adminName}</td>
                      <td className="py-3 px-3 text-slate-500">{log.notes || 'Routine check'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
