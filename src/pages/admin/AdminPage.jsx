import React, { useState } from 'react';
import Feedback from '../admin/Feedback';
import UserList from '../admin/UserList';
import CourseList from '../admin/CourseList';
import ViewCounter from '../admin/ViewCounter';
import CreateCourse from './CreateCourse';
const AdminPage = () => {
  const [tabnum, setTabnum] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between bg-gray-100 py-4 px-8">
        <h1 className="text-xl font-bold">Admin Page</h1>
        <div className="flex space-x-4">
          <button className={`tab-btn ${tabnum === 0 && 'active'}`} onClick={() => setTabnum(0)}>Course List</button>
          <button className={`tab-btn ${tabnum === 1 && 'active'}`} onClick={() => setTabnum(1)}>User List</button>
          <button className={`tab-btn ${tabnum === 2 && 'active'}`} onClick={() => setTabnum(2)}>User Feedback</button>
          <button className={`tab-btn ${tabnum === 2 && 'active'}`} onClick={() => setTabnum(3)}>Create Courses</button>
        </div>
      </div>
      <div className="mt-8">
        {tabnum === 0 && <CourseList />}
        {tabnum === 1 && <UserList />}
        {tabnum === 2 && <Feedback />}
        {tabnum === 3 && <CreateCourse />}
        <ViewCounter />
      </div>

    </div>
  );
};

export default AdminPage;
