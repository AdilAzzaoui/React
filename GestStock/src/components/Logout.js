// Logout.js
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Supprimer les éléments de localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('idUser')
    localStorage.removeItem('notifications');
    // Rediriger vers la page de login
    navigate('/login')
  }, [navigate])

  return null
}

export default Logout
