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
}

export interface BookingResponse extends BookingFormData {
  id: number;
  createdAt: string;
}
