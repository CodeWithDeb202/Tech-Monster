import './Attendance.css';

import { useState, useEffect } from 'react';

import AttendanceHeader from '../../../../components/Dashboard/Student/Attendance/AttendanceHeader';
import StreakBadges from '../../../../components/Dashboard/Student/Attendance/StreakBadges';
import CalendarGrid from '../../../../components/Dashboard/Student/Attendance/CalendarGrid';

export default function AttendancePage() {
  const [user] = useState({
    name: 'Debabrata',
    email: '@Debabrata',
    avatar: 'https://via.placeholder.com/150', 
  });

  const [attendanceData, setAttendanceData] = useState({});
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const today = new Date().getDate();
    
    // Auto mark present on visit/task completion simulation
    const updatedAttendance = {
      ...attendanceData,
      [today]: 'present', 
    };

    setAttendanceData(updatedAttendance);

    let pCount = 0;
    let aCount = 0;
    Object.values(updatedAttendance).forEach((val) => {
      if (val === 'present') pCount++;
      if (val === 'absent') aCount++;
    });

    setPresentCount(pCount);
    setAbsentCount(aCount);
    setCurrentStreak(pCount); 
  }, []);

  return (
    <div className="attendance-page">
      <AttendanceHeader 
        user={user} 
        presentCount={presentCount} 
        absentCount={absentCount} 
      />
      <StreakBadges currentStreak={currentStreak} />
      <CalendarGrid attendanceData={attendanceData} />
    </div>
  );
}