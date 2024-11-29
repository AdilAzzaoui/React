import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Paper
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation , useNavigate} from 'react-router-dom';
import {BASE_URL} from '../../../config'
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Utilisation de useNavigate pour obtenir la fonction de navigation

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
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
      Swal.fire('Erreur', 'Les mots de passe ne correspondent pas', 'error');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}Account/reset-password`, {
        email: email,
        token: code,
        newPassword: newPassword
      });

      console.log(response.data);
      console.log("--------------------------------------------");
      console.log(response.status);

      // Vérifier si la réinitialisation du mot de passe a réussi
      if (response.status === 200) {
        Swal.fire('Succès', 'Votre mot de passe a été réinitialisé avec succès', 'success');
        navigate("/logout"); // Utilisation de la fonction de navigation pour rediriger vers /login
      } else {
        // Afficher un message d'erreur en cas de réponse inattendue du serveur
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la réinitialisation de votre mot de passe', 'error');
      }
    } catch (error) {
      // Afficher un message d'erreur en cas d'échec de la requête axios
      console.error('There was a problem with your axios operation:', error);
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
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Code de réinitialisation"
            name="code"
            autoComplete="code"
            value={code}
            onChange={handleCodeChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Nouveau mot de passe"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 24 }}
          >
            Réinitialiser le mot de passe
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
