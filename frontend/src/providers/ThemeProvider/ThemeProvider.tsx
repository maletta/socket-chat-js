import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as ThemeProviderStyledComponent } from 'styled-components/macro';
import { ITheme } from '../../types/theme-types';

type IThemeProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ITheme>({} as ITheme);

const ThemeContextProvider = ({ children }: IThemeProps) => {
  const [theme] = useState<ITheme>({
    palette: {
      commom: {
        black: '#020202',
        white: '#fff',
      },
      primary: {
        main: '#7F5A83',
        dark: '#6F4973',
        light: '#BF9AC3', // #A188A6 #9DA2AB
      },
      secondary: {
        main: '#5A7F5C',
        dark: '#4A6F6F',
        light: '#7A9F9F',
      },
      tertiary: {
        main: '#05141C',
        dark: '#040E12',
        light: '#172C38',
      },
      black: {
        main: '#1e1e1e',
        dark: '#111111',
        light: '#4d4d4d',
      },
      gray: {
        main: '#ececec',
        dark: '#e1e1e1',
        light: '#f6f6f6',
      },
    },
  });

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProviderStyledComponent theme={theme}>{children}</ThemeProviderStyledComponent>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContextProvider;
