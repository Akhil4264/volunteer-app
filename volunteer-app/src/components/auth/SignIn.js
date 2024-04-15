import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import request from '../../api/axios';

const SignIn = () => {

	const navigate = useNavigate();
	const location = useLocation();
	var role = location.state ? location.state.role : "Student";

	useEffect(() => {
		const sessionToken = localStorage.getItem('session_token');
		const role = localStorage.getItem('role');

		if (sessionToken && role) {
			if (role === 'Student') {
				navigate('/student'); // Redirect to '/professor' route
			}
			else if (role === 'Professor') {
				navigate('/professor')
			}
			else {
				localStorage.clear();
			}
		} else {
			localStorage.clear();
		}
	}, []);


	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");



	const handleSignUpRedirect = () => {
		navigate("/signup");
	};


	const handleSubmit = async (e) => {
		e.preventDefault()
		var url;
		if (role === "Student") {
			url = "/api/login/student"
		}
		else if (role === "Professor") {
			url = "/api/login/professor"
		}
		try {
			const res = await request.post(url, { email: email, password: pass });
			if (res.statusText === "OK") {
				localStorage.setItem("session_token", res.data.token)
				localStorage.setItem("role", res.data.role)
				if (role === "Student") {
					navigate('/student')
				}
				else if (role === "Professor") {
					navigate('/professor')
				}
			}
		}
		catch (e) {
			alert(e)
		}
	}



	return (

		<div className="flex items-center justify-center min-h-screen bg-gray-800">
			<div className="absolute top-4 left-4">
				<button
					className="text-white hover:text-gray-300"
					onClick={() => navigate('/')}
				>
					&#8592; Go Back
				</button>
			</div>
			<div className="w-full max-w-xs">
				<div className="text-white text-3xl text-center mb-6">Log In as {role}</div>
				<form>


					<div className="mb-4">
						<div className="flex items-center border-b border-yellow-500 py-2">
							<span className="pr-3 text-yellow-500">
							</span>
							<input
								className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
								type="email"
								placeholder="Email"
								aria-label="Email"
								required
								onChange={(e) => { setEmail(e.target.value) }}
							/>
						</div>
					</div>
					<div className="mb-6">
						<div className="flex items-center border-b border-yellow-500 py-2">
							<span className="pr-3 text-yellow-500">
							</span>
							<input
								className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
								type="password"
								placeholder="Password"
								aria-label="Password"
								required
								onChange={(e) => { setPass(e.target.value) }}
							/>
						</div>
					</div>

					<div className="flex items-center justify-center">
						<button
							className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
							type="submit"
							onClick={handleSubmit}
						>
							Log in
						</button>
					</div>

				</form>


				{role === "Student" ?

					<div className="mt-6 text-center">
						<a href="#" onClick={handleSignUpRedirect} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
							First time here? Sign up.
						</a>
					</div> : <></>

				}

			</div>
		</div>

	);

};

export default SignIn;


