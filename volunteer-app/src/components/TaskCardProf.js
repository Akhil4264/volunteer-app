import React from 'react';

const TaskCard = ({ task, onViewSubmission, onAssign, isAssigned }) => {
  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };
  const progressPercentage = task.submissionsDone / task.totalSubmissions * 100;

  return (
    <div className="bg-white rounded shadow p-3 mb-4">
      <span className={`inline-block rounded-full w-3 h-3 mr-2 ${priorityColors[task.priority]}`}></span>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{task.taskName}</h3>
          <p className="text-sm">{task.task_description}</p>
          <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
        </div>
        
        {!task.isAssigned && (
          <div>
            <p className="text-sm">Assigned to: {task.assignedStudent}</p>
            <button onClick={() => onViewSubmission(task)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
              View Submission
            </button>
          </div>
        )}
        {task.isAssigned && (
          <button onClick={() => onAssign(task)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">
            Assign to Student
          </button>
        )}
        
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-600 mt-3">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="flex justify-center items-center h-full text-white text-sm">
            {progressPercentage.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
