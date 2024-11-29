import React, { useState } from 'react';
import Select from 'react-select'; // Assurez-vous que vous utilisez cette bibliothèque
import { BASE_URL } from '../../../config'; // Assurez-vous que BASE_URL est défini dans votre fichier de configuration
import {
  CButton,
  CCard,
  CCardBody,
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
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  // Options for the role dropdown
  const roleOptions = [
    { value: 1, label: 'Technicien' },
    { value: 2, label: 'ResponsableCommandes' },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userType === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select a user type',
      });
      return;
    }

    const data = {
      nom,
      prenom,
      email,
      password,
      userType,
    };

    try {
      Swal.fire({
        title: 'Votre demande est en cours',
        text: 'Veuillez patienter...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(`${BASE_URL}Account/register`, data);

      Swal.close();

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Account created successfully!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Nom"
                          autoComplete="nom"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Prénom"
                          autoComplete="prenom"
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={12}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>

                  {/* Role selection */}
                  <CRow className="mb-3">
                    <CCol md={12}>
                      <Select
                        options={roleOptions}
                        onChange={(selectedOption) => setUserType(selectedOption?.value)}
                        placeholder="Select Role"
                      />
                    </CCol>
                  </CRow>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
