import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <footer class="editorial-footer text-white pt-5 pb-4 position-relative">
      
      <!-- Newsletter VIP Atelier Club Banner -->
      <div class="newsletter-strip py-5 border-bottom border-secondary border-opacity-25">
        <div class="container-fluid px-3 px-lg-5">
          <div class="row align-items-center justify-content-between g-4">
            
            <div class="col-12 col-lg-6">
              <span class="section-kicker text-champagne mb-1">THE ATELIER SALON SOCIETY</span>
              <h3 class="font-serif fs-2 mb-2">Subscribe to Private Previews</h3>
              <p class="text-white-50 mb-0 small" style="max-width: 500px;">
                Receive private access to limited runway editions, salon trunk shows, and receive 15% privilege on your inaugural .
              </p>
            </div>

            <div class="col-12 col-lg-5">
              @if (subscribed()) {
                <div class="p-3 bg-dark border border-champagne text-center animate-fade-in">
                  <i class="bi bi-patch-check-fill text-champagne fs-4 mb-1 d-block"></i>
                  <span class="fw-semibold text-champagne small d-block">WELCOME TO THE DAPOSH ATELIER SOCIETY</span>
                  <p class="small text-white-50 mb-2">Use code <strong>ATELIER15</strong> at checkout for 15% off.</p>
                  <button class="btn btn-sm btn-outline-light rounded-0" (click)="applySubscribedCoupon()">
                    Apply Coupon Now
                  </button>
                </div>
              } @else {
                <div class="input-group">
                  <input 
                    type="email" 
                    class="form-control bg-transparent text-white border-secondary rounded-0 py-3 px-3 newsletter-input" 
                    placeholder="Enter your confidential email..." 
                    [(ngModel)]="emailInput"
                  />
                  <button class="btn-atelier-champagne px-4" (click)="onSubscribe()">
                    JOIN VIP CLUB
                  </button>
                </div>
                <small class="text-white-50 mt-2 d-block" style="font-size: 0.68rem;">
                  By joining, you consent to our Privacy Charter and encrypted communications.
                </small>
              }
            </div>

          </div>
        </div>
      </div>

      <!-- Quick Concierge Access Bar (About, Contact, FAQ, Track Order & Admin Links) -->
      <div class="quick-access-strip py-3 border-bottom border-secondary border-opacity-25 bg-black bg-opacity-40">
        <div class="container-fluid px-3 px-lg-5">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div class="d-flex flex-wrap align-items-center gap-2 gap-md-3 small">
              <a routerLink="/about" class="footer-quick-pill text-decoration-none d-flex align-items-center gap-2">
                <i class="bi bi-bank text-champagne fs-6"></i>
                <span class="fw-bold text-white">ABOUT US</span>
              </a>
              <a routerLink="/contact" class="footer-quick-pill text-decoration-none d-flex align-items-center gap-2">
                <i class="bi bi-envelope-paper-heart text-champagne fs-6"></i>
                <span class="fw-bold text-white">CONTACT CONCIERGE</span>
              </a>
              <a routerLink="/faq" class="footer-quick-pill text-decoration-none d-flex align-items-center gap-2">
                <i class="bi bi-question-circle text-champagne fs-6"></i>
                <span class="fw-bold text-white">FAQ &amp; HELP</span>
              </a>
              <span class="text-white-50 opacity-25 d-none d-lg-inline">&bull;</span>
              <a routerLink="/track-order" class="footer-quick-pill text-decoration-none d-flex align-items-center gap-2">
                <i class="bi bi-truck text-champagne fs-6"></i>
                <span class="fw-bold text-white">TRACK ORDER STATUS</span>
              </a>
              <a routerLink="/admin" class="footer-quick-pill text-decoration-none d-flex align-items-center gap-2">
                <i class="bi bi-shield-lock-fill text-champagne fs-6"></i>
                <span class="fw-bold text-white">ATELIER ADMIN CONSOLE</span>
              </a>
            </div>

            <div class="d-flex align-items-center gap-3 small">
              <a [href]="fashionService.getWhatsAppLink()" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-success fw-bold d-flex align-items-center gap-1">
                <i class="bi bi-whatsapp"></i>
                <span>WhatsApp: +91 85955 72121</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Footer Columns -->
      <div class="container-fluid px-3 px-lg-5 py-5">
        <div class="row g-4 g-lg-5">
          
          <!-- Col 1: Brand & Maison Statement -->
          <div class="col-12 col-lg-3">
            <div class="d-flex align-items-center gap-3 mb-3">
              <img 
                src="assets/images/daposh-logo.png" 
                alt="Daposh Fashion Official Logo" 
                class="rounded-circle"
                style="width: 52px; height: 52px; object-fit: cover; border: 1.5px solid rgba(255,255,255,0.2); box-shadow: 0 4px 14px rgba(0,0,0,0.4);"
              />
              <div>
                <h4 class="font-serif letter-spacing-loose fs-4 mb-0 text-white fw-bold">DAPOSH FASHION</h4>
                <span class="d-block small text-champagne letter-spacing-medium fw-semibold" style="font-size: 0.68rem;">
                  EVENT STYLING &bull; ATELIER
                </span>
              </div>
            </div>
            <p class="text-white-50 small mb-4" style="line-height: 1.7;">
              Curating architectural couture, pure mulberry silks, bespoke bridal &amp; pret wear. Crafted for modern elegance with artisanal precision.
            </p>

            <div class="d-flex align-items-center gap-3">
              <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram"><i class="bi bi-instagram fs-5"></i></a>
              <a [href]="fashionService.getWhatsAppLink()" target="_blank" rel="noopener noreferrer" class="social-icon text-success" aria-label="WhatsApp"><i class="bi bi-whatsapp fs-5"></i></a>
              <a [href]="fashionService.storeInfo.phoneTel" class="social-icon" aria-label="Telephone"><i class="bi bi-telephone-fill fs-5"></i></a>
              <a [href]="fashionService.storeInfo.gpsLocation" target="_blank" rel="noopener noreferrer" class="social-icon text-champagne" aria-label="Google Maps"><i class="bi bi-geo-alt-fill fs-5"></i></a>
            </div>
          </div>

          <!-- Col 2: Prominent Pages (ABOUT, CONTACT, FAQ, RETURNS, TRACK) -->
          <div class="col-12 col-md-6 col-lg-2">
            <h6 class="footer-col-title letter-spacing-medium mb-3 text-white">MAISON PAGES</h6>
            <div class="d-flex flex-column gap-2 footer-links small">
              <a routerLink="/about" class="d-flex align-items-center gap-2">
                <i class="bi bi-bank text-champagne" style="font-size: 0.75rem;"></i>
                <span>About Us</span>
              </a>
              <a routerLink="/contact" class="d-flex align-items-center gap-2">
                <i class="bi bi-envelope-paper-heart text-champagne" style="font-size: 0.75rem;"></i>
                <span>Contact Us</span>
              </a>
              <a routerLink="/faq" class="d-flex align-items-center gap-2">
                <i class="bi bi-question-circle text-champagne" style="font-size: 0.75rem;"></i>
                <span>FAQ &amp; Concierge</span>
              </a>
              <a routerLink="/returns" class="d-flex align-items-center gap-2">
                <i class="bi bi-arrow-repeat text-champagne" style="font-size: 0.75rem;"></i>
                <span>Return &amp; Refund</span>
              </a>
              <a routerLink="/track-order" class="d-flex align-items-center gap-2">
                <i class="bi bi-truck text-champagne" style="font-size: 0.75rem;"></i>
                <span>Track Order</span>
              </a>
              <a routerLink="/admin" class="d-flex align-items-center gap-2">
                <i class="bi bi-shield-lock text-champagne" style="font-size: 0.75rem;"></i>
                <span>Admin Console</span>
              </a>
            </div>
          </div>

          <!-- Col 3: Flagship Boutique Address -->
          <div class="col-12 col-md-6 col-lg-4">
            <div class="boutique-address-card p-4 rounded-1 border border-champagne h-100" style="background: rgba(255, 255, 255, 0.03);">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="badge badge-champagne text-dark fw-bold">FLAGSHIP BOUTIQUE</span>
                <span class="small text-champagne"><i class="bi bi-geo-alt-fill me-1"></i>New Delhi</span>
              </div>
              
              <h5 class="font-serif text-white fs-4 fw-bold mb-2">Daposh fashion</h5>
              
              <div class="address-text-block text-white mb-3" style="line-height: 1.6;">
                <p class="mb-0 fw-bold fs-6 text-white">D85 shop no 6</p>
                <p class="mb-0 fw-bold fs-6 text-white">Main road</p>
                <p class="mb-0 fw-bold fs-6 text-white">Malviya nagar</p>
                <p class="mb-0 fw-bold fs-6 text-white">New delhi - 110017</p>
              </div>

              <!-- GPS Location Link Button -->
              <a [href]="fashionService.storeInfo.gpsLocation" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light rounded-0 w-100 py-2 d-flex align-items-center justify-content-center gap-2 mb-3 store-gps-btn">
                <i class="bi bi-geo-alt-fill text-champagne fs-5"></i>
                <span class="small fw-bold letter-spacing-medium">OPEN GPS LOCATION (MAPS📍)</span>
              </a>

              <div class="d-flex gap-2">
                <a [href]="fashionService.getWhatsAppLink()" target="_blank" rel="noopener noreferrer" class="btn btn-success rounded-0 flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-1 small fw-bold">
                  <i class="bi bi-whatsapp"></i> WhatsApp
                </a>
                <a [href]="fashionService.storeInfo.phoneTel" class="btn btn-dark border border-secondary rounded-0 flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-1 small fw-bold text-white">
                  <i class="bi bi-telephone-fill text-champagne"></i> Call Store
                </a>
              </div>
            </div>
          </div>

          <!-- Col 4: Instagram Collection Spotlight & WhatsApp Contact -->
          <div class="col-12 col-md-6 col-lg-3">
            <div class="instagram-footer-card p-4 rounded-1 border border-secondary border-opacity-50 h-100" style="background: rgba(20, 20, 20, 0.6);">
              <div class="d-flex align-items-center gap-2 mb-3">
                <i class="bi bi-instagram fs-4 text-danger"></i>
                <h6 class="footer-col-title letter-spacing-medium mb-0">INSTAGRAM ARCHIVES</h6>
              </div>
              
              <div class="p-3 bg-black bg-opacity-50 border border-champagne border-opacity-50 rounded-1 mb-3">
                <span class="d-block small text-champagne fw-bold mb-1 letter-spacing-medium" style="font-size: 0.72rem;">COLLECTION SELECTION</span>
                <h5 class="font-serif text-white fs-6 fw-bold mb-1">For any collection choose from Instagram</h5>
                <p class="small text-white-50 mb-2" style="font-size: 0.76rem;">
                  Our newest runway editions &amp; festive arrivals are updated daily.
                </p>
                <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-light rounded-0 px-3 py-1 fw-bold" style="font-size: 0.72rem;">
                  <i class="bi bi-instagram me-1 text-danger"></i> Visit &#64;daposhfashion &rarr;
                </a>
              </div>

              <!-- Contact Helpline (WhatsApp Only +91 85955 72121) -->
              <div class="contact-details-box text-white-50 small">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-whatsapp text-success fs-5"></i>
                  <div>
                    <span class="text-white-50 d-block" style="font-size: 0.68rem;">WHATSAPP ONLY</span>
                    <strong class="text-white fs-6 fw-bold">+91 85955 72121</strong>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <i class="bi bi-telephone-fill text-champagne fs-5"></i>
                  <div>
                    <span class="text-white-50 d-block" style="font-size: 0.68rem;">CALL CONCIERGE</span>
                    <strong class="text-white fs-6 fw-bold">+91 85955 72121</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Credits & Payment Badges -->
      <div class="container-fluid px-3 px-lg-5 pt-3 border-top border-secondary border-opacity-25">
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-white-50 small" style="font-size: 0.72rem;">
          <div>
            &copy; 2026 DAPOSH ATELIER INC. ALL RIGHTS RESERVED. DESIGNED FOR HIGH COUTURE.
          </div>
          <div class="d-flex align-items-center gap-3 flex-wrap">
            <a routerLink="/about" class="text-white fw-bold text-decoration-none">ABOUT US</a>
            <span>&bull;</span>
            <a routerLink="/contact" class="text-white fw-bold text-decoration-none">CONTACT</a>
            <span>&bull;</span>
            <a routerLink="/faq" class="text-white fw-bold text-decoration-none">FAQ</a>
            <span>&bull;</span>
            <a routerLink="/returns" class="text-white-50 text-decoration-none">RETURNS</a>
            <span>&bull;</span>
            <a routerLink="/track-order" class="text-white-50 text-decoration-none">TRACK ORDER</a>
            <span>&bull;</span>
            <a routerLink="/terms" class="text-white-50 text-decoration-none">TERMS OF ATELIER</a>
            <span>&bull;</span>
            <a routerLink="/privacy" class="text-white-50 text-decoration-none">PRIVACY CHARTER</a>
            <span>&bull;</span>
            <a routerLink="/admin" class="text-white-50 text-decoration-none">ADMIN</a>
          </div>
          <div class="d-flex align-items-center gap-2 payment-icons">
            <span class="badge border border-secondary text-white-50">RAZORPAY</span>
            <span class="badge border border-secondary text-white-50">UPI</span>
            <span class="badge border border-secondary text-white-50">VISA</span>
            <span class="badge border border-secondary text-white-50">MASTERCARD</span>
            <span class="badge border border-secondary text-white-50">COD</span>
          </div>
        </div>
      </div>

    </footer>
  `,
  styles: [`
    .editorial-footer {
      background-color: #0c0c0c;
    }
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .border-champagne {
      border-color: #dfc8a8 !important;
    }
    .footer-col-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.16em;
    }
    .footer-links a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      transition: color 0.2s, padding-left 0.2s;

      &:hover {
        color: #dfc8a8;
        padding-left: 4px;
      }
    }
    .footer-quick-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(223, 200, 168, 0.3);
      padding: 0.35rem 0.85rem;
      border-radius: 2px;
      transition: all 0.2s ease;
      &:hover {
        background: #dfc8a8;
        border-color: #dfc8a8;
        span { color: #0c0c0c !important; }
        i { color: #0c0c0c !important; }
      }
    }
    .social-icon {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.15rem;
      transition: color 0.2s, transform 0.2s;

      &:hover {
        color: #dfc8a8;
        transform: translateY(-2px);
      }
    }
    .newsletter-input {
      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.85rem;
      }
      &:focus {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: #dfc8a8;
        box-shadow: none;
      }
    }
    .store-gps-btn {
      border: 1.5px solid #dfc8a8 !important;
      color: #ffffff;
      transition: all 0.2s ease;
      &:hover {
        background-color: #dfc8a8;
        color: #0c0c0c;
        i { color: #0c0c0c !important; }
      }
    }
    .badge-champagne {
      background-color: #dfc8a8;
      color: #0c0c0c;
    }
  `]
})
export class FooterComponent {
  readonly fashionService = inject(FashionService);

  emailInput: string = '';
  readonly subscribed = signal<boolean>(false);

  onSubscribe(): void {
    if (this.emailInput.trim() && this.emailInput.includes('@')) {
      this.subscribed.set(true);
      this.fashionService.showToast('VIP Society Access', 'Welcome to the DAPOSH Salon Society. Code ATELIER15 is ready.', 'success');
    } else {
      this.fashionService.showToast('Invalid Email', 'Please enter a valid email address', 'warning');
    }
  }

  applySubscribedCoupon(): void {
    this.fashionService.applyCoupon('ATELIER15');
    this.fashionService.toggleCart(true);
  }
}
