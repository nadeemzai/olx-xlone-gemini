export type Language = 'en' | 'ur';

export interface LocationInfo {
  city: string;
  cityUrdu: string;
  province: string;
  area: string;
  areaUrdu?: string;
  lat?: number;
  lng?: number;
}

export interface Seller {
  id: string;
  name: string;
  nameUrdu?: string;
  phone: string;
  avatar: string;
  memberSince: string;
  responseRate: string;
  verified: boolean;
  isMerchant: boolean;
  businessName?: string;
  businessAddress?: string;
  rating: number;
  reviewCount: number;
}

export interface Listing {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  categoryId: string;
  subcategoryId: string;
  location: LocationInfo;
  images: string[];
  seller: Seller;
  condition: 'New' | 'Used' | 'Refurbished';
  attributes: Record<string, string>;
  featured: boolean;
  urgent: boolean;
  boosted: boolean;
  status: 'active' | 'pending' | 'rejected' | 'expired';
  views: number;
  favoritesCount: number;
  createdAt: string;
  rejectionReason?: string;
  promotedUntil?: string;
}

export interface Category {
  id: string;
  name: string;
  nameUrdu: string;
  iconName: string;
  slug: string;
  subcategories: {
    id: string;
    name: string;
    nameUrdu: string;
    attributes: {
      name: string;
      label: string;
      labelUrdu: string;
      type: 'select' | 'text' | 'number';
      options?: string[];
    }[];
  }[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerStatus?: 'pending' | 'accepted' | 'rejected';
  isEncrypted: boolean;
  read: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingImage: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  listingId: string;
  listingTitle: string;
  packageType: 'featured_7d' | 'featured_30d' | 'bump_up' | 'merchant_verified';
  packageName: string;
  amount: number;
  paymentMethod: 'easypaisa' | 'jazzcash' | 'raast' | 'card';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  invoiceNumber: string;
  receiptEmail: string;
}

export interface ModerationAuditLog {
  id: string;
  listingId: string;
  listingTitle: string;
  action: 'approved' | 'rejected' | 'featured' | 'flagged';
  adminId: string;
  adminName: string;
  timestamp: string;
  notes?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'merchant' | 'admin';
  verified: boolean;
  avatar: string;
  memberSince: string;
  merchantProfile?: {
    companyName: string;
    ntnNumber: string;
    cnicNumber: string;
    status: 'approved' | 'pending' | 'rejected';
    documentsSubmitted: boolean;
    verificationDate?: string;
  };
}
