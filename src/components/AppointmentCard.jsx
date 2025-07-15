import React, { useMemo } from 'react';
import '../styles/appointments.css';

const AppointmentCard = ({
  name,
  condition,
  time,
  avatar,
  attendees = [],
  onClick,        
  onAvatarClick,  
}) => {
  const resolvedAvatar = avatar || '/images/pic4.jpg';

  const colorClass = useMemo(() => {
    const variants = [
      'appointment-blue',
      'appointment-pink',
      'appointment-green',
      'appointment-purple',
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }, []);

  return (
    <div
      className="appointment-wrapper"
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div className={`appointment-card ${colorClass}`}>
        <div className="appointment-header">
          <img
            src={resolvedAvatar}
            alt={name}
            className="appointment-avatar"
          />
          <h3 className="appointment-name">{name}</h3>
        </div>
        <div className="appointment-condition">{condition}</div>
        <div className="appointment-time">{time}</div>
      </div>

      {attendees.length > 0 && (
        <div
          className="attendee-icons"
          onClick={(e) => {
            e.stopPropagation(); 
          }}
        >
          {attendees.map((src, index) => (
            <div
              key={index}
              className="attendee-avatar"
              style={{
                backgroundImage: `url(${src})`,
                zIndex: 10 - index,
              }}
              onClick={() => onAvatarClick && onAvatarClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
