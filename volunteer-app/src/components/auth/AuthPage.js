import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
	
	const navigate = useNavigate();

	useEffect(() => {
        const sessionToken = localStorage.getItem('session_token');
        const role = localStorage.getItem('role');

        if (sessionToken && role) {
            if (role === 'Student') {
         		navigate('/student');
            }
			else if(role === 'Professor'){
				navigate('/professor')
			}
			else{
				localStorage.clear();            	
			} 
        } else {
            localStorage.clear();
        }
    }, []);

	const navigateToSignIn = (selectedRole) => {

		navigate("/signin", { state: { role: selectedRole } })
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
			<h1 className="text-4xl font-bold mb-8">Are you a Student or Professor?</h1>
			<div className="">
				<button
					onClick={() => navigateToSignIn('Student')}
					className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-64 m-2 "
				>
					Student
				</button>
				<button
					onClick={() => navigateToSignIn('Professor')}
					className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-64 m-2 "
				>
					Professor
				</button>
			</div>
		</div>
	);


};

export default AuthPage;
