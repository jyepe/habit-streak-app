import React from "react";
import styles from "./Progress.module.css";
import { Card, CardContent, Typography, Avatar, Grid, Box, LinearProgress, Chip } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock data - replace with real data from your backend
const streakData = [
  { day: 'Mon', streak: 5 },
  { day: 'Tue', streak: 6 },
  { day: 'Wed', streak: 7 },
  { day: 'Thu', streak: 8 },
  { day: 'Fri', streak: 9 },
  { day: 'Sat', streak: 10 },
  { day: 'Sun', streak: 11 },
];

const monthlyProgress = [
  { month: 'Jan', completed: 25, total: 31 },
  { month: 'Feb', completed: 28, total: 28 },
  { month: 'Mar', completed: 30, total: 31 },
  { month: 'Apr', completed: 29, total: 30 },
  { month: 'May', completed: 31, total: 31 },
  { month: 'Jun', completed: 30, total: 30 },
];

const habitStats = [
  { name: 'Morning Exercise', currentStreak: 15, longestStreak: 45, completion: 85 },
  { name: 'Reading', currentStreak: 8, longestStreak: 30, completion: 70 },
  { name: 'Meditation', currentStreak: 22, longestStreak: 22, completion: 95 },
  { name: 'Hydration', currentStreak: 5, longestStreak: 12, completion: 60 },
];

const Progress: React.FC = () => {
  const currentStreak = 11;
  const longestStreak = 45;
  const totalHabits = 4;
  const completedToday = 3;

  return (
    <Box className={styles.progressWrapper}>
      <Grid container spacing={4}>
        {/* Current Streak Overview */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography color="primary" variant="h5" fontWeight={700} mb={2}>Streak Overview</Typography>
          <Card className={styles.card}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={3} mb={3}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#ff6b35', 
                    color: 'white', 
                    width: 64, 
                    height: 64,
                    fontSize: '2rem'
                  }}
                >
                  <LocalFireDepartmentIcon fontSize="large" />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h3" fontWeight={700} color="#ff6b35">
                    {currentStreak} days
                  </Typography>
                  <Typography fontSize={16} color="text.secondary">
                    Current streak • {longestStreak} days longest
                  </Typography>
                </Box>
              </Box>
              
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={streakData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="streak" 
                    stroke="#ff6b35" 
                    fill="#ff6b35" 
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Streak Stats */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography color="primary" variant="h5" fontWeight={700} mb={2}>Today's Progress</Typography>
          <Card className={styles.card}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar sx={{ bgcolor: '#4caf50', color: 'white', width: 48, height: 48 }}>
                  <EmojiEventsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight={700} color="#4caf50">
                    {completedToday}/{totalHabits}
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">Habits completed</Typography>
                </Box>
              </Box>
              
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize={14}>Progress</Typography>
                  <Typography fontSize={14} fontWeight={600}>
                    {Math.round((completedToday / totalHabits) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(completedToday / totalHabits) * 100} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 6, 
                    background: '#f5f5f5',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #4caf50, #66bb6a)',
                      borderRadius: 6
                    }
                  }} 
                />
              </Box>

              <Box display="flex" gap={1}>
                <Chip 
                  icon={<TrendingUpIcon />} 
                  label={`${currentStreak} day streak`} 
                  color="primary" 
                  variant="outlined"
                />
                <Chip 
                  icon={<CalendarTodayIcon />} 
                  label="On track" 
                  color="success" 
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Progress */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography color="primary" variant="h5" fontWeight={700} mb={2}>Monthly Progress</Typography>
          <Card className={styles.card}>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyProgress}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#7c4dff" 
                    strokeWidth={3}
                    dot={{ fill: '#7c4dff', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography fontSize={14} color="text.secondary">Average completion</Typography>
                <Typography fontSize={14} fontWeight={600}>92%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Longest Streak Achievement */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography color="primary" variant="h5" fontWeight={700} mb={2}>Longest Streak</Typography>
          <Card className={styles.card}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={3} mb={3}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#ffd700', 
                    color: 'white', 
                    width: 64, 
                    height: 64,
                    fontSize: '2rem'
                  }}
                >
                  <EmojiEventsIcon fontSize="large" />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h3" fontWeight={700} color="#ffd700">
                    {longestStreak} days
                  </Typography>
                  <Typography fontSize={16} color="text.secondary">
                    Personal best streak
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">
                    Achieved on Morning Exercise habit
                  </Typography>
                </Box>
              </Box>
              
              <Box display="flex" gap={2}>
                <Chip 
                  label="🏆 Achievement Unlocked" 
                  color="warning" 
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Individual Habit Streaks */}
        <Grid size={{ xs: 12 }}>
          <Typography color="primary" variant="h5" fontWeight={700} mb={2}>Habit Streaks</Typography>
          <Card className={styles.card}>
            <CardContent>
              <Grid container spacing={3}>
                {habitStats.map((habit) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={habit.name}>
                    <Box textAlign="center">
                      <Typography fontWeight={600} mb={1}>{habit.name}</Typography>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography fontSize={14} color="text.secondary">Current</Typography>
                        <Typography fontSize={14} fontWeight={600}>{habit.currentStreak} days</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography fontSize={14} color="text.secondary">Longest</Typography>
                        <Typography fontSize={14} fontWeight={600}>{habit.longestStreak} days</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={habit.completion} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4, 
                          background: '#f5f5f5',
                          '& .MuiLinearProgress-bar': {
                            background: habit.currentStreak === habit.longestStreak 
                              ? 'linear-gradient(90deg, #ffd700, #ffed4e)' 
                              : 'linear-gradient(90deg, #7c4dff, #b39ddb)',
                            borderRadius: 4
                          }
                        }} 
                      />
                      <Typography fontSize={12} color="text.secondary" mt={1}>
                        {habit.completion}% completion
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Progress; 