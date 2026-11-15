import React from 'react';
import '../styles/GridOverlay.css';

export default function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden="true">
      {/* Vertical architectural lines */}
      <div className="grid-line-v line-v-1" />
      <div className="grid-line-v line-v-2" />
      <div className="grid-line-v line-v-3" />

      {/* Horizontal architectural lines */}
      <div className="grid-line-h line-h-1" />
      <div className="grid-line-h line-h-2" />

      {/* Intersection crosshairs (+) */}
      <span className="crosshair ch-1-1">+</span>
      <span className="crosshair ch-1-2">+</span>
      <span className="crosshair ch-1-3">+</span>

      <span className="crosshair ch-2-1">+</span>
      <span className="crosshair ch-2-2">+</span>
      <span className="crosshair ch-2-3">+</span>
    </div>
  );
}
