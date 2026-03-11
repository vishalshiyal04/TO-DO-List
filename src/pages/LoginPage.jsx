// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState();
//   const [password, setPassword] = useState();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ username, password })).then((action) => {
//       if (action.meta.requestStatus === 'fulfilled') {
//         console.log('Token stored in localStorage:', localStorage.getItem('token'));
//         navigate('/products');
//       } else {
//         console.error('Login failed:', action.payload);
//       }
//     });
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/products');
      } else {
        console.error('Login failed:', action.payload);
      }
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes pulse1 {
          0%, 100% { opacity: 0.04; transform: scale(1); }
          50% { opacity: 0.09; transform: scale(1.1); }
        }
        @keyframes pulse2 {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.15); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        .login-root {
          min-height: 100vh;
          background: #07070f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          position: relative;
          overflow: hidden;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridScroll 18s linear infinite;
        }

        .orb1 {
          position: absolute;
          top: 20%;
          left: 20%;
          width: 320px;
          height: 320px;
          background: #00f0ff;
          border-radius: 50%;
          filter: blur(80px);
          animation: pulse1 5s ease-in-out infinite;
        }
        .orb2 {
          position: absolute;
          bottom: 15%;
          right: 15%;
          width: 420px;
          height: 420px;
          background: #7c3aed;
          border-radius: 50%;
          filter: blur(100px);
          animation: pulse2 7s ease-in-out infinite;
        }

        .scanline {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,0.15), transparent);
          animation: scanline 6s linear infinite;
          pointer-events: none;
        }

        .card-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          margin: 0 16px;
          animation: fadeSlideUp 0.6s ease both;
        }

        .accent-top {
          height: 2px;
          background: linear-gradient(90deg, transparent, #00f0ff, transparent);
        }
        .accent-bottom {
          height: 2px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
        }

        .card {
          background: rgba(10, 10, 22, 0.95);
          border: 1px solid rgba(0, 240, 255, 0.15);
          padding: 40px 36px;
          box-shadow: 0 0 60px rgba(0,240,255,0.06), 0 24px 60px rgba(0,0,0,0.6);
        }

        .logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 36px;
        }

        .logo-icon {
          position: relative;
          width: 56px;
          height: 56px;
          border: 1px solid rgba(0,240,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          background: rgba(0,240,255,0.03);
        }
        .logo-icon svg { color: #00f0ff; }
        .corner { position: absolute; width: 8px; height: 8px; border-color: #00f0ff; border-style: solid; }
        .corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        .logo-title {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 0.35em;
          color: #fff;
          text-transform: uppercase;
        }
        .logo-title span { color: #00f0ff; }
        .logo-sub {
          font-size: 10px;
          letter-spacing: 0.25em;
          color: rgba(0,240,255,0.3);
          text-transform: uppercase;
          margin-top: 4px;
        }

        .field { margin-bottom: 18px; }
        .field label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0,240,255,0.5);
          margin-bottom: 8px;
        }
        .input-box {
          position: relative;
          border: 1px solid rgba(0,240,255,0.15);
          transition: border-color 0.3s;
          background: rgba(5,5,14,0.9);
        }
        .input-box.active { border-color: rgba(0,240,255,0.7); }
        .input-box .icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(0,240,255,0.25);
          transition: color 0.3s;
          display: flex;
        }
        .input-box.active .icon { color: #00f0ff; }
        .input-box input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #cffafe;
          padding: 12px 14px 12px 38px;
          font-size: 13px;
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 0.1em;
        }
        .input-box input::placeholder { color: rgba(0,240,255,0.2); }
        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #00f0ff, transparent);
          margin-top: -1px;
        }

        .error-box {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(239,68,68,0.3);
          background: rgba(127,29,29,0.2);
          padding: 10px 14px;
          margin-bottom: 16px;
        }
        .error-bar { width: 3px; height: 100%; background: #ef4444; align-self: stretch; flex-shrink: 0; }
        .error-box p { color: #fca5a5; font-size: 11px; letter-spacing: 0.05em; }

        .submit-btn {
          position: relative;
          width: 100%;
          padding: 14px;
          margin-top: 8px;
          background: rgba(0,240,255,0.05);
          border: 1px solid rgba(0,240,255,0.4);
          color: #67e8f9;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
        }
        .submit-btn:hover:not(:disabled) {
          border-color: #00f0ff;
          color: #fff;
          background: rgba(0,240,255,0.1);
        }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .submit-btn .shimmer {
          position: absolute;
          top: 0; bottom: 0;
          width: 60%;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,0.15), transparent);
          animation: shimmer 2s ease-in-out infinite;
          pointer-events: none;
        }

        .btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,240,255,0.3);
          border-top-color: #00f0ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .card-footer {
          text-align: center;
          color: rgba(0,240,255,0.2);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-top: 28px;
        }
      `}</style>

      <div className="login-root">
        <div className="grid-bg" />
        <div className="orb1" />
        <div className="orb2" />
        <div className="scanline" />

        <div className="card-wrapper">
          <div className="accent-top" />
          <div className="card">

            {/* Logo */}
            <div className="logo-wrap">
              <div className="logo-icon">
                <span className="corner tl" />
                <span className="corner tr" />
                <span className="corner bl" />
                <span className="corner br" />
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div className="logo-sub">Secure Access Portal</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="field">
                <label>Username</label>
                <div className={`input-box ${focused === 'username' ? 'active' : ''}`}>
                  <span className="icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocused('username')}
                    onBlur={() => setFocused('')}
                    placeholder="Enter username"
                    required
                  />
                  {focused === 'username' && <div className="glow-line" />}
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <label>Password</label>
                <div className={`input-box ${focused === 'password' ? 'active' : ''}`}>
                  <span className="icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder="Enter password"
                    required
                  />
                  {focused === 'password' && <div className="glow-line" />}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="error-box">
                  <div className="error-bar" />
                  <p>⚠ {error}</p>
                </div>
              )}

              {/* Button */}
              <button type="submit" className="submit-btn" disabled={loading}>
                <div className="shimmer" />
                <div className="btn-inner">
                  {loading ? (
                    <><div className="spinner" /> Authenticating...</>
                  ) : (
                    '→ Access System'
                  )}
                </div>
              </button>
            </form>

            <div className="card-footer">v2.0 · Encrypted · Secure</div>
          </div>
          <div className="accent-bottom" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;