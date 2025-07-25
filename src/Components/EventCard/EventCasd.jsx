import { useState } from "react";
import { motion } from "framer-motion";
import "./EventCard.css";
import { FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import axios from "axios";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const placeholder =
  "https://res.cloudinary.com/dhpjnh2q0/image/upload/v1749848437/ImagePlaceHolder_mqb8gg.png";

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
  likeList: initialLikeList,
}) => {
  // If the API returns a number (total like count), we can initialize state from the initial list length.
  const [likeCount, setLikeCount] = useState(initialLikeList ? initialLikeList.length : 0);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      // Call your likeEvent endpoint.
      const response = await axios.post(
        "https://localhost:58296/api/Event/likeEvent",
        JSON.stringify(eventId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Assume the API returns an updated like count (for example, 1)
      if (typeof response.data === "number") {
        setLikeCount(response.data);
      }
    } catch (err) {
      console.error("Error liking event", err);
    }
  };

  return (
    <motion.div
      className="event-card"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2 className="eventName" variants={childVariants}>
        {eventName}
      </motion.h2>
      <motion.div className="event-createdBy" variants={childVariants}>
        <RiAdminFill className="owner-Logo" style={{ marginTop: "3px" }} />
        <p>{createdBy}</p>
      </motion.div>
      <motion.img
        src={imageUrl && imageUrl !== "string" ? imageUrl : placeholder}
        alt={eventName}
        className="event-image"
        variants={childVariants}
      />
      <motion.div className="event-date" variants={childVariants}>
        <FaClock className="icons clock-Logo" style={{ marginTop: "3px" }} />
        <p>
          {new Date(startDate)
            .toLocaleString("sv-SE", {
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
            .toLocaleString("sv-SE", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(",", " clock:")}
        </p>
      </motion.div>
      <motion.div className="event-location" variants={childVariants}>
        <FaLocationDot className="icons location-Logo" style={{ marginTop: "3px" }} />
        <motion.p>{location}</motion.p>
      </motion.div>
      <motion.p variants={childVariants}>{description}</motion.p>
      <motion.div className="like-dislike" variants={childVariants}>
        <motion.button
          whileTap={{ scale: 1.2 }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          onClick={handleLike}
        >
          <BiSolidLike className="icon like-icon" />
          {likeCount}
        </motion.button>
      </motion.div>
      {isClosedEvent && (
        <motion.p className="closed-tag" variants={childVariants}>
          Closed Event
        </motion.p>
      )}
    </motion.div>
  );
};

export default EventCard;
