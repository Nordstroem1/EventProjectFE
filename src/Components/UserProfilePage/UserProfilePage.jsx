import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./userprofilepage.css";
import { motion } from "framer-motion";
import axios from "axios";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import LocationPicker from "../../Shared/LocationPicker/LocationPicker";
import "leaflet/dist/leaflet.css";

function Recenter({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.flyTo(position, zoom ?? map.getZoom());
  }, [position, zoom, map]);
  return null;
}

const UserProfilePage = ({ userId, token }) => {
  const navigate = useNavigate();

  // profile fields
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState(""); // store as "lat,lng" string
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // map overlay
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([59.3293, 18.0686]);
  const mapRef = useRef(null);

  // fetch existing profile
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfilePic(data.profilePic);
        setUsername(data.username);
        // if your backend stores lat/lng, split to numbers:
        if (data.location) {
          const [lat, lng] = data.location.split(",").map(Number);
          setMarkerPosition([lat, lng]);
          setLocation(data.location);
        }
      } catch {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, token]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation not supported");
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const newPos = [coords.latitude, coords.longitude];
        setMarkerPosition(newPos);
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          mapRef.current.flyTo(newPos, 12); // keep this for immediate fly
        }
      },
      (err) => alert("Unable to fetch location: " + err.message)
    );
  };

  const handleLocationChange = (coords) => {
    setMarkerPosition(coords);
    if (mapRef.current) {
      mapRef.current.invalidateSize();
      mapRef.current.flyTo(coords, mapRef.current.getZoom());
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `/api/users/${userId}`,
        { profilePic, username, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
    } catch {
      setError("Failed to update profile.");
    }
  };

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch {
      setError("Failed to delete account.");
    }
  };
  const handleCancelDelete = () => setShowDeleteModal(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <motion.div
      className="user-profile-page"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.5 } }}
    >
      <h1>Edit Profile</h1>
      <div className="profile-form">
        {/* Profile picture */}
        <div className="form-group">
          <label htmlFor="profile-pic">
            <img
              src={profilePic || "https://res.cloudinary.com/dhpjnh2q0/image/upload/v1749848437/ImagePlaceHolder_mqb8gg.png"}
              alt="Profile"
              className="profile-pic-preview"
            />
          </label>
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file?.type.startsWith("image/")) {
                setProfilePic(URL.createObjectURL(file));
              } else {
                alert("Please select a valid image file.");
              }
            }}
            className="profile-pic-input"
          />
        </div>

        {/* Username */}
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            placeholder="Change username"
          />
        </div>

        {/* Choose Location */}
        <div className="form-group">
          <motion.button
            type="button"
            className="change-location-button"
            onClick={() => setShowMap((v) => !v)}
            whileTap={{ scale: 1.1 }}
          >
            Change Location
          </motion.button>
        </div>

        {/* Map Overlay */}
        {showMap && (
          <div className="map-overlay" onClick={() => setShowMap(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <MapContainer
                center={markerPosition}
                zoom={12}
                whenCreated={(map) => (mapRef.current = map)}
                eventHandlers={{ zoomend: () => mapRef.current?.invalidateSize() }}
                className="location-picker"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker
                  position={markerPosition}
                  onChange={handleLocationChange}
                />
                <Recenter position={markerPosition} zoom={12} />
              </MapContainer>
              <div className="map-overlay-controls">
                <button
                  type="button"
                  className="gps-button"
                  onClick={handleUseMyLocation}
                >
                  Use My Location
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save / Delete */}
        <motion.button 
        onClick={handleSave}
         whileTap={{ scale: 1.1 }}
          className="update-button">
          Update Changes
        </motion.button>
        <motion.button 
        onClick={handleDeleteClick} 
        whileTap={{ scale: 1.1 }}
        className="delete-button">
          Delete Account
        </motion.button>

        {/* Delete Confirmation */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to delete your account?</p>
              <button onClick={handleConfirmDelete} className="modal-btn confirm">
                Yes
              </button>
              <button onClick={handleCancelDelete} className="modal-btn cancel">
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfilePage;
