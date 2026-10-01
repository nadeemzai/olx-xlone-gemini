import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  FileCode, 
  Terminal, 
  Layers, 
  Cpu, 
  Copy, 
  Check, 
  Download, 
  Server, 
  ShieldCheck,
  Zap,
  Play,
  Package,
  FolderArchive,
  Store,
  ExternalLink
} from 'lucide-react';
import { 
  LARAVEL_PROJECT_TREE, 
  MYSQL_DATABASE_SCHEMA_SQL, 
  BLADE_LAYOUT_TEMPLATE, 
  BLADE_LISTING_SHOW_TEMPLATE, 
  LARAVEL_MODERATION_CONTROLLER,
  LARAVEL_PEST_TESTS 
} from '../data/laravelCodeSnippets';
import { 
  FRONTEND_FILES, 
  ADMIN_BACKEND_FILES, 
  COMPANY_PANEL_FILES, 
  downloadZipArchive, 
  downloadFullMonolithZip 
} from '../utils/downloadPackages';
import { useApp } from '../context/AppContext';

export const ArchitectureStudio: React.FC = () => {
  const { showToast } = useApp();
  const [activeSection, setActiveSection] = useState<'downloads' | 'schema' | 'blade' | 'admin' | 'company' | 'api' | 'tests' | 'scaling'>('downloads');
  const [selectedBlade, setSelectedBlade] = useState<'layout' | 'show' | 'controller'>('layout');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast('Copied to clipboard!');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleDownloadFullZip = async () => {
    try {
      setIsDownloading('full');
      await downloadFullMonolithZip();
      showToast('Downloaded andaza-pakistan-laravel13-monolith-complete.zip');
    } catch (e) {
      showToast('Error generating zip');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadFrontendZip = async () => {
    try {
      setIsDownloading('frontend');
      await downloadZipArchive(FRONTEND_FILES, 'andaza-frontend-blade-tailwind.zip');
      showToast('Downloaded andaza-frontend-blade-tailwind.zip');
    } catch (e) {
      showToast('Error generating zip');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadAdminZip = async () => {
    try {
      setIsDownloading('admin');
      await downloadZipArchive(ADMIN_BACKEND_FILES, 'andaza-admin-backend.zip');
      showToast('Downloaded andaza-admin-backend.zip');
    } catch (e) {
      showToast('Error generating zip');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadCompanyZip = async () => {
    try {
      setIsDownloading('company');
      await downloadZipArchive(COMPANY_PANEL_FILES, 'andaza-company-panel.zip');
      showToast('Downloaded andaza-company-panel.zip');
    } catch (e) {
      showToast('Error generating zip');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadSql = () => {
    const blob = new Blob([MYSQL_DATABASE_SCHEMA_SQL], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'andaza_pakistan_laravel13_schema.sql';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded andaza_pakistan_laravel13_schema.sql');
  };

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/v1/listings',
      description: 'Fetch paginated classified listings with location & price filters',
      params: 'city=Lahore&category=vehicles&min_price=1000000&max_price=10000000&page=1',
      response: `{
  "status": "success",
  "data": [
    {
      "id": 101,
      "title": "Honda Civic RS 1.5 VTEC Turbo 2023",
      "price": 9250000,
      "currency": "PKR",
      "city": "Islamabad",
      "area": "Sector F-7",
      "is_featured": true,
      "seller": {
        "id": 12,
        "name": "OZ Tech Automotive",
        "is_verified": true
      }
    }
  ],
  "meta": {
    "total": 1420,
    "per_page": 20,
    "current_page": 1
  }
}`
    },
    {
      method: 'POST',
      path: '/api/v1/listings',
      description: 'Create a new classified ad listing with dynamic category attributes',
      params: 'Bearer Token Required',
      response: `{
  "status": "success",
  "message": "Listing submitted successfully. Awaiting safety moderation.",
  "data": {
    "id": 109,
    "status": "pending",
    "slug": "toyota-corolla-altis-grande-2023",
    "created_at": "2026-09-30T12:00:00Z"
  }
}`
    },
    {
      method: 'POST',
      path: '/api/v1/chat/messages',
      description: 'Send encrypted buyer-seller negotiation or message',
      params: 'Bearer Token Required (AES-256 GCM encrypted payload)',
      response: `{
  "status": "success",
  "data": {
    "message_id": 4891,
    "conversation_id": 101,
    "is_offer": true,
    "offer_amount": 9000000,
    "offer_status": "pending",
    "created_at": "2026-09-30T12:05:00Z"
  }
}`
    },
    {
      method: 'POST',
      path: '/api/v1/payments/jazzcash/initiate',
      description: 'Initiate JazzCash / Easypaisa mobile wallet checkout for Ad Promotions',
      params: 'listing_id, package_type, mobile_number',
      response: `{
  "status": "pending_authorization",
  "transaction_ref": "JC-TXN-98421",
  "amount_pkr": 1499.00,
  "gateway": "jazzcash",
  "prompt_sent_to": "03008472910"
}`
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Quick Download Button */}
      <div className="bg-[#002f34] text-white rounded-xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-[#23e5db]" />
            <h1 className="text-xl font-bold tracking-tight">
              Laravel 13 Monolith & MySQL Enterprise Architecture Studio
            </h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Download production-ready source code for Frontend Blade templates, Admin Backend, Company Panel, and MySQL schema.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDownloadFullZip}
            disabled={isDownloading === 'full'}
            className="px-4 py-2.5 bg-[#ffce32] hover:bg-amber-400 text-[#002f34] font-extrabold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
          >
            <FolderArchive className="w-4 h-4" />
            {isDownloading === 'full' ? 'Generating Zip...' : 'Download Full Monolith (.zip)'}
          </button>
          <button
            onClick={handleDownloadSql}
            className="px-3.5 py-2.5 bg-[#23e5db] hover:bg-[#1bc7be] text-[#002f34] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            Download Schema.sql
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-slate-200 px-4 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection('downloads')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'downloads' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Package className="w-4 h-4 text-amber-500" />
            <span>Download Center</span>
          </button>
          <button
            onClick={() => setActiveSection('schema')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'schema' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Database className="w-4 h-4" />
            <span>MySQL 8.4 Database Schema</span>
          </button>
          <button
            onClick={() => setActiveSection('blade')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'blade' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <FileCode className="w-4 h-4" />
            <span>Frontend Blade & Tailwind</span>
          </button>
          <button
            onClick={() => setActiveSection('admin')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'admin' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Backend</span>
          </button>
          <button
            onClick={() => setActiveSection('company')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'company' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Store className="w-4 h-4 text-[#ffce32]" />
            <span>Company Panel</span>
          </button>
          <button
            onClick={() => setActiveSection('api')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'api' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Terminal className="w-4 h-4" />
            <span>RESTful API Sandbox (v1)</span>
          </button>
          <button
            onClick={() => setActiveSection('tests')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'tests' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Pest / PHPUnit Tests</span>
          </button>
          <button
            onClick={() => setActiveSection('scaling')}
            className={`py-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${activeSection === 'scaling' ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Server className="w-4 h-4" />
            <span>Horizontal Scaling & Tree</span>
          </button>
        </div>

        {/* SECTION 0: DOWNLOAD CENTER */}
        {activeSection === 'downloads' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Download Code Packages (Frontend, Admin Backend, Company Panel & Database)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download individual modules as standard zip archives or grab the full monolithic codebase.
              </p>
            </div>

            {/* Download Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Card 1: Frontend Package */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">1. Frontend Package</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Complete Laravel 13 Blade views, master layouts, Pakistan location & search headers, product gallery, and Tailwind CSS v4 styling.
                  </p>
                  <ul className="text-[11px] text-slate-500 list-disc pl-4 space-y-0.5 pt-1">
                    <li><code>layouts/app.blade.php</code></li>
                    <li><code>home.blade.php</code></li>
                    <li><code>listings/show.blade.php</code></li>
                    <li><code>listings/create.blade.php</code></li>
                    <li><code>tailwind.config.js</code> & <code>app.css</code></li>
                  </ul>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-200 flex gap-2">
                  <button
                    onClick={handleDownloadFrontendZip}
                    disabled={isDownloading === 'frontend'}
                    className="flex-1 py-2 bg-[#002f34] hover:bg-[#002226] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloading === 'frontend' ? 'Downloading...' : 'Download (.zip)'}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('blade')}
                    className="px-3 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-white"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Card 2: Admin Backend */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">2. Admin Backend Package</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Moderation controllers, 1-click approvals, compliance rejection logic, merchant KYC review, analytics, and protected web & API routes.
                  </p>
                  <ul className="text-[11px] text-slate-500 list-disc pl-4 space-y-0.5 pt-1">
                    <li><code>ModerationController.php</code></li>
                    <li><code>UserManagementController.php</code></li>
                    <li><code>AnalyticsController.php</code></li>
                    <li><code>routes/web.php</code> & <code>routes/api.php</code></li>
                  </ul>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-200 flex gap-2">
                  <button
                    onClick={handleDownloadAdminZip}
                    disabled={isDownloading === 'admin'}
                    className="flex-1 py-2 bg-[#002f34] hover:bg-[#002226] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloading === 'admin' ? 'Downloading...' : 'Download (.zip)'}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('admin')}
                    className="px-3 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-white"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Card 3: Company Panel */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Store className="w-5 h-5 text-amber-700" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">3. Company & Merchant Panel</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Merchant dashboard controller, inventory manager, and payment gateway service for **JazzCash, Easypaisa, Raast** & invoices.
                  </p>
                  <ul className="text-[11px] text-slate-500 list-disc pl-4 space-y-0.5 pt-1">
                    <li><code>MerchantDashboardController.php</code></li>
                    <li><code>PaymentGatewayService.php</code></li>
                    <li><code>merchant/dashboard.blade.php</code></li>
                    <li><code>transaction-receipt.blade.php</code></li>
                  </ul>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-200 flex gap-2">
                  <button
                    onClick={handleDownloadCompanyZip}
                    disabled={isDownloading === 'company'}
                    className="flex-1 py-2 bg-[#002f34] hover:bg-[#002226] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloading === 'company' ? 'Downloading...' : 'Download (.zip)'}</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('company')}
                    className="px-3 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-white"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Card 4: MySQL Schema */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">4. MySQL Database Schema</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Production MySQL 8.4+ DDL script with tables for users, merchants, categories, listings, attributes, encrypted chats, and transactions.
                  </p>
                  <ul className="text-[11px] text-slate-500 list-disc pl-4 space-y-0.5 pt-1">
                    <li><code>10 Normalized Tables</code></li>
                    <li><code>Fulltext search indexes</code></li>
                    <li><code>Composite geospatial & price indexes</code></li>
                  </ul>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-200 flex gap-2">
                  <button
                    onClick={handleDownloadSql}
                    className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.sql)</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('schema')}
                    className="px-3 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-white"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Card 5: Full Monolith Bundle */}
              <div className="bg-gradient-to-br from-teal-50 to-amber-50 border-2 border-teal-300 rounded-xl p-5 flex flex-col justify-between shadow-xs md:col-span-2">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#002f34] text-[#23e5db] px-2 py-0.5 rounded">
                    COMPLETE MONOLITHIC CODEBASE
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900">
                    Full Monolith (.zip Archive)
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Includes all Frontend templates, Admin controllers, Company dashboard, Pakistani payment gateways, MySQL schema, Pest test suites, <code>.env.example</code>, and local deployment instructions.
                  </p>
                </div>
                <div className="pt-4 mt-2 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-slate-600">
                    Ready for Laravel 13 & MySQL 8.4+
                  </span>
                  <button
                    onClick={handleDownloadFullZip}
                    disabled={isDownloading === 'full'}
                    className="px-6 py-2.5 bg-[#002f34] hover:bg-[#002226] text-white font-extrabold text-xs rounded-lg transition-all flex items-center gap-2 shadow-xs"
                  >
                    <FolderArchive className="w-4 h-4 text-[#ffce32]" />
                    <span>{isDownloading === 'full' ? 'Generating Zip...' : 'Download Full Monolith (.zip)'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 1: MYSQL SCHEMA */}
        {activeSection === 'schema' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Production MySQL DDL Schema
                </h3>
                <p className="text-xs text-slate-500">
                  Tables for Users, Merchants, Listings, EAV Attributes, Encrypted Messages, Transactions & Moderation Logs.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadSql}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .sql</span>
                </button>
                <button
                  onClick={() => handleCopy(MYSQL_DATABASE_SCHEMA_SQL, 'schema')}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'schema' ? 'Copied' : 'Copy SQL'}</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
              <pre>{MYSQL_DATABASE_SCHEMA_SQL}</pre>
            </div>
          </div>
        )}

        {/* SECTION 2: BLADE TEMPLATES */}
        {activeSection === 'blade' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBlade('layout')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedBlade === 'layout' ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  app.blade.php
                </button>
                <button
                  onClick={() => setSelectedBlade('show')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedBlade === 'show' ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  listings/show.blade.php
                </button>
                <button
                  onClick={() => setSelectedBlade('controller')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedBlade === 'controller' ? 'bg-[#002f34] text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  listings/create.blade.php
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadFrontendZip}
                  className="px-3 py-1.5 bg-[#002f34] text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-[#002226]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Frontend (.zip)</span>
                </button>
                <button
                  onClick={() => {
                    const content = selectedBlade === 'layout' 
                      ? FRONTEND_FILES['resources/views/layouts/app.blade.php'] 
                      : selectedBlade === 'show' 
                      ? FRONTEND_FILES['resources/views/listings/show.blade.php'] 
                      : FRONTEND_FILES['resources/views/listings/create.blade.php'];
                    handleCopy(content, 'blade');
                  }}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  {copiedKey === 'blade' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Code</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
              <pre>
                {selectedBlade === 'layout' && FRONTEND_FILES['resources/views/layouts/app.blade.php']}
                {selectedBlade === 'show' && FRONTEND_FILES['resources/views/listings/show.blade.php']}
                {selectedBlade === 'controller' && FRONTEND_FILES['resources/views/listings/create.blade.php']}
              </pre>
            </div>
          </div>
        )}

        {/* SECTION 3: ADMIN BACKEND */}
        {activeSection === 'admin' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Admin Backend Controllers & Routes
                </h3>
                <p className="text-xs text-slate-500">
                  Moderation queue controllers, merchant verification, user management, and security routes.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadAdminZip}
                  className="px-3 py-1.5 bg-[#002f34] text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-[#002226]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Admin Backend (.zip)</span>
                </button>
                <button
                  onClick={() => handleCopy(ADMIN_BACKEND_FILES['app/Http/Controllers/Admin/ModerationController.php'], 'admin')}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  {copiedKey === 'admin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Code</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
              <pre>{ADMIN_BACKEND_FILES['app/Http/Controllers/Admin/ModerationController.php']}</pre>
            </div>
          </div>
        )}

        {/* SECTION 4: COMPANY PANEL */}
        {activeSection === 'company' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Company Panel & Payment Gateway Service
                </h3>
                <p className="text-xs text-slate-500">
                  Merchant dashboard controller, JazzCash & Easypaisa payment service, and automated invoice dispatch.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadCompanyZip}
                  className="px-3 py-1.5 bg-[#002f34] text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-[#002226]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Company Panel (.zip)</span>
                </button>
                <button
                  onClick={() => handleCopy(COMPANY_PANEL_FILES['app/Services/PaymentGatewayService.php'], 'company')}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  {copiedKey === 'company' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Code</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
              <pre>{COMPANY_PANEL_FILES['app/Services/PaymentGatewayService.php']}</pre>
            </div>
          </div>
        )}

        {/* SECTION 5: RESTFUL API */}
        {activeSection === 'api' && (
          <div className="p-4 sm:p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Andaza Pakistan Mobile & 3rd-Party RESTful API v1
              </h3>
              <p className="text-xs text-slate-500">
                Strict JSON responses, Bearer JWT authentication, and localized validation errors.
              </p>
            </div>

            <div className="space-y-4">
              {apiEndpoints.map((ep, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 p-3.5 flex items-center justify-between border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase font-mono ${ep.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {ep.method}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">{ep.path}</span>
                    </div>
                    <span className="text-xs text-slate-500">{ep.description}</span>
                  </div>

                  <div className="p-3 bg-white grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] mb-1 font-semibold">Parameters / Headers:</span>
                      <p className="font-mono bg-slate-50 p-2 rounded text-slate-700 text-[11px] break-all">
                        {ep.params}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] mb-1 font-semibold">Sample Response (200 OK):</span>
                      <pre className="font-mono bg-slate-900 text-slate-100 p-2 rounded text-[10px] overflow-x-auto max-h-36">
                        {ep.response}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: AUTOMATED TESTS */}
        {activeSection === 'tests' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Automated Testing Suite (Pest PHP v3 / PHPUnit 11)
                </h3>
                <p className="text-xs text-slate-500">
                  Unit & integration tests covering listing lifecycle, moderation RBAC, and negotiation security.
                </p>
              </div>
              <button
                onClick={() => handleCopy(LARAVEL_PEST_TESTS, 'tests')}
                className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1"
              >
                {copiedKey === 'tests' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Pest Tests</span>
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
              <pre>{LARAVEL_PEST_TESTS}</pre>
            </div>
          </div>
        )}

        {/* SECTION 7: SCALING & MONOLITH ARCHITECTURE */}
        {activeSection === 'scaling' && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* File Tree */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Complete Laravel 13 Project Tree
                </h4>
                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-96">
                  <pre>{LARAVEL_PROJECT_TREE}</pre>
                </div>
              </div>

              {/* Horizontal Scaling Architecture Blueprint */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Horizontal Scaling & High Availability Blueprint
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900 block mb-1">
                      1. MySQL Read Replicas & Connection Pooling
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Primary master for writes (new listings, messages, orders) + cluster of 3 read replicas for high-frequency search and category browse queries via Laravel database replication.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900 block mb-1">
                      2. Redis Cluster for Caching & Session Storage
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      All taxonomy categories, Pakistani location trees, and user sessions cached in Redis with sub-millisecond retrieval.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900 block mb-1">
                      3. Real-Time WebSockets via Laravel Reverb
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Native first-party WebSocket server handling 50,000+ concurrent connections for instant buyer-seller chat and moderation alerts.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900 block mb-1">
                      4. Prometheus & Sentry Observability
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Structured JSON logging with correlation IDs, alerting on gateway timeouts, and automatic fraud score tagging.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
