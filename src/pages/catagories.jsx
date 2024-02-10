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
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CatagoryPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: '65a2535df86c9f1fd435bcb6',
    name: 'Ecommerce',
    image: 'https://www.cloudways.com/blog/wp-content/uploads/Ecommerce-Shopping-I…',
    __v: 0,
    type: 'ec',
  });

  const [categoryData, setCategoryData] = useState([
    // Add more category data entries as needed
    {
      _id: '65a2535df86c9f1fd435bcb6',
      name: 'Ecommerce',
      image:
        'https://www.cloudways.com/blog/wp-content/uploads/Ecommerce-Shopping-Infographics.png',
      __v: 0,
      type: 'ec',
    },
    {
      _id: '65a253f5f86c9f1fd435bcb9',
      name: 'Forex Trading',
      image:
        'https://xtb.scdn5.secure.raxcdn.com/kb_main_photo/0102/92/9ecbe35a-70bc-4b2e-80aa-74c65b57e09f/kb_main_photo_front/1-trading-what-is-it.png',
      __v: 0,
      type: 'fx',
    },
    // Add more category data entries as needed
  ]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCategorySubmit = (event) => {
    // Handle category submission logic here
    event.preventDefault();
    // Add your category submission logic, e.g., send data to the server
    setCategoryData([...categoryData, formData]);
    closeModal();
  };

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleDeleteCategory = (id) => {
    // Handle category deletion logic here
    setCategoryData(categoryData.filter((category) => category._id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Category | AradaX</title>
      </Helmet>

      <Button variant="contained" onClick={openModal}>
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
                    label="_id"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData._id}
                    onChange={handleInputChange('_id')}
                    disabled
                  />
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
                    disabled
                  />
                  {/* You can add more fields as needed */}
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
              <CardMedia component="img" height="140" image={category.image} alt={category.name} />

              <CardContent>
                <Typography variant="h6">{category.name}</Typography>
                <IconButton onClick={() => handleDeleteCategory(category._id)} color="secondary">
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
