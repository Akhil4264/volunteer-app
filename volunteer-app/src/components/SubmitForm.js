import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// require('dotenv').config()
// const env = require('dotenv').config()

const SubmitForm = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { task } = location.state;
  console.log("task in SUbmitForm is", task)
  const [form, setForm] = useState({
    projectId : task.id,
    studentId : task.student_id,
    professorId : task.professor_id,
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    major: '',
    graduationDate: '',
    professorName: 'Elizabeth D. Diaz',
    professorDepartment: 'Computer Science',
    professorEmail: 'elizabeth.diaz@uta.edu',
    professorPhone: '432-230-6721',
    projectTitle: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    submissionNumber: '',
    weeklyHours: 21,
    location: 'Remote',
    activityLog: [],
    file: null,
    studentSignature: '',
    signatureDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivityLog = form.activityLog.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setForm({ ...form, activityLog: updatedActivityLog });
  };

  const addActivityLogEntry = () => {
    setForm({
      ...form,
      activityLog: [...form.activityLog, { date: '', description: '', hoursSpent: '' }]
    });
  };

  const handleFileChange = (e) => {
    // Assuming we want to keep only the first selected file
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key !== 'activityLog') {
        formData.append(key, form[key]);
      }
    });
    formData.append("activityLog", JSON.stringify(form.activityLog));

    // Assume you get these values from the database or elsewhere
    // const studentId = 1;
    // const projectId = 2;
    // const professorId = 3;

    // formData.append("studentId", studentId);
    // formData.append("projectId", projectId);
    // formData.append("professorId", professorId);

    fetch(`http://localhost:3001/submitForm`, {
      method: "POST",
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
      navigate('/student')

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   Object.keys(form).forEach(key => {
  //     if (key !== 'activityLog') { // Assuming you want to handle `activityLog` separately
  //       formData.append(key, form[key]);
  //     }
  //   });

  //   // Append file if it exists
  //   if (form.file) {
  //     formData.append("file", form.file);
  //   }

  //   // Append activityLog as JSON string or handle as needed
  //   formData.append("activityLog", JSON.stringify(form.activityLog));

  //   // Here, replace `YOUR_BACKEND_ENDPOINT` with your actual backend endpoint
  //   // fetch("YOUR_BACKEND_ENDPOINT", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // })
  //   // .then(response => response.json())
  //   // .then(data => {
  //   //   console.log("Success:", data);
  //   // })
  //   // .catch((error) => {
  //   //   console.error("Error:", error);
  //   // });
  // };


  return (
    <div className="container mx-auto p-4 bg-gray-100 shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Volunteer Student Weekly Activity Report Form</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Student Information</h2>
        <input type="text" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Full Name" required className="border border-gray-300 rounded p-2 "/>
        {/* <input type="text" name="studentId" value={form.studentId} onChange={handleChange} placeholder="Student Id" required className="border border-gray-300 rounded p-2 " /> */}
        <input type="email" name="studentEmail" value={form.studentEmail} onChange={handleChange} placeholder="Contact Email" className="border border-gray-300 rounded p-2 " required />
        <input type="tel" name="studentPhone" value={form.studentPhone} onChange={handleChange} placeholder="Contact Phone" className="border border-gray-300 rounded p-2 " required />
        <input type="text" name="major" value={form.major} onChange={handleChange} placeholder="Major" className="border border-gray-300 rounded p-2 " required />
        <input type="text" name="graduationDate" value={form.graduationDate} onChange={handleChange} className="border border-gray-300 rounded p-2 " placeholder="Graduation Date" onFocus={(e) => e.target.type = 'date'}
  onBlur={(e) => e.target.type = 'text'} required />
        </section>
        {/* <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Professor/Supervisor Information</h2>
        <input type="text" value={form.professorName} readOnly className="border border-gray-300 rounded p-2 "/>
        <input type="text" value={form.professorDepartment} readOnly className="border border-gray-300 rounded p-2 "/>
        <input type="email" value={form.professorEmail} readOnly className="border border-gray-300 rounded p-2 "/>
        <input type="tel" value={form.professorPhone} readOnly className="border border-gray-300 rounded p-2 "/>
        </section> */}
        
        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Volunteer Assignment Details</h2>
        <input type="text" name="projectTitle" className="border border-gray-300 rounded p-2 " value={form.projectTitle} onChange={handleChange} placeholder="Project/Activity Title" required />
        <textarea name="projectDescription" className="border border-gray-300 rounded p-2 align-bottom" value={form.projectDescription} onChange={handleChange} placeholder="Brief Description" required />
        <input type="number" name="submissionNumber" value={form.submissionNumber} onChange={handleChange} placeholder="Submission Number" className="border border-gray-300 rounded p-2" required/>
        <input type="text" name="startDate" className="border border-gray-300 rounded p-2 " value={form.startDate} onChange={handleChange} placeholder="Start Date" onFocus={(e) => e.target.type = 'date'}
  onBlur={(e) => e.target.type = 'text'} required />
        <input type="text" name="endDate" className="border border-gray-300 rounded p-2 " value={form.endDate} onChange={handleChange} placeholder="End Date" onFocus={(e) => e.target.type = 'date'}
  onBlur={(e) => e.target.type = 'text'} required />
        <input type="text" name="location" className="border border-gray-300 rounded p-2 " value={form.location} onChange={handleChange} placeholder="Location" required />
        <input type="number" name="weeklyHours" className="border border-gray-300 rounded p-2 " value={form.weeklyHours} onChange={handleChange} placeholder="Weekly Hours Commitment" min="20" required />
        </section>
        
        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Activity Log</h2>
        {form.activityLog.map((activity, index) => (
          <div key={index}>
            <input type="text" className="border border-gray-300 rounded p-2 " value={activity.date} onChange={(e) => handleActivityChange(index, 'date', e.target.value)} onFocus={(e) => e.target.type = 'date'}
  onBlur={(e) => e.target.type = 'text'} placeholder="Date" required />
            <textarea className="border border-gray-300 rounded p-2 align-bottom" value={activity.description} onChange={(e) => handleActivityChange(index, 'description', e.target.value)} placeholder="Activity Description" required />
            <input className="border border-gray-300 rounded p-2 " type="number" value={activity.hoursSpent} onChange={(e) => handleActivityChange(index, 'hoursSpent', e.target.value)} placeholder="Hours Spent" min="1" required />
          </div>
        ))}
        <button type="button" onClick={addActivityLogEntry}>Add Entry</button>
        </section>

        <section className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">File Submission</h2>
          <input className="border border-gray-300 rounded p-2 " type="file" onChange={handleFileChange} />
        </section>
        
        <section className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Student Acknowledgement</h2>
        <p>I hereby confirm that I will commit to volunteering for a minimum of 20 hours per week as specified in the above schedule...</p>
        <input className="border border-gray-300 rounded p-2 " type="text" name="studentSignature" value={form.studentSignature} onChange={handleChange} placeholder="Student's Signature" required />
        <input className="border border-gray-300 rounded p-2 " type="text" name="signatureDate" value={form.signatureDate} onChange={handleChange} placeholder="Date" onFocus={(e) => e.target.type = 'date'}
  onBlur={(e) => e.target.type = 'text'} required />
        </section>
        <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
          Submit Report
        </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
