import './App.css';
import MapView from './MapView';
import IncidentForm from './IncidentForm';
import RouteForm from './RouteForm';
import { useState, useEffect } from 'react';

function App() {
  const [userPosition, setUserPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationLabel, setDestinationLabel] = useState('');
  const [travelMode, setTravelMode] = useState('driving-car'); // 'driving-car', 'cycling-regular', 'foot-walking'


  // Géolocalisation utilisateur (simple)
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error('Erreur géolocalisation', err);
      },
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return (
    <div className="container">
      <h1>Waze Bénin</h1>
      <h2>Navigation communautaire, adaptée au Bénin</h2>
      <p>
        Bienvenue sur Waze Bénin ! Cette application web vous permet de signaler et de visualiser en temps réel les incidents de circulation, embouteillages, dangers, et spécificités locales (zémidjans, routes non goudronnées, marchés, etc.)
      </p>
      <p>
        🚗 Contribuez à une meilleure mobilité pour tous au Bénin en partageant les informations sur le trafic et les incidents rencontrés sur votre route.
      </p>
      <RouteForm onRoute={(dest, label) => { setDestination(dest); setDestinationLabel(label); }} />

      <div style={{ margin: '1em 0' }}>
        <button onClick={() => setTravelMode('driving-car')} style={travelMode === 'driving-car' ? styles.buttonActive : styles.button}>🚗 Voiture</button>
        <button onClick={() => setTravelMode('cycling-regular')} style={travelMode === 'cycling-regular' ? styles.buttonActive : styles.button}>🚲 Vélo</button>
        <button onClick={() => setTravelMode('foot-walking')} style={travelMode === 'foot-walking' ? styles.buttonActive : styles.button}>🚶 À pied</button>
      </div>

      <MapView
        userPosition={userPosition}
        destination={destination}
        travelMode={travelMode}
        onDestinationChange={(newDest, newLabel) => {
          setDestination(newDest);
          setDestinationLabel(newLabel || 'Position personnalisée');
        }}
      />
      {destinationLabel && destination && (
        <div style={{margin: '1em 0', color: '#1976d2'}}>
          <b>Destination :</b> {destinationLabel}
        </div>
      )}
      <IncidentForm onSubmit={(data) => {
        alert(`Signalement envoyé : ${JSON.stringify(data, null, 2)}`);
      }} userPosition={userPosition} />
      <p style={{marginTop: '2em', color: '#888'}}>
        (Signalez un incident ou explorez la carte du Bénin ci-dessus)
      </p>
    </div>
  );
}

const styles = {
  button: {
    border: '1px solid #ccc',
    background: '#fff',
    padding: '8px 16px',
    marginRight: '8px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonActive: {
    border: '1px solid #1976d2',
    background: '#e3f2fd',
    color: '#1976d2',
    padding: '8px 16px',
    marginRight: '8px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default App;
