import React, { useState, useEffect } from 'react';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/courses/:id')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setError('Error fetching courses. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
