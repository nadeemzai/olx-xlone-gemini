# Andaza Pakistan - Laravel 13 Monolith Backend

Enterprise Classifieds Marketplace monolith built with **Laravel 13, MySQL 8.4+, Laravel Reverb (WebSockets), and Tailwind CSS v4**.

---

## 🛠️ Technology Stack
- **Framework:** Laravel 13 (PHP 8.4+)
- **Database:** MySQL 8.4+ (InnoDB, UTF8mb4, Fulltext Indexing)
- **Real-Time Chat:** Laravel Reverb (WebSocket broadcasting)
- **Authentication:** Laravel Sanctum (Token Auth) & Session Authentication
- **Payments:** JazzCash, Easypaisa, Raast SBP instant payment rails
- **Testing:** Pest PHP v3 & PHPUnit 11

---

## 🚀 Installation & Local Setup

### 1. Requirements
- PHP >= 8.4 (with `pdo_mysql`, `mbstring`, `openssl`, `bcmath`, `curl`)
- Composer >= 2.7
- MySQL Server >= 8.4
- Node.js >= 20.x & npm

### 2. Setup Steps
```bash
# 1. Install PHP dependencies
composer install

# 2. Configure environment
cp .env.example .env
php artisan key:generate

# 3. Import MySQL Database Schema
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS andaza_pakistan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p andaza_pakistan < database/andaza_pakistan_laravel13_schema.sql

# 4. Run Seeders (Optional, for demo data)
php artisan db:seed

# 5. Compile Frontend Assets (Tailwind & Alpine)
npm install
npm run build

# 6. Launch Laravel Development Server
php artisan serve
```

The application will be live at `http://localhost:8000`.

---

## 📡 API Endpoints (v1)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/listings` | Paginated listings with city, category, and price filters |
| `GET` | `/api/v1/listings/{id}` | Detailed listing specifications and seller profile |
| `POST` | `/api/v1/listings` | Create listing (Requires Bearer Token) |
| `POST` | `/api/v1/chat/messages` | Send encrypted message or negotiation offer |
| `POST` | `/api/v1/payments/jazzcash/initiate` | Initiate JazzCash mobile account debit |
| `POST` | `/api/v1/payments/easypaisa/initiate` | Initiate Easypaisa wallet checkout |
