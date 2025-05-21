import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';
import "../../index.css";
import EventCard from '../EventCard/EventCasd.jsx';

const HomePage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState("");

    const toggleFilters = () => setShowFilters(!showFilters);
    const handleSearchChange = (e) => setSearch(e.target.value);

    const mockEvents = [
    {
        eventId: "1",
        eventName: "Mock Tech Meetup",
        description: "A fun and insightful meetup for tech enthusiasts!",
        createdAt: "2025-05-01T10:00:00Z",
        startDate: "2025-06-01T18:00",
        endDate: "2025-06-01T21:00",
        imageUrl: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        isClosedEvent: false,
        createdBy: "Jane Developer",
        location: "Stockholm, Sweden",
        likeList: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
    }
];

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
             <div className="event-list">
            {mockEvents.map(event => (
                <EventCard key={event.eventId} {...event} />
            ))}
        </div>
        </>
    );
};

export default HomePage;
