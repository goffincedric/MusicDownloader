import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { LoginComponent } from '../components/LoginComponent';

export default function AuthPage() {
  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <LoginComponent />
      </Paper>
    </Container>
  );
}
