import React from "react";
import { motion } from "framer-motion";
import "./EventCard.css";
import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

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
  likeList,
}) => {
  return (
    <motion.div className="event-card" whileHover={{ scale: 1.02 }}>
      <h2 className="eventName">{eventName}</h2>
      <motion.div className="event-createdBy">
        <RiAdminFill className="owner-Logo" style={{ marginTop: "3px" }} />
        <p>{createdBy}</p>
      </motion.div>
      {imageUrl && (
        <img src={imageUrl} alt={eventName} className="event-image" />
      )}
      <div className="event-date">
        <FaClock className="icons clock-Logo" style={{ marginTop: "3px" }} />
        <p>
          {new Date(startDate)
            .toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(",", " clock:")}
        </p>
        <p>-</p>
        <p>
          {new Date(endDate)
            .toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(",", " clock:")}
        </p>
      </div>
      <motion.div className="event-location">
        <FaLocationDot
          className="icons location-Logo"
          style={{ marginTop: "3px" }}
        />
        <motion.p>{location}</motion.p>
      </motion.div>
      <p>{description}</p>

      <motion.div className="like-dislike">
        <motion.button
          whileTap={{ scale: [1, 1.4] }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          onClick={() => console.log("Like button clicked")}
        >
          <BiSolidLike className="icon like-icon" />
            {likeList?.length || 0}
        </motion.button>
        <motion.button
          whileTap={{ scale: [1, 1.4] }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          onClick={() => console.log("Like button clicked")}
        >
          <BiSolidDislike className="icon dislike-icon" />
        </motion.button>
      </motion.div>
      {isClosedEvent && <p className="closed-tag">Closed Event</p>}
    </motion.div>
  );
};

export default EventCard;
