import { motion, AnimatePresence, scale } from 'framer-motion';
import { useState } from 'react';
import "./Header.css";
import { MdLogin } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuUserRoundPlus } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";



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
  const navigate = useNavigate();
  const toggleMenu = () => setMenuOpen(prev => !prev);
  // Check if user is authenticated
  const token = localStorage.getItem('jwtToken');

  return (
    <>
      <header className="header">
        <div className="header-div">
          <div className="header-logo"
           onClick={() => navigate('/homepage')} 
           style={{ cursor: 'pointer' }}>
            <img src= "https://res.cloudinary.com/dhpjnh2q0/image/upload/v1749848574/The_Council_v.3_bhe9tb.png" />
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
      {/* Show Sign In/Up when not authenticated, else Profile/Logout */}
      {!token ? (
        <>
          <motion.button
            className='header-btn'
            variants={itemVariants}
            whileTap={{ scale: 1.1 }}
            onClick={() => { navigate('/login'); setMenuOpen(false); }}
          >
            <MdLogin className='icon' /> Sign in
          </motion.button>
          <motion.button
            className='header-btn'
            variants={itemVariants}
            whileTap={{ scale: 1.1 }}
            onClick={() =>{ navigate('/register'); setMenuOpen(false); }}
          >
            <LuUserRoundPlus className='icon' /> Sign up
          </motion.button>
        </>
      ) : (
        <>
          <motion.button
            className='header-btn'
            variants={itemVariants}
            whileTap={{ scale: 1.1 }}
            onClick={() =>{ navigate('/ProfilePage'); setMenuOpen(false); }}
          >
            <CgProfile className='icon' /> Profile
          </motion.button>
          <motion.button
            className='header-btn'
            variants={itemVariants}
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              localStorage.removeItem('jwtToken');
              navigate('/login');
              setMenuOpen(false);
            }}
          >
            <MdLogout className='icon'/>
            Logout
          </motion.button>
        </>
      )}
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};

export default Header;