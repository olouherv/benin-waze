import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import Instructions from './Instructions';

// Centré sur le Bénin
const BENIN_CENTER = [9.3077, 2.3158];

// Composant pour mettre à jour la vue de la carte (centrage, zoom)
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// Composant pour afficher les infos de trajet
function RouteInfo({ info }) {
  if (!info) return null;
  // distance en km, durée en min
  const km = (info.distance / 1000).toFixed(2);
  const min = Math.round(info.duration / 60);
  let mode = 'Voiture';
  if (info.mode === 'cycling-regular') mode = 'Vélo';
  if (info.mode === 'foot-walking') mode = 'Marche';
  return (
    <div style={{marginTop: 10, color: '#333', background: '#f5f5fa', borderRadius: 8, padding: 10, display: 'inline-block'}}>
      <span style={{marginRight: 16}}>🚗 <b>Mode :</b> {mode}</span>
      <span style={{marginRight: 16}}>📏 <b>Distance :</b> {km} km</span>
      <span>⏱️ <b>Durée estimée :</b> {min} min</span>
    </div>
  );
}

export default function MapView({ userPosition, destination, travelMode = 'driving-car', onDestinationChange }) {
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [error, setError] = useState('');
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    async function fetchRoute() {
      setRoute(null);
      setRouteInfo(null);
      setError('');
      setInstructions([]);
      if (!userPosition || !destination) return;
      const apiKey = import.meta.env.VITE_ORS_KEY;
      if (!apiKey) return setError("Clé API OpenRouteService manquante");

      const url = `https://api.openrouteservice.org/v2/directions/${travelMode}/geojson`;
      const body = {
        coordinates: [
          [userPosition[1], userPosition[0]], // lon, lat
          [destination[1], destination[0]]
        ],
        instructions: true,
        instructions_format: 'text',
      };

      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 
            'Authorization': apiKey, // Clé API dans le header
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const data = await resp.json();
        
        if (resp.ok && data.features && data.features[0] && data.features[0].geometry) {
          // La réponse est un FeatureCollection GeoJSON
          const routeData = data.features[0];
          // ORS renvoie des coordonnées [lon, lat], Leaflet attend [lat, lon]
          setRoute(routeData.geometry.coordinates.map(([lon, lat]) => [lat, lon])); 
          setRouteInfo({
            distance: routeData.properties.summary.distance,
            duration: routeData.properties.summary.duration,
            mode: travelMode,
          });
          if (routeData.properties.segments && routeData.properties.segments[0].steps) {
            setInstructions(routeData.properties.segments[0].steps);
          }
        } else {
          const errorMsg = data.error?.message || "La réponse de l'API ne contient pas d'itinéraire.";
          setError(`Aucun itinéraire trouvé: ${errorMsg}`);
          console.warn('Réponse OpenRouteService invalide', data);
        }
      } catch (e) {
        setError(`Erreur lors du calcul de l'itinéraire : ${e.message}`);
      }
    }
    fetchRoute();
  }, [userPosition, destination, travelMode]);

  // Icônes personnalisées
  const userIcon = new L.divIcon({
    html: '<div style="background-color: #28a745; width: 16px; height: 16px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 5px #000;"></div>',
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  const destinationIcon = new L.divIcon({
    html: '<div style="background-color: #dc3545; width: 16px; height: 16px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 5px #000;"></div>',
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <>
      <div style={{ height: '400px', width: '100%', margin: '2em 0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px #0001' }}>
        <MapContainer center={userPosition || BENIN_CENTER} zoom={13} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={userPosition || BENIN_CENTER} zoom={userPosition ? 15 : 7} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userPosition && <Marker position={userPosition} icon={userIcon} />}
          {destination && 
          <Marker 
            position={destination} 
            icon={destinationIcon} 
            draggable={true}
            eventHandlers={{
              dragend: async (e) => {
                const { lat, lng } = e.target.getLatLng();
                const apiKey = import.meta.env.VITE_ORS_KEY;
                let newLabel = 'Position personnalisée';

                try {
                  const response = await fetch(`https://api.openrouteservice.org/geocode/reverse?api_key=${apiKey}&point.lon=${lng}&point.lat=${lat}&size=1&boundary.country=BEN`);
                  const data = await response.json();
                  if (response.ok && data.features && data.features.length > 0) {
                    newLabel = data.features[0].properties.label;
                  }
                } catch (err) {
                  console.error("Erreur de géocodage inversé:", err);
                }

                if (onDestinationChange) {
                  onDestinationChange([lat, lng], newLabel);
                }
              },
            }}
          />
        }
          {route && <Polyline positions={route} color="#1976d2" weight={6} />} 
        </MapContainer>
      </div>
      
      {destination && (
        <div style={{marginTop: -20, marginBottom: 10, color: '#1976d2'}}>
          <b>Destination sélectionnée :</b> {destination[0].toFixed(5)}, {destination[1].toFixed(5)}
        </div>
      )}
      {routeInfo && <RouteInfo info={routeInfo} />}
      {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
      {instructions.length > 0 && <Instructions steps={instructions} />}
    </>
  );
}

