'use client'

import { useState, useEffect } from 'react';

export default function FontSizeSlider() {
  const [fontSize, setFontSize] = useState<number>(() => {
    // Retrieve the font size from local storage or use the default value
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? parseFloat(savedFontSize) : 16;
  });

  useEffect(() => {
    // Apply the font size to all enlargeable elements when the component mounts
    const enlargeables: NodeList = document.querySelectorAll(".enlargeable");
    enlargeables.forEach((element) => {
      const el = element as HTMLElement;
      el.style.fontSize = `${fontSize}px`;
      el.style.lineHeight = `${fontSize * 1.5}px`;
    });
  }, [fontSize]);

  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFontSize = parseFloat(event.target.value);
    setFontSize(newFontSize);

    // Save the new font size to local storage
    localStorage.setItem('fontSize', newFontSize.toString());

    const enlargeables: NodeList = document.querySelectorAll(".enlargeable");
    enlargeables.forEach((element) => {
      const el = element as HTMLElement;
      el.style.fontSize = `${newFontSize}px`;

      // Adjust line height proportionally
      el.style.lineHeight = `${newFontSize * 1.5}px`;
    });
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <label htmlFor="fontSizeSlider">Adjust Font Size:</label>
      <input
        id="fontSizeSlider"
        type="range"
        min="10"
        max="38"
        value={fontSize}
        onChange={handleSliderChange}
        style={{ marginLeft: '10px' }}
      />
      <span style={{ marginLeft: '10px' }}>{fontSize}px</span>
    </div>
  );
}