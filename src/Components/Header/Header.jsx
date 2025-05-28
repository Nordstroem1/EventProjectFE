import { motion, AnimatePresence, scale } from 'framer-motion';
import { useState } from 'react';
import "./Header.css";
import { MdLogin } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuUserRoundPlus } from "react-icons/lu";


const menuVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: [0.25, 0.8, 0.25, 1],
      when: "beforeChildren",
      staggerChildren: 0.1, 
    },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 , duration: 0.1} },
};
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <header className="header">
        <div className="header-div">
          <div className="header-logo">
            <img src="/src/Images/The_Council_v.3.png" />
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
      className='menu'
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'fixed',
        top: '4rem',
        left: 0,
        right: 0,
        background: '#fff',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        borderRadius: '0 0 10px 10px'
      }}
    >
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 1.1 }}
        onClick={() => console.log('Sign in')}
        style={{
          padding: '1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <MdLogin className='icon' />
        Sign in
      </motion.button>

      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 1.1 }}
        onClick={() => console.log('Register')}
        style={{
          padding: '1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <LuUserRoundPlus className='icon' />
        Sign up
      </motion.button>

      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 1.1 }}
        onClick={() => console.log('User Profile')}
        style={{
          padding: '1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <CgProfile className='icon' />
        Profile
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};

export default Header;