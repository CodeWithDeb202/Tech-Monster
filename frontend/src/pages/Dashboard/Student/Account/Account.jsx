import { useState } from 'react';
import AccountForm from '../../../../components/Dashboard/Student/Account/AccountForm';
import ProfileView from '../../../../components/Dashboard/Student/Account/ProfileView';
import './Account.css';

export default function Account() {
  // Check if profile details already exist (simulate storage/database state)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data);
    setIsSubmitted(true);
  };

  const handleDataUpdate = (updatedData) => {
    setUserData(updatedData);
  };

  return (
    <div className="account-page-wrapper">
      <h2 className="account-main-title">Account</h2>
      {!isSubmitted ? (
        <AccountForm onSubmitForm={handleFormSubmit} />
      ) : (
        <ProfileView userData={userData} onUpdateData={handleDataUpdate} />
      )}
    </div>
  );
}