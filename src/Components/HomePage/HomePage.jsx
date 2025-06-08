import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../../index.css";
import "./HomePage.css";
import EventCard from "../EventCard/EventCasd.jsx";
import EventForm from "../CreateEventForm/EventForm.jsx";

const HomePage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);

  // Load existing events on mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await axios.get(
          "https://localhost:58296/api/Event/getAll",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Handle both direct array and envelope { data: [...] }
        let eventsPayload = [];
        if (Array.isArray(res.data)) {
          eventsPayload = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          eventsPayload = res.data.data;
        }
        setEvents(eventsPayload);
      } catch (e) {
        console.error("Failed loading events", e);
      }
    };
    loadEvents();
  }, []);

  // Handler for newly created events
  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const toggleFilters = () => setShowFilters(!showFilters);
  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <>
      <motion.div className="filter-container">
        <motion.input
          className="search-input"
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
          {showFilters ? "Hide Filters" : "Show Filters"}
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
        {events.map((event, index) => {
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
          onClick={() => setShowEventForm(false)} // Close modal on backdrop click
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <EventForm
              onClose={() => setShowEventForm(false)}
              onEventCreated={handleEventCreated}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default HomePage;
