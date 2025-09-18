import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instance from '../utils/axios/axios';
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token") || null
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        if (!token) {
            navigate('/captain-login')
            return
        }

        instance.get('/captains/get-captain', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setLoading(false)
            })
            .catch((err) => {
                localStorage.removeItem("token")
                navigate('/captain-login')
            })

    }, [token])

    if (loading) return <div>Loading...</div>
    return <>{children}</>
}

export default ProtectedRoute