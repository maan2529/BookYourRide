import React from 'react'
import { Routes, Route } from "react-router"
import Start from '../pages/Start'
import UserLogin from '../pages/UserLogin'
import UserSignup from '../pages/UserSignup'
import CaptainSignup from '../pages/CaptainSignup'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import ProtectedRoute from '../Components/ProtectedRoute'
import CaptainHome from '../pages/CaptainHome'
import Captainlogin from '../pages/CaptainLogin'
import CaptainProtectedRoute from '../Components/CaptainProtectedRoute'
import Riding from "../pages/Riding"
import CaptainRiding from '../pages/CaptainRiding'
const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>} />
            <Route path="/riding" element={
                <ProtectedRoute>
                    <Riding />
                </ProtectedRoute>} />


            {/* Captain Routes */}
            <Route path="/captain-signup" element={<CaptainSignup />} />
            <Route path="/captain-login" element={<Captainlogin />} />
            <Route path="/captain-home" element={
                <CaptainProtectedRoute>
                    <CaptainHome />
                </CaptainProtectedRoute>} />
            <Route path="/captain-riding" element={
                <CaptainProtectedRoute>
                    <CaptainRiding />
                </CaptainProtectedRoute>} />

            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}

export default Routing