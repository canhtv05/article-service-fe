import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTheme() {
  const { dataStorage, setStorage } = useLocalStorage();
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    const dataTheme = dataStorage().theme;
    if (dataTheme === 'light' || dataTheme === 'dark') {
      setTheme(dataTheme);
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(dataTheme);
    }
  }, [dataStorage]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStorage({ theme: newTheme });

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
}
