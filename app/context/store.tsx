"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

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

interface ContextProps {
  colors: Colors,
  setColors: Dispatch<SetStateAction<Colors>>,
  font: string,
  setFont: Dispatch<SetStateAction<string>>,
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
    primary: '#ffffff',
    secondary: '#ffffff',
    accent: '#0bf0ff'
  },
  setColors: () => {},
  font: 'Inter',
  setFont: (): string => '',
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
  const [colors, setColors] = useState<Colors>({
    font: '#000000',
    background: '#ffffff',
    primary: '#ffffff',
    secondary: '#ffffff',
    accent: '#0bf0ff',
  });
  const [shadow, setShadow] = useState<Shadows>({
    x: 0,
    y: 0,
    blur: 0,
    spread: 0,
    inset: false
  })
  const [border, setBorder] = useState<Borders>({
    width: 0,
    style: "none",
    radius: 0
  })
  return (
    <GlobalContext.Provider value={{ colors, setColors, shadow, setShadow, border, setBorder }}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
