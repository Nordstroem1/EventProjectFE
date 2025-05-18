import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <header className="header">
        <div className="header-div">
          <div className="header-logo">
            <img src="/logo.png" alt="The Council" />
          </div>
          <div className="header-menu">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: menuOpen ? 90 : 0 }}
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='menu'
            style={{
              position: 'fixed',
              top: '4rem',
              left: 0,
              right: 0,
              background: '#fff',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '2rem',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => console.log('Login')}
              style={{
                padding: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              Login
            </button>
            <button
              onClick={() => console.log('Register')}
              style={{
                padding: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              Register
            </button>
            <button
              onClick={() => console.log('User Profile')}
              style={{
                padding: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              My Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;