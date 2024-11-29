import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.css'; // Import du fichier CSS
import { BASE_URL } from '../../config';

const UserAppartements = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appartements, setAppartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const idUser = localStorage.idUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}AppartementsUser/${idUser}`);
        setAppartements(response.data.$values || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, idUser]);

  useEffect(() => {
    if (!loading && appartements.length === 0) {
      Swal.fire({
        title: 'Aucun appartement trouvé',
        text: 'Vous n\'êtes propriétaire d\'aucun appartement. Vous serez redirigé vers le tableau de bord.',
        icon: 'info',
        timer: 3000,
        showConfirmButton: false
      }).then(() => {
        navigate('/dashboard');
      });
    }
  }, [loading, appartements.length, navigate]);

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

  return (
    <div>
      <h1>Vos Appartements</h1>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppartements;
