import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import LeanTaskCard from './LeanTaskCard';
import TaskDetailsModal from './TaskDetailsModal';
import { useNavigate } from 'react-router-dom';
import request from '../api/axios';

const initialTasks = [
	{ id: 1, title: 'Lecture Notes', description: "Notes on yesterday's lecture", priority: 'medium', deadline: '2024-03-10', progress: 'in_progress', submissionsDone: 1, totalSubmissions: 5 },
	{ id: 2, title: 'Homework', description: "Homework for next week", priority: 'low', deadline: '2024-03-15', progress: 'not_started', submissionsDone: 0, totalSubmissions: 3 },
	{ id: 3, title: 'Project Proposal', description: "Initial proposal for semester project", priority: 'high', deadline: '2024-03-20', progress: 'submitted', submissionsDone: 1, totalSubmissions: 1 },
	{ id: 4, title: 'Practicals', description: "Practicals on today's tasks", priority: 'high', deadline: '2024-03-25', progress: 'submitted', submissionsDone: 2, totalSubmissions: 7 },
	{ id: 5, title: 'Lab Report', description: "Report on last week's lab", priority: 'medium', deadline: '2024-03-30', progress: 'in_progress', submissionsDone: 3, totalSubmissions: 4 },
	{ id: 6, title: 'Final Exam', description: "Study guide for final exam", priority: 'high', deadline: '2024-04-05', progress: 'not_started', submissionsDone: 0, totalSubmissions: 1 },
	{ id: 7, title: 'Group Presentation', description: "Preparation for group presentation", priority: 'low', deadline: '2024-04-10', progress: 'in_progress', submissionsDone: 1, totalSubmissions: 2 },
	{ id: 8, title: 'Research Paper', description: "Outline for research paper", priority: 'medium', deadline: '2024-04-15', progress: 'not_started', submissionsDone: 0, totalSubmissions: 5 },
	{ id: 9, title: 'Tutorial Session', description: "Preparation for next tutorial session", priority: 'low', deadline: '2024-04-20', progress: 'submitted', submissionsDone: 1, totalSubmissions: 1 },
	{ id: 10, title: 'Study Group', description: "Organizing study group for finals", priority: 'high', deadline: '2024-04-25', progress: 'in_progress', submissionsDone: 2, totalSubmissions: 3 }
]

const TasksProgressSection = (props) => {
	const [tasks, setTasks] = useState(props.tasks);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate()
	const sessionToken = localStorage.getItem('session_token');
	const role = localStorage.getItem('role');
	
	

	


	// const handleProgressChange = (taskId, newProgress) => {
	//   const updatedTasks = tasks.map(task =>
	//     task.id === taskId ? { ...task, progress: newProgress } : task
	//   );
	//   setTasks(updatedTasks);
	// };

	const handleProgressChange = async(taskId, newProgress) => {
		try{
			console.log({token : sessionToken , changedStatus : newProgress})
			const res = await request.post(`/api/student/${taskId}/changeStatus`,{token : sessionToken , changedStatus : newProgress})
			console.log(res)
			const updatedTasks = props.tasks.map((task,index) => {
				
				if (task.id === taskId) {
					console.log(taskId)
					let ind = columns[task.status].indexOf(task);
					columns[task.status].splice(ind,1)

					console.log(columns)
					
					const updatedTask = { ...task, status: newProgress };
					columns[newProgress].push(updatedTask)
					// task.status =  newProgress
					if (selectedTask && selectedTask.id === taskId) {
						setSelectedTask(updatedTask);
					}
					// console.log(updatedTask)
					return updatedTask;
				}
				return task;
			});
			setTasks(updatedTasks)
			console.log(taskId)
			console.log(updatedTasks)
		}
		catch(e){
			console.log(e)
		}
		
	};


	const handleCardClick = (task) => {
		setSelectedTask(task);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedTask(null);
	};

	const columns = {
		not_started: [],
		in_progress: [],
		done: [],
		submitted: [],
	};

	props.tasks.forEach(task => {
		if (columns[task.status]) {
			columns[task.status].push(
				// <TaskCard key={task.id} task={task} onProgressChange={handleProgressChange} />
				<LeanTaskCard key={task.id} task={task} onCardClick={handleCardClick} />
			);
		}
	});

	// useEffect(() => {
	// 	props.tasks.forEach(task => {
	// 		if (columns[task.status]) {
	// 			columns[task.status].push(
	// 				// <TaskCard key={task.id} task={task} onProgressChange={handleProgressChange} />
	// 				<LeanTaskCard key={task.id} task={task} onCardClick={handleCardClick} />
	// 			);
	// 		}
	// 	});
	// 	},[tasks,columns])
	
	

	return (
		<div>
			<h1 className="font-bold text-2xl mb-6">Assigned Tasks</h1>
			<div className="flex gap-4">
				{Object.entries(columns).map(([progress, taskCards]) => (
					<div key={progress} className="flex-1">
						<h2 className="font-bold capitalize text-xl mb-4">{progress.split('_').join(' ')}</h2>
						<div className="flex flex-col space-y-4">
							{taskCards.length > 0 ? taskCards : <p>No tasks</p>}
							{selectedTask && (
								<TaskDetailsModal
									task={selectedTask}
									isOpen={isModalOpen}
									onClose={handleCloseModal}
									onProgressChange={handleProgressChange}
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TasksProgressSection;


