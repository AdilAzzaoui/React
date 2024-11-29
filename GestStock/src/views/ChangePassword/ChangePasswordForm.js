import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  Paper
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

const UpdatePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les nouveaux mots de passe ne correspondent pas.',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point de modifier votre mot de passe.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, modifier!',
      cancelButtonText: 'Non, annuler'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}Account/update-password`, {
          oldPassword,
          newPassword,
          confirmPassword
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const logoutResult = await Swal.fire({
            icon: 'success',
            title: 'Mot de passe modifié',
            text: 'Votre mot de passe a été modifié avec succès. Voulez-vous vous déconnecter?',
            showCancelButton: true,
            confirmButtonText: 'Oui, déconnecter!',
            cancelButtonText: 'Non, rester connecté'
          });

          if (logoutResult.isConfirmed) {
            navigate('/logout');
          }
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue. Veuillez réessayer.',
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            Modifier le mot de passe
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="oldPassword"
              label="Ancien mot de passe"
              type="password"
              name="oldPassword"
              autoComplete="current-password"
              autoFocus
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="Nouveau mot de passe"
              type="password"
              name="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirmer le nouveau mot de passe"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Modifier le mot de passe
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate('/forgotPassword')}
              >
                Mot de passe oublié?
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default UpdatePasswordForm;
