import { useState } from 'react';
import CertificateView from '../../../../components/Dashboard/Student/Certificate/CertificateView';
import './Certificate.css';

export default function Certificate() {
  const [courseType] = useState('Full Stack Web Development (React & Node)');
  const [userName] = useState('Debabrata');

  return (
    <div className="certificate-page-wrapper">
      <h2 className="certificate-main-title">Certificate</h2>
      <CertificateView courseType={courseType} userName={userName} />
    </div>
  );
}