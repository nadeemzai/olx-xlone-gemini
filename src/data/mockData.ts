import { Listing, UserAccount, Conversation, Transaction, ModerationAuditLog } from '../types';

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user-nadeem',
    name: 'Nadeem Ahmad',
    email: 'nadeem.ahmad@oztechwork.com',
    phone: '+92 300 8472910',
    role: 'merchant',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    memberSince: 'March 2021',
    merchantProfile: {
      companyName: 'OZ Tech Automotive & Estates',
      ntnNumber: '7492019-3',
      cnicNumber: '35201-8392019-1',
      status: 'approved',
      documentsSubmitted: true,
      verificationDate: '2024-01-15'
    }
  },
  {
    id: 'user-admin',
    name: 'Andaza Trust & Safety Team',
    email: 'moderator@andaza.com.pk',
    phone: '+92 42 111 659 659',
    role: 'admin',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    memberSince: 'January 2018'
  },
  {
    id: 'user-hamza',
    name: 'Hamza Khan',
    email: 'hamza.k@gmail.com',
    phone: '+92 321 4455667',
    role: 'user',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    memberSince: 'August 2023'
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'andaza-pk-101',
    title: 'Honda Civic RS 1.5 VTEC Turbo 2023 - Bumper to Bumper Genuine',
    titleUrdu: 'ہونڈا سیوک آر ایس 1.5 ٹربو 2023 - بمپر ٹو بمپر اصل حالت',
    description: 'Honda Civic RS 1.5 Turbo model 2023. Pearl White color, 1st owner, Islamabad registered. Total original paint, verified maintenance history from Honda dealership. Sunroof, leather electric seats, lane watch camera, ceramic coated. Price is slightly negotiable on spot.',
    descriptionUrdu: 'ہونڈا سیوک آر ایس 1.5 ٹربو ماڈل 2023۔ پرل وائٹ کلر، پہلا مالک، اسلام آباد رجسٹرڈ۔ مکمل اصل پینٹ، ہونڈا ڈیلرشپ سے تصدیق شدہ دیکھ بھال کی ہسٹری۔ موقع پر قیمت میں معمولی رعایت ممکن ہے۔',
    price: 9250000,
    originalPrice: 9500000,
    currency: 'PKR',
    categoryId: 'vehicles',
    subcategoryId: 'cars',
    location: {
      city: 'Islamabad',
      cityUrdu: 'اسلام آباد',
      province: 'Federal Capital',
      area: 'Sector F-7',
      areaUrdu: 'سیکٹر ایف-7'
    },
    images: [
      '/src/assets/images/product_civic_andaza_1790771658037.jpg'
    ],
    seller: {
      id: 'user-nadeem',
      name: 'OZ Tech Automotive',
      nameUrdu: 'اوز ٹیک آٹوموٹو',
      phone: '+92 300 8472910',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      memberSince: 'March 2021',
      responseRate: '98%',
      verified: true,
      isMerchant: true,
      businessName: 'OZ Tech Automotive & Estates',
      businessAddress: 'Plot 41-B, Blue Area, Islamabad',
      rating: 4.9,
      reviewCount: 42
    },
    condition: 'Used',
    attributes: {
      make: 'Honda',
      modelYear: '2023',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '14,200',
      registeredIn: 'Islamabad'
    },
    featured: true,
    urgent: false,
    boosted: true,
    status: 'active',
    views: 1420,
    favoritesCount: 89,
    createdAt: '2 hours ago',
    promotedUntil: '2026-10-15'
  },
  {
    id: 'andaza-pk-102',
    title: 'Apple iPhone 15 Pro Max - 256GB Natural Titanium (Physical Dual PTA Approved)',
    titleUrdu: 'ایپل آئی فون 15 پرو میکس - 256 جی بی نیچرل ٹائٹینیم پی ٹی اے اپرووڈ',
    description: 'Official PTA Approved iPhone 15 Pro Max, 256GB storage, Natural Titanium color. 100% battery health, completely scratchless with tempered glass and Spigen case from day one. Includes box and original braided cable. 7 months Apple International Warranty remaining.',
    descriptionUrdu: 'آفیشل پی ٹی اے سے منظور شدہ آئی فون 15 پرو میکس، 256 جی بی اسٹوریج، نیچرل ٹائٹینیم کلر۔ 100 فیصد بیٹری لائف، باکس اور کیبل کے ساتھ۔ 7 ماہ انٹرنیشنل ایپل وارنٹی باقی ہے۔',
    price: 435000,
    originalPrice: 450000,
    currency: 'PKR',
    categoryId: 'mobiles',
    subcategoryId: 'mobile-phones',
    location: {
      city: 'Lahore',
      cityUrdu: 'لاہور',
      province: 'Punjab',
      area: 'DHA Phase 5',
      areaUrdu: 'ڈی ایچ اے فیز 5'
    },
    images: [
      '/src/assets/images/product_iphone15_andaza_1790771642176.jpg'
    ],
    seller: {
      id: 'seller-techzone',
      name: 'TechZone Lahore',
      phone: '+92 321 8901234',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      memberSince: 'June 2022',
      responseRate: '100%',
      verified: true,
      isMerchant: true,
      businessName: 'TechZone Mobile Plaza',
      rating: 4.8,
      reviewCount: 31
    },
    condition: 'Used',
    attributes: {
      brand: 'Apple',
      ptaStatus: 'PTA Approved',
      storage: '256 GB',
      batteryHealth: '100'
    },
    featured: true,
    urgent: true,
    boosted: true,
    status: 'active',
    views: 2890,
    favoritesCount: 154,
    createdAt: '35 minutes ago',
    promotedUntil: '2026-10-20'
  },
  {
    id: 'andaza-pk-103',
    title: 'Brand New 1 Kanal Designer Modern House for Sale in DHA Phase 6 Lahore',
    titleUrdu: 'نیا 1 کنال ماڈرن ڈیزائنر گھر برائے فروخت ڈی ایچ اے فیز 6 لاہور',
    description: 'Direct owner listing! Luxurious 1 Kanal architect-designed bungalow in prime sector of DHA Phase 6. Features 5 master bedrooms with Italian fitted bathrooms, 2 designer kitchens with Spanish appliances, basement media lounge, swimming pool, servant quarters, and imported wooden flooring. Approved by DHA.',
    descriptionUrdu: 'براہ راست مالک کی پیشکش! ڈی ایچ اے فیز 6 میں 1 کنال شاندار ڈیزائنر بنگلہ۔ 5 ماسٹر بیڈ رومز مع اٹیچڈ باتھ، 2 کچن، بیسمنٹ سنیما ہال، سوئمنگ پول۔ مکمل منظور شدہ نقشہ۔',
    price: 88500000,
    originalPrice: 92000000,
    currency: 'PKR',
    categoryId: 'property-sale',
    subcategoryId: 'houses',
    location: {
      city: 'Lahore',
      cityUrdu: 'لاہور',
      province: 'Punjab',
      area: 'DHA Phase 6',
      areaUrdu: 'ڈی ایچ اے فیز 6'
    },
    images: [
      '/src/assets/images/product_house_dha_andaza_1790771670366.jpg'
    ],
    seller: {
      id: 'seller-alharam',
      name: 'Al-Haram Real Estate & Builders',
      nameUrdu: 'الحرم ریئل اسٹیٹ اینڈ بلڈرز',
      phone: '+92 302 7778899',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      memberSince: 'January 2019',
      responseRate: '95%',
      verified: true,
      isMerchant: true,
      businessName: 'Al-Haram Real Estate Group',
      businessAddress: 'Commercial Broadway, DHA Phase 6, Lahore',
      rating: 5.0,
      reviewCount: 68
    },
    condition: 'New',
    attributes: {
      areaUnit: '1 Kanal',
      bedrooms: '5',
      bathrooms: '6+',
      furnished: 'Semi-Furnished'
    },
    featured: true,
    urgent: false,
    boosted: true,
    status: 'active',
    views: 4520,
    favoritesCount: 220,
    createdAt: '1 day ago',
    promotedUntil: '2026-11-01'
  },
  {
    id: 'andaza-pk-104',
    title: 'Yamaha YBR 125G (2024 Special Edition Metallic Black) - Low Mileage',
    titleUrdu: 'یاماہا وائی بی آر 125 جی (2024 اسپیشل ایڈیشن سیاہ رنگ) کم استعمال شدہ',
    description: 'Yamaha YBR 125G Metallic Black 2024 model. Only 3,400 KM driven with extreme care. Untouched engine, high performance dual disc brakes, auxiliary LED touring lights installed, scratch-free body with PPF protection. Complete smart card and return file available.',
    descriptionUrdu: 'یاماہا وائی بی آر 125 جی میٹالک بلیک 2024 ماڈل۔ صرف 3,400 کلومیٹر چلا ہوا۔ انجن بالکل نیا، اسمارٹ کارڈ اور فائل مکمل دستیاب۔ موقع پر فائنل بات۔',
    price: 435000,
    originalPrice: 460000,
    currency: 'PKR',
    categoryId: 'bikes',
    subcategoryId: 'motorcycles',
    location: {
      city: 'Karachi',
      cityUrdu: 'کراچی',
      province: 'Sindh',
      area: 'Clifton',
      areaUrdu: 'کلفٹن'
    },
    images: [
      '/src/assets/images/product_yamaha_andaza_1790771682075.jpg'
    ],
    seller: {
      id: 'seller-usman',
      name: 'Usman Tariq',
      phone: '+92 333 5511223',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      memberSince: 'October 2023',
      responseRate: '92%',
      verified: true,
      isMerchant: false,
      rating: 4.7,
      reviewCount: 9
    },
    condition: 'Used',
    attributes: {
      make: 'Yamaha',
      modelYear: '2024',
      engine: '125cc'
    },
    featured: false,
    urgent: true,
    boosted: false,
    status: 'active',
    views: 940,
    favoritesCount: 47,
    createdAt: '4 hours ago'
  },
  {
    id: 'andaza-pk-105',
    title: 'Toyota Fortuner Legender 2.8 4x4 Sigma 2024 - Zero Meter Delivery',
    titleUrdu: 'ٹویوٹا فارچونر لیجنڈر 2.8 4x4 سگما 2024 - زیرو میٹر',
    description: 'Brand new Toyota Fortuner Legender Sigma 4x4 Diesel. 2024 manufactured. Pearl White dual tone with maroon & black interior. Unregistered, ready delivery invoice from authorized dealership in Karachi.',
    descriptionUrdu: 'برانڈ نیو ٹویوٹا فارچونر لیجنڈر 2024۔ زیرو میٹر، آفیشل وارنٹی بک اور دستاویزات کے ساتھ فوری ڈیلیوری۔',
    price: 19800000,
    currency: 'PKR',
    categoryId: 'vehicles',
    subcategoryId: 'cars',
    location: {
      city: 'Karachi',
      cityUrdu: 'کراچی',
      province: 'Sindh',
      area: 'DHA Phase 5',
      areaUrdu: 'ڈی ایچ اے فیز 5'
    },
    images: [
      '/src/assets/images/product_civic_andaza_1790771658037.jpg'
    ],
    seller: {
      id: 'user-nadeem',
      name: 'OZ Tech Automotive',
      nameUrdu: 'اوز ٹیک آٹوموٹو',
      phone: '+92 300 8472910',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      memberSince: 'March 2021',
      responseRate: '98%',
      verified: true,
      isMerchant: true,
      businessName: 'OZ Tech Automotive & Estates',
      rating: 4.9,
      reviewCount: 42
    },
    condition: 'New',
    attributes: {
      make: 'Toyota',
      modelYear: '2024',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      mileage: '45',
      registeredIn: 'Un-Registered'
    },
    featured: true,
    urgent: false,
    boosted: true,
    status: 'active',
    views: 3100,
    favoritesCount: 180,
    createdAt: '6 hours ago'
  },
  {
    id: 'andaza-pk-106',
    title: 'Samsung Galaxy S24 Ultra - 512GB Titanium Gray (Official PTA)',
    titleUrdu: 'سام سنگ گلیکسی ایس 24 الٹرا - 512 جی بی ٹائٹینیم گرے',
    description: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray. 100% genuine Samsung Pakistan warranty device. Box pack condition with all accessories and bill. AI features working flawlessly.',
    descriptionUrdu: 'سام سنگ گلیکسی ایس 24 الٹرا 512 جی بی، آفیشل پی ٹی اے منظور شدہ مع وارنٹی کارڈ۔ مکمل لوازمات دستیاب۔',
    price: 365000,
    currency: 'PKR',
    categoryId: 'mobiles',
    subcategoryId: 'mobile-phones',
    location: {
      city: 'Rawalpindi',
      cityUrdu: 'راولپنڈی',
      province: 'Punjab',
      area: 'Saddar',
      areaUrdu: 'صدر'
    },
    images: [
      '/src/assets/images/product_iphone15_andaza_1790771642176.jpg'
    ],
    seller: {
      id: 'seller-hamza',
      name: 'Hamza Khan',
      phone: '+92 321 4455667',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      memberSince: 'August 2023',
      responseRate: '94%',
      verified: true,
      isMerchant: false,
      rating: 4.6,
      reviewCount: 14
    },
    condition: 'Used',
    attributes: {
      brand: 'Samsung',
      ptaStatus: 'PTA Approved',
      storage: '512 GB'
    },
    featured: false,
    urgent: false,
    boosted: false,
    status: 'active',
    views: 820,
    favoritesCount: 38,
    createdAt: '1 day ago'
  },
  {
    id: 'andaza-pk-107',
    title: 'Apple MacBook Pro M3 Max 16-inch 36GB Unified Memory / 1TB SSD Space Black',
    titleUrdu: 'ایپل میک بک پرو ایم 3 میکس 16 انچ 36 جی بی ریم 1 ٹی بی',
    description: 'Apple MacBook Pro 16" with M3 Max chip (14-core CPU, 30-core GPU). 36GB unified RAM, 1TB high-speed SSD. Space Black finish, only 18 battery cycles. Used solely for high-end graphic design in smoke-free studio.',
    descriptionUrdu: 'ایپل میک بک پرو 16 انچ ایم 3 میکس چپ، 36 جی بی ریم، 1 ٹی بی ایس ایس ڈی۔ اسپیس بلیک کلر، بہترین کنڈیشن۔',
    price: 760000,
    currency: 'PKR',
    categoryId: 'electronics',
    subcategoryId: 'computers-laptops',
    location: {
      city: 'Islamabad',
      cityUrdu: 'اسلام آباد',
      province: 'Federal Capital',
      area: 'Blue Area',
      areaUrdu: 'بلیو ایریا'
    },
    images: [
      '/src/assets/images/product_iphone15_andaza_1790771642176.jpg'
    ],
    seller: {
      id: 'user-nadeem',
      name: 'OZ Tech Solutions',
      phone: '+92 300 8472910',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      memberSince: 'March 2021',
      responseRate: '98%',
      verified: true,
      isMerchant: true,
      rating: 4.9,
      reviewCount: 42
    },
    condition: 'Used',
    attributes: {
      brand: 'Apple MacBook',
      processor: 'Apple M1/M2/M3',
      ram: '32 GB'
    },
    featured: true,
    urgent: false,
    boosted: false,
    status: 'active',
    views: 1250,
    favoritesCount: 65,
    createdAt: '1 day ago'
  },
  {
    id: 'andaza-pk-108',
    title: 'Pending Moderation Sample: Rolex Submariner Date Watch (Replica / First Copy)',
    titleUrdu: 'زیر جائزہ اشتہار: رولیکس واچ فرسٹ کاپی',
    description: 'First copy Rolex Submariner automatic watch with sapphire glass. Needs review under counterfeit trademark policy.',
    descriptionUrdu: 'رولیکس فرسٹ کاپی گھڑی، پالیسی کے تحت جائزہ درکار ہے۔',
    price: 35000,
    currency: 'PKR',
    categoryId: 'fashion',
    subcategoryId: 'watches-jewellery',
    location: {
      city: 'Karachi',
      cityUrdu: 'کراچی',
      province: 'Sindh',
      area: 'Tariq Road'
    },
    images: [
      '/src/assets/images/product_yamaha_andaza_1790771682075.jpg'
    ],
    seller: {
      id: 'seller-unverified',
      name: 'Tariq Road Imports',
      phone: '+92 312 9988776',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
      memberSince: 'September 2026',
      responseRate: '60%',
      verified: false,
      isMerchant: false,
      rating: 3.5,
      reviewCount: 2
    },
    condition: 'New',
    attributes: {},
    featured: false,
    urgent: false,
    boosted: false,
    status: 'pending',
    views: 4,
    favoritesCount: 0,
    createdAt: 'Just now'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-101',
    listingId: 'andaza-pk-101',
    listingTitle: 'Honda Civic RS 1.5 VTEC Turbo 2023',
    listingPrice: 9250000,
    listingImage: '/src/assets/images/product_civic_andaza_1790771658037.jpg',
    sellerId: 'user-nadeem',
    sellerName: 'OZ Tech Automotive',
    buyerId: 'user-hamza',
    buyerName: 'Hamza Khan',
    lastMessage: 'AoA brother, is 9.0 million possible for quick deal?',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        conversationId: 'conv-101',
        senderId: 'user-hamza',
        senderName: 'Hamza Khan',
        text: 'Assalam-o-Alaikum! Is this Civic RS still available?',
        timestamp: '10:30 AM',
        isEncrypted: true,
        read: true
      },
      {
        id: 'msg-2',
        conversationId: 'conv-101',
        senderId: 'user-nadeem',
        senderName: 'OZ Tech Automotive',
        text: 'Walaikum Assalam, yes it is available. Total genuine condition in Blue Area Islamabad.',
        timestamp: '10:38 AM',
        isEncrypted: true,
        read: true
      },
      {
        id: 'msg-3',
        conversationId: 'conv-101',
        senderId: 'user-hamza',
        senderName: 'Hamza Khan',
        text: 'Offer: Rs 9,000,000 PKR',
        timestamp: '10:45 AM',
        isOffer: true,
        offerAmount: 9000000,
        offerStatus: 'pending',
        isEncrypted: true,
        read: false
      }
    ]
  },
  {
    id: 'conv-102',
    listingId: 'andaza-pk-102',
    listingTitle: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    listingPrice: 435000,
    listingImage: '/src/assets/images/product_iphone15_andaza_1790771642176.jpg',
    sellerId: 'seller-techzone',
    sellerName: 'TechZone Lahore',
    buyerId: 'user-nadeem',
    buyerName: 'Nadeem Ahmad',
    lastMessage: 'Yes sir, come to our shop in DHA Phase 5 for physical inspection.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-11',
        conversationId: 'conv-102',
        senderId: 'user-nadeem',
        senderName: 'Nadeem Ahmad',
        text: 'Is this official PTA approved on both SIMs?',
        timestamp: 'Yesterday 4:15 PM',
        isEncrypted: true,
        read: true
      },
      {
        id: 'msg-12',
        conversationId: 'conv-102',
        senderId: 'seller-techzone',
        senderName: 'TechZone Lahore',
        text: 'Yes sir, 100% official PTA approved on both physical and eSIM. Come to our shop in DHA Phase 5 for physical inspection.',
        timestamp: 'Yesterday 4:22 PM',
        isEncrypted: true,
        read: true
      }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-98421',
    userId: 'user-nadeem',
    userName: 'Nadeem Ahmad (OZ Tech)',
    listingId: 'andaza-pk-101',
    listingTitle: 'Honda Civic RS 1.5 VTEC Turbo 2023',
    packageType: 'featured_30d',
    packageName: 'Featured Ad (30 Days Spotlight + Top Placement)',
    amount: 2999,
    paymentMethod: 'jazzcash',
    status: 'completed',
    date: '2026-09-28 14:32',
    invoiceNumber: 'INV-2026-PK-0881',
    receiptEmail: 'nadeem.ahmad@oztechwork.com'
  },
  {
    id: 'TXN-98420',
    userId: 'seller-alharam',
    userName: 'Al-Haram Real Estate',
    listingId: 'andaza-pk-103',
    listingTitle: '1 Kanal Designer House DHA 6 Lahore',
    packageType: 'featured_30d',
    packageName: 'Featured Ad (30 Days Spotlight)',
    amount: 2999,
    paymentMethod: 'easypaisa',
    status: 'completed',
    date: '2026-09-25 09:12',
    invoiceNumber: 'INV-2026-PK-0744',
    receiptEmail: 'accounts@alharamestates.pk'
  },
  {
    id: 'TXN-98419',
    userId: 'user-nadeem',
    userName: 'Nadeem Ahmad',
    listingId: 'andaza-pk-105',
    listingTitle: 'Toyota Fortuner Legender 2024',
    packageType: 'bump_up',
    packageName: 'Bump to Top (Instant Refresh)',
    amount: 799,
    paymentMethod: 'raast',
    status: 'completed',
    date: '2026-09-24 16:50',
    invoiceNumber: 'INV-2026-PK-0692',
    receiptEmail: 'nadeem.ahmad@oztechwork.com'
  }
];

export const INITIAL_AUDIT_LOGS: ModerationAuditLog[] = [
  {
    id: 'audit-1',
    listingId: 'andaza-pk-101',
    listingTitle: 'Honda Civic RS 1.5 VTEC Turbo 2023',
    action: 'approved',
    adminId: 'user-admin',
    adminName: 'Andaza Safety Bot & Moderator',
    timestamp: '2026-09-30 08:30',
    notes: 'Automated AI VIN check passed. Verified seller credentials confirmed.'
  },
  {
    id: 'audit-2',
    listingId: 'andaza-pk-102',
    listingTitle: 'Apple iPhone 15 Pro Max 256GB',
    action: 'featured',
    adminId: 'user-admin',
    adminName: 'Andaza Billing System',
    timestamp: '2026-09-30 09:15',
    notes: 'JazzCash transaction TXN-98421 confirmed. Featured badge applied.'
  },
  {
    id: 'audit-3',
    listingId: 'andaza-pk-108',
    listingTitle: 'Rolex Submariner Date Watch',
    action: 'flagged',
    adminId: 'user-admin',
    adminName: 'Safety Filter #4',
    timestamp: '2026-09-30 11:02',
    notes: 'Keyword match: "First Copy/Replica" flagged for manual trademark check.'
  }
];
