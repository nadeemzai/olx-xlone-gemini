import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Listing, 
  Conversation, 
  Transaction, 
  ModerationAuditLog, 
  UserAccount, 
  Language 
} from '../types';
import { 
  INITIAL_LISTINGS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_USERS 
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentUser: UserAccount;
  setCurrentUser: (user: UserAccount) => void;
  availableUsers: UserAccount[];
  activeView: 'marketplace' | 'merchant-dashboard' | 'admin-panel' | 'architecture-studio';
  setActiveView: (view: 'marketplace' | 'merchant-dashboard' | 'admin-panel' | 'architecture-studio') => void;
  
  // Listings & Filters
  listings: Listing[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  minPrice: number;
  setMinPrice: (p: number) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  conditionFilter: 'All' | 'New' | 'Used';
  setConditionFilter: (c: 'All' | 'New' | 'Used') => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (f: boolean) => void;
  sortBy: 'newest' | 'price_low' | 'price_high' | 'popular';
  setSortBy: (s: 'newest' | 'price_low' | 'price_high' | 'popular') => void;

  // Actions
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  addListing: (listing: Omit<Listing, 'id' | 'views' | 'favoritesCount' | 'createdAt' | 'status' | 'urgent' | 'boosted' | 'featured'>, promoteType?: 'none' | 'featured' | 'bump') => void;
  approveListing: (id: string) => void;
  rejectListing: (id: string, reason: string) => void;
  toggleFeatured: (id: string) => void;
  boostListing: (id: string) => void;

  // Chat
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChatWithListing: (listing: Listing) => void;
  sendMessage: (conversationId: string, text: string, isOffer?: boolean, offerAmount?: number) => void;
  respondToOffer: (conversationId: string, messageId: string, status: 'accepted' | 'rejected') => void;

  // Payments & Transactions
  transactions: Transaction[];
  initiatePayment: (listing: Listing, packageType: 'featured_7d' | 'featured_30d' | 'bump_up') => void;
  paymentModalListing: Listing | null;
  paymentModalPackage: 'featured_7d' | 'featured_30d' | 'bump_up' | null;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  completePayment: (method: 'easypaisa' | 'jazzcash' | 'raast' | 'card', email: string) => void;

  // Audit Logs
  auditLogs: ModerationAuditLog[];

  // Detail Modal
  selectedListingDetail: Listing | null;
  setSelectedListingDetail: (listing: Listing | null) => void;
  
  // Post Ad Modal
  isPostAdOpen: boolean;
  setIsPostAdOpen: (open: boolean) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [availableUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[0]); // Nadeem Ahmad (Merchant)
  const [activeView, setActiveView] = useState<'marketplace' | 'merchant-dashboard' | 'admin-panel' | 'architecture-studio'>('marketplace');

  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [selectedCity, setSelectedCity] = useState<string>('All Pakistan');
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000000);
  const [conditionFilter, setConditionFilter] = useState<'All' | 'New' | 'Used'>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'popular'>('newest');
  
  const [favorites, setFavorites] = useState<string[]>(['andaza-pk-101', 'andaza-pk-103']);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(INITIAL_CONVERSATIONS[0].id);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [auditLogs, setAuditLogs] = useState<ModerationAuditLog[]>(INITIAL_AUDIT_LOGS);

  const [paymentModalListing, setPaymentModalListing] = useState<Listing | null>(null);
  const [paymentModalPackage, setPaymentModalPackage] = useState<'featured_7d' | 'featured_30d' | 'bump_up' | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const [selectedListingDetail, setSelectedListingDetail] = useState<Listing | null>(null);
  const [isPostAdOpen, setIsPostAdOpen] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(language === 'ur' ? 'اشتہار پسندیدہ سے ہٹا دیا گیا' : 'Removed from favorites');
        return prev.filter(item => item !== id);
      } else {
        showToast(language === 'ur' ? 'اشتہار پسندیدہ میں شامل کر دیا گیا' : 'Saved to favorites');
        return [...prev, id];
      }
    });
  };

  const addListing = (
    newListingData: Omit<Listing, 'id' | 'views' | 'favoritesCount' | 'createdAt' | 'status' | 'urgent' | 'boosted' | 'featured'>,
    promoteType: 'none' | 'featured' | 'bump' = 'none'
  ) => {
    const newId = `andaza-pk-${Date.now().toString().slice(-5)}`;
    const isFeatured = promoteType === 'featured';
    const isBoosted = promoteType === 'bump';

    const newAd: Listing = {
      ...newListingData,
      id: newId,
      views: 1,
      favoritesCount: 0,
      createdAt: 'Just now',
      status: currentUser.role === 'admin' || currentUser.verified ? 'active' : 'pending',
      urgent: false,
      featured: isFeatured,
      boosted: isBoosted,
      promotedUntil: isFeatured ? '2026-10-30' : undefined
    };

    setListings(prev => [newAd, ...prev]);

    // Record moderation log
    const audit: ModerationAuditLog = {
      id: `audit-${Date.now()}`,
      listingId: newId,
      listingTitle: newAd.title,
      action: newAd.status === 'active' ? 'approved' : 'flagged',
      adminId: currentUser.id,
      adminName: currentUser.name,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: newAd.status === 'active' ? 'Auto-published (Verified Merchant Account)' : 'Awaiting moderation queue review'
    };
    setAuditLogs(prev => [audit, ...prev]);

    showToast(
      newAd.status === 'active'
        ? (language === 'ur' ? 'آپ کا اشتہار کامیابی سے لائیو ہو گیا ہے!' : 'Your Ad is live!')
        : (language === 'ur' ? 'اشتہار جمع ہو گیا، منظوری کے بعد شائع ہوگا' : 'Ad submitted for review')
    );
  };

  const approveListing = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'active', rejectionReason: undefined };
      }
      return item;
    }));

    const target = listings.find(l => l.id === id);
    const audit: ModerationAuditLog = {
      id: `audit-${Date.now()}`,
      listingId: id,
      listingTitle: target?.title || 'Listing',
      action: 'approved',
      adminId: currentUser.id,
      adminName: currentUser.name,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: 'Approved by moderator after safety check'
    };
    setAuditLogs(prev => [audit, ...prev]);
    showToast(`Ad #${id} approved successfully`);
  };

  const rejectListing = (id: string, reason: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'rejected', rejectionReason: reason };
      }
      return item;
    }));

    const target = listings.find(l => l.id === id);
    const audit: ModerationAuditLog = {
      id: `audit-${Date.now()}`,
      listingId: id,
      listingTitle: target?.title || 'Listing',
      action: 'rejected',
      adminId: currentUser.id,
      adminName: currentUser.name,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: `Rejected: ${reason}`
    };
    setAuditLogs(prev => [audit, ...prev]);
    showToast(`Ad #${id} rejected`);
  };

  const toggleFeatured = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, featured: !item.featured };
      }
      return item;
    }));
    showToast('Featured status updated');
  };

  const boostListing = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, boosted: true, createdAt: 'Just now' };
      }
      return item;
    }));
    showToast('Ad bumped to top of search results');
  };

  const openChatWithListing = (listing: Listing) => {
    // Check if conversation already exists
    let existingConv = conversations.find(
      c => c.listingId === listing.id && (c.buyerId === currentUser.id || c.sellerId === currentUser.id)
    );

    if (!existingConv) {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.price,
        listingImage: listing.images[0] || '/src/assets/images/product_civic_andaza_1790771658037.jpg',
        sellerId: listing.seller.id,
        sellerName: listing.seller.name,
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        lastMessage: 'Started conversation',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            conversationId: `conv-${Date.now()}`,
            senderId: 'system',
            senderName: 'Andaza Safety Bot',
            text: '🔒 End-to-End Encrypted chat session initiated. Never share OTP or send advance payments without in-person inspection.',
            timestamp: 'Just now',
            isEncrypted: true,
            read: true
          }
        ]
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    } else {
      setActiveConversationId(existingConv.id);
    }

    setIsChatOpen(true);
  };

  const sendMessage = (conversationId: string, text: string, isOffer = false, offerAmount?: number) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: isOffer ? `Negotiation Offer: Rs ${offerAmount?.toLocaleString()} PKR` : text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOffer,
      offerAmount,
      offerStatus: isOffer ? 'pending' as const : undefined,
      isEncrypted: true,
      read: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: newMessage.text,
          lastMessageTime: newMessage.timestamp,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));

    // Simulate seller automated reply if buyer is chatting
    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === conversationId && conv.buyerId === currentUser.id) {
          const replyText = isOffer
            ? `Thank you for your offer of Rs ${offerAmount?.toLocaleString()}! Can you please meet in person at our verified location for final inspection?`
            : "Walaikum Assalam! Yes, the item is in pristine condition as described. When would you like to inspect it?";
          
          const sellerReply = {
            id: `msg-${Date.now() + 1}`,
            conversationId,
            senderId: conv.sellerId,
            senderName: conv.sellerName,
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isEncrypted: true,
            read: false
          };

          return {
            ...conv,
            lastMessage: sellerReply.text,
            lastMessageTime: sellerReply.timestamp,
            messages: [...conv.messages, sellerReply]
          };
        }
        return conv;
      }));
    }, 1500);
  };

  const respondToOffer = (conversationId: string, messageId: string, status: 'accepted' | 'rejected') => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMsgs = conv.messages.map(m => {
          if (m.id === messageId) {
            return { ...m, offerStatus: status };
          }
          return m;
        });
        return {
          ...conv,
          messages: updatedMsgs,
          lastMessage: `Offer was ${status}`
        };
      }
      return conv;
    }));

    showToast(`Offer ${status} successfully`);
  };

  const initiatePayment = (listing: Listing, packageType: 'featured_7d' | 'featured_30d' | 'bump_up') => {
    setPaymentModalListing(listing);
    setPaymentModalPackage(packageType);
    setIsPaymentModalOpen(true);
  };

  const completePayment = (method: 'easypaisa' | 'jazzcash' | 'raast' | 'card', email: string) => {
    if (!paymentModalListing || !paymentModalPackage) return;

    const amountMap = {
      featured_7d: 1499,
      featured_30d: 2999,
      bump_up: 799
    };
    const nameMap = {
      featured_7d: 'Featured Ad (7 Days Highlight)',
      featured_30d: 'Featured Ad (30 Days Spotlight + Top Rank)',
      bump_up: 'Bump to Top (Instant Search Refresh)'
    };

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      listingId: paymentModalListing.id,
      listingTitle: paymentModalListing.title,
      packageType: paymentModalPackage,
      packageName: nameMap[paymentModalPackage],
      amount: amountMap[paymentModalPackage],
      paymentMethod: method,
      status: 'completed',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      invoiceNumber: `INV-${new Date().getFullYear()}-PK-${Math.floor(1000 + Math.random() * 9000)}`,
      receiptEmail: email
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Apply features to the listing
    setListings(prev => prev.map(item => {
      if (item.id === paymentModalListing.id) {
        if (paymentModalPackage === 'bump_up') {
          return { ...item, boosted: true, createdAt: 'Just now' };
        } else {
          return { ...item, featured: true, promotedUntil: '2026-10-31' };
        }
      }
      return item;
    }));

    setIsPaymentModalOpen(false);
    showToast(`Payment successful via ${method.toUpperCase()}! Receipt sent to ${email}`);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentUser,
        setCurrentUser,
        availableUsers,
        activeView,
        setActiveView,

        listings,
        selectedCity,
        setSelectedCity,
        selectedArea,
        setSelectedArea,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        conditionFilter,
        setConditionFilter,
        verifiedOnly,
        setVerifiedOnly,
        featuredOnly,
        setFeaturedOnly,
        sortBy,
        setSortBy,

        favorites,
        toggleFavorite,
        addListing,
        approveListing,
        rejectListing,
        toggleFeatured,
        boostListing,

        conversations,
        activeConversationId,
        setActiveConversationId,
        isChatOpen,
        setIsChatOpen,
        openChatWithListing,
        sendMessage,
        respondToOffer,

        transactions,
        initiatePayment,
        paymentModalListing,
        paymentModalPackage,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        completePayment,

        auditLogs,

        selectedListingDetail,
        setSelectedListingDetail,
        isPostAdOpen,
        setIsPostAdOpen,

        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
