'use client'

import { useState, useEffect } from 'react';

export default function FontSizeSlider() {
  const [fontSize, setFontSize] = useState<number>(1); // Default value in em

  useEffect(() => {
    // Retrieve the font size from local storage after the component mounts
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseFloat(savedFontSize));
    }
  }, []);

  useEffect(() => {
    // Apply the font size to all enlargeable elements when the font size changes
    const enlargeables: NodeList = document.querySelectorAll(".enlargeable");
    enlargeables.forEach((element) => {
      const el = element as HTMLElement;
      el.style.fontSize = `${fontSize}em`;
    });
  }, [fontSize]);

  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFontSize = parseFloat(event.target.value);
    setFontSize(newFontSize);

    // Save the new font size to local storage
    localStorage.setItem('fontSize', newFontSize.toString());
  }

  return (
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2" style={{ marginTop: '10px', marginBottom: '10px' }}>
      <label className='enlargeable' htmlFor="fontSizeSlider"></label>
      <br></br>
      <input
        id="fontSizeSlider"
        type="range"
        min="1"
        max="2"
        step="0.1"
        value={fontSize}
        onChange={handleSliderChange}
        style={{ marginLeft: '10px' }}
      />
      {/* <span className='enlargeable' style={{ marginLeft: '10px' }}>{fontSize}em</span> */}
    </div>
  );
}