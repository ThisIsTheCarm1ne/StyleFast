"use client"
import { useGlobalContext } from "../context/store";

const BorderPickerPopup = ({ onClose }: any) => {
  const { border, setBorder } = useGlobalContext();

  const handleSliderChange = (property: string, value: number) => {
    setBorder((prevBorder) => ({
      ...prevBorder,
      [property]: value,
    }));
  };

  const handleBorderStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBorder((prevBorder) => ({
      ...prevBorder,
      style: e.target.value,
    }));
  };

  return (
    <div className="border-2 rounded border-black flex flex-col">
      <button onClick={onClose}>Back</button>
     <label>
        Width:
        <input
          type="range"
          min={0}
          max={10}
          value={border.width}
          onChange={(e) => handleSliderChange('width', Number(e.target.value))}
        />
        {border.width}
      </label>

      <label>
        Radius:
        <input
          type="range"
          min={0}
          max={10}
          value={border.radius}
          onChange={(e) => handleSliderChange('radius', Number(e.target.value))}
        />
        {border.radius}
      </label>

      <label>
        Style:
        <select value={border.style} onChange={handleBorderStyleChange}>
          <option value="dotted">Dotted</option>
          <option value="dashed">Dashed</option>
          <option value="solid">Solid</option>
          <option value="double">Double</option>
          <option value="groove">Groove</option>
          <option value="ridge">Ridge</option>
          <option value="inset">Inset</option>
          <option value="outset">Outset</option>
          <option value="none">None</option>
          <option value="hidden">Hidden</option>
        </select>
      </label>
    </div>
  );
};

export default BorderPickerPopup;
