import React from 'react';

const PopUp = ({ onClose, onSeeDetails }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '12px',
      width: '400px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      position: 'relative',
      zIndex: 20
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#eee',
          border: '1px solid #ccc',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          cursor: 'pointer'
        }}
      >
        Close
      </button>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src="/images/pic4.jpg" 
          alt="Profile" 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            marginRight: '16px',
            objectFit: 'cover'
          }}
        />
        <div>
          <h2 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>Ajay Pal</h2>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '14px' }}>Employee Id</p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '16px 0' }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Appointment Name
          </p>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Fever</p>
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Appointment Type
          </p>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Initial Appointment</p>
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Doctor Name
          </p>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Dr. Shubham</p>
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Doctor Type
          </p>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Specialist / Cardiologists</p>
        </div>
      </div>

      <button
        onClick={onSeeDetails}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dcdcdc',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        See Patient Details <span style={{ fontSize: '18px' }}>↗</span>
      </button>
    </div>
  );
};

export default PopUp;
