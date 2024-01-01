"use client"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useGlobalContext } from "@/context/store";

const isBackgroundColorDark = (hexColor: string): boolean => {
  const cleanedHex = hexColor.replace(/^#/, '');
  const luminance =
    0.299 * parseInt(cleanedHex.substr(0, 2), 16) +
    0.587 * parseInt(cleanedHex.substr(2, 2), 16) +
    0.114 * parseInt(cleanedHex.substr(4, 2), 16);

  return luminance < 128;
};

const ColorPicker = ({ label }: any) => {
  const { colors, setColors } = useGlobalContext();
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleColorChange = (newColor: string) => {
    setColors((prevColors) => ({
      ...prevColors,
      [label]: newColor,
    }));
  };

  const handleButtonClick = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <>
      <button
        style={{ backgroundColor: colors[label], color: isBackgroundColorDark(colors[label]) ? 'white' : 'black'}}
        onClick={handleButtonClick}
      >
        {label}
      </button>
      {showPicker && (
        <HexColorPicker
          color={colors[label]}
          onChange={(newColor) => handleColorChange(newColor)}
        />
      )}
    </>
  );
};

const ColorPickerPopup = ({ onClose }: any) => {
  const { colors, setColors } = useGlobalContext();

  const [fontColorPopup, setFontColorPopup] = useState<boolean>(false);
  const [backgroundColorPopup, setBackgroundColorPopup] = useState<boolean>(false);
  const [primaryColorPopup, setPrimaryColorPopup] = useState<boolean>(false);
  const [secondaryColorPopup, setSecondaryColorPopup] = useState<boolean>(false);
  const [accentColorPopup, setAccentColorPopup] = useState<boolean>(false);

  return (
    <div className="border-2 rounded border-black flex flex-col">
      <button onClick={onClose}>Back</button>
      
      <ColorPicker color={colors.font} setColor={setFontColorPopup} label="font" />
      <ColorPicker color={colors.background} setColor={setBackgroundColorPopup} label="background" />
      <ColorPicker color={colors.primary} setColor={setPrimaryColorPopup} label="primary" />
      <ColorPicker color={colors.secondary} setColor={setSecondaryColorPopup} label="secondary" />
      <ColorPicker color={colors.accent} setColor={setAccentColorPopup} label="accent" />
    </div>
  );
};

export default ColorPickerPopup;
