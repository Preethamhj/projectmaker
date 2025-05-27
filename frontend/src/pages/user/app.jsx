import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashbaord';
import Charts from './charts';
import ChatPage from './chatpage';
import Finished from './finished';
import Profile from './profile';
import Calendar from './calender';
import AssignWork from './assignwork';

function UserApp() {
  return (
    <Router>
      <Routes>
        <Route path='/user' element={<Dashboard />} />
        <Route path='/user/charts' element={<Charts />} />
        <Route path='/user/chatpage' element={<ChatPage />} />
        <Route path='/user/finished' element={<Finished />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/user/calendar' element={<Calendar />} />
        <Route path='/user/assigned' element={<AssignWork />} />
      </Routes>
    </Router>
  );
}

export default UserApp;
