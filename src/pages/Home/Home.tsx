import React from "react";
import styles from "./Home.module.css";
import { Card, CardContent, Typography, Avatar, Button, Grid, Box, LinearProgress } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlagIcon from '@mui/icons-material/Flag';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const weekData = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 3 },
  { day: 'Sun', hours: 3 },
];

const habits = [
  { id: 1, name: 'Staying Hydrated', group: 'Habit Group', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', completed: false },
  { id: 2, name: 'Walking Challenge', group: 'Reading', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', completed: true },
  { id: 3, name: 'Walking 10,000 Steps', group: 'Habit Group', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', last: '5 days ago', completed: false },
];



const lastMonth = [
  { label: 'Habit tracking', value: 15 },
  { label: 'Days completed', value: 10 },
  { label: 'New habits', value: 30 },
];

const Home: React.FC = () => {
  const [habitsState, setHabitsState] = React.useState(habits);

  const handleHabitToggle = (habitId: number) => {
    setHabitsState(prev => 
      prev.map(habit => 
        habit.id === habitId 
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const completedCount = habitsState.filter(habit => habit.completed).length;
  const totalHabits = habitsState.length;

  const progressStats = [
    { icon: <ShowChartIcon />, label: 'Time spent', value: '25 hours' },
    { icon: <AccessTimeIcon />, label: 'Average/day', value: '3.5 hours' },
    { icon: <CheckCircleIcon />, label: 'completed habits', value: `${completedCount}/${totalHabits} habits` },
  ];

  return (
  <Box className={styles.dashboardWrapper}>
    <Grid container spacing={4}>
      {/* This Week + Bar Chart */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography color="primary" variant="h5" fontWeight={700} mb={2}>This Week</Typography>
        <Card className={styles.card}>
          <CardContent>
            <Typography fontSize={14} color="text.secondary" mb={1}>progress logged</Typography>
            <Typography variant="h4" fontWeight={700} mb={2}>25 hours</Typography>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={weekData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="hours" fill="#b39ddb" radius={[8, 8, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Box display="flex" gap={3} mt={3}>
          <Card className={styles.summaryCard}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}><FlagIcon fontSize="small" /><Typography fontSize={14}>Goal</Typography></Box>
              <Typography fontWeight={700}>3/7 days</Typography>
            </CardContent>
          </Card>
          <Card className={styles.summaryCard}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}><EmojiEventsIcon fontSize="small" /><Typography fontSize={14}>Streak</Typography></Box>
              <Typography fontWeight={700}>50 days</Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      {/* My Habits */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography color="primary" variant="h5" fontWeight={700} mb={2}>Todays Habits</Typography>
        <Card className={styles.card}>
          <CardContent>
            {habitsState.map((h, i) => (
              <Box key={h.id} display="flex" alignItems="center" gap={2} mb={i < habitsState.length - 1 ? 1 : 0}>
                <Avatar src={h.avatar} sx={{ width: 36, height: 36 }} />
                <Box flex={1}>
                  <Typography fontWeight={500}>{h.name}</Typography>
                  <Typography fontSize={13} color="text.secondary">{h.group}{h.last ? ` • ${h.last}` : ''}</Typography>
                </Box>
                <Button
                  variant={h.completed ? "contained" : "outlined"}
                  size="small"
                  onClick={() => handleHabitToggle(h.id)}
                  sx={{
                    minWidth: 'auto',
                    px: 2,
                    py: 0.5,
                    bgcolor: h.completed ? '#4caf50' : 'transparent',
                    color: h.completed ? 'white' : '#4caf50',
                    borderColor: '#4caf50',
                    '&:hover': {
                      bgcolor: h.completed ? '#45a049' : '#f0f8f0',
                    }
                  }}
                >
                  {h.completed ? '✓' : 'Mark Done'}
                </Button>
              </Box>
            ))}
            <Button variant="outlined" sx={{ mt: 2, width: '100%' }}>View all habits</Button>
          </CardContent>
        </Card>
      </Grid>

      {/* My Progress */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Typography color="primary" variant="h5" fontWeight={700} mb={2}>My Progress</Typography>
        <Box display="flex" gap={2}>
          {progressStats.map((stat) => (
            <Card key={stat.label} className={styles.progressCard}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                  <Avatar sx={{ bgcolor: '#f3e5f5', color: '#7c4dff', width: 36, height: 36 }}>{stat.icon}</Avatar>
                </Box>
                <Typography fontWeight={700} fontSize={18}>{stat.value}</Typography>
                <Typography color="text.secondary" fontSize={14}>{stat.label}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Grid>

      {/* Last Month Comparison */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography color="primary" variant="h5" fontWeight={700} mb={2}>Last Month Comparison</Typography>
        <Card className={styles.card}>
          <CardContent>
            {lastMonth.map((item) => (
              <Box key={item.label} mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={15}>{item.label}</Typography>
                  <Typography fontSize={15} fontWeight={700}>{item.value}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={item.value} sx={{ height: 10, borderRadius: 5, background: '#f5f5f5', mt: 1 }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
  );
};

export default Home; 