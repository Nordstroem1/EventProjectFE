import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "../../index.css";
import './HomePage.css';
import EventCard from '../EventCard/EventCasd.jsx';
import EventForm from '../CreateEventForm/EventForm.jsx';

const HomePage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState("");

    const toggleFilters = () => setShowFilters(!showFilters);
    const handleSearchChange = (e) => setSearch(e.target.value);
    const [showEventForm, setShowEventForm] = useState(false);

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
    },
     {
        eventId: "2",
        eventName: "Vadning Conference",
        description: "A fun and insightful meetup for tech enthusiasts!",
        createdAt: "2025-07-01T10:00:00Z",
        startDate: "2025-10-01T18:00",
        endDate: "2025-10-02T19:00",
        imageUrl: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        isClosedEvent: false,
        createdBy: "John Doe",
        location: "Gothenburg, Sweden",
        likeList: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
    },
     {
        eventId: "3",
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
    }, {
        eventId: "4",
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
            <motion.div className="buttons-Container">
                <motion.button
                    className="Create-Event-Button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEventForm(true)}
                >
                    Create Event
                </motion.button>
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
                {mockEvents.map((event, index) => {
                    if (index < 2) {
                        return (
                            <motion.div
                                key={event.eventId}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <EventCard {...event} />
                            </motion.div>
                        );
                    } else {
                        return (
                            <motion.div
                                key={event.eventId}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5 }}
                            >
                                <EventCard {...event} />
                            </motion.div>
                        );
                    }
                })}
            </div>
            {showEventForm && (
                <motion.div 
                    className="modal-backdrop" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="modal-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <EventForm />
                        <motion.button 
                            onClick={() => setShowEventForm(false)}
                            className="close-modal"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px'
                            }}
                        >
                            X
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default HomePage;
