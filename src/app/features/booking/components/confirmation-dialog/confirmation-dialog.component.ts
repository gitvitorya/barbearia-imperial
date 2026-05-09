import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentSummary } from '../../../../core/models/appointment.model';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CurrencyPipe, DatePipe, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) protected readonly summary: AppointmentSummary,
    private readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  close(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}
