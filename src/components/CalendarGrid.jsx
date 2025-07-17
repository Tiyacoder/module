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
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const times = ['9:00 A.M.', '10:00 A.M.', '11:00 A.M.', '12:00 P.M.', '1:00 P.M.', '2:00 P.M.', '3:00 P.M.', '4:00 P.M.', '5:00 P.M.', '6:00 P.M.'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const images = ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic3.jpg', '/images/pic4.jpg'];
  const conditions = ['Fever', 'Headache', 'Cough', 'Back Pain', 'Checkup', 'Consultation'];
  const names = ['Ajay Pal', 'Sarah Johnson', 'Mike Chen', 'Lisa Davis', 'John Smith', 'Emma Wilson'];

  const generateDaysForMonth = (monthIndex) => {
    const days = [];
    const date = new Date(2025, monthIndex, 1);
    while (date.getMonth() === monthIndex) {
      const weekday = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
      const dayNum = date.getDate().toString().padStart(2, '0');
      days.push({ label: `${weekday} ${dayNum}`, dayNum });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const allDays = generateDaysForMonth(currentMonth);
  const totalWeeks = Math.ceil(allDays.length / 7);
  const currentWeekDays = allDays.slice(currentWeekIndex * 7, (currentWeekIndex + 1) * 7);

  const originalJanFirstWeek = {
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
    '1-6': ['/images/pic2.jpg', '/images/pic4.jpg'],
    '3-8': ['/images/pic3.jpg', '/images/pic4.jpg'],
    '5-7': ['/images/pic1.jpg', '/images/pic2.jpg'],
  };

  const generateAttendeesForWeek = (monthIndex, weekIndex) => {
    if (monthIndex === 0 && weekIndex === 0) return originalJanFirstWeek;
    
    const attendeesMap = {};
    const seed = monthIndex * 100 + weekIndex * 10;
    const appointmentCount = 4 + (seed % 3); // 4-6 appointments per week
    
    for (let i = 0; i < appointmentCount; i++) {
      const dayIndex = (seed + i * 7) % 7;
      const timeIndex = (seed + i * 3) % 10;
      const key = `${dayIndex}-${timeIndex}`;
      const attendeeCount = 1 + ((seed + i) % 4);
      const attendees = [];
      for (let j = 0; j < attendeeCount; j++) {
        attendees.push(images[(seed + i + j) % images.length]);
      }
      attendeesMap[key] = attendees;
    }
    
    const afternoonSlots = [5, 6, 7, 8, 9]; 
    for (let i = 0; i < 3; i++) { 
      const dayIndex = (seed + i * 2) % 7;
      const timeIndex = afternoonSlots[(seed + i) % afternoonSlots.length];
      const key = `${dayIndex}-${timeIndex}`;
      if (!attendeesMap[key]) { 
        const attendeeCount = 1 + ((seed + i * 2) % 3);
        const attendees = [];
        for (let j = 0; j < attendeeCount; j++) {
          attendees.push(images[(seed + i * 2 + j) % images.length]);
        }
        attendeesMap[key] = attendees;
      }
    }
    
    return attendeesMap;
  };

  const getEndTime = (startTime) => {
    const [hourStr, period] = startTime.split(':');
    let hour = parseInt(hourStr);
    let newHour = hour + 1;
    if (period === 'A.M.' && newHour === 12) return '12:00 P.M.';
    if (period === 'P.M.' && newHour === 13) return '1:00 P.M.';
    if (period === 'P.M.' && newHour > 12) newHour -= 12;
    return `${newHour}:00 ${period}`;
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) => {
      if (direction === 'prev') return prev > 0 ? prev - 1 : prev;
      if (direction === 'next') return prev < 11 ? prev + 1 : prev;
      return prev;
    });
    setCurrentWeekIndex(0);
    setSelected(null);
    setPopupPosition(null);
    setSchedulePopup(null);
  };

  const handleWeekChange = (direction) => {
    setCurrentWeekIndex((prev) => {
      if (direction === 'prev') return prev > 0 ? prev - 1 : prev;
      if (direction === 'next') return prev < totalWeeks - 1 ? prev + 1 : prev;
      return prev;
    });
    setSelected(null);
    setPopupPosition(null);
    setSchedulePopup(null);
  };

  const currentWeekAttendees = generateAttendeesForWeek(currentMonth, currentWeekIndex);

  return (
    <>
      <div className="calendar-summary-bar">
        <h2 className="calendar-title">Scheduled Appointments</h2>
        <div className="month-slider">
          <button className="month-nav" onClick={() => handleMonthChange('prev')} disabled={currentMonth === 0}>{'<'}</button>
          <span className="month-label">{`${monthNames[currentMonth]} 2025`}</span>
          <button className="month-nav" onClick={() => handleMonthChange('next')} disabled={currentMonth === 11}>{'>'}</button>
        </div>
      </div>

      <div className="calendar-container" style={{ position: 'relative' }}>
        <div className="calendar-grid" style={{ position: 'relative', height: '600px', overflowY: 'auto', overflowX: 'hidden', direction: 'rtl' }}>
          <div style={{ direction: 'ltr' }}>
            <div className="grid-header" style={{ display: 'grid', gridTemplateColumns: `80px repeat(${currentWeekDays.length}, 180px)`, borderBottom: '1px solid #ddd', height: '60px', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100 }}>
              <div className="empty-time-cell" style={{ height: '60px' }}></div>
              {currentWeekDays.map((day, i) => (
                <div key={i} className="day-column-header" style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', position: 'relative' }}>
                  {day.label}
                  {i === 0 && currentWeekIndex > 0 && (
                    <button className="week-nav-left" onClick={() => handleWeekChange('prev')} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0'}>{'<'}</button>
                  )}
                  {i === currentWeekDays.length - 1 && currentWeekIndex < totalWeeks - 1 && (
                    <button className="week-nav-right" onClick={() => handleWeekChange('next')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '0', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '1'} onMouseLeave={(e) => e.target.style.opacity = '0'}>{'>'}</button>
                  )}
                </div>
              ))}
            </div>

            {times.map((time, row) => (
              <div className="grid-row" key={row} style={{ display: 'grid', gridTemplateColumns: `80px repeat(${currentWeekDays.length}, 180px)` }}>
                <div className="time-label" style={{ borderBottom: '1px solid #ddd', height: '120px', display: 'flex', alignItems: 'center', fontSize: '12px', whiteSpace: 'nowrap', paddingLeft: '8px' }}>{time}</div>
                {currentWeekDays.map(({ dayNum }, col) => {
                  const key = `${col}-${row}`;
                  const attendees = currentWeekAttendees[key];
                  const seed = currentMonth * 100 + currentWeekIndex * 10 + col + row;

                  return (
                    <div className="grid-cell" key={col} style={{ position: 'relative', height: '120px' }}>
                      {attendees && (
                        <AppointmentCard
                          name="Ajay Pal"
                          condition="Fever"
                          time={`${time} - ${getEndTime(time)}`}
                          avatar="/images/pic4.jpg"
                          attendees={attendees}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setSelected({ row, col, dayNum });
                            setPopupPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width, height: rect.height });
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
        </div>
      </div>

      {schedulePopup && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '520px', height: '100vh', backgroundColor: '#fff', boxShadow: '-2px 0 10px rgba(0,0,0,0.1)', zIndex: 10000 }}>
          <SchedulePopUp onClose={() => setSchedulePopup(null)} time={`${schedulePopup.time} - ${getEndTime(schedulePopup.time)}`} />
        </div>
      )}

      {selected && popupPosition && (
        <div style={{
          position: 'absolute',
          top: selected.row >= 2 ? popupPosition.top - 290 : popupPosition.top + popupPosition.height + 10,
          left: selected.col >= Math.floor(currentWeekDays.length / 2) ? popupPosition.left - 330 : popupPosition.left + popupPosition.width + 10,
          zIndex: 9999,
        }}>
          <PopUp onClose={() => setSelected(null)} />
        </div>
      )}
    </>
  );
};

export default CalendarGrid;