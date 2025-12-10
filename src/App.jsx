import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Team from './pages/Team'
import Events from './pages/Events'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LoginVerify from './pages/LoginVerify'

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="team" element={<Team />} />
                    <Route path="team-members" element={<Team />} />
                    <Route path="events" element={<Events />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="login-verify" element={<LoginVerify />} />
                    {/* Protected routes will be added in next phase */}
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
