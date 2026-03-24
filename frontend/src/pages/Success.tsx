import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import type { BookingFormData } from '../types/service';

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData as BookingFormData;

  const handleNewRequest = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ textAlign: 'center', pt: 4 }}>
          <Box sx={{ mb: 2 }}>
            <CheckCircleIcon
              sx={{
                fontSize: '5rem',
                color: '#667eea',
              }}
            />
          </Box>

          <Typography variant="h3" gutterBottom>
            Request Submitted Successfully!
          </Typography>

          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Thank you for submitting your service request.
            <br />A specialist will contact you shortly via{' '}
            <strong>email</strong> or <strong>phone</strong> to discuss your{' '}
            {formData?.serviceName || 'service'} needs and provide an estimate.
          </Typography>

          {formData && (
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#f5f5f5',
                p: 2,
                mb: 3,
                textAlign: 'left',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Request Details
              </Typography>
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Service:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formData.serviceName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Name:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formData.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Email:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formData.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Zip Code:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formData.zipCode}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Phone:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formData.phone}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}

          <Paper
            elevation={0}
            sx={{
              backgroundColor: '#e8f4ff',
              p: 2,
              mb: 3,
              borderLeft: '4px solid #667eea',
              textAlign: 'left',
            }}
          >
            <Typography variant="h6" gutterBottom>
              What to Expect
            </Typography>
            <List disablePadding>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <EmailIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="You'll receive a confirmation email shortly" />
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AssignmentIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="A service specialist will review your request" />
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <PhoneIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="We'll contact you within 24 hours to schedule" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <ReceiptIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Get a free estimate for your service" />
              </ListItem>
            </List>
          </Paper>

          <Button
            onClick={handleNewRequest}
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
