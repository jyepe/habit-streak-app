import React, { useState } from "react";
import styles from "./Groups.module.css";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Button, Box, LinearProgress, Chip, Grid } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const mockGroups = [
  {
    id: 1,
    name: "Morning Runners",
    leader: "Sarah Johnson",
    members: 12,
    focus: "Running",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    habits: [
      { id: 1, name: "Morning Run", completed: false, streak: 5, longestStreak: 15 },
      { id: 2, name: "Stretching", completed: true, streak: 8, longestStreak: 12 },
      { id: 3, name: "Hydration", completed: false, streak: 3, longestStreak: 8 }
    ]
  },
  {
    id: 2,
    name: "Book Lovers",
    leader: "Michael Brown",
    members: 8,
    focus: "Reading",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    habits: [
      { id: 4, name: "Read 30 minutes", completed: true, streak: 12, longestStreak: 25 },
      { id: 5, name: "Book Review", completed: false, streak: 2, longestStreak: 5 }
    ]
  },
  {
    id: 3,
    name: "Fitness Enthusiasts",
    leader: "Emily Davis",
    members: 15,
    focus: "Fitness",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
    habits: [
      { id: 6, name: "Workout Session", completed: true, streak: 18, longestStreak: 30 },
      { id: 7, name: "Protein Intake", completed: true, streak: 7, longestStreak: 14 },
      { id: 8, name: "Sleep 8 hours", completed: false, streak: 4, longestStreak: 10 }
    ]
  },
  {
    id: 4,
    name: "Mindful Meditation",
    leader: "Jessica Lee",
    members: 10,
    focus: "Meditation",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    habits: [
      { id: 9, name: "Morning Meditation", completed: true, streak: 22, longestStreak: 22 },
      { id: 10, name: "Evening Reflection", completed: false, streak: 6, longestStreak: 18 }
    ]
  },
  {
    id: 5,
    name: "Healthy Cooking",
    leader: "Daniel Wilson",
    members: 9,
    focus: "Cooking",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    habits: [
      { id: 11, name: "Cook Dinner", completed: false, streak: 3, longestStreak: 9 },
      { id: 12, name: "Meal Prep", completed: true, streak: 5, longestStreak: 12 }
    ]
  }
];

const Groups: React.FC = () => {
  const navigate = useNavigate();
  const [groupsState, setGroupsState] = useState(mockGroups);

  const handleHabitToggle = (groupId: number, habitId: number) => {
    setGroupsState(prev => 
      prev.map(group => 
        group.id === groupId 
          ? {
              ...group,
              habits: group.habits.map(habit => 
                habit.id === habitId 
                  ? { ...habit, completed: !habit.completed }
                  : habit
              )
            }
          : group
      )
    );
  };

  const getGroupProgress = (group: typeof groupsState[0]) => {
    const completedHabits = group.habits.filter(habit => habit.completed).length;
    const totalHabits = group.habits.length;
    return { completedHabits, totalHabits, percentage: Math.round((completedHabits / totalHabits) * 100) };
  };

  return (
    <Box className={styles.pageWrapper}>
      <Box className={styles.headerRow}>
        <Typography variant="h4" fontWeight={700} color="primary">Your Habit Groups</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/groups/create")}
          sx={{
            background: 'linear-gradient(90deg, var(--color-primary) 60%, var(--color-primary-light) 100%)',
            borderRadius: '6px',
            px: 3,
            py: 1,
            fontWeight: 600
          }}
        >
          + Create Group
        </Button>
      </Box>
      
      <Typography variant="body1" color="text.secondary" mb={4}>
        Join a group with friends or create your own to start building streaks together!
      </Typography>

      <Grid container spacing={4}>
        {groupsState.map((group) => {
          const progress = getGroupProgress(group);
          return (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={group.id}>
              <Card className={styles.groupCard}>
                <CardContent>
                  {/* Group Header */}
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar src={group.avatar} sx={{ width: 48, height: 48 }} />
                    <Box flex={1}>
                      <Typography variant="h6" fontWeight={700}>{group.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Led by {group.leader} • {group.members} members
                      </Typography>
                    </Box>
                  </Box>

                  {/* Group Progress Overview */}
                  <Box mb={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" color="text.secondary">Today's Progress</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {progress.completedHabits}/{progress.totalHabits} completed
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress.percentage} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4, 
                        background: '#f5f5f5',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #4caf50, #66bb6a)',
                          borderRadius: 4
                        }
                      }} 
                    />
                  </Box>

                  {/* Individual Habits */}
                  <Box mb={3}>
                    <Typography variant="subtitle2" fontWeight={600} mb={2} color="primary">
                      Group Habits
                    </Typography>
                    {group.habits.map((habit) => (
                      <Box 
                        key={habit.id} 
                        display="flex" 
                        alignItems="center" 
                        gap={2} 
                        mb={1.5}
                        sx={{ 
                          p: 1.5, 
                          borderRadius: 2, 
                          bgcolor: habit.completed ? '#f0f8f0' : 'transparent',
                          border: habit.completed ? '1px solid #e8f5e8' : '1px solid transparent'
                        }}
                      >
                        <Box flex={1}>
                          <Typography variant="body2" fontWeight={500}>
                            {habit.name}
                          </Typography>
                          <Box display="flex" gap={2} mt={0.5}>
                            <Chip 
                              size="small" 
                              label={`${habit.streak} day streak`}
                              variant="outlined"
                              color="primary"
                            />
                            <Chip 
                              size="small" 
                              label={`Best: ${habit.longestStreak}`}
                              variant="outlined"
                              color="secondary"
                            />
                          </Box>
                        </Box>
                        <Button
                          variant={habit.completed ? "contained" : "outlined"}
                          size="small"
                          onClick={() => handleHabitToggle(group.id, habit.id)}
                          sx={{
                            minWidth: 'auto',
                            px: 2,
                            py: 0.5,
                            bgcolor: habit.completed ? '#4caf50' : 'transparent',
                            color: habit.completed ? 'white' : '#4caf50',
                            borderColor: '#4caf50',
                            '&:hover': {
                              bgcolor: habit.completed ? '#45a049' : '#f0f8f0',
                            }
                          }}
                        >
                          {habit.completed ? '✓' : 'Mark Done'}
                        </Button>
                      </Box>
                    ))}
                  </Box>

                  {/* Group Actions */}
                  <Box display="flex" gap={1}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<GroupIcon />}
                      sx={{ flex: 1 }}
                    >
                      View Group
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<TrendingUpIcon />}
                      sx={{ flex: 1 }}
                    >
                      Analytics
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Groups; 