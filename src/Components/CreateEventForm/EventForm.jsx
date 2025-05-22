import { useState } from "react";
import "../../index.css";
import { motion } from "framer-motion";
import "./EventForm.css";
import CityAutocomplete from "../RegisterForm/CityAutoComplete.jsx"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState("");

  const isEndInvalid = startDate && endDate && endDate < startDate;

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <h2>Event Title</h2>
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
          <div className="form-group">
            <label>Location</label>
            <CityAutocomplete 
                className="input-field"
                value={location} 
                onChange={setLocation} 
                />
          </div>
        </div>

        <div className="form-group">
          <label>Starts</label>
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
          <label>Ends</label>
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

        <div className="form-group switch-group">
          <span className="switch-label">Public / Private</span>
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
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Event description..."
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
