import React from 'react';

const SchedulePopUp = ({ onClose, time }) => {
  const appointments = [
    { patient: 'Dipanshu Goel', staff: 'Employee', type: 'Consultation', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Follow up v...', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Consultation', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Follow up v...', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Consultation', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Follow up v...', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Consultation', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Follow up v...', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Consultation', status: 'Scheduled' },
    { patient: 'Dipanshu Goel', staff: 'Contractor', type: 'Follow up v...', status: 'Scheduled' }
  ];

  const popupStyle = {
    position: 'fixed',
    top: '0',
    right: '0',
    height: '100vh',
    width: '520px',
    backgroundColor: 'white',
    borderLeft: '1px solid #ddd',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const headerStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // <-- updated
    flexShrink: 0,
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2196F3',
    margin: 0,
    marginBottom: '6px' // <-- added spacing
  };

  const timeStyle = {
    fontSize: '14px',
    color: '#2196F3',
    margin: 0
  };

  const closeStyle = {
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    color: '#666',
  };

  const tableContainerStyle = {
    flexGrow: 1,
    overflowY: 'auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    backgroundColor: '#f5f5f5',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    color: '#555',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  };

  const tdStyle = {
    padding: '12px',
    fontSize: '14px',
    color: '#666',
    borderBottom: '1px solid #f0f0f0',
  };

  const statusStyle = {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  };

  const eyeStyle = {
    color: '#2196F3',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div style={popupStyle}>
      <div style={headerStyle}>
        <div>
          <h3 style={titleStyle}>Sunday (08-06-2025)</h3>
          <p style={timeStyle}>{time}</p>
        </div>
        <button style={closeStyle} onClick={onClose}>×</button>
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Patient Name</th>
              <th style={thStyle}>Staff Type</th>
              <th style={thStyle}>Appointme...</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt, index) => (
              <tr key={index}>
                <td style={tdStyle}>{apt.patient}</td>
                <td style={tdStyle}>{apt.staff}</td>
                <td style={tdStyle}>{apt.type}</td>
                <td style={tdStyle}>
                  <span style={statusStyle}>{apt.status}</span>
                </td>
                <td style={tdStyle}>
                  <span style={eyeStyle}>👁</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePopUp;