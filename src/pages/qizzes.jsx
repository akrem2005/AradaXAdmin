import React, { useState } from 'react';
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

export default function QuizPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: '65b52eec9cb251b98c37f2a3',
    questionText: 'What is the Capital of Germany',
    options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
    correctAnswer: 'Berlin',
    category: 'ec',
    __v: 0,
  });

  const [quizData, setQuizData] = useState([
    // Add more quiz data entries as needed
    {
      _id: '65b52eec9cb251b98c37f2a3',
      questionText: 'What is the Capital of Germany',
      options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
      correctAnswer: 'Berlin',
      category: 'ec',
      __v: 0,
    },
    // Add more quiz data entries as needed
  ]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleQuizSubmit = (event) => {
    // Handle quiz submission logic here
    event.preventDefault();
    // Add your quiz submission logic, e.g., send data to the server
    setQuizData([...quizData, formData]);
    closeModal();
  };

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleDeleteQuiz = (id) => {
    // Handle quiz deletion logic here
    setQuizData(quizData.filter((quiz) => quiz._id !== id));
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
                    value={formData.options.join(',')}
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
                    value={formData.category}
                    onChange={handleInputChange('category')}
                  />
                  {/* You can add more fields as needed */}
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
                    <TableCell>{quiz.options.join(', ')}</TableCell>
                    <TableCell>{quiz.correctAnswer}</TableCell>
                    <TableCell>{quiz.category}</TableCell>
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
