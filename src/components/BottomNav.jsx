import { Map, ListTodo, User } from 'lucide-react';
import css from './BottomNav.module.css';

export default function BottomNav({ activeTab = 'map', onTabChange }) {
  return (
    <nav className={`glass-panel ${css.navbar}`}>
      <button 
        className={`${css.navItem} ${activeTab === 'map' ? css.active : ''}`}
        onClick={() => onTabChange('map')}
      >
        <Map size={24} />
        <span>Map</span>
      </button>
      
      <button 
        className={`${css.navItem} ${activeTab === 'list' ? css.active : ''}`}
        onClick={() => onTabChange('list')}
      >
        <ListTodo size={24} />
        <span>Route</span>
      </button>
      
      <button 
        className={`${css.navItem} ${activeTab === 'profile' ? css.active : ''}`}
        onClick={() => onTabChange('profile')}
      >
        <User size={24} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
