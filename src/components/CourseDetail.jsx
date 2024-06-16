import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

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
    <div className="relative mb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-50">
        <NavBar />
      </div>

      <div className="pt-16 relative">
        <div className="relative w-full">
          <img src="/assets/all1.jpg" alt="Pro-Skills" className="w-full h-64 object-cover" />

          <div className="absolute inset-0 bg-black opacity-30"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-5xl font-bold">Course Detail</h2>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
          <div className="mb-6">
            <p className="text-lg text-gray-700">{course.description}</p>
          </div>
          <div className="flex items-center mb-6">
            <p className="text-yellow-500 font-bold text-lg">Rating: {course.rating}</p>
            <span className="ml-4 text-gray-600">({course.numReviews} reviews)</span>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Instructor</h2>
            <p className="text-lg text-gray-700">{course.instructor}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Course Content</h2>
            <ul className="list-disc list-inside text-lg text-gray-700">
              {course.content && course.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Duration</h2>
            <p className="text-lg text-gray-700">{course.duration} hours</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Start Date</h2>
            <p className="text-lg text-gray-700">{course.startDate}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
