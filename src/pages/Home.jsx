import { useState } from 'react';
import MapOverlay from '../components/MapOverlay';
import BottomNav from '../components/BottomNav';
import JobBottomSheet from '../components/JobBottomSheet';

export default function Home() {
  const [activeTab, setActiveTab] = useState('map');
  
  // Dummy data representing the deterministic output from solver
  const activeJob = {
    address: '1234 Elm Street',
    eta: '2:15 PM',
    notes: 'Gate code 4321. Dog in backyard.',
  };

  return (
    <div className="app-container">
      {/* Map layer is always rendered underneath */}
      <MapOverlay />
      
      {/* Conditionally render bottom sheet only on the map tab */}
      {activeTab === 'map' && activeJob && (
         <JobBottomSheet job={activeJob} />
      )}

      {/* Floating Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
