export interface BarberService {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  imageUrl: string;
  featured?: boolean;
}
