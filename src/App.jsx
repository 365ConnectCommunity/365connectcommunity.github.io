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
import Blog from './pages/Blog'
import MyProfile from './pages/MyProfile'
import MyCertificates from './pages/MyCertificates'
import CommunityMembers from './pages/CommunityMembers'
import Support from './pages/Support'
import OurSocials from './pages/OurSocials'

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
                    <Route path="blog" element={<Blog />} />
                    <Route path="community-members" element={<CommunityMembers />} />
                    <Route path="support" element={<Support />} />
                    <Route path="our-socials" element={<OurSocials />} />
                    <Route path="my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
                    <Route path="my-certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
