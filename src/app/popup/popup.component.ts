import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('popupAnimation', [
      state('open', style({ opacity: 1, transform: 'scale(1)' })),
      state('closed', style({ opacity: 0, transform: 'scale(0.8)' })),
      transition('closed => open', [animate('300ms ease-out')]),
      transition('open => closed', [animate('300ms ease-in')]),
    ]),
  ],
})
export class PopupComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  get popupState(): 'open' | 'closed' {
    return this.isVisible ? 'open' : 'closed';
  }

  closePopup(): void {
    this.isVisible = false; // Hide the popup
    this.close.emit(); // Emit the close event
  }
}
