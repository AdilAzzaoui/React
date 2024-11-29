import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { BASE_URL } from '../../config';
import useProductTypes from './useProductTypes'; // Mettez à jour le chemin selon vos besoins

const EditProduct = ({ product, onCancel, onSave }) => {
  const {types, loading, error: fetchError } = useProductTypes();
  const [art, setArt] = useState(product.art || '');
  const [siteCode, setSiteCode] = useState(product.siteCode || '');
  const [region, setRegion] = useState(product.region || '');
  const [province, setProvince] = useState(product.province || '');
  const [gps, setGps] = useState(product.gps || '');

  const [fM1, setFm1] = useState(product.fM1 || '');
  const [status, setStatus] = useState(product.status || '');
  const [serviceReportDone, setServiceReportDone] = useState(product.serviceReportDone || false);
  const [description, setDescription] = useState(product.description || '');

  useEffect(() => {
    // Synchroniser les champs de formulaire avec le produit passé en prop
    setArt(product.art || '');
    setSiteCode(product.siteCode || '');
    setRegion(product.region || '');
    setProvince(product.province || '');
    setGps(product.gps || '');
    setFm1(product.fM1 || '');
    setStatus(product.status || '');
    setServiceReportDone(product.serviceReportDone || false);
    setDescription(product.description || '');
  }, [product]);

  const handleSave = async () => {
    try {
      if (!art || !siteCode || !region || !province || !gps || !fM1 || !status) {
        Swal.fire(
          'Erreur',
          'Tous les champs sont obligatoires.',
          'error'
        );
        return;
      }

      await axios.put(`${BASE_URL}products/${product.id}`, {
        art: parseInt(art, 10),
        siteCode,
        region,
        province,
        gps,
        fM1,
        status: parseInt(status, 10),
        serviceReportDone,
        description,
        technicienId: localStorage.getItem('idUser')
      });
      Swal.fire(
        'Succès!',
        'Le produit a été mis à jour.',
        'success'
      );
      onSave(); // Appeler la fonction onSave après la mise à jour réussie
    } catch (err) {
      Swal.fire(
        'Erreur',
        `Échec de la mise à jour du produit: ${err.response?.data?.message || err.message}`,
        'error'
      );
      console.error('Failed to update product', err);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (fetchError) return <Typography color="error">{fetchError}</Typography>;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Modifier le produit
      </Typography>
      <Box mb={2}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel>Art</InputLabel>
          <Select
            value={art}
            onChange={(e) => setArt(e.target.value)}
            label="Art"
          >
            {types.map((t) => (
              <MenuItem key={t.value} value={t.value} >
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
          value={fM1}
          onChange={(e) => setFm1(e.target.value)}
          required
        />
      </Box>
      <Box mb={2}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel>Statut</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Statut"
          >
            <MenuItem value="1">Valide</MenuItem>
            <MenuItem value="2">Removed For Repair</MenuItem>
            <MenuItem value="3">Not Pinging</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {status === '1' && (
        <>
          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={serviceReportDone}
                  onChange={(e) => setServiceReportDone(e.target.checked)}
                  color="primary"
                />
              }
              label="Service Report Done"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </>
      )}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginRight: '8px' }}
        >
          Enregistrer
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
        >
          Annuler
        </Button>
      </Box>
    </Container>
  );
};

export default EditProduct;
