import { useState } from 'react';

export default function IncidentForm({ onSubmit, userPosition }) {
  const [type, setType] = useState('accident');
  const [desc, setDesc] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!userPosition) {
      alert('Position utilisateur non détectée');
      return;
    }
    onSubmit({ type, desc, position: userPosition });
    setDesc('');
  }

  return (
    <form onSubmit={handleSubmit} style={{marginTop: '1em', background: '#f8f9fa', padding: 16, borderRadius: 8, boxShadow: '0 1px 4px #0001', maxWidth: 400}}>
      <h3>Signaler un incident</h3>
      <div style={{marginBottom: 8}}>
        <label>
          Type d'incident :
          <select value={type} onChange={e => setType(e.target.value)} style={{marginLeft: 8}}>
            <option value="accident">Accident</option>
            <option value="embouteillage">Embouteillage</option>
            <option value="danger">Danger</option>
            <option value="zémidjan">Zémidjan</option>
            <option value="autre">Autre</option>
          </select>
        </label>
      </div>
      <div style={{marginBottom: 8}}>
        <label>
          Description :
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} style={{marginLeft: 8, width: '70%'}} placeholder="Détail, ex: bouchon, travaux..." />
        </label>
      </div>
      <button type="submit" style={{marginTop: 8, background: '#1976d2', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4}}>
        Envoyer
      </button>
    </form>
  );
}
