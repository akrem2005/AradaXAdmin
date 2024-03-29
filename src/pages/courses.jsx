import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Modal,
  Button,
  TextField,
  Typography,
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_URL = 'https://aradax.com.et/courses/';

export default function CoursePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData2, setFormData2] = useState({
    htmlFile: null,
  });
  const [formData, setFormData] = useState({
    description: '',
    videoUrl: '',
    image: '',
    title: '',
    category: '',
  });
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCourseSubmit = async (event) => {
    const authToken = localStorage.getItem('token');
    event.preventDefault();
    try {
      await axios.post('https://aradax.com.et/courses/new', formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCourseData([...courseData, formData]);
      setFormData({
        description: '',
        videoUrl: '',
        image: '',
        title: '',
        category: '',
      });
      closeModal();
    } catch (error) {
      console.error('Error submitting course:', error);
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://aradax.com.et/courses/upload',
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...axios.defaults.headers.common, // Use axios default headers
      },
      data: uploadData,
    };

    try {
      const response = await axios.request(config);

      // Log the response for further inspection
      console.log('File upload response:', response);

      // Handle success, for example, update your component state
      console.log('File uploaded successfully');
    } catch (error) {
      // Log the detailed error information
      console.error('Error uploading file:', error.response);

      // Handle specific errors if needed
      if (error.response && error.response.status === 400) {
        console.error('Bad Request - No file uploaded.');
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleDeleteCourse = async (_id) => {
    const authToken = localStorage.getItem('token');
    try {
      await axios.get(`https://aradax.com.et/courses/${_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCourseData(courseData.filter((course) => course._id !== _id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Course | AradaX</title>
      </Helmet>

      <Button variant="contained" onClick={openModal}>
        Add course
      </Button>

      <Modal open={isModalOpen} onClose={closeModal} aria-labelledby="course-modal">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%', padding: '20px' }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                  Add course
                </Typography>
                <form onSubmit={handleCourseSubmit}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                    value={formData.description}
                    onChange={handleInputChange('description')}
                  />
                  <TextField
                    label="Video URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.videoUrl}
                    onChange={handleInputChange('videoUrl')}
                  />
                  <TextField
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.image}
                    onChange={handleInputChange('image')}
                  />
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.title}
                    onChange={handleInputChange('title')}
                  />
                  <TextField
                    label="Category"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.category}
                    onChange={handleInputChange('category')}
                  />
                  {/* You can add more fields as needed */}
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit course
                  </Button>
                </form>
                <Button
                  variant="outlined"
                  onClick={closeModal}
                  fullWidth
                  style={{ marginTop: '10px' }}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Modal>
      <form onSubmit={handleUploadSubmit}>
        <input type="file" name="htmlFile" accept=".html" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <br />
      <Typography variant="h5" gutterBottom>
        Course
      </Typography>

      <Grid container spacing={2}>
        {courseData.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              {/* Display course data */}
              <CardMedia component="img" height="140" image={course.image} alt={course.title} />
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {course.description}
                </Typography>
                <a href={course.videoUrl}>
                  {' '}
                  <Typography variant="body2" color="textSecondary">
                    {course.videoUrl}
                  </Typography>
                </a>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleDeleteCourse(course._id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
