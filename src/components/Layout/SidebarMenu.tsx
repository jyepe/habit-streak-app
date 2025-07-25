import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PeopleIcon from '@mui/icons-material/People';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styles from './SidebarMenu.module.css';

const menuItems = [
  { to: '/', icon: <HomeIcon />, label: 'Home' },
  { to: '/groups', icon: <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className={styles.userImg} />, label: 'My Habit Groups' },
  { to: '/progress', icon: <ShowChartIcon />, label: 'Progress' },
  { to: '/friends', icon: <PeopleIcon />, label: 'Friends' },
  { to: '/feed', icon: <RssFeedIcon />, label: 'Feed' },
  { to: '/ideas', icon: <EmojiObjectsIcon />, label: 'Habit Ideas' },
  { to: '/reminders', icon: <CheckCircleIcon />, label: 'Reminders' },
  { to: '/achievements', icon: <EmojiEventsIcon />, label: 'Achievements' },
  { to: '/help', icon: <HelpOutlineIcon />, label: 'Help & Support' },
];

const SidebarMenu: React.FC = () => {
  const location = useLocation();
  return (
    <nav className={styles.menu}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.to} className={location.pathname === item.to ? styles.active : ''}>
            <Link to={item.to} className={styles.menuLink}>
              {item.icon}<span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu; 