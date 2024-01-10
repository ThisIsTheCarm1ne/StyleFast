"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";

type Colors = {
  font: string,
  background: string,
  primary: string,
  secondary: string,
  accent: string
}

type Shadows = {
  x: number,
  y: number,
  blur: number,
  spread: number,
  inset: boolean
}

type Borders = {
  width: number,
  style: string,
  radius: number,
}

type Fonts = {
  header: string,
  paragraph: string,
}

interface ContextProps {
  colors: Colors,
  setColors: Dispatch<SetStateAction<Colors>>,
  fonts: Fonts,
  setFonts: Dispatch<SetStateAction<Fonts>>,
  shadow: Shadows,
  setShadow: Dispatch<SetStateAction<Shadows>>,
  border: Borders,
  setBorder: Dispatch<SetStateAction<Borders>>,
  hover: string,
  setHover: Dispatch<SetStateAction<string>>,
};

const GlobalContext = createContext<ContextProps>({
  colors: {
    font: '#000000',
    background: '#ffffff',
    primary: '#0ea900',
    secondary: '#ffffff',
    accent: '#000000'
  },
  setColors: () => {},
  fonts: {
    header: 'Inter',
    paragraph: 'Inter',
  },
  setFonts: () => {},
  shadow: {
    x: 0,
    y: 0,
    blur: 0,
    spread: 0,
    inset: false
  },
  setShadow: () => {},
  border: {
    width: 0,
    style: "solid",
    radius: 0
  },
  setBorder: () => {},
  hover: '',
  setHover: (): string => ''
});

export const GlobalContextProvider = ({ children }: any) => {
  // Load saved data from localStorage on component mount
  const storedColors = localStorage.getItem('colors');
  const initialColors = storedColors
    ? JSON.parse(storedColors)
    : {
        font: '#000000',
        background: '#ffffff',
        primary: '#0ea900',
        secondary: '#ffffff',
        accent: '#000000'
      };

  const storedFonts = localStorage.getItem('fonts');
  const initialFonts = storedFonts
    ? JSON.parse(storedFonts)
    : {
        header: 'Inter',
        paragraph: 'Inter',
      };

  const storedShadow = localStorage.getItem('shadow');
  const initialShadow = storedShadow
    ? JSON.parse(storedShadow)
    : {
        x: 5,
        y: 5,
        blur: 0,
        spread: 0,
        inset: false,
      };

  const storedBorder = localStorage.getItem('border');
  const initialBorder = storedBorder
    ? JSON.parse(storedBorder)
    : {
        width: 2,
        style: 'solid',
        radius: 10,
      };

  const [colors, setColors] = useState(initialColors);
  const [fonts, setFonts] = useState(initialFonts);
  const [shadow, setShadow] = useState(initialShadow);
  const [border, setBorder] = useState(initialBorder);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    localStorage.setItem('fonts', JSON.stringify(fonts));
  }, [fonts]);

  useEffect(() => {
    localStorage.setItem('shadow', JSON.stringify(shadow));
  }, [shadow]);

  useEffect(() => {
    localStorage.setItem('border', JSON.stringify(border));
  }, [border]);

  return (
    <GlobalContext.Provider value={{
      colors, setColors,
      fonts, setFonts,
      shadow, setShadow,
      border, setBorder
    }}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
