import React from 'react';
import Sidebar from '../components/Sidebar';
import CalendarHeader from '../components/CalendarHeader';
import CalendarGrid from '../components/CalendarGrid';
import '../styles/appointments.css';

const ScheduledAppointments = () => {
  return (
    <div className="appointments-container">
      <Sidebar />
      <div className="appointments-main">
        <CalendarHeader />

        <div className="calendar-summary-bar">
          <h2 className="calendar-title">Scheduled Appointments</h2>
          <div className="month-slider">
            <button className="month-nav">{'<'}</button>
            <span className="month-label">June 2025</span>
            <button className="month-nav">{'>'}</button>
          </div>
        </div>

        <CalendarGrid />
      </div>
    </div>
  );
};

export default ScheduledAppointments;
