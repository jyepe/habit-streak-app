import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import SidebarMenu from './SidebarMenu';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return localStorage.getItem('sidebarOpen') !== 'false';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', sidebarOpen.toString());
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <header className={styles.appBar}>
        <button 
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label="toggle sidebar"
        >
          <MenuIcon style={{ color: '#fff' }} />
        </button>
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
      <aside className={`${styles.drawer} ${sidebarOpen ? styles.drawerOpen : styles.drawerClosed}`}>
        <div className={styles.drawerHeader}>
          <button 
            className={styles.closeButton}
            onClick={toggleSidebar}
            aria-label="close sidebar"
          >
            <ChevronLeftIcon style={{ color: 'var(--color-text-main)' }} />
          </button>
        </div>
        <SidebarMenu />
      </aside>
      <main className={`${styles.main} ${sidebarOpen ? styles.mainWithSidebar : styles.mainWithoutSidebar}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 