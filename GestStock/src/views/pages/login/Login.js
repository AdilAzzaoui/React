import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importer Axios
import { jwtDecode } from 'jwt-decode';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { BASE_URL } from '../../../config'; // Assurez-vous que BASE_URL est défini dans votre fichier de configuration

const Login = () => {


  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // État pour stocker le message d'erreur
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };

    try {
      const response = await axios.post(`${BASE_URL}Account`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);

      // Vérifier si la réponse est correcte (200)
      if (response.status === 200) {
        const token = response.data.data;
        const decodedToken = jwtDecode(token);

        console.log(decodedToken);
        localStorage.setItem("idUser", decodedToken.nameid)
        setToken(token);
        // const decodedToken = jwt_decode(tokenFromServer);

        // Affichage des informations


        // Stocker le token dans le localStorage ou le state management
        localStorage.setItem('token', token);
        // Rediriger l'utilisateur vers le tableau de bord ou une autre page
        navigate('/dashboard');
      } else {
        // Afficher un message d'erreur en cas de réponse invalide
        setErrorMessage('Une erreur est survenue lors de la connexion');
        console.error('Erreur :', response); // Affiche les détails de l'erreur dans la console

      }
    } catch (error) {
      // Gérer les erreurs
      setErrorMessage(`Erreur : ${error.response.data}`);
      //console.error('Erreur :', response.data); // Affiche les détails de l'erreur dans la console

    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgotPassword">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>

                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Ce site vous permet de gérer et de superviser efficacement votre appartement, même lorsque vous êtes loin de chez vous.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
