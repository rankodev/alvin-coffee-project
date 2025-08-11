


import coffeeTableImg from './assets/coffeetable.png';
import hclLogo from './assets/HCI Horz. Logo.png';
import styles from './HeroLoginPage.module.scss';

import React, { useState } from 'react';

function HeroPage({ onContinue }) {
  const [showLogin, setShowLogin] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleContinue = () => {
    setShowLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername === 'employee' && loginPassword === 'WILACBTIIR') {
      setLoginError('');
      onContinue();
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className={styles.heroLoginPage}>
      <div className={styles.heroLeft}>
        <img src={coffeeTableImg} alt="Coffee Table" className={styles.coffeeTableImg} />
        <img src={hclLogo} alt="HCL Logo" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '900px',
          height: 'auto',
          zIndex: 2,
          filter: 'drop-shadow(0 0 6px #fff) drop-shadow(0 8px 32px rgba(60,40,20,0.25))'
        }} />
      </div>
      <div style={{
        width: '50vw',
        height: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 480, margin: 0 }}>
          <div style={{ marginBottom: '2.5em' }}>
            <h1 style={{ fontSize: '3.2em', fontWeight: 900, color: '#2d1a06', marginBottom: '0.2em', letterSpacing: '0.04em', fontFamily: 'Segoe UI, Montserrat, Arial, sans-serif' }}>HCL Coffee Hour</h1>
            <div style={{ fontSize: '1.35em', color: '#5a3a1a', marginBottom: '0.5em', fontWeight: 500, letterSpacing: '0.02em', fontFamily: 'Segoe UI, Montserrat, Arial, sans-serif' }}>Friday, August 22nd</div>
            <div style={{ fontSize: '1.35em', color: '#5a3a1a', marginBottom: '0', fontWeight: 500, letterSpacing: '0.02em', fontFamily: 'Segoe UI, Montserrat, Arial, sans-serif' }}>8:00 AM - 9:00 AM</div>
          </div>
          {!showLogin ? (
            <div>
              <div style={{ marginBottom: '1.5em', fontSize: '1.15em', color: '#3B2C1A', fontWeight: 600 }}>
                Ready to order some coffee?
              </div>
              <button style={{
                fontSize: '1.25em',
                background: 'linear-gradient(90deg, #b8860b 60%, #e0cfa0 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '1.5em',
                padding: '0.9em 2.8em',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 18px #e0cfa0, 0 2px 8px #b8860b',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
                fontFamily: 'Segoe UI, Montserrat, Arial, sans-serif',
                letterSpacing: '0.03em'
              }} onClick={handleContinue}>Continue</button>
            </div>
          ) : (
            <form onSubmit={handleLogin} style={{ marginTop: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em', minWidth: 250 }}>
              <input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)}
                required
                style={{ padding: '0.8em 1em', borderRadius: '0.7em', border: '1px solid #e0cfa0', fontSize: '1em', width: '100%' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
                style={{ padding: '0.8em 1em', borderRadius: '0.7em', border: '1px solid #e0cfa0', fontSize: '1em', width: '100%' }}
              />
              <button type="submit" style={{
                padding: '0.8em 1em',
                borderRadius: '0.7em',
                border: 'none',
                background: '#b8860b',
                color: '#fff',
                fontSize: '1.1em',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '0.5em',
                transition: 'background 0.2s',
                width: '100%'
              }}>Login</button>
              {loginError && <div style={{ color: '#c00', marginTop: '0.5em', fontSize: '1em' }}>{loginError}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
