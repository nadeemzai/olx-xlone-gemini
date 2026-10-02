-- ==============================================================
-- ANDAZA PAKISTAN ENTERPRISE MONOLITH DATABASE SCHEMA (MySQL 8.4+)
-- Designed for High Concurrency, Geospatial Search & Horizontal Sharding
-- ==============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL UNIQUE,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `phone` VARCHAR(25) NOT NULL UNIQUE,
  `phone_verified_at` TIMESTAMP NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'merchant', 'moderator', 'admin') NOT NULL DEFAULT 'user',
  `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
  `avatar_url` VARCHAR(500) NULL,
  `language_preference` VARCHAR(5) NOT NULL DEFAULT 'en',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. VERIFIED MERCHANT PROFILES
CREATE TABLE IF NOT EXISTS `merchant_profiles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL UNIQUE,
  `company_name` VARCHAR(150) NOT NULL,
  `ntn_number` VARCHAR(50) NULL,
  `cnic_number` VARCHAR(30) NULL,
  `business_address` TEXT NOT NULL,
  `verification_status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `documents_submitted` BOOLEAN NOT NULL DEFAULT FALSE,
  `verified_at` TIMESTAMP NULL,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  `review_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. TAXONOMY CATEGORIES
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(80) NOT NULL UNIQUE,
  `name_en` VARCHAR(100) NOT NULL,
  `name_ur` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` INT UNSIGNED NULL,
  `icon_name` VARCHAR(50) NULL,
  `display_order` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. CLASSIFIED LISTINGS
CREATE TABLE IF NOT EXISTS `listings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL UNIQUE,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `title_ur` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `slug` VARCHAR(280) NOT NULL UNIQUE,
  `description` MEDIUMTEXT NOT NULL,
  `description_ur` MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `price` DECIMAL(14,2) NOT NULL,
  `currency` VARCHAR(5) NOT NULL DEFAULT 'PKR',
  `condition` ENUM('New', 'Used', 'Refurbished') NOT NULL DEFAULT 'Used',
  `city` VARCHAR(80) NOT NULL,
  `area` VARCHAR(120) NOT NULL,
  `province` VARCHAR(80) NOT NULL,
  `latitude` DECIMAL(10,8) NULL,
  `longitude` DECIMAL(11,8) NULL,
  `status` ENUM('active', 'pending', 'rejected', 'expired') NOT NULL DEFAULT 'pending',
  `rejection_reason` VARCHAR(255) NULL,
  `is_featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_urgent` BOOLEAN NOT NULL DEFAULT FALSE,
  `featured_until` TIMESTAMP NULL,
  `views_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `favorites_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `bumped_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  INDEX `idx_listings_city_category` (`city`, `category_id`, `status`),
  INDEX `idx_listings_price` (`price`),
  INDEX `idx_listings_featured` (`is_featured`, `bumped_at`),
  FULLTEXT KEY `ft_listing_search` (`title`, `description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. LISTING IMAGES
CREATE TABLE IF NOT EXISTS `listing_images` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `listing_id` BIGINT UNSIGNED NOT NULL,
  `image_path` VARCHAR(500) NOT NULL,
  `is_primary` BOOLEAN NOT NULL DEFAULT FALSE,
  `order_index` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. DYNAMIC CATEGORY ATTRIBUTES (EAV)
CREATE TABLE IF NOT EXISTS `listing_attributes` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `listing_id` BIGINT UNSIGNED NOT NULL,
  `attribute_key` VARCHAR(50) NOT NULL,
  `attribute_value` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  INDEX `idx_attr_key_val` (`attribute_key`, `attribute_value`(50))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. BUYER-SELLER CONVERSATIONS
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `listing_id` BIGINT UNSIGNED NOT NULL,
  `buyer_id` BIGINT UNSIGNED NOT NULL,
  `seller_id` BIGINT UNSIGNED NOT NULL,
  `last_message_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uniq_buyer_seller_listing` (`listing_id`, `buyer_id`, `seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ENCRYPTED CHAT MESSAGES & REAL-TIME OFFERS
CREATE TABLE IF NOT EXISTS `messages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `conversation_id` BIGINT UNSIGNED NOT NULL,
  `sender_id` BIGINT UNSIGNED NOT NULL,
  `encrypted_payload` TEXT NOT NULL,
  `is_offer` BOOLEAN NOT NULL DEFAULT FALSE,
  `offer_amount` DECIMAL(14,2) NULL,
  `offer_status` ENUM('pending', 'accepted', 'rejected') NULL,
  `read_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. PAYMENT TRANSACTIONS (JazzCash, Easypaisa, Raast)
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_ref` VARCHAR(100) NOT NULL UNIQUE,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `listing_id` BIGINT UNSIGNED NULL,
  `package_type` ENUM('featured_7d', 'featured_30d', 'bump_up') NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(5) NOT NULL DEFAULT 'PKR',
  `gateway` ENUM('jazzcash', 'easypaisa', 'raast', 'card') NOT NULL,
  `status` ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  `billing_email` VARCHAR(191) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE SET NULL,
  INDEX `idx_txn_ref` (`transaction_ref`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. MODERATION AUDIT LOGS
CREATE TABLE IF NOT EXISTS `moderation_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `listing_id` BIGINT UNSIGNED NOT NULL,
  `moderator_id` BIGINT UNSIGNED NOT NULL,
  `action` ENUM('approved', 'rejected', 'flagged', 'featured') NOT NULL,
  `reason` VARCHAR(255) NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`moderator_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. LARAVEL INFRASTRUCTURE TABLES (Sessions & Cache)
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` VARCHAR(255) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `payload` LONGTEXT NOT NULL,
  `last_activity` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_sessions_user_id` (`user_id`),
  INDEX `idx_sessions_last_activity` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cache` (
  `key` VARCHAR(255) NOT NULL,
  `value` MEDIUMTEXT NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` VARCHAR(255) NOT NULL,
  `owner` VARCHAR(255) NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. INITIAL SEED DATA (Categories & Demo User)
INSERT INTO `categories` (`id`, `slug`, `name_en`, `name_ur`, `parent_id`, `icon_name`, `display_order`) VALUES
(1, 'vehicles', 'Motors & Vehicles', 'گاڑیاں اور موٹرز', NULL, 'car', 1),
(2, 'property', 'Property & Real Estate', 'جائیداد اور پلاٹس', NULL, 'building', 2),
(3, 'mobiles', 'Mobile Phones & Tablets', 'موبائل فونز', NULL, 'smartphone', 3),
(4, 'electronics', 'Electronics & Home Appliances', 'الیکٹرانکس', NULL, 'tv', 4),
(5, 'bikes', 'Bikes & Motorcycles', 'موٹر سائیکل', 1, 'bike', 5),
(6, 'cars', 'Cars (Civic, Corolla, Alto)', 'کاریں', 1, 'car', 6)
ON DUPLICATE KEY UPDATE `name_en` = VALUES(`name_en`);

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `phone`, `password`, `role`, `is_verified`) VALUES
(1, 'd3b07384-d113-4a11-85b4-d55be5b45281', 'OzTech Admin', 'admin@andaza.com.pk', '+923001234567', '$2y$12$7kP.WnO8kQd5x90Q5u7zZeWvS5B2b9t2o3h5p7t2g9k2', 'admin', 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `listings` (`id`, `uuid`, `user_id`, `category_id`, `title`, `slug`, `description`, `price`, `condition`, `city`, `area`, `province`, `status`, `is_featured`) VALUES
(1, 'a1a2a3a4-b1b2-c1c2-d1d2-e1e2e3e4e5e6', 1, 6, 'Honda Civic RS 1.5 VTEC Turbo 2023 - Bumper to Bumper Genuine', 'honda-civic-rs-2023-lahore-1', 'Immaculate condition Honda Civic RS Turbo. Single owner, Islamabad registered, driven only on Hi-Octane. Total genuine paint.', 8950000.00, 'Used', 'Lahore', 'DHA Phase 6', 'Punjab', 'active', 1),
(2, 'b1b2b3b4-c1c2-d1d2-e1e2-f1f2f3f4f5f6', 1, 3, 'iPhone 15 Pro Max 256GB Natural Titanium (PTA Approved)', 'iphone-15-pro-max-256gb-karachi-2', 'Official PTA approved with box and original cable. Battery health 98%. Scratchless condition.', 465000.00, 'Used', 'Karachi', 'Clifton Block 4', 'Sindh', 'active', 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

INSERT INTO `listing_images` (`id`, `listing_id`, `image_path`, `is_primary`, `order_index`) VALUES
(1, 1, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80', 1, 0),
(2, 2, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80', 1, 0)
ON DUPLICATE KEY UPDATE `image_path` = VALUES(`image_path`);

SET FOREIGN_KEY_CHECKS = 1;
