import React, { useState } from 'react';
import './StackedTab.css'; // Keep this for navigation-specific styling
import Stats from './tabs/stats';
import Graph from './tabs/graphs';

function StackedTab() {
  const [activeTab, setActiveTab] = useState('stats'); // Default tab is 'stats'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return <Stats />;  // Render Stats component when 'stats' tab is active
      case 'graph':
        return <Graph />;  // Render Graph component when 'graph' tab is active
      default:
        return null;  // Return nothing if no valid tab is active
    }
  };

  return (
    <div className="StackedApp">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}  // Apply 'active' class based on the activeTab
          onClick={() => setActiveTab('stats')}  // Set activeTab to 'stats'
        >
          Stats
        </button>
        <button
          className={`tab-button ${activeTab === 'graph' ? 'active' : ''}`}  // Apply 'active' class based on the activeTab
          onClick={() => setActiveTab('graph')}  // Set activeTab to 'graph'
        >
          Graph
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default StackedTab;
