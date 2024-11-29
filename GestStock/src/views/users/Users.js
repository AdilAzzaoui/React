import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { BASE_URL } from '../../config';

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsersWithRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}Users/Roles`);
        console.log('API Response:', response.data);
        setUsers(response.data.$values);
      } catch (error) {
        console.error('Error fetching users with roles:', error);
      }
    };

    fetchUsersWithRoles();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des Utilisateurs
      </Typography>
      {users ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/notGestionnedAppartement/${user.email}`} // Passer l'ID de l'utilisateur dans l'URL
                      >
                      Attribuer Appartement
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6">Chargement...</Typography>
      )}
    </Container>
  );
};

export default Users;
