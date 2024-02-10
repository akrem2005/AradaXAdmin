import { Helmet } from 'react-helmet-async';
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
// ----------------------------------------------------------------------

export default function NotificationPage() {
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
            <TextField label="Enter Notification" variant="outlined" fullWidth margin="normal" />
            <Button variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 'sm', width: '100%', marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Table
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Column 1</TableCell>
                    <TableCell>Column 2</TableCell>
                    {/* Add more table headers as needed */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Add table rows and cells here */}
                  <TableRow>
                    <TableCell>Data 1</TableCell>
                    <TableCell>Data 2</TableCell>
                    {/* Add more cells as needed */}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
