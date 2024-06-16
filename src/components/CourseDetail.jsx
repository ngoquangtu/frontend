import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        console.log(data);
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Error fetching course details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="text-yellow-500 font-bold">Rating: {course.rating}</p>
      {/* Add more course details as needed */}
    </div>
  );
};

export default CourseDetails;
