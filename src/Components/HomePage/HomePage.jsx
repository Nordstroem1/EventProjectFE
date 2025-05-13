import React from 'react';
import { motion } from 'framer-motion';
import './HomePage.css'; 
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    return (
        <motion.div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Home Page</h1>
            <p>This is the starting point of our application.</p>
        </motion.div>
    );
};

export default HomePage;