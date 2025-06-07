import { useState } from "react";
import "../../index.css";
import { motion } from "framer-motion";
import "./EventForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const EventForm = ({ onClose }) => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState("");
  const [bgFile, setBgFile] = useState(null);
  const [error, setError] = useState("");
  const [bgPreview, setBgPreview] = useState(null);

  const isEndInvalid = startDate && endDate && endDate < startDate;

  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgFile(file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enhanced validation
    if (!eventName || !location || !startDate || !endDate) {
      setError("Please fill in all required fields.");
      return;
    }

    if (endDate < startDate) {
      setError("End date must be after start date.");
      return;
    }

    setError(""); // Clear errors

    // Process form submission
    console.log({
      eventName,
      location,
      startDate,
      endDate,
      isPrivate,
      description,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="event-form-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.button
        onClick={onClose}
        className="close-Form-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoClose size={24} />
      </motion.button>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <h2 className="event-title">Create Event</h2>
          {error && (
            <div
              className="error-message"
              style={{ color: "red", margin: "10px 0" }}
            >
              {error}
            </div>
          )}
          <input
            className="input-field"
            type="text"
            placeholder="Event Title..."
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="file"
            id="bg-input"
            accept="image/*"
            onChange={handleBgChange}
            style={{ display: "none" }}
          />
          <motion.button
            className="event-img-upload-button"
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("bg-input").click()}
          >
            <CiImageOn size={24} />
            Choose Image
          </motion.button>
        </div>

        {bgPreview && (
          <div className="form-group">
            <p className="preview-text">{bgPreview}</p>
          </div>
        )}

        <div className="form-group">
          <input
            className="input-field"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location..."
            required
          />
        </div>

        <div className="form-group">
          <DatePicker
            className="input-field"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="Select start"
          />
        </div>

        <div className="form-group">
          <DatePicker
            className="input-field"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={startDate}
            placeholderText="Select end"
          />
          {isEndInvalid && <p className="error">End must be after start.</p>}
        </div>

        <div className="switch-group">
          <span className="switch-label">Private Event?</span>
          <Switch
            onChange={(checked) => setIsPrivate(checked)}
            checked={isPrivate}
            offColor="#ccc"
            onColor="#514dc4"
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={40}
          />
        </div>

        <div className="form-group">
          <textarea
            className="description-field input-field"
            value={description}
            placeholder="Event description..."
            style={{ height: "auto", overflowY: "auto" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
              setDescription(e.target.value);
            }}
          />
        </div>

        <motion.button
          type="submit"
          className="submit-button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Create Event
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EventForm;
