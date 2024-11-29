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
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import EditProduct from './EditProduct'; // Importer le composant EditProduct

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [art, setArt] = useState('');

  const [siteCode, setSiteCode] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [gps, setGps] = useState('');
  const [fM1, setFm1] = useState('');
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre d'éléments par page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}products`);
        setProducts(response.data.$values);
        setFilteredProducts(response.data.$values);
      } catch (err) {
        console.log(err);
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const confirmDelete = (productId) => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(productId);
        Swal.fire(
          'Supprimé !',
          'Le produit a été supprimé.',
          'success'
        );
      }
    });
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleShowHistory = (productId) => {
    navigate(`/product-history/${productId}`);
  };

  const handleShowComponents = (productId) => {
    navigate(`/product-components/${productId}`);
  };

  const handleSaveEdit = async () => {
    try {
      // Effectuer la sauvegarde du produit modifié
      setIsEditing(false); // Fermez le mode édition
      setCurrentProduct(null); // Réinitialisez le produit actuel

      // Recharger la liste des produits
      const response = await axios.get(`${BASE_URL}products`);
      setProducts(response.data.$values);
      setFilteredProducts(response.data.$values); // Met à jour les produits filtrés également
    } catch (err) {
      console.error('Failed to fetch products after update', err);
      Swal.fire(
        'Erreur',
        `Échec de la récupération des produits: ${err.message}`,
        'error'
      );
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleSearch = () => {
    const filtered = products.filter(product =>
      (art === '' || product.art.toLowerCase().includes(art.toLowerCase())) &&
      (siteCode === '' || product.siteCode.toLowerCase().includes(siteCode.toLowerCase())) &&
      (region === '' || product.region.toLowerCase().includes(region.toLowerCase())) &&
      (province === '' || product.province.toLowerCase().includes(province.toLowerCase())) &&
      (gps === '' || product.gps.toLowerCase().includes(gps.toLowerCase())) &&
      (fM1 === '' || product.fM1.toLowerCase().includes(fM1.toLowerCase())) &&
      (status === '' || product.status.toLowerCase().includes(status.toLowerCase()))
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Réinitialiser la page actuelle à 1 lors de la recherche
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {!isEditing ? (
        <>
          <Box mb={2}>
            <TextField
              label="Art"
              variant="outlined"
              fullWidth
              value={art}
              onChange={(e) => setArt(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Site Code"
              variant="outlined"
              fullWidth
              value={siteCode}
              onChange={(e) => setSiteCode(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Région"
              variant="outlined"
              fullWidth
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Province"
              variant="outlined"
              fullWidth
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="GPS"
              variant="outlined"
              fullWidth
              value={gps}
              onChange={(e) => setGps(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="FM1"
              variant="outlined"
              fullWidth
              value={fM1}
              onChange={(e) => setFm1(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Status"
              variant="outlined"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <Box textAlign="center" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Rechercher
              </Button>
            </Box>
          </Box>
          {filteredProducts.length === 0 ? (
            <Box textAlign="center">
              <Typography variant="h6" color="textSecondary">
                Aucun produit trouvé !
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Art</TableCell>
                    <TableCell>Site Code</TableCell>
                    <TableCell>Région</TableCell>
                    <TableCell>Province</TableCell>
                    <TableCell>GPS</TableCell>
                    <TableCell>FM1</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.art}</TableCell>
                      <TableCell>{product.siteCode}</TableCell>
                      <TableCell>{product.region}</TableCell>
                      <TableCell>{product.province}</TableCell>
                      <TableCell>{product.gps}</TableCell>
                      <TableCell>{product.fM1}</TableCell>
                      <TableCell>{product.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(product)}
                          style={{ marginRight: '8px' }}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => confirmDelete(product.id)}
                          style={{ marginRight: '8px' }}
                        >
                          Supprimer
                        </Button>
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() => handleShowHistory(product.id)}
                          style={{ marginRight: '8px' }}
                        >
                          Afficher historiques
                        </Button>
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() => handleShowComponents(product.id)}
                        >
                          Afficher composants
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
          <Box textAlign="center" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/add-product')}
            >
              Ajouter produit
            </Button>
          </Box>
        </>
      ) : (
<EditProduct
  product={currentProduct}
  onCancel={handleCancelEdit}
  onSave={handleSaveEdit}
/>
      )}
    </Container>
  );
};

export default Products;
