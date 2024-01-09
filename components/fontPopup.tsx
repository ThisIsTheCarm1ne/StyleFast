"use client"
import { useState, useEffect } from 'react';
import { useGlobalContext } from "@/context/store";

const FontPickerPopup = ({ onClose }: any) => {
  const { fonts, setFonts } = useGlobalContext();
  const [fontList, setFontList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedFont, setExpandedFont] = useState<string>();

  const toggleExpansion = (font: string) => {
    setExpandedFont((prevExpandedFont: string) => (prevExpandedFont === font ? null : font));
  };

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
      <ul className='max-h-96 overflow-y-auto flex flex-col gap-1'>
        {filteredFonts.length ?
          filteredFonts.map(font => (
            <li key={font} className='flex flex-col'>
              <button
                onClick={() => toggleExpansion(font)}
                className='tracking-wider text-xl'
              >
                {font}
              </button>
              {expandedFont === font && (
                <div className='flex flex-col'>
                  <button
                    onClick={() => handleFontSelection(font, 'header')}
                    className='uppercase border-b border-1 border-grey-200'
                  >
                    Headers
                  </button>
                  <button
                    onClick={() => handleFontSelection(font, 'paragraph')}
                    className='lowercase'
                  >
                    Paragraphs
                  </button>
                </div>
              )}
            </li>
          ))
        : <p>Loading...</p>}
      </ul>
    </div>
  );
};

export default FontPickerPopup;
