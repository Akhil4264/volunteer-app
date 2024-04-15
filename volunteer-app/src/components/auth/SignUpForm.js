import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import request from '../../api/axios';
// import axios from 'axios';

const SignUpForm = () => {
	const navigate = useNavigate()


	useEffect(() => {

        const sessionToken = localStorage.getItem('session_token');
        const role = localStorage.getItem('role');

        if (sessionToken && role) {
            if (role === 'Student') {
         		navigate('/student'); // Redirect to '/professor' route
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

	const [name,setName] = useState("");
	const [email,setEmail] = useState("")
	const [password,setPass] = useState("")
	const [graduation_date,setDate] = useState("")
	const [verificationCode, setVerificationCode] = useState("");
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

	const handleSignInRedirect = () => {
    	navigate('/');
  	};

	// const handleSendVerification = async () => {
    //     // Implement sending email verification here
    //     setShowVerificationInput(true);
    // };

	// const handleVerifyCode = async () => {
    //     // Implement code verification here
    //     try {
    //         // Assuming any endpoint as your backend endpoint for verification
    //         const res = await request.post('endpoint', { email, verificationCode });
    //         if (res.data.isVerified) {
    //             setIsVerified(true);
    //             // you can now allow the user to proceed with the signup process
    //         } else {
    //             alert('Incorrect verification code.');
    //         }
    //     } catch (e) {
    //         alert(e.message);
    //     }
    // };
	const handleSendVerification = async () => {
		try {
			const res = await axios.post('http://localhost:3001/api/send-verification', { email });
			console.log(res.data); // Log the response from the server
			setShowVerificationInput(true);
		} catch (e) {
			alert(e.message);
		}
	};

	const handleVerifyCode = async () => {
        // Implement code verification here
        try {
            // Assuming '/api/verify-code' is your backend endpoint for verification
            const res = await axios.post('http://localhost:3001/api/verify-code', { email, verificationCode });
            if (res.data.isVerified) {
                setIsVerified(true);
            } else {
                alert('Incorrect verification code.');
            }
        } catch (e) {
            alert(e.message);
        }
    };

	const handleSubmit = async (e) => {
        e.preventDefault();
        if (isVerified) {
            try {
                const res = await request.post('/api/signup/student', { name, email, password, graduation_date });
                if (res.statusText === "OK") {
                    localStorage.setItem('session_token', res.data.token);
                    navigate('/student', { state: { user: res.data.user } });
                }
            } catch (e) {
				console.log(e)	
                alert(e.message);
            }
        } else {
            alert('Please verify your email before signing up.');
        }
    };

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-800">
			<div className="w-full max-w-xs">
				<form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4 text-white text-3xl text-center">Sign Up as Student</div>
					<div className="mb-4">
						<input
							name="name"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
							type="text"
							placeholder="Name"
							required
							onChange={(e) => {setName(e.target.value)}}
						/>
					</div>
					{/* <div className="mb-4">
						<input
							name="email"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
							type="email"
							placeholder="Email"
							required
							onChange={(e) => {setEmail(e.target.value)}}
						/>
					</div> */}
					<div className="mb-4">
						{/* <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label> */}
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								name="email"
								id="email"
								className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-600 bg-gray-700 text-white"
								type="email"
								placeholder="Your email"
								required
								onChange={(e) => { setEmail(e.target.value) }}
							/>
							<button
								type="button"
								className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-600 bg-gray-600 text-white text-sm"
								onClick={showVerificationInput ? handleVerifyCode : handleSendVerification}
							>
								{showVerificationInput ? 'Submit Code' : 'Verify Me'}
							</button>
						</div>
						{showVerificationInput && (
							<input
								name="verificationCode"
								className="mt-2 appearance-none block w-full px-3 py-2 border rounded-md text-base placeholder-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white border-gray-600"
								type="text"
								placeholder="Verification code"
								onChange={(e) => setVerificationCode(e.target.value)}
							/>
						)}
					</div>
					{isVerified && (
						<p className="mt-2 text-sm text-green-500">
							Verification successful! You can now complete your sign up.
						</p>
					)}

					<div className="mb-4">
						<input
							name="graduationDate"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
							type="date"
							placeholder="Graduation Date"
							onChange={(e) => {setDate(e.target.value)}}
						/>
					</div>
					<div className="mb-6">
						<input
							name="password"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
							type="password"
							placeholder="Password"
							required
							onChange={(e) => {setPass(e.target.value)}}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
							type="submit"
						>
							Sign Up
						</button>
					</div>
					<div className="mt-6 text-center">
						<a onClick={handleSignInRedirect} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
							Already have an account? Sign in.
						</a>
					</div>
				</form>

			</div>
		</div>
	);
};

export default SignUpForm;
