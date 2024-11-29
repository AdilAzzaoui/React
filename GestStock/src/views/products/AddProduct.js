import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useProductTypes from './useProductTypes'; // Update the path as needed
import { BASE_URL } from '../../config';
import axios from 'axios';

const AddProduct = () => {
  const { types, loading, error: fetchError } = useProductTypes();
  const [type, setType] = useState('');
  const [siteCode, setSiteCode] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [gps, setGps] = useState('');
  const [fm1, setFm1] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir ajouter ce produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, ajouter',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${BASE_URL}products`, {
            art: parseInt(type, 10), // Convert type to integer
            siteCode: siteCode,
            region: region,
            province: province,
            gps: gps,
            fM1: fm1,
            status: parseInt(status, 10), // Convert status to integer
            technicienId: localStorage.getItem('idUser'),
          });

          if (response.status === 201) {
            setSuccess(true);
            Swal.fire(
              'Ajouté!',
              'Le produit a été ajouté avec succès.',
              'success'
            );
            setTimeout(() => {
              navigate('/products');
            }, 2000);
          }
        } catch (err) {
          setError(err.message || 'Error adding product');
          Swal.fire(
            'Erreur',
            'Il y a eu une erreur lors de l\'ajout du produit.',
            'error'
          );
        }
      }
    });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (fetchError) return <Typography color="error">{fetchError}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ajouter un Produit
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Art"
            >
              {types.map((t) => (
                <MenuItem key={t.value} value={parseInt(t.value, 10)}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <TextField
            label="Site Code"
            variant="outlined"
            fullWidth
            value={siteCode}
            onChange={(e) => setSiteCode(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Région"
            variant="outlined"
            fullWidth
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Province"
            variant="outlined"
            fullWidth
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="GPS"
            variant="outlined"
            fullWidth
            value={gps}
            onChange={(e) => setGps(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="FM1"
            variant="outlined"
            fullWidth
            value={fm1}
            onChange={(e) => setFm1(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value={1}>Removed For Repair</MenuItem>
              <MenuItem value={2}>Not Pinging</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" gutterBottom>
            Produit ajouté avec succès ! Redirection en cours...
          </Typography>
        )}
        <Button variant="contained" color="primary" type="submit">
          Ajouter
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
