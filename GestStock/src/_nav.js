import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBuilding } from '@coreui/icons'
import { MdOutlineBorderColor } from "react-icons/md"

import {
  cilContact,
  cilAccountLogout,
  cilUser,
  cilHome,
  cibProductHunt,
  cilEnvelopeOpen,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Accueil',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: '',
    to: '',
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Commandes',
    to: '/commandes',
    icon: <MdOutlineBorderColor />
    ,
    badge: {
      color: 'info',
      /*text: 'NEW',*/
    },
  },



  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
    icon: <CIcon icon={cilUser} customClassName="nav-icon"/>,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Produits',
    to: '/products',
    icon: <CIcon icon={cibProductHunt} customClassName="nav-icon"/>,
    badge: {
      color: 'info',
    },
  },



  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout}  customClassName="nav-icon"/>,
    badge: {
      color: 'info',
    },
  },


]

export default _nav
