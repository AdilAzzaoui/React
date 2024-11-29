import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config';

const CommandesList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedEtat, setUpdatedEtat] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}commandes`);
        setOrders(response.data.$values);
      } catch (err) {
        setError(err.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEditOpen = (order) => {
    setSelectedOrder(order);
    setUpdatedEtat(order.etat);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    setUpdatedEtat('');
  };

  const handleUpdateOrder = async () => {
    try {
      await axios.put(`${BASE_URL}commandes/${selectedOrder.id}`, { etat: updatedEtat });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, etat: updatedEtat } : order
        )
      );
      Swal.fire('Succès!', 'La commande a été mise à jour.', 'success');
    } catch (err) {
      console.error('Failed to update order', err);
      Swal.fire('Erreur', 'Échec de la mise à jour de la commande.', 'error');
    } finally {
      handleEditClose();
    }
  };

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas récupérer cette commande !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}commandes/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        Swal.fire('Supprimé!', 'La commande a été supprimée.', 'success');
      } catch (err) {
        console.error('Failed to delete order', err);
        setError('Error deleting order');
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des commandes
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Aucune commande trouvée !
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom du Produit</TableCell>
                <TableCell>État</TableCell>
                <TableCell>Date de Commande</TableCell>
                <TableCell>Technicien</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.nomProduit}</TableCell>
                  <TableCell>{order.etat}</TableCell>
                  <TableCell>{new Date(order.dateCommande).toLocaleDateString()}</TableCell>
                  <TableCell>{order.technicien ? `${order.technicien.nom} ${order.technicien.prenom}` : 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditOpen(order)}
                      style={{ marginRight: '8px' }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(order.id)}
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
      {selectedOrder && (
        <Dialog open={open} onClose={handleEditClose}>
          <DialogTitle>Modifier la commande</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modifiez l'état de la commande pour l'ID : {selectedOrder.id}
            </DialogContentText>
            <FormControl fullWidth margin="normal">
              <InputLabel>État</InputLabel>
              <Select
                value={updatedEtat}
                onChange={(e) => setUpdatedEtat(e.target.value)}
                label="État"
              >
                <MenuItem value="En Cours">En Cours</MenuItem>
                <MenuItem value="Annuler">Annuler</MenuItem>
                <MenuItem value="Valider">Valider</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleUpdateOrder} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default CommandesList;
