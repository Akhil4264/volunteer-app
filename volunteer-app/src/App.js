// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import SignIn from './components/auth/SignIn';
import SignUpForm from './components/auth/SignUpForm';
import StudentDashboard from './components/StudentDashboard';
import SubmitForm from './components/SubmitForm';
import ProfessorDashboard from './components/ProfessorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AuthPage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/submitform" element={<SubmitForm/>}/>
        <Route path="/professor" element={<ProfessorDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;

