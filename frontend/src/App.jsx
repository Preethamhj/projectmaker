import React from 'react'
import AdminApp from './pages/admin/app'
import UserApp from './pages/user/app'
import AuthApp from './pages/auth/app'
import './App.css'

function App() {
  return (
    <div>
      
      <AuthApp/>
      <UserApp/>
      <AdminApp/>
    </div>
  )
}

export default App
