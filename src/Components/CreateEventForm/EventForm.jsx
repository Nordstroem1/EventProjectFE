import { useState, useRef, useEffect } from "react";
import "../../index.css";
import { motion } from "framer-motion";
import "./EventForm.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import LocationPicker from "../../Shared/LocationPicker/LocationPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const EventForm = ({ onClose, onEventCreated }) => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState("");
  const [bgFile, setBgFile] = useState(null);
  const [error, setError] = useState("");
  const [bgPreview, setBgPreview] = useState(null);
  const [markerPosition, setMarkerPosition] = useState([59.3293, 18.0686]);
  const mapRef = useRef(null);
  // Toggle map overlay
  const [showMap, setShowMap] = useState(false);

  // Called when user clicks 'Use My Location'
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation stöds ej");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log("Geolocation position:", coords);
        const newPos = [coords.latitude, coords.longitude];
        console.log("New markerPosition set to:", newPos);
        setMarkerPosition(newPos);
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          mapRef.current.flyTo(newPos, 5);
        }
      },
      (err) => {
        console.error("Error fetching geolocation:", err);
        setError("Kunde inte hämta plats: " + err.message);
      }
    );
  };

  // Handle map-click or picker changes
  const handleLocationChange = (coords) => {
    console.log("Map clicked at coords:", coords);
    setMarkerPosition(coords);
    if (mapRef.current) {
      mapRef.current.invalidateSize();
      mapRef.current.flyTo(coords, mapRef.current.getZoom());
    }
  };

  // On mount ensure the map container is correctly sized
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  const isEndInvalid = startDate && endDate && endDate < startDate;

  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBgFile(file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
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
    try {
      const token = localStorage.getItem("jwtToken");

      const data = new FormData();
      data.append("EventName", eventName);
      data.append("Location", location);
      data.append("StartDate", startDate.toISOString());
      data.append("EndDate", endDate.toISOString());
      data.append("IsPrivate", isPrivate);
      data.append("Description", description);
      // include picked coordinates
      data.append("Latitude", markerPosition[0]);
      data.append("Longitude", markerPosition[1]);

      // Append image file only if one is selected
      if (bgFile) {
        data.append("ImageFile", bgFile);
      }

      const response = await axios.post(
        "https://localhost:58296/api/Event/createEvent",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // The API returns an envelope with a `data` property containing the event
      const envelope = response.data;
      const newEvent = envelope.data;
      console.log("Event created:", newEvent);
      // Notify parent and close
      if (onEventCreated) onEventCreated(newEvent);
      onClose();
    } catch (err) {
      console.error(err);
      const apiError = err.response?.data?.message || err.message;
      setError(apiError);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  // Component to pan/resize map when `position` changes
  function Recenter({ position }) {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
      map.flyTo(position, map.getZoom());
    }, [position]);
    return null;
  }

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
          <div className="input-with-counter">
            <input
              className="input-field"
              type="text"
              placeholder="Event Title..."
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              maxLength={45}
            />
            <span className="char-counter">{eventName.length}/45</span>
          </div>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="event-img-upload-button"
            onClick={() => setShowMap((prev) => !prev)}
          >
            Choose Location
          </motion.button>
        </div>
        {showMap && (
          <div className="map-overlay" onClick={() => setShowMap(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <MapContainer
                center={markerPosition}
                zoom={12}
                whenCreated={(map) => (mapRef.current = map)}
                eventHandlers={{
                  zoomend: () => mapRef.current?.invalidateSize(),
                }}
                className="location-picker"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker
                  position={markerPosition}
                  onChange={handleLocationChange}
                />
                <Recenter position={markerPosition} />
              </MapContainer>
              <div className="map-overlay-controls">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="gps-button"
                  onClick={handleUseMyLocation}
                >
                  Use My Location
                </motion.button>
              </div>
            </div>
          </div>
        )}

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
          <div className="input-with-counter">
            <textarea
              className="description-field input-field"
              value={description}
              placeholder="Event description..."
              maxLength={300}
              style={{ height: "auto", overflowY: "auto" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
                setDescription(e.target.value);
              }}
            />
            <span className="char-counter">{description.length}/300</span>
          </div>
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
