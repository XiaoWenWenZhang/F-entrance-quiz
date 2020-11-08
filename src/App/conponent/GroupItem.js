import React from 'react';
import '../../style/GroupItem.css';

const GroupItem = ({ students }) => {
  return (
    <div className="group-item">
      {students.map((student) => (
        <span className="student-item">
          {student.id}
          {student.name}
        </span>
      ))}
    </div>
  );
};

export default GroupItem;
