import { Routes } from '@angular/router';

import { BookingPageComponent } from './features/booking/pages/booking-page/booking-page.component';
import { ServicesPageComponent } from './features/services/pages/services-page/services-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'servicos' },
  { path: 'servicos', component: ServicesPageComponent, title: 'Servicos | Barbearia' },
  { path: 'agendamento', component: BookingPageComponent, title: 'Agendamento | Barbearia' },
  { path: '**', redirectTo: 'servicos' }
];
