import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPencilAlt } from 'react-icons/fa';
import './ProfileView.css';

export default function ProfileView({ userData, onUpdateData }) {
  const [data, setData] = useState(userData);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleEditClick = (fieldName, currentValue) => {
    setEditingField(fieldName);
    setTempValue(currentValue);
  };

  const handleSave = (fieldName) => {
    const updated = { ...data, [fieldName]: tempValue };
    setData(updated);
    onUpdateData(updated);
    setEditingField(null);
  };

  const handleImageUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = { ...data, profileImage: URL.createObjectURL(file) };
      setData(updated);
      onUpdateData(updated);
    }
  };

  return (
    <motion.div 
      className="profile-view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-top-grid">
        <div className="profile-avatar-col">
          <img src={data.profileImage} alt="Profile" className="profile-large-avatar" />
          <label className="edit-avatar-label">
            Edit Photo
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpdate} />
          </label>
        </div>

        <div className="profile-info-col">
          <div className="profile-name-row">
            <h2>{data.firstName} {data.lastName}</h2>
            <span className="profile-course-badge">Courses Completed: 4 / 10</span>
          </div>

          <div className="profile-stats-row">
            <div className="stat-item">
              <span className="num">342</span>
              <span className="label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="num">180</span>
              <span className="label">Following</span>
            </div>
          </div>

          <div className="badges-row">
            <strong>Badges:</strong>
            <span className="mini-badge">🔥 7 Days Streak</span>
            <span className="mini-badge">🏆 Task Master</span>
          </div>

          <div className="skills-tags">
            <strong>Skills:</strong>
            {data.skills?.map((s, idx) => (
              <span key={idx} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="editable-details-grid">
        {Object.entries({
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          phone: 'Phone',
          college: 'College Name',
          branch: 'Branch',
          currentAddress: 'Current Address',
          pincode: 'Pincode'
        }).map(([key, label]) => (
          <div className="editable-field-box" key={key}>
            <div className="field-content">
              <label>{label}</label>
              {editingField === key ? (
                <input 
                  type="text" 
                  value={tempValue} 
                  onChange={(e) => setTempValue(e.target.value)} 
                  onBlur={() => handleSave(key)}
                  autoFocus
                />
              ) : (
                <span>{data[key]}</span>
              )}
            </div>
            <button className="pencil-btn" onClick={() => handleEditClick(key, data[key])}>
              <FaPencilAlt />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}