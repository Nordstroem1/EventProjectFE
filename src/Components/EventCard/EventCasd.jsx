import React from 'react';
import { motion } from 'framer-motion';
import './EventCard.css';

const EventCard = ({
    eventId,
    eventName,
    description,
    createdAt,
    startDate,
    endDate,
    imageUrl,
    isClosedEvent,
    createdBy,
    location,
    likeList
}) => {
    return (
        <motion.div className="event-card" whileHover={{ scale: 1.02 }}>
            {imageUrl && (
                <img src={imageUrl} alt={eventName} className="event-image" />
            )}
            <div className="event-details">
                <h2>{eventName}</h2>
                <p>{description}</p>
                <p><strong>Location:</strong> {location}</p>
                <p>
                    <strong>Start:</strong>{" "}
                    {new Date(startDate).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }).replace(",", " clock:")}
                </p>

                <p>
                    <strong>End:</strong>{" "}
                    {new Date(endDate).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }).replace(",", " clock:")}
                </p>
                <p><strong>Created by:</strong> {createdBy}</p>
                <motion.button
                    className="like-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => console.log("Like clicked!")}>
                    Likes: {likeList?.length || 0}
                </motion.button>
                {isClosedEvent && <p className="closed-tag">Closed Event</p>}
            </div>
        </motion.div>
    );
};

export default EventCard;