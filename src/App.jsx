import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/admin/AdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/Home'
import Team from './pages/Team'
import Events from './pages/Events'
import Courses from './pages/Courses'
import CourseViewer from './pages/CourseViewer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LoginVerify from './pages/LoginVerify'
import Blog from './pages/Blog'
import MyProfile from './pages/MyProfile'
import MyCertificates from './pages/MyCertificates'
import MyEvents from './pages/MyEvents'
import MyCourses from './pages/MyCourses'
import CommunityMembers from './pages/CommunityMembers'
import Support from './pages/Support'
import OurSocials from './pages/OurSocials'
import BecomeContributor from './pages/BecomeContributor'
import Tools from './pages/Tools'
import EventRegistration from './pages/EventRegistration'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminEvents from './pages/admin/AdminEvents'
import AdminTeam from './pages/admin/AdminTeam'
import AdminCertificates from './pages/admin/AdminCertificates'
import AdminRegistrations from './pages/admin/AdminRegistrations'
import AdminApplications from './pages/admin/AdminApplications';
import AdminMigration from './pages/admin/AdminMigration';

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Website Routes */}
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
                    <Route path="become-contributor" element={<BecomeContributor />} />
                    <Route path="register" element={<ProtectedRoute><EventRegistration /></ProtectedRoute>} />
                    <Route path="tools" element={<Tools />} />
                    <Route path="my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
                    <Route path="my-certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />
                    <Route path="my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
                    <Route path="my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="course/:courseId" element={<ProtectedRoute><CourseViewer /></ProtectedRoute>} />
                </Route>

                {/* Admin Portal Routes */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="events" element={<AdminEvents />} />
                        <Route path="team" element={<AdminTeam />} />
                        <Route path="certificates" element={<AdminCertificates />} />
                        <Route path="registrations" element={<AdminRegistrations />} />
                        <Route path="applications" element={<AdminApplications />} />
                        <Route path="migration" element={<AdminMigration />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
