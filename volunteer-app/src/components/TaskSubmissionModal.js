// import React, { useState } from 'react';
// import ChatSidebar from './ChatSidebar'

// const TaskSubmissionModal = ({ task, onClose }) => {
//     const [showChat, setShowChat] = useState(false);
//   const [messages, setMessages] = useState([]);

//   const handleSendMessage = (newMessage) => {

//     setMessages([...messages, newMessage]);
//   };
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-4 rounded shadow-lg w-1/2">
//         <button onClick={onClose} className="float-right">✕</button>
//         <h3 className="text-lg font-bold">{task.title} Submission</h3>
    
//         <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">
//           Plagiarism Check
//         </button>
//         <button onClick={() => setShowChat(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
//           Chat with Student
//         </button>

        
//         <ChatSidebar 
//             isOpen={showChat} 
//             onClose={() => setShowChat(false)} 
//             taskId={1}
//             studentID={2}
//             profID={3}
//             // faculty={{ name: task.facultyName }} 
//             // messages={messages} 
//             // onSendMessage={handleSendMessage} 
//         />
//       </div>
//     </div>
//   );
// };

// export default TaskSubmissionModal;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ChatSidebar from './ChatSidebar'

// const TaskSubmissionModal = ({ task, onClose }) => {
//   const [showChat, setShowChat] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [submissionDetails, setSubmissionDetails] = useState(null);
//   const [submissions, setSubmissions] = useState([
//     { id: 1, title: 'Project 1', studentId: 2, profId: 3 },
//     // { id: 2, title: 'Project 2', studentId: 2, profId: 3, submissionNumber: 2 }
//   ]);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);

//   const fetchSubmissionDetails = async (submission) => {
//     console.log("my submission", submission);
//     // setShowDetails(!showDetails);
//     const folderName = `${submission.id}_${submission.studentId}_${submission.profId}`;
//     const subFolderName = `${folderName}_${submission.submissionNumber}`;
//     try {
//       const response = await axios.get(`http://localhost:3001/submissions/${folderName}/${subFolderName}/details`);
//       console.log(response.data);
//       setSelectedSubmission({ ...submission, details: response.data });
//     } catch (error) {
//       console.error('Error fetching submission details:', error);
//     }
//   };

//   const fetchAllSubmissions = async () => {
//     const taskId = 1;
//     const studentId = 2;
//     const profId = 3;
//     try {
//       const response = await axios.get(`http://localhost:3001/submissions/${taskId}/${studentId}/${profId}`);
//       console.log(response.data);
//       setSubmissions(response.data);
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAllSubmissions();
//   }, []);

//   const handleSendMessage = (newMessage) => {
//     setMessages([...messages, newMessage]);
//   };

//   // const fetchSubmissionDetails = async () => {
//   //   const taskId = 2;
//   //   const studentId = 1;
//   //   const profId = 3;
//   //   const folderName = `${studentId}_${taskId}_${profId}`;
//   //   try {
//   //     const response = await axios.get(`http://localhost:3001/submissions/${folderName}/details.json`);
//   //     setSubmissionDetails(response.data);
//   //   } catch (error) {
//   //     console.error('Error fetching submission details:', error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchSubmissionDetails();
//   // }, []);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-4 rounded shadow-lg w-1/2">
//         <button onClick={onClose} className="float-right">✕</button>
//         <h3 className="text-lg font-bold">Submissions</h3>

//         <div className="my-4">
//           {submissions.map((submission) => (
//             <p key={submission.id} className="cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => fetchSubmissionDetails(submission)}>
//               {submission.title}
//             </p>
//           ))}
//         </div>

//         {selectedSubmission && selectedSubmission.details && (
//           <div className="bg-gray-100 p-4 rounded-lg shadow">
//             <h4 className="text-lg font-semibold mb-3">{selectedSubmission.title} Details</h4>
//             <div className="mb-4">
//               <p className="font-semibold">Weekly Hours:</p>
//               <p className="ml-4">{selectedSubmission.details.weeklyHours}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Activity Log:</p>
//               <div className="ml-4">
//                 {JSON.parse(selectedSubmission.details.activityLog).map((activity, index) => (
//                   <div key={index} className="mb-3 p-3 bg-white rounded shadow">
//                     <p><span className="font-semibold">Date:</span> {activity.date}</p>
//                     <p><span className="font-semibold">Description:</span> {activity.description}</p>
//                     <p><span className="font-semibold">Hours Spent:</span> {activity.hoursSpent}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}


//         <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">
//           Plagiarism Check
//         </button>
        // <button onClick={() => setShowChat(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
        //   Chat with Student
        // </button>

        // {/* <ChatSidebar 
        //   isOpen={showChat} 
        //   onClose={() => setShowChat(false)} 
        //   taskId={2}
        //   studentID={1}
        //   profID={3}
        // /> */}
//       </div>
//     </div>
//   );
// };

// export default TaskSubmissionModal;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatSidebar from './ChatSidebar'

const TaskSubmissionModal = ({ task, onClose }) => {

  console.log("task: ",task)
  const [submissions, setSubmissions] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const fetchSubmissionDetails = async (submission) => {
    const folderName = `${submission.id}_${submission.studentId}_${submission.profId}`;
    const subFolderName = `${folderName}_${submission.submissionNumber}`;
    try {
      const response = await axios.get(`http://localhost:3001/submissions/${folderName}/${subFolderName}/details`);
      setSelectedSubmission({ ...submission, details: response.data.details, submittedFile: response.data.submittedFile });
    } catch (error) {
      console.error('Error fetching submission details:', error);
    }
  };

  const fetchAllSubmissions = async () => {
    const taskId = task.id;
    const studentId = task.student_id;
    const profId = task.professor_id;
    try {
      const response = await axios.get(`http://localhost:3001/submissions/${taskId}/${studentId}/${profId}`);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  const checkPlagiarism = async () => {
    if (!selectedSubmission || !selectedSubmission.submittedFile) {
      alert('No submission selected or no file to check for plagiarism.');
      return;
    }

    const copyleaksAPIKey = 'a78c1045-7fb6-4ebf-8f2f-4c1b6c1d1156';
    const copyleaksEndpoint = 'https://api.copyleaks.com/v3/education/submit/file/'; // For education use case
    const fileContentBase64 = selectedSubmission.submittedFile.content;
    const fileName = `submitted_file${selectedSubmission.submittedFile.extension}`;

    try {
      // Replace this with your backend endpoint for plagiarism checking
      const response = await axios.post('http://localhost:3001/checkPlagiarism', {
        fileContent: selectedSubmission.submittedFile.content,
        filename: `submitted_file${selectedSubmission.submittedFile.extension}`
        // Add any other required parameters for your backend endpoint
      });
      // Handle the response from your backend
      console.log('Plagiarism check scan ID:', response.data.scanId);
      // You might want to display the result to the user
    } catch (error) {
      console.error('Error checking plagiarism:', error);
    }

    // try {
    //   // Step 1: Get an access token
    //   const authResponse = await axios.post('https://api.copyleaks.com/v3/account/login/api', {
    //     email: 'pamulaparthimaheshreddy@gmail.com',
    //     key: copyleaksAPIKey
    //   });
    //   const accessToken = authResponse.data.access_token;

    //   // Step 2: Submit the file for a plagiarism check
    //   const submitResponse = await axios.post(
    //     copyleaksEndpoint,
    //     {
    //       base64: fileContentBase64,
    //       filename: fileName
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //       }
    //     }
    //   );
    //   console.log('Plagiarism check submitted:', submitResponse.data);

    //   // Step 3: Check the scan status and get the results (omitted for brevity)
    //   // You would typically poll the status endpoint until the scan is complete,
    //   // and then retrieve the results from the results endpoint.
    // } catch (error) {
    //   console.error('Error checking plagiarism:', error);
    // }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <button onClick={onClose} className="float-right">✕</button>
        <h3 className="text-lg font-bold">Submissions</h3>

        <div className="my-4">
          {/* {submissions.map((submission) => (
            <p key={submission.id} className="cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => fetchSubmissionDetails(submission)}>
              {submission.title}
            </p>
          ))} */}
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <p key={submission.id} className="cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => fetchSubmissionDetails(submission)}>
                {submission.title}
              </p>
            ))
          ) : (
            <p>No Submissions Available</p>
          )}
        </div>

        {selectedSubmission && selectedSubmission.details && (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-3">{selectedSubmission.title} Details</h4>
            <div className="mb-4">
              <p className="font-semibold">Weekly Hours:</p>
              <p className="ml-4">{selectedSubmission.details.weeklyHours}</p>
            </div>
            <div>
              <p className="font-semibold">Activity Log:</p>
              <div className="ml-4">
                {JSON.parse(selectedSubmission.details.activityLog).map((activity, index) => (
                  <div key={index} className="mb-3 p-3 bg-white rounded shadow">
                    <p><span className="font-semibold">Date:</span> {activity.date}</p>
                    <p><span className="font-semibold">Description:</span> {activity.description}</p>
                    <p><span className="font-semibold">Hours Spent:</span> {activity.hoursSpent}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* <div>
              <p className="font-semibold">Submitted File:</p>
              <a href={`data:application/octet-stream;base64,${selectedSubmission.submittedFile}`} download="submitted_file">Download File</a>
            </div> */}
            <div>
              <p className="font-semibold">Submitted File:</p>
              <a
                href={`data:application/octet-stream;base64,${selectedSubmission.submittedFile.content}`}
                download={`submitted_file${selectedSubmission.submittedFile.extension}`}
              >
                Download File
              </a>
            </div>
          </div>
        )}

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"  onClick={checkPlagiarism}>
          Plagiarism Check
        </button>
        <button onClick={() => setShowChat(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
          Chat with Student
        </button>

        <ChatSidebar 
          isOpen={showChat} 
          onClose={() => setShowChat(false)} 
          taskId={task.id}
          studentID={task.student_id}
          profID={task.professor_id}
        />
        
      </div>
    </div>
  );
};

export default TaskSubmissionModal;
