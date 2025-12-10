import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Team from './pages/Team'
import Events from './pages/Events'
import Courses from './pages/Courses'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="team" element={<Team />} />
                <Route path="events" element={<Events />} />
                <Route path="courses" element={<Courses />} />
            </Route>
        </Routes>
    )
}

export default App
