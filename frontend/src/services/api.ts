import type { Service, BookingFormData, BookingResponse, AuthRequest, AuthResponse } from '../types/service';

const BASE_URL = '/api';

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function registerUser(data: AuthRequest): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Registration failed');
  }
  return res.json();
}

export async function loginUser(data: AuthRequest): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Invalid email or password');
  }
  return res.json();
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${BASE_URL}/services`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to load services');
  return res.json();
}

export async function submitBooking(data: BookingFormData): Promise<BookingResponse> {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit booking');
  return res.json();
}
