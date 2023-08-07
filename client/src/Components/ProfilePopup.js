



// good win for close button
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Bookmark, Description, ExitToApp } from '@mui/icons-material';
import SettingsPage from './SettingsPage';
import './ProfilePopup.css';

const ProfilePopup = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Clicked on ${item}`);

    if (item === 'Edit Profile') {
      setIsSettingsOpen(true);
    } else {
      setIsSettingsOpen(false);
    }
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="ProfilePopup">
      <img
        className="profile-icon"
        src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
        alt="Profile"
        onClick={handlePopupToggle}
      />

      {isOpen && (
        <div className="popup-container">
          <ul className="popup-menu">
            <li className="popup-item" onClick={() => handleItemClick('Edit Profile')}>
              <Edit className="popup-item-icon" />
              <span className="popup-item-text">Edit Profile</span>
            </li>
            <li className="popup-item" onClick={() => handleItemClick('Bookmarks')}>
              <Bookmark className="popup-item-icon" />
              <span className="popup-item-text">Bookmarks</span>
            </li>
            <li className="popup-item" onClick={() => handleItemClick('Reports')}>
              <Description className="popup-item-icon" />
              <span className="popup-item-text">Reports</span>
            </li>
            <li className="popup-item" onClick={handleLogout}>
              <ExitToApp className="popup-item-icon" />
              <span className="popup-item-text">Logout</span>
            </li>
          </ul>
        </div>
      )}

      {isSettingsOpen && <SettingsPage handleClose={handleCloseSettings} />}
    </div>
  );
};

export default ProfilePopup;














