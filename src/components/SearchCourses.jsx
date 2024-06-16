import React, { useState } from 'react';
import axios from 'axios';

const SearchCourses = () => {
  const [keyword, setKeyword] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/search-courses', { keyword });
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching courses:', error);
      setError('Error searching courses. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Courses</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword..."
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {courses.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {courses.map(course => (
              <li key={course._id}>
                <h4>{course.title}</h4>
                <p>{course.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCourses;
