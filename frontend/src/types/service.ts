export interface AuthRequest {
  name?: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  phone: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface BookingFormData {
  serviceName: string;
  issueDescription: string;
  name: string;
  zipCode: string;
  email: string;
  phone: string;
}

export interface BookingResponse extends BookingFormData {
  id: number;
  createdAt: string;
}
