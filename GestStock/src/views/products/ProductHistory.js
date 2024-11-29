import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';

const ProductHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [technician, setTechnician] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}products/${id}`);
        console.log(response.data);
        setHistory(response.data.histories.$values); // Historique des maintenances
        setTechnician(response.data.technicien); // Informations sur le technicien
      } catch (err) {
        setError(err.message || 'Error fetching product history');
      } finally {
        setLoading(false);
      }
    };

    fetchProductHistory();
  }, [id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Date de maintenance", "Description", "Nom du Technicien", "Prénom du Technicien", "Email du Technicien"];
    const tableRows = [];

    history.forEach(entry => {
      const rowData = [
        entry.maintenanceDate,
        entry.description,
        technician.nom,
        technician.prenom,
        technician.email
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Historique du produit", 14, 15);
    doc.save(`historique_produit_${id}.pdf`);
  };

  const downloadQRCode = async () => {
    const qrData = JSON.stringify({
      histories: history,
      technician: technician
    });

    try {
      const qrCodeDataURL = await QRCode.toDataURL(qrData);
      const link = document.createElement('a');
      link.href = qrCodeDataURL;
      link.download = `historique_produit_${id}_qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to generate QR code', err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historique du produit
      </Typography>
      <Box mb={2}>
        <Button variant="outlined" color="primary" onClick={() => navigate('/products')}>
          Retourner aux produits
        </Button>
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Télécharger l'historique
        </Button>
        <Button variant="contained" color="secondary" onClick={downloadQRCode} style={{ marginLeft: '10px' }}>
          Télécharger le QR Code
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date de maintenance</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Nom du Technicien</TableCell>
              <TableCell>Prénom du Technicien</TableCell>
              <TableCell>Email du Technicien</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.maintenanceDate}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{technician.nom}</TableCell>
                <TableCell>{technician.prenom}</TableCell>
                <TableCell>{technician.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductHistory;
