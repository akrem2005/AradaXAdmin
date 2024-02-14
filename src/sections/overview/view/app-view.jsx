import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

export default function AppView() {
  const [userData, setUserData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [payData, setPayData] = useState({});
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('token');

      try {
        if (authToken) {
          const userResponse = await axios.get('https://aradax.com.et/users/getall', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setUserData(userResponse.data);
          console.log(userResponse.data);

          const categoryResponse = await axios.get('https://aradax.com.et/categories/', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setCategoryData(categoryResponse.data);
          console.log(categoryResponse.data);

          const payResponse = await axios.get('https://aradax.com.et/pay/', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setPayData(payResponse.data);

          const courseResponse = await axios.get('https://aradax.com.et/courses/', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setCourseData(courseResponse.data);
          console.log(courseResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={userData.length ?? 0}
            color="success"
            icon={<img alt="icon" src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Courses"
            total={courseData.length ?? 0}
            color="info"
            icon={<img alt="icon" src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Catagories"
            total={categoryData.length ?? 0}
            color="warning"
            icon={<img alt="icon" src="https://cdn-icons-png.flaticon.com/512/6724/6724239.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Payments"
            total={payData.length ?? 0}
            color="error"
            icon={<img alt="icon" src="https://cdn-icons-png.flaticon.com/512/726/726488.png" />}
          />
        </Grid>
        <br />
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Users"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
