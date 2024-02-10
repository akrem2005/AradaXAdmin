import DashboardIcon from '@mui/icons-material/Analytics';
import UserIcon from '@mui/icons-material/AccountCircle';
import CoursesIcon from '@mui/icons-material/ShoppingCart';
import CategoriesIcon from '@mui/icons-material/Category';
import QuizzesIcon from '@mui/icons-material/Quiz';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PendingIcon from '@mui/icons-material/Schedule';
import NotificationsIcon from '@mui/icons-material/Notifications';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'dashboard',
    path: '',
    icon: <DashboardIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'user',
    path: 'user',
    icon: <UserIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'courses',
    path: 'course',
    icon: <CoursesIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'categories',
    path: 'category',
    icon: <CategoriesIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'quizzes',
    path: 'quiz',
    icon: <QuizzesIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'feedbacks',
    path: 'feedbacks',
    icon: <FeedbackIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'pending',
    path: 'pending',
    icon: <PendingIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'notifications',
    path: 'notifications',
    icon: <NotificationsIcon sx={{ width: 1, height: 1 }} />,
  },
];

export default navConfig;
