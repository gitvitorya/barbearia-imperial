import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
  selector: 'app-booking-page',
  imports: [
    CurrencyPipe,
    DatePipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule
  ],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss'
})
export class BookingPageComponent {
  protected readonly bookingService = inject(BookingService);

  protected readonly dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const candidate = new Date(date);
    candidate.setHours(0, 0, 0, 0);

    return candidate >= today && candidate.getDay() !== 0;
  };

  schedule(): void {
    const summary = this.bookingService.buildSummary();

    if (!summary) {
      return;
    }

    window.open(summary.whatsappUrl, '_blank', 'noopener');
  }
}
