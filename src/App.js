import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/NavBar';
import ContactPage from './components/ContactPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import CoursePage from './components/CoursePage';
import ProtectedRoute from './components/ProtectedRoutes';
import AdminPage from './pages/admin/AdminPage';
import AdminCourses from './pages/admin/CourseList';


function App() {
  return (
        <Router>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpassword" element={<ForgotPasswordPage />} />
                <Route path="/admin" element={ <ProtectedRoute role="admin"> <AdminPage /> </ProtectedRoute>}/>
                <Route path="/contact" element={ <ProtectedRoute role="admin"> <ContactPage /> </ProtectedRoute>}/>
                <Route path="/courses " element= { <ProtectedRoute role="admin"> <CoursePage /> </ProtectedRoute>}/>
              </Routes>
              <Footer />
            </Router>
  );
}

export default App;
