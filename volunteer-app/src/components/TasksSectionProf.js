import React, { useState } from 'react';
import TaskCard from './TaskCardProf';
import TaskSubmissionModal from './TaskSubmissionModal';
import CreateTaskModal from './CreateTaskModal';
import LeanTaskCard from './LeanTaskCard';
import TaskDetailsModal from './TaskDetailsModalProf'
import request from '../api/axios';

const TasksSection = (props) => {

	const assignedTasksData = [
		{
			id: 1,
			title: 'Database Design',
			priority: 'high',
			deadline: '2024-04-15',
			description: 'Design the schema for the project database.',
			assignedStudent: 'John Doe',
			isAssigned: false, submissionsDone: 5, totalSubmissions: 7
		},
		{
			id: 2,
			title: 'Frontend UI/UX',
			priority: 'medium',
			deadline: '2024-05-01',
			description: 'Create wireframes for the new application screens.',
			assignedStudent: 'Jane Smith',
			isAssigned: false, submissionsDone: 3, totalSubmissions: 7
		},
	];

	const unassignedTasksData = [
		{
			id: 3,
			title: 'Backend API Development',
			priority: 'low',
			deadline: '2024-05-20',
			description: 'Develop RESTful APIs for user management.',
			isAssigned: true, submissionsDone: 0, totalSubmissions: 7
		},
		{
			id: 4,
			title: 'Testing and Documentation',
			priority: 'medium',
			deadline: '2024-06-10',
			description: 'Write test cases and document the API usage.',
			isAssigned: true, submissionsDone: 0, totalSubmissions: 7
		},
	];
	// const students = [
	// { id: '1', name: 'Mahesh' },
	// { id: '2', name: 'Jayanth' },
	// { id: '3', name: 'Goutham' },
	// { id: '4', name: 'Nikhil' }
	// ];
	const [assignedTasks, setAssignedTasks] = useState(assignedTasksData);
	const [unassignedTasks, setUnassignedTasks] = useState(unassignedTasksData);
	const [showSubmissionModal, setShowSubmissionModal] = useState(false);
	const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [students, setStudents] = useState([]);
	const sessionToken = localStorage.getItem('session_token');
    const role = localStorage.getItem('role');

	

	const viewSubmission = (task) => {
		setSelectedTask(task);
		setShowSubmissionModal(true);
	};

	const handleCardClick = (task) => {
		setSelectedTask(task);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedTask(null);
	};

	const assignTask = (task) => {
	};

	const createNewTask = async (taskData) => {
		console.log(taskData)
		try{
			const res = await request.post('/api/professor/createTask', { ...taskData ,"token" : sessionToken})
			// console.log(res.data)
			props.eventFunc([...props.eventState , res.data.msg])
		}
		catch(e){
			console.log(e)
		}
		
	};

	const createTaskButton = async () => {
		const res = await request.post('/api/professor/students',{"token" : sessionToken })
		console.log(res)
		setStudents(res.data.students)
		setShowCreateTaskModal(true)
	}

	return (
		<div>
			<div className="mb-8">
				<h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>
				{props.eventState.map((task) => (
					//   <TaskCard key={task.id} task={task} onViewSubmission={viewSubmission} isAssigned />
					<LeanTaskCard key={task.id} task={task} onCardClick={handleCardClick} />

				))}
			</div>
			<div className="mb-8">
				{/* <h2 className="text-xl font-bold mb-4">Unassigned Tasks</h2> */}
				{/* {unassignedTasks.map((task) => (
					//   <TaskCard key={task.id} task={task} onAssign={assignTask} />
					<LeanTaskCard key={task.id} task={task} onCardClick={handleCardClick} />
				))} */}
				<button onClick={createTaskButton} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
					Create New Task
				</button>
			</div>
			<TaskDetailsModal
				task={selectedTask}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onViewSubmission={viewSubmission}
				onAssign={assignTask}
			//   isAssigned={isAssigned}
			/>

			{showSubmissionModal && selectedTask && (
				<TaskSubmissionModal task={selectedTask} onClose={() => setShowSubmissionModal(false)} />
			)}
			{showCreateTaskModal && (
				<CreateTaskModal onCreate={createNewTask} onClose={() => setShowCreateTaskModal(false)} students={students} userState={props.userState} userFunc={props.userFunc} eventState={props.eventState} eventFunc={props.eventFunc} />
			)}
		</div>
	);
};

export default TasksSection;
