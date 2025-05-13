import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import HomePage from './Components/HomePage/HomePage'
import ProtectedRoute from './Components/ProtectedRouting/ProtectedRoute'
import RegisterForm from './Components/RegisterForm/RegisterForm'

function App() {
    return (
        <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
           <Route 
              path="/HomePage" 
              element={
                  <ProtectedRoute>
                      <HomePage />
                  </ProtectedRoute>
              }
            />
            <Route path="/" element={<LoginForm />} />
            <Route path="*" element={<LoginForm />} />
        </Routes>
      )
}

export default App