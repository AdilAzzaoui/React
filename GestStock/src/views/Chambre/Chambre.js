import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
import Chart from 'chart.js/auto';
import { CircularProgress, Typography, Container, Grid, Paper } from '@mui/material';
import './styles.css'; // Assurez-vous que le fichier CSS est importé
import { BASE_URL } from '../../config';

const Chambre = () => {
  const {appartementId, chambreId } = useParams();
  const [chambreData, setChambreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}Chambres/${chambreId}`);
        setChambreData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chambreId]);

  useEffect(() => {
    if (chambreData) {
      const temperatureData = [];
      const humidityData = [];

      chambreData.telemetriques.$values.forEach(telemetrique => {
        const timestamp = new Date(telemetrique.date).getTime();
        temperatureData.push({ x: new Date(timestamp), y: telemetrique.temperature });
        humidityData.push({ x: new Date(timestamp), y: telemetrique.humidity });
      });

      const ctx = document.getElementById('chart');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Température',
            data: temperatureData,
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: 'rgba(255, 99, 132, 1)',
            pointRadius: 4,
            tension: 0.1
          }, {
            label: 'Humidité',
            data: humidityData,
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: 'rgba(54, 162, 235, 1)',
            pointRadius: 4,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute'
              }
            },
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            tooltip: {
              enabled: true,
              intersect: false,
              mode: 'index',
              callbacks: {
                label: function(context) {
                  const datasetLabel = context.dataset.label || '';
                  return `${datasetLabel}: ${context.parsed.y}`;
                }
              }
            }
          }
        }
      });

      setChart(newChart);
    }
  }, [chambreData]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1" color="error">Error: {error.message}</Typography>;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} className="paper-container">
            <Typography variant="h4" gutterBottom>Détails de l'Appartement et de la Chambre</Typography>
            <Typography variant="body1" gutterBottom>ID de l'Appartement: {appartementId}</Typography>
            <Typography variant="body1" gutterBottom>ID de la Chambre: {chambreId}</Typography>
            {chambreData && (
              <>
                <Typography variant="h6" gutterBottom>Graphique de Température et d'Humidité</Typography>
                <div className="chart-container">
                  <canvas id="chart" className="chart"></canvas>
                </div>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chambre;
