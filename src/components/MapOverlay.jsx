import { useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapOverlay() {
  const [viewState, setViewState] = useState({
    longitude: -95.3698, // Default to e.g., Houston or generic
    latitude: 29.7604,
    zoom: 12,
    pitch: 45 // Slight tilt for 3D feel
  });

  if (!MAPBOX_TOKEN) {
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#1a1a1a', color: '#666'
      }}>
        <p>Please enter VITE_MAPBOX_TOKEN in .env</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
