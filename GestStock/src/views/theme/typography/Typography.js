import React from 'react';

const AppareilList = () => {
  // Supposons que vous ayez une liste d'appareils avec leurs informations

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des appareils</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom de l'appareil</th>
              <th scope="col">Appartement</th>
              <th scope="col">Situation</th>
            </tr>
          </thead>
          <tbody>
            {appareils.map((appareil) => (
              <tr key={appareil.id}>
                <th scope="row">{appareil.id}</th>
                <td>{appareil.nom}</td>
                <td>{appareil.appartement}</td>
                <td>{appareil.situation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppareilList;
