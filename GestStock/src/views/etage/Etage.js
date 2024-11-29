import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import './etage.css'; // Import du fichier CSS
import { BASE_URL } from '../../config';

const Appartement = () => {
  const { id } = useParams();
  const [appartements, setAppartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}Etages/${id}/appartements`);
        console.log(response.data.$values);
        setAppartements(response.data.$values || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getPositionStyle = index => {
    const positions = [
      { top: '0', left: '0' },
      { top: '0', left: '50%' },
      { top: '50%', left: '50%' },
      { top: '50%', left: '0' }
    ];

    return {
      position: 'absolute',
      width: '50%',
      height: '50%',
      ...positions[index]
    };
  };
  const handleRelease = async (appartement) => {
    try {
      // Affichage du message "Veuillez patienter..."
      Swal.showLoading();

      // Affichage de la confirmation avec SweetAlert2
      const confirmation = await Swal.fire({
        title: 'Confirmation',
        text: 'Êtes-vous sûr de vouloir libérer cet appartement ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, libérer',
        cancelButtonText: 'Annuler',
      });

      // Vérification si l'utilisateur a confirmé
      if (confirmation.isConfirmed) {
        // Création du corps de la requête
        const requestBody = {
          idUser: appartement.gestAppartementId,
          appartementId: appartement.id
        };

        // Envoi de la requête POST pour libérer l'appartement
        const response = await axios.post(`${BASE_URL}RetraitAppartement`, requestBody);

        // Affichage d'un message de succès avec SweetAlert2 si la réponse est 200
        if (response.status === 200) {
          Swal.fire({
            title: 'Succès',
            text: 'Appartement libéré avec succès !',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          // Autres actions après la libération de l'appartement, si nécessaire
        } else {
          // Affichage d'un message d'erreur si la réponse n'est pas 200
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de la libération de l\'appartement.',
            icon: 'error'
          });
        }
      }
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de la libération de l'appartement :", error);
      // Affichage de l'erreur ou autres actions de gestion des erreurs
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la libération de l\'appartement.',
        icon: 'error'
      });
    }
  };

  return (
    <div>
      <h1>Étage {id}</h1>
      <div className="appartements">
        {appartements.map(appartement => (
          <div key={appartement.id} className="appartement">
            <h2>Appartement {appartement.id}</h2>
            <div className="appartement-image-container" style={{ position: 'relative', width: '100%', height: 'auto' }}>
              {/* Image de l'appartement */}
              <img src='appartement.png' alt={`Appartement ${appartement.id}`} className="appartement-image" style={{ width: '100%', height: 'auto' }} />
              {/* Diviser l'image en 4 zones cliquables */}
              {appartement.chambres.$values.map((chambre, index) => (
                <Link key={chambre.id} to={`/appartement/${appartement.id}/chambre/${chambre.id}`} className={`appartement-part part${index + 1}`} style={getPositionStyle(index)}></Link>
              ))}
            </div>
            {/* Tableau pour les informations du périphérique */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID du périphérique</TableCell>
                    <TableCell>Adresse MAC</TableCell>
                    <TableCell>État</TableCell>
                    <TableCell>Etat d'appartement</TableCell>
                    {appartement.gestAppartementId && (

                    <TableCell>Actions</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{appartement.device.id}</TableCell>
                    <TableCell>{appartement.device.adresseMac}</TableCell>
                    <TableCell style={{ color: appartement.device.adresseMac == null ? 'red' : 'Green' }}>  {appartement.device.adresseMac == null ? "Down" : "Actif"}</TableCell>
                    <TableCell style={{ color: appartement.gestAppartementId ? 'gray' : 'green' }}>
                      {appartement.gestAppartementId ? 'Réservé' : 'Libre'}
                    </TableCell>
                    {appartement.gestAppartementId && (
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => handleRelease(appartement)}>
                          Libérer
                        </Button>
                      </TableCell>
                    )}

                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appartement;
