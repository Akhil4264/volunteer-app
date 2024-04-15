import React, { useEffect, useState } from 'react';
import CalendarComponent from './CalendarComponent';
import TasksSidebar from './TasksSidebar';
import TasksProgressSection from './TasksProgressSection';
import { useLocation, useNavigate } from 'react-router-dom';
import request from '../api/axios';

const StudentDashboard = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const [tasks, setTasks] = useState([])
	const [showDropdown, setShowDropdown] = useState(false);
	// const location = useLocation();
	// const userInitial = location.state?.user?.name?.charAt(0).toUpperCase() || "M";
	const [userInitial, setUserInital] = useState("M");
	const [events, setEvents] = useState([]);
	const [user, setUser] = useState({});
	const [todayTasks, setTodaysTasks] = useState([]);
	const [weeksTasks, setWeeksTasks] = useState([]);
	const sessionToken = localStorage.getItem('session_token');
	const role = localStorage.getItem('role');

	useEffect(() => {

		const ISTOffset = 5.5; // Indian Standard Time offset in hours
		const now = new Date(new Date().getTime() + ISTOffset * 3600 * 1000);
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
		const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

		if (sessionToken && role) {
			if (role === 'Student') {

				const getData = async () => {

					try {
						const res = await request.post('/api/student/tasks', { "token": sessionToken })
						console.log(res.data.tasks)
						setTasks(res.data.tasks)
						const todaysTasksFiltered = res.data.tasks.filter((task) => {
							const [year, month, day] = task.deadline.split('-').map(num => parseInt(num, 10));
							const deadlineDate = new Date(year, month - 1, day);
							// console.log(deadlineDate, " ",today)
							console.log(deadlineDate.toDateString() === today.toDateString())
							return deadlineDate.toDateString() === today.toDateString();
						});
						setTodaysTasks(todaysTasksFiltered);
						console.log("today tasks : ",todayTasks)
						const weeksTasksFiltered = res.data.tasks.filter((task) => {
							const [year, month, day] = task.deadline.split('-').map(num => parseInt(num, 10));
							const deadlineDate = new Date(year, month - 1, day);
							return deadlineDate >= weekStart && deadlineDate <= weekEnd;
						});
						setWeeksTasks(weeksTasksFiltered);
						console.log("week day tasks : ",weeksTasks)

					}
					catch (e) {
						console.log(e)
					}
				}
				getData()
			}
			else if (role === 'Professor') {
				navigate('/professor')
			}
			else {
				localStorage.clear();
				navigate('/');
			}
		} else {
			localStorage.clear();
			navigate('/'); // Redirect to '/' route
		}
	}, []);


	const handleLogout = () => {
		// Clear local storage or any state management where the session is stored
		localStorage.removeItem('session_token');
		// Redirect to homepage
		navigate('/');
	};



	return (
		<div className="container mx-auto p-2">
			<div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
				<div className="absolute top-0 right-0 m-4">
					<button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
						<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold">
							{userInitial}
						</div>
					</button>
					{showDropdown && (
						<div className="mt-2 py-2 w-48 bg-white rounded-md shadow-xl absolute right-0">
							<a
								href="#/"
								onClick={handleLogout}
								className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
							>
								Logout
							</a>
						</div>
					)}
				</div>
				<div className="lg:flex-1 lg:max-w-xs">
					<CalendarComponent events={events} />
				</div>
				<div className="lg:flex-1 lg:max-w-sm">
					<TasksSidebar todaysTasks={todayTasks} weeksTasks={weeksTasks} />
				</div>
				<div className="lg:flex-1 lg:flex-grow">
					<TasksProgressSection tasks = {tasks}/>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboard;


