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
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_URL = 'https://aradax.com.et/categories/';

export default function CategoryPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    type: '',
  });
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCategoryData(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
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

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem('token');

    try {
      await axios.post('https://aradax.com.et/categories/new', formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setCategoryData((prevData) => [...prevData, formData]);
      closeModal();
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`https://aradax.com.et/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setCategoryData((prevData) => prevData.filter((category) => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Category | AradaX</title>
      </Helmet>

      <Button variant="contained" onClick={openModal} aria-label="Add category">
        Add category
      </Button>

      <Modal open={isModalOpen} onClose={closeModal} aria-labelledby="category-modal">
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
                  Add category
                </Typography>
                <form onSubmit={handleCategorySubmit}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleInputChange('name')}
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
                    label="Type"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.type}
                    onChange={handleInputChange('type')}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit category
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
        Category
      </Typography>

      <Grid container spacing={2}>
        {categoryData.map((category) => (
          <Grid item key={category._id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia component="img" height="140" image={category.image} alt={category.name} />
              <CardContent>
                <Typography variant="h6">{category.name}</Typography>
                <IconButton
                  onClick={() => handleDeleteCategory(category._id)}
                  color="secondary"
                  aria-label={`Delete category ${category.name}`}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
