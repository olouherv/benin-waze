import { useState, useRef } from 'react';

export default function RouteForm({ onRoute }) {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef();

  async function fetchSuggestions(query) {
    if (!query) return setSuggestions([]);
    const apiKey = import.meta.env.VITE_ORS_KEY;
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(query)}&boundary.country=BJ&size=6`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data && data.features) {
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  }

  function handleChange(e) {
    const val = e.target.value;
    setAddress(val);
    setShowSuggestions(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 350);
  }

  function handleSuggestionClick(s) {
    setAddress(s.properties.label);
    setSuggestions([]);
    setShowSuggestions(false);
    const coords = s.geometry.coordinates; // [lon, lat]
    const dest = [coords[1], coords[0]];
    onRoute(dest, s.properties.label);
  }

  function handleBlur() {
    setTimeout(() => setShowSuggestions(false), 200);
  }

  return (
    <div style={{margin: '1em 0', position: 'relative', maxWidth: 500}}>
      <input
        type="text"
        value={address}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        placeholder="Adresse ou lieu de destination"
        style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
        required
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{position: 'absolute', left: 0, right: 0, top: 38, background: '#fff', border: '1px solid #ddd', borderRadius: 4, zIndex: 10, maxHeight: 180, overflowY: 'auto', margin: 0, padding: 0, listStyle: 'none'}}>
          {suggestions.map((s, i) => (
            <li key={i} style={{padding: 8, cursor: 'pointer'}} onMouseDown={() => handleSuggestionClick(s)}>
              {s.properties.label}
            </li>
          ))}
        </ul>
      )}
      {error && <span style={{color: 'red', marginLeft: 8}}>{error}</span>}
    </div>
  );
}
