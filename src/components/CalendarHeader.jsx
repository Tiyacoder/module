import React from 'react';
import '../styles/appointments.css';
import {
  MapPin,
  Map,
  Calendar,
  Headphones,
  Bell
} from 'react-feather';
import { FaHome } from 'react-icons/fa';

const CalendarHeader = () => {
  return (
    <div className="calendar-header-wrapper">
      <div className="calendar-header-left">
        <input
          type="text"
          placeholder="Search or type"
          className="search-input"
        />
        <div className="breadcrumbs">
          <span className="crumb">
            <span className="home-icon"><FaHome /></span>
            <span className="crumb-label">Modules</span>
          </span>
          <span className="divider">›</span>
          <span className="crumb">Medical management</span>
          <span className="divider">›</span>
          <span className="crumb">SME</span>
        </div>
      </div>

      <div className="calendar-header-right">
        <MapPin size={18} />
        <Map size={18} />
        <Calendar size={18} />
        <Headphones size={18} />
        <Bell size={18} />
        <div className="profile-avatar-wrapper">
          <img
            className="profile-avatar"
            src="/images/pic5.png"
            alt="User"
          />
        </div>
        <button className="netzero-btn">net<span>zero</span></button>
      </div>
    </div>
  );
};

export default CalendarHeader;
