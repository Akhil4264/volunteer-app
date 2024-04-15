import React from 'react';

const LeanTaskCard = ({ task, onCardClick }) => {
    const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };
  return (
    <div className="bg-white rounded shadow p-3 mb-4 cursor-pointer" onClick={() => onCardClick(task)}>
    <span className={`inline-block rounded-full w-3 h-3 ${priorityColors[task.priority] || 'bg-gray-500'}`}></span>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{task.taskName}</h3>
          <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
        </div>
        
      </div>
    </div>
  );
};

export default LeanTaskCard;
