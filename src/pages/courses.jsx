import React, { useState } from 'react';
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
  TableContainer,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CoursePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: '65aa3e999a4dc8cdc526d128',
    description: 'የኢ-ኮሜርስ ፍቺ ምን እንደሆነ ይወቁ። የኢ-ኮሜርስ ጥቅሞች ምን እንደሆኑ ያስሱ፣ አራት የተለያዩ የኤሌክትሮኒክ…',
    videoUrl: 'https://static.videezy.com/system/resources/previews/000/000/168/origi…',
    __v: 0,
    image: 'https://i.ytimg.com/vi/d2jUrFz1vGs/maxresdefault.jpg',
    title: 'Introduction To Ecommerce',
    category: 'ec',
  });

  const [courseData, setcourseData] = useState([
    // Add more course data entries as needed
    {
      _id: '65aa3e999a4dc8cdc526d128',
      description: 'የኢ-ኮሜርስ ፍቺ ምን እንደሆነ ይወቁ። የኢ-ኮሜርስ ጥቅሞች ምን እንደሆኑ ያስሱ፣ አራት የተለያዩ የኤሌክትሮኒክ…',
      videoUrl: 'https://static.videezy.com/system/resources/previews/000/000/168/origi…',
      __v: 0,
      image: 'https://i.ytimg.com/vi/d2jUrFz1vGs/maxresdefault.jpg',
      title: 'Introduction To Ecommerce',
      category: 'ec',
    },
    // Add more course data entries as needed
  ]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlecourseSubmit = (event) => {
    // Handle course submission logic here
    event.preventDefault();
    // Add your course submission logic, e.g., send data to the server
    setcourseData([...courseData, formData]);
    closeModal();
  };

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleDeletecourse = (id) => {
    // Handle course deletion logic here
    setcourseData(courseData.filter((course) => course._id !== id));
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
                <form onSubmit={handlecourseSubmit}>
                  <TextField
                    label="_id"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData._id}
                    onChange={handleInputChange('_id')}
                    disabled
                  />
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
      <br />
      <Typography variant="h5" gutterBottom>
        Course
      </Typography>
      <Grid container spacing={2}>
        {courseData.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia component="img" height="140" image={course.image} alt={course.title} />

              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {course.description}
                </Typography>
              </CardContent>

              <CardActions>
                <IconButton onClick={() => handleDeletecourse(course._id)} color="secondary">
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
