import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Feedback from '../admin/Feedback'
import UserList from '../admin/UserList'
import CourseList from '../admin/CourseList'

const AdminPage = () => {
  const [tabnum, setTabnum] = useState(0);

  return (
    <div>
      <div className='day la header chua 3 nut, css cai nay thanh tab bar'>
        {/* Them logo proskill vao */}
        <p>Admin page</p>
        <button onClick={() => {setTabnum(0)}}>Course List</button>
        <button onClick={() => {setTabnum(1)}}>User List</button>
        <button onClick={() => {setTabnum(2)}}>User feedback</button>
      </div>
      {tabnum === 0?
        <CourseList></CourseList>
        :
      tabnum === 1?
        <UserList></UserList>
        :
        <Feedback></Feedback>
      }
    </div>
  );
};

export default AdminPage