import React, { useState } from 'react';
import '../styles/appointments.css';
import { Home } from 'react-feather';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const iconGroups = [
    [0, 1, 2],     
    [3, 4],        
    [5, 6, 7, 8],  
  ];

  return (
    <div className="custom-sidebar">
      <div className="sidebar-inner">
        <div className="logo-box">
          <img
            src="https://img.freepik.com/premium-vector/scenic-mountain-landscape-silhouette-vector-beautiful-mountain-pine-trees-illustration_1127524-530.jpg"
            alt="Logo"
          />
        </div>

        <div className="icon-list">
          {iconGroups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {group.map((iconIndex) => (
                <div
                  key={iconIndex}
                  className={`sidebar-icon-wrapper ${activeIndex === iconIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(iconIndex)}
                >
                  <Home className="sidebar-icon" />
                </div>
              ))}
              {groupIndex < iconGroups.length - 1 && (
                <div className="sidebar-divider" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
