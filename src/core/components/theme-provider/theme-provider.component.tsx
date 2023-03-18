import React, { createContext, useEffect, useState } from 'react';

const LocalStorageThemeKey = 'userTheme';

export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeProviderProps = {
  theme?: Themes;
  children: JSX.Element[] | JSX.Element;
};

type ThemeContextType = {
  theme: Themes;
  changeTheme: (theme: Themes) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Themes.DARK,
  changeTheme: (theme: Themes) => theme,
});

export function ThemeProvider({ theme = Themes.LIGHT, children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Themes>(
    () => (localStorage.getItem(LocalStorageThemeKey) as Themes) || theme,
  );

  function handlerChangeTheme(theme: Themes) {
    setCurrentTheme(theme);
    localStorage.setItem(LocalStorageThemeKey, theme);
  }

  useEffect(() => {
    switch (currentTheme) {
      case Themes.LIGHT:
        document.body.classList.remove('dark');
        break;
      case Themes.DARK:
      default:
        document.body.classList.add('dark');
        break;
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme: handlerChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
