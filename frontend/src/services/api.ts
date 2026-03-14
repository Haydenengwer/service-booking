import type { Service, BookingFormData, BookingResponse } from '../types/service';

const BASE_URL = '/api';

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${BASE_URL}/services`);
  if (!res.ok) throw new Error('Failed to load services');
  return res.json();
}

export async function submitBooking(data: BookingFormData): Promise<BookingResponse> {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit booking');
  return res.json();
}
