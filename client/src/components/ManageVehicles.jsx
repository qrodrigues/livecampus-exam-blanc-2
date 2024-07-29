import { useEffect, useState } from 'react';
import './ManageVehicles.css';
const baseURI = import.meta.env.VITE_API_BASE_URL;

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    marque: '',
    modele: '',
    annee: '',
    plaque: '',
    client_id: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(baseURI + 'vehicles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      } else {
        alert('Erreur lors de la récupération des véhicules');
      }
    } catch (error) {
      alert('Erreur réseau');
    }
  };

  const handleInputChange = (e, field) => {
    setNewVehicle({ ...newVehicle, [field]: e.target.value });
  };

  const handleVehicleChange = (e, id, field) => {
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === id ? { ...vehicle, [field]: e.target.value } : vehicle
    );
    setVehicles(updatedVehicles);
  };

  const addVehicle = async () => {
    try {
      const response = await fetch(baseURI + 'vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newVehicle)
      });
      if (response.ok) {
        fetchVehicles();
        setNewVehicle({
          marque: '',
          modele: '',
          annee: '',
          plaque: '',
          client_id: ''
        });
      } else {
        alert('Erreur lors de l\'ajout du véhicule');
      }
    } catch (error) {
      alert('Erreur réseau');
    }
  };

  const updateVehicle = async (id) => {
    const vehicle = vehicles.find(v => v.id === id);
    try {
      const response = await fetch(`${baseURI}vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(vehicle)
      });
      if (response.ok) {
        fetchVehicles();
      } else {
        alert('Erreur lors de la modification du véhicule');
      }
    } catch (error) {
      alert('Erreur réseau');
    }
  };

  const deleteVehicle = async (id) => {
    try {
      const response = await fetch(`${baseURI}vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      if (response.ok) {
        fetchVehicles();
      } else {
        alert('Erreur lors de la suppression du véhicule');
      }
    } catch (error) {
      alert('Erreur réseau');
    }
  };

  return (
    <div className="manage-vehicles">
      <h2>Gérer les véhicules</h2>
      <div className="add-vehicle">
        <input
          type="text"
          placeholder="Marque"
          value={newVehicle.marque}
          onChange={(e) => handleInputChange(e, 'marque')}
        />
        <input
          type="text"
          placeholder="Modèle"
          value={newVehicle.modele}
          onChange={(e) => handleInputChange(e, 'modele')}
        />
        <input
          type="number"
          placeholder="Année"
          value={newVehicle.annee}
          onChange={(e) => handleInputChange(e, 'annee')}
        />
        <input
          type="text"
          placeholder="Plaque"
          value={newVehicle.plaque}
          onChange={(e) => handleInputChange(e, 'plaque')}
        />
        <input
          type="number"
          placeholder="Client ID"
          value={newVehicle.client_id}
          onChange={(e) => handleInputChange(e, 'client_id')}
        />
        <button onClick={addVehicle}>Ajouter un véhicule</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Année</th>
            <th>Plaque</th>
            <th>Client ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>
                <input
                  type="text"
                  value={vehicle.marque}
                  onChange={(e) => handleVehicleChange(e, vehicle.id, 'marque')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={vehicle.modele}
                  onChange={(e) => handleVehicleChange(e, vehicle.id, 'modele')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={vehicle.annee}
                  onChange={(e) => handleVehicleChange(e, vehicle.id, 'annee')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={vehicle.plaque}
                  onChange={(e) => handleVehicleChange(e, vehicle.id, 'plaque')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={vehicle.client_id}
                  onChange={(e) => handleVehicleChange(e, vehicle.id, 'client_id')}
                />
              </td>
              <td>
                <button onClick={() => updateVehicle(vehicle.id)}>Modifier</button>
                <button onClick={() => deleteVehicle(vehicle.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVehicles;
