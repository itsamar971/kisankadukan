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
  MessageSquare, Sparkles, ArrowRight, Apple, Target, Zap, Shield, Home
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
    <div className="flex flex-col font-['Outfit',sans-serif] pb-24 w-full">
      <div className="px-6 py-6 max-w-4xl mx-auto w-full">
        <h2 className="text-[26px] font-extrabold text-[#001f3f] tracking-tight mb-1">My Listings</h2>
        <p className="text-[#8a9a84] text-[15px] mb-8 font-medium">Manage your produce listings and inventory.</p>

        <button 
          onClick={() => setShowAdd(v => !v)}
          className="w-full bg-[#16a34a] text-white rounded-[16px] py-4 font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-[#15803d] transition-all active:scale-[0.98] mb-8 shadow-sm"
        >
          <Plus size={18} strokeWidth={2.5} /> {showAdd ? 'Cancel' : 'Add New Listing'}
        </button>

        {/* Add Form */}
        {showAdd && (
          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] mb-8 animate-[kkv2FadeUp_0.3s_ease]">
            <h3 className="text-lg font-bold text-[#001f3f] mb-5">Add New Produce</h3>
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
              Save Listing
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

function TrackingView({ order, role, onBack }: { order: any; role: 'farmer'|'buyer'; onBack: () => void }) {
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
                <strong style={{ color: '#0f172a' }}>{order.item}</strong>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
                <span style={{ color:'#64748b' }}>Unit Price</span> 
                <strong style={{ color: '#0f172a' }}>{order.unitPrice || '—'}</strong>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
                <span style={{ color:'#64748b' }}>Quantity</span> 
                <strong style={{ color: '#0f172a' }}>{order.qty}</strong>
              </div>
              
              <div style={{ height:1, background:'#e2e8f0', margin:'4px 0' }}></div>
              
              <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center', fontSize: 18 }}>
                <span style={{ color:'#64748b', fontWeight: 500 }}>Total</span> 
                <strong style={{ color:'#166534', fontWeight: 800 }}>{order.amount}</strong>
              </div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0', opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.3s' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={18} color="#166534" /> Shipping Info
            </h3>
            <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              <strong>KisanKadu Logistics Hub</strong><br />
              Plot 45, Phase 2, Industrial Area<br />
              Maharashtra, 411057<br />
              <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
                <button className="dsh-ghost-btn" style={{ padding: '8px 12px', fontSize: 13, background: '#fff', border: '1px solid #e2e8f0' }}>
                  <Phone size={14} /> Call Driver
                </button>
              </div>
            </div>
          </div>

          {role === 'buyer' && order.status === 'delivered' && (
            <button className="dsh-cta-btn" style={{ width: '100%', padding: '14px', borderRadius: 16, opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.4s' }}>
              <Download size={16}/> Download Full Invoice
            </button>
          )}
          {role === 'farmer' && order.status === 'processing' && (
            <button className="dsh-cta-btn" style={{ width: '100%', padding: '14px', borderRadius: 16, opacity: 0, animation: 'kkv2FadeUp 0.5s ease forwards 0.4s' }}>
              <Truck size={16}/> Mark as Dispatched
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

function OrdersView({ orders, role, isEmbedded }: { orders: Order[]; role: 'farmer' | 'buyer', isEmbedded?: boolean }) {
  const [filter, setFilter] = useState('all');
  const [trackingOrder, setTrackingOrder] = useState<any>(null);
  const [exportState, setExportState] = useState<'idle'|'loading'|'done'>('idle');
  const tabs = ['all', 'processing', 'dispatched', 'delivered', 'cancelled'];

  if (trackingOrder) {
    return <TrackingView order={trackingOrder} role={role} onBack={() => setTrackingOrder(null)} />;
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
  const categoryData = [
    { name:'Vegetables', pct:55, color:'#16a34a' },
    { name:'Grains',     pct:28, color:'#3b82f6' },
    { name:'Spices',     pct:17, color:'#f59e0b' },
  ];

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
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">₹43,200</h3>
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
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">₹1,84,100</h3>
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
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">₹9,200</h3>
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
            <h3 className="text-[20px] font-extrabold text-[#111827] mb-4">20</h3>
            <p className="text-[#9ca3af] text-[11px] font-medium leading-[1.3]">
              Across 5 buyers
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

function BuyerDashboardView({ onCheckout, onProductClick, onBrowse }: { onCheckout?: (item?: any) => void, onProductClick?: (item: any) => void, onBrowse?: () => void }) {
  const [btnStates, setBtnStates] = useState<Record<string, string>>({});
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
          <h2 className="dsh-donz-value">24</h2>
          <div className="dsh-donz-sub">
            <ArrowUpRight size={13}/> 4 new this month
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">Delivered Orders</p>
          <h2 className="dsh-donz-value">10</h2>
          <div className="dsh-donz-sub dsh-donz-sub--up">
            <ArrowUpRight size={13}/> Increased
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">In Transit</p>
          <h2 className="dsh-donz-value">12</h2>
          <div className="dsh-donz-sub dsh-donz-sub--up">
            <ArrowUpRight size={13}/> Increased
          </div>
        </div>
        <div className="dsh-donz-stat">
          <p className="dsh-donz-label">Processing</p>
          <h2 className="dsh-donz-value">4</h2>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 8 }}>
                <span style={{ fontWeight: 600, color: '#166534' }}>{product.price}</span>
                <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 2, background: '#f0fdf4', color: '#166534', padding: '2px 6px', borderRadius: 10 }}><Star size={10} fill="currentColor"/> {product.rating}</span>
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

    </div>
  );
}

function ProductDetailsView({ product, onBack, onAddToCart, onRemoveFromCart, cart }: { product: any, onBack: () => void, onAddToCart: (product: any) => void, onRemoveFromCart?: (product: any) => void, cart?: any[] }) {
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
              <p style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, color: '#166534' }}>{product.price}</p>
            </div>
            <div style={{ flex: '1 1 auto', minWidth: 100 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#8a9a84' }}>Available Quantity</p>
              <p style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 600, color: '#111827' }}>{product.qty || '1000 kg'}</p>
            </div>
            <div style={{ flex: '1 1 auto', minWidth: 100 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#8a9a84' }}>Rating</p>
              <p style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: 4 }}><Star size={16} fill="#eab308" color="#eab308" /> {product.rating || '4.5'}</p>
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
              <button onClick={() => onAddToCart(product)} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 10, color:'#111827', cursor:'pointer', fontSize:24, fontWeight:400, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          ) : (
            <button className="dsh-cta-btn" style={{ width: '100%', padding: '16px 24px', fontSize: 16, justifyContent: 'center' }} onClick={() => onAddToCart(product)}>
              <ShoppingCart size={18}/> Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* RATINGS & REVIEWS */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: '0 0 16px 0' }}>Ratings & Reviews</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: '#111827' }}>{product.rating || '4.5'}</div>
          <div>
            <div style={{ display: 'flex', color: '#eab308' }}><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#8a9a84' }}>Based on 128 reviews</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ borderBottom: '1px solid #f0ede8', paddingBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Rahul Sharma</span>
              <span style={{ color: '#8a9a84', fontSize: 12 }}>2 days ago</span>
            </div>
            <div style={{ display: 'flex', color: '#eab308', marginBottom: 8 }}><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
            <p style={{ margin: 0, fontSize: 14, color: '#4b5563' }}>Excellent quality and very fresh. Will definitely order again in bulk for my store.</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Priya Patel</span>
              <span style={{ color: '#8a9a84', fontSize: 12 }}>1 week ago</span>
            </div>
            <div style={{ display: 'flex', color: '#eab308', marginBottom: 8 }}><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
            <p style={{ margin: 0, fontSize: 14, color: '#4b5563' }}>Good produce, delivery was a bit late but the items were perfectly fine.</p>
          </div>
        </div>
      </div>

      {/* SUGGESTED PRODUCTS */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Suggested Products</h2>
        </div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, paddingLeft: 4, paddingRight: 4 }}>
          {browseProduce.filter((p: any) => p.id !== product.id).slice(0, 4).map((p: any) => (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 8 }}>
                <span style={{ fontWeight: 600, color: '#166534', fontSize: 14 }}>{p.price}</span>
                <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 2, background: '#f0fdf4', color: '#166534', padding: '2px 6px', borderRadius: 10 }}><Star size={10} fill="currentColor"/> {p.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function CartView({ cart, onCheckout, onBack, onAddToCart, onRemoveFromCart, isEmbedded }: { cart: any[], onCheckout: () => void, onBack: () => void, onAddToCart?: (product: any) => void, onRemoveFromCart?: (product: any) => void, isEmbedded?: boolean }) {
  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, item) => {
    const priceStr = item.price.replace(/[^0-9]/g, '');
    return acc + (parseInt(priceStr, 10) || 0) * 50;
  }, 0);

  const uniqueCart = Array.from(new Map(cart.map(item => [item.id, item])).values());

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
            {uniqueCart.map((item, idx) => {
              const qty = cart.filter(c => c.id === item.id).length;
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
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '2px' }}>
                    <button onClick={() => onRemoveFromCart && onRemoveFromCart(item)} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 6, color:'#111827', cursor:'pointer', fontSize:16, fontWeight:500, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                    <span style={{ fontWeight: 600, color:'#111827', fontSize:13, margin: '0 12px' }}>{qty}</span>
                    <button onClick={() => onAddToCart && onAddToCart(item)} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 6, color:'#111827', cursor:'pointer', fontSize:16, fontWeight:500, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
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
  const [radius60, setRadius60] = useState(false);
  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy'];
  const filtered = browseProduce.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchQ = p.name.toLowerCase().includes(search.toLowerCase()) || p.farmer.toLowerCase().includes(search.toLowerCase());
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
          const qty = cart?.filter(c => c.id === p.id).length || 0;
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p className="dsh-produce-price">{p.price}</p>
                    <p className="dsh-produce-qty">{p.qty} available</p>
                  </div>
                  <div className="dsh-produce-rating"><Star size={11} fill="currentColor"/>{p.rating}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {qty > 0 ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '2px' }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={(e) => { e.stopPropagation(); onRemoveFromCart && onRemoveFromCart(p); }} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 6, color:'#111827', cursor:'pointer', fontSize:16, fontWeight:500, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                      <span style={{ fontWeight: 600, color:'#111827', fontSize:13 }}>{qty}</span>
                      <button onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(p); }} style={{ background:'#f9fafb', border:'1px solid #f3f4f6', borderRadius: 6, color:'#111827', cursor:'pointer', fontSize:16, fontWeight:500, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  ) : (
                    <button className="dsh-ghost-btn dsh-ghost-btn--border" style={{ flex: 1, padding: '6px 4px', fontSize: 12, borderRadius: 8, justifyContent: 'center', minWidth: 0 }} onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(p); }}>
                      <ShoppingCart size={12} style={{ marginRight: 4, flexShrink: 0 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Cart</span>
                    </button>
                  )}
                  <button className="dsh-cta-btn" style={{ flex: 1, padding: '6px 4px', fontSize: 12, borderRadius: 8, justifyContent: 'center', minWidth: 0 }} onClick={(e) => { e.stopPropagation(); onCheckout && onCheckout(p); }}>
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


/* ════════════════════ SETTINGS VIEW ════════════════════ */
function SettingsView({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
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
          <div className="sv-row"><span className="sv-row-label">Change Password</span><ChevronRight size={14} style={{color:'#c7c7cc'}}/></div>
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
          <div className="sv-row"><div className="sv-row-icon-wrap"><Phone size={16}/></div><span className="sv-row-label">Call Support (24/7)</span></div>
          <div className="sv-divider"/>
          <div className="sv-row"><div className="sv-row-icon-wrap"><Mail size={16}/></div><span className="sv-row-label">Email Us</span></div>
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
        <Leaf size={40} color="#fff" />
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
  { icon:<Package size={16}/>,         label:'My Listings', id:'listings' },
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
  const [form, setForm] = useState({ address: '', email: '', phone: '', quantity: '50' });
  const [loading, setLoading] = useState(false);

  const pricePerKg = item ? parseInt(item.price?.replace(/\D/g, '') || '45', 10) : 45;
  const total = pricePerKg * parseInt(form.quantity || '0', 10);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm({ quantity: form.quantity, total });
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

        <div className="dsh-card" style={{ padding: 24, height: 'fit-content' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 20px 0' }}>Order Summary</h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingBottom: 20, borderBottom: '1px solid #f0ede8', marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              {item ? <ProduceIcon name={item.name} size={24}/> : '🍅'}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: '#111827' }}>{item ? item.name : 'Fresh Produce'}</p>
              <p style={{ margin: 0, fontSize: 13, color: '#8a9a84' }}>From {item ? item.farmer : 'Local Farm'}</p>
            </div>
          </div>
          <div className="dsh-form-field" style={{ marginBottom: 20 }}>
            <label className="dsh-form-label">Quantity (kg)</label>
            <input type="number" className="dsh-form-input" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#4b5563' }}>
            <span>Price per kg</span>
            <span>₹{pricePerKg}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: '#4b5563' }}>
            <span>Delivery Fee</span>
            <span>₹250</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 20, borderTop: '1px solid #f0ede8', fontSize: 18, fontWeight: 700, color: '#111827' }}>
            <span>Total Pay</span>
            <span>₹{(total + 250).toLocaleString('en-IN')}</span>
          </div>
          <button className="dsh-cta-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '12px', fontSize: 15 }} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${(total + 250).toLocaleString('en-IN')} & Confirm`}
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
  const [buyerOrders, setBuyerOrders] = useState<Order[]>(allBuyerOrders);

  const handleRemoveFromCart = (prod: any) => {
    const index = cart.findIndex(c => c.id === prod.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
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
      buyerOrders.forEach(o => {
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
        onConfirm={(details) => {
          const newOrder: Order = {
            id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: 'Just now',
            item: cart.length > 1 ? `${cart.length} Items` : (checkoutItem?.name || 'Produce'),
            qty: cart.length > 1 ? 'Multiple' : `${details.quantity} kg`,
            status: 'processing',
            amount: `₹${details.total.toLocaleString('en-IN')}`,
            farmer: cart.length > 1 ? 'Multiple Farmers' : (checkoutItem?.farmer || 'Farmer')
          };
          setBuyerOrders([newOrder, ...buyerOrders]);
          setCart([]);
          setActiveNav('order_success');
        }} 
        onCancel={() => setActiveNav('browse')} 
      />
    );
    if (activeNav === 'order_success') return <OrderSuccessView onTrackOrder={() => setActiveNav('orders')} />;
    if (activeNav === 'product_details') return <ProductDetailsView product={selectedProduct} cart={cart} onBack={() => setActiveNav('dashboard')} onAddToCart={(prod) => setCart([...cart, prod])} onRemoveFromCart={handleRemoveFromCart} />;

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
        case 'dashboard': return <BuyerDashboardView onCheckout={(item) => { setCheckoutItem(item); setActiveNav('checkout'); }} onProductClick={(item) => { setSelectedProduct(item); setActiveNav('product_details'); }} onBrowse={() => setActiveNav('browse')} />;
        case 'orders':    
          return (
            <div className="dsh-content" style={{ display: 'flex', flexDirection: 'column', paddingBottom: 60 }}>
              {cart.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <CartView cart={cart} onCheckout={() => { setCheckoutItem(cart[0]); setActiveNav('checkout'); }} onBack={() => setActiveNav('dashboard')} onAddToCart={(prod) => setCart([...cart, prod])} onRemoveFromCart={handleRemoveFromCart} isEmbedded={true} />
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
               activeNav.charAt(0).toUpperCase() + activeNav.slice(1).replace('_', ' ')}
            </h1>
          </div>

          {/* Mobile-only centered title */}
          <div className="dsh-topbar-mobile-title">
            {activeNav === 'dashboard' ? 'Home' :
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
      {showRadarModal && <RadarScannerModal onClose={() => setShowRadarModal(false)} />}
    </div>
  );
}
