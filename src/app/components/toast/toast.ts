import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (fashionService.toastAlert(); as alert) {
      <div class="daposh-toast-container animate-fade-in">
        <div class="luxury-toast d-flex align-items-center shadow-lg" [ngClass]="alert.type">
          @if (alert.image) {
            <img [src]="alert.image" [alt]="alert.title" class="toast-thumb me-3" />
          } @else {
            <div class="toast-icon me-3">
              @if (alert.type === 'success') {
                <i class="bi bi-bag-check-fill"></i>
              } @else if (alert.type === 'warning') {
                <i class="bi bi-exclamation-triangle-fill"></i>
              } @else {
                <i class="bi bi-info-circle-fill"></i>
              }
            </div>
          }
          <div class="toast-body-content me-3">
            <span class="toast-tag">{{ alert.title }}</span>
            <p class="toast-msg mb-0">{{ alert.message }}</p>
          </div>
          <button type="button" class="btn-close-toast ms-auto" (click)="fashionService.clearToast()" aria-label="Close">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .luxury-toast {
      background: rgba(14, 14, 14, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(197, 168, 128, 0.35);
      color: #fff;
      padding: 0.85rem 1.25rem;
      border-radius: 2px;
      min-width: 320px;
      max-width: 440px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.45);
    }
    .toast-thumb {
      width: 44px;
      height: 56px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .toast-icon {
      font-size: 1.35rem;
      color: #c5a880;
    }
    .toast-tag {
      display: block;
      font-size: 0.68rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #c5a880;
      font-weight: 600;
    }
    .toast-msg {
      font-size: 0.85rem;
      color: #eaeaea;
      font-weight: 300;
    }
    .btn-close-toast {
      background: none;
      border: none;
      color: #aaa;
      font-size: 1.25rem;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      transition: color 0.2s;
      &:hover { color: #fff; }
    }
    .animate-fade-in {
      animation: toastSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes toastSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ToastComponent {
  readonly fashionService = inject(FashionService);
}

