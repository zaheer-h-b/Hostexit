import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import RegisterStudent from './components/RegisterStudent';
import StudentList from './components/StudentList';
import RoleSelect from './components/RoleSelect';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './components/StudentDashboard';
import ApplyLeave from './components/ApplyLeave';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Add this

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ✅ Wrap protected admin routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/admin/register-student" element={<ProtectedRoute><RegisterStudent /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />

          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/apply-leave" element={<ApplyLeave />} />
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
