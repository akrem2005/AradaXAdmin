import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Modal,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_URL = 'https://aradax.com.et/quiz/questions/';

export default function QuizPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    questionText: '',
    options: [],
    correctAnswer: '',
    catagory: '',
  });
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('token');
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
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

  const handleQuizSubmit = async (event) => {
    event.preventDefault();
    try {
      const authToken = localStorage.getItem('token');
      await axios.post('https://aradax.com.et/quiz/questions', formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setQuizData([...quizData, formData]);
      setFormData({
        questionText: '',
        options: [],
        correctAnswer: '',
        catagory: '',
      });
      closeModal();
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleDeleteQuiz = async (id) => {
    try {
      const authToken = localStorage.getItem('token');
      await axios.delete(`https://aradax.com.et/quiz/questions/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Quiz | AradaX</title>
      </Helmet>

      <Button variant="contained" onClick={openModal}>
        Add Quiz
      </Button>

      <Modal open={isModalOpen} onClose={closeModal} aria-labelledby="quiz-modal">
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
                  Add Quiz
                </Typography>
                <form onSubmit={handleQuizSubmit}>
                  <TextField
                    label="Question Text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.questionText}
                    onChange={handleInputChange('questionText')}
                  />
                  <TextField
                    label="Options (comma-separated)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.options}
                    onChange={handleInputChange('options')}
                  />
                  <TextField
                    label="Correct Answer"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.correctAnswer}
                    onChange={handleInputChange('correctAnswer')}
                  />
                  <TextField
                    label="Category"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.catagory}
                    onChange={handleInputChange('catagory')}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit Quiz
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

      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Quiz Data
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Question Text</TableCell>
                  <TableCell>Options</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizData.map((quiz) => (
                  <TableRow key={quiz._id}>
                    <TableCell>{quiz.questionText}</TableCell>
                    <TableCell>{quiz.options}</TableCell>
                    <TableCell>{quiz.correctAnswer}</TableCell>
                    <TableCell>{quiz.catagory}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteQuiz(quiz._id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}
