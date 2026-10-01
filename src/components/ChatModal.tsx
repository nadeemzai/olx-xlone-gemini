import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  Lock, 
  DollarSign, 
  Check, 
  CheckCheck, 
  MessageSquare, 
  AlertCircle,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatModal: React.FC = () => {
  const { 
    language, 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    isChatOpen, 
    setIsChatOpen, 
    sendMessage, 
    respondToOffer, 
    currentUser 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [showOfferDrawer, setShowOfferDrawer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage.trim());
    setInputMessage('');
  };

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(offerAmount.replace(/,/g, ''), 10);
    if (!amount || isNaN(amount) || amount <= 0 || !activeConv) return;
    sendMessage(activeConv.id, `Offer: Rs ${amount.toLocaleString()} PKR`, true, amount);
    setOfferAmount('');
    setShowOfferDrawer(false);
  };

  const quickReplies = [
    'Assalam-o-Alaikum, is this still available?',
    'What is your final price on spot?',
    'Can I inspect the item today?',
    'Where is your exact location for meetup?'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[85vh] shadow-2xl flex overflow-hidden border border-slate-200">
        
        {/* Left Sidebar: Conversations List */}
        <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50 hidden sm:flex">
          <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#002f34]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                {language === 'ur' ? 'گفتگو' : 'Messages'}
              </h3>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
              {conversations.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full p-3 text-left flex items-start gap-3 transition-colors ${activeConversationId === conv.id ? 'bg-teal-50/70 border-l-4 border-teal-600' : 'hover:bg-slate-100'}`}
              >
                <img
                  src={conv.listingImage}
                  alt={conv.listingTitle}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.id === conv.sellerId ? conv.buyerName : conv.sellerName}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 truncate font-semibold">
                    Rs {conv.listingPrice.toLocaleString()} · {conv.listingTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Main Area: Active Chat */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Chat Header */}
          {activeConv ? (
            <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.listingImage}
                  alt={activeConv.listingTitle}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                    {activeConv.listingTitle}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-extrabold text-[#002f34] tabular-nums">
                      Rs {activeConv.listingPrice.toLocaleString()}
                    </span>
                    <span>·</span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      E2EE Secured
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowOfferDrawer(!showOfferDrawer)}
                  className="px-2.5 py-1.5 bg-[#ffce32] hover:bg-amber-400 text-[#002f34] text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'آفر بھیجیں' : 'Make Offer'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500">Select a conversation</span>
              <button onClick={() => setIsChatOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          )}

          {/* Offer Drawer Banner */}
          {showOfferDrawer && activeConv && (
            <div className="bg-amber-50 p-3 border-b border-amber-200">
              <form onSubmit={handleMakeOffer} className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900 shrink-0">
                  {language === 'ur' ? 'آفر کی رقم (روپے):' : 'Offer Price (PKR):'}
                </span>
                <input
                  type="number"
                  placeholder="e.g. 8800000"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-amber-300 rounded bg-white focus:outline-none focus:border-[#002f34]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#002f34] text-white text-xs font-bold rounded hover:bg-[#002226]"
                >
                  Submit Offer
                </button>
                <button
                  type="button"
                  onClick={() => setShowOfferDrawer(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs px-1"
                >
                  ✕
                </button>
              </form>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f7f8f9]">
            {activeConv?.messages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              const isSystem = msg.senderId === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div className="bg-slate-200 text-slate-700 text-[11px] px-3 py-1.5 rounded-lg max-w-md text-center">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-400 mb-0.5 px-1">{msg.senderName}</span>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs shadow-2xs ${isMe ? 'bg-[#002f34] text-white rounded-br-xs' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'}`}>
                    {msg.isOffer ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Tag className="w-3.5 h-3.5 text-[#ffce32]" />
                          <span>Official Negotiation Offer</span>
                        </div>
                        <p className="text-sm font-extrabold tabular-nums">
                          Rs {msg.offerAmount?.toLocaleString()} PKR
                        </p>
                        {/* Offer Status Actions */}
                        {msg.offerStatus === 'pending' && !isMe ? (
                          <div className="flex gap-1.5 pt-1">
                            <button
                              onClick={() => respondToOffer(activeConv.id, msg.id, 'accepted')}
                              className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700"
                            >
                              Accept Offer
                            </button>
                            <button
                              onClick={() => respondToOffer(activeConv.id, msg.id, 'rejected')}
                              className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-bold hover:bg-rose-700"
                            >
                              Decline
                            </button>
                          </div>
                        ) : msg.offerStatus ? (
                          <span className={`text-[10px] font-bold uppercase tracking-wider block ${msg.offerStatus === 'accepted' ? 'text-emerald-300' : 'text-rose-300'}`}>
                            Status: {msg.offerStatus}
                          </span>
                        ) : null}
                      </div>
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}

                    <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${isMe ? 'text-slate-300' : 'text-slate-400'}`}>
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-[#23e5db]" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Preset Chips */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-semibold text-slate-400 shrink-0">Quick:</span>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (activeConv) sendMessage(activeConv.id, reply);
                }}
                className="text-[11px] bg-white border border-slate-200 hover:border-slate-400 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={language === 'ur' ? 'پیغام لکھیں...' : 'Type a message...'}
              className="flex-1 px-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#002f34]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-[#002f34] disabled:opacity-50 text-white p-2 rounded-lg hover:bg-[#002226] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
