import { Helmet } from 'react-helmet-async';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function PendingPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', status: 'Pending' },
    { id: 2, name: 'Jane Doe', status: 'Pending' },
    // Add more users as needed
  ]);

  const handleActivate = (userId) => {
    // Logic to activate user
    // Update the user status to 'Active'
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: 'Active' } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeactivate = (userId) => {
    // Logic to deactivate user
    // Update the user status to 'Inactive'
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: 'Inactive' } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <>
      <Helmet>
        <title> Pending | AradaX </title>
      </Helmet>

      <Container>
        <Typography variant="h5" gutterBottom>
          User Pending Table
        </Typography>
        <br />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    {user.status === 'Pending' && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleActivate(user.id)}
                        >
                          Activate
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeactivate(user.id)}
                        >
                          Deactivate
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
