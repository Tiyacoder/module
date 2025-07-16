import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import PopUp from './PopUp';
import SchedulePopUp from './SchedulePopUp';
import '../styles/appointments.css';

const CalendarGrid = () => {
  const [selected, setSelected] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [schedulePopup, setSchedulePopup] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(0);

  const times = ['9:00 A.M.', '10:00 A.M.', '11:00 A.M.', '12:00 P.M.'];

  const generateDaysForMonth = (monthIndex) => {
    const days = [];
    const year = 2025;
    const date = new Date(year, monthIndex, 1);
    while (date.getMonth() === monthIndex) {
      const weekday = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
      const dayNum = date.getDate().toString().padStart(2, '0');
      days.push({ label: `${weekday} ${dayNum}`, dayNum });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = generateDaysForMonth(currentMonth);

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
    if (newHour === 12) return `12:00 ${period === 'A.M.' ? 'P.M.' : 'A.M.'}`;
    if (newHour > 12) newHour -= 12;
    return `${newHour}:00 ${period}`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) => {
      if (direction === 'prev') return prev > 0 ? prev - 1 : prev;
      if (direction === 'next') return prev < 11 ? prev + 1 : prev;
      return prev;
    });
    setSelected(null);
    setPopupPosition(null);
    setSchedulePopup(null);
  };

  const gridWidth = 100 + days.length * 0;

  return (
    <>
      <div className="calendar-summary-bar">
        <h2 className="calendar-title">Scheduled Appointments</h2>
        <div className="month-slider">
          <button
            className="month-nav"
            onClick={() => handleMonthChange('prev')}
            disabled={currentMonth === 0}
          >
            {'<'}
          </button>
          <span className="month-label">{`${monthNames[currentMonth]} 2025`}</span>
          <button
            className="month-nav"
            onClick={() => handleMonthChange('next')}
            disabled={currentMonth === 11}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div
        className="calendar-grid"
        style={{ overflowX: 'auto', minWidth: `${gridWidth}px`, position: 'relative' }}
      >
        <div
          className="grid-header"
          style={{
            display: 'grid',
            gridTemplateColumns: `100px repeat(${days.length}, 180px)`,
            minWidth: `${gridWidth}px`,
            borderBottom: '1px solid #ddd',
            boxSizing: 'border-box',
            height: '60px',
          }}
        >
          <div className="empty-time-cell" style={{ height: '60px' }}></div>
          {days.map((day, i) => (
            <div
              key={i}
              className="day-column-header"
              style={{
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {day.label}
            </div>
          ))}
        </div>

        {times.map((time, row) => (
          <div
            className="grid-row"
            key={row}
            style={{
              display: 'grid',
              gridTemplateColumns: `100px repeat(${days.length}, 180px)`,
              minWidth: `${gridWidth}px`
            }}
          >
            <div
              className="time-label"
              style={{
                borderBottom: '1px solid #ddd',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {time}
            </div>

            {days.map(({ dayNum }, col) => {
              const key = `${col}-${row}`;
              const attendees = attendeesMap[key];

              return (
                <div className="grid-cell" key={col} style={{ position: 'relative', height: '120px' }}>
                  {attendees && currentMonth === 0 && (
                    <AppointmentCard
                      name="Ajay Pal"
                      condition="Fever"
                      time={`${time} - ${getEndTime(time)}`}
                      avatar="/images/pic4.jpg"
                      attendees={attendees}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setSelected({ row, col, dayNum });
                        setPopupPosition({
                          top: rect.top + window.scrollY,
                          left: rect.left + window.scrollX,
                          width: rect.width,
                          height: rect.height,
                        });
                        setSchedulePopup(null);
                      }}
                      onAvatarClick={() => {
                        setSchedulePopup({ row, col, time });
                        setSelected(null);
                      }}
                    />
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
            zIndex: 10000,
          }}
        >
          <SchedulePopUp
            onClose={() => setSchedulePopup(null)}
            time={`${schedulePopup.time} - ${getEndTime(schedulePopup.time)}`}
          />
        </div>
      )}

      {selected && popupPosition && (
        <div
          style={{
            position: 'absolute',
            top:
              selected.row >= 2
                ? popupPosition.top - 290
                : popupPosition.top + popupPosition.height + 10,
            left:
              ['05', '06', '07'].includes(selected.dayNum)
                ? popupPosition.left - 330
                : popupPosition.left + popupPosition.width + 10,
            zIndex: 9999,
          }}
        >
          <PopUp onClose={() => setSelected(null)} />
        </div>
      )}
    </>
  );
};

export default CalendarGrid;
