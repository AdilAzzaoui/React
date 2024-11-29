import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Paper
} from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Email:', email);

    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point d'envoyer un email de réinitialisation de mot de passe.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, envoyer!',
      cancelButtonText: 'Non, annuler'
    });

    if (result.isConfirmed) {

      try {
        const response = await axios.post(`${BASE_URL}Account/forgot-password`, { email });
        console.log('Success:', response.data);

        Swal.fire(
          'Envoyé!',
          'L\'email de réinitialisation de mot de passe a été envoyé, veuillez vérifier votre boîte email!',
          'success'
        ).then(() => {
          navigate(`/resetPassword?email=${encodeURIComponent(email)}`);
        });
      } catch (error) {
        console.error('There was a problem with your axios operation:', error);

        Swal.fire(
          'Erreur!',
          'Une erreur s\'est produite lors de l\'envoi de l\'email.',
          'error'
        );
      }
    } else {
      Swal.fire(
        'Annulé',
        'L\'envoi de l\'email a été annulé.',
        'error'
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography component="h1" variant="h5" align="center">
          Réinitialiser le mot de passe
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 24 }}
          >
            Envoyer le code
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
