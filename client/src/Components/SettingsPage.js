



import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { Edit, Bookmark, Description, ExitToApp } from '@mui/icons-material';
import './SettingsPage.css';

const SettingsPage = ({ handleClose }) => {
  const [profilePhoto, setProfilePhoto] = useState('https://example.com/profile-photo.jpg'); // Initial profile photo URL

  const handleAvatarChange = () => {
    // Logic to handle profile picture change
    // This can include opening a file picker, uploading the new image, and updating the profilePhoto state with the new URL
    // Here, we're updating it with a static URL for demonstration purposes
    setProfilePhoto('https://example.com/new-profile-photo.jpg');
  };

  return (
    <div className="SettingsPage">
      <button className="close-button" onClick={handleClose}>
        ✕
      </button>
      <h1>
        <Edit className="edit-icon" />
        Edit Profile
      </h1>
      <p>Change Profile Picture</p>
      <Avatar
        alt="Profile Photo"
        src={profilePhoto} // Use the profilePhoto state as the src for the Avatar component
        className="profile-photo"
        onClick={handleAvatarChange} // Handle profile picture change logic
      />
      <button className="button">Save Change</button>
    </div>
  );
};

export default SettingsPage;
