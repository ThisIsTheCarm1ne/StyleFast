"use client"
import { useState, useEffect, ReactElement } from "react";
import { Inter, Tangerine } from 'next/font/google'

import { useGlobalContext } from "@/context/store";

import ColorPickerPopup from "@/components/colorPickerPopup";
import FontPickerPopup from "@/components/fontPopup";
import ShadowPickerPopup from "@/components/shadowPopup";
import BorderPickerPopup from "@/components/borderPopup";

import ComponentsShowcase from "@/components/components-showcase";
import DashboardShowcase from "@/components/dashboard-example";
import BlogExample from "@/components/blog-example";

const tangerine = Tangerine({
  subsets: ['latin'],
  weight: '400'
})

const inter = Inter({
  subsets: ['latin'],
  weight: '400'
})

export default function Home() {
  // Hovers
  const [hoverColor, setHoverColor] = useState<boolean>(false);
  const [hoverFont, setHoverFont] = useState<boolean>(false);
  const [hoverShadow, setHoverShadow] = useState<boolean>(false);
  const [hoverBorder, setHoverBorder] = useState<boolean>(false);
  const [hoverHover, setHoverHover] = useState<boolean>(false);

  // Showcases carousel
  const [activeComponent, setActiveComponent] = useState<string>('ComponentsShowcase');

  const changeComponent = (componentName: string) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = (): ReactElement | null => {
    switch (activeComponent) {
      case 'ComponentsShowcase':
        return <ComponentsShowcase />;
      case 'DashboardShowcase':
        return <DashboardShowcase />;
      case 'BlogExample':
        return <BlogExample />;
      default:
        return null;
    }
  };

  //Popups
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleButtonClick = (popupType: string) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const {colors, shadow, border, fonts} = useGlobalContext();

  const dynamicStyle = {
    boxShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${colors.accent} ${shadow.inset ? 'inset ' : ''}`,
    border: `${border.width}px ${border.style} ${colors.accent}`,
    ...(border.radius > 0 && { borderRadius: `${border.radius}px` }),
  }

  // Font selector
  useEffect(() => {
    // Load the selected header font from Google Fonts
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css?family=${encodeURIComponent(fonts.header)}`;
    link.rel = 'stylesheet';

    // Load the selected paragraph font from Google Fonts
    const paragraphLink = document.createElement('link');
    paragraphLink.href = `https://fonts.googleapis.com/css?family=${encodeURIComponent(fonts.paragraph)}`;
    paragraphLink.rel = 'stylesheet';

    // Add the link to the head of the document
    document.head.appendChild(link);
    document.head.appendChild(paragraphLink);

    // Cleanup: remove the link when the component is unmounted
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(paragraphLink);
    };
  }, [fonts.header, fonts.paragraph]);

  return (
    <main className="" style={{color: colors.font, backgroundColor: colors.background, fontFamily: fonts.paragraph}}>
      <div className="fixed right-0 top-32 mr-8 z-10 w-32 min-w-min">
        {activePopup === 'color' && <ColorPickerPopup onClose={closePopup}/>}
        {activePopup === 'font' && <FontPickerPopup onClose={closePopup}/>}
        {activePopup === 'shadow' && <ShadowPickerPopup onClose={closePopup}/>}
        {activePopup === 'border' && <BorderPickerPopup onClose={closePopup}/>}
        {!activePopup && (
          <>
            <div className="flex flex-col gap-2">
              <button
                className={`border-2 border-black rounded ${hoverColor ? 'hover' : ''}  transition-colors duration-150 icon`}
                onMouseEnter={() => setHoverColor(true)} 
                onMouseLeave={() => setHoverColor(false)} 
                onClick={() => handleButtonClick('color')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-10 h-10 m-auto mt-3 mb-2 ${hoverColor ? 'icon' : ''}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z"
                    clipRule="evenodd" />
                </svg>
                <p className="text-4xl mb-2">Color</p>
              </button>
              <button
                className={`border-2 border-black rounded duration-150 ${hoverFont ? tangerine.className : inter.className}`}
                onMouseEnter={() => setHoverFont(true)} 
                onMouseLeave={() => setHoverFont(false)} 
                onClick={() => handleButtonClick('font')}
              >
                <h1 className="text-5xl font-bold m-auto mt-3 mb-1">T</h1>
                <p className="text-4xl mb-2">Fonts</p>
              </button>
              <button
                className="border-2 border-black rounded duration-150"
                onMouseEnter={() => setHoverShadow(true)} 
                onMouseLeave={() => setHoverShadow(false)} 
                onClick={() => handleButtonClick('shadow')}
              >
                <div className={`w-11 h-11 bg-black m-auto mt-3 mb-2 ${hoverShadow ? 'div_shadow' : ''}`}></div>
                <p className="text-2xl mb-2">Shadows</p>
              </button>
              <button
                className="border-2 border-black rounded hover:rounded-0  duration-150"
                onMouseEnter={() => setHoverBorder(true)} 
                onMouseLeave={() => setHoverBorder(false)} 
                onClick={() => handleButtonClick('border')}
              >
                <div className={`w-11 h-11 border-2 border-black m-auto mt-3 mb-2 ${hoverBorder ? 'div_border' : ''}`}></div>
                <p className="text-3xl mb-2">Borders</p>
              </button>
              <button
                className={`border-2 border-black rounded ${hoverHover ? 'btn_hover' : ''}`}
                onMouseEnter={() => setHoverHover(true)} 
                onMouseLeave={() => setHoverHover(false)} 
              >
                <div className={`w-11 h-11 bg-black m-auto mt-3 mb-2 ${hoverHover ? 'div_hover' : ''}`}></div>
                <p className="text-4xl mb-2">Hover</p>
              </button>
              <button className="border-2 border-black rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-10 h-10 m-auto mt-3 mb-2 hover:ring-8`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <p className="text-4xl mb-2">Export</p>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="text-center mt-40">
        <h1 className="text-7xl mb-10 font-bold" style={{fontFamily: fonts.header}}>Edit & Live Preview</h1>
        <div className="flex flex-col gap-7 items-center">
          <p
            className={`text-5xl w-min ${hoverColor ? 'hover' : ''} transition-colors duration-150`}
            onMouseEnter={() => setHoverColor(true)} 
            onMouseLeave={() => setHoverColor(false)} 
          >
            Color
          </p>
          <p
            className={`text-5xl w-min ${hoverFont ? tangerine.className : inter.className}`}
            onMouseEnter={() => setHoverFont(true)} 
            onMouseLeave={() => setHoverFont(false)} 
          >
            Fonts
          </p>
          <p
            className={`text-5xl w-min ${hoverShadow ? 'text_shadow' : ''} duration-150`}
            onMouseEnter={() => setHoverShadow(true)} 
            onMouseLeave={() => setHoverShadow(false)} 
          >
            Shadows
          </p>
          <p
            className={`text-5xl w-min ${hoverBorder ? 'text_border' : ''}`}
            onMouseEnter={() => setHoverBorder(true)} 
            onMouseLeave={() => setHoverBorder(false)} 
          >
            Borders
          </p>
          <p
            className={`text-5xl w-min ${hoverHover ? 'text_hover' : ''}`}
            onMouseEnter={() => setHoverHover(true)} 
            onMouseLeave={() => setHoverHover(false)} 
          >
            Hover
          </p>
        </div>
        <h1 className="text-7xl mt-10 font-bold" style={{fontFamily: fonts.header}}>On This Website</h1>
      </div>
      <div>
        {renderActiveComponent()}

        <div className="">
          <button
            onClick={() => changeComponent('ComponentsShowcase')}
            style={dynamicStyle}
          >
            Show Components
          </button>
          <button
            onClick={() => changeComponent('DashboardShowcase')}
            style={dynamicStyle}
          >
            Show Dashboard
          </button>
          <button
            onClick={() => changeComponent('BlogExample')}
            style={dynamicStyle}
          >
            Show Blog
          </button>
        </div>
      </div>
    </main>
  )
}
