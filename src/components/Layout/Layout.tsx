import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import SidebarMenu from './SidebarMenu';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className={styles.container}>
      <header className={styles.appBar}>
        <span className={styles.logo}>Habit Streak</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <LightModeIcon style={{ color: darkMode ? '#bbb' : '#fff' }} />
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
            color="default"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
          <DarkModeIcon style={{ color: darkMode ? '#fff' : '#bbb' }} />
        </div>
      </header>
      <aside className={styles.drawer}>
        <SidebarMenu />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout; 