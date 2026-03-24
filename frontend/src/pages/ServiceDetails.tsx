import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Service, BookingFormData } from '../types/service';
import { submitBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ServiceDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const service = (location.state?.service as Service) || { name: 'Service' };

  const [formData, setFormData] = useState<BookingFormData>({
    serviceName: service.name,
    issueDescription: '',
    name: user?.name || '',
    zipCode: '',
    email: user?.email || '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.issueDescription.trim()) {
      newErrors.issueDescription = 'Please describe the issue';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    }
    if (!formData.zipCode.match(/^\d{5}(-\d{4})?$/)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = await submitBooking(formData);
      navigate('/success', { state: { formData: booking } });
    } catch {
      setSubmitError('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', textDecoration: 'none' }}
        >
          <ArrowBackIcon fontSize="small" />
          Back to Services
        </Link>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            Book {service.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Booking for {user?.name} ({user?.email})
          </Typography>

          {submitError && (
            <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              id="issueDescription"
              name="issueDescription"
              label="Describe the Issue"
              multiline
              rows={4}
              value={formData.issueDescription}
              onChange={handleInputChange}
              error={!!errors.issueDescription}
              helperText={errors.issueDescription}
              placeholder="Please describe the issue you're experiencing"
              required
            />

            <TextField
              fullWidth
              id="zipCode"
              name="zipCode"
              label="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              error={!!errors.zipCode}
              helperText={errors.zipCode || 'Format: 12345 or 12345-6789'}
              placeholder="12345"
              required
            />

            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="555-555-5555"
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={submitting}
              sx={{
                mt: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
