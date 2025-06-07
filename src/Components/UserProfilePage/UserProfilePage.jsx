import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./userprofilepage.css";
import { motion } from "framer-motion";
import axios from "axios";

const UserProfilePage = ({ userId, token }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { profilePic, username, location } = response.data;
        setProfilePic(profilePic);
        setUsername(username);
        setLocation(location);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleSave = async () => {
    try {
      const updatedData = { profilePic, username, location };
      await axios.put(`/api/users/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      setError("Failed to delete account.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

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
        <div className="form-group">
          <div className="profile-pic-wrapper">
            <label htmlFor="profile-pic" className="profile-pic-label">
              <img
                src={profilePic || "/src/Images/The_Council_v.3.png"}
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
                if (file && file.type.startsWith("image/")) {
                  setProfilePic(URL.createObjectURL(file)); // Preview the selected image
                } else {
                  alert("Please select a valid image file.");
                }
              }}
              className="profile-pic-input input-field"
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            placeholder="Change username"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
            placeholder="Change location"
          />
        </div>

        <motion.button onClick={handleSave} className="update-button">
          Update Changes
        </motion.button>
        <motion.button onClick={handleDeleteClick} className="delete-button">
          Delete Account
        </motion.button>
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-text">
                Are you sure you want to delete your account? This cannot be
                undone.
              </p>
              <button
                className="modal-btn confirm"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="modal-btn cancel"
                onClick={handleCancelDelete}
              >
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
