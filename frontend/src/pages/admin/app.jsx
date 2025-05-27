import React from 'react'
import { BrowserRouter , Route, Routes} from 'react-router-dom'
import ChatPage from './chatpage'
import Dashboard from './dashboard'
import Charts from './charts' 
import Calendar from './calender'

function AdminApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/charts" element={<Charts />} />  
          <Route path="/admin/calendar" element={<Calendar />} />
          <Route path="/admin/chatpage" element={<ChatPage />} />

      </Routes>
    </BrowserRouter>

  </div>
)
}

export default AdminApp
