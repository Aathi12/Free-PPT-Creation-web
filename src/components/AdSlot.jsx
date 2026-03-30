import React from 'react';
import './AdSlot.css';

const AdSlot = ({ width, height, slotId }) => {
  return (
    <div 
      className="ad-slot-container" 
      style={{ width: width || '100%', height: height || '90px' }}
      title={`Ad Slot: ${slotId}`}
    >
      <div className="ad-slot-content">
        <span className="ad-label">Advertisement</span>
        <span className="ad-dimensions">{width || 'Responsive'} x {height || '90px'}</span>
      </div>
    </div>
  );
};

export default AdSlot;
