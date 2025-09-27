import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instance from '../utils/axios/axios';
import { myContext } from '../context/MyContextComponent';
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token") || null
    const [loading, setLoading] = useState(true);
    const { setUser } = useContext(myContext)
    useEffect(() => {

        if (!token) {
            navigate('/login')
        }
        try {
            instance.get('/user/get-user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setUser(res?.data?.data)
                    setLoading(false)
                })
                .catch((err) => {
                    localStorage.removeItem("token")
                    navigate('/login')
                })
        } catch (error) {

        }
    }, [token])

    if (loading) return <div>Loading...</div>
    return <>{children}</>

}

export default ProtectedRoute