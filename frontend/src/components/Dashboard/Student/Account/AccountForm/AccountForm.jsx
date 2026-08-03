import { useState } from 'react';
import { motion } from 'framer-motion';
import './AccountForm.css';

import { updateProfile } from '../../../../../services/api/profileService';
import { tokenStorage } from "../../../../../services/auth/tokenStorage";
import { uploadProfileImage } from '../../../../../services/api/profileService';


export default function AccountForm({ initialEmail, onSubmitForm }) {
  const loginUser = tokenStorage.getUser();
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    avatar: null,

    firstName: "",
    middleName: "",
    lastName: "",

    email: loginUser?.email || "",

    gender: "",
    phone: "",

    education: "",
    college: "",
    degree: "",
    branch: "",
    year: "",
    semester: "",

    github: "",
    linkedin: "",
    portfolio: "",

    bio: "",

    skills: [],

    currentAddress: "",
    localAddress: "",
    district: "",
    state: "",
    pincode: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Pincode auto-fill logic simulation
    if (name === 'pincode' && value.length === 6) {
      if (value === '751024') { // Example Pin code logic
        setFormData(prev => ({ ...prev, pincode: value, district: 'Khordha', state: 'Odisha' }));
      } else {
        setFormData(prev => ({ ...prev, pincode: value, district: 'Bhubaneswar District', state: 'Odisha' }));
      }
    }
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));

  }

  const addSkill = () => {
    if (skillInput && formData.skills.length < 7 && !formData.skills.includes(skillInput)) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput('');
    }
  };

  const removeSkill = (indexToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (imageFile) {

        const form = new FormData();

        form.append("image", imageFile);

        await uploadProfileImage(form);

      }

      const res = await updateProfile(formData);

      onSubmitForm(res.data.user);

    } catch (err) {

      console.log(err);

    }

  }

  return (
    <>

      <div className="username-box">
        <h2>{loginUser?.username}</h2>
      </div>

      <motion.form
        className="account-form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >

        <h3 className="form-section-title">1. Personal Details</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Choose Profile Photo (Under 2MB) *</label>
            <input type="file" accept="image/*" required onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginTop: "15px",
                  border: "2px solid #ddd"
                }}
              />
            )}
          </div>
          <div className="form-group">
            <label>First Name *</label>
            <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email (Auto-filled) *</label>
            <input type="email" name="email" value={formData.email} readOnly />
          </div>
          <div className="form-group">
            <label>Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <div className="whatsapp-row">
              <input type="tel" name="phone" required placeholder="10-digit number" value={formData.phone} onChange={handleChange} />
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="whatsapp-link">Join WhatsApp</a>
            </div>
          </div>
          <div className="form-group">
            <label>Date of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="form-section-title">2. Educational Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>What are you studying? *</label>
            <input type="text" name="education" required placeholder="e.g. B.Tech / BCA" value={formData.education} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>College Name *</label>
            <input type="text" name="college" required value={formData.college} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Branch *</label>
            <input type="text" name="branch" required value={formData.branch} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Year *</label>
            <input type="text" name="year" required placeholder="e.g. 3rd Year" value={formData.year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Semester *</label>
            <input type="text" name="semester" required placeholder="e.g. 5th Sem" value={formData.semester} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Add Skills (Maximum 7) *</label>
            <div className="skills-input-container">
              <input type="text" value={skillInput} placeholder="Add skill & click add" onChange={(e) => setSkillInput(e.target.value)} />
              <button type="button" className="add-skill-btn" onClick={addSkill}>Add</button>
            </div>
            <div className="skills-tags">
              {formData.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">
                  {skill} <span onClick={() => removeSkill(idx)}>×</span>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Github</label>

            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>

            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="form-section-title">3. Address Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Current Address *</label>
            <input type="text" name="currentAddress" required value={formData.currentAddress} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Local Address *</label>
            <input type="text" name="localAddress" required value={formData.localAddress} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Pincode *</label>
            <input type="text" name="pincode" required maxLength={6} value={formData.pincode} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>District (Auto-filled) *</label>
            <input type="text" name="district" value={formData.district} readOnly />
          </div>
          <div className="form-group full-width">
            <label>State (Auto-filled) *</label>
            <input type="text" name="state" value={formData.state} readOnly />
          </div>
          <div className="form-group">
            <label>Bio</label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
        </div>


        <button type="submit" className="submit-btn">Save & Open Profile</button>
      </motion.form>
    </>
  );
}