import React, { useState } from 'react';
import request from '../api/axios';

const CreateTaskModal = ({ onCreate, onClose, students ,userState,userFunc,eventState,eventFunc}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    assignedStudent: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // console.log(task)
    onCreate(task);    
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-gray-500  flex justify-center items-center z-50`}>
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title of Project"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            name="assignedStudent"
            value={task.assignedStudent}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Assign to Student</option>

            {students.map((student) => {
              return <option key={student.id} value={student.id}>{student.name}</option>
            })

            }


          </select>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
