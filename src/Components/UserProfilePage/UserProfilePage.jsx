import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import LocationPicker from "../../Shared/LocationPicker/LocationPicker";
import "leaflet/dist/leaflet.css";
import "./userprofilepage.css";
import { motion } from "framer-motion";

// Helper to recenter the map when position changes
function Recenter({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.flyTo(position, zoom ?? map.getZoom());
  }, [position, zoom, map]);
  return null;
}

const UserProfilePage = ({ token: propToken }) => {
  const token = propToken || localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  // profile fields
  const [profilePic, setProfilePic] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userId, setUserId] = useState("");

  // map overlay state
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([59.3293, 18.0686]);
  const mapRef = useRef(null);

  // Fetch existing profile
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://localhost:58296/api/User/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.latitude != null && data.longitude != null) {
          const lat = parseFloat(data.latitude);
          const lng = parseFloat(data.longitude);
          const apiPos = [lat, lng];
          setMarkerPosition(apiPos);
          setLocation({ lat, lng });
        }
        setProfilePic(data.profilePicture);
        setUsername(data.userName);
        setUserId(data.userId);
      } catch {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation not supported");
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const newPos = [coords.latitude, coords.longitude];
        setMarkerPosition(newPos);
        setLocation({ lat: coords.latitude, lng: coords.longitude });
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          mapRef.current.flyTo(newPos, 12);
        }
      },
      (err) => alert("Unable to fetch location: " + err.message)
    );
  };

  const handleLocationChange = (coords) => {
    setMarkerPosition(coords);
    setLocation({ lat: coords[0], lng: coords[1] });
    if (mapRef.current) {
      mapRef.current.invalidateSize();
      mapRef.current.flyTo(coords, mapRef.current.getZoom());
    }
  };

  const handleSave = async () => {
    setError("");
    setUpdateSuccess(false);
    try {
      const url = `https://localhost:58296/api/User/${userId}`;
      if (profileFile) {
        const formData = new FormData();
        formData.append("UserName", username);
        formData.append("Latitude", location.lat != null ? location.lat.toString() : "");
        formData.append("Longitude", location.lng != null ? location.lng.toString() : "");
        formData.append("NewProfilePicture", profileFile);
        await axios.put(url, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const payload = {
          UserName: username,
          OldImageUrl: profilePic, 
          Latitude: location.lat != null ? location.lat.toString() : "",
          Longitude: location.lng != null ? location.lng.toString() : "",
        };
        await axios.put(url, payload, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      }
      // Instead of alert, set updateSuccess flag to true
      setUpdateSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
    }
  };

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `https://localhost:58296/api/User/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch {
      setError("Failed to delete account.");
    }
  };
  const handleCancelDelete = () => setShowDeleteModal(false);

  if (loading) return <p>Loading...</p>;

  return (
    <motion.div
      className="user-profile-page"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.5 } }}
    >
      <h1>Edit Profile</h1>

      {error && <p className="error">{error}</p>}
      {updateSuccess && (
        <div className="update-success">
          <p className="Success-Message">Updated</p>
        </div>
      )}

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
                setProfileFile(file);
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

        {/* Change Location */}
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

        {/* Save / Delete buttons */}
        <motion.button 
          onClick={handleSave}
          whileTap={{ scale: 1.1 }}
          className="update-button"
        >
          Update Changes
        </motion.button>
        <motion.button 
          onClick={handleDeleteClick} 
          whileTap={{ scale: 1.1 }}
          className="delete-button"
        >
          Delete Account
        </motion.button>

        {/* Delete Confirmation Modal */}
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
