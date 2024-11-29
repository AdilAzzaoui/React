import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config'; // Update the path as needed

const useProductTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}products/types`);
        setTypes(response.data.$values);
      } catch (err) {
        setError(err.message || 'Error fetching product types');
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, loading, error };
};

export default useProductTypes;
