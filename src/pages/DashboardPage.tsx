import { useState, useRef, Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Leaf, LayoutDashboard, Package, ShoppingCart, TrendingUp,
  Users, Bell, Settings, LogOut, ChevronRight, ChevronDown, Plus,
  MapPin, Phone, Mail, Star, ArrowUpRight, ArrowDownRight,
  Wheat, Truck, CheckCircle2, Clock, BarChart3, Sprout,
  IndianRupee, Search, Filter, Download, Edit2, Trash2, Eye,
  User, Save, AlertCircle, Tractor, FileText, Calendar, Package2,
  MessageSquare, Sparkles, ArrowRight, Apple
} from 'lucide-react';

/* ═══════════════════════════ MOCK DATA ═══════════════════════════ */

type OrderStatus = 'processing' | 'dispatched' | 'delivered' | 'cancelled';
type ListingStatus = 'active' | 'sold' | 'pending';

interface FarmerListing {
  id: number; name: string; qty: string; price: string;
  status: ListingStatus; buyers: number; img: string; category: string; addedDate: string;
}
interface Order {
  id: string; buyer?: string; farmer?: string; item: string; amount: string;
  status: OrderStatus; time: string; eta?: string; loc?: string; qty: string; unitPrice: string;
}
interface BrowseProduce {
  id: number; name: string; farmer: string; loc: string; price: string;
  rating: number; qty: string; img: string; badge: string; category: string; phone: string;
}

const farmerListings: FarmerListing[] = [
  { id: 1, name: 'Fresh Tomatoes',      qty: '500 kg',  price: '₹28/kg', status: 'active',  buyers: 3, img: '', category: 'Vegetables', addedDate: '15 Jul 2026' },
  { id: 2, name: 'Organic Onions',      qty: '800 kg',  price: '₹22/kg', status: 'active',  buyers: 5, img: '', category: 'Vegetables', addedDate: '12 Jul 2026' },
  { id: 3, name: 'Green Chillies',      qty: '120 kg',  price: '₹60/kg', status: 'sold',    buyers: 1, img: '', category: 'Spices',     addedDate: '10 Jul 2026' },
  { id: 4, name: 'Wheat (Grade A)',     qty: '2000 kg', price: '₹24/kg', status: 'active',  buyers: 8, img: '', category: 'Grains',     addedDate: '8 Jul 2026'  },
  { id: 5, name: 'Brinjal (Aubergine)',qty: '300 kg',  price: '₹18/kg', status: 'pending', buyers: 0, img: '', category: 'Vegetables', addedDate: '6 Jul 2026'  },
];

const allFarmerOrders: Order[] = [
  { id: '#ORD-2841', buyer: 'Arjun Mehta',    item: 'Fresh Tomatoes',  amount: '₹5,600',  status: 'dispatched', time: '2h ago',  qty: '200 kg', unitPrice: '₹28/kg' },
  { id: '#ORD-2839', buyer: 'Green Basket Co.',item: 'Organic Onions', amount: '₹8,800',  status: 'delivered',  time: '1d ago',  qty: '400 kg', unitPrice: '₹22/kg' },
  { id: '#ORD-2835', buyer: 'FreshMart Pune', item: 'Wheat (Grade A)', amount: '₹24,000', status: 'processing', time: '2d ago',  qty: '1000 kg', unitPrice: '₹24/kg' },
  { id: '#ORD-2830', buyer: 'Hotel Meridian', item: 'Green Chillies',  amount: '₹4,800',  status: 'delivered',  time: '3d ago',  qty: '80 kg',  unitPrice: '₹60/kg' },
  { id: '#ORD-2825', buyer: 'D-Mart Nashik',  item: 'Fresh Tomatoes',  amount: '₹8,400',  status: 'delivered',  time: '5d ago',  qty: '300 kg', unitPrice: '₹28/kg' },
  { id: '#ORD-2819', buyer: 'Swiggy Instamart',item: 'Organic Onions', amount: '₹4,400',  status: 'cancelled',  time: '7d ago',  qty: '200 kg', unitPrice: '₹22/kg' },
];

const allBuyerOrders: Order[] = [
  { id: '#ORD-2841', farmer: 'Ramesh Patel',   item: 'Tomatoes',         amount: '₹5,600',  status: 'dispatched', time: '2h ago',  eta: 'Tomorrow',   loc: 'Nashik, MH',   qty: '200 kg', unitPrice: '₹28/kg' },
  { id: '#ORD-2836', farmer: 'Sunita Devi',    item: 'Wheat',            amount: '₹12,000', status: 'delivered',  time: '3d ago',  eta: 'Delivered',  loc: 'Amritsar, PB', qty: '500 kg', unitPrice: '₹24/kg' },
  { id: '#ORD-2829', farmer: 'Kishan Yadav',   item: 'Onions',           amount: '₹6,600',  status: 'processing', time: '4d ago',  eta: '3 days',     loc: 'Nashik, MH',   qty: '300 kg', unitPrice: '₹22/kg' },
  { id: '#ORD-2820', farmer: 'Priya Farms',    item: 'Brinjal',          amount: '₹1,800',  status: 'delivered',  time: '6d ago',  eta: 'Delivered',  loc: 'Pune, MH',     qty: '100 kg', unitPrice: '₹18/kg' },
  { id: '#ORD-2812', farmer: 'Devidas Gawde',  item: 'Alphonso Mangoes', amount: '₹9,000',  status: 'delivered',  time: '10d ago', eta: 'Delivered',  loc: 'Ratnagiri, MH',qty: '50 kg',  unitPrice: '₹180/kg' },
  { id: '#ORD-2801', farmer: 'Gurpreet Singh', item: 'Basmati Rice',     amount: '₹8,500',  status: 'cancelled',  time: '14d ago', eta: '—',          loc: 'Amritsar, PB', qty: '100 kg', unitPrice: '₹85/kg' },
];

const browseProduce: BrowseProduce[] = [
  { id:1,  name:'Alphonso Mangoes',       farmer:'Devidas Gawde',  loc:'Ratnagiri, MH',  price:'₹180/kg', rating:4.9, qty:'200 kg',  img:'', badge:'Premium',  category:'Fruits',      phone:'+91 94201 11222' },
  { id:2,  name:'Organic Basmati Rice',   farmer:'Gurpreet Singh', loc:'Amritsar, PB',   price:'₹85/kg',  rating:4.7, qty:'1000 kg', img:'', badge:'Organic',  category:'Grains',      phone:'+91 98760 22111' },
  { id:3,  name:'Cherry Tomatoes',        farmer:'Lakshmi Farms',  loc:'Coorg, KA',      price:'₹45/kg',  rating:4.8, qty:'150 kg',  img:'', badge:'Fresh',    category:'Vegetables',  phone:'+91 80001 33444' },
  { id:4,  name:'Turmeric Powder',        farmer:'Venkat Reddy',   loc:'Erode, TN',      price:'₹120/kg', rating:4.6, qty:'500 kg',  img:'', badge:'Spice',    category:'Spices',      phone:'+91 73001 44555' },
  { id:5,  name:'Fresh Spinach',          farmer:'Ravi Kumar',     loc:'Bengaluru, KA',  price:'₹30/kg',  rating:4.5, qty:'80 kg',   img:'', badge:'Fresh',    category:'Vegetables',  phone:'+91 99001 55666' },
  { id:6,  name:'A2 Desi Ghee',          farmer:'Meera Dairy',    loc:'Anand, GJ',      price:'₹600/kg', rating:4.9, qty:'50 kg',   img:'', badge:'Premium',  category:'Dairy',       phone:'+91 92001 66777' },
  { id:7,  name:'Black Pepper (Bold)',    farmer:'Jose Plantations',loc:'Wayanad, KL',    price:'₹550/kg', rating:4.8, qty:'200 kg',  img:'', badge:'Spice',    category:'Spices',      phone:'+91 87001 77888' },
  { id:8,  name:'Amla (Indian Gooseberry)',farmer:'Geeta Farms',   loc:'Pratapgarh, UP', price:'₹40/kg',  rating:4.4, qty:'300 kg',  img:'', badge:'Organic',  category:'Fruits',      phone:'+91 80501 88999' },
];

const connectedFarmers = [
  { id:1, name:'Ramesh Patel',    loc:'Nashik, MH',     crops:['Tomatoes','Onions','Chillies'], rating:4.9, orders:5,  totalSpent:'₹26,400', joined:'Feb 2026', phone:'+91 94201 11111', verified:true },
  { id:2, name:'Sunita Devi',     loc:'Amritsar, PB',   crops:['Wheat','Rice'],                  rating:4.7, orders:3,  totalSpent:'₹14,000', joined:'Mar 2026', phone:'+91 98760 22222', verified:true },
  { id:3, name:'Kishan Yadav',    loc:'Nashik, MH',     crops:['Onions','Potatoes'],             rating:4.5, orders:2,  totalSpent:'₹8,200',  joined:'Apr 2026', phone:'+91 73001 33333', verified:true },
  { id:4, name:'Priya Farms',     loc:'Pune, MH',       crops:['Brinjal','Capsicum'],            rating:4.6, orders:1,  totalSpent:'₹1,800',  joined:'May 2026', phone:'+91 80001 44444', verified:false },
  { id:5, name:'Devidas Gawde',   loc:'Ratnagiri, MH',  crops:['Mangoes','Cashews'],             rating:5.0, orders:1,  totalSpent:'₹9,000',  joined:'Jun 2026', phone:'+91 92001 55555', verified:true },
];

const connectedBuyers = [
  { id:1, name:'Arjun Mehta',     loc:'Mumbai, MH',     type:'Restaurant Owner', orders:5,  totalBought:'₹28,000', rating:4.8, joined:'Jan 2026' },
  { id:2, name:'Green Basket Co.',loc:'Pune, MH',        type:'Retailer',         orders:4,  totalBought:'₹22,000', rating:4.6, joined:'Feb 2026' },
  { id:3, name:'FreshMart Pune',  loc:'Pune, MH',        type:'Supermarket',      orders:3,  totalBought:'₹36,000', rating:4.9, joined:'Mar 2026' },
  { id:4, name:'Hotel Meridian',  loc:'Nashik, MH',      type:'Hotel',            orders:2,  totalBought:'₹9,600',  rating:4.5, joined:'Apr 2026' },
  { id:5, name:'D-Mart Nashik',   loc:'Nashik, MH',      type:'Supermarket',      orders:2,  totalBought:'₹16,800', rating:4.7, joined:'May 2026' },
];

const marketPrices = [
  { crop:'Tomato',  msp:'₹25/kg',  current:'₹28/kg', trend:'up'   },
  { crop:'Onion',   msp:'₹18/kg',  current:'₹22/kg', trend:'up'   },
  { crop:'Wheat',   msp:'₹21/kg',  current:'₹24/kg', trend:'up'   },
  { crop:'Rice',    msp:'₹30/kg',  current:'₹28/kg', trend:'down' },
  { crop:'Potato',  msp:'₹15/kg',  current:'₹13/kg', trend:'down' },
];

const monthlyRevenue = [
  { month:'Feb', amount:18400 }, { month:'Mar', amount:24200 }, { month:'Apr', amount:31500 },
  { month:'May', amount:27800 }, { month:'Jun', amount:39000 }, { month:'Jul', amount:43200 },
];

const monthlySpending = [
  { month:'Feb', amount:6400 }, { month:'Mar', amount:9800 }, { month:'Apr', amount:14200 },
  { month:'May', amount:7600 }, { month:'Jun', amount:19600 }, { month:'Jul', amount:26200 },
];

function MessagesView() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can we help you today?', time: '10:00 AM', sender: 'admin' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user'
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Simulate admin reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Thanks for reaching out! We've received your message and will get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'admin'
      }]);
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
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
        <div style={{ padding: '16px', borderTop: '1px solid #ece9e3', display: 'flex', gap: '12px' }}>
          <input 
            className="dsh-form-input" 
            placeholder="Type your message..." 
            style={{ flex: 1 }} 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="dsh-cta-btn" style={{ width: 'auto', padding: '0 20px' }} onClick={handleSend}>
            <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Order Delivered', body: 'Your order #ORD-2841 has been delivered.', time: '10 mins ago', type: 'success', icon: <Package size={16}/>, read: false },
    { id: 2, title: 'System Update', body: 'We have updated our terms of service.', time: '1 hour ago', type: 'info', icon: <Bell size={16}/>, read: false },
    { id: 3, title: 'New Message', body: 'Admin has replied to your query.', time: '2 hours ago', type: 'message', icon: <MessageSquare size={16}/>, read: true },
  ]);

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">
            Notifications 
            {unreadCount > 0 && <span style={{fontSize:12,background:'#ef4444',color:'#fff',padding:'2px 8px',borderRadius:20,marginLeft:8,verticalAlign:'middle'}}>{unreadCount} New</span>}
          </h1>
          <p className="dsh-page-sub">Stay updated with your account activity.</p>
        </div>
        {unreadCount > 0 && (
          <button className="dsh-ghost-btn dsh-ghost-btn--border" onClick={() => setNotifs(notifs.map(n => ({...n, read: true})))}>
            Mark all as read
          </button>
        )}
      </div>
      <div className="dsh-card">
        {notifs.length === 0 ? (
           <div style={{padding: 40, textAlign: 'center', color: '#8a9a84'}}>No notifications</div>
        ) : notifs.map((n, i) => (
          <div key={n.id} style={{ display: 'flex', gap: '16px', padding: '20px', background: n.read ? '#fff' : '#f8faf7', borderBottom: i === notifs.length - 1 ? 'none' : '1px solid #ece9e3' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: n.type === 'success' ? '#dcfce7' : n.type === 'info' ? '#e0f2fe' : '#f5f3ff', color: n.type === 'success' ? '#16a34a' : n.type === 'info' ? '#0284c7' : '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {n.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px', fontSize: 14, color: '#111827', fontWeight: n.read ? 600 : 800 }}>{n.title}</h4>
              <p style={{ margin: '0 0 8px', fontSize: 13, color: '#4b5563' }}>{n.body}</p>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>{n.time}</span>
            </div>
            {!n.read && <div style={{width:8,height:8,borderRadius:'50%',background:'#22c55e',marginTop:6, flexShrink: 0}} />}
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
  const steps = ['Processing', 'Confirmed', 'Dispatched', 'Delivered'];
  const idx = status === 'cancelled' ? -1 : ['processing', 'processing', 'dispatched', 'delivered'].indexOf(status);
  const activeStep = idx === -1 ? -1 : idx === 0 ? 0 : idx === 2 ? 2 : 3;
  if (status === 'cancelled') {
    return <div className="dsh-tracking"><p style={{ color: '#dc2626', fontSize: 13, margin: 0 }}>This order was cancelled.</p></div>;
  }
  return (
    <div className="dsh-tracking">
      {steps.map((s, i) => (
        <div key={s} className="dsh-tracking-step">
          <div className={`dsh-tracking-dot ${i <= activeStep ? 'dsh-tracking-dot--done' : ''}`}>
            {i <= activeStep ? <CheckCircle2 size={14} /> : <div className="dsh-tracking-dot-inner" />}
          </div>
          {i < steps.length - 1 && (
            <div className={`dsh-tracking-line ${i < activeStep ? 'dsh-tracking-line--done' : ''}`} />
          )}
          <span className={`dsh-tracking-label ${i <= activeStep ? 'dsh-tracking-label--done' : ''}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════ FARMER VIEWS ═══════════════════════════ */

/* Interactive SVG Revenue Curve Chart */
function RevenueLineChart({ data }: { data: { month: string; amount: number }[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(5);
  const [filter, setFilter] = useState('6M');
  const max = 50000;
  const min = 10000;
  
  const width = 580;
  const height = 135;
  const paddingX = 30;
  const paddingY = 18;
  
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
            <g key={i} className="dsh-chart-node" onMouseEnter={() => setHoverIdx(i)}>
              <circle cx={p.x} cy={p.y} r={hoverIdx === i ? "6" : "4"} fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.5" style={{ transition: 'all 0.2s' }} />
              {hoverIdx === i && (
                <circle cx={p.x} cy={p.y} r="10" fill="#16A34A" fillOpacity="0.18" />
              )}
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
            onMouseEnter={() => setHoverIdx(i)}
          >
            {p.month}
          </span>
        ))}
      </div>
    </div>
  );
}

function FarmerDashboardView({ onNavigate }: { onNavigate?: (navId: string) => void }) {
  return (
    <div className="dsh-content">

      {/* ── 3-COLUMN MAIN LAYOUT ── */}
      <div className="dsh-3col-grid">

        {/* LEFT & CENTER COLUMN (MAIN FEED) */}
        <div className="dsh-3col-main">

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
              <button className="dsh-hero-cta" onClick={() => onNavigate && onNavigate('listings')}>
                Manage Listings <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="dsh-stats-4col">
            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--green"><Sprout size={18} /></div>
                <span className="dsh-saas-growth">+1 this week</span>
              </div>
              <p className="dsh-saas-stat-num">4</p>
              <p className="dsh-saas-stat-label">Active Listings</p>
            </div>

            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--emerald"><IndianRupee size={18} /></div>
                <span className="dsh-saas-growth">+18% vs last month</span>
              </div>
              <p className="dsh-saas-stat-num">₹43,200</p>
              <p className="dsh-saas-stat-label">Monthly Revenue</p>
            </div>

            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--amber"><Package size={18} /></div>
                <span className="dsh-saas-status-tag dsh-saas-status-tag--amber">2 dispatch</span>
              </div>
              <p className="dsh-saas-stat-num">3</p>
              <p className="dsh-saas-stat-label">Pending Orders</p>
            </div>

            <div className="dsh-saas-stat">
              <div className="dsh-saas-stat-top">
                <div className="dsh-saas-icon-box dsh-saas-icon-box--blue"><Users size={18} /></div>
                <span className="dsh-saas-growth">+4 this month</span>
              </div>
              <p className="dsh-saas-stat-num">12</p>
              <p className="dsh-saas-stat-label">Active Buyers</p>
            </div>
          </div>

          {/* Interactive Revenue Line Chart */}
          <RevenueLineChart data={monthlyRevenue} />

          {/* Latest Orders Table Card */}
          <div className="dsh-saas-card">
            <div className="dsh-saas-card-header">
              <div>
                <h3 className="dsh-card-title">Latest Orders</h3>
                <p className="dsh-card-subtitle">Real-time order activity from registered buyers</p>
              </div>
              <button className="dsh-ghost-btn" onClick={() => onNavigate && onNavigate('orders')}>
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="dsh-orders-table-wrap">
              <table className="dsh-saas-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Produce Item</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFarmerOrders.slice(0, 4).map(o => (
                    <tr key={o.id}>
                      <td>
                        <div className="dsh-user-row-cell">
                          <div className="dsh-avatar-circle">{o.buyer!.charAt(0)}</div>
                          <div>
                            <p className="dsh-cell-name">{o.buyer}</p>
                            <p className="dsh-cell-sub">{o.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="dsh-cell-item">{o.item}</td>
                      <td style={{ fontWeight: 600 }}>{o.qty}</td>
                      <td className="dsh-cell-amount">{o.amount}</td>
                      <td><StatusBadge status={o.status} /></td>
                      <td>
                        <button className="dsh-table-action-btn" onClick={() => onNavigate && onNavigate('orders')}>
                          Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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

    </div>
  );
}


function FarmerListingsView() {
  const [listings, setListings] = useState<FarmerListing[]>(farmerListings);
  const [showAdd, setShowAdd] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newListing, setNewListing] = useState({ name:'', qty:'', price:'', category:'Vegetables', img:'🥦' });
  const [editId, setEditId] = useState<number | null>(null);

  const filtered = filterStatus === 'all' ? listings : listings.filter(l => l.status === filterStatus);

  const handleAdd = () => {
    if (!newListing.name || !newListing.qty || !newListing.price) return;
    setListings(prev => [...prev, {
      id: Date.now(), ...newListing, status: 'active', buyers: 0,
      addedDate: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
    }]);
    setNewListing({ name:'', qty:'', price:'', category:'Vegetables', img:'🥦' });
    setShowAdd(false);
  };

  const handleDelete = (id: number) => setListings(prev => prev.filter(l => l.id !== id));
  const toggleStatus = (id: number) => setListings(prev => prev.map(l =>
    l.id === id ? { ...l, status: l.status === 'active' ? 'sold' : 'active' as ListingStatus } : l
  ));

  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">My Listings</h1>
          <p className="dsh-page-sub">Manage your produce listings and inventory.</p>
        </div>
        <button className="dsh-cta-btn" onClick={() => setShowAdd(v => !v)}>
          <Plus size={16} />{showAdd ? 'Cancel' : 'Add New Listing'}
        </button>
      </div>

      {/* Add listing form */}
      {showAdd && (
        <div className="dsh-form-card">
          <h3 className="dsh-form-title">Add New Produce Listing</h3>
          <div className="dsh-form-grid">
            <div className="dsh-form-field">
              <label className="dsh-form-label">Produce Name</label>
              <input className="dsh-form-input" placeholder="e.g. Fresh Tomatoes"
                value={newListing.name} onChange={e => setNewListing(p => ({...p, name: e.target.value}))} />
            </div>
            <div className="dsh-form-field">
              <label className="dsh-form-label">Category</label>
              <select className="dsh-form-input" value={newListing.category}
                onChange={e => setNewListing(p => ({...p, category: e.target.value}))}>
                {['Vegetables','Fruits','Grains','Spices','Dairy'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="dsh-form-field">
              <label className="dsh-form-label">Available Quantity</label>
              <input className="dsh-form-input" placeholder="e.g. 500 kg"
                value={newListing.qty} onChange={e => setNewListing(p => ({...p, qty: e.target.value}))} />
            </div>
            <div className="dsh-form-field">
              <label className="dsh-form-label">Price per kg</label>
              <input className="dsh-form-input" placeholder="e.g. ₹28/kg"
                value={newListing.price} onChange={e => setNewListing(p => ({...p, price: e.target.value}))} />
            </div>
            <div className="dsh-form-field">
              <label className="dsh-form-label">Emoji Icon</label>
              <input className="dsh-form-input" placeholder="🥦" maxLength={4}
                value={newListing.img} onChange={e => setNewListing(p => ({...p, img: e.target.value}))} />
            </div>
          </div>
          <button className="dsh-cta-btn" style={{ marginTop: 16 }} onClick={handleAdd}>
            <Plus size={15} /> Add Listing
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div className="dsh-tab-bar">
        {['all','active','pending','sold'].map(s => (
          <button key={s} className={`dsh-tab ${filterStatus === s ? 'dsh-tab--active' : ''}`}
            onClick={() => setFilterStatus(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="dsh-tab-count">
              {s === 'all' ? listings.length : listings.filter(l => l.status === s).length}
            </span>
          </button>
        ))}
      </div>

      <div className="dsh-card">
        <div className="dsh-table-wrap">
          <table className="dsh-table">
            <thead><tr>
              <th>Produce</th><th>Category</th><th>Quantity</th>
              <th>Price</th><th>Added</th><th>Status</th><th>Buyers</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id}>
                  <td><div className="dsh-produce-cell">
                    <span className="dsh-produce-emoji"><ProduceIcon name={l.name} size={20} /></span><span>{l.name}</span>
                  </div></td>
                  <td><span className="dsh-category-tag">{l.category}</span></td>
                  <td>{l.qty}</td>
                  <td className="dsh-price-cell">{l.price}</td>
                  <td style={{ fontSize: 12, color: '#8a9a84' }}>{l.addedDate}</td>
                  <td><StatusBadge status={l.status} /></td>
                  <td><div className="dsh-buyers-cell"><Users size={13}/>{l.buyers}</div></td>
                  <td>
                    <div className="dsh-action-btns">
                      <button className="dsh-icon-btn dsh-icon-btn--green" title="Toggle status"
                        onClick={() => toggleStatus(l.id)}><Edit2 size={14}/></button>
                      <button className="dsh-icon-btn dsh-icon-btn--red" title="Delete"
                        onClick={() => handleDelete(l.id)}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TrackingView({ order, role, onBack }: { order: any; role: 'farmer'|'buyer'; onBack: () => void }) {
  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
         <div>
           <p className="dsh-page-eyebrow" onClick={onBack} style={{cursor:'pointer', color:'#166534', display:'flex', alignItems:'center', gap:4}}>
             <ChevronRight size={12} style={{ transform: 'rotate(180deg)' }}/> Back to Orders
           </p>
           <h1 className="dsh-page-title">Order Tracking</h1>
           <p className="dsh-page-sub">Order {order.id}</p>
         </div>
      </div>
      <div className="dsh-card" style={{ padding: '24px 32px' }}>
        <div style={{ display:'flex', gap:32, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:12, fontWeight:700, color:'#8a9a84', textTransform:'uppercase', letterSpacing:'0.5px', margin:'0 0 20px' }}>
              Timeline
            </p>
            <OrderTrackingTimeline status={order.status} />
          </div>
          <div style={{ minWidth:200, padding:'24px', background:'#f8faf7', borderRadius:12 }}>
            <p style={{ fontSize:12, fontWeight:700, color:'#8a9a84', textTransform:'uppercase', letterSpacing:'0.5px', margin:'0 0 16px' }}>
              Order Details
            </p>
            <div style={{ fontSize:14, display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:'#8a9a84' }}>Item</span> <strong>{order.item}</strong></div>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:'#8a9a84' }}>Unit Price</span> <strong>{order.unitPrice}</strong></div>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:'#8a9a84' }}>Quantity</span> <strong>{order.qty}</strong></div>
              <div style={{ height:1, background:'#ece9e3', margin:'4px 0' }}></div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:16 }}><span style={{ color:'#8a9a84' }}>Total</span> <strong style={{ color:'#166534' }}>{order.amount}</strong></div>
            </div>
          </div>
          {role === 'buyer' && order.status === 'delivered' && (
            <button className="dsh-ghost-btn dsh-ghost-btn--border" style={{ marginTop: 24 }}>
              <Download size={13}/> Download Invoice
            </button>
          )}
          {role === 'farmer' && order.status === 'processing' && (
            <button className="dsh-cta-btn" style={{ marginTop: 24, fontSize:13, padding:'9px 16px' }}>
              <Truck size={14}/> Mark as Dispatched
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OrdersView({ orders, role }: { orders: Order[]; role: 'farmer' | 'buyer' }) {
  const [filter, setFilter] = useState('all');
  const [trackingOrder, setTrackingOrder] = useState<any>(null);
  const [exportState, setExportState] = useState<'idle'|'loading'|'done'>('idle');
  const tabs = ['all', 'processing', 'dispatched', 'delivered', 'cancelled'];

  if (trackingOrder) {
    return <TrackingView order={trackingOrder} role={role} onBack={() => setTrackingOrder(null)} />;
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">{role === 'buyer' ? 'My Orders' : 'Received Orders'}</h1>
          <p className="dsh-page-sub">{role === 'buyer' ? 'Track your purchases from verified farmers.' : 'Manage all orders from buyers.'}</p>
        </div>
        <button 
          className="dsh-ghost-btn dsh-ghost-btn--border" 
          onClick={() => {
            setExportState('loading');
            setTimeout(() => {
              setExportState('done');
              setTimeout(() => setExportState('idle'), 2000);
            }, 1000);
          }}
        >
          {exportState === 'idle' ? <><Download size={14}/> Export CSV</> : 
           exportState === 'loading' ? 'Exporting...' : 'Exported!'}
        </button>
      </div>

      <div className="dsh-tab-bar">
        {tabs.map(t => (
          <button key={t} className={`dsh-tab ${filter === t ? 'dsh-tab--active' : ''}`}
            onClick={() => setFilter(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className="dsh-tab-count">
              {t === 'all' ? orders.length : orders.filter(o => o.status === t).length}
            </span>
          </button>
        ))}
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
                            {(role === 'buyer' ? o.farmer! : o.buyer!).charAt(0)}
                          </div>
                          <div>
                            <p style={{ margin:0, fontWeight:600, fontSize:13 }}>
                              {role === 'buyer' ? o.farmer : o.buyer}
                            </p>
                            {role === 'buyer' && o.loc && (
                              <p style={{ margin:0, fontSize:11, color:'#9aab94' }}>
                                <MapPin size={10} style={{ display:'inline', marginRight:2 }}/>{o.loc}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{o.item}</td>
                      <td>{o.qty}</td>
                      <td className="dsh-price-cell">{o.amount}</td>
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
                  {(role === 'buyer' ? o.farmer! : o.buyer!).charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin:0, fontWeight:700, fontSize:14, color:'#111827' }}>
                    {role === 'buyer' ? o.farmer : o.buyer}
                  </p>
                  <p style={{ margin:'2px 0 0', fontSize:12, color:'#64748b' }}>
                    {o.qty} • {o.item}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin:0, fontWeight:700, fontSize:14, color:'#166534' }}>{o.amount}</p>
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

function RevenueView() {
  const max = Math.max(...monthlyRevenue.map(d => d.amount));
  const categoryData = [
    { name:'Vegetables', pct:55, color:'#16a34a' },
    { name:'Grains',     pct:28, color:'#3b82f6' },
    { name:'Spices',     pct:17, color:'#f59e0b' },
  ];
  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">Revenue Analytics</h1>
          <p className="dsh-page-sub">Track your earnings and growth over time.</p>
        </div>
      </div>
      <div className="dsh-stats-grid">
        <StatCard icon={<IndianRupee size={20}/>} label="This Month"    value="₹43,200" trend="+18% vs last month" trendUp />
        <StatCard icon={<IndianRupee size={20}/>} label="Total (6 mo)" value="₹1,84,100" trend="All time high" trendUp />
        <StatCard icon={<TrendingUp size={20}/>}  label="Avg Order Val" value="₹9,200"  trend="+5% growth" trendUp />
        <StatCard icon={<Package size={20}/>}     label="Orders (6 mo)" value="20"      sub="Across 5 buyers" />
      </div>
      <div className="dsh-two-col">
        <div className="dsh-card dsh-card--span2">
          <div className="dsh-card-header">
            <h2 className="dsh-card-title">Monthly Revenue</h2>
            <span style={{ fontSize:12, color:'#8a9a84' }}>Feb – Jul 2026</span>
          </div>
          <div style={{ padding:'24px 28px' }}>
            <BarChart data={monthlyRevenue} />
          </div>
        </div>
        <div className="dsh-card">
          <div className="dsh-card-header"><h2 className="dsh-card-title">Revenue by Category</h2></div>
          <div style={{ padding:'20px' }}>
            {categoryData.map(c => (
              <div key={c.name} style={{ marginBottom:16 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'#2a3a26' }}>{c.name}</span>
                  <span style={{ fontSize:13, fontWeight:700, color: c.color }}>{c.pct}%</span>
                </div>
                <div style={{ height:8, background:'#f0ede8', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${c.pct}%`, background: c.color, borderRadius:4, transition:'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dsh-card">
          <div className="dsh-card-header"><h2 className="dsh-card-title">Top Buyers by Revenue</h2></div>
          <div className="dsh-orders-list">
            {connectedBuyers.slice(0,4).map((b,i) => (
              <div key={b.id} className="dsh-order-row">
                <span style={{ fontSize:13, fontWeight:700, color:'#b0a89f', width:20 }}>#{i+1}</span>
                <div className="dsh-order-avatar">{b.name.charAt(0)}</div>
                <div className="dsh-order-info">
                  <p className="dsh-order-name">{b.name}</p>
                  <p className="dsh-order-item">{b.orders} orders</p>
                </div>
                <p className="dsh-order-amount">{b.totalBought}</p>
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
  const offset = circ - (pct / 100) * circ;
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
  const offset = circ - (pct / 100) * circ;
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

function BuyerDashboardView() {
  const [btnStates, setBtnStates] = useState<Record<string, string>>({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const analyticsRings = [
    { label: 'Vegetables', value: '₹11,004', pct: 62, color: '#166534' },
    { label: 'Grains',     value: '₹8,122',  pct: 45, color: '#16a34a', dashed: true },
    { label: 'Fruits',     value: '₹4,978',  pct: 28, color: '#4ade80' },
    { label: 'Spices',     value: '₹2,096',  pct: 15, color: '#86efac', dashed: true },
  ];

  const freshPicks = [
    { name: 'Alphonso Mangoes',   farmer: 'Devidas Gawde',  price: '₹180/kg', status: 'New',      img: '🥭' },
    { name: 'Organic Basmati',    farmer: 'Gurpreet Singh', price: '₹85/kg',  status: 'Reorder',  img: '🍚' },
    { name: 'Cherry Tomatoes',    farmer: 'Lakshmi Farms',  price: '₹45/kg',  status: 'Low Stock', img: '🍅' },
    { name: 'Turmeric Powder',    farmer: 'Venkat Reddy',   price: '₹120/kg', status: 'New',      img: '🌿' },
    { name: 'A2 Desi Ghee',       farmer: 'Meera Dairy',    price: '₹600/kg', status: 'Seasonal', img: '🫙' },
  ];

  const pickStatusCls: Record<string, string> = {
    'New':      'dsh-pick-tag--green',
    'Reorder':  'dsh-pick-tag--blue',
    'Low Stock':'dsh-pick-tag--amber',
    'Seasonal': 'dsh-pick-tag--purple',
  };

  const reminder = {
    title: 'Fresh stock from Ramesh Patel',
    detail: 'New batch of 500 kg tomatoes available · Nashik, MH',
    time: 'Today, 4:30 PM',
  };

  return (
    <div className="dsh-content">

      {/* ── Header ── */}
      <div className="dsh-page-header">
        <div>
          <p className="dsh-page-eyebrow">Agri marketplace status at a glance</p>
          <h1 className="dsh-page-title">Dashboard</h1>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className="dsh-cta-btn" onClick={() => setShowOrderModal(true)}>
            {btnStates['order'] === 'loading' ? 'Processing...' : btnStates['order'] || <><Plus size={15}/> Place Order</>}
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".csv, .xlsx, .json" />
          <button className="dsh-ghost-btn dsh-ghost-btn--border" style={{ background:'#fff' }} onClick={() => fileInputRef.current?.click()}>
            {btnStates['import'] === 'loading' ? 'Importing...' : btnStates['import'] || <><Download size={14}/> Import Data</>}
          </button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="dsh-donz-stats">
        <div className="dsh-donz-stat dsh-donz-stat--accent">
          <p className="dsh-donz-label">Total Orders</p>
          <h2 className="dsh-donz-value">24</h2>
          <div className="dsh-donz-sub">
            <ArrowUpRight size={13}/> 4 new this month
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">Delivered Orders</p>
          <h2 className="dsh-donz-value">10</h2>
          <div className="dsh-donz-sub dsh-donz-sub--up">
            <ArrowUpRight size={13}/> Increased from last month
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">In Transit</p>
          <h2 className="dsh-donz-value">12</h2>
          <div className="dsh-donz-sub dsh-donz-sub--up">
            <ArrowUpRight size={13}/> Increased this month
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">Processing</p>
          <h2 className="dsh-donz-value">4</h2>
          <div className="dsh-donz-sub" style={{ color:'#a0988f' }}>On Queue</div>
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
              <CircularProgress pct={78} />
              <div className="dsh-progress-legend">
                <div className="dsh-legend-item">
                  <span className="dsh-legend-dot" style={{ background:'#166534' }} />
                  <span>Delivered</span>
                  <strong>10</strong>
                </div>
                <div className="dsh-legend-item">
                  <span className="dsh-legend-dot" style={{ background:'#86efac' }} />
                  <span>In Transit</span>
                  <strong>12</strong>
                </div>
                <div className="dsh-legend-item">
                  <span className="dsh-legend-dot" style={{ background:'#f0ede8', border:'1px solid #d0ccc6' }} />
                  <span>Pending</span>
                  <strong>4</strong>
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

      {showOrderModal && (
        <div className="dsh-modal-overlay" onClick={() => setShowOrderModal(false)} style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div className="dsh-modal" onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:16, width:'100%', maxWidth:400, padding:24, boxShadow:'0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin:'0 0 16px 0', fontSize:18, color:'#111827' }}>Place New Order</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:'#4b5563', marginBottom:4, display:'block' }}>Select Crop</label>
                <select className="dsh-form-input">
                  <option>Fresh Tomatoes</option>
                  <option>Alphonso Mangoes</option>
                  <option>Organic Basmati</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:'#4b5563', marginBottom:4, display:'block' }}>Quantity (kg)</label>
                <input type="number" className="dsh-form-input" placeholder="e.g. 50" />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:'#4b5563', marginBottom:4, display:'block' }}>Delivery Address</label>
                <input type="text" className="dsh-form-input" placeholder="Enter delivery location" />
              </div>
            </div>
            <div style={{ display:'flex', gap:10, marginTop:24 }}>
              <button className="dsh-ghost-btn" style={{ flex:1 }} onClick={() => setShowOrderModal(false)}>Cancel</button>
              <button className="dsh-cta-btn" style={{ flex:1 }} onClick={() => {
                handleAction('order', 'Order Placed!');
                setShowOrderModal(false);
              }}>Confirm Order</button>
            </div>
          </div>
        </div>
      )}

      {showListingModal && (
        <div className="dsh-modal-overlay" onClick={() => setShowListingModal(false)} style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div className="dsh-modal" onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:16, width:'100%', maxWidth:400, padding:24, boxShadow:'0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
              <div>
                <h3 style={{ margin:'0 0 4px 0', fontSize:18, color:'#111827' }}>{reminder.title}</h3>
                <p style={{ margin:0, fontSize:13, color:'#8a9a84' }}><Sprout size={12} style={{ display:'inline', marginRight:4 }}/> Ramesh Patel · Nashik, MH</p>
              </div>
              <div style={{ background:'#f0fdf4', color:'#166534', padding:'4px 8px', borderRadius:8, fontSize:12, fontWeight:600 }}>Available</div>
            </div>
            <div style={{ background:'#f8faf7', borderRadius:8, padding:16, marginBottom:20 }}>
              <p style={{ margin:'0 0 12px 0', fontSize:14, color:'#4b5563', lineHeight:1.5 }}>{reminder.detail}</p>
              <div style={{ display:'flex', justifyContent:'space-between', borderTop:'1px solid #ece9e3', paddingTop:12 }}>
                <div>
                  <span style={{ fontSize:11, color:'#8a9a84', display:'block' }}>Price</span>
                  <span style={{ fontSize:14, fontWeight:600, color:'#111827' }}>₹40 / kg</span>
                </div>
                <div>
                  <span style={{ fontSize:11, color:'#8a9a84', display:'block' }}>Minimum Order</span>
                  <span style={{ fontSize:14, fontWeight:600, color:'#111827' }}>50 kg</span>
                </div>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button className="dsh-ghost-btn" style={{ flex:1 }} onClick={() => setShowListingModal(false)}>Close</button>
              <button className="dsh-cta-btn" style={{ flex:1 }} onClick={() => {
                setShowListingModal(false);
                setShowOrderModal(true);
              }}>Order Now</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}



function BrowseView() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy'];
  const filtered = browseProduce.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchQ = p.name.toLowerCase().includes(search.toLowerCase()) || p.farmer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });
  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">Browse Produce</h1>
          <p className="dsh-page-sub">Fresh, verified produce from farmers across India.</p>
        </div>
      </div>
      <div className="dsh-category-pills">
        {categories.map(c => (
          <button key={c} className={`dsh-pill ${category === c ? 'dsh-pill--active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      <div className="dsh-produce-grid dsh-produce-grid--wide">
        {filtered.map(p => (
          <div key={p.id} className="dsh-produce-card">
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
              <div className="dsh-produce-footer">
                <div>
                  <p className="dsh-produce-price">{p.price}</p>
                  <p className="dsh-produce-qty">{p.qty} available</p>
                </div>
                <div className="dsh-produce-meta">
                  <div className="dsh-produce-rating"><Star size={11} fill="currentColor"/>{p.rating}</div>
                  <button className="dsh-order-btn">Order Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ gridColumn:'1/-1' }} className="dsh-empty-state"><Search size={36}/><p>No produce found.</p></div>}
      </div>
    </div>
  );
}

function FarmersView() {
  const [search, setSearch] = useState('');
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
              {f.crops.map(c => (
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
  const categories = [
    { name:'Vegetables', pct:42, color:'#16a34a', amt:'₹11,004' },
    { name:'Grains',     pct:31, color:'#3b82f6', amt:'₹8,122'  },
    { name:'Fruits',     pct:19, color:'#f59e0b', amt:'₹4,978'  },
    { name:'Spices',     pct:8,  color:'#ec4899', amt:'₹2,096'  },
  ];
  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">Spending Analytics</h1>
          <p className="dsh-page-sub">Understand where your money goes.</p>
        </div>
      </div>
      <div className="dsh-stats-grid">
        <StatCard icon={<IndianRupee size={20}/>} label="This Month"    value="₹26,200" trend="+34% vs last month" trendUp />
        <StatCard icon={<IndianRupee size={20}/>} label="Total (6 mo)" value="₹83,900" sub="Across all orders" />
        <StatCard icon={<TrendingUp size={20}/>}  label="Avg Order Val" value="₹4,994"  trend="+8% growth" trendUp />
        <StatCard icon={<Truck size={20}/>}       label="Total Orders"  value="21"      sub="All time" />
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
            {connectedFarmers.slice(0,4).map((f,i) => (
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

function ProfileView() {
  const { user, updateProfile } = useAuth();
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
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return null;
  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });

  return (
    <div className="dsh-content">
      <div className="dsh-page-header">
        <div>
          <h1 className="dsh-page-title">My Profile</h1>
          <p className="dsh-page-sub">Manage your account information.</p>
        </div>
        {!editing ? (
          <button className="dsh-cta-btn" onClick={() => setEditing(true)}>
            <Edit2 size={15}/> Edit Profile
          </button>
        ) : (
          <div style={{ display:'flex', gap:10 }}>
            <button className="dsh-ghost-btn dsh-ghost-btn--border" onClick={() => { setEditing(false); setForm({ fullName:user.fullName, mobile:user.mobile, location:user.location, landSurveyNumber:user.landSurveyNumber??'' }); }}>
              Cancel
            </button>
            <button className="dsh-cta-btn" onClick={handleSave}>
              <Save size={15}/> Save Changes
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div className="dsh-success-banner">
          <CheckCircle2 size={16}/>
          Profile updated successfully!
        </div>
      )}

      <div className="dsh-two-col">
        {/* Profile card — full width */}
        <div className="dsh-card dsh-card--span2">
          <div style={{ padding:'28px', display:'flex', gap:24, alignItems:'center', borderBottom:'1px solid #f0ede8', flexWrap:'wrap' }}>
            <div className="dsh-profile-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
            <div>
              <h2 style={{ fontFamily:'Fraunces,Georgia,serif', fontSize:22, fontWeight:800, color:'#0a1a08', margin:'0 0 4px', letterSpacing:'-0.5px' }}>
                {user.fullName}
              </h2>
              <p style={{ fontSize:13, color:'#8a9a84', margin:'0 0 8px' }}>{user.email}</p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <span className={`dsh-role-chip dsh-role-chip--${user.role}`}>
                  {user.role === 'farmer' ? <Wheat size={11}/> : <ShoppingCart size={11}/>}
                  {user.role === 'farmer' ? 'Farmer Account' : 'Buyer Account'}
                </span>
                <span style={{ fontSize:11, color:'#b0a89f', alignSelf:'center' }}>
                  <Calendar size={11} style={{display:'inline',marginRight:4}}/>Member since {joinDate}
                </span>
              </div>
            </div>
          </div>
          <div style={{ padding:'24px 28px' }}>
            <h3 style={{ fontSize:13, fontWeight:700, color:'#8a9a84', textTransform:'uppercase', letterSpacing:'0.6px', margin:'0 0 20px' }}>
              Account Details
            </h3>
            <div className="dsh-form-grid">
              <div className="dsh-form-field">
                <label className="dsh-form-label"><User size={13}/> Full Name</label>
                {editing
                  ? <input className="dsh-form-input" value={form.fullName} onChange={e => setForm(p=>({...p,fullName:e.target.value}))}/>
                  : <p className="dsh-profile-value">{user.fullName}</p>}
              </div>
              <div className="dsh-form-field">
                <label className="dsh-form-label"><Mail size={13}/> Email Address</label>
                <p className="dsh-profile-value dsh-profile-value--muted">{user.email} <span style={{fontSize:10,background:'#f0ede8',padding:'2px 6px',borderRadius:20,marginLeft:4}}>Cannot change</span></p>
              </div>
              <div className="dsh-form-field">
                <label className="dsh-form-label"><Phone size={13}/> Mobile Number</label>
                {editing
                  ? <input className="dsh-form-input" value={form.mobile} onChange={e => setForm(p=>({...p,mobile:e.target.value}))}/>
                  : <p className="dsh-profile-value">{user.mobile}</p>}
              </div>
              <div className="dsh-form-field">
                <label className="dsh-form-label"><MapPin size={13}/> {user.role==='farmer'?'Farm Address':'City'}</label>
                {editing
                  ? <input className="dsh-form-input" value={form.location} onChange={e => setForm(p=>({...p,location:e.target.value}))}/>
                  : <p className="dsh-profile-value">{user.location}</p>}
              </div>
              {user.role === 'farmer' && (
                <div className="dsh-form-field">
                  <label className="dsh-form-label"><FileText size={13}/> Land Survey Number</label>
                  {editing
                    ? <input className="dsh-form-input" value={form.landSurveyNumber} onChange={e => setForm(p=>({...p,landSurveyNumber:e.target.value}))}/>
                    : <p className="dsh-profile-value">{user.landSurveyNumber || '—'}</p>}
                </div>
              )}
              <div className="dsh-form-field">
                <label className="dsh-form-label"><Calendar size={13}/> Joined</label>
                <p className="dsh-profile-value">{joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account stats */}
        <div className="dsh-card">
          <div className="dsh-card-header"><h2 className="dsh-card-title">Account Summary</h2></div>
          <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { label: user.role==='farmer' ? 'Active Listings' : 'Total Orders', value: user.role==='farmer' ? '4' : '6' },
              { label: user.role==='farmer' ? 'Total Revenue' : 'Total Spent', value: user.role==='farmer' ? '₹1,84,100' : '₹83,900' },
              { label: user.role==='farmer' ? 'Total Buyers' : 'Farmers Connected', value: user.role==='farmer' ? '12' : '8' },
              { label: 'Member Status', value: 'Verified' },
            ].map(s => (
              <div key={s.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:12, borderBottom:'1px solid #f5f2ee' }}>
                <span style={{ fontSize:13, color:'#8a9a84' }}>{s.label}</span>
                <span style={{ fontSize:14, fontWeight:700, color:'#0a1a08' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="dsh-card">
          <div className="dsh-card-header"><h2 className="dsh-card-title">Security</h2></div>
          <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderBottom:'1px solid #f5f2ee' }}>
              <div>
                <p style={{ margin:0, fontSize:13, fontWeight:600, color:'#2a3a26' }}>Password</p>
                <p style={{ margin:0, fontSize:12, color:'#8a9a84' }}>Last changed: never</p>
              </div>
              <button className="dsh-ghost-btn dsh-ghost-btn--border">Change</button>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0' }}>
              <div>
                <p style={{ margin:0, fontSize:13, fontWeight:600, color:'#2a3a26' }}>Two-Factor Auth</p>
                <p style={{ margin:0, fontSize:12, color:'#8a9a84' }}>Add extra security</p>
              </div>
              <button className="dsh-ghost-btn dsh-ghost-btn--border">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ SIDEBAR + SHELL ═══════════════════════════ */

const farmerNav = [
  { icon:<LayoutDashboard size={16}/>, label:'Dashboard', id:'dashboard' },
  { icon:<Package size={16}/>,         label:'My Listings', id:'listings' },
  { icon:<ShoppingCart size={16}/>,    label:'Orders',     id:'orders'   },
  { icon:<IndianRupee size={16}/>,     label:'Revenue',    id:'revenue'  },
  { icon:<Users size={16}/>,           label:'Buyers',     id:'buyers'   },
];

const buyerNav = [
  { icon:<LayoutDashboard size={16}/>, label:'Dashboard', id:'dashboard' },
  { icon:<ShoppingCart size={16}/>,    label:'My Orders', id:'orders'   },
  { icon:<Package size={16}/>,         label:'Browse',    id:'browse'   },
  { icon:<Users size={16}/>,           label:'Farmers',   id:'farmers'  },
  { icon:<TrendingUp size={16}/>,      label:'Spending',  id:'spending' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  
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
      allFarmerOrders.forEach(o => {
        if (o.id.toLowerCase().includes(query) || o.buyer?.toLowerCase().includes(query) || o.item.toLowerCase().includes(query)) {
          results.push({ type: 'Order', label: `${o.id} - ${o.item} (${o.buyer})`, id: 'orders' });
        }
      });
      farmerListings.forEach(l => {
        if (l.name.toLowerCase().includes(query)) {
          results.push({ type: 'Listing', label: l.name, id: 'listings' });
        }
      });
    } else {
      allBuyerOrders.forEach(o => {
        if (o.id.toLowerCase().includes(query) || o.farmer?.toLowerCase().includes(query) || o.item.toLowerCase().includes(query)) {
          results.push({ type: 'Order', label: `${o.id} - ${o.item} (${o.farmer})`, id: 'orders' });
        }
      });
    }
    return results.slice(0, 8);
  };

  if (!user) return null;

  const isFarmer = user.role === 'farmer';
  const navItems = isFarmer ? farmerNav : buyerNav;

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleNav = (id: string) => { setActiveNav(id); };

  const renderView = () => {
    if (activeNav === 'profile') return <ProfileView />;
    if (activeNav === 'messages') return <MessagesView />;
    if (activeNav === 'notifications') return <NotificationsView />;
    if (isFarmer) {
      switch (activeNav) {
        case 'dashboard': return <FarmerDashboardView onNavigate={handleNav} />;
        case 'listings':  return <FarmerListingsView />;
        case 'orders':    return <OrdersView orders={allFarmerOrders} role="farmer" />;
        case 'revenue':   return <RevenueView />;
        case 'buyers':    return <BuyersView />;
        default:          return <FarmerDashboardView onNavigate={handleNav} />;
      }
    } else {
      switch (activeNav) {
        case 'dashboard': return <BuyerDashboardView />;
        case 'orders':    return <OrdersView orders={allBuyerOrders} role="buyer" />;
        case 'browse':    return <BrowseView />;
        case 'farmers':   return <FarmersView />;
        case 'spending':  return <SpendingView />;
        default:          return <BuyerDashboardView />;
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
          <div className="dsh-sidebar-logo-icon"><Leaf size={16} strokeWidth={2.5}/></div>
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
          <button className="dsh-nav-item" onClick={() => handleNav('profile')}>
            <span className="dsh-nav-icon"><Settings size={16}/></span>
            <span className="dsh-nav-label">Settings</span>
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
            <div className="dsh-sidebar-logo-icon" style={{ width:28, height:28, borderRadius:8 }}><Leaf size={14} strokeWidth={2.5}/></div>
          </div>

          {/* Mobile page title / Desktop section titles */}
          <div className="dsh-topbar-header-titles">
            <p className="dsh-topbar-eyebrow">Good Evening 👋</p>
            <h1 className="dsh-topbar-title">
              {activeNav === 'dashboard' ? (isFarmer ? 'Farm Overview' : 'Buyer Dashboard') :
               activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
            </h1>
          </div>

          {/* Mobile-only centered title */}
          <div className="dsh-topbar-mobile-title">
            {activeNav === 'dashboard' ? (isFarmer ? 'Farm Overview' : 'Dashboard') :
             activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
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

            <button className="dsh-notif-btn" aria-label="Messages" onClick={() => handleNav('messages')}>
              <MessageSquare size={18}/>
            </button>

            <button className="dsh-notif-btn" aria-label="Notifications" onClick={() => handleNav('notifications')}>
              <Bell size={18}/><span className="dsh-notif-dot"/>
            </button>

            {/* User profile removed from topbar */}
          </div>
        </header>

        <div key={activeNav} style={{ animation:'kkv2FadeUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
          {renderView()}
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="dsh-bottom-nav" aria-label="Mobile navigation">
        {bottomNavItems.map(item => (
          <button
            key={item.id}
            className={`dsh-bottom-nav-btn ${activeNav === item.id ? 'dsh-bottom-nav-btn--active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            <span className="dsh-bottom-nav-icon">{item.icon}</span>
            <span className="dsh-bottom-nav-label">{item.label}</span>
            {activeNav === item.id && <span className="dsh-bottom-nav-pip" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
