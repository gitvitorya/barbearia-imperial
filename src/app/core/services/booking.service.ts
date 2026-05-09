import { Injectable, computed, signal } from '@angular/core';
import { AppointmentDraft, AppointmentSummary } from '../models/appointment.model';
import { BarberService } from '../models/barber-service.model';

const WHATSAPP_PHONE = '5519998882650';

const INITIAL_DRAFT: AppointmentDraft = {
  selectedServices: [],
  date: null,
  time: null,
  customerName: ''
};

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly draftSignal = signal<AppointmentDraft>({ ...INITIAL_DRAFT });

  readonly services: BarberService[] = [
    {
      id: 'corte-giletado',
      name: 'Corte giletado',
      durationMinutes: 40,
      price: 40,
      imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
      featured: true
    },
    {
      id: 'corte-social',
      name: 'Corte social',
      durationMinutes: 30,
      price: 40,
      imageUrl: 'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?auto=format&fit=crop&w=900&q=80',
      featured: true
    },
    {
      id: 'pigmentacao',
      name: 'Pigmentação',
      durationMinutes: 70,
      price: 20,
      imageUrl: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=80',
      featured: true
    },
    {
      id: 'sobrancelha',
      name: 'Sobrancelha',
      durationMinutes: 15,
      price: 10,
      imageUrl: 'https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'relaxamento',
      name: 'Relaxamento',
      durationMinutes: 20,
      price: 40,
      imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'barba',
      name: 'Barba',
      durationMinutes: 35,
      price: 35,
      imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80'
    }
  ];

  readonly availableTimes = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00'
  ];
  readonly draft = this.draftSignal.asReadonly();

  readonly totalPrice = computed(() =>
    this.draft().selectedServices.reduce((total, service) => total + service.price, 0)
  );

  readonly totalDurationMinutes = computed(() =>
    this.draft().selectedServices.reduce((total, service) => total + service.durationMinutes, 0)
  );

  readonly canConfirm = computed(() => {
    const draft = this.draft();
    return Boolean(
      draft.selectedServices.length &&
      draft.date &&
      draft.time &&
      draft.customerName.trim()
    );
  });

  toggleService(service: BarberService): void {
    const selectedServices = this.isSelected(service.id)
      ? this.draft().selectedServices.filter((item) => item.id !== service.id)
      : [...this.draft().selectedServices, service];

    this.patchDraft({ selectedServices });
  }

  isSelected(serviceId: string): boolean {
    return this.draft().selectedServices.some((service) => service.id === serviceId);
  }

  patchDraft(partial: Partial<AppointmentDraft>): void {
    this.draftSignal.update((draft) => ({ ...draft, ...partial }));
  }

  resetDraft(): void {
    this.draftSignal.set({ ...INITIAL_DRAFT });
  }

  buildSummary(): AppointmentSummary | null {
    const draft = this.draft();

    if (!draft.date || !draft.time || !draft.selectedServices.length || !draft.customerName.trim()) {
      return null;
    }

    const totalPrice = this.totalPrice();
    const totalDurationMinutes = this.totalDurationMinutes();

    const summary: Omit<AppointmentSummary, 'whatsappUrl'> = {
      services: draft.selectedServices,
      date: draft.date,
      time: draft.time,
      customerName: draft.customerName.trim(),
      totalPrice,
      totalDurationMinutes
    };

    return {
      ...summary,
      whatsappUrl: this.buildWhatsAppUrl(summary)
    };
  }

  private buildWhatsAppUrl(summary: Omit<AppointmentSummary, 'whatsappUrl'>): string {
    const date = new Intl.DateTimeFormat('pt-BR').format(summary.date);
    const services = summary.services.map((service) => service.name).join(', ');
    const total = summary.totalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    const message = `
━━━━━━━━━━━━━━━━━━
*NOVO AGENDAMENTO*
━━━━━━━━━━━━━━━━━━

*Cliente:* ${summary.customerName}

*Serviços:* ${services}

*Data:* ${date}

*Horário:* ${summary.time}

*Total:* ${total}

Aguardo confirmação.
`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }
}
