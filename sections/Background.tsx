import React, { useState } from 'react';
import './Background.css';

const Background: React.FC = () => {
  const [theme, setTheme] = useState<'white' | 'black' | 'lightblack' | 'cyan'>('white');

  const themes = [
    { id: 'white', color: '#fff', class: 'white' },
    { id: 'black', color: '#151515', class: 'black' },
    { id: 'lightblack', color: '#353535', class: 'lightblack' },
    { id: 'cyan', color: '#b2ebf2', class: 'cyan' },
  ];

  return (
    <div className="bg-wrapper" style={{ backgroundColor: themes.find(t => t.id === theme)?.color }}>
      <section className="clouds">
        <div className={`animation ${theme}`}>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
        </div>

        <div className="container">
          <h2>Cloudy Skies</h2>
          <div className="divider"></div>
          <p>An atmospheric parallax background effect with dynamic theme switching.</p>
          <button className="btn">Get Started</button>
        </div>
      </section>

      {/* Theme Selection Buttons */}
      <div className="options">
        {themes.map((t, index) => (
          <button
            key={t.id}
            className={`opt opt${index + 1}`}
            onClick={() => setTheme(t.id as any)}
            aria-label={`Switch to ${t.id} theme`}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;