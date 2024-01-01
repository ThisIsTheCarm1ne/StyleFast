"use client"
import { useGlobalContext } from "@/context/store";

const ShadowPickerPopup = ({ onClose }: any) => {
  const { shadow, setShadow } = useGlobalContext();

  const handleSliderChange = (property: string, value: number) => {
    setShadow((prevShadow) => ({
      ...prevShadow,
      [property]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShadow((prevShadow) => ({
      ...prevShadow,
      inset: e.target.checked,
    }));
  };

  return (
    <div className="border-2 rounded border-black flex flex-col">
      <button onClick={onClose}>Back</button>
     <label>
        X:
        <input
          type="range"
          min={-10}
          max={10}
          value={shadow.x}
          onChange={(e) => handleSliderChange('x', Number(e.target.value))}
        />
        {shadow.x}
      </label>

      <label>
        Y:
        <input
          type="range"
          min={-10}
          max={10}
          value={shadow.y}
          onChange={(e) => handleSliderChange('y', Number(e.target.value))}
        />
        {shadow.y}
      </label>

      <label>
        Blur:
        <input
          type="range"
          min={0}
          max={20}
          value={shadow.blur}
          onChange={(e) => handleSliderChange('blur', Number(e.target.value))}
        />
        {shadow.blur}
      </label>

      <label>
        Spread:
        <input
          type="range"
          min={0}
          max={20}
          value={shadow.spread}
          onChange={(e) => handleSliderChange('spread', Number(e.target.value))}
        />
        {shadow.spread}
      </label>

      <label>
        Inset:
        <input
          type="checkbox"
          checked={shadow.inset}
          onChange={handleCheckboxChange}
        />
      </label>     
    </div>
  );
};

export default ShadowPickerPopup;
