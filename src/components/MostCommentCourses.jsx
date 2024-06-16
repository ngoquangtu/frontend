import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { renderReviewRateIcon } from './ratingIcon';

const MostCommentCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses/mostcomment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch most rated courses');
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching most rated courses:', error);
        setError('Error fetching most rated courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-4xl text-[#12B7BD] text-center">LOADING...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-4xl text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6 text-[#12B7BD]">Most Comment Courses</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        {courses.map(course => (
          <Link to={`/courses/${course.id}`} key={course.id}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 flex items-center justify-center bg-gray-200 overflow-hidden rounded-md">
                <img src={course.thumbnail} alt={course.title} className="object-cover h-full w-full" />
              </div>
              <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-gray-400 mb-6">Publisher: <span className="font-bold">{course.publisher}</span></p>
              <div className="flex items-center justify-between">
                <p className="text-[#FFA927] font-bold">Rating: {course.rating}</p>
                <div className="flex items-center">
                  {renderReviewRateIcon(course.rating)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );  
};

export default MostCommentCoursesPage;
