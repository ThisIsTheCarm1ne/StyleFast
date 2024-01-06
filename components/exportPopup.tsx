"use client"
import { useState, useEffect } from 'react';
import { useGlobalContext } from "@/context/store";

const FontPickerPopup = ({ onClose }: any) => {
  const { fonts, setFonts } = useGlobalContext();
  const [fontList, setFontList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Fetch the list of available Google Fonts
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_KEY}`)
      .then(response => response.json())
      .then(data => {
        const availableFonts = data.items.map((item: any) => item.family);
        setFontList(availableFonts);
      })
      .catch(error => console.error('Error fetching fonts:', error));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFonts = fontList.filter(font =>
    font.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFontSelection = (selectedFont: string, type: any) => {
    // Handle the font selection logic and update the state
    const updatedFonts = { ...fonts, [type]: selectedFont };
    setFonts(updatedFonts);
  };
  return (
    <div className="border-2 rounded border-black flex flex-col">
      <button onClick={onClose}>Back</button>
      <input
        type="text"
        placeholder="Search Fonts"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className='max-h-96 overflow-y-auto'>
        {filteredFonts.length ?
          filteredFonts.map(font => (
            <li key={font} className='flex flex-col'>
              <p>{font}</p>
              <button onClick={() => handleFontSelection(font, 'header')}>Set Header</button>
              <button onClick={() => handleFontSelection(font, 'paragraph')}>Set Paragraph</button>
            </li>
          ))
        : <p>Loading...</p>}
      </ul>
    </div>
  );
};

export default FontPickerPopup;
