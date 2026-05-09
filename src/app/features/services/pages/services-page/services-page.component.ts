import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
  selector: 'app-services-page',
  imports: [CurrencyPipe, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent {
  protected readonly bookingService = inject(BookingService);

  @ViewChild('carouselTrack')
  private readonly carouselTrack?: ElementRef<HTMLElement>;

  protected scrollCarousel(direction: -1 | 1): void {
    const track = this.carouselTrack?.nativeElement;

    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: 'smooth'
    });
  }
}
