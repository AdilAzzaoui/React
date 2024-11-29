import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import logo from '/logo.png'
import navigation from '../_nav'
import {jwtDecode} from 'jwt-decode' // Assurez-vous que l'importation est correcte

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const location = useLocation()
  const currentPath = location.pathname

  const token = localStorage.getItem('token')
  const isAuthenticated = !!token
  let roles = []

  if (token) {
    const decodedToken = jwtDecode(token)
    roles = Array.isArray(decodedToken.role) ? decodedToken.role : []
    console.log('Decoded roles:', decodedToken.role)
    console.log('Roles:', roles)
  }

  // Helper function to check if the user has any of the specified roles
  const hasRoles = (...roleNames) => {
    if (!Array.isArray(roles)) {
      console.error('Roles is not an array:', roles)
      return false
    }
    return roles.some(role => roleNames.includes(role))
  }

  const filteredNavigation = navigation.filter(item => {
    if (!isAuthenticated) {
      // Afficher seulement Accueil, Login et Contactez-nous si l'utilisateur n'est pas connecté
      return item.name === 'Accueil' || item.name === 'Login' || item.name === 'Contactez-nous'
    } else {
      // Afficher Commandes et Produits pour tous les utilisateurs connectés
      if (item.name === 'Commandes' || item.name === 'Produits') {
        return true
      }

      // Cacher le lien Login pour les utilisateurs connectés
      if (item.name === 'Login') {
        return false
      }

      // Afficher les éléments en fonction des rôles spécifiques
      if (hasRoles('Admin', 'ResponsableCommandes', 'Technicien')) {
        return true // Afficher les éléments pour ces rôles
      }

      // Cacher certains éléments pour des rôles spécifiques
      if (hasRoles('Technicien') && item.name === 'CertainElement') {
        return false
      }

      if (hasRoles('ResponsableCommandes') && item.name === 'AutreElement') {
        return false
      }

      return true
    }
  })

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <div className="sidebar-brand">
          <img src={logo} alt="Logo" height={80} />
        </div>
        <button
          className="d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </CSidebarHeader>

      <AppSidebarNav items={filteredNavigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
