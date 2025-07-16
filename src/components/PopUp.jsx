import React from 'react';

const PopUp = ({ onClose, onSeeDetails }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '12px',
      width: '380px',
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
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#333',
          cursor: 'pointer'
        }}
      >
        Close
      </button>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '18px' }}>
        <img 
          src="/images/pic4.jpg" 
          alt="Profile" 
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            marginRight: '14px',
            objectFit: 'cover'
          }}
        />
        <div>
          <h2 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Ajay Pal</h2>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '13px' }}>Employee Id</p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '14px 0' }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '18px',
        marginBottom: '18px'
      }}>
        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Appointment Name
          </p>
          <p style={{ margin: '0', fontSize: '15px', fontWeight: '600' }}>Fever</p>
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Appointment Type
          </p>
          <p style={{ margin: '0', fontSize: '15px', fontWeight: '600' }}>Initial Appointment</p>
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Doctor Name
          </p>
          <p style={{ margin: '0', fontSize: '15px', fontWeight: '600' }}>Dr. Shubham</p>
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontSize: '13px', fontWeight: '600' }}>
            Doctor Type
          </p>
          <p style={{ margin: '0', fontSize: '15px', fontWeight: '600' }}>Specialist / Cardiologists</p>
        </div>
      </div>

      <button
        onClick={onSeeDetails}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dcdcdc',
          borderRadius: '7px',
          fontSize: '15px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        See Patient Details <span style={{ fontSize: '17px' }}>↗</span>
      </button>
    </div>
  );
};

export default PopUp;
