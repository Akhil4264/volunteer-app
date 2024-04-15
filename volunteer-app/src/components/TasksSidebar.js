// import React, { useState } from 'react';
// import { Transition } from '@headlessui/react';

// const TasksSidebar = ({ todaysTasks, weeksTasks }) => {
//   const [showTodaysTasks, setShowTodaysTasks] = useState(false);
//   const [showWeeksTasks, setShowWeeksTasks] = useState(false);

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="mb-4">
//         <button
//           className="flex justify-between items-center w-full text-left font-bold text-lg"
//           onClick={() => setShowTodaysTasks(!showTodaysTasks)}
//         >
//           Today's Tasks
//           <span>{showTodaysTasks ? '▲' : '▼'}</span>
//         </button>
//         <Transition
//           show={showTodaysTasks}
//           enter="transition ease-out duration-300"
//           enterFrom="transform scale-95 opacity-0"
//           enterTo="transform scale-100 opacity-100"
//           leave="transition ease-in duration-300"
//           leaveFrom="transform scale-100 opacity-100"
//           leaveTo="transform scale-95 opacity-0"
//         >
//           <ul className="mt-2">
//             {todaysTasks.map((task, index) => (
//               <li key={index} className="py-1">{task.title}</li>
//             ))}
//           </ul>
//         </Transition>
//       </div>
//       <div className="mb-4">
//         <button
//           className="flex justify-between items-center w-full text-left font-bold text-lg"
//           onClick={() => setShowWeeksTasks(!showWeeksTasks)}
//         >
//           Week at a Glance
//           <span>{showWeeksTasks ? '▲' : '▼'}</span>
//         </button>
//         <Transition
//           show={showWeeksTasks}
//           enter="transition ease-out duration-300"
//           enterFrom="transform scale-95 opacity-0"
//           enterTo="transform scale-100 opacity-100"
//           leave="transition ease-in duration-300"
//           leaveFrom="transform scale-100 opacity-100"
//           leaveTo="transform scale-95 opacity-0"
//         >
//           <ul className="mt-2">
//             {weeksTasks.map((task, index) => (
//               <li key={index} className="py-1">{task.title}</li>
//             ))}
//           </ul>
//         </Transition>
//       </div>
//     </div>
//   );
// };

// export default TasksSidebar;


import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import request from '../api/axios';

const allTasks = [
	{ title: 'Complete Math Assignment', status: 'submitted', deadline: '05-04-2024' },
	{ title: 'Complete Science Assignment', status: 'done', deadline: '06-04-2024' },
	{ title: 'Complete Social Assignment', status: 'in progress', deadline: '05-04-2024' },
	{ title: 'Complete Language Assignment', status: 'not started', deadline: '15-04-2024' },
];

const TasksSidebar = (props) => {
	const [showTodaysTasks, setShowTodaysTasks] = useState(false);
	const [showWeeksTasks, setShowWeeksTasks] = useState(false);
	// const [todaysTasks, setTodaysTasks] = useState([]);
	// const [weeksTasks, setWeeksTasks] = useState([]);
	const navigate = useNavigate();
	const sessionToken = localStorage.getItem('session_token');
	const role = localStorage.getItem('role');

	console.log(props)


	// useEffect(() => {
	// 	const ISTOffset = 5.5; // Indian Standard Time offset in hours
	// 	const now = new Date(new Date().getTime() + ISTOffset * 3600 * 1000);
	// 	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	// 	const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
	// 	const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
	// 	if (sessionToken && role) {
	// 		if (role === 'Student') {

	// 			const getData = async () => {

	// 				try {
	// 					const res = await request.post('/api/student/tasks', { "token": sessionToken })
	// 					// console.log(res)
	// 					// setTasks(res.data.tasks)
	// 					const todaysTasksFiltered = res.data.tasks.filter(task => {
	// 						const [day, month, year] = task.deadline.split('-').map(num => parseInt(num, 10));
	// 						const deadlineDate = new Date(year, month - 1, day);
	// 						return deadlineDate.toDateString() === today.toDateString();
	// 					});
	// 					setTodaysTasks(todaysTasksFiltered);
	// 					const filterTasks = (task) => {
	// 						const [day, month, year] = task.deadline.split('-').map(num => parseInt(num, 10));
	// 						const deadlineDate = new Date(year, month - 1, day);
	// 						return deadlineDate >= weekStart && deadlineDate <= weekEnd;
	// 					};
	// 					const weeksTasksFiltered = res.data.tasks.filter(filterTasks);

	// 					setWeeksTasks(weeksTasksFiltered);

	// 				}
	// 				catch (e) {
	// 					console.log(e)
	// 				}
	// 			}
	// 			getData()
	// 		}
	// 		else if (role === 'Professor') {
	// 			navigate('/professor')
	// 		}
	// 		else {
	// 			localStorage.clear();
	// 			navigate('/');
	// 		}
	// 	} else {
	// 		localStorage.clear();
	// 		navigate('/'); // Redirect to '/' route
	// 	}
	// }, []);

	// Calculate the progress percentage
	const calculateProgress = (tasks) => {
		const totalTasks = tasks.length;
		const tasksDoneOrSubmitted = tasks.filter(task => task.status === 'done' || task.status === 'submitted').length;
		const progressPercentage = totalTasks > 0 ? (tasksDoneOrSubmitted / totalTasks) * 100 : 0;
		return progressPercentage.toFixed(2); // Round to two decimals
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<div className="mb-4">
				<button
					className="flex justify-between items-center w-full text-left font-bold text-lg"
					onClick={() => setShowTodaysTasks(!showTodaysTasks)}
				>
					Today's Tasks
					<span>{showTodaysTasks ? '▲' : '▼'}</span>
				</button>
				<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
					<div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${calculateProgress(props.todaysTasks)}%` }}></div>
				</div>
				<Transition
					show={showTodaysTasks}
					enter="transition ease-out duration-300"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition ease-in duration-300"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<ul className="mt-2">
						{props.todaysTasks.map((task, index) => (
							<li key={index} className="py-1">{task.taskName}</li>
							// return <LeanTaskCard key={task.id} task={task} onCardClick={handleCardClick} />
						))}
					</ul>
				</Transition>
			</div>
			<div className="mb-4">
				<button
					className="flex justify-between items-center w-full text-left font-bold text-lg"
					onClick={() => setShowWeeksTasks(!showWeeksTasks)}
				>
					Week at a Glance
					<span>{showWeeksTasks ? '▲' : '▼'}</span>
				</button>
				<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
					<div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${calculateProgress(props.weeksTasks)}%` }}></div>
				</div>
				<Transition
					show={showWeeksTasks}
					enter="transition ease-out duration-300"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition ease-in duration-300"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<ul className="mt-2">
						{props.weeksTasks.map((task, index) => (
							<li key={index} className="py-1">{task.taskName}</li>
						))}
					</ul>
				</Transition>
			</div>
		</div>
	);
};

export default TasksSidebar;
