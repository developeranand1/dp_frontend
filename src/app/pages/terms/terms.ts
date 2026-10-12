import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="terms-page bg-light py-5">
      <div class="container py-lg-4">
        
        <!-- Header -->
        <div class="text-center mb-5 animate-fade-in">
          <span class="badge-editorial badge-champagne mb-2">LEGAL & ATELIER CHARTER</span>
          <h1 class="font-serif display-5 fw-bold mb-2">Terms & Conditions of Service</h1>
          <p class="text-muted mx-auto" style="max-width: 650px;">
            Please read these terms carefully before engaging with Daposh Fashion boutique storefront, bespoke concierge, and online procurement services.
          </p>
          <small class="text-muted d-block mt-2">Effective Date: October 2026 &bull; Last Revised: 2026</small>
        </div>

        <!-- Main Content -->
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="card border-0 shadow-sm p-4 p-md-5 bg-white rounded-1">
              
              <!-- Atelier Introduction Notice -->
              <div class="p-4 bg-light border-start border-3 border-dark mb-4">
                <h5 class="font-serif fw-bold mb-1">Maison Operational Entity</h5>
                <p class="text-muted small mb-0" style="line-height: 1.7;">
                  These Terms of Service govern the access, browsing, and purchase of apparel and bespoke commissions across <strong>Daposh Fashion</strong>, situated at <strong>D85 shop no 6, Main road, Malviya nagar, New delhi 110017, India</strong>. By accessing our platform or placing an , you affirm your assent to these conditions.
                </p>
              </div>

              <!-- Section 1 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">1. Acceptance of Terms & Eligibility</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  By utilizing our digital store or salon booking system, you represent that you are at least 18 years of age or possess the legal capacity to enter into binding agreements under the laws of the Republic of India. If you act on behalf of a corporate entity or salon agency, you confirm that you possess full authority to bind said entity.
                </p>
              </div>

              <!-- Section 2 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">2. Product Authenticity, Handcrafting & Color Variance</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  Every creation displayed across our runway catalog is crafted with premium natural textiles—including Grade 6A Mulberry silk, fine wools, and organic linens. Because our fabrics undergo artisan dyeing and manual hand-finishing:
                </p>
                <ul class="text-muted small ps-3" style="line-height: 1.8;">
                  <li>Subtle natural slubs, dye variations, or hand-embroidery textures are hallmarked indicators of authentic craftsmanship rather than defects.</li>
                  <li>We make exhaustive efforts to render true-to-life colors on screen; however, minor chromatic variations may occur depending on display calibration and lighting environments.</li>
                </ul>
              </div>

              <!-- Section 3 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">3. Bespoke Commissions & Custom Measurements</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  For made-to-measure couture, bridal gowns, and custom alterations:
                </p>
                <ul class="text-muted small ps-3" style="line-height: 1.8;">
                  <li>Clients submitting self-measured dimensions are encouraged to consult our concierge over video call or in our Malviya Nagar studio to ensure accuracy.</li>
                  <li>Custom commissions entering fabric-cutting cannot be cancelled or refunded, though complimentary atelier alterations remain accessible.</li>
                </ul>
              </div>

              <!-- Section 4 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">4. Pricing, Razorpay Payments & Invoicing</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  All prices listed on our storefront are quoted in Indian Rupees (INR) and are inclusive of applicable GST unless explicitly noted. We partner with <strong>Razorpay</strong> to process payments securely via UPI, Net Banking, Credit Cards, and Debit Cards with PCI-DSS 256-bit bank encryption.
                </p>
                <p class="text-muted small mb-0" style="line-height: 1.8;">
                  Daposh Fashion reserves the right to modify prices or withdraw promotional vouchers at any juncture without prior notification. Orders placed prior to price adjustments will honor the original contracted transaction amount.
                </p>
              </div>

              <!-- Section 5 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">5. Shipping, Dispatch & White-Glove Couriers</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  Ready-to-wear items are prepared within 24-48 hours. Shipments are transported via BlueDart Air Express or Delhivery with tracking updates delivered via SMS and email. Risk of transit loss passes to the client upon recorded physical delivery by the courier partner.
                </p>
              </div>

              <!-- Section 6 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">6. Intellectual Property & Trademark Protection</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  All trademarks, silhouettes, lookbook editorial photographs, brand seals, software scripts, and copywriting on this website are the proprietary property of Daposh Fashion. Reproduction, crawling, or republication for unauthorized commercial use is strictly prohibited under Indian Copyright laws.
                </p>
              </div>

              <!-- Section 7 -->
              <div class="legal-section mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">7. Jurisdiction & Dispute Resolution</h4>
                <p class="text-muted small mb-0" style="line-height: 1.8;">
                  These Terms of Service are construed and enforced under the laws of India. Any litigation, arbitration, or disputes arising in connection with transactions or services rendered by Daposh Fashion shall be subject to the exclusive jurisdiction of the competent courts in <strong>New Delhi, India</strong>.
                </p>
              </div>

              <!-- Section 8 -->
              <div class="legal-section">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">8. Contact Legal & Atelier Concierge</h4>
                <p class="text-muted small mb-3" style="line-height: 1.8;">
                  If you have legal or compliance questions concerning these Terms, please reach out to our administration office:
                </p>
                <div class="p-3 bg-light rounded-1 small text-dark">
                  <strong>Daposh Fashion Atelier</strong><br/>
                  D85 shop no 6, Main road, Malviya nagar, New delhi 110017<br/>
                  Email: <a href="mailto:contact&#64;daposhfashion.com" class="text-dark fw-bold">contact&#64;daposhfashion.com</a><br/>
                  Phone / WhatsApp: <a [href]="fashionService.storeInfo.phoneTel" class="text-dark fw-bold">+91 85955 72121</a>
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
export class TermsComponent {
  readonly fashionService = inject(FashionService);
}
