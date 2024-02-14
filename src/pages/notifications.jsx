import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';

export default function NotificationPage() {
  const [notificationData, setNotificationData] = useState({
    text: '',
    date: '',
    subtitle: '',
    image: '',
  });

  const [notificationList, setNotificationList] = useState([]);

  const handleNotificationSubmit = () => {
    const authToken = localStorage.getItem('token');
    axios
      .post('https://aradax.com.et/notifications/notifications', notificationData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log('Response Data:', response.data);
        setNotificationList((prevList) => [...prevList, response.data]);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error as needed, e.g., show an error message to the user
      });
  };

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    axios
      .get('https://aradax.com.et/notifications/notifications', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log('Response Data:', response.data);
        setNotificationList(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error as needed, e.g., show an error message to the user
      });
  }, []);

  const handleChange = useCallback((e, field) => {
    setNotificationData((prevData) => ({ ...prevData, [field]: e.target.value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNotificationSubmit();
  };

  return (
    <>
      <Helmet>
        <title> Notification | AradaX </title>
      </Helmet>

      <Container>
        <Card sx={{ maxWidth: 'sm', width: '100%', marginRight: '0px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Notification Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Enter Notification Text"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleChange(e, 'text')}
              />
              <TextField
                label="Enter Notification Date"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleChange(e, 'date')}
              />
              <TextField
                label="Enter Notification Subtitle"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleChange(e, 'subtitle')}
              />
              <TextField
                label="Enter Notification Image URL"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => handleChange(e, 'image')}
              />
              {/* ... Other TextField components ... */}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 'sm', width: '100%', marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Notification Table
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Text</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Subtitle</TableCell>
                    <TableCell>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notificationList.map((notification, index) => (
                    <TableRow key={index}>
                      <TableCell>{notification.text}</TableCell>
                      <TableCell>{notification.date}</TableCell>
                      <TableCell>{notification.subtitle}</TableCell>
                      <TableCell>
                        <img
                          src={notification.image}
                          alt="Notification"
                          style={{ maxWidth: '50px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
