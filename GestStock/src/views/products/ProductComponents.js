import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

const statusColors = {
  "En bon état": "green",
  "Besoin d'entretien": "orange",
  "Défectueux": "red"
};

const ProductComponents = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Hook for navigation
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [maintenanceDescription, setMaintenanceDescription] = useState('');
  const [isAddingComponent, setIsAddingComponent] = useState(false);
  const [newComponent, setNewComponent] = useState({ Nom: '', Etat: '' });
  const [commandComponentId, setCommandComponentId] = useState(null);


  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}products/components/${id}`);
        setComponents(response.data.$values);
      } catch (err) {
        setError(err.message || 'Error fetching components');
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [id]);

  const markAsGood = (componentId) => {
    setSelectedComponentId(componentId);
  };

  const saveMaintenanceDescription = async () => {
    if (!maintenanceDescription.trim()) {
      Swal.fire('Erreur', 'La description ne peut pas être vide.', 'error');
      return;
    }

    try {
      await axios.patch(`${BASE_URL}components/${selectedComponentId}`, {
        etat: "En bon état",
        description: maintenanceDescription,
        technicienId: localStorage.idUser,
      });
      const response = await axios.get(`${BASE_URL}products/components/${id}`);
      setComponents(response.data.$values);
      setMaintenanceDescription('');
      setSelectedComponentId(null);
    } catch (err) {
      console.error('Failed to update component', err);
      Swal.fire('Erreur', 'Échec de la mise à jour du composant.', 'error');
    }
  };

  const cancelUpdate = () => {
    setMaintenanceDescription('');
    setSelectedComponentId(null);
  };

  const handleEdit = (componentId) => {
    Swal.fire('Modifier', `Modifier le composant ${componentId}`, 'info');
  };

  const handleDelete = async (componentId) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas récupérer ce composant !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}components/${componentId}`);
        const response = await axios.get(`${BASE_URL}products/components/${id}`);
        setComponents(response.data.$values);
        Swal.fire('Supprimé!', 'Le composant a été supprimé.', 'success');
      } catch (err) {
        console.error('Failed to delete component', err);
        Swal.fire('Erreur', 'Échec de la suppression du composant.', 'error');
      }
    }
  };

  const handleAddComponent = async () => {
    if (!newComponent.Nom.trim() || !newComponent.Etat.trim()) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs.', 'error');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}components`, {
        ...newComponent,
        productId: id
      });

      // Show success alert and then redirect
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le composant a été ajouté avec succès!',
      }).then(async() => {
        const response = await axios.get(`${BASE_URL}products/components/${id}`);
        setComponents(response.data.$values);
        setNewComponent({ Nom: '', Etat: '' });
        setIsAddingComponent(false);

      });

      // Optionally refresh the list of components if not redirecting
      // const response = await axios.get(`${BASE_URL}products/components/${id}`);
      // setComponents(response.data.$values);
      // setNewComponent({ Nom: '', Etat: '' });
      // setIsAddingComponent(false);

    } catch (err) {
      console.error('Failed to add component', err);
      Swal.fire('Erreur', 'Échec de l\'ajout du composant.', 'error');
    }
  };

  const cancelAdd = () => {
    setNewComponent({ Nom: '', Etat: '' });
    setIsAddingComponent(false);
  };
  const handleCommand = async (componentId, componentName) => {
    try {
      await axios.post(`${BASE_URL}commandes`, {
        composentId: componentId,
        nomComposant: componentName, // Inclure le nom du composant
        technicienId: localStorage.idUser,
      });

      Swal.fire('Succès', 'Le composant a été commandé avec succès!', 'success');
    } catch (err) {
      console.error('Failed to order component', err);
      Swal.fire('Erreur', 'Échec de la commande du composant.', 'error');
    }
  };
    if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Composants du produit
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddingComponent(true)}
        style={{ marginBottom: '16px' }}
      >
        Ajouter Composant
      </Button>
      {isAddingComponent && (
        <Box marginBottom={2}>
          <TextField
            label="Nom du composant"
            value={newComponent.Nom}
            onChange={(e) => setNewComponent({ ...newComponent, Nom: e.target.value })}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel>État</InputLabel>
            <Select
              value={newComponent.Etat}
              onChange={(e) => setNewComponent({ ...newComponent, Etat: e.target.value })}
              label="État"
            >
              <MenuItem value="Besoin d'entretien">Besoin d'entretien</MenuItem>
              <MenuItem value="Défectueux">Défectueux</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComponent}
          >
            Ajouter
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={cancelAdd}
            style={{ marginLeft: '8px' }}
          >
            Annuler
          </Button>
        </Box>
      )}
      {components.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Aucun composant trouvé !
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>État</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {components.map((component) => (
    <TableRow key={component.id}>
      <TableCell>{component.id}</TableCell>
      <TableCell>{component.nom}</TableCell>
      <TableCell style={{ color: statusColors[component.etat] || 'black' }}>
        {component.etat}
      </TableCell>
      <TableCell>
        {(component.etat === "Besoin d'entretien") && (
          <>
            {selectedComponentId === component.id ? (
              <Box>
                <TextField
                  label="Description de maintenance"
                  multiline
                  rows={4}
                  fullWidth
                  value={maintenanceDescription}
                  onChange={(e) => setMaintenanceDescription(e.target.value)}
                  variant="outlined"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveMaintenanceDescription}
                >
                  Enregistrer
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={cancelUpdate}
                  style={{ marginLeft: '8px' }}
                >
                  Annuler
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => markAsGood(component.id)}
              >
                Marquer comme En bon état
              </Button>
            )}
          </>
        )}
        {component.etat === "Défectueux" && (
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleCommand(component.id , component.nom)}
            style={{ marginLeft: '8px' }}
          >
            Commander
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleEdit(component.id)}
          style={{ marginLeft: '8px' }}
        >
          Modifier
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(component.id)}
          style={{ marginLeft: '8px' }}
        >
          Supprimer
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ProductComponents;
