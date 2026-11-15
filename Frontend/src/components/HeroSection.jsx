import React from 'react';
import GridOverlay from './GridOverlay';
import ShowcaseCard from './ShowcaseCard';
import LetsTalkCard from './LetsTalkCard';
import '../styles/HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-container">
      {/* Subtle architectural grid & crosshairs */}
      <GridOverlay />

      {/* Giant background watermark text */}
      <div className="hero-watermark" aria-hidden="true">
        SALLY CELESIA
      </div>

      {/* Left-aligned manifesto statement */}
      <div className="hero-tagline">
        <p>I DEVELOP USER-CENTERED DIGITAL</p>
        <p>EXPERIENCES THAT ARE SIMPLE</p>
        <p>SMART AND IMPACTFUL</p>
      </div>

      {/* Center canvas intentionally left clean / blank (no human portrait) */}
      <div className="hero-blank-center" aria-hidden="true" />

      {/* Right floating ZENTIX /Design card */}
      <ShowcaseCard />

      {/* Bottom-left copyright year & bold primary display name */}
      <div className="hero-primary-title-group">
        <span className="hero-copyright">*MERN*</span>
        <h1 className="role-title">MERN STACK WEB DEVELOPER</h1>
      </div>

      {/* Bottom-right interactive contact card */}
      <LetsTalkCard />

    </section>
  );
}
