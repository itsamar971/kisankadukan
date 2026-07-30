import { useState, useRef, Fragment, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Leaf, Package, ShoppingCart, TrendingUp,
  Users, Bell, Settings, LogOut, ChevronRight, Plus,
  MapPin, Phone, Mail, Star, ArrowUpRight, ArrowDownRight,
  Wheat, Truck, CheckCircle2, Clock, Sprout,
  IndianRupee, Search, Download, 
  User, AlertCircle, FileText, Package2,
  MessageSquare, Sparkles, ArrowRight, Apple, Zap, Shield, Home, Upload, Megaphone, Trash2, X
} from 'lucide-react';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LumaSpin } from '../components/ui/LumaSpin';

/* ═══════════════════════════ API DATA TYPES ═══════════════════════════ */
import { api } from '../lib/api';

type OrderStatus = 'processing' | 'dispatched' | 'delivered' | 'cancelled';
type ListingStatus = 'active' | 'sold' | 'pending';

interface FarmerListing {
  id: string; name: string; stockQuantityKg: number; pricePerKg: number;
  status: ListingStatus; description: string; category: string; createdAt: string; farmerId: string;
}
interface Order {
  id: string; buyerId?: string; farmerId?: string; productId: string; totalAmount: number;
  status: OrderStatus; createdAt: string; deliveryAddress?: string; quantityKg: number;
  // added fields for UI
  item?: string; buyer?: string; farmer?: string; amount?: string; time?: string; qty?: string; unitPrice?: string;
  loc?: string; eta?: string; date?: string;
}
interface BrowseProduce {
  id: string; name: string; farmer: string; loc: string; price: string;
  rating: number; qty: string; img: string; badge: string; category: string; phone: string;
  isVerified?: boolean;
}

function FarmerVerifiedCapsule({ farmerName, isVerified = true, size = 'sm' }: { farmerName?: string; isVerified?: boolean; size?: 'sm' | 'md' }) {
  const isSm = size === 'sm';
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: isSm ? '4px 10px' : '6px 14px',
      borderRadius: 9999,
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      marginTop: isSm ? 6 : 10,
      width: 'fit-content',
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
    }}>
      <span style={{ fontSize: isSm ? 12 : 13, fontWeight: 600, color: '#0f172a' }}>
        {farmerName || 'Farmer'}
      </span>
      {isVerified !== false && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <CheckCircle2 size={isSm ? 13 : 15} style={{ color: '#ffffff', fill: '#16a34a' }} />
          <span style={{ fontSize: isSm ? 11 : 12, fontWeight: 700, color: '#166534' }}>(Verified)</span>
        </div>
      )}
    </div>
  );
}

function MessagesView() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await api.get('/users/messages');
      const backendMsgs = (res.data?.messages || []).map((m: any) => ({
        id: m.id,
        text: m.text,
        time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        sender: m.isAdmin ? 'admin' : 'user'
      }));

      if (backendMsgs.length === 0) {
        setMessages([
          { id: 'welcome', text: 'Hello! How can we help you today?', time: '10:00 AM', sender: 'admin' }
        ]);
      } else {
        setMessages(backendMsgs);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const textToSend = input.trim();
    setInput('');
    setSending(true);

    try {
      await api.post('/users/messages', { text: textToSend });
      await fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">Messages</h1>
          <p className="dsh-page-sub">Contact Admin for support or queries.</p>
        </div>
      </div>
      <div className="dsh-card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #ece9e3' }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>Admin Support</h3>
          <p style={{ margin: 0, fontSize: 12, color: '#8a9a84' }}>Typically replies in 2-3 hours</p>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map(m => (
            <div key={m.id} style={{ 
              alignSelf: m.sender === 'admin' ? 'flex-start' : 'flex-end', 
              background: m.sender === 'admin' ? '#f5f2ee' : '#16a34a', 
              color: m.sender === 'admin' ? '#2a3a26' : '#fff',
              padding: '12px 16px', 
              borderRadius: m.sender === 'admin' ? '12px 12px 12px 0' : '12px 12px 0 12px', 
              maxWidth: '80%' 
            }}>
              <p style={{ margin: 0, fontSize: 13 }}>{m.text}</p>
              <span style={{ fontSize: 10, color: m.sender === 'admin' ? '#a0988f' : '#bbf7d0', marginTop: 4, display: 'block' }}>{m.time}</span>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div style={{ padding: '16px', borderTop: '1px solid #ece9e3', display: 'flex', gap: '12px', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
          <input 
            className="dsh-form-input dsh-inline-input" 
            placeholder="Type your message..." 
            style={{ flex: 1, minWidth: 0, width: '100%' }} 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            className="dsh-cta-btn dsh-input-btn" 
            style={{ width: '48px', height: '42px', minWidth: '48px', flexShrink: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            onClick={handleSend}
          >
            <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = useCallback(async () => {
    try {
      const readSet = new Set(JSON.parse(localStorage.getItem('kkd_read_notif_ids') || '[]'));
      const deletedSet = new Set(JSON.parse(localStorage.getItem('kkd_deleted_notif_ids') || '[]'));

      const res = await api.get('/users/announcements');
      const announcements = res.data || [];

      const list = announcements
        .filter((a: any) => !deletedSet.has(a.id))
        .map((a: any) => ({
          id: a.id,
          title: a.title,
          body: a.message,
          time: a.createdAt ? new Date(a.createdAt).toLocaleString() : 'Just now',
          type: 'info',
          icon: <Megaphone size={16}/>,
          read: readSet.has(a.id)
        }));

      setNotifs(list);
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifs();
  }, [fetchNotifs]);

  const handleMarkAllRead = () => {
    const readSet = new Set(JSON.parse(localStorage.getItem('kkd_read_notif_ids') || '[]'));
    notifs.forEach(n => readSet.add(n.id));
    localStorage.setItem('kkd_read_notif_ids', JSON.stringify(Array.from(readSet)));
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotif = (id: string | number) => {
    const deletedSet = new Set(JSON.parse(localStorage.getItem('kkd_deleted_notif_ids') || '[]'));
    deletedSet.add(id);
    localStorage.setItem('kkd_deleted_notif_ids', JSON.stringify(Array.from(deletedSet)));
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">
            Notifications 
            {unreadCount > 0 && <span style={{fontSize:12,background:'#ef4444',color:'#fff',padding:'2px 8px',borderRadius:20,marginLeft:8,verticalAlign:'middle'}}>{unreadCount} New</span>}
          </h1>
          <p className="dsh-page-sub">Stay updated with your account activity and admin announcements.</p>
        </div>
        {unreadCount > 0 && (
          <button className="dsh-ghost-btn dsh-ghost-btn--border" onClick={handleMarkAllRead}>
            Mark all as read
          </button>
        )}
      </div>
      <div className="dsh-card">
        {loading ? (
          <div style={{padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#8a9a84'}}>
            <LumaSpin size={40} />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Loading notifications...</span>
          </div>
        ) : notifs.length === 0 ? (
          <div style={{padding: 40, textAlign: 'center', color: '#8a9a84'}}>No notifications</div>
        ) : notifs.map((n, i) => (
          <div key={n.id} style={{ display: 'flex', gap: '16px', padding: '20px', background: n.read ? '#fff' : '#f8faf7', borderBottom: i === notifs.length - 1 ? 'none' : '1px solid #ece9e3', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Megaphone size={16}/>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px', fontSize: 14, color: '#111827', fontWeight: n.read ? 600 : 800 }}>{n.title}</h4>
              <p style={{ margin: '0 0 8px', fontSize: 13, color: '#4b5563' }}>{n.body}</p>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>{n.time}</span>
            </div>
            {!n.read && <div style={{width:8,height:8,borderRadius:'50%',background:'#22c55e',flexShrink: 0}} />}
            <button 
              onClick={() => handleDeleteNotif(n.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Delete notification"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════ SHARED COMPONENTS ═══════════════════════════ */

function ProduceIcon({ name, size = 18 }: { name: string; size?: number }) {
  const n = name.toLowerCase();
  if (n.includes('wheat') || n.includes('rice') || n.includes('grain') || n.includes('basmati')) {
    return <Wheat size={size} style={{ color: '#d97706' }} />;
  }
  if (n.includes('mango') || n.includes('apple') || n.includes('fruit') || n.includes('amla')) {
    return <Apple size={size} style={{ color: '#ea580c' }} />;
  }
  if (n.includes('turmeric') || n.includes('pepper') || n.includes('spice') || n.includes('chilli')) {
    return <Leaf size={size} style={{ color: '#059669' }} />;
  }
  if (n.includes('ghee') || n.includes('milk') || n.includes('dairy')) {
    return <Package2 size={size} style={{ color: '#2563eb' }} />;
  }
  return <Sprout size={size} style={{ color: '#16a34a' }} />;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active:     { label: 'Active',     cls: 'dsh-badge--green' },
    sold:       { label: 'Sold Out',   cls: 'dsh-badge--gray'  },
    pending:    { label: 'Pending',    cls: 'dsh-badge--amber' },
    dispatched: { label: 'Dispatched', cls: 'dsh-badge--blue'  },
    delivered:  { label: 'Delivered',  cls: 'dsh-badge--green' },
    processing: { label: 'Processing', cls: 'dsh-badge--amber' },
    cancelled:  { label: 'Cancelled',  cls: 'dsh-badge--red'   },
  };
  const b = map[status] ?? { label: status, cls: 'dsh-badge--gray' };
  return <span className={`dsh-badge ${b.cls}`}>{b.label}</span>;
}

function StatCard({ icon, label, value, sub, trend, trendUp }: {
  icon: React.ReactNode; label: string; value: string;
  sub?: string; trend?: string; trendUp?: boolean;
}) {
  return (
    <div className="dsh-stat-card">
      <div className="dsh-stat-icon">{icon}</div>
      <div className="dsh-stat-body">
        <p className="dsh-stat-label">{label}</p>
        <p className="dsh-stat-value">{value}</p>
        {trend && (
          <p className={`dsh-stat-trend ${trendUp ? 'dsh-stat-trend--up' : 'dsh-stat-trend--down'}`}>
            {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{trend}
          </p>
        )}
        {sub && <p className="dsh-stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

function BarChart({ data, color = '#16a34a' }: { data: { month: string; amount: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.amount));
  return (
    <div className="dsh-chart">
      {data.map(d => (
        <div key={d.month} className="dsh-chart-col">
          <span className="dsh-chart-val">
            ₹{d.amount >= 1000 ? `${(d.amount / 1000).toFixed(0)}k` : d.amount}
          </span>
          <div className="dsh-chart-bar-wrap">
            <div
              className="dsh-chart-bar"
              style={{ height: `${(d.amount / max) * 100}%`, background: color }}
            />
          </div>
          <span className="dsh-chart-month">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function OrderTrackingTimeline({ status }: { status: string }) {
  const baseDate = new Date();
  const formatD = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formatT = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  
  const deliveryStart = new Date(baseDate);
  deliveryStart.setDate(baseDate.getDate() + 5);
  const deliveryEnd = new Date(baseDate);
  deliveryEnd.setDate(baseDate.getDate() + 7);
  
  const placedDateStr = `${formatD(baseDate)}, ${formatT(baseDate)}`;
  const estDeliveryStr = `Est. ${formatD(deliveryStart)} - ${formatD(deliveryEnd)}`;

  const steps = [
    { id: 'processing', label: 'Order Placed', sub: 'Your order has been securely placed.', icon: <CheckCircle2 size={18}/>, date: placedDateStr },
    { id: 'confirmed', label: 'Order Confirmed', sub: 'Farmer has confirmed the availability and quality.', icon: <Package size={18}/>, date: '' },
    { id: 'dispatched', label: 'Dispatched', sub: 'Order picked up by our logistics partner.', icon: <Truck size={18}/>, date: '' },
    { id: 'delivered', label: 'Delivered', sub: 'Order has been successfully delivered.', icon: <Home size={18}/>, date: estDeliveryStr }
  ];
  const idx = status === 'cancelled' ? -1 : ['processing', 'confirmed', 'dispatched', 'delivered'].indexOf(status);
  const activeStep = idx === -1 ? -1 : (idx === 0 ? 0 : (status === 'dispatched' ? 2 : (status === 'delivered' ? 3 : 1)));
  
  if (status === 'cancelled') {
    return (
      <div style={{ padding: 24, background: '#fef2f2', borderRadius: 16, border: '1px solid #fecaca' }}>
        <p style={{ color: '#dc2626', fontSize: 15, margin: 0, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={20} /> This order was cancelled.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 0' }}>
      {steps.map((step, i) => {
        const isDone = i <= activeStep;
        const isCurrent = i === activeStep;
        return (
          <div 
            key={step.id} 
            style={{ 
              display: 'flex', 
              gap: 20, 
              opacity: 0, 
              animation: 'kkv2FadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards', 
              animationDelay: `${i * 0.15}s`,
              position: 'relative'
            }}
          >
            {/* Timeline Line */}
            {i < steps.length - 1 && (
              <div style={{ 
                position: 'absolute', left: 19, top: 40, bottom: -12, width: 2, 
                background: i < activeStep ? '#16a34a' : '#e2e8f0',
                transition: 'background 0.5s ease',
                zIndex: 0
              }} />
            )}
            
            {/* Timeline Node */}
            <div style={{ 
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0, 
              background: isCurrent ? '#dcfce7' : (isDone ? '#16a34a' : '#f8fafc'), 
              border: `2px solid ${isCurrent ? '#16a34a' : (isDone ? '#16a34a' : '#e2e8f0')}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              color: isCurrent ? '#16a34a' : (isDone ? '#fff' : '#94a3b8'),
              zIndex: 1,
              transition: 'all 0.4s ease'
            }}>
              {step.icon}
            </div>
            
            {/* Content */}
            <div style={{ flex: 1, paddingBottom: 32, paddingTop: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: isDone ? '#1e293b' : '#64748b' }}>
                  {step.label}
                </h4>
                {isDone && <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{step.date}</span>}
              </div>
              <p style={{ margin: 0, fontSize: 14, color: isDone ? '#475569' : '#94a3b8', lineHeight: 1.5 }}>
                {step.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════ FARMER VIEWS ═══════════════════════════ */

/* Interactive SVG Revenue Curve Chart */
function RevenueLineChart({ data }: { data: { month: string; amount: number }[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState('6M');
  const max = 50000;
  const min = 10000;
  
  const width = 580;
  const height = 135;
  const paddingX = 30;
  const paddingY = 18;
  
  if (data.length < 2) {
    return (
      <div className="dsh-saas-card dsh-chart-card">
        <div className="dsh-saas-card-header">
          <div>
            <h3 className="dsh-card-title">Monthly Revenue</h3>
            <p className="dsh-card-subtitle">Earning trajectory from agricultural sales</p>
          </div>
        </div>
        <div style={{ height: height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
          Not enough data yet
        </div>
      </div>
    );
  }

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((d.amount - min) / (max - min)) * (height - 2 * paddingY);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i, a) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = a[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${p.x},${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - 6} L ${points[0].x},${height - 6} Z`;

  return (
    <div className="dsh-saas-card dsh-chart-card">
      <div className="dsh-saas-card-header">
        <div>
          <h3 className="dsh-card-title">Monthly Revenue</h3>
          <p className="dsh-card-subtitle">Earning trajectory from agricultural sales</p>
        </div>
        <div className="dsh-chart-time-pills">
          {['7D', '1M', '6M', '1Y'].map(t => (
            <button
              key={t}
              className={`dsh-time-pill ${filter === t ? 'dsh-time-pill--active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="dsh-svg-chart-wrap">
        <svg viewBox={`0 0 ${width} ${height}`} className="dsh-svg-chart">
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[0.2, 0.5, 0.8].map((ratio, idx) => (
            <line
              key={idx}
              x1={paddingX}
              y1={paddingY + ratio * (height - 2 * paddingY)}
              x2={width - paddingX}
              y2={paddingY + ratio * (height - 2 * paddingY)}
              stroke="#F1F5F9"
              strokeDasharray="4 4"
            />
          ))}

          <path d={areaD} fill="url(#revenueGrad)" />
          <path d={pathD} fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />

          {points.map((p, i) => (
            <g key={i} className="dsh-chart-node" onClick={() => setHoverIdx(hoverIdx === i ? null : i)} style={{ cursor: 'pointer' }}>
              <circle cx={p.x} cy={p.y} r={hoverIdx === i ? "6" : "4"} fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.5" style={{ transition: 'all 0.2s' }} />
              {hoverIdx === i && (
                <circle cx={p.x} cy={p.y} r="10" fill="#16A34A" fillOpacity="0.18" />
              )}
              {/* Invisible larger circle to make tapping easier */}
              <circle cx={p.x} cy={p.y} r="20" fill="transparent" />
            </g>
          ))}
        </svg>

        {hoverIdx !== null && (
          <div
            className="dsh-chart-tooltip"
            style={{
              left: `${(points[hoverIdx].x / width) * 100}%`,
              top: `${(points[hoverIdx].y / height) * 100}%`
            }}
          >
            <span className="dsh-tooltip-month">{points[hoverIdx].month} 2026</span>
            <span className="dsh-tooltip-val">₹{points[hoverIdx].amount.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      <div className="dsh-chart-x-axis">
        {points.map((p, i) => (
          <span
            key={p.month}
            className={`dsh-axis-label ${hoverIdx === i ? 'dsh-axis-label--active' : ''}`}
            onClick={() => setHoverIdx(hoverIdx === i ? null : i)}
            style={{ cursor: 'pointer' }}
          >
            {p.month}
          </span>
        ))}
      </div>
    </div>
  );
}

function FarmerDashboardView({ onNavigate }: { onNavigate?: (navId: string) => void }) {
  const { user } = useAuth();
  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [connectedBuyers, setConnectedBuyers] = useState<any[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pricesRes, listingsRes, ordersRes] = await Promise.all([
          api.get('/market/prices'),
          api.get('/products'),
          api.get('/orders')
        ]);
        setMarketPrices(pricesRes.data);
        setListings(listingsRes.data);
        setOrders(ordersRes.data);
        
        // Dynamically calculate revenue and unique buyers from orders
        const revenueMap: Record<string, number> = {};
        const buyersMap: Record<string, any> = {};
        
        ordersRes.data.forEach((o: any) => {
          const date = new Date(o.createdAt);
          const month = date.toLocaleString('default', { month: 'short' });
          revenueMap[month] = (revenueMap[month] || 0) + (o.totalAmount || 0);
          
          if (o.buyerId && !buyersMap[o.buyerId]) {
            buyersMap[o.buyerId] = {
               id: o.buyerId,
               name: o.buyer || `Buyer ${o.buyerId.substring(0,4)}`,
               loc: o.deliveryAddress || 'Unknown',
               type: 'Customer'
            };
          }
        });

        // Ensure at least some default months show up on the chart
        const defaultMonths = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const formattedRevenue = defaultMonths.map(m => ({
          month: m,
          amount: revenueMap[m] || 0
        }));
        
        setMonthlyRevenue(formattedRevenue);
        setConnectedBuyers(Object.values(buyersMap));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  const activeListingsCount = listings.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'processing').length;
  const activeBuyersCount = connectedBuyers.length;
  
  // Verification Logic
  const lastVerifiedDate = (user as any)?.lastVerifiedAt ? new Date((user as any).lastVerifiedAt).getTime() : 0;
  const daysSinceVerified = (Date.now() - lastVerifiedDate) / (1000 * 60 * 60 * 24);
  const isVerified = (user as any)?.isVerified;
  const isPendingReview = (user as any)?.verificationStatus === 'pending';

  // Only require verification if NOT verified and NOT pending review, OR if 30 days have passed
  const needsVerification = (!isVerified && !isPendingReview) || daysSinceVerified > 30;

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verifyFile, setVerifyFile] = useState<File | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleVerifySubmit = async () => {
    if (!verifyFile || !user) return;
    setVerifyLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result;
          await api.post('/users/verify', { imageBase64: base64Data });
          
          if (user) {
            (user as any).lastVerifiedAt = new Date().toISOString();
            (user as any).verificationStatus = 'pending';
          }
          setShowVerificationModal(false);
          setVerifyLoading(false);
          alert('Crop verification photo uploaded! Awaiting admin review.');
        } catch (err: any) {
          console.error(err);
          const backendError = err.response?.data?.error || err.message;
          alert(`Verification failed: ${backendError}`);
          setVerifyLoading(false);
        }
      };
      reader.readAsDataURL(verifyFile);
    } catch (err) {
      console.error(err);
      alert('Verification failed. Please try again.');
      setVerifyLoading(false);
    }
  };
  
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  const currentMonthRevenue = monthlyRevenue.find(m => m.month === currentMonth)?.amount || 0;

  return (
    <div className="dsh-content">

      {/* ── 3-COLUMN MAIN LAYOUT ── */}
      <div className="dsh-3col-grid">

        {/* LEFT & CENTER COLUMN (MAIN FEED) */}
        <div className="dsh-3col-main">

          {needsVerification && !showVerificationModal && (
            <div className="animate-[kkv2FadeUp_0.4s_ease]" style={{ 
              background: '#f8fafc',
              border: '1px solid #e2e8f0', 
              borderRadius: 24, 
              padding: 32, 
              marginBottom: 24, 
              display: 'flex', 
              flexDirection: 'column',
              gap: 20,
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Subtle background watermark */}
              <div style={{ position: 'absolute', right: -20, bottom: -40, fontSize: 180, fontWeight: 800, color: '#f1f5f9', lineHeight: 1, zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
                !
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: 48, height: 48, 
                  borderRadius: '50%', 
                  border: '1px solid #cbd5e1', 
                  background: '#f1f5f9', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: '#334155' 
                }}>
                  <Shield size={20} strokeWidth={2} />
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Action Required: Crop Verification</h4>
                  <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.6 }}>
                    Please upload a recent photo of your crops to maintain trust and visibility with buyers on the platform.
                  </p>
                </div>
              </div>

              <button 
                className="hover:-translate-y-0.5 transition-all" 
                style={{ 
                  position: 'relative', zIndex: 1,
                  background: '#0f172a', color: '#fff', 
                  border: 'none', borderRadius: 12, 
                  alignSelf: 'flex-start', padding: '12px 28px', 
                  fontSize: 15, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' 
                }} 
                onClick={() => setShowVerificationModal(true)}
              >
                Verify Now <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Hero Banner */}
          <div className="dsh-hero-banner">
            <div className="dsh-hero-bg-shapes">
              <span className="dsh-hero-circle dsh-hero-circle-1" />
              <span className="dsh-hero-circle dsh-hero-circle-2" />
            </div>
            <div className="dsh-hero-content">
              <div className="dsh-hero-badge">
                <Sparkles size={12} /> SMART FARMING
              </div>
              <h2 className="dsh-hero-title">Grow Your Farm Business Smarter</h2>
              <p className="dsh-hero-sub">
                Track orders, monitor revenue, manage buyers, and increase your sales.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="dsh-hero-cta" onClick={() => onNavigate && onNavigate('listings')}>
                  Manage Crops <ArrowRight size={14} />
                </button>
                <button className="dsh-hero-cta" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255, 255, 255, 0.2)' }} onClick={() => setShowVerificationModal(true)}>
                  <Shield size={14} /> Crop Verification
                </button>
              </div>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="dsh-stats-4col">
            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--green"><Sprout size={18} /></div>
                <span className="dsh-saas-growth">+1 this week</span>
              </div>
              <p className="dsh-saas-stat-num">{activeListingsCount}</p>
              <p className="dsh-saas-stat-label">Active Crops</p>
            </div>

            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--emerald"><IndianRupee size={18} /></div>
                <span className="dsh-saas-growth">+18% vs last month</span>
              </div>
              <p className="dsh-saas-stat-num">₹{currentMonthRevenue.toLocaleString('en-IN')}</p>
              <p className="dsh-saas-stat-label">Monthly Revenue</p>
            </div>

            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--amber"><Package size={18} /></div>
                <span className="dsh-saas-status-tag dsh-saas-status-tag--amber">{pendingOrdersCount} pending</span>
              </div>
              <p className="dsh-saas-stat-num">{pendingOrdersCount}</p>
              <p className="dsh-saas-stat-label">Pending Orders</p>
            </div>

            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--blue"><Users size={18} /></div>
                <span className="dsh-saas-growth">+4 this month</span>
              </div>
              <p className="dsh-saas-stat-num">{activeBuyersCount}</p>
              <p className="dsh-saas-stat-label">Active Buyers</p>
            </div>
          </div>

          {/* Interactive Revenue Line Chart */}
          <RevenueLineChart data={monthlyRevenue} />


        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <div className="dsh-3col-side">

          {/* Target Completion Gauge Card (Coursue "Good Morning Jason 32%" style) */}
          <div className="dsh-saas-card dsh-target-card">
            <h3 className="dsh-card-title">Monthly Harvest Goal</h3>
            <p className="dsh-card-subtitle">₹43,200 of ₹50,000 target reached</p>
            <div className="dsh-target-gauge">
              <svg width="105" height="105" viewBox="0 0 105 105">
                <circle cx="52.5" cy="52.5" r="40" fill="none" stroke="#F1F5F9" strokeWidth="9" />
                <circle
                  cx="52.5" cy="52.5" r="40" fill="none" stroke="#16A34A" strokeWidth="9"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.86} ${2 * Math.PI * 40}`}
                  strokeLinecap="round" transform="rotate(-90 52.5 52.5)"
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div className="dsh-target-center">
                <span className="dsh-target-pct">86%</span>
                <span className="dsh-target-lbl">Completed</span>
              </div>
            </div>
            <p className="dsh-target-note"><TrendingUp size={12} style={{ display: 'inline', marginRight: 4 }} /> Outstanding performance!</p>
          </div>

          {/* Live Market Prices Widget */}
          <div className="dsh-saas-card">
            <div className="dsh-saas-card-header">
              <div>
                <h3 className="dsh-card-title">Live Market Prices</h3>
                <p className="dsh-card-subtitle">APMC Real-time feed</p>
              </div>
              <span className="dsh-live-pulse-badge">
                <span className="dsh-live-pulse-dot" /> LIVE
              </span>
            </div>
            <div className="dsh-market-rows-container">
              {marketPrices.map(m => (
                <div key={m.crop} className="dsh-market-card-row">
                  <div className="dsh-market-crop-info">
                    <div className="dsh-crop-icon-box"><ProduceIcon name={m.crop} size={18} /></div>
                    <div>
                      <p className="dsh-crop-name">{m.crop}</p>
                      <p className="dsh-crop-msp">MSP {m.msp}</p>
                    </div>
                  </div>
                  <div className="dsh-market-price-info">
                    <span className="dsh-crop-current">{m.current}</span>
                    <span className={`dsh-trend-badge ${m.trend === 'up' ? 'dsh-trend-badge--up' : 'dsh-trend-badge--down'}`}>
                      {m.trend === 'up' ? '▲ +12%' : '▼ -4%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Buyers Widget (Styled like "Your mentor" section in reference) */}
          <div className="dsh-saas-card">
            <div className="dsh-saas-card-header">
              <h3 className="dsh-card-title">Your Buyers</h3>
              <button className="dsh-plus-icon-btn" onClick={() => onNavigate && onNavigate('buyers')}>+</button>
            </div>
            <div className="dsh-mentor-style-list">
              {connectedBuyers.slice(0, 3).map(b => (
                <div key={b.id} className="dsh-mentor-row">
                  <div className="dsh-mentor-avatar">{b.name.charAt(0)}</div>
                  <div className="dsh-mentor-info">
                    <p className="dsh-mentor-name">{b.name}</p>
                    <p className="dsh-mentor-sub">{b.type} · {b.loc}</p>
                  </div>
                  <button className="dsh-follow-btn" onClick={() => onNavigate && onNavigate('buyers')}>
                    Contact
                  </button>
                </div>
              ))}
            </div>
            <button className="dsh-see-all-btn" onClick={() => onNavigate && onNavigate('buyers')}>
              See All Buyers →
            </button>
          </div>

        </div>

      </div>

      {showVerificationModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, width: '90%', maxWidth: 400, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative' }}>
            <button className="dsh-ghost-btn" style={{ position: 'absolute', top: 20, right: 20, padding: 8 }} onClick={() => setShowVerificationModal(false)}>✕</button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                <Shield size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#0f172a' }}>Crop Verification</h2>
              </div>
            </div>
            
            <p style={{ margin: '0 0 24px', color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
              To maintain trust on KisanKadu, please upload a clear, recent photo of your crops. This is required every 30 days.
            </p>

            <div className="dsh-form-field" style={{ marginBottom: 24 }}>
              <label className="dsh-form-label">Select Photo</label>
              <input type="file" accept="image/*" className="dsh-form-input" style={{ padding: '8px' }} onChange={e => setVerifyFile(e.target.files?.[0] || null)} />
            </div>

            <button className="dsh-cta-btn" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={handleVerifySubmit} disabled={verifyLoading || !verifyFile}>
              {verifyLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LumaSpin size={18} color="#fff" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <>Upload & Verify <Upload size={16} style={{ marginLeft: 6 }} /></>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function FarmerListingsView() {
  const [listings, setListings] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newListing, setNewListing] = useState({ name:'', qty:'', price:'', category:'Vegetables', img:'🥦' });

  useEffect(() => {
    api.get('/products')
      .then(res => setListings(res.data))
      .catch(console.error);
  }, []);

  const filtered = filterStatus === 'all' ? listings : listings.filter(l => l.status === filterStatus);

  const handleAdd = async () => {
    if (!newListing.name || !newListing.qty || !newListing.price) return;
    try {
      const payload = {
        name: newListing.name,
        stockQuantityKg: parseInt(newListing.qty),
        pricePerKg: parseInt(newListing.price.replace(/\\D/g, '') || '0'),
        category: newListing.category,
        description: 'New fresh produce'
      };
      const res = await api.post('/products', payload);
      setListings(prev => [...prev, res.data]);
      setNewListing({ name:'', qty:'', price:'', category:'Vegetables', img:'🥦' });
      setShowAdd(false);
    } catch (err) {
      console.error(err);
    }
  };

  const _handleDelete = (id: number) => setListings(prev => prev.filter(l => l.id !== id));
  const _toggleStatus = (id: number) => setListings(prev => prev.map(l =>
    l.id === id ? { ...l, status: l.status === 'active' ? 'sold' : 'active' as ListingStatus } : l
  ));

  return (
    <div className="flex flex-col font-['Outfit',sans-serif] pb-24 w-full">
      <div className="px-6 py-6 max-w-4xl mx-auto w-full">
        <h2 className="text-[26px] font-extrabold text-[#001f3f] tracking-tight mb-1">My Crops</h2>
        <p className="text-[#8a9a84] text-[15px] mb-8 font-medium">Manage your crop listings and inventory.</p>

        <button 
          onClick={() => setShowAdd(v => !v)}
          className="w-full bg-[#16a34a] text-white rounded-[16px] py-4 font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-[#15803d] transition-all active:scale-[0.98] mb-8 shadow-sm"
        >
          <Plus size={18} strokeWidth={2.5} /> {showAdd ? 'Cancel' : 'Add Crop'}
        </button>

        {/* Add Form */}
        {showAdd && (
          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] mb-8 animate-[kkv2FadeUp_0.3s_ease]">
            <h3 className="text-lg font-bold text-[#001f3f] mb-5">Add New Crop</h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Produce Name</label>
                <input className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#16a34a] transition-colors" placeholder="e.g. Fresh Tomatoes"
                  value={newListing.name} onChange={e => setNewListing(p => ({...p, name: e.target.value}))} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
                <select className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#16a34a] bg-white transition-colors" value={newListing.category}
                  onChange={e => setNewListing(p => ({...p, category: e.target.value}))}>
                  {['Vegetables','Fruits','Grains','Spices','Dairy'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Quantity</label>
                  <input className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#16a34a] transition-colors" placeholder="e.g. 500 kg"
                    value={newListing.qty} onChange={e => setNewListing(p => ({...p, qty: e.target.value}))} />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Price / kg</label>
                  <input className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#16a34a] transition-colors" placeholder="e.g. ₹28"
                    value={newListing.price} onChange={e => setNewListing(p => ({...p, price: e.target.value}))} />
                </div>
              </div>
            </div>
            <button className="w-full bg-[#001f3f] text-white rounded-xl py-3 font-semibold mt-8 hover:bg-gray-800 transition-colors" onClick={handleAdd}>
              Save Crop
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
          {['all', 'active', 'pending', 'sold'].map(s => {
            const count = s === 'all' ? listings.length : listings.filter(l => l.status === s).length;
            const isActive = filterStatus === s;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`whitespace-nowrap px-[22px] py-[10px] rounded-full text-[14px] font-bold transition-all border ${
                  isActive 
                    ? 'border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a]' 
                    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>

        {/* Table / List */}
        <div className="bg-white rounded-[24px] border border-[#f3f4f6] shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden pb-4 w-full">
          <div className="w-full">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-[#fafafa]">
                  <th className="pl-4 pr-1 py-3 text-[9px] sm:text-[11px] font-extrabold tracking-widest text-[#a1a1aa] uppercase w-[36%]">Produce</th>
                  <th className="px-1 py-3 text-[9px] sm:text-[11px] font-extrabold tracking-widest text-[#a1a1aa] uppercase w-[27%]">Category</th>
                  <th className="px-1 py-3 text-[9px] sm:text-[11px] font-extrabold tracking-widest text-[#a1a1aa] uppercase w-[15%]">Qty</th>
                  <th className="px-1 py-3 text-[9px] sm:text-[11px] font-extrabold tracking-widest text-[#a1a1aa] uppercase w-[22%]">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, index) => (
                  <tr key={l.id} className="group">
                    <td className="pl-4 pr-1 py-4 align-middle">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-shrink-0"><ProduceIcon name={l.name} size={18} /></div>
                        <span className="font-semibold text-[#1f2937] text-[12px] sm:text-[14px] leading-snug break-words">
                          {l.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-1 py-4 align-middle">
                      <span className={`inline-flex px-2 sm:px-3 py-1 sm:py-[4px] rounded-full text-[10px] sm:text-[12px] font-bold border leading-tight ${
                        l.category === 'Vegetables' ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]' :
                        l.category === 'Spices' ? 'bg-[#f0fdf4] text-[#22c55e] border-[#bbf7d0]' :
                        l.category === 'Grains' ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]' :
                        'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]'
                      }`}>
                        {l.category}
                      </span>
                    </td>
                    <td className="px-1 py-4 align-middle">
                      <span className="font-medium text-[#4b5563] text-[11px] sm:text-[13px] whitespace-nowrap">{l.qty}</span>
                    </td>
                    <td className="px-1 py-4 align-middle">
                      <span className={`inline-flex px-2 sm:px-3 py-1 sm:py-[4px] rounded-full text-[10px] sm:text-[12px] font-bold leading-tight ${
                        l.status === 'active' ? 'bg-[#dcfce7] text-[#15803d]' :
                        l.status === 'sold' ? 'bg-[#f3f4f6] text-[#6b7280]' :
                        'bg-[#fef3c7] text-[#b45309]'
                      }`}>
                        {l.status === 'sold' ? 'Sold' : l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mx-6 h-[4px] bg-[#d1d5db] rounded-full w-[45%] mt-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackingView({ order, role, onBack, onOrderUpdate }: { order: any; role: 'farmer'|'buyer'; onBack: () => void; onOrderUpdate?: (id: string, status: string, rating?: number) => void }) {
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [driverNumber, setDriverNumber] = useState('');
  const [saveDriver, setSaveDriver] = useState(true);
  const [recentDrivers, setRecentDrivers] = useState<string[]>([]);
  const [dispatchLoading, setDispatchLoading] = useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kkd_recent_drivers');
      if (stored) setRecentDrivers(JSON.parse(stored));
    } catch(e) {}
  }, []);

  const handleDispatch = async () => {
    if (!driverNumber.trim()) return alert('Please enter a driver number');
    setDispatchLoading(true);
    try {
      await api.patch(`/orders/${order.id}/status`, { status: 'dispatched', driverNumber });
      if (saveDriver) {
        const updated = [driverNumber, ...recentDrivers.filter(d => d !== driverNumber)].slice(0, 5);
        localStorage.setItem('kkd_recent_drivers', JSON.stringify(updated));
        setRecentDrivers(updated);
      }
      setShowDispatchModal(false);
      onBack(); // Go back to refresh
      if (onOrderUpdate) onOrderUpdate(order.id, 'dispatched');
    } catch (err) {
      console.error('Dispatch failed', err);
      alert('Failed to dispatch order');
    } finally {
      setDispatchLoading(false);
    }
  };

  const handleMarkDelivered = async () => {
    try {
      await api.patch(`/orders/${order.id}/status`, { status: 'delivered' });
      if (onOrderUpdate) onOrderUpdate(order.id, 'delivered');
      onBack();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleSubmitReview = async () => {
    setReviewLoading(true);
    try {
      await api.post(`/orders/${order.id}/review`, { rating: reviewRating, reviewText });
      setShowReviewModal(false);
      if (onOrderUpdate) onOrderUpdate(order.id, 'delivered', reviewRating);
      onBack();
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="dsh-content" style={{ maxWidth: 900, margin: '0 auto', overflowX: 'hidden' }}>
      <div className="dsh-page-header">
         <div>
           <p className="dsh-page-eyebrow" onClick={onBack} style={{cursor:'pointer', color:'#166534', display:'flex', alignItems:'center', gap:4, marginBottom: 12}}>
             <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }}/> Back to Orders
           </p>
           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <h1 className="dsh-page-title" style={{ margin: 0 }}>Track Order</h1>
             <span className="dsh-pill dsh-pill--active" style={{ pointerEvents: 'none' }}>{order.id}</span>
           </div>
           <p className="dsh-page-sub" style={{ marginTop: 8 }}>Real-time updates for your order.</p>
         </div>
      </div>

      <div style={{ display:'flex', gap:32, alignItems:'flex-start', flexWrap:'wrap', marginTop: 24 }}>
        
        {/* Animated Timeline */}
        <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 24, padding: '32px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards' }}>
          <OrderTrackingTimeline status={order.status} />
        </div>

        {/* Order Details Panel */}
        <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          <div style={{ background: '#f8fafc', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0', opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.2s' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Package size={18} color="#166534" /> Order Summary
            </h3>
            <div style={{ display:'flex', flexDirection:'column', gap:16, fontSize: 14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
                <span style={{ color:'#64748b' }}>Item</span> 
                <strong style={{ color: '#0f172a' }}>{order.item || 'Fresh Produce'}</strong>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
                <span style={{ color:'#64748b' }}>Unit Price</span> 
                <strong style={{ color: '#0f172a' }}>{order.unitPrice || (order.totalAmount && order.quantityKg ? `₹${Math.round((order.totalAmount - 250) / order.quantityKg)}/kg` : '—')}</strong>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
                <span style={{ color:'#64748b' }}>Quantity</span> 
                <strong style={{ color: '#0f172a' }}>{order.qty || `${order.quantityKg} kg`}</strong>
              </div>
              
              <div style={{ height:1, background:'#e2e8f0', margin:'4px 0' }}></div>
              
              <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center', fontSize: 18 }}>
                <span style={{ color:'#64748b', fontWeight: 500 }}>Total</span> 
                <strong style={{ color:'#166534', fontWeight: 800 }}>{order.amount || `₹${order.totalAmount?.toLocaleString()}`}</strong>
              </div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0', opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.3s' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={18} color="#166534" /> Shipping Info
            </h3>
            <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              <strong>{order.deliveryAddress ? 'Delivery Address' : 'KisanKadu Logistics Hub'}</strong><br />
              {order.deliveryAddress || 'Plot 45, Phase 2, Industrial Area, Maharashtra, 411057'}<br />
              <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
                {order.driverNumber ? (
                  <a href={`tel:${order.driverNumber}`} style={{ textDecoration: 'none' }}>
                    <button className="dsh-ghost-btn" style={{ padding: '8px 12px', fontSize: 13, background: '#fff', border: '1px solid #e2e8f0' }}>
                      <Phone size={14} /> Call Driver
                    </button>
                  </a>
                ) : (
                  <button className="dsh-ghost-btn" disabled style={{ padding: '8px 12px', fontSize: 13, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#94a3b8', cursor: 'not-allowed' }} title="Driver not assigned yet">
                    <Phone size={14} color="#94a3b8" /> Call Driver
                  </button>
                )}
              </div>
            </div>
          </div>

          {role === 'buyer' && order.status === 'dispatched' && (
            <button className="dsh-cta-btn" onClick={handleMarkDelivered} style={{ width: '100%', padding: '14px', borderRadius: 16, opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.4s' }}>
              <Package size={16}/> Mark as Delivered
            </button>
          )}
          {role === 'buyer' && order.status === 'delivered' && !order.rating && (
            <button className="dsh-cta-btn" onClick={() => setShowReviewModal(true)} style={{ width: '100%', padding: '14px', borderRadius: 16, opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.4s' }}>
              <Star size={16} fill="currentColor"/> Rate Product
            </button>
          )}
          {role === 'buyer' && order.status === 'delivered' && order.rating && (
            <button className="dsh-ghost-btn dsh-ghost-btn--border" style={{ width: '100%', padding: '14px', borderRadius: 16, opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.4s' }}>
              <Download size={16}/> Download Full Invoice
            </button>
          )}
          {role === 'farmer' && order.status === 'processing' && (
            <button className="dsh-cta-btn" onClick={() => setShowDispatchModal(true)} style={{ width: '100%', padding: '14px', borderRadius: 16, opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.4s' }}>
              <Truck size={16}/> Mark as Dispatched
            </button>
          )}
        </div>

      </div>

      {showDispatchModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, width: '90%', maxWidth: 400, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative' }}>
            <button className="dsh-ghost-btn" style={{ position: 'absolute', top: 20, right: 20, padding: 8 }} onClick={() => setShowDispatchModal(false)}>✕</button>
            
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#0f172a' }}>Dispatch Order</h2>
            <p style={{ margin: '0 0 24px', color: '#64748b', fontSize: 14 }}>Assign a delivery partner to this order.</p>

            <div className="dsh-form-field" style={{ marginBottom: 20 }}>
              <label className="dsh-form-label">Delivery Partner Number</label>
              <input type="tel" className="dsh-form-input" placeholder="e.g. +91 98765 43210" value={driverNumber} onChange={e => setDriverNumber(e.target.value)} />
            </div>

            {recentDrivers.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Recent</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {recentDrivers.map(d => (
                    <button key={d} onClick={() => setDriverNumber(d)} style={{ background: driverNumber === d ? '#166534' : '#f1f5f9', color: driverNumber === d ? '#fff' : '#475569', border: 'none', padding: '6px 12px', borderRadius: 100, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#475569', marginBottom: 24, cursor: 'pointer' }}>
              <input type="checkbox" checked={saveDriver} onChange={e => setSaveDriver(e.target.checked)} style={{ accentColor: '#166534', width: 16, height: 16 }} />
              Save this number for next orders
            </label>

            <button className="dsh-cta-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={handleDispatch} disabled={dispatchLoading}>
              {dispatchLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LumaSpin size={18} color="#fff" />
                  <span>Dispatching...</span>
                </div>
              ) : 'Confirm Dispatch'}
            </button>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, width: '90%', maxWidth: 400, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative' }}>
            <button className="dsh-ghost-btn" style={{ position: 'absolute', top: 20, right: 20, padding: 8 }} onClick={() => setShowReviewModal(false)}>✕</button>
            
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#0f172a' }}>Rate Your Order</h2>
            <p style={{ margin: '0 0 24px', color: '#64748b', fontSize: 14 }}>How was the quality of {order.item || 'this product'}?</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setReviewRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: star <= reviewRating ? '#eab308' : '#e2e8f0', transition: 'all 0.2s' }}>
                  <Star size={32} fill="currentColor" />
                </button>
              ))}
            </div>

            <div className="dsh-form-field" style={{ marginBottom: 24 }}>
              <label className="dsh-form-label">Review (Optional)</label>
              <textarea className="dsh-form-input" style={{ minHeight: 100, resize: 'none' }} placeholder="Tell us more about the product..." value={reviewText} onChange={e => setReviewText(e.target.value)} />
            </div>

            <button className="dsh-cta-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSubmitReview} disabled={reviewLoading}>
              {reviewLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LumaSpin size={18} color="#fff" />
                  <span>Submitting...</span>
                </div>
              ) : 'Submit Review'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function OrdersView({ orders, role, isEmbedded }: { orders: Order[]; role: 'farmer' | 'buyer', isEmbedded?: boolean }) {
  const [filter, setFilter] = useState('all');
  const [trackingOrder, setTrackingOrder] = useState<any>(null);
  const [_exportState, _setExportState] = useState<'idle'|'loading'|'done'>('idle');
  const tabs = ['all', 'processing', 'dispatched', 'delivered', 'cancelled'];

  if (trackingOrder) {
    return <TrackingView order={trackingOrder} role={role} onBack={() => setTrackingOrder(null)} onOrderUpdate={(id, status, rating) => {
      const o = orders.find(x => x.id === id);
      if (o) {
        o.status = status as any;
        if (rating) (o as any).rating = rating;
      }
    }} />;
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className={isEmbedded ? "" : "dsh-content"} style={{ width: '100%' }}>
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">{role === 'buyer' ? 'My Orders' : 'Received Orders'}</h1>
          <p className="dsh-page-sub">{role === 'buyer' ? 'Track your purchases from verified farmers.' : 'Manage all orders from buyers.'}</p>
        </div>
      </div>

      <div className="dsh-category-pills" style={{ marginBottom: 24 }}>
        {tabs.map(t => {
          const count = t === 'all' ? orders.length : orders.filter(o => o.status === t).length;
          return (
            <button key={t} className={`dsh-pill ${filter === t ? 'dsh-pill--active' : ''}`} onClick={() => setFilter(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)} {count > 0 ? `(${count})` : ''}
            </button>
          );
        })}
      </div>

      <div className="dsh-card">
        <div className="dsh-orders-desktop">
          <div className="dsh-table-wrap">
            <table className="dsh-table">
              <thead><tr>
                <th></th><th>Order ID</th>
                <th>{role === 'buyer' ? 'Farmer' : 'Buyer'}</th>
                <th>Item</th><th>Qty</th><th>Amount</th>
                <th>{role === 'buyer' ? 'ETA' : 'Date'}</th>
                <th>Status</th>
              </tr></thead>
              <tbody>
                {filtered.map(o => (
                  <Fragment key={o.id}>
                    <tr className="dsh-table-row-hover" style={{ cursor:'pointer' }} onClick={() => setTrackingOrder(o)}>
                      <td style={{ width: 32 }}>
                        <div style={{ width:32, height:32, background:'#f8faf7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#8a9a84' }}>
                          <ChevronRight size={14} />
                        </div>
                      </td>
                      <td className="dsh-order-id">{o.id}</td>
                      <td>
                        <div className="dsh-produce-cell">
                          <div className="dsh-order-avatar dsh-order-avatar--sm">
                            {(role === 'buyer' ? (o.farmer || `Farmer ${o.farmerId?.substring(0,4) || 'U'}`) : (o.buyer || `Buyer ${o.buyerId?.substring(0,4) || 'U'}`)).charAt(0)}
                          </div>
                          <div>
                            <p style={{ margin:0, fontWeight:600, fontSize:13 }}>
                              {role === 'buyer' ? (o.farmer || `Farmer ${o.farmerId?.substring(0,4) || 'Unknown'}`) : (o.buyer || `Buyer ${o.buyerId?.substring(0,4) || 'Unknown'}`)}
                            </p>
                            {role === 'buyer' && o.loc && (
                              <p style={{ margin:0, fontSize:11, color:'#9aab94' }}>
                                <MapPin size={10} style={{ display:'inline', marginRight:2 }}/>{o.loc}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{o.item || 'Fresh Produce'}</td>
                      <td>{o.qty || `${o.quantityKg} kg`}</td>
                      <td className="dsh-price-cell">{o.amount || `₹${o.totalAmount}`}</td>
                      <td>
                        <div className="dsh-eta-cell">
                          <Clock size={12}/>
                          {role === 'buyer' ? o.eta : o.time}
                        </div>
                      </td>
                      <td><StatusBadge status={o.status}/></td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dsh-orders-mobile">
          {filtered.map(o => (
            <div key={o.id} className="dsh-order-mcard" onClick={() => setTrackingOrder(o)}>
              <div className="dsh-order-mcard-top">
                <span className="dsh-order-id">{o.id}</span>
                <StatusBadge status={o.status}/>
              </div>
              
              <div className="dsh-order-mcard-main">
                <div className="dsh-order-avatar dsh-order-avatar--sm">
                  {(role === 'buyer' ? (o.farmer || `Farmer ${o.farmerId?.substring(0,4) || 'U'}`) : (o.buyer || `Buyer ${o.buyerId?.substring(0,4) || 'U'}`)).charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin:0, fontWeight:700, fontSize:14, color:'#111827' }}>
                    {role === 'buyer' ? (o.farmer || `Farmer ${o.farmerId?.substring(0,4) || 'Unknown'}`) : (o.buyer || `Buyer ${o.buyerId?.substring(0,4) || 'Unknown'}`)}
                  </p>
                  <p style={{ margin:'2px 0 0', fontSize:12, color:'#64748b' }}>
                    {o.qty || `${o.quantityKg} kg`} • {o.item || 'Fresh Produce'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin:0, fontWeight:700, fontSize:14, color:'#166534' }}>{o.amount || `₹${o.totalAmount}`}</p>
                  <p style={{ margin:'2px 0 0', fontSize:11, color:'#64748b' }}>
                    {role === 'buyer' ? o.eta : o.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="dsh-empty-state">
            <Package2 size={40} />
            <p>No {filter} orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryFromOrder(o: any): 'Vegetables' | 'Grains' | 'Fruits' | 'Spices' | 'Dairy' {
  const cat = (o.category || '').toLowerCase();
  const name = (o.productName || o.name || o.title || o.crop || o.items?.[0]?.name || o.items?.[0]?.title || '').toLowerCase();

  if (
    cat.includes('grain') || cat.includes('rice') || cat.includes('wheat') || cat.includes('paddy') || cat.includes('dal') || cat.includes('pulse') || cat.includes('millet') || cat.includes('cereal') ||
    name.includes('rice') || name.includes('wheat') || name.includes('paddy') || name.includes('grain') || name.includes('basmati') || name.includes('dal') || name.includes('atta') || name.includes('maida') || name.includes('millet') || name.includes('corn') || name.includes('jowar') || name.includes('bajra')
  ) {
    return 'Grains';
  }

  if (
    cat.includes('fruit') ||
    name.includes('apple') || name.includes('mango') || name.includes('banana') || name.includes('orange') || name.includes('grape') || name.includes('fruit') || name.includes('guava') || name.includes('papaya')
  ) {
    return 'Fruits';
  }

  if (
    cat.includes('spice') ||
    name.includes('turmeric') || name.includes('chilli') || name.includes('pepper') || name.includes('spice') || name.includes('cardamom') || name.includes('clove') || name.includes('ginger') || name.includes('garlic')
  ) {
    return 'Spices';
  }

  if (
    cat.includes('dairy') || cat.includes('milk') ||
    name.includes('milk') || name.includes('ghee') || name.includes('butter') || name.includes('paneer')
  ) {
    return 'Dairy';
  }

  return 'Vegetables';
}

function FarmerRevenueView() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([
    { name:'Vegetables', pct:0, color:'#16a34a' },
    { name:'Grains',     pct:0, color:'#3b82f6' },
    { name:'Spices',     pct:0, color:'#f59e0b' },
  ]);
  const [totals, setTotals] = useState({ month: '₹0', allTime: '₹0', avg: '₹0', count: 0 });

  useEffect(() => {
    api.get('/orders')
      .then(res => {
        let veg = 0, grain = 0, spice = 0;
        let allTimeVal = 0;
        const revenueMap: Record<string, number> = {};

        res.data.forEach((o: any) => {
           const date = new Date(o.createdAt);
           const month = date.toLocaleString('default', { month: 'short' });
           revenueMap[month] = (revenueMap[month] || 0) + (o.totalAmount || 0);
           allTimeVal += (o.totalAmount || 0);

           const catName = getCategoryFromOrder(o);
           if (catName === 'Grains') grain += (o.totalAmount || 0);
           else if (catName === 'Spices') spice += (o.totalAmount || 0);
           else veg += (o.totalAmount || 0);
        });

        const defaultMonths = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        setMonthlyRevenue(defaultMonths.map(m => ({
          month: m, amount: revenueMap[m] || 0
        })));
        
        if (allTimeVal > 0) {
          setCategoryData([
            { name:'Vegetables', pct:Math.round((veg/allTimeVal)*100), color:'#16a34a' },
            { name:'Grains',     pct:Math.round((grain/allTimeVal)*100), color:'#3b82f6' },
            { name:'Spices',     pct:Math.round((spice/allTimeVal)*100), color:'#f59e0b' },
          ]);
        }
        setTotals({
           month: `₹${revenueMap['Jul'] || revenueMap[defaultMonths[5]] || 0}`,
           allTime: `₹${allTimeVal}`,
           avg: `₹${res.data.length ? Math.round(allTimeVal / res.data.length) : 0}`,
           count: res.data.length
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col font-['Inter',sans-serif] pb-24 w-full bg-[#f8faf9] min-h-screen">
      <div className="px-5 py-6 max-w-4xl mx-auto w-full">
        <h1 className="text-[22px] font-extrabold text-[#111827] tracking-tight mb-1">Revenue Analytics</h1>
        <p className="text-[#8a9a84] text-[13px] mb-8 font-medium">Track your earnings and growth over time.</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[#6b7280] text-[12px] font-semibold tracking-wide">This Month</span>
              <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
                <IndianRupee size={16} strokeWidth={2.5}/>
              </div>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">{totals.month}</h3>
            <p className="text-[#16a34a] text-[11px] font-bold flex items-start gap-1 leading-[1.3]">
              <ArrowUpRight size={12} strokeWidth={3} className="flex-shrink-0 mt-[1px]"/> <span>+18% vs last<br/>month</span>
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[#6b7280] text-[12px] font-semibold tracking-wide">Total (6 mo)</span>
              <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
                <IndianRupee size={16} strokeWidth={2.5}/>
              </div>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">{totals.allTime}</h3>
            <p className="text-[#16a34a] text-[11px] font-bold flex items-start gap-1 leading-[1.3] mt-[14px]">
              <ArrowUpRight size={12} strokeWidth={3} className="flex-shrink-0 mt-[1px]"/> <span>All time high</span>
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[#6b7280] text-[12px] font-semibold tracking-wide">Avg Order Val</span>
              <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
                <TrendingUp size={16} strokeWidth={2.5}/>
              </div>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">{totals.avg}</h3>
            <p className="text-[#16a34a] text-[11px] font-bold flex items-start gap-1 leading-[1.3]">
              <ArrowUpRight size={12} strokeWidth={3} className="flex-shrink-0 mt-[1px]"/> <span>+5% growth</span>
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[#6b7280] text-[12px] font-semibold tracking-wide">Orders (6 mo)</span>
              <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
                <Package size={16} strokeWidth={2.5}/>
              </div>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">{totals.count}</h3>
            <p className="text-[#9ca3af] text-[11px] font-medium leading-[1.3]">
              Total orders completed
            </p>
          </div>
        </div>

        {/* Monthly Revenue Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-6">
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-5">
            <h2 className="text-[13px] font-extrabold text-[#111827]">Monthly Revenue</h2>
            <span className="text-[#9ca3af] text-[11px] font-semibold">Feb – Jul 2026</span>
          </div>
          <div className="flex justify-between items-end px-1 pb-4">
            {monthlyRevenue.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-[9px] font-bold text-[#9ca3af]">₹{d.amount >= 1000 ? `${(d.amount/1000).toFixed(0)}k` : d.amount}</span>
                <div className="w-[85%] h-1 bg-[#16a34a] rounded-full"></div>
                <span className="text-[10px] font-semibold text-[#6b7280]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Category Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-6">
          <div className="mb-8 border-b border-gray-50 pb-5">
            <h2 className="text-[13px] font-extrabold text-[#111827]">Revenue by Category</h2>
          </div>
          <div className="flex flex-col gap-6">
            {categoryData.map(c => (
              <div key={c.name} className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-semibold text-[#4b5563]">{c.name}</span>
                  <span className="text-[12px] font-bold" style={{ color: c.color }}>{c.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${c.pct}%`, backgroundColor: c.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyersView() {
  const [search, setSearch] = useState('');
  const [connectedBuyers, setConnectedBuyers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => {
        const buyersMap: Record<string, any> = {};
        res.data.forEach((o: any) => {
           if (o.buyerId && !buyersMap[o.buyerId]) {
             buyersMap[o.buyerId] = {
                id: o.buyerId,
                name: o.buyer || `Buyer ${o.buyerId.substring(0,4)}`,
                loc: o.deliveryAddress || 'Various',
                type: 'Customer',
                orders: 1,
                totalBought: `₹${o.totalAmount || 0}`,
                rating: 4.8,
                joined: '2026'
             };
           } else if (o.buyerId) {
             buyersMap[o.buyerId].orders++;
             const currentSpent = parseInt(buyersMap[o.buyerId].totalBought.replace(/[^0-9]/g, '')) || 0;
             buyersMap[o.buyerId].totalBought = `₹${currentSpent + (o.totalAmount || 0)}`;
           }
        });
        setConnectedBuyers(Object.values(buyersMap));
      })
      .catch(console.error);
  }, []);

  const filtered = connectedBuyers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) || b.loc.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">My Buyers</h1>
          <p className="dsh-page-sub">All buyers who have ordered from your farm.</p>
        </div>
        <div className="dsh-search-wrap">
          <Search size={14} className="dsh-search-icon"/>
          <input className="dsh-search-input" placeholder="Search buyers..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>
      <div className="dsh-people-grid">
        {filtered.map(b => (
          <div key={b.id} className="dsh-people-card">
            <div className="dsh-people-avatar">{b.name.charAt(0)}</div>
            <div className="dsh-people-info">
              <h3 className="dsh-people-name">{b.name}</h3>
              <p className="dsh-people-type">{b.type}</p>
              <p className="dsh-people-loc"><MapPin size={11}/>{b.loc}</p>
            </div>
            <div className="dsh-people-stats">
              <div className="dsh-people-stat"><span>{b.orders}</span><p>Orders</p></div>
              <div className="dsh-people-stat"><span>{b.totalBought}</span><p>Spent</p></div>
              <div className="dsh-people-stat">
                <span><Star size={11} fill="currentColor" style={{ color:'#f59e0b', display:'inline-block', marginRight:2 }}/>{b.rating}</span>
                <p>Rating</p>
              </div>
            </div>
            <p style={{ fontSize:11, color:'#b0a89f', marginTop:12, marginBottom:0 }}>Member since {b.joined}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="dsh-empty-state"><Users size={36}/><p>No buyers found.</p></div>}
    </div>
  );
}


/* ═══════════════════════════ BUYER VIEWS ═══════════════════════════ */

/* Donut ring chart */
function RingChart({ pct, color, dashed, label, value }: {
  pct: number; color: string; dashed?: boolean; label: string; value: string;
}) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const _offset = circ - (pct / 100) * circ;
  return (
    <div className="dsh-ring-wrap">
      <div className="dsh-ring-svg-wrap">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#f0ede8" strokeWidth="9" />
          <circle cx="36" cy="36" r={r} fill="none" stroke={color}
            strokeWidth="9"
            strokeDasharray={dashed ? `${circ * pct / 100 / 6} ${circ / 20}` : `${circ * pct / 100} ${circ}`}
            strokeDashoffset={dashed ? 0 : 0}
            strokeLinecap={dashed ? 'butt' : 'round'}
            transform="rotate(-90 36 36)"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div className="dsh-ring-center">
          <span className="dsh-ring-pct">{pct}%</span>
        </div>
      </div>
      <p className="dsh-ring-name">{label}</p>
      <p className="dsh-ring-val">{value}</p>
    </div>
  );
}

/* Circular arc progress */
function CircularProgress({ pct }: { pct: number }) {
  const r = 56; const circ = 2 * Math.PI * r;
  const _offset = circ - (pct / 100) * circ;
  return (
    <div className="dsh-circ-wrap">
      <svg width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={r} fill="none" stroke="#f0ede8" strokeWidth="14" />
        <circle cx="72" cy="72" r={r} fill="none" stroke="#16a34a"
          strokeWidth="14" strokeDasharray={`${circ * pct / 100} ${circ}`}
          strokeLinecap="round" transform="rotate(-90 72 72)"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
        <circle cx="72" cy="72" r={r} fill="none" stroke="#86efac"
          strokeWidth="14" strokeOpacity="0.4"
          strokeDasharray={`${circ * 0.14} ${circ}`}
          strokeDashoffset={`-${circ * pct / 100}`}
          transform="rotate(-90 72 72)"
          style={{ transition: 'all 1s ease' }}
        />
      </svg>
      <div className="dsh-circ-center">
        <span className="dsh-circ-pct">{pct}%</span>
        <span className="dsh-circ-label">Fulfilled</span>
      </div>
    </div>
  );
}

function BuyerDashboardView({ onCheckout, onProductClick, onBrowse }: { onCheckout?: (item?: any) => void, onProductClick?: (item: any) => void, onBrowse?: () => void }) {
  const [btnStates, setBtnStates] = useState<Record<string, string>>({});
  const [showListingModal, setShowListingModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [browseProduce, setBrowseProduce] = useState<any[]>([]);
  const [connectedFarmers, setConnectedFarmers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, delivered: 0, inTransit: 0, processing: 0 });
  const [analyticsRings, setAnalyticsRings] = useState<any[]>([
    { label: 'Vegetables', value: '₹0', pct: 0, color: '#166534' },
    { label: 'Grains',     value: '₹0',  pct: 0, color: '#16a34a', dashed: true },
    { label: 'Fruits',     value: '₹0',  pct: 0, color: '#4ade80' },
    { label: 'Spices',     value: '₹0',  pct: 0, color: '#86efac', dashed: true },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, ordersRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders')
        ]);
        setBrowseProduce(prodRes.data);
        setOrders(ordersRes.data);

        // Derive connected farmers from orders dynamically
        const farmersMap: Record<string, any> = {};
        let vegTotal = 0, grainTotal = 0, fruitTotal = 0, spiceTotal = 0;
        let totalVal = 0;
        let t = 0, d = 0, i = 0, p = 0;

        ordersRes.data.forEach((o: any) => {
           t++;
           if (o.status === 'delivered') d++;
           else if (o.status === 'dispatched') i++;
           else p++;
           if (o.farmerId && !farmersMap[o.farmerId]) {
             farmersMap[o.farmerId] = {
                id: o.farmerId,
                name: o.farmer || `Farmer ${o.farmerId.substring(0,4)}`,
                loc: 'Various',
                crops: ['Produce'],
                orders: 1,
                verified: true
             };
           } else if (o.farmerId) {
             farmersMap[o.farmerId].orders++;
           }
           totalVal += (o.totalAmount || 0);
           const catName = getCategoryFromOrder(o);
           if (catName === 'Grains') grainTotal += (o.totalAmount || 0);
           else if (catName === 'Fruits') fruitTotal += (o.totalAmount || 0);
           else if (catName === 'Spices') spiceTotal += (o.totalAmount || 0);
           else vegTotal += (o.totalAmount || 0);
        });

        setStats({ total: t, delivered: d, inTransit: i, processing: p });
        setConnectedFarmers(Object.values(farmersMap));
        if (totalVal > 0) {
          setAnalyticsRings([
            { label: 'Vegetables', value: `₹${vegTotal}`, pct: Math.round((vegTotal/totalVal)*100), color: '#166534' },
            { label: 'Grains',     value: `₹${grainTotal}`,  pct: Math.round((grainTotal/totalVal)*100), color: '#16a34a', dashed: true },
            { label: 'Fruits',     value: `₹${fruitTotal}`,  pct: Math.round((fruitTotal/totalVal)*100), color: '#4ade80' },
            { label: 'Spices',     value: `₹${spiceTotal}`,  pct: Math.round((spiceTotal/totalVal)*100), color: '#86efac', dashed: true },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch buyer dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  const handleAction = (key: string, successMsg: string) => {
    setBtnStates(prev => ({ ...prev, [key]: 'loading' }));
    setTimeout(() => {
      setBtnStates(prev => ({ ...prev, [key]: successMsg }));
      setTimeout(() => setBtnStates(prev => ({ ...prev, [key]: '' })), 2000);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBtnStates(prev => ({ ...prev, import: 'loading' }));
      setTimeout(() => {
        setBtnStates(prev => ({ ...prev, import: `Imported ${file.name}!` }));
        setTimeout(() => setBtnStates(prev => ({ ...prev, import: '' })), 3000);
      }, 1500);
      e.target.value = '';
    }
  };

  const freshPicks = browseProduce.slice(0, 5).map(p => ({
     name: p.name, farmer: p.farmer, price: `₹${p.pricePerKg || p.price}/kg`, status: 'New', img: '🥬'
  }));
  if (freshPicks.length === 0) {
     freshPicks.push({ name: 'No products yet', farmer: '-', price: '-', status: 'N/A', img: '🛒' });
  }

  const pickStatusCls: Record<string, string> = {
    'New':      'dsh-pick-tag--green',
    'Reorder':  'dsh-pick-tag--blue',
    'Low Stock':'dsh-pick-tag--amber',
    'Seasonal': 'dsh-pick-tag--purple',
  };

  const reminder = {
    title: 'Fresh stock available',
    detail: 'New batch of produce available from farmers.',
    time: 'Today',
  };

  return (
    <div className="dsh-content">

      {/* ── Header ── */}
      <div style={{ display:'flex', justifyContent:'center', padding:'16px 0 8px', gap:12 }}>
        <button className="dsh-cta-btn" style={{ flex:1, maxWidth:160, justifyContent:'center' }} onClick={() => onBrowse && onBrowse()}>
          <Plus size={15}/> Place Order
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".csv, .xlsx, .json" />
        <button className="dsh-ghost-btn dsh-ghost-btn--border" style={{ flex:1, maxWidth:160, background:'#fff', justifyContent:'center' }} onClick={() => fileInputRef.current?.click()}>
          {btnStates['import'] === 'loading' ? 'Importing...' : btnStates['import'] || <><Download size={14}/> Import Data</>}
        </button>
      </div>


      {/* ── Stats row ── */}
      <div className="dsh-donz-stats">
        <div className="dsh-donz-stat dsh-donz-stat--accent">
          <p className="dsh-donz-label">Total Orders</p>
          <h2 className="dsh-donz-value">{stats.total}</h2>
          <div className="dsh-donz-sub">
            <ArrowUpRight size={13}/> {stats.total} all time
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">Delivered Orders</p>
          <h2 className="dsh-donz-value">{stats.delivered}</h2>
          <div className="dsh-donz-sub dsh-donz-sub--up">
            <ArrowUpRight size={13}/> Completed
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">In Transit</p>
          <h2 className="dsh-donz-value">{stats.inTransit}</h2>
          <div className="dsh-donz-sub dsh-donz-sub--up">
            <ArrowUpRight size={13}/> On the way
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">Processing</p>
          <h2 className="dsh-donz-value">{stats.processing}</h2>
          <div className="dsh-donz-sub" style={{ color:'#a0988f' }}>On Queue</div>
        </div>
      </div>

      {/* HORIZONTAL PRODUCT LIST */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '20px 24px', marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Shop Products</h2>
          <span style={{ fontSize:14, color:'#8a9a84', cursor:'pointer', fontWeight: 600 }}>See all &rarr;</span>
        </div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, paddingLeft: 4, paddingRight: 4 }}>
          {browseProduce.map(product => (
            <div 
              key={product.id} 
              onClick={() => onProductClick && onProductClick(product)}
              style={{ minWidth: 220, border: '1px solid #ece9e3', borderRadius: 12, padding: 16, cursor: 'pointer', background: '#fff', transition: 'box-shadow 0.2s', display:'flex', flexDirection:'column', gap:8 }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ background: '#f8faf7', borderRadius: 8, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
                <ProduceIcon name={product.name} size={40} />
              </div>
              <div>
                <h3 style={{ margin: '8px 0 4px', fontSize: 16, color: '#111827' }}>{product.name}</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#8a9a84' }}>{product.farmer}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 'auto', paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#166534' }}>{product.price}</span>
                  <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 2, background: '#f0fdf4', color: '#166534', padding: '2px 6px', borderRadius: 10 }}><Star size={10} fill="currentColor"/> {product.rating}</span>
                </div>
                <FarmerVerifiedCapsule farmerName={product.farmer} isVerified={product.isVerified !== false} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main 2-col ── */}
      <div className="dsh-donz-grid">

        {/* LEFT col */}
        <div className="dsh-donz-left">

          {/* Purchase Analytics */}
          <div className="dsh-card">
            <div className="dsh-card-header">
              <h2 className="dsh-card-title">Purchase Analytics</h2>
              <span style={{ fontSize:12, color:'#8a9a84' }}>This month</span>
            </div>
            <div className="dsh-ring-grid">
              {analyticsRings.map(d => (
                <RingChart key={d.label} {...d} />
              ))}
            </div>
          </div>

          {/* Connected Farmers */}
          <div className="dsh-card">
            <div className="dsh-card-header">
              <h2 className="dsh-card-title">Connected Farmers</h2>
              <button className="dsh-cta-btn" style={{ fontSize:12, padding:'7px 12px' }} onClick={() => handleAction('farmer', 'Farmer Added!')}>
                {btnStates['farmer'] === 'loading' ? 'Saving...' : btnStates['farmer'] || <><Plus size={13}/> Add Farmer</>}
              </button>
            </div>
            <div className="dsh-team-list">
              {connectedFarmers.slice(0, 4).map(f => (
                <div key={f.id} className="dsh-team-row">
                  <div className="dsh-team-avatar">{f.name.charAt(0)}</div>
                  <div className="dsh-team-info">
                    <p className="dsh-team-name">
                      {f.name}
                      {f.verified && <span className="dsh-team-verified">✓</span>}
                    </p>
                    <p className="dsh-team-role">{f.crops.join(', ')} · {f.loc}</p>
                  </div>
                  <div className="dsh-team-meta">
                    <span className="dsh-team-orders">{f.orders} orders</span>
                    <div className={`dsh-team-dot ${f.verified ? 'dsh-team-dot--green' : 'dsh-team-dot--gray'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT col */}
        <div className="dsh-donz-right">

          {/* Reminders */}
          <div className="dsh-card">
            <div className="dsh-card-header">
              <h2 className="dsh-card-title">Reminders</h2>
              <button className="dsh-ghost-btn" style={{ fontSize:12 }} onClick={() => handleAction('reminder', 'Saved!')}>
                {btnStates['reminder'] === 'loading' ? '...' : btnStates['reminder'] || <><Plus size={13}/> New</>}
              </button>
            </div>
            <div className="dsh-reminder-card">
              <div className="dsh-reminder-icon"><Wheat size={24} style={{ color: '#d97706' }} /></div>
              <div className="dsh-reminder-body">
                <p className="dsh-reminder-title">{reminder.title}</p>
                <p className="dsh-reminder-detail">{reminder.detail}</p>
                <p className="dsh-reminder-time"><Clock size={11}/>{reminder.time}</p>
              </div>
              <button className="dsh-cta-btn" style={{ fontSize:12, padding:'8px 14px', whiteSpace:'nowrap', alignSelf:'center' }} onClick={() => setShowListingModal(true)}>
                {btnStates['listing'] === 'loading' ? '...' : btnStates['listing'] || 'View Listing'}
              </button>
            </div>
          </div>

          {/* Order Progress */}
          <div className="dsh-card">
            <div className="dsh-card-header">
              <h2 className="dsh-card-title">Order Progress</h2>
            </div>
            <div className="dsh-progress-body">
              <CircularProgress pct={stats.total > 0 ? Math.round((stats.delivered / stats.total) * 100) : 0} />
              <div className="dsh-progress-legend">
                <div className="dsh-legend-item">
                  <span className="dsh-legend-dot" style={{ background:'#166534' }} />
                  <span>Delivered</span>
                  <strong>{stats.delivered}</strong>
                </div>
                <div className="dsh-legend-item">
                  <span className="dsh-legend-dot" style={{ background:'#86efac' }} />
                  <span>In Transit</span>
                  <strong>{stats.inTransit}</strong>
                </div>
                <div className="dsh-legend-item">
                  <span className="dsh-legend-dot" style={{ background:'#f0ede8', border:'1px solid #d0ccc6' }} />
                  <span>Pending</span>
                  <strong>{stats.processing}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Fresh Picks */}
          <div className="dsh-card">
            <div className="dsh-card-header">
              <h2 className="dsh-card-title">Today's Fresh Picks</h2>
            </div>
            <div className="dsh-picks-list">
              {freshPicks.map((p, i) => (
                <div key={i} className="dsh-pick-row">
                  <span className="dsh-pick-emoji"><ProduceIcon name={p.name} size={22} /></span>
                  <div className="dsh-pick-info">
                    <p className="dsh-pick-name">{p.name}</p>
                    <p className="dsh-pick-farmer">{p.farmer}</p>
                  </div>
                  <div className="dsh-pick-right">
                    <p className="dsh-pick-price">{p.price}</p>
                    <span className={`dsh-pick-tag ${pickStatusCls[p.status] ?? ''}`}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

function ProductDetailsView({ product, onBack, onAddToCart, onRemoveFromCart, cart }: { product: any, onBack: () => void, onAddToCart: (product: any) => void, onRemoveFromCart?: (product: any) => void, cart?: any[] }) {
  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);
  const [selectedQty, setSelectedQty] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  
  useEffect(() => {
    api.get('/products')
      .then(res => setSuggestedProducts(res.data))
      .catch(console.error);

    api.get(`/products/${product.id}/reviews`)
      .then(res => setReviews(res.data))
      .catch(console.error);
  }, [product.id]);

  const qty = cart?.filter(c => c.id === product.id).length || 0;
  if (!product) return null;
  return (
    <div className="dsh-content" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <button className="dsh-ghost-btn" style={{ padding: 0, marginBottom: 12, color: '#8a9a84' }} onClick={onBack}>
          &larr; Back to Dashboard
        </button>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0 }}>
        {/* 1. Image */}
        <div style={{ width: '100%', height: 300, background: '#f8faf7', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ece9e3', flexShrink: 0 }}>
          <ProduceIcon name={product.name} size={100} />
        </div>

        {/* Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h1 style={{ fontSize: 28, margin: 0, color: '#111827', fontWeight: 700 }}>{product.name}</h1>
            <span style={{ background: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{product.badge || 'Fresh'}</span>
          </div>
          <p style={{ margin: '0 0 16px 0', color: '#8a9a84', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}><Sprout size={16}/> {product.farmer} &middot; <MapPin size={14}/> {product.loc}</p>
          
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #ece9e3', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 auto', minWidth: 100 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#8a9a84' }}>Price</p>
              <p style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, color: '#166534' }}>₹{product.pricePerKg || parseInt(product.price?.toString().replace(/\D/g, '') || '45', 10)}/kg</p>
              <FarmerVerifiedCapsule farmerName={product.farmer} isVerified={product.isVerified !== false} size="md" />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px 0' }}>Product Description</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: 14 }}>
              Freshly harvested {product.name.toLowerCase()} sourced directly from {product.farmer}'s farm in {product.loc}. 
              Grown with sustainable farming practices, ensuring the highest quality and taste. 
              Perfect for your daily needs and bulk orders.
            </p>
          </div>

          {qty > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '6px', width: '100%' }}>
              <button onClick={() => onRemoveFromCart && onRemoveFromCart(product)} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 10, color:'#111827', cursor:'pointer', fontSize:24, fontWeight:400, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
              <span style={{ fontWeight: 600, color:'#111827', fontSize:18 }}>{qty}</span>
              <button onClick={() => onAddToCart({ ...product, cartQuantity: 10 })} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 10, color:'#111827', cursor:'pointer', fontSize:24, fontWeight:400, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, color: '#111827' }}>Select Quantity (MOQ: 10kg)</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[10, 15, 25].map(q => (
                    <button key={q} onClick={() => setSelectedQty(q)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: selectedQty === q ? '2px solid #166534' : '1px solid #e2e8f0', background: selectedQty === q ? '#f0fdf4' : '#fff', color: selectedQty === q ? '#166534' : '#475569', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                      {q} kg
                    </button>
                  ))}
                </div>
              </div>
              <button className="dsh-cta-btn" style={{ width: '100%', padding: '16px 24px', fontSize: 16, justifyContent: 'center' }} onClick={() => onAddToCart({ ...product, cartQuantity: selectedQty })} disabled={!selectedQty}>
                <ShoppingCart size={18}/> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RATINGS & REVIEWS */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 16px 0' }}>Ratings & Reviews</h2>
        {(() => {
          const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 'No ratings yet';
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#111827' }}>{avgRating === 'No ratings yet' ? '-' : avgRating}</div>
              <div>
                <div style={{ display: 'flex', color: '#eab308' }}><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#8a9a84' }}>{reviews.length > 0 ? `Based on ${reviews.length} reviews` : '0 reviews'}</p>
              </div>
            </div>
          );
        })()}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {reviews.length === 0 ? (
            <p style={{ color: '#8a9a84', fontSize: 14 }}>No reviews yet. Be the first to review after purchasing and receiving this product!</p>
          ) : (
            reviews.map((r, i) => (
              <div key={r.id || i} style={{ borderBottom: i === reviews.length - 1 ? 'none' : '1px solid #f0ede8', paddingBottom: i === reviews.length - 1 ? 0 : 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{r.buyerName || 'Verified Buyer'}</span>
                  <span style={{ color: '#8a9a84', fontSize: 12 }}>{new Date(r.reviewedAt).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', color: '#eab308', marginBottom: 8 }}>
                  {Array(5).fill(0).map((_, idx) => <Star key={idx} size={12} fill={idx < r.rating ? "currentColor" : "none"} color={idx < r.rating ? "#eab308" : "#e2e8f0"} />)}
                </div>
                {r.reviewText && <p style={{ margin: 0, fontSize: 14, color: '#4b5563' }}>{r.reviewText}</p>}
              </div>
            ))
          )}
        </div>
      </div>

      {/* SUGGESTED PRODUCTS */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Suggested Products</h2>
        </div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, paddingLeft: 4, paddingRight: 4 }}>
          {suggestedProducts.filter((p: any) => p.id !== product.id).slice(0, 4).map((p: any) => (
            <div 
              key={p.id} 
              style={{ minWidth: 200, border: '1px solid #ece9e3', borderRadius: 12, padding: 16, background: '#fff', display:'flex', flexDirection:'column', gap:8 }}
            >
              <div style={{ background: '#f8faf7', borderRadius: 8, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                <ProduceIcon name={p.name} size={32} />
              </div>
              <div>
                <h3 style={{ margin: '8px 0 4px', fontSize: 14, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#8a9a84' }}>{p.farmer}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 'auto', paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#166534', fontSize: 14 }}>{p.price}</span>
                  <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 2, background: '#f0fdf4', color: '#166534', padding: '2px 6px', borderRadius: 10 }}><Star size={10} fill="currentColor"/> {p.rating}</span>
                </div>
                <FarmerVerifiedCapsule farmerName={p.farmer} isVerified={p.isVerified !== false} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function CartView({ cart, onCheckout, onBack, onAddToCart, onRemoveFromCart, isEmbedded }: { cart: any[], onCheckout: () => void, onBack: () => void, onAddToCart?: (product: any) => void, onRemoveFromCart?: (product: any) => void, isEmbedded?: boolean }) {
  const totalItems = cart.reduce((acc, item) => acc + (item.cartQuantity || 1), 0);
  const totalPrice = cart.reduce((acc, item) => {
    const rawPrice = item.pricePerKg || item.price || 0;
    const numPrice = typeof rawPrice === 'string' ? parseInt(rawPrice.replace(/[^0-9]/g, ''), 10) : Number(rawPrice);
    return acc + (numPrice * (item.cartQuantity || 10));
  }, 0);

  return (
    <div className={isEmbedded ? "" : "dsh-content"} style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <div className="dsh-page-header">
        <div>
          {!isEmbedded && (
            <button className="dsh-ghost-btn" style={{ padding: 0, marginBottom: 12, color: '#8a9a84' }} onClick={onBack}>
              &larr; Continue Shopping
            </button>
          )}
          <h1 className="dsh-page-title">Your Cart</h1>
          <p className="dsh-page-sub">Review your items before proceeding to checkout.</p>
        </div>
      </div>
      
      {cart.length === 0 ? (
        <div className="dsh-card" style={{ padding: 40, textAlign: 'center', color: '#8a9a84' }}>
          <ShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h3>Your cart is empty</h3>
          <p>Browse products and add them to your cart.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '2 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cart.map((item, idx) => {
              const qty = item.cartQuantity || 0;
              return (
              <div key={idx} className="dsh-card" style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, background: '#f8faf7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ProduceIcon name={item.name} size={32} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: 16 }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#8a9a84' }}>Sold by {item.farmer}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.pricePerKg ? `₹${item.pricePerKg}/kg` : (item.price || '₹0/kg')}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '2px' }}>
                    <button onClick={() => onRemoveFromCart && onRemoveFromCart({...item, cartQuantity: 1})} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 6, color:'#111827', cursor:'pointer', fontSize:16, fontWeight:500, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                    <span style={{ fontWeight: 600, color:'#111827', fontSize:13, margin: '0 12px' }}>{qty}kg</span>
                    <button onClick={() => onAddToCart && onAddToCart({...item, cartQuantity: 1})} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 6, color:'#111827', cursor:'pointer', fontSize:16, fontWeight:500, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
          
          <div className="dsh-card" style={{ flex: '1 1 250px', padding: 24 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#4b5563' }}>
              <span>Items ({totalItems})</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14, color: '#4b5563' }}>
              <span>Delivery</span>
              <span style={{ color: '#166534' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #ece9e3', marginBottom: 24, fontSize: 18, fontWeight: 700 }}>
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <button className="dsh-cta-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RadarScannerModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="dsh-modal-overlay" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#f8faf7', borderRadius: 24, width: '100%', maxWidth: 480, padding: 40, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: '#e5e7eb', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>&times;</span>
        </button>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: '0 0 8px 0', textAlign: 'center' }}>
          Connecting farmers near you<span style={{ animation: 'dotsBlink 1.4s infinite both' }}>...</span>
        </h2>
        <p style={{ fontSize: 14, color: '#4b5563', margin: '0 0 32px 0', textAlign: 'center' }}>Scanning for verified farmers within a 60km radius...</p>

        {/* Radar Animation Container */}
        <div style={{ width: 280, height: 280, borderRadius: '50%', border: '2px solid rgba(22, 101, 52, 0.1)', position: 'relative', overflow: 'hidden', background: '#fff' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(22, 101, 52, 0.1)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(22, 101, 52, 0.1)' }} />
          <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', border: '1px solid rgba(22, 101, 52, 0.1)' }} />
          <div style={{ position: 'absolute', inset: 80, borderRadius: '50%', border: '1px solid rgba(22, 101, 52, 0.1)' }} />
          <div style={{ position: 'absolute', inset: 120, borderRadius: '50%', border: '1px solid rgba(22, 101, 52, 0.1)' }} />
          
          <div className="radar-sweep" style={{ position: 'absolute', top: 0, left: '50%', width: '50%', height: '50%', background: 'linear-gradient(90deg, rgba(22,101,52,0) 0%, rgba(22,101,52,0.15) 100%)', transformOrigin: 'bottom left', borderRight: '2px solid #166534' }} />

          <div className="radar-blip" style={{ position: 'absolute', top: '30%', left: '40%', color: '#166534', animationDelay: '0s' }}><MapPin size={16} fill="currentColor"/></div>
          <div className="radar-blip" style={{ position: 'absolute', top: '60%', left: '70%', color: '#166534', animationDelay: '1s' }}><User size={16} fill="currentColor"/></div>
          <div className="radar-blip" style={{ position: 'absolute', top: '20%', left: '80%', color: '#166534', animationDelay: '2s' }}><Sprout size={16} fill="currentColor"/></div>
          <div className="radar-blip" style={{ position: 'absolute', top: '75%', left: '25%', color: '#166534', animationDelay: '0.5s' }}><MapPin size={16} fill="currentColor"/></div>
          <div className="radar-blip" style={{ position: 'absolute', top: '45%', left: '15%', color: '#166534', animationDelay: '2.5s' }}><Sprout size={16} fill="currentColor"/></div>
        </div>
      </div>
    </div>
  );
}

function BrowseView({ onCheckout, onProductClick, onAddToCart, onRemoveFromCart, cart }: { onCheckout?: (item?: any) => void, onProductClick?: (item: any) => void, onAddToCart?: (item: any) => void, onRemoveFromCart?: (item: any) => void, cart?: any[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [radius60, _setRadius60] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy'];
  
  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchQ = p.name.toLowerCase().includes(search.toLowerCase()) || p.farmer?.toLowerCase().includes(search.toLowerCase());
    const matchRad = radius60 ? (p.rating >= 4.7) : true; 
    return matchCat && matchQ && matchRad;
  });
  return (
    <div className="dsh-content">
      <div style={{ marginBottom: 8 }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: 11, color: '#94a3b8' }}/>
          <input
            type="text"
            placeholder="Search products, farmers, or locations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '11px 16px 11px 44px', borderRadius: 9999, border: '1px solid #e2e8f0', outline: 'none', fontSize: 15, background: '#f8fafc', boxSizing: 'border-box' }}
          />
        </div>
      </div>



      <div className="dsh-category-pills">
        {categories.map(c => (
          <button key={c} className={`dsh-pill ${category === c ? 'dsh-pill--active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      <div className="dsh-produce-grid dsh-produce-grid--wide">
        {filtered.map(p => {
          const qty = cart?.find(c => c.id === p.id)?.cartQuantity || 0;
          return (
          <div key={p.id} className="dsh-produce-card" onClick={() => onProductClick && onProductClick(p)} style={{ cursor: 'pointer' }}>
            <div className="dsh-produce-card-top">
              <span className="dsh-produce-card-emoji"><ProduceIcon name={p.name} size={30} /></span>
              <span className="dsh-produce-badge">{p.badge}</span>
            </div>
            <div className="dsh-produce-card-body">
              <h3 className="dsh-produce-name">{p.name}</h3>
              <p className="dsh-produce-farmer"><Sprout size={11}/>{p.farmer} · {p.loc}</p>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10, fontSize:12, color:'#8a9a84' }}>
                <Phone size={11}/>{p.phone}
              </div>
              <div className="dsh-produce-footer" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p className="dsh-produce-price">{p.price}</p>
                    <p className="dsh-produce-qty">{p.qty} available</p>
                    <FarmerVerifiedCapsule farmerName={p.farmer} isVerified={p.isVerified !== false} />
                  </div>
                  <div className="dsh-produce-rating"><Star size={11} fill="currentColor"/>{p.rating}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="dsh-ghost-btn dsh-ghost-btn--border" style={{ flex: 1, padding: '6px 4px', fontSize: 12, borderRadius: 8, justifyContent: 'center', minWidth: 0 }} onClick={(e) => { e.stopPropagation(); onProductClick && onProductClick(p); }}>
                    <ShoppingCart size={12} style={{ marginRight: 4, flexShrink: 0 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{qty > 0 ? `${qty}kg in Cart` : 'Add to Cart'}</span>
                  </button>
                  <button className="dsh-cta-btn" style={{ flex: 1, padding: '6px 4px', fontSize: 12, borderRadius: 8, justifyContent: 'center', minWidth: 0 }} onClick={(e) => { e.stopPropagation(); onProductClick && onProductClick(p); }}>
                    <Zap size={12} style={{ marginRight: 4, flexShrink: 0 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )})}
        {filtered.length === 0 && <div style={{ gridColumn:'1/-1' }} className="dsh-empty-state"><Search size={36}/><p>No produce found.</p></div>}
      </div>
    </div>
  );
}

function FarmersView() {
  const [search, setSearch] = useState('');
  const [connectedFarmers, setConnectedFarmers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => {
        const farmersMap: Record<string, any> = {};
        res.data.forEach((o: any) => {
           if (o.farmerId && !farmersMap[o.farmerId]) {
             farmersMap[o.farmerId] = {
                id: o.farmerId,
                name: o.farmer || `Farmer ${o.farmerId.substring(0,4)}`,
                loc: 'Various',
                crops: ['Produce'],
                orders: 1,
                totalSpent: `₹${o.totalAmount || 0}`,
                rating: 4.8,
                joined: '2026',
                phone: '-',
                verified: true
             };
           } else if (o.farmerId) {
             farmersMap[o.farmerId].orders++;
             const currentSpent = parseInt(farmersMap[o.farmerId].totalSpent.replace(/[^0-9]/g, '')) || 0;
             farmersMap[o.farmerId].totalSpent = `₹${currentSpent + (o.totalAmount || 0)}`;
           }
        });
        setConnectedFarmers(Object.values(farmersMap));
      })
      .catch(console.error);
  }, []);

  const filtered = connectedFarmers.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) || f.loc.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">My Farmers</h1>
          <p className="dsh-page-sub">Verified farmers you've ordered from.</p>
        </div>
        <div className="dsh-search-wrap">
          <Search size={14} className="dsh-search-icon"/>
          <input className="dsh-search-input" placeholder="Search farmers..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>
      <div className="dsh-people-grid">
        {filtered.map(f => (
          <div key={f.id} className="dsh-people-card">
            <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:12 }}>
              <div className="dsh-people-avatar">{f.name.charAt(0)}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <h3 className="dsh-people-name" style={{ marginBottom:0 }}>{f.name}</h3>
                  {f.verified && (
                    <span style={{ background:'#dcfce7', color:'#16a34a', fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:20 }}>
                      Verified
                    </span>
                  )}
                </div>
                <p className="dsh-people-loc"><MapPin size={11}/>{f.loc}</p>
                <p style={{ fontSize:12, color:'#8a9a84', margin:'4px 0 0' }}><Phone size={11} style={{display:'inline',marginRight:4}}/>{f.phone}</p>
              </div>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:12 }}>
              {f.crops.map((c: any) => (
                <span key={c} style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#15803d', fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:20 }}>
                  {c}
                </span>
              ))}
            </div>
            <div className="dsh-people-stats">
              <div className="dsh-people-stat"><span>{f.orders}</span><p>Orders</p></div>
              <div className="dsh-people-stat"><span>{f.totalSpent}</span><p>Spent</p></div>
              <div className="dsh-people-stat">
                <span><Star size={11} fill="currentColor" style={{color:'#f59e0b',display:'inline-block',marginRight:2}}/>{f.rating}</span>
                <p>Rating</p>
              </div>
            </div>
            <button className="dsh-cta-btn" style={{ width:'100%', justifyContent:'center', marginTop:14, fontSize:13, padding:'9px' }}>
              <ShoppingCart size={14}/> Order Again
            </button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="dsh-empty-state"><Users size={36}/><p>No farmers found.</p></div>}
    </div>
  );
}

function SpendingView() {
  const [monthlySpending, setMonthlySpending] = useState<any[]>([]);
  const [topFarmers, setTopFarmers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([
    { name:'Vegetables', pct:0, color:'#16a34a', amt:'₹0' },
    { name:'Grains',     pct:0, color:'#3b82f6', amt:'₹0'  },
    { name:'Fruits',     pct:0, color:'#f59e0b', amt:'₹0'  },
    { name:'Spices',     pct:0,  color:'#ec4899', amt:'₹0'  },
  ]);
  const [totals, setTotals] = useState({ month: '₹0', allTime: '₹0', avg: '₹0', count: 0 });

  useEffect(() => {
    api.get('/orders')
      .then(res => {
        let veg = 0, grain = 0, fruit = 0, spice = 0;
        let allTimeVal = 0;
        const spendingMap: Record<string, number> = {};
        const farmersMap: Record<string, any> = {};

        res.data.forEach((o: any) => {
           const date = new Date(o.createdAt);
           const month = date.toLocaleString('default', { month: 'short' });
           spendingMap[month] = (spendingMap[month] || 0) + (o.totalAmount || 0);
           allTimeVal += (o.totalAmount || 0);

           const catName = getCategoryFromOrder(o);
           if (catName === 'Grains') grain += (o.totalAmount || 0);
           else if (catName === 'Fruits') fruit += (o.totalAmount || 0);
           else if (catName === 'Spices') spice += (o.totalAmount || 0);
           else veg += (o.totalAmount || 0);

           if (o.farmerId) {
             if (!farmersMap[o.farmerId]) {
               farmersMap[o.farmerId] = { id: o.farmerId, name: o.farmer || `Farmer ${o.farmerId.substring(0,4)}`, loc: 'Various', orders: 0, totalSpent: 0 };
             }
             farmersMap[o.farmerId].orders++;
             farmersMap[o.farmerId].totalSpent += (o.totalAmount || 0);
           }
        });

        setTopFarmers(Object.values(farmersMap).map((f: any) => ({
          ...f, totalSpent: `₹${f.totalSpent}`
        })).sort((a: any, b: any) => b.totalSpent - a.totalSpent));

        const defaultMonths = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        setMonthlySpending(defaultMonths.map(m => ({
          month: m, amount: spendingMap[m] || 0
        })));
        
        if (allTimeVal > 0) {
          setCategories([
            { name:'Vegetables', pct:Math.round((veg/allTimeVal)*100), color:'#16a34a', amt:`₹${veg}` },
            { name:'Grains',     pct:Math.round((grain/allTimeVal)*100), color:'#3b82f6', amt:`₹${grain}` },
            { name:'Fruits',     pct:Math.round((fruit/allTimeVal)*100), color:'#f59e0b', amt:`₹${fruit}` },
            { name:'Spices',     pct:Math.round((spice/allTimeVal)*100),  color:'#ec4899', amt:`₹${spice}` },
          ]);
        }
        setTotals({
           month: `₹${spendingMap['Jul'] || spendingMap[defaultMonths[5]] || 0}`,
           allTime: `₹${allTimeVal}`,
           avg: `₹${res.data.length ? Math.round(allTimeVal / res.data.length) : 0}`,
           count: res.data.length
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">Spending Analytics</h1>
          <p className="dsh-page-sub">Understand where your money goes.</p>
        </div>
      </div>
      <div className="dsh-stats-grid">
        <StatCard icon={<IndianRupee size={20}/>} label="This Month"    value={totals.month} trend="+34% vs last month" trendUp />
        <StatCard icon={<IndianRupee size={20}/>} label="Total (6 mo)" value={totals.allTime} sub="Across all orders" />
        <StatCard icon={<TrendingUp size={20}/>}  label="Avg Order Val" value={totals.avg}  trend="+8% growth" trendUp />
        <StatCard icon={<Truck size={20}/>}       label="Total Orders"  value={totals.count.toString()}      sub="All time" />
      </div>
      <div className="dsh-two-col">
        <div className="dsh-card dsh-card--span2">
          <div className="dsh-card-header">
            <h2 className="dsh-card-title">Monthly Spending</h2>
            <span style={{ fontSize:12, color:'#8a9a84' }}>Feb – Jul 2026</span>
          </div>
          <div style={{ padding:'24px 28px' }}>
            <BarChart data={monthlySpending} color="#3b82f6"/>
          </div>
        </div>
        <div className="dsh-card">
          <div className="dsh-card-header"><h2 className="dsh-card-title">Spend by Category</h2></div>
          <div style={{ padding:'20px' }}>
            {categories.map(c => (
              <div key={c.name} style={{ marginBottom:18 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'#2a3a26' }}>{c.name}</span>
                  <div style={{ display:'flex', gap:12 }}>
                    <span style={{ fontSize:12, color:'#8a9a84' }}>{c.amt}</span>
                    <span style={{ fontSize:13, fontWeight:700, color: c.color }}>{c.pct}%</span>
                  </div>
                </div>
                <div style={{ height:8, background:'#f0ede8', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${c.pct}%`, background:c.color, borderRadius:4 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dsh-card">
          <div className="dsh-card-header"><h2 className="dsh-card-title">Top Farmers by Spend</h2></div>
          <div className="dsh-orders-list">
            {topFarmers.slice(0,4).map((f: any, i: number) => (
              <div key={f.id} className="dsh-order-row">
                <span style={{ fontSize:13, fontWeight:700, color:'#b0a89f', width:20 }}>#{i+1}</span>
                <div className="dsh-order-avatar">{f.name.charAt(0)}</div>
                <div className="dsh-order-info">
                  <p className="dsh-order-name">{f.name}</p>
                  <p className="dsh-order-item">{f.orders} orders · {f.loc}</p>
                </div>
                <p className="dsh-order-amount">{f.totalSpent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ PROFILE VIEW ═══════════════════════════ */


/* ════════════════════ SETTINGS VIEW ════════════════════ */
function SettingsView({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };
  const [radius60, setRadius60] = useState(false);

  const sections = [
    {
      label: 'Preferences',
      items: [
        { 
          icon: <MapPin size={17}/>,
          label: '60km Radius Only',
          sub: 'Only show farmers within 60km',
          action: () => setRadius60(!radius60),
          rightElement: (
            <div 
              style={{ width:36, height:20, background: radius60 ? '#166534' : '#d0ccc6', borderRadius:20, position:'relative', transition:'0.3s' }}
            >
              <div style={{ width:16, height:16, background:'#fff', borderRadius:'50%', position:'absolute', top:2, left: radius60 ? 18 : 2, transition:'0.3s' }} />
            </div>
          )
        },
      ],
    },
    {
      label: 'Account',
      items: [
        { icon: <User size={17}/>,         label: 'Profile',           sub: 'Edit your personal details',    action: () => onNavigate('profile')       },
        { icon: <Bell size={17}/>,          label: 'Notifications',     sub: 'Alerts and updates',             action: () => onNavigate('notifications') },
        { icon: <MessageSquare size={17}/>, label: 'Messages',          sub: 'Contact admin or support',       action: () => onNavigate('messages')      },
      ],
    },
    {
      label: 'More',
      items: [
        { icon: <Shield size={17}/>,        label: 'Privacy & Security', sub: 'Password and data settings',   action: () => onNavigate('privacy')  },
        { icon: <Phone size={17}/>,         label: 'Help & Support',     sub: 'FAQ and contact us',            action: () => onNavigate('support')  },
        { icon: <Sparkles size={17}/>,      label: 'About KisanKaDukan', sub: 'Version 1.0 · Made with ❤️ for farmers', action: () => onNavigate('about') },
      ],
    },
  ];

  return (
    <div className="sv-page" style={{ height: '100vh', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Hero */}
      <div className="sv-hero" onClick={() => onNavigate('profile')}>
        <div className="sv-avatar">{user?.fullName?.charAt(0).toUpperCase()}</div>
        <div className="sv-hero-info">
          <div className="sv-hero-name">{user?.fullName}</div>
          <div className="sv-hero-email">{user?.email}</div>
        </div>
        <ChevronRight size={16} style={{color:'#c7c7cc'}}/>
      </div>

      {/* Sections */}
      {sections.map(section => (
        <div className="sv-group" key={section.label}>
          <div className="sv-group-label">{section.label}</div>
          <div className="sv-group-card">
            {section.items.map((item, idx) => (
              <div key={idx}>
                {idx > 0 && <div className="sv-divider"/>}
                <button className="sv-row" onClick={item.action}>
                  <div className="sv-row-icon-wrap">{item.icon}</div>
                  <div className="sv-row-body">
                    <span className="sv-row-label">{item.label}</span>
                    <span className="sv-row-sub">{item.sub}</span>
                  </div>
                  {(item as any).rightElement || <ChevronRight size={14} style={{color:'#c7c7cc',flexShrink:0}}/>}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="sv-group" style={{marginTop:8, marginBottom:40}}>
        <div className="sv-group-card">
          <button className="sv-row sv-logout" onClick={handleLogout}>
            <div className="sv-row-icon-wrap sv-logout-icon"><LogOut size={17}/></div>
            <span className="sv-row-label sv-logout-label">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivacyView({ onBack }: { onBack: () => void }) {
  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passStatus, setPassStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setPassStatus('Password must be at least 6 characters');
      return;
    }
    if (!auth.currentUser) {
      setPassStatus('You must be logged in');
      return;
    }
    
    setLoading(true);
    setPassStatus('');
    try {
      await updatePassword(auth.currentUser, newPassword);
      setPassStatus('Password updated successfully!');
      setNewPassword('');
      setTimeout(() => setChangingPassword(false), 2000);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login') {
        setPassStatus('Please sign out and sign in again to change password.');
      } else {
        setPassStatus(err.message || 'Failed to update password');
      }
    }
    setLoading(false);
  };

  return (
    <div className="sv-page" style={{ height: '100vh', overflowY: 'auto', paddingBottom: 120 }}>
      <div className="dsh-page-header" style={{ padding: '0 16px' }}>
        <button className="dsh-ghost-btn" style={{ padding: 0, marginBottom: 12, color: '#8a9a84' }} onClick={onBack}>
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }}/> Back to Settings
        </button>
        <h1 className="dsh-page-title" style={{ fontSize: 24 }}>Privacy & Security</h1>
      </div>
      <div className="sv-group" style={{ marginTop: 20 }}>
        <div className="sv-group-card">
          <div className="sv-row" onClick={() => setChangingPassword(!changingPassword)} style={{ cursor: 'pointer' }}>
            <span className="sv-row-label">Change Password</span>
            <ChevronRight size={14} style={{ color: '#c7c7cc', transform: changingPassword ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}/>
          </div>
          
          {changingPassword && (
            <div style={{ padding: '0 16px 16px' }}>
              <input 
                type="password" 
                placeholder="Enter new password" 
                className="kkd-input" 
                style={{ marginBottom: 8, padding: '10px 14px', fontSize: 14 }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {passStatus && (
                <p style={{ fontSize: 13, marginBottom: 12, color: passStatus.includes('success') ? '#16a34a' : '#dc2626' }}>
                  {passStatus}
                </p>
              )}
              <button 
                className="dsh-cta-btn" 
                style={{ width: '100%', padding: '10px', fontSize: 14 }}
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}
          
          <div className="sv-divider"/>
          <div className="sv-row"><span className="sv-row-label">Two-Factor Authentication</span><span className="sv-row-sub">Disabled</span></div>
          <div className="sv-divider"/>
          <div className="sv-row"><span className="sv-row-label">Data Sharing Preferences</span><ChevronRight size={14} style={{color:'#c7c7cc'}}/></div>
        </div>
      </div>
    </div>
  );
}

function SupportView({ onBack }: { onBack: () => void }) {
  return (
    <div className="sv-page" style={{ height: '100vh', overflowY: 'auto', paddingBottom: 120 }}>
      <div className="dsh-page-header" style={{ padding: '0 16px' }}>
        <button className="dsh-ghost-btn" style={{ padding: 0, marginBottom: 12, color: '#8a9a84' }} onClick={onBack}>
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }}/> Back to Settings
        </button>
        <h1 className="dsh-page-title" style={{ fontSize: 24 }}>Help & Support</h1>
      </div>
      <div className="sv-group" style={{ marginTop: 20 }}>
        <div className="sv-group-card">
          <div className="sv-row"><div className="sv-row-icon-wrap"><Phone size={16}/></div><span className="sv-row-label">Call Support (24/7): +91 98665 31592</span></div>
          <div className="sv-divider"/>
          <div className="sv-row"><div className="sv-row-icon-wrap"><Mail size={16}/></div><span className="sv-row-label">Email Us: kisankadhukan2026@gmail.com</span></div>
          <div className="sv-divider"/>
          <div className="sv-row"><div className="sv-row-icon-wrap"><MapPin size={16}/></div><span className="sv-row-label">Address: 16-22 Gajwel, Telangana</span></div>
          <div className="sv-divider"/>
          <div className="sv-row"><div className="sv-row-icon-wrap"><FileText size={16}/></div><span className="sv-row-label">FAQs</span></div>
        </div>
      </div>
    </div>
  );
}

function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <div className="sv-page" style={{ height: '100vh', overflowY: 'auto', paddingBottom: 120, display:'flex', flexDirection:'column', alignItems:'center', paddingTop: 60 }}>
      <div style={{ width: 80, height: 80, background: '#166534', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 26, letterSpacing: '-0.5px' }}>KKD</span>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: 0 }}>KisanKaDukan</h1>
      <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>Version 1.0.4 (Build 204)</p>
      
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, marginTop: 40, width: '90%', maxWidth: 400, textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Made with ❤️ to connect local farmers directly with consumers. Thank you for supporting fair trade!
        </p>
      </div>
      
      <button className="dsh-ghost-btn" style={{ marginTop: 30, color: '#166534' }} onClick={onBack}>
        &larr; Back to Settings
      </button>
    </div>
  );
}

function ProfileView() {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName ?? '',
    mobile: user?.mobile ?? '',
    location: user?.location ?? '',
    landSurveyNumber: user?.landSurveyNumber ?? '',
  });

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    if (logout) logout();
    window.location.href = '/';
  };

  if (!user) return null;
  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });

  return (
    <div className="pv-page">
      {saved && (
        <div className="pv-saved-banner">
          <CheckCircle2 size={14}/> Profile saved!
        </div>
      )}

      {/* ── Top Bar ── */}
      <div className="pv-topbar">
        <span className="pv-topbar-placeholder"/>
        <span className="pv-topbar-title">Profile</span>
        {!editing
          ? <button className="pv-topbar-action" onClick={() => setEditing(true)}>Edit</button>
          : <div style={{display:'flex',gap:12}}>
              <button className="pv-topbar-action" style={{color:'#8a9a84'}} onClick={() => { setEditing(false); setForm({ fullName:user.fullName, mobile:user.mobile, location:user.location, landSurveyNumber:user.landSurveyNumber??'' }); }}>Cancel</button>
              <button className="pv-topbar-action pv-topbar-action--done" onClick={handleSave}>Done</button>
            </div>
        }
      </div>

      {/* ── Hero Avatar ── */}
      <div className="pv-hero">
        <div className="pv-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
        <div className="pv-hero-name">
          {editing
            ? <input className="pv-hero-name-input" value={form.fullName} onChange={e => setForm(p => ({...p, fullName: e.target.value}))}/>
            : user.fullName}
        </div>
        <div className="pv-hero-role">{user.role === 'farmer' ? 'Grain Farmer' : 'Buyer Account'}</div>
      </div>

      {/* ── Account Informations ── */}
      <div className="pv-group">
        <div className="pv-group-label">Account Informations</div>
        <div className="pv-group-card">
          <div className="pv-row">
            <span className="pv-row-key">User id</span>
            <span className="pv-row-val pv-row-val--muted">{user.email}</span>
          </div>
          <div className="pv-divider"/>
          <div className="pv-row">
            <span className="pv-row-key">Email Address</span>
            <span className="pv-row-val pv-row-val--muted">{user.email}</span>
          </div>
          <div className="pv-divider"/>
          <div className="pv-row">
            <span className="pv-row-key">Password</span>
            <span className="pv-row-val pv-row-val--muted">••••••••</span>
          </div>
          <div className="pv-divider"/>
          <div className="pv-row">
            <span className="pv-row-key">Country</span>
            <span className="pv-row-val pv-row-val--muted">India</span>
          </div>
          <div className="pv-divider"/>
          <div className="pv-row">
            <span className="pv-row-key">Other infos made</span>
            <span className="pv-row-val pv-row-val--muted">{joinDate}</span>
          </div>
        </div>
      </div>

      {/* ── Personal Details ── */}
      <div className="pv-group">
        <div className="pv-group-label">Personal Details</div>
        <div className="pv-group-card">
          <div className="pv-row">
            <span className="pv-row-key">Full name</span>
            {editing
              ? <input className="pv-row-input" value={form.fullName} onChange={e => setForm(p => ({...p, fullName: e.target.value}))}/>
              : <span className="pv-row-val pv-row-val--muted">{user.fullName} <ChevronRight size={13} className="pv-chevron"/></span>}
          </div>
          <div className="pv-divider"/>
          <div className="pv-row">
            <span className="pv-row-key">Phone Number</span>
            {editing
              ? <input className="pv-row-input" value={form.mobile} onChange={e => setForm(p => ({...p, mobile: e.target.value}))}/>
              : <span className="pv-row-val pv-row-val--muted">{user.mobile} <ChevronRight size={13} className="pv-chevron"/></span>}
          </div>
          <div className="pv-divider"/>
          <div className="pv-row">
            <span className="pv-row-key">Location</span>
            {editing
              ? <input className="pv-row-input" value={form.location} onChange={e => setForm(p => ({...p, location: e.target.value}))}/>
              : <span className="pv-row-val pv-row-val--muted">{user.location} <ChevronRight size={13} className="pv-chevron"/></span>}
          </div>
          {user.role === 'farmer' && (<>
            <div className="pv-divider"/>
            <div className="pv-row">
              <span className="pv-row-key">Right side made</span>
              {editing
                ? <input className="pv-row-input" value={form.landSurveyNumber} onChange={e => setForm(p => ({...p, landSurveyNumber: e.target.value}))}/>
                : <span className="pv-row-val pv-row-val--muted">{user.landSurveyNumber || '—'} <ChevronRight size={13} className="pv-chevron"/></span>}
            </div>
          </>)}
        </div>
      </div>

      {/* ── General ── */}
      <div className="pv-group">
        <div className="pv-group-label">General</div>
        <div className="pv-group-card">
          <button className="pv-row pv-row--btn">
            <span className="pv-row-key">Account settings</span>
            <ChevronRight size={13} className="pv-chevron"/>
          </button>
          <div className="pv-divider"/>
          <button className="pv-row pv-row--btn">
            <span className="pv-row-key">Notifications</span>
            <ChevronRight size={13} className="pv-chevron"/>
          </button>
          <div className="pv-divider"/>
          <button className="pv-row pv-row--btn">
            <span className="pv-row-key">Privacy preferences</span>
            <ChevronRight size={13} className="pv-chevron"/>
          </button>
          <div className="pv-divider"/>
          <button className="pv-row pv-row--btn">
            <span className="pv-row-key">Help center</span>
            <ChevronRight size={13} className="pv-chevron"/>
          </button>
          <div className="pv-divider"/>
          <button className="pv-row pv-row--btn">
            <span className="pv-row-key">Sign out</span>
            <ChevronRight size={13} className="pv-chevron"/>
          </button>
        </div>
      </div>

      {/* ── Logout ── */}
      <div className="pv-group" style={{marginBottom:40}}>
        <div className="pv-group-card">
          <button className="pv-row pv-row--btn pv-logout-btn" onClick={handleLogout}>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}



/* ═══════════════════════════ SIDEBAR + SHELL ═══════════════════════════ */

const farmerNav = [
  { icon:<Home size={16}/>, label:'Home', id:'dashboard' },
  { icon:<Package size={16}/>,         label:'My Crops',    id:'listings' },
  { icon:<ShoppingCart size={16}/>,    label:'Orders',     id:'orders'   },
  { icon:<IndianRupee size={16}/>,     label:'Revenue',    id:'revenue'  },
  { icon:<Users size={16}/>,           label:'Buyers',     id:'buyers'   },
];

const buyerNav = [
  { icon:<Home size={16}/>, label:'Home', id:'dashboard' },
  { icon:<Search size={16}/>,         label:'Search',    id:'browse'   },
  { icon:<Users size={16}/>,           label:'Farmers',   id:'farmers'  },
  { icon:<ShoppingCart size={16}/>,    label:'My Orders', id:'orders'   },
  { icon:<TrendingUp size={16}/>,      label:'Spending',  id:'spending' },
];

function CheckoutView({ item, onConfirm, onCancel }: { item: any, onConfirm: (details: any) => void, onCancel: () => void }) {
  const [form, setForm] = useState({ address: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPct, setDiscountPct] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  const items = Array.isArray(item) ? item : [item];
  const total = items.reduce((acc, it) => {
    const rawPrice = it.pricePerKg || it.price || 0;
    const pricePerKg = typeof rawPrice === 'string' ? parseInt(rawPrice.replace(/[^0-9]/g, ''), 10) : Number(rawPrice) || 45;
    return acc + (pricePerKg * (it.cartQuantity || 10));
  }, 0);

  const discountAmount = Math.floor((total * discountPct) / 100);
  const finalTotal = total - discountAmount + 145;

  const applyCoupon = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    setValidatingCoupon(true);
    setCouponError('');
    setCouponSuccess('');
    try {
      const res = await api.post('/market/promotions/validate', { code: couponCode });
      setDiscountPct(res.data.discountPercentage);
      setCouponSuccess(`Coupon applied! ${res.data.discountPercentage}% off`);
    } catch (err: any) {
      setCouponError(err.response?.data?.error || 'Invalid coupon code');
      setDiscountPct(0);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm({ items, total, finalTotal, discountAmount, discountPct, couponCode, address: form.address });
    }, 1500);
  };

  return (
    <div className="dsh-content" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="dsh-page-header">
        <div>
          <button className="dsh-ghost-btn" style={{ padding: 0, marginBottom: 12, color: '#8a9a84' }} onClick={onCancel}>
            &larr; Back to browsing
          </button>
          <h1 className="dsh-page-title">Secure Checkout</h1>
          <p className="dsh-page-sub">Review your order details and provide delivery information.</p>
        </div>
      </div>

      <div className="dsh-two-col">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="dsh-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Delivery Details</h2>
          <div className="dsh-form-field">
            <label className="dsh-form-label"><MapPin size={13}/> Full Address</label>
            <textarea className="dsh-form-input" style={{ minHeight: 80, resize: 'none' }} placeholder="Enter complete delivery address with PIN code..." value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
          </div>
          <div className="dsh-two-col" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="dsh-form-field">
              <label className="dsh-form-label"><Mail size={13}/> Email Address</label>
              <input type="email" className="dsh-form-input" placeholder="buyer@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="dsh-form-field">
              <label className="dsh-form-label"><Phone size={13}/> Phone Number</label>
              <input type="tel" className="dsh-form-input" placeholder="+91 99999 99999" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="dsh-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Payment & Offers</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label className="dsh-form-label">Payment Method</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, border: '2px solid #166534', borderRadius: 12, background: '#f0fdf4' }}>
              <input type="radio" checked readOnly style={{ width: 18, height: 18, accentColor: '#166534' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, color: '#166534' }}>Cash on Delivery (COD)</span>
                <span style={{ fontSize: 13, color: '#15803d' }}>Pay when your order arrives</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <label className="dsh-form-label">Apply Coupon</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
              <input type="text" className="dsh-form-input dsh-inline-input" placeholder="Enter coupon code" style={{ flex: 1, minWidth: 0 }} value={couponCode} onChange={e => setCouponCode(e.target.value)} />
              <button 
                className="dsh-ghost-btn dsh-ghost-btn--border dsh-input-btn" 
                style={{ width: 'auto', flexShrink: 0, padding: '0 16px', height: '40px', fontWeight: 600, color: '#166534', borderColor: '#166534', whiteSpace: 'nowrap' }} 
                onClick={applyCoupon} 
                disabled={validatingCoupon}
              >
                {validatingCoupon ? '...' : 'Apply'}
              </button>
            </div>
            {couponError && <p style={{ color: 'red', fontSize: 12, margin: '4px 0 0' }}>{couponError}</p>}
            {couponSuccess && <p style={{ color: '#16a34a', fontSize: 12, margin: '4px 0 0', fontWeight: 600 }}>{couponSuccess}</p>}
          </div>
        </div>
      </div>

      <div className="dsh-card" style={{ padding: 24, height: 'fit-content' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 20px 0' }}>Order Summary</h2>
          {items.map((it, idx) => {
            const rawPrice = it.pricePerKg || it.price || 0;
            const pricePerKg = typeof rawPrice === 'string' ? parseInt(rawPrice.replace(/[^0-9]/g, ''), 10) : Number(rawPrice) || 45;
            return (
              <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #f0ede8', marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  <ProduceIcon name={it.name} size={20}/>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#111827' }}>{it.name || 'Fresh Produce'}</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#8a9a84' }}>{it.cartQuantity || 10} kg &middot; ₹{pricePerKg}/kg</p>
                </div>
                <div style={{ fontWeight: 600 }}>₹{pricePerKg * (it.cartQuantity || 10)}</div>
              </div>
            );
          })}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#4b5563' }}>
            <span>Items Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          {discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#16a34a', fontWeight: 600 }}>
              <span>Discount ({discountPct}%)</span>
              <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#4b5563' }}>
            <span>Delivery Fee</span>
            <span>₹145</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 20, borderTop: '1px solid #f0ede8', fontSize: 18, fontWeight: 700, color: '#111827' }}>
            <span>Total Pay</span>
            <span>₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
          <button className="dsh-cta-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '12px', fontSize: 15 }} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${finalTotal.toLocaleString('en-IN')} & Confirm`}
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderSuccessView({ onTrackOrder }: { onTrackOrder: () => void }) {
  return (
    <div className="dsh-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px 20px', animation: 'kkv2FadeUp 0.5s ease' }}>
      <div style={{ 
        width: 96, height: 96, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, 
        animation: 'scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <CheckCircle2 size={48} color="#16a34a" />
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111827', margin: '0 0 12px 0' }}>Order Successful!</h1>
      <p style={{ fontSize: 15, color: '#4b5563', margin: '0 0 32px 0', textAlign: 'center', maxWidth: 400, lineHeight: 1.5 }}>
        Your order has been securely placed. We've notified the farmer and arranged for logistics pickup.
      </p>
      <div style={{ display: 'flex', gap: 16 }}>
        <button className="dsh-cta-btn" style={{ padding: '12px 24px', fontSize: 15 }} onClick={onTrackOrder}>
          <Truck size={18} /> Track Order
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showRadarModal, setShowRadarModal] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [buyerOrders, setBuyerOrders] = useState<any[]>([]);
  const [farmerOrders, setFarmerOrders] = useState<any[]>([]);
  const [activeToast, setActiveToast] = useState<any>(null);

  useEffect(() => {
    const checkBroadcasts = async () => {
      try {
        const res = await api.get('/users/announcements');
        const list = res.data || [];
        if (list.length > 0) {
          const latest = list[0];
          const toastKey = 'kkd_toast_shown_' + latest.id;
          const deletedSet = new Set(JSON.parse(localStorage.getItem('kkd_deleted_notif_ids') || '[]'));
          
          if (!sessionStorage.getItem(toastKey) && !deletedSet.has(latest.id)) {
            sessionStorage.setItem(toastKey, 'true');
            setActiveToast(latest);
            
            setTimeout(() => {
              setActiveToast((current: any) => current?.id === latest.id ? null : current);
            }, 7000);
          }
        }
      } catch (err) {
        console.error('Error polling broadcasts:', err);
      }
    };

    checkBroadcasts();
    const timer = setInterval(checkBroadcasts, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user) return;
    api.get('/orders')
      .then(res => {
        if (user.role === 'farmer') setFarmerOrders(res.data);
        else setBuyerOrders(res.data);
      })
      .catch(console.error);
  }, [user]);

  const handleAddToCart = (prod: any) => {
    const qty = prod.cartQuantity || 10;
    setCart(prev => {
      const existing = prev.find(p => p.id === prod.id);
      if (existing) {
        return prev.map(p => p.id === prod.id ? { ...p, cartQuantity: (p.cartQuantity || 10) + qty } : p);
      }
      return [...prev, { ...prod, cartQuantity: qty }];
    });
  };

  const handleRemoveFromCart = (prod: any) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === prod.id);
      if (existing) {
        const removeQty = prod.cartQuantity || 1;
        const newQty = (existing.cartQuantity || 10) - removeQty;
        if (newQty <= 0) {
          return prev.filter(p => p.id !== prod.id);
        }
        return prev.map(p => p.id === prod.id ? { ...p, cartQuantity: newQty } : p);
      }
      return prev;
    });
  };

  const [globalSearch, setGlobalSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSearchResults = () => {
    if (!globalSearch.trim()) return [];
    const query = globalSearch.toLowerCase();
    const results: any[] = [];
    
    if (isFarmer) {
      farmerOrders.forEach(o => {
        if (o.id.toLowerCase().includes(query) || o.buyer?.toLowerCase().includes(query) || o.item?.toLowerCase().includes(query)) {
          results.push({ type: 'Order', label: `${o.id} - ${o.item} (${o.buyer})`, id: 'orders' });
        }
      });
    } else {
      buyerOrders.forEach(o => {
        if (o.id.toLowerCase().includes(query) || o.farmer?.toLowerCase().includes(query) || o.item?.toLowerCase().includes(query)) {
          results.push({ type: 'Order', label: `${o.id} - ${o.item} (${o.farmer})`, id: 'orders' });
        }
      });
    }
    return results.slice(0, 8);
  };

  if (!user) return null;

  const isFarmer = user.role === 'farmer';
  const navItems = isFarmer ? farmerNav : buyerNav;

  const handleLogout = () => { logout(); navigate('/'); };

  const handleNav = (id: string) => { setActiveNav(id); };

  const renderView = () => {
    if (activeNav === 'settings') return <SettingsView onNavigate={handleNav} />;
    if (activeNav === 'profile') return <ProfileView />;
    if (activeNav === 'privacy') return <PrivacyView onBack={() => setActiveNav('settings')} />;
    if (activeNav === 'support') return <SupportView onBack={() => setActiveNav('settings')} />;
    if (activeNav === 'about') return <AboutView onBack={() => setActiveNav('settings')} />;
    if (activeNav === 'messages') return <MessagesView />;
    if (activeNav === 'notifications') return <NotificationsView />;
    if (activeNav === 'checkout') return (
      <CheckoutView 
        item={checkoutItem} 
        onConfirm={async (details) => {
          try {
            const itemsToOrder = details.items || [];
            if (itemsToOrder.length === 0) return;

            await Promise.all(itemsToOrder.map((it: any, idx: number) => {
              const rawPrice = it.pricePerKg || it.price || 0;
              const pricePerKg = typeof rawPrice === 'string' ? parseInt(rawPrice.replace(/[^0-9]/g, ''), 10) : Number(rawPrice) || 45;
              const itemTotal = pricePerKg * (it.cartQuantity || 10);
              // Add the delivery fee only to the first order to make the grand total accurate
              const finalAmount = idx === 0 ? itemTotal + 145 : itemTotal;

              const payload = {
                productId: it.id,
                totalAmount: finalAmount,
                quantityKg: it.cartQuantity || 10,
                deliveryAddress: details.address || 'User Address',
                farmerId: it.farmerId
              };
              return api.post('/orders', payload);
            }));

            // Refresh orders
            const res = await api.get('/orders');
            setBuyerOrders(res.data);
            setCart([]);
            setActiveNav('order_success');
          } catch (err) {
            console.error('Failed to create order', err);
          }
        }} 
        onCancel={() => setActiveNav('browse')} 
      />
    );
    if (activeNav === 'order_success') return <OrderSuccessView onTrackOrder={() => setActiveNav('orders')} />;
    if (activeNav === 'product_details') return <ProductDetailsView product={selectedProduct} cart={cart} onBack={() => setActiveNav('dashboard')} onAddToCart={(prod) => {
      handleAddToCart(prod);
      setActiveNav('dashboard');
    }} onRemoveFromCart={handleRemoveFromCart} />;

    if (isFarmer) {
      switch (activeNav) {
        case 'dashboard': return <FarmerDashboardView onNavigate={handleNav} />;
        case 'listings':  return <FarmerListingsView />;
        case 'orders':    return <OrdersView orders={farmerOrders} role="farmer" />;
        case 'revenue':   return <FarmerRevenueView />;
        case 'buyers':    return <BuyersView />;
        default:          return <FarmerDashboardView onNavigate={handleNav} />;
      }
    } else {
      switch (activeNav) {
        case 'dashboard': return <BuyerDashboardView onCheckout={(item) => { setCheckoutItem(item); setActiveNav('checkout'); }} onProductClick={(item) => { setSelectedProduct(item); setActiveNav('product_details'); }} onBrowse={() => setActiveNav('browse')} />;
        case 'orders':    
          return (
            <div className="dsh-content" style={{ display: 'flex', flexDirection: 'column', paddingBottom: 60 }}>
              {cart.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <CartView cart={cart} onCheckout={() => { setCheckoutItem(cart.length === 1 ? cart[0] : cart); setActiveNav('checkout'); }} onBack={() => setActiveNav('dashboard')} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} isEmbedded={true} />
                </div>
              )}
              <OrdersView orders={buyerOrders} role="buyer" isEmbedded={true} />
            </div>
          );
        case 'browse':    return <BrowseView cart={cart} onCheckout={(item) => { setCheckoutItem(item); setActiveNav('checkout'); }} onProductClick={(item) => { setSelectedProduct(item); setActiveNav('product_details'); }} onAddToCart={(prod) => setCart([...cart, prod])} onRemoveFromCart={handleRemoveFromCart} />;
        case 'farmers':   return <FarmersView />;
        case 'spending':  return <SpendingView />;
        default:          return <BuyerDashboardView onCheckout={(item) => { setCheckoutItem(item); setActiveNav('checkout'); }} onProductClick={(item) => { setSelectedProduct(item); setActiveNav('product_details'); }} onBrowse={() => setActiveNav('browse')} />;
      }
    }
  };

  // Bottom nav items: main 4 + profile
  const bottomNavItems = [
    ...navItems.slice(0, 4),
    { icon: <User size={20}/>, label: 'Profile', id: 'profile' },
  ];

  return (
    <div className="dsh-root">

      {/* ── WHITE SIDEBAR (desktop only) ── */}
      <aside className="dsh-sidebar">
        <div className="dsh-sidebar-logo">
          <div className="dsh-sidebar-logo-icon"><span className="font-extrabold text-[12px] tracking-tight text-[#16a34a]">KKD</span></div>
          <span className="dsh-sidebar-logo-text">KisanKaDukan</span>
        </div>

        <div className="dsh-role-pill">
          {isFarmer ? <Wheat size={12}/> : <ShoppingCart size={12}/>}
          {isFarmer ? 'Farmer Account' : 'Buyer Account'}
        </div>

        <div className="dsh-sidebar-section-title">OVERVIEW</div>
        <nav className="dsh-sidebar-nav">
          {navItems.map(item => (
            <button key={item.id}
              className={`dsh-nav-item ${activeNav === item.id ? 'dsh-nav-item--active' : ''}`}
              onClick={() => handleNav(item.id)}>
              <span className="dsh-nav-icon">{item.icon}</span>
              <span className="dsh-nav-label">{item.label}</span>
              {activeNav === item.id && <span className="dsh-nav-indicator"/>}
            </button>
          ))}
        </nav>

        <div className="dsh-sidebar-section-title" style={{ marginTop: 10 }}>ACCOUNT</div>
        <div className="dsh-sidebar-bottom">
          <button
            className={`dsh-nav-item ${activeNav==='profile'?'dsh-nav-item--active':''}`}
            onClick={() => handleNav('profile')}>
            <span className="dsh-nav-icon"><User size={16}/></span>
            <span className="dsh-nav-label">Profile</span>
            {activeNav==='profile' && <span className="dsh-nav-indicator"/>}
          </button>
          <button 
            className={`dsh-nav-item ${activeNav==='settings'?'dsh-nav-item--active':''}`} 
            onClick={() => handleNav('settings')}>
            <span className="dsh-nav-icon"><Settings size={16}/></span>
            <span className="dsh-nav-label">Settings</span>
            {activeNav==='settings' && <span className="dsh-nav-indicator"/>}
          </button>
          <button className="dsh-logout-btn" onClick={handleLogout}>
            <LogOut size={16}/> Sign out
          </button>
        </div>

        <div className="dsh-user-card" style={{ cursor:'pointer' }} onClick={() => handleNav('profile')}>
          <div className="dsh-user-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
          <div className="dsh-user-info">
            <p className="dsh-user-name">{user.fullName}</p>
            <p className="dsh-user-loc"><MapPin size={10}/>{user.location}</p>
          </div>
          <ChevronRight size={14} style={{ color:'#94A3B8', flexShrink:0 }}/>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <main className="dsh-main">
        <header className="dsh-topbar">
          {/* Mobile: brand logo left, current page title center */}
          <div className="dsh-topbar-mobile-brand">
            <div className="dsh-sidebar-logo-icon" style={{ width:28, height:28, borderRadius:8 }}><span className="font-extrabold text-[11px] tracking-tight text-[#16a34a]">KKD</span></div>
          </div>

          {/* Mobile page title / Desktop section titles */}
          <div className="dsh-topbar-header-titles">
            <p className="dsh-topbar-eyebrow">Good Evening 👋</p>
            <h1 className="dsh-topbar-title">
              {activeNav === 'dashboard' ? (isFarmer ? 'Farm Overview' : 'Buyer Dashboard') :
               activeNav === 'listings' ? 'My Crops' :
               activeNav.charAt(0).toUpperCase() + activeNav.slice(1).replace('_', ' ')}
            </h1>
          </div>

          {/* Mobile-only centered title */}
          <div className="dsh-topbar-mobile-title">
            {activeNav === 'dashboard' ? 'Home' :
             activeNav === 'listings' ? 'Crops' :
             activeNav.charAt(0).toUpperCase() + activeNav.slice(1).replace('_', ' ')}
          </div>

          <div className="dsh-topbar-right">
            <div className="dsh-topbar-search" ref={searchRef} style={{ position: 'relative' }}>
              <Search size={15} className="dsh-topbar-search-icon" />
              <input 
                placeholder="Search crops, orders, buyers..." 
                className="dsh-topbar-search-input" 
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              {searchFocused && globalSearch && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '320px', background: '#fff', borderRadius: '12px', padding: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 100, border: '1px solid #ece9e3', maxHeight: '400px', overflowY: 'auto' }}>
                  {getSearchResults().length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#8a9a84', fontSize: 13 }}>No results found</div>
                  ) : getSearchResults().map((r, i) => (
                    <div 
                      key={i} 
                      style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', cursor: 'pointer', borderRadius: '8px' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8faf7'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      onClick={() => {
                        handleNav(r.id);
                        setGlobalSearch('');
                        setSearchFocused(false);
                      }}
                    >
                      <span style={{ fontSize: 11, color: '#8a9a84', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{r.type}</span>
                      <span style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="dsh-notif-btn" aria-label="Settings" onClick={() => handleNav('settings')}>
              <Settings size={16}/>
            </button>
          </div>
        </header>

        <div key={activeNav} style={{ animation:'kkv2FadeUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
          {renderView()}
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      {/* Floating View Cart Capsule */}
      {cart.length > 0 && activeNav !== 'profile' && activeNav !== 'orders' && activeNav !== 'checkout' && activeNav !== 'order_success' && (
        <div 
          onClick={() => setActiveNav('orders')}
          style={{ position:'fixed', bottom: 84, left: '50%', transform: 'translateX(-50%)', background:'#166534', color:'#fff', width: 'calc(100% - 32px)', maxWidth: 400, padding:'14px 20px', borderRadius:9999, display:'flex', alignItems:'center', justifyContent: 'space-between', cursor:'pointer', boxShadow:'0 8px 24px rgba(22,101,52,0.4)', zIndex:99, animation: 'kkv2FadeUp 0.3s cubic-bezier(0.16,1,0.3,1)', boxSizing: 'border-box' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingCart size={18} />
            <span style={{ fontWeight: 600, fontSize: 15 }}>{cart.length} item{cart.length > 1 ? 's' : ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>View Cart</span>
            <ChevronRight size={18} />
          </div>
        </div>
      )}

      <nav className="dsh-bottom-nav" aria-label="Mobile navigation">
        {bottomNavItems.map(item => (
          <button
            key={item.id}
            className={`dsh-bottom-nav-btn ${activeNav === item.id ? 'dsh-bottom-nav-btn--active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            <span className="dsh-bottom-nav-icon">{item.icon}</span>
            <span className="dsh-bottom-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      {/* Beautiful Top-Right Floating Live Broadcast Toast */}
      {activeToast && (
        <div style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 99999,
          maxWidth: 380,
          width: 'calc(100vw - 48px)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid #16a34a',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(22, 163, 74, 0.15)',
          borderRadius: 20,
          padding: '16px 20px',
          animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start'
        }}>
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(120%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
          
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
          }}>
            <Megaphone size={20} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📢 Admin Broadcast
              </span>
              <span style={{ fontSize: 10, color: '#94a3b8' }}>
                {activeToast.createdAt ? new Date(activeToast.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
              </span>
            </div>
            <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
              {activeToast.title}
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.4, wordBreak: 'break-word' }}>
              {activeToast.message}
            </p>
          </div>

          <button
            onClick={() => setActiveToast(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: 4,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -4,
              marginRight: -4
            }}
            title="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
      {showRadarModal && <RadarScannerModal onClose={() => setShowRadarModal(false)} />}
    </div>
  );
}
