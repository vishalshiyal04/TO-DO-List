// import { Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import ProductsPage from './pages/ProductPage';

// function App() {
//   return (
//     <div>
//       <h1>My App</h1>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/products" element={<ProductsPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import { Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import ProductsPage from './pages/ProductPage';

// function App() {
//   return (
//     <>
//       <style>{`
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #07070f; color: #cffafe; }
//         #root { min-height: 100vh; }
//       `}</style>

//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/products" element={<ProductsPage />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductPage';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');

        @keyframes shimmer { 0% { left:-100%; } 100% { left:200%; } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }

        .header {
          position: sticky; top: 0; z-index: 999;
          background: rgba(7,7,15,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,240,255,0.1);
          padding: 0 32px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
          animation: fadeDown 0.5s ease both;
          font-family: 'Share Tech Mono', monospace;
        }
        .header-accent {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00f0ff, transparent);
        }

        /* Logo */
        .logo {
          display: flex; align-items: center; gap: 12px;
          cursor: pointer; text-decoration: none;
        }
        .logo-icon {
          position: relative; width: 36px; height: 36px;
          border: 1px solid rgba(0,240,255,0.35);
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,240,255,0.04);
        }
        .logo-icon svg { color: #00f0ff; }
        .lc { position:absolute; width:6px; height:6px; border-color:#00f0ff; border-style:solid; }
        .lc.tl { top:-1px; left:-1px; border-width:2px 0 0 2px; }
        .lc.tr { top:-1px; right:-1px; border-width:2px 2px 0 0; }
        .lc.bl { bottom:-1px; left:-1px; border-width:0 0 2px 2px; }
        .lc.br { bottom:-1px; right:-1px; border-width:0 2px 2px 0; }

        .logo-text { display:flex; flex-direction:column; line-height:1; }
        .logo-name {
          font-family: 'Rajdhani', sans-serif; font-weight:700;
          font-size: 18px; letter-spacing:0.3em; text-transform:uppercase; color:#fff;
        }
        .logo-name span { color:#00f0ff; }
        .logo-tagline { font-size:9px; letter-spacing:0.2em; color:rgba(0,240,255,0.35); text-transform:uppercase; margin-top:2px; }

        /* Nav */
        .nav { display:flex; align-items:center; gap:6px; }
        .nav-btn {
          position:relative; overflow:hidden;
          background:transparent; border:1px solid transparent;
          color:rgba(0,240,255,0.45); font-family:'Share Tech Mono',monospace;
          font-size:11px; letter-spacing:0.2em; text-transform:uppercase;
          padding:7px 16px; cursor:pointer; transition:all 0.25s;
        }
        .nav-btn:hover { color:#fff; border-color:rgba(0,240,255,0.25); background:rgba(0,240,255,0.05); }
        .nav-btn.active { color:#00f0ff; border-color:rgba(0,240,255,0.4); background:rgba(0,240,255,0.06); }
        .nav-btn .shimmer { position:absolute; top:0;bottom:0;width:50%; background:linear-gradient(90deg,transparent,rgba(0,240,255,0.12),transparent); animation:shimmer 2.5s ease-in-out infinite; }

        /* Status dot */
        .status { display:flex; align-items:center; gap:8px; font-size:10px; letter-spacing:0.15em; color:rgba(0,240,255,0.3); text-transform:uppercase; }
        .dot { width:7px; height:7px; background:#00f0ff; border-radius:50%; box-shadow:0 0 8px #00f0ff; animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
      `}</style>

      <header className="header">
        <div className="header-accent" />

        {/* Logo */}
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logo-icon">
            <span className="lc tl" /><span className="lc tr" />
            <span className="lc bl" /><span className="lc br" />
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div className="logo-text">
            <div className="logo-tagline">Product Store System</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="nav">
          <button className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
            <span className="shimmer" /> Login
          </button>
          <button className={`nav-btn ${location.pathname === '/products' ? 'active' : ''}`} onClick={() => navigate('/products')}>
            <span className="shimmer" /> Products
          </button>
        </nav>

        {/* Status */}
        <div className="status">
          <div className="dot" /> Online
        </div>
      </header>
    </>
  );
}

function App() {
  const location = useLocation();
  const hideHeaderOn = ['/'];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#07070f; color:#cffafe; }
        #root { min-height:100vh; }
      `}</style>

      {!hideHeaderOn.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;