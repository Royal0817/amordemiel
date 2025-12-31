import React from 'react';
import '../styles/Admin.css';

const Admin = () => {
  return (
    <div className='admin-page'>
      <section className='admin-card'>
        <p className='eyebrow'>Superuser control panel</p>
        <h2>Submissions are managed in the secure control-plane.</h2>
        <p>Open the admin portal below to review incoming inquiries and view immutable snapshots.</p>
        <a className='cta-primary' href='/api/admin/'>Open secure admin portal</a>
      </section>
    </div>
  );
};

export default Admin;
