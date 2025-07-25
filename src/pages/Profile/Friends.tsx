import React from "react";
import styles from "./Profile.module.css";

const friends = [
  {
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "James Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sophia Brown",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Michael Davis",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Linda Green",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Friends: React.FC = () => {
  return (
    <div className={styles.friendsPageWrapper}>
      <div className={styles.friendsGrid}>
        {friends.map(friend => (
          <div className={styles.friendCard} key={friend.name}>
            <img className={styles.avatar} src={friend.avatar} alt={friend.name} />
            <div className={styles.friendName}>{friend.name}</div>
            <div className={styles.buttonRow}>
              <button className={styles.messageBtn}>Message</button>
              <button className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends; 