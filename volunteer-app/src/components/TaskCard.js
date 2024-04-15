import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import { useNavigate } from 'react-router-dom';
import request from '../api/axios';

const TaskCard = ({ task, onProgressChange }) => {
  const [showDesc, setShowDesc] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(task.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const sessionToken = localStorage.getItem('session_token');
	const role = localStorage.getItem('role');

  const navigate = useNavigate();
  const progressPercentage = task.submissionsDone / task.totalSubmissions * 100;
  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };



  const handleSendMessage = (newMessage) => {
    
    setMessages([...messages, newMessage]);
  };

  const navigateToSubmitForm = () => {
    navigate('/submitform', { state: { task } }); 
  };
  


  const openChat = () => {
    console.log('Chat with faculty feature is yet to be implemented');
  };

  return (
    <div className="bg-white rounded p-5 mb-5 relative ease-in-out">
      <div className="flex items-start justify-between">
        <span className={`inline-block rounded-full w-3 h-3 ${priorityColors[task.priority] || 'bg-gray-500'}`}></span>
        <div className="flex-grow ml-2">
          <h3 className="font-semibold text-lg">{task.taskName}</h3>
          <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
          <select
            value={task.status}
            onChange={(e) => onProgressChange(task.id, e.target.value)}
            className="mt-2 bg-gray-200 p-1 rounded"
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
            <option value="submitted">Submitted</option>
          </select>
        </div>
        <div className="flex-shrink-0">
          {/* <button
            onMouseOver={() => setShowDesc(true)}
            onMouseOut={() => setShowDesc(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 text-sm rounded mb-2"
          >
            Description
          </button>
          {showDesc && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <p>{task.description}</p>
            </div>
          )} */}
          <button
            onClick={() => setShowDesc(!showDesc)}
            className="bg-gray-300 hover:bg-blue-700 text-black font-bold py-0.5 px-1 text-sm rounded mb-2"
          >
            Description
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="bg-gray-300 hover:bg-blue-700 text-black font-bold py-0.5 px-1 text-sm rounded"
          >
            Comments
          </button>
          {showDesc && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <p>{task.task_description}</p>
            </div>
          )}
        </div>
      </div>
      
      {showComments && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="text-sm">{comment}</li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mt-2 p-1 bg-white rounded border w-full"
              placeholder="Add a comment"
            />
            <button
              type="submit"
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Add
            </button>
          </form>
        </div>
      )}
      {/* <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-600 mt-3">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="flex justify-center items-center h-full text-white text-sm">
            {progressPercentage.toFixed(0)}%
          </div>
        </div>
      </div> */}
        <div className="mt-4 flex justify-end space-x-2">
            <button onClick={navigateToSubmitForm} className="bg-gray-300 hover:bg-green-400 text-black font-bold py-1 px-2 rounded mr-2">
            Submit
            </button>
            

        <button onClick={() => setShowChat(true)} className="bg-gray-300 hover:bg-orange-300 text-black font-bold py-1 px-2 rounded">
            Chat with Faculty
        </button>
    
      </div>
      <ChatSidebar 
            isOpen={showChat} 
            onClose={() => setShowChat(false)} 
            taskId={task.id}
            studentID={task.student_id}
            profID={task.professor_id}
        />
    </div>
  );
};

export default TaskCard;

