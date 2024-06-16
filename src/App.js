import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import ContactPage from './components/ContactPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoutes';
import AdminPage from './pages/admin/AdminPage';
import { AuthProvider } from './context/AuthContext';
import About from './components/About';
import CoursesPage from './components/CoursePage';
import CourseDetail from './components/CourseDetail';
import Home from './components/Home';
import CourseVideo from './components/CourseVideo';


function App() {
  return (
    <AuthProvider>
        <Router>
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About/>} />
                <Route path="/resetpassword" element={<ForgotPasswordPage />} />
                <Route path="/admin" element={ <ProtectedRoute role="admin"> <AdminPage /> </ProtectedRoute>}/>
                <Route path="/contact" element={ <ContactPage />}/>
                <Route path="/courses/:id" element={<CourseDetail/>} />
                <Route path="/courses" element={<CoursesPage/>} />
                <Route path="/courses/video/:id" element={<CourseVideo/>} />
                {/* <Route path="*" component={NotFound} /> */}
              </Routes>
              <Footer />
            </Router>
    </AuthProvider>
  );
}

export default App;
