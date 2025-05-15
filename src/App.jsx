import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import HomePage from './Components/HomePage/HomePage'
import ProtectedRoute from './Components/ProtectedRouting/ProtectedRoute'
import RegisterForm from './Components/RegisterForm/RegisterForm'
import Footer from "./Components/Footer/Footer";
import Header from './Components/Header/Header'


function App() {
  return (
    <div className="App-container">
    <Header />
      <div className="main-content">
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
      </div>
      <Footer />
    </div>
  );
}

export default App