import React from 'react'
import NavBar from './NavBar';
import MostRatingCoursePage from './MostRatingCourses';
import MostEnrollmentCoursePage from './MostEnrollmentCourses';
import MostCommentCoursesPage from './MostCommentCourses';

const Home = () => {
  return (
    <div className="relative mb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-50">
        <NavBar />
      </div>
      <div className="pt-16 relative">
      <div className="relative w-full ">
        <img src="assets/all1.jpg" alt="Pro-Skills" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-5xl font-bold">Our Course</h2>
        </div>
      </div>
      </div>

      <MostRatingCoursePage />
      <MostEnrollmentCoursePage />
      <MostCommentCoursesPage />
    </div>
  )
}

export default Home