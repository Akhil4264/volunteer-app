import React,{useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarComponent from './CalendarComponent';
import TasksSectionProf from './TasksSectionProf';
import request from '../api/axios';


const ProfessorDashboard = () => {
	const navigate = useNavigate();
	const [showDropdown, setShowDropdown] = useState(false);
	const location = useLocation();
	// const userInitial = location.state?.user?.name?.charAt(0).toUpperCase() || "M";
	const [userInitial,setUserInital] = useState("M");
	const [events, setEvents] = useState([]);
	const [user,setUser] = useState({});
	useEffect(() => {
        const sessionToken = localStorage.getItem('session_token');
        const role = localStorage.getItem('role');

        if (sessionToken && role) {
            if (role === 'Student') {
				navigate('/student')
		   }
		   else if(role === 'Professor'){
				const getData = async() => {

					try{
						const res = await request.post('/api/professor/tasks',{"token" : sessionToken })
						setEvents(res.data.tasks)
						setUserInital(res.data.user.name.charAt(0).toUpperCase())
						setUser({...res.data.user})
					}
					catch(e){
						console.log(e)
					}
				}
				getData()
		   } 
		   else{
			   localStorage.clear();
			   navigate('/'); 
		   }
        } else {
            localStorage.clear();
            navigate('/'); // Redirect to '/' route
        }
    }, []);


	// const events = [
	// 	{ title: 'Math Assignment', date: '2024-03-14' },
	// ];

	// const todaysTasks = [
	// 	{ title: 'Complete Math Assignment' },
	// ];

	// const weeksTasks = [
	// 	{ title: 'Start History Project' },
	// ];

	const handleLogout = () => {
    // Clear local storage or any state management where the session is stored
    localStorage.removeItem('session_token');
    // Redirect to homepage
    navigate('/');
  	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col lg:flex-row gap-4">
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
				<div className="flex-grow" style={{ flexBasis: '30%' }}>
					<CalendarComponent events={events} userState={user} userFunc={setUser}/>
				</div>
				<div className="flex-grow" style={{ flexBasis: '70%' }}>
					<TasksSectionProf userState={user} userFunc={setUser} eventState={events} eventFunc={setEvents}/>
				</div>
			</div>
		</div>
	);
};

export default ProfessorDashboard;


