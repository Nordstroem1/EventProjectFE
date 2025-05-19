import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';
import "../../index.css";

const HomePage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState("");

    const toggleFilters = () => setShowFilters(!showFilters);
    const handleSearchChange = (e) => setSearch(e.target.value);

    return (
        <>
            <motion.div className="filter-container">
                <motion.input
                    className='search-input'
                    type="text"
                    placeholder="Search Event location..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </motion.div>
            <motion.div>
                <motion.button
                    className="filter-button"
                    onClick={toggleFilters}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </motion.button>
            </motion.div>
            {showFilters && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    <motion.button
                        className="filter-button"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Attending 
                    </motion.button>
                    <motion.button
                        className="filter-button"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        My Events
                    </motion.button>
                </motion.div>
            )}
        </>
    );
};

export default HomePage;
