import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="privacy-page bg-light py-5">
      <div class="container py-lg-4">
        
        <!-- Header -->
        <div class="text-center mb-5 animate-fade-in">
          <span class="badge-editorial badge-champagne mb-2">CONFIDENTIALITY & CLIENT DATA PRIVACY</span>
          <h1 class="font-serif display-5 fw-bold mb-2">Privacy & Data Charter</h1>
          <p class="text-muted mx-auto" style="max-width: 650px;">
            At Daposh Fashion, we hold client confidentiality in the utmost regard. Learn how our atelier collects, encrypts, and safeguards your personal data.
          </p>
          <small class="text-muted d-block mt-2">Effective Date: October 2026 &bull; Compliant with Indian IT Act & DPDP Framework</small>
        </div>

        <!-- Main Content -->
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="card border-0 shadow-sm p-4 p-md-5 bg-white rounded-1">
              
              <!-- Atelier Privacy Shield -->
              <div class="d-flex align-items-center gap-3 p-4 bg-light rounded-1 mb-4 border">
                <i class="bi bi-shield-check text-champagne fs-1"></i>
                <div>
                  <h5 class="font-serif fw-bold mb-1">Our Client Discretion Guarantee</h5>
                  <p class="text-muted small mb-0">
                    We never sell, rent, or monetize your contact details or procurement history to third-party advertising brokers. Your inquiries and measurements remain strictly confidential.
                  </p>
                </div>
              </div>

              <!-- Section 1 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">1. Information We Collect</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  When you engage with Daposh Fashion—whether placing an order, booking a salon appointment, or submitting a bespoke inquiry—we collect:
                </p>
                <ul class="text-muted small ps-3" style="line-height: 1.8;">
                  <li><strong>Identity & Contact Information:</strong> Your full name, delivery address, city, PIN code, email address, and mobile / WhatsApp phone number.</li>
                  <li><strong>Custom Sizing & Tailoring Measurements:</strong> Anatomical measurements provided for bridal gowns, suits, and bespoke alterations.</li>
                  <li><strong>Transaction Records:</strong> Order identifiers, product skus acquired, timestamp, and payment status (recorded via Razorpay token).</li>
                  <li><strong>Technical & Session Data:</strong> Browser user-agent, IP address, and cookie tokens to preserve cart items and currency settings.</li>
                </ul>
              </div>

              <!-- Section 2 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">2. Payment Security & Razorpay Compliance</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  All online financial transactions are processed securely through <strong>Razorpay Payment Gateway</strong> using end-to-end 256-bit SSL encryption.
                </p>
                <div class="alert alert-secondary rounded-0 p-3 small mb-0">
                  <i class="bi bi-lock-fill me-2 text-dark"></i>
                  <strong>Zero Card Data Retention:</strong> Daposh Fashion never stores, views, or records your credit card numbers, debit PINs, CVV codes, or net banking passwords on our internal servers.
                </div>
              </div>

              <!-- Section 3 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">3. How Your Information is Used</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  We use your personal information solely to fulfill the purpose for which it was provided:
                </p>
                <ul class="text-muted small ps-3 mb-0" style="line-height: 1.8;">
                  <li>Fulfilling and dispatching your orders with priority couriers (BlueDart, Delhivery).</li>
                  <li>Sending real-time order tracking updates, SMS notifications, and delivery confirmations.</li>
                  <li>Facilitating private concierge consultations and bridal styling appointments.</li>
                  <li>Assisting with after-sales alterations, exchanges, and customer support.</li>
                </ul>
              </div>

              <!-- Section 4 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">4. Third-Party Service Partners</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  We collaborate only with vetted, enterprise-grade technology and logistics partners who adhere to rigorous data privacy obligations:
                </p>
                <ul class="text-muted small ps-3 mb-0" style="line-height: 1.8;">
                  <li><strong>Logistics:</strong> BlueDart Express, Delhivery (to deliver physical packages to your doorstep).</li>
                  <li><strong>Payments:</strong> Razorpay Software Ltd (PCI-DSS certified payment gateway).</li>
                  <li><strong>Media Delivery:</strong> Cloudinary Inc (high-resolution image delivery for garment details).</li>
                </ul>
              </div>

              <!-- Section 5 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">5. Cookies & Browsing Preferences</h4>
                <p class="text-muted small mb-0" style="line-height: 1.8;">
                  We utilize lightweight essential browser cookies to remember your bag items, currency preferences (INR, USD, EUR, GBP), and recent wishlist selections. You may disable cookies in your browser settings at any time; however, some storefront checkout features may require cookie activation.
                </p>
              </div>

              <!-- Section 6 -->
              <div class="legal-section">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">6. Your Rights & Data Erasure</h4>
                <p class="text-muted small mb-3" style="line-height: 1.8;">
                  You retain the right to inspect, update, or request the deletion of your contact records from our database. To make a request, contact our Data Concierge:
                </p>
                <div class="p-3 bg-light rounded-1 small text-dark">
                  <strong>Daposh Fashion Concierge Desk</strong><br/>
                  D85 shop no 6, Main road, Malviya nagar, New delhi 110017<br/>
                  Email: <a href="mailto:privacy&#64;daposhfashion.com" class="text-dark fw-bold">privacy&#64;daposhfashion.com</a><br/>
                  WhatsApp Concierge: <a [href]="fashionService.storeInfo.phoneTel" class="text-dark fw-bold">+91 85955 72121</a>
                </div>
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
export class PrivacyComponent {
  readonly fashionService = inject(FashionService);
}
