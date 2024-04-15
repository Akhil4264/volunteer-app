import React from 'react';
import TaskCard from './TaskCardProf';

const TaskDetailsModal = ({ task, isOpen, onClose, onViewSubmission, onAssign, isAssigned }) => {
  if (!isOpen) return null;

  return(
        <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Task Details</h2>
          <button onClick={onClose} className="text-lg font-semibold">&times;</button>
        </div>
        {/* <TaskCard task={task} onProgressChange={onProgressChange}/> */}
        <TaskCard task={task} onViewSubmission={onViewSubmission}  onAssign={onAssign} isAssigned={isAssigned}/>
        
      </div>
    </div>
  );
};

export default TaskDetailsModal;
