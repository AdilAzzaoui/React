import React from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="image-with-text">
        <img src="images.jpeg" alt="Description de l'image" className="dashboard-image" />
        <div className="text-overlay animate__animated animate__fadeIn">
          Optimisez la gestion de vos stocks avec notre solution dédiée. Suivez en temps réel l'état de vos produits, enregistrez chaque mouvement, et assurez-vous d'une gestion fluide et organisée de vos ressources. Notre système vous permet de :
        </div>
      </div>
      <div className="advantage-section">
        <h2>Avantages de notre site :</h2>
        <div className="advantage-list">
          <div className="advantage-item">
            <span className="advantage-number">1. Suivre les Stocks en temps réel </span>
            <p className="advantage-description">Visualisez les quantités disponibles, les niveaux critiques, et les mouvements de stock pour chaque produit.
            </p>
          </div>
          <div className="advantage-item">
            <span className="advantage-number">2. Historiser les Actions </span>
            <p className="advantage-description">Enregistrez les descriptions et les dates de chaque maintenance ou ajustement effectué sur vos produits.
            </p>
          </div>
          <div className="advantage-item">
            <span className="advantage-number">3. Gestion des Techniciens</span>
            <p className="advantage-description"> Identifiez facilement quel technicien a effectué une intervention grâce à une liaison directe avec les utilisateurs dans le système.</p>
          </div>
          <div className="advantage-item">
            <span className="advantage-number">4. Optimiser les Réapprovisionnements</span>
            <p className="advantage-description"> Recevez des alertes lorsque les niveaux de stock sont bas pour éviter les ruptures et garantir une gestion proactive.</p>
          </div>
        </div>
      </div>

      <div className="additional-info">
        <img className="additional-image" src="stockk.jpeg" alt="Gestion de Stock" />
        <div className="additional-text">
          <p className="additional-title">Gestion de Stock :</p>
          <p className="additional-description">La gestion de stock est un processus crucial pour maintenir l'équilibre entre l'offre et la demande. Notre système de gestion de stock vous permet de suivre avec précision les quantités de produits, les mouvements de stock, et les niveaux critiques. Grâce à une interface intuitive, vous pouvez enregistrer chaque opération, surveiller les niveaux en temps réel, et optimiser les réapprovisionnements pour garantir une disponibilité continue des produits tout en minimisant les coûts et les pertes.</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
