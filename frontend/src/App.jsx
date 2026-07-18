
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

// Injecting Global Styles for Hover Animations, Marquee, and Floating Badges
const injectGlobalStyles = () => {
    if (typeof document !== 'undefined' && !document.getElementById('sra-custom-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'sra-custom-styles';
        styleElement.innerHTML = `
            @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
            @keyframes crazyBobbing {
                0% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(1deg); }
                100% { transform: translateY(0px) rotate(0deg); }
            }
            .moving-line {
                display: inline-block;
                white-space: nowrap;
                animation: marquee 20s linear infinite;
            }
            .food-card-hover {
                transition: transform 0.3s ease, box-shadow 0.3s ease !important;
            }
            .food-card-hover:hover {
                transform: translateY(-8px) scale(1.02) !important;
                box-shadow: 0 0 25px rgba(239, 68, 68, 0.6) !important;
                border-color: #ff0000 !important;
            }
            .btn-hover-neon {
                transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s !important;
            }
            .btn-hover-neon:hover {
                transform: scale(1.05) !important;
                box-shadow: 0 0 20px rgba(239, 68, 68, 0.8) !important;
            }
            .floating-sticker {
                animation: crazyBobbing 2.5s ease-in-out infinite;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .floating-sticker:hover {
                transform: scale(1.05) !important;
                box-shadow: 0 0 30px rgba(239, 68, 68, 0.8) !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
};

const styles = {
    card: {
        background: 'rgba(20, 5, 5, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #ef4444',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '280px',
        boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)',
        display: 'flex',
        flexDirection: 'column'
    },
    btnNeon: {
        background: 'linear-gradient(45deg, #ef4444, #b91c1c)',
        color: '#ffffff',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '14px'
    },
    btnOutline: {
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#ffffff',
        border: '2px solid #ffffff',
        padding: '10px 24px',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '14px'
    },
    stickerCard: {
        position: 'absolute',
        top: '32%',
        width: '180px',
        background: 'rgba(12, 4, 4, 0.95)',
        border: '2px solid #ef4444',
        borderRadius: '12px',
        padding: '12px',
        boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)',
        zIndex: 10,
        textAlign: 'center'
    },
    input: {
        background: 'rgba(15, 5, 5, 0.8)',
        border: '1px solid #ef4444',
        padding: '12px',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid #ef4444',
        objectFit: 'cover',
        boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
    },
    inlineCounter: {
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(15, 5, 5, 0.9)',
        border: '1px solid #ef4444',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
    },
    counterBtn: {
        background: '#ef4444',
        color: '#fff',
        border: 'none',
        padding: '8px 14px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'background 0.2s'
    }
};

const LandingPage = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            width: '100vw',
            padding: '20px', 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 5,
            boxSizing: 'border-box',
            overflow: 'hidden'
        }}>
            {/* 🕷️ LEFT FLOATING STICKER */}
            <div className="floating-sticker" style={{ ...styles.stickerCard, left: '4%' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🕷️</div>
                <p style={{ margin: 0, fontSize: '12px', color: '#fff', fontWeight: '500', lineHeight: '1.4' }}>
                    "Your food will definitely arrive once <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Shraddha</span> becomes a developer!"
                </p>
            </div>

            {/* 🕸️ RIGHT FLOATING STICKER */}
            <div className="floating-sticker" style={{ ...styles.stickerCard, right: '4%' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🚀</div>
                <p style={{ margin: 0, fontSize: '12px', color: '#fff', fontWeight: '500', lineHeight: '1.4' }}>
                    "The <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Premium</span> Website Experience // Managed by SRA"
                </p>
            </div>

            <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Profile Avatar Header Layout */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <img 
                        src="/assets/sra-photo.jpg" 
                        alt="Shraddha" 
                        style={{ 
                            width: '200px', 
                            height: '200px', 
                            borderRadius: '50%', 
                            border: '3px solid #ffffff', 
                            objectFit: 'cover', 
                            boxShadow: '0 6px 25px rgba(0,0,0,0.85), 0 0 15px rgba(255,255,255,0.2)' 
                        }} 
                        onError={(e)=>{e.target.src="https://via.placeholder.com/200/ffffff/000000?text=SRA"}} 
                    />
                    <span style={{ fontSize: '11px', color: '#e5e7eb', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', opacity: 0.85 }}>
                        B.TECH CSE (AI & ML) STUDENT
                    </span>
                </div>

                {/* Main Rebranded Title */}
                <h1 style={{ 
                    fontSize: '3.2rem', 
                    fontStyle: 'italic',
                    fontWeight: '900',
                    margin: '0 0 4px 0', 
                    color: '#fff', 
                    textShadow: '2px 4px 12px rgba(0, 0, 0, 0.9)',
                    letterSpacing: '-0.5px',
                    whiteSpace: 'nowrap'
                }}>
                    Engineered by Shraddha
                </h1>

                {/* Subtag Architecture */}
                <div style={{ color: '#ef4444', fontWeight: '700', marginBottom: '25px', fontSize: '13px', letterSpacing: '4px' }}>
                    SYSTEM ARCHITECT & DEVELOPER
                </div>

                {/* Professional English Corporate Intro Copy */}
                <p style={{ 
                    color: '#f3f4f6', 
                    fontSize: '16px', 
                    lineHeight: '1.6', 
                    marginBottom: '35px', 
                    maxWidth: '680px',
                    textShadow: '1px 2px 8px rgba(0, 0, 0, 0.8)',
                    fontWeight: '300',
                    letterSpacing: '0.4px'
                }}>
                    Welcome to the next-generation autonomous food terminal. This platform utilizes an advanced full-stack framework designed to deploy scalable core network systems, streamlining food capsule generation straight from the cloud pipeline architecture.
                </p>

                {/* Terminal Actions */}
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/login" className="btn-hover-neon" style={styles.btnNeon}>Access Terminal (Login)</Link>
                    <Link to="/signup" className="btn-hover-neon" style={styles.btnOutline}>Enlist Pilot (Signup)</Link>
                </div>

            </div>
        </div>
    );
};

const Navbar = ({ cartCount, setViewCart, setUser, clearCart }) => {
    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '15px 30px', 
            backgroundImage: "linear-gradient(rgba(10, 3, 3, 0.45), rgba(10, 3, 3, 0.45)), url('/assets/spidey-bg.png')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderBottom: '2px solid #ef4444', 
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)', 
            position: 'relative', 
            zIndex: 10 
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src="/assets/sra-photo.jpg" alt="SRA Icon" style={styles.avatar} onError={(e)=>{e.target.src="https://via.placeholder.com/40/ff0000/ffffff?text=SRA"}} />
                <h2 style={{ margin: 0, cursor: 'pointer', color: '#fff', textShadow: '0 0 12px rgba(0,0,0,1), 0 0 5px rgba(239, 68, 68, 0.8)' }} onClick={() => setViewCart(false)}>
                    App by SRA
                </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button onClick={() => setViewCart(true)} className="btn-hover-neon" style={styles.btnNeon}>
                    🛸 Cargo Bay ({cartCount})
                </button>
                <button onClick={() => { setUser(null); clearCart(); }} style={{ backgroundColor: '#ffffff', color: '#090202', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    Abort Mission
                </button>
            </div>
        </nav>
    );
};

// Card with embedded compounds directly managing increment/decrement workflows
const FoodCard = ({ food, cartItems, onAddToCart, onDecreaseCart }) => {
    const cartItem = cartItems.find(item => item._id === food._id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    return (
        <div style={styles.card} className="food-card-hover">
            <img src={food.image} alt={food.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderBottom: '1px solid rgba(239, 68, 68, 0.3)' }} onError={(e)=>{e.target.src="https://via.placeholder.com/280x180/1c0a0a/ef4444?text=Capsule+Image"}} />
            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#ffffff' }}>{food.name}</h3>
                    <p style={{ fontSize: '14px', color: '#d1d5db', margin: 0, height: '40px', overflow: 'hidden' }}>{food.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#ef4444' }}>₹{food.price}</span>
                    
                    {currentQuantity === 0 ? (
                        <button onClick={() => onAddToCart(food)} className="btn-hover-neon" style={{ ...styles.btnNeon, padding: '10px 24px', fontSize: '14px' }}>
                            Load
                        </button>
                    ) : (
                        <div style={styles.inlineCounter}>
                            <button onClick={() => onDecreaseCart(food)} style={styles.counterBtn}>-</button>
                            <span style={{ padding: '0 12px', fontWeight: 'bold', color: '#fff', minWidth: '20px', textAlign: 'center', fontSize: '14px' }}>
                                {currentQuantity}
                            </span>
                            <button onClick={() => onAddToCart(food)} style={styles.counterBtn}>+</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Cart = ({ cartItems, onAddToCart, onDecreaseCart, onRemoveItem, onClearCart, setViewCart }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isOrdered, setIsOrdered] = useState(false);
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/orders', { customerName: name, address, items: cartItems, totalAmount });
            setIsOrdered(true);
            onClearCart();
        } catch (error) {
            alert("Transmission failed! Order aborted.");
        }
    };

    if (isOrdered) {
        return (
            <div style={{ padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 5 }}>
                <h2 style={{ color: '#ef4444', textShadow: '0 0 15px #ef4444' }}>👽 Order Dispatched to HyperSpace!</h2>
                <button onClick={() => setViewCart(false)} style={styles.btnNeon}>Back to Base</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '30px', maxWidth: '650px', margin: 'auto', position: 'relative', zIndex: 5, background: 'rgba(10,3,3,0.85)', borderRadius: '16px', border: '1px solid #ef4444', boxShadow: '0 0 20px rgba(0,0,0,0.8)' }}>
            <button onClick={() => setViewCart(false)} style={{ marginBottom: '20px', padding: '8px 15px', cursor: 'pointer', borderRadius: '8px', border: '1px solid #ef4444', background: 'none', color: '#ef4444', fontWeight: 'bold' }}>
                ← Orbit View
            </button>
            <h2 style={{ textShadow: '0 0 10px #ef4444' }}>Manifested Cargo</h2>
            {cartItems.length === 0 ? (
                <p style={{ color: '#9ca3af' }}>Cargo bay is empty. Scan sector for food capsules! 🪐</p>
            ) : (
                <div>
                    {cartItems.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <div style={{ flexGrow: 1 }}>
                                <span style={{ fontWeight: 'bold', color: '#fff' }}>{item.name}</span>
                                <div style={{ color: '#9ca3af', fontSize: '13px' }}>₹{item.price} each</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button onClick={() => onDecreaseCart(item)} style={{ background: '#ef4444', color: '#fff', border: 'none', width: '24px', height: '24px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                                <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                <button onClick={() => onAddToCart(item)} style={{ background: '#ef4444', color: '#fff', border: 'none', width: '24px', height: '24px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                                <button onClick={() => onRemoveItem(item._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px', marginLeft: '10px' }}>🗑️</button>
                            </div>
                            <span style={{ color: '#ef4444', fontWeight: 'bold', minWidth: '70px', textAlign: 'right', marginLeft: '15px' }}>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                    <h3 style={{ textAlign: 'right', color: '#ffffff', marginTop: '20px' }}>Total Energy Required: <span style={{ color: '#ef4444' }}>₹{totalAmount}</span></h3>
                    <form onSubmit={handleCheckout} style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(28, 10, 10, 0.6)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        <input type="text" placeholder="Astronaut Full Name" onChange={e => setName(e.target.value)} required style={styles.input} />
                        <textarea placeholder="Space Station Sector / Delivery Address" onChange={e => setAddress(e.target.value)} required style={{ ...styles.input, height: '60px', resize: 'none' }} />
                        <button type="submit" className="btn-hover-neon" style={styles.btnNeon}>Launch Order</button>
                    </form>
                </div>
            )}
        </div>
    );
};

const AuthForm = ({ mode, onAuthSuccess }) => {
    const isLogin = mode === 'login';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'signup';
        const payload = isLogin ? { email, password } : { name, email, password };
        try {
            const res = await axios.post(`http://localhost:5000/api/${endpoint}`, payload);
            alert(res.data.message);
            if (isLogin) {
                onAuthSuccess(res.data.user);
                navigate('/dashboard');
            } else {
                navigate('/login');
            }
        } catch (error) {
            alert(error.response?.data?.message || "System Override Failure!");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '40px 30px', background: 'rgba(20, 5, 5, 0.8)', border: '2px solid #ef4444', borderRadius: '16px', boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)', backdropFilter: 'blur(10px)', position: 'relative', zIndex: 5 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff', textShadow: '0 0 10px #ef4444' }}>{isLogin ? 'AUTHENTICATE USER' : 'REGISTER ASTRONAUT'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {!isLogin && <input type="text" placeholder="Pilot Call Sign (Name)" onChange={e => setName(e.target.value)} required style={styles.input} />}
                    <input type="email" placeholder="Space Comm Email" onChange={e => setEmail(e.target.value)} required style={styles.input} />
                    <input type="password" placeholder="Access Encrypted Key" onChange={e => setPassword(e.target.value)} required style={styles.input} />
                    <button type="submit" className="btn-hover-neon" style={styles.btnNeon}>{isLogin ? 'Initiate Login' : 'Create Profile'}</button>
                </form>
            </div>
        </div>
    );
};

export default function App() {
    const [user, setUser] = useState(null);
    const [foods, setFoods] = useState([]);
    const [cart, setCart] = useState([]);
    const [viewCart, setViewCart] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        injectGlobalStyles();
        if (user) {
            axios.get('http://localhost:5000/api/food')
                .then(res => setFoods(res.data))
                .catch(err => console.error("Database Connection Error:", err));
        }
    }, [user]);

    const addToCart = (food) => {
        const exist = cart.find(item => item._id === food._id);
        if (exist) {
            setCart(cart.map(item => item._id === food._id ? { ...exist, quantity: exist.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...food, quantity: 1 }]);
        }
    };

    const decreaseCart = (food) => {
        const exist = cart.find(item => item._id === food._id);
        if (!exist) return;
        if (exist.quantity === 1) {
            setCart(cart.filter(item => item._id !== food._id));
        } else {
            setCart(cart.map(item => item._id === food._id ? { ...exist, quantity: exist.quantity - 1 } : item));
        }
    };

    const removeItemCompletely = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const getProcessedFoods = () => {
        const matchedItems = foods.filter(food => 
            food.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (selectedCategory === 'All') return matchedItems;

        const primaryCategory = matchedItems.filter(
            food => food.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        const secondaryItems = matchedItems.filter(
            food => food.category?.toLowerCase() !== selectedCategory.toLowerCase()
        );

        return [...primaryCategory, ...secondaryItems];
    };

    const sortedAndFilteredFoods = getProcessedFoods();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Router>
            <div style={{ position: 'relative', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
                
                {/* Background Layer Configuration */}
                <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -2 }}>
                    <source src="/assets/bg.mp4" type="video/mp4" />
                </video>
                
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.55)', zIndex: -1 }} />

                <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={!user ? <AuthForm mode="login" onAuthSuccess={setUser} /> : <Navigate to="/dashboard" />} />
                        <Route path="/signup" element={!user ? <AuthForm mode="signup" onAuthSuccess={setUser} /> : <Navigate to="/dashboard" />} />
                        
                        <Route path="/dashboard" element={
                            user ? (
                                <div>
                                    <Navbar cartCount={cartCount} setViewCart={setViewCart} setUser={setUser} clearCart={() => setCart([])} />
                                    
                                    <div style={{ padding: '12px 0', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '14px', borderBottom: '1px solid rgba(239, 68, 68, 0.3)', position: 'relative', zIndex: 2, overflow: 'hidden', width: '100%' }}>
                                        <div className="moving-line">
                                            🛸 Connected Grid // Connected as Pilot: <b style={{ color: '#fff' }}>{user.name}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ⚡ System Level Optimal // Security Clearance Granted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🕸️ Developed by SRA
                                        </div>
                                    </div>
                                    
                                    {!viewCart ? (
                                        <div style={{ padding: '20px 40px' }}>
                                            <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px', fontSize: '2.5rem', textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 20px #ef4444, 0 0 40px #b91c1c' }}>
                                                Dude, what's your mood? 🍕
                                            </h2>

                                            {/* Clean Crisp Search Engine Box */}
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                                <input 
                                                    type="text" 
                                                    placeholder="Search food capsules..." 
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    style={{ 
                                                        width: '100%', 
                                                        maxWidth: '500px', 
                                                        padding: '12px 20px', 
                                                        borderRadius: '30px', 
                                                        border: '1px solid #ef4444', 
                                                        background: 'rgba(15, 5, 5, 0.85)', 
                                                        color: '#fff', 
                                                        fontSize: '16px', 
                                                        outline: 'none',
                                                        boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)'
                                                    }} 
                                                />
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                                                {['All', 'Pizza', 'Burger'].map((cat) => (
                                                    <button 
                                                        key={cat} 
                                                        onClick={() => setSelectedCategory(cat)}
                                                        style={selectedCategory === cat ? styles.btnNeon : styles.btnOutline}
                                                    >
                                                        {cat === 'All' ? '🌌 Show All' : cat === 'Pizza' ? '🍕 Pizza Varieties' : '🍔 Burger Grid'}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Advanced Dynamic Sorting Grid View */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px', justifyItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                                                {sortedAndFilteredFoods.length === 0 ? (
                                                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#9ca3af', background: 'rgba(20,5,5,0.6)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)' }}>
                                                        No matching food items active in this grid sector. 🛸
                                                    </p>
                                                ) : (
                                                    sortedAndFilteredFoods.map(food => (
                                                        <FoodCard 
                                                            key={food._id} 
                                                            food={food} 
                                                            cartItems={cart}
                                                            onAddToCart={addToCart} 
                                                            onDecreaseCart={decreaseCart} 
                                                        />
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Cart cartItems={cart} onAddToCart={addToCart} onDecreaseCart={decreaseCart} onRemoveItem={removeItemCompletely} onClearCart={() => setCart([])} setViewCart={setViewCart} />
                                    )}
                                </div>
                            ) : (
                                <Navigate to="/login" />
                            )
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}