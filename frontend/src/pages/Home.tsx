import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import type { Service } from '../types/service';
import { fetchServices } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setError('Could not load services. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const handleServiceClick = (service: Service) => {
    navigate(`/service/${service.id}`, { state: { service } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h1" gutterBottom>
          Home Services Booking Platform
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Select a service to get started
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 2,
            mt: 2,
          }}
        >
          {services.map((service) => (
            <Card
              key={service.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                },
              }}
              onClick={() => handleServiceClick(service)}
            >
              <CardContent sx={{ textAlign: 'left', flexGrow: 1 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {service.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
