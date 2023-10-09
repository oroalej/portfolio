import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";

export enum THEMES {
  DARK = 'dark',
  LIGHT = 'light'
}

interface ThemeProviderInterface {
  children: ReactNode,
  initialTheme?: THEMES | undefined
}

type useDarkMode = {
  theme: THEMES,
  setTheme: (theme: THEMES) => void
};

const INITIAL_STATE = {
  theme: THEMES.LIGHT,
  setTheme: () => {
  }
}

const ThemeContext = createContext<useDarkMode>(INITIAL_STATE);

const useDarkMode = (initialTheme: THEMES = THEMES.LIGHT): useDarkMode => {
  const [theme, setTheme] = useState(() => {
    if ('theme' in localStorage) {
      const storedTheme = localStorage.getItem("theme") as THEMES;

      if (storedTheme !== null) {
        return storedTheme;
      }

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEMES.DARK
      }
    }

    return THEMES.LIGHT;
  });

  const DOMSetTheme = (theme: THEMES) => {
    const documentRoot = window.document.documentElement;

    documentRoot.classList.remove(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
    documentRoot.classList.add(theme);

    localStorage.setItem('theme', theme)
  }

  if (initialTheme) {
    DOMSetTheme(initialTheme)
  }

  useEffect(() => {
    console.log(theme)
    DOMSetTheme(theme)
  }, [theme])

  return {
    theme,
    setTheme
  }
}

const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider: FC<ThemeProviderInterface> = (props: ThemeProviderInterface) => {
  const {children, initialTheme = THEMES.LIGHT} = props;
  const {theme, setTheme} = useDarkMode(initialTheme);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export {
  useThemeContext,
  ThemeProvider
}


export default ThemeProvider;
