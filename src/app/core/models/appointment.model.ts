import { BarberService } from './barber-service.model';

export interface AppointmentDraft {
  selectedServices: BarberService[];
  date: Date | null;
  time: string | null;
  customerName: string;
}

export interface AppointmentSummary {
  services: BarberService[];
  date: Date;
  time: string;
  customerName: string;
  totalPrice: number;
  totalDurationMinutes: number;
  whatsappUrl: string;
}
