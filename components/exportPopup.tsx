"use client"
import { useRef, RefObject } from "react";
import { useGlobalContext } from "@/context/store";

const ExportPopup = ({ onClose }: any) => {
  const {colors, shadow, border, fonts} = useGlobalContext();

  const colorsRef: RefObject<HTMLPreElement> = useRef(null);
  const shadowsRef: RefObject<HTMLPreElement> = useRef(null);
  const fontsRef: RefObject<HTMLPreElement> = useRef(null);
  const borderRef: RefObject<HTMLPreElement> = useRef(null);

  const copyToClipboard = (ref: RefObject<HTMLPreElement>) => {
    const textToCopy = ref.current?.innerText;
    if (textToCopy) {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="border-2 rounded border-black flex flex-col bg-white">
      <button onClick={onClose}>Back</button>
      <pre ref={colorsRef}>
        <code>:root &#123;</code>
        <code>--fontColor: {colors.font};</code>
        <code>--backgroundColor: {colors.background};</code>
        <code>--primaryColor: {colors.primary};</code>
        <code>--secondaryColor: {colors.secondary};</code>
        <code>--accentColor: {colors.accent};</code>
        <code>&#125;</code>
      </pre>
      <button onClick={() => copyToClipboard(colorsRef)}>
        Copy to Clipboard
      </button>
      <pre ref={fontsRef}>
        <code>h1, h2, h3, h4, h5, h6 &#123;</code>
        <code>  font-family: {fonts.header};</code>
        <code>&#125;</code>
        <code>body &#123;</code>
        <code>  font-family: {fonts.paragraph};</code>
        <code>&#125;</code>
      </pre>
      <button onClick={() => copyToClipboard(fontsRef)}>
        Copy to Clipboard
      </button>
      <pre ref={shadowsRef}>
        <code>.your_element &#123;</code>
        <code>  box-shadow: {shadow.x}px {shadow.y}px {shadow.blur}px {shadow.spread}px var(--accentColor) {shadow.inset};</code>
        <code>&#125;</code>
      </pre>
      <button onClick={() => copyToClipboard(shadowsRef)}>
        Copy to Clipboard
      </button>
      <pre ref={borderRef}>
        <code>.your_element &#123;</code>
        <code>  border: {border.width}px {border.style} var(--accentColor);</code>
        {border.radius ? 
          (<code>  border-radius: {border.radius}px;</code>)
          : (null)
        }
        <code>&#125;</code>
      </pre>
      <button onClick={() => copyToClipboard(borderRef)}>
        Copy to Clipboard
      </button>
    </div>
  );
};

export default ExportPopup;
