import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="contact-page bg-light py-5">
      <div class="container py-lg-4">
        
        <!-- Header -->
        <div class="text-center mb-5 animate-fade-in">
          <span class="badge-editorial badge-champagne mb-2">CONCIERGE & SALON DES RENDEZ-VOUS</span>
          <h1 class="font-serif display-5 fw-bold mb-2">Contact Daposh Atelier</h1>
          <p class="text-muted mx-auto" style="max-width: 620px;">
            Whether you desire a private salon consultation, custom couture alterations, or have inquiries regarding your , our concierge is at your service.
          </p>
        </div>

        <div class="row g-4 g-lg-5">
          
          <!-- Left: Inquiry Form -->
          <div class="col-12 col-lg-7">
            <div class="card border-0 shadow-sm p-4 p-md-5 bg-white rounded-1">
              <div class="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom">
                <div>
                  <h4 class="font-serif fw-bold mb-1">Send a Confidential Inquiry</h4>
                  <p class="text-muted small mb-0">Our atelier concierge responds within 2-4 business hours.</p>
                </div>
                <i class="bi bi-envelope-paper-heart text-champagne fs-3"></i>
              </div>

              @if (isSubmitted()) {
                <div class="alert alert-success border-0 rounded-0 p-4 text-center animate-fade-in">
                  <i class="bi bi-check-circle-fill text-success fs-1 d-block mb-2"></i>
                  <h5 class="font-serif fw-bold mb-2">Inquiry Successfully Registered</h5>
                  <p class="small text-muted mb-3">
                    Thank you, <strong>{{ inquiryForm.name }}</strong>. Your message has been routed to our Malviya Nagar flagship concierge. We will reach out via WhatsApp or phone shortly.
                  </p>
                  <button class="btn btn-outline-dark rounded-0 px-4 py-2 small fw-bold" (click)="resetForm()">
                    Send Another Message
                  </button>
                </div>
              } @else {
                <form (ngSubmit)="onSubmitInquiry()">
                  <div class="row g-3">
                    
                    <!-- Name -->
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-bold">Full Name *</label>
                      <input 
                        type="text" 
                        class="form-control rounded-0" 
                        placeholder="e.g. Aanya Malhotra" 
                        required 
                        [(ngModel)]="inquiryForm.name" 
                        name="name"
                      />
                    </div>

                    <!-- Phone Number -->
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-bold">Phone / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        class="form-control rounded-0" 
                        placeholder="+91 98765 43210" 
                        required 
                        [(ngModel)]="inquiryForm.phone" 
                        name="phone"
                      />
                    </div>

                    <!-- Email -->
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-bold">Email Address *</label>
                      <input 
                        type="email" 
                        class="form-control rounded-0" 
                        placeholder="client@example.com" 
                        required 
                        [(ngModel)]="inquiryForm.email" 
                        name="email"
                      />
                    </div>

                    <!-- Category -->
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-bold">Inquiry Nature</label>
                      <select class="form-select rounded-0" [(ngModel)]="inquiryForm.category" name="category">
                        <option value="Bridal & Bespoke">Bridal & Bespoke Atelier</option>
                        <option value="Custom Couture">Custom Couture Tailoring</option>
                        <option value="Order Status">Order Status & Dispatch</option>
                        <option value="Size Consultation">Size & Silhouette Consultation</option>
                        <option value="General Inquiry">General Inquiries</option>
                      </select>
                    </div>

                    <!-- Subject -->
                    <div class="col-12">
                      <label class="form-label small fw-bold">Subject / Reference</label>
                      <input 
                        type="text" 
                        class="form-control rounded-0" 
                        placeholder="e.g. Consultation appointment for Pure Mulberry Silk gown" 
                        [(ngModel)]="inquiryForm.subject" 
                        name="subject"
                      />
                    </div>

                    <!-- Message -->
                    <div class="col-12">
                      <label class="form-label small fw-bold">Your Message / Desired Pieces *</label>
                      <textarea 
                        class="form-control rounded-0" 
                        rows="4" 
                        placeholder="Please share details regarding silhouettes, measurements, delivery timelines or questions..." 
                        required 
                        [(ngModel)]="inquiryForm.message" 
                        name="message">
                      </textarea>
                    </div>

                    <!-- Submit -->
                    <div class="col-12 mt-4">
                      <button 
                        type="submit" 
                        class="btn btn-dark w-100 py-3 rounded-0 fw-bold letter-spacing-medium"
                        [disabled]="isSending()">
                        @if (isSending()) {
                          <span class="spinner-border spinner-border-sm me-2"></span>
                          TRANSMITTING INQUIRY...
                        } @else {
                          <i class="bi bi-send-fill me-2"></i> SUBMIT CONCIERGE INQUIRY
                        }
                      </button>
                    </div>

                  </div>
                </form>
              }
            </div>
          </div>

          <!-- Right: Flagship Boutique Details & Fast Connect -->
          <div class="col-12 col-lg-5">
            <div class="d-flex flex-column gap-4">
              
              <!-- Store Card -->
              <div class="p-4 p-md-5 bg-dark text-white rounded-1 border border-champagne shadow-sm">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <span class="badge badge-champagne text-dark fw-bold">FLAGSHIP BOUTIQUE</span>
                  <span class="small text-champagne"><i class="bi bi-geo-alt-fill me-1"></i>New Delhi</span>
                </div>

                <h3 class="font-serif fw-bold text-white fs-4 mb-2">Daposh Fashion</h3>
                
                <div class="text-white-50 small mb-4" style="line-height: 1.7;">
                  <strong class="text-white d-block fs-6">D85 shop no 6</strong>
                  <span>Main road, Malviya nagar</span><br/>
                  <span>New delhi 110017, India</span>
                </div>

                <!-- Salon Timings -->
                <div class="p-3 bg-black bg-opacity-40 border border-secondary border-opacity-50 rounded-1 mb-4 small">
                  <span class="text-champagne fw-bold d-block mb-1 letter-spacing-medium" style="font-size: 0.72rem;">BOUTIQUE HOURS</span>
                  <div class="d-flex justify-content-between text-white-50">
                    <span>Monday &ndash; Sunday:</span>
                    <strong class="text-white">11:00 AM &ndash; 9:00 PM IST</strong>
                  </div>
                </div>

                <div class="d-flex flex-column gap-2">
                  <a [href]="fashionService.storeInfo.gpsLocation" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light rounded-0 py-2 d-flex align-items-center justify-content-center gap-2">
                    <i class="bi bi-geo-alt-fill text-champagne"></i>
                    <span class="fw-bold small letter-spacing-medium">OPEN GOOGLE MAPS 📍</span>
                  </a>

                  <a [href]="fashionService.getWhatsAppLink('Hi Daposh fashion! I would like to inquire about your collections.')" target="_blank" rel="noopener noreferrer" class="btn btn-success rounded-0 py-2 d-flex align-items-center justify-content-center gap-2">
                    <i class="bi bi-whatsapp"></i>
                    <span class="fw-bold small letter-spacing-medium">CHAT ON WHATSAPP (+91 85955 72121)</span>
                  </a>

                  <a [href]="fashionService.storeInfo.phoneTel" class="btn btn-dark border border-secondary rounded-0 py-2 d-flex align-items-center justify-content-center gap-2 text-white">
                    <i class="bi bi-telephone-fill text-champagne"></i>
                    <span class="fw-bold small letter-spacing-medium">CALL CONCIERGE</span>
                  </a>
                </div>
              </div>

              <!-- Instagram Box -->
              <div class="p-4 bg-white border rounded-1 shadow-sm">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="bi bi-instagram text-danger fs-4"></i>
                  <h6 class="font-serif fw-bold mb-0">Follow &#64;daposhfashion on Instagram</h6>
                </div>
                <p class="text-muted small mb-3">
                  Browse our real-time daily runway archives, customer photoshoots and behind-the-scenes bespoke crafting.
                </p>
                <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-dark rounded-0 px-3 py-2 fw-bold" style="font-size: 0.75rem;">
                  VISIT INSTAGRAM &rarr;
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  `,
  styles: [`
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .badge-champagne {
      background-color: #dfc8a8;
      color: #0c0c0c;
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ContactComponent {
  readonly fashionService = inject(FashionService);

  readonly isSending = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);

  inquiryForm = {
    name: '',
    email: '',
    phone: '',
    category: 'Bridal & Bespoke',
    subject: '',
    message: ''
  };

  async onSubmitInquiry(): Promise<void> {
    if (!this.inquiryForm.name || !this.inquiryForm.email || !this.inquiryForm.phone || !this.inquiryForm.message) {
      this.fashionService.showToast('Validation Error', 'Please complete all required fields', 'warning');
      return;
    }

    this.isSending.set(true);
    try {
      await this.fashionService.submitInquiry(this.inquiryForm);
      this.isSubmitted.set(true);
      this.fashionService.showToast('Inquiry Transmitted', 'Thank you! We will reach out shortly.', 'success');
    } catch (err) {
      this.fashionService.showToast('Submission Issue', 'Could not send message. Please reach us on WhatsApp.', 'warning');
    } finally {
      this.isSending.set(false);
    }
  }

  resetForm(): void {
    this.inquiryForm = {
      name: '',
      email: '',
      phone: '',
      category: 'Bridal & Bespoke',
      subject: '',
      message: ''
    };
    this.isSubmitted.set(false);
  }
}
