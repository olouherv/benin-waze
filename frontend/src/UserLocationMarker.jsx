import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import userMarkerUrl from './user-marker.svg';

export default function UserLocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        map.setView(coords, 17); // Zoom détaillé sur l'utilisateur
      },
      (err) => {
        console.error('Erreur géolocalisation', err);
      },
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watcher);
  }, [map]);

  const userIcon = L.icon({
    iconUrl: userMarkerUrl,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });

  return position ? (
    <Marker position={position} icon={userIcon} />
  ) : null;
}
