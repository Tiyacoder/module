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

      

        <CalendarGrid />
      </div>
    </div>
  );
};

export default ScheduledAppointments;
