import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import PopUp from './PopUp';
import SchedulePopUp from './SchedulePopUp';
import '../styles/appointments.css';

const CalendarGrid = () => {
  const [selected, setSelected] = useState(null); 
  const [schedulePopup, setSchedulePopup] = useState(null); 

  const times = ['9:00 A.M.', '10:00 A.M.', '11:00 A.M.', '12:00 P.M.'];
  const days = Array(7).fill('SUN 08');

  const attendeesMap = {
    '0-0': ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic3.jpg', '/images/pic4.jpg'],
    '0-1': ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic4.jpg'],
    '1-1': ['/images/pic1.jpg'],
    '1-3': ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic3.jpg', '/images/pic4.jpg'],
    '2-0': ['/images/pic1.jpg', '/images/pic3.jpg', '/images/pic4.jpg'],
    '2-3': ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic3.jpg', '/images/pic4.jpg'],
    '3-0': ['/images/pic1.jpg', '/images/pic3.jpg'],
    '3-1': ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic3.jpg', '/images/pic4.jpg'],
    '3-2': ['/images/pic3.jpg'],
    '4-0': ['/images/pic3.jpg', '/images/pic4.jpg'],
    '5-2': ['/images/pic1.jpg', '/images/pic4.jpg'],
    '6-0': ['/images/pic1.jpg', '/images/pic4.jpg'],
    '6-2': ['/images/pic2.jpg', '/images/pic3.jpg'],
  };

  const getEndTime = (startTime) => {
    const [hourStr, period] = startTime.split(':');
    let hour = parseInt(hourStr);
    let newHour = hour + 1;

    if (newHour === 12) {
      return `12:00 ${period === 'A.M.' ? 'P.M.' : 'A.M.'}`;
    } else if (newHour > 12) {
      newHour -= 12;
    }

    return `${newHour}:00 ${period}`;
  };

  return (
    <>
      <div className="calendar-grid">
        <div className="grid-header">
          <div className="time-label-cell"></div>
          {days.map((day, i) => (
            <div key={i} className="day-column-header">{day}</div>
          ))}
        </div>

        {times.map((time, row) => (
          <div className="grid-row" key={row}>
            <div className="time-label">{time}</div>
            {days.map((_, col) => {
              const key = `${col}-${row}`;
              const attendees = attendeesMap[key];
              const isSelected = selected?.row === row && selected?.col === col;

              return (
                <div className="grid-cell" key={col} style={{ position: 'relative' }}>
                  {attendees && (
                    <>
                      <AppointmentCard
                        name="Ajay Pal"
                        condition="Fever"
                        time={`${time} - ${getEndTime(time)}`}
                        avatar="/images/pic4.jpg"
                        attendees={attendees}
                        onClick={() => {
                          setSelected({ row, col });
                          setSchedulePopup(null); 
                        }}
                        onAvatarClick={() => {
                          setSchedulePopup({ row, col, time });
                          setSelected(null); 
                        }}
                      />

                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            [col <= 3 ? 'left' : 'right']: '105%',
                            [row >= 2 ? 'bottom' : 'top']: '0',
                            zIndex: 20,
                          }}
                        >
                          <PopUp onClose={() => setSelected(null)} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {schedulePopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '520px',
            height: '100vh',
            backgroundColor: '#fff',
            boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
            zIndex: 100,
          }}
        >
          <SchedulePopUp
            onClose={() => setSchedulePopup(null)}
            time={`${schedulePopup.time} - ${getEndTime(schedulePopup.time)}`}
          />
        </div>
      )}
    </>
  );
};

export default CalendarGrid;
