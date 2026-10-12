import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="returns-page bg-light py-5">
      <div class="container py-lg-4">
        
        <!-- Header -->
        <div class="text-center mb-5 animate-fade-in">
          <span class="badge-editorial badge-champagne mb-2">SATISFACTION & FIT GUARANTEE</span>
          <h1 class="font-serif display-5 fw-bold mb-2">Return & Refund Policy</h1>
          <p class="text-muted mx-auto" style="max-width: 650px;">
            We want every creation you acquire from Daposh Fashion to fit you impeccably. Discover our 30-day white-glove exchange, refund, and atelier alteration charter.
          </p>
        </div>

        <!-- 4-Step Visual Process -->
        <div class="row g-3 mb-5">
          <div class="col-12 col-md-3">
            <div class="card h-100 border-0 p-4 bg-white shadow-sm rounded-1 text-center">
              <div class="step-num text-champagne font-serif fs-2 fw-bold mb-1">01</div>
              <h5 class="font-serif fw-bold fs-6 mb-2">Initiate Request</h5>
              <p class="text-muted small mb-0">Reach our concierge via WhatsApp or inquiry form within 30 days of receiving your parcel.</p>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="card h-100 border-0 p-4 bg-white shadow-sm rounded-1 text-center">
              <div class="step-num text-champagne font-serif fs-2 fw-bold mb-1">02</div>
              <h5 class="font-serif fw-bold fs-6 mb-2">Doorstep Pickup</h5>
              <p class="text-muted small mb-0">We schedule a complimentary reverse pickup via BlueDart from your delivery address.</p>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="card h-100 border-0 p-4 bg-white shadow-sm rounded-1 text-center">
              <div class="step-num text-champagne font-serif fs-2 fw-bold mb-1">03</div>
              <h5 class="font-serif fw-bold fs-6 mb-2">Quality Inspection</h5>
              <p class="text-muted small mb-0">Our atelier artisans inspect the garment to verify original tags and unworn condition.</p>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="card h-100 border-0 p-4 bg-white shadow-sm rounded-1 text-center">
              <div class="step-num text-champagne font-serif fs-2 fw-bold mb-1">04</div>
              <h5 class="font-serif fw-bold fs-6 mb-2">Instant Refund / Swap</h5>
              <p class="text-muted small mb-0">Refund is processed to your original payment method in 3-5 days, or new size dispatched.</p>
            </div>
          </div>
        </div>

        <!-- Main Details -->
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="card border-0 shadow-sm p-4 p-md-5 bg-white rounded-1">
              
              <!-- Section 1 -->
              <div class="mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">30-Day White-Glove Return Window</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  All ready-to-wear runway items acquired through our digital catalog are eligible for return or size exchange within <strong>30 calendar days</strong> of parcel receipt.
                </p>
                <div class="p-3 bg-light rounded-1 small text-dark mb-2">
                  <strong>Eligible Condition:</strong> Garments must be unworn, unwashed, unaltered by outside third parties, with all original Daposh silk brand tags, price labels, and presentation box intact.
                </div>
              </div>

              <!-- Section 2 -->
              <div class="mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">Complimentary Atelier Alterations</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  Before requesting a return, consider our bespoke tailoring adjustments! If your silhouette requires minor sleeve hem, waist tucking, or trouser taper, our master craftspeople in Malviya Nagar offer <strong>complimentary alteration service</strong>. Simply bring the garment to our salon or ship it back with your desired measurement notes.
                </p>
              </div>

              <!-- Section 3 -->
              <div class="mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">Custom Couture & Bespoke Commission Exceptions</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  Items that are custom-crafted to your specific anatomical measurements (such as bridal trousseau gowns or bespoke monogrammed silks) are non-returnable once pattern cutting has begun. However, all bespoke items include full ongoing alteration support until your fit is 100% flawless.
                </p>
              </div>

              <!-- Section 4 -->
              <div class="mb-4 pb-3 border-bottom">
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">Refund Timelines & Processing Methods</h4>
                <p class="text-muted small" style="line-height: 1.8;">
                  Upon receiving and approving your returned parcel at our Malviya Nagar flagship atelier:
                </p>
                <ul class="text-muted small ps-3" style="line-height: 1.8;">
                  <li><strong>Razorpay Card / UPI Transactions:</strong> Refund is initiated immediately and reflects in your bank account or credit card statement within 3 to 5 business days.</li>
                  <li><strong>Cash on Delivery (COD) Orders:</strong> Our concierge will request your preferred bank account or UPI ID for direct transfer refund.</li>
                  <li><strong>Store Credit Voucher:</strong> If preferred, store credit with bonus atelier perks can be issued instantly for future s.</li>
                </ul>
              </div>

              <!-- Section 5 -->
              <div>
                <h4 class="font-serif fw-bold fs-5 mb-2 text-dark">Initiate a Return or Exchange Today</h4>
                <p class="text-muted small mb-3" style="line-height: 1.8;">
                  Our concierge team is standing by to guide your return or exchange smoothly:
                </p>
                <div class="d-flex flex-wrap gap-3">
                  <a [href]="fashionService.getWhatsAppLink('Hi Daposh fashion! I would like to request an exchange/return for my order.')" target="_blank" rel="noopener noreferrer" class="btn btn-dark rounded-0 px-4 py-2 small fw-bold">
                    <i class="bi bi-whatsapp me-2 text-success"></i> CHAT WITH RETURN CONCIERGE
                  </a>
                  <a routerLink="/contact" class="btn btn-outline-dark rounded-0 px-4 py-2 small fw-bold">
                    SUBMIT INQUIRY FORM
                  </a>
                  <a routerLink="/track-order" class="btn btn-outline-secondary rounded-0 px-4 py-2 small fw-bold">
                    VIEW ORDER STATUS
                  </a>
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
export class ReturnsComponent {
  readonly fashionService = inject(FashionService);
}
