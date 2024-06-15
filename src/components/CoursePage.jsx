import React, { useState, useEffect } from 'react';

function CoursePage() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/courses/courseId')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        return response.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
        setError('Error fetching course details. Please try again later.');
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
      <p className="text-gray-600 mb-4">Category: {course.category}</p>
      <p className="text-gray-600 mb-4">Description: {course.description}</p>
      <p className="text-gray-600 mb-4">Price: {course.price}</p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Enroll Now
      </button>
    </div>
  );
}

export default CoursePage;
