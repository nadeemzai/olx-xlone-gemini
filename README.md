# Andaza Pakistan - Enterprise Classifieds Marketplace

This repository is structured as a **Dual-Architecture Project** containing both:
1. **React 19 Interactive Frontend SPA** (at the root of this repository)
2. **Laravel 13 Monolith Backend & API Suite** (inside the [`laravel-backend/`](./laravel-backend/) directory)

---

## 📂 Repository Structure

```text
├── laravel-backend/              <-- FULL LARAVEL 13 MONOLITH & MYSQL BACKEND
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── Admin/            # Moderation, User Verification, Platform Analytics
│   │   │   ├── Merchant/         # Company Dashboard, Ad Promotion Management
│   │   │   ├── Api/              # RESTful API v1 (Auth, Listings, Chat, Payments)
│   │   │   └── ListingController.php
│   │   ├── Models/               # Eloquent Models (User, Listing, Transaction, etc.)
│   │   ├── Notifications/        # Email Tax Invoices, Approval Alerts
│   │   └── Services/             # JazzCash, Easypaisa, Raast & Chat Encryption
│   ├── database/
│   │   ├── andaza_pakistan_laravel13_schema.sql  # MySQL 8.4+ DDL Schema
│   │   ├── migrations/           # Normalized database migrations
│   │   └── seeders/              # Pakistan cities, categories & mock listings
│   ├── resources/
│   │   ├── views/                # Blade layouts, listings, merchant & admin views
│   │   └── css/                  # Tailwind CSS styling tokens
│   ├── routes/
│   │   ├── web.php               # Monolith Blade routes
│   │   ├── api.php               # Mobile & 3rd-party REST API
│   │   └── channels.php          # Laravel Reverb WebSocket broadcast channels
│   ├── tests/                    # Pest PHP & PHPUnit automated test suites
│   ├── composer.json             # PHP 8.4 & Laravel 13 dependencies
│   └── README.md                 # Laravel backend setup instructions
│
├── src/                          <-- REACT 19 + VITE INTERACTIVE FRONTEND
│   ├── components/               # Header, Marketplace, Admin Panel, Company Dashboard
│   ├── context/                  # Centralized state management & multilingual (EN/UR)
│   ├── data/                     # Pakistani taxonomy, cities, and listings
│   └── utils/                    # ZIP packaging & download center utilities
├── package.json
└── vite.config.ts
```

---

## 🚀 Running the Projects

### Option 1: Running the Laravel 13 Monolith Backend
See complete setup instructions in [`laravel-backend/README.md`](./laravel-backend/README.md):
```bash
cd laravel-backend
composer install
cp .env.example .env
php artisan key:generate
mysql -u root -p andaza_pakistan < database/andaza_pakistan_laravel13_schema.sql
php artisan serve
```

### Option 2: Running the React Interactive Frontend
```bash
npm install
npm run dev
```
Accessible at: `http://localhost:3000`
