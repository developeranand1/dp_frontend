import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FashionService, OrderRecord } from '../../services/fashion.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="track-order-page py-5">
      <div class="container py-lg-4">
        
        <!-- Luxury Header Banner -->
        <div class="text-center mb-5 animate-fade-in">
          <span class="badge-editorial badge-champagne mb-2">CONCIERGE DISPATCH PORTAL</span>
          <h1 class="font-serif display-5 fw-bold mb-2">Track Your Atelier </h1>
          <p class="text-muted mx-auto" style="max-width: 600px; font-size: 0.95rem;">
            Enter your unique Order Reference Number (e.g. <strong>DPS-2026-482910</strong>) or your registered mobile number to observe real-time transit & white-glove delivery status.
          </p>

          <!-- Search Form -->
          <div class="search-track-box mx-auto mt-4 p-2 bg-white shadow-sm border d-flex gap-2" style="max-width: 580px;">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-0 text-muted">
                <i class="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                class="form-control border-0 shadow-none ps-0 font-monospace"
                placeholder="Enter Order ID (e.g. DPS-2026-...) or Phone Number"
                [(ngModel)]="searchQuery"
                (keyup.enter)="onSearch()"
              />
            </div>
            <button 
              class="btn btn-dark rounded-0 px-4 fw-bold letter-spacing-medium text-nowrap" 
              style="font-size: 0.76rem;"
              [disabled]="loading()"
              (click)="onSearch()">
              @if (loading()) {
                <span class="spinner-border spinner-border-sm me-1"></span>
              }
              TRACK SILHOUETTE
            </button>
          </div>

          <!-- Quick Test Examples -->
          <div class="mt-3 text-muted small">
            <span>Quick sample codes: </span>
            <button class="btn btn-link btn-sm text-decoration-none p-0 mx-1 text-dark fw-bold" (click)="searchWithCode('DPS-2026-102948')">DPS-2026-102948</button>
            <span>&bull;</span>
            <button class="btn btn-link btn-sm text-decoration-none p-0 mx-1 text-dark fw-bold" (click)="searchWithCode('+91 85955 72121')">+91 85955 72121</button>
          </div>
        </div>

        <!-- Tracking Results Card -->
        @if (order(); as ord) {
          <div class="order-result-card bg-white border shadow-sm p-4 p-md-5 mb-5 animate-fade-in">
            
            <!-- Order Meta Bar -->
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-4 mb-4 border-bottom">
              <div>
                <div class="d-flex align-items-center gap-2 mb-1">
                  <h3 class="font-serif fs-4 mb-0 fw-bold">{{ ord.orderId }}</h3>
                  <span class="badge" [ngClass]="getPaymentBadgeClass(ord.paymentStatus)">
                    {{ ord.paymentStatus | uppercase }} &bull; {{ ord.paymentMethod | uppercase }}
                  </span>
                </div>
                <small class="text-muted">
                  Acquired on {{ ord.createdAt ? (ord.createdAt | date:'mediumDate') : 'Today' }}
                </small>
              </div>

              <div class="text-md-end">
                <span class="d-block small text-muted">Courier Partner & Airway Bill</span>
                <strong class="text-dark">{{ ord.courierName || 'BlueDart Luxury Express' }}</strong>
                <span class="d-block text-champagne small fw-bold font-monospace">{{ ord.trackingNumber || 'BD-IN-9810293' }}</span>
              </div>
            </div>

            <!-- Visual Luxury Stepper / Progress Bar -->
            <div class="tracking-stepper my-5">
              <div class="stepper-track position-relative">
                <div class="progress" style="height: 3px;">
                  <div class="progress-bar bg-dark" role="progressbar" [style.width.%]="getStepperProgress(ord.orderStatus)"></div>
                </div>

                <div class="d-flex justify-content-between position-relative" style="margin-top: -18px;">
                  
                  <!-- Step 1: Placed -->
                  <div class="step-point text-center" [class.completed]="isStepComplete('Placed', ord.orderStatus)" [class.active]="ord.orderStatus === 'Placed'">
                    <div class="step-circle mx-auto mb-2">
                      <i class="bi bi-bag-check"></i>
                    </div>
                    <span class="step-title d-block fw-bold">ORDER PLACED</span>
                    <small class="step-sub text-muted">Received by Atelier</small>
                  </div>

                  <!-- Step 2: Confirmed -->
                  <div class="step-point text-center" [class.completed]="isStepComplete('Confirmed', ord.orderStatus)" [class.active]="ord.orderStatus === 'Confirmed'">
                    <div class="step-circle mx-auto mb-2">
                      <i class="bi bi-patch-check"></i>
                    </div>
                    <span class="step-title d-block fw-bold">CONFIRMED</span>
                    <small class="step-sub text-muted">Concierge Verified</small>
                  </div>

                  <!-- Step 3: Shipped -->
                  <div class="step-point text-center" [class.completed]="isStepComplete('Shipped', ord.orderStatus)" [class.active]="ord.orderStatus === 'Shipped'">
                    <div class="step-circle mx-auto mb-2">
                      <i class="bi bi-box-seam"></i>
                    </div>
                    <span class="step-title d-block fw-bold">IN TRANSIT</span>
                    <small class="step-sub text-muted">Dispatched via Air</small>
                  </div>

                  <!-- Step 4: Out for Delivery -->
                  <div class="step-point text-center" [class.completed]="isStepComplete('Out for Delivery', ord.orderStatus)" [class.active]="ord.orderStatus === 'Out for Delivery'">
                    <div class="step-circle mx-auto mb-2">
                      <i class="bi bi-truck"></i>
                    </div>
                    <span class="step-title d-block fw-bold">OUT FOR DELIVERY</span>
                    <small class="step-sub text-muted">White-Glove Courier</small>
                  </div>

                  <!-- Step 5: Delivered -->
                  <div class="step-point text-center" [class.completed]="isStepComplete('Delivered', ord.orderStatus)" [class.active]="ord.orderStatus === 'Delivered'">
                    <div class="step-circle mx-auto mb-2">
                      <i class="bi bi-house-door"></i>
                    </div>
                    <span class="step-title d-block fw-bold">DELIVERED</span>
                    <small class="step-sub text-muted">Safely Received</small>
                  </div>

                </div>
              </div>
            </div>

            <!-- Two-Column Layout: Items vs Address & Timeline -->
            <div class="row g-4 mt-4 pt-3 border-top">
              
              <!-- Left: Items Ordered -->
              <div class="col-12 col-lg-7">
                <h5 class="font-serif fw-bold mb-3 fs-5">Reserved Silhouettes ({{ ord.items.length }})</h5>
                <div class="d-flex flex-column gap-3">
                  @for (item of ord.items; track $index) {
                    <div class="p-3 border d-flex gap-3 align-items-center bg-light">
                      <img [src]="item.primaryImage || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80'" [alt]="item.name" class="rounded-0 object-fit-cover" style="width: 65px; height: 80px;" />
                      <div class="flex-grow-1">
                        <h6 class="mb-1 font-serif fw-bold text-dark">{{ item.name }}</h6>
                        <div class="small text-muted mb-1" style="font-size: 0.75rem;">
                          <span>Size: <strong>{{ item.selectedSize }}</strong></span>
                          <span class="mx-2">&bull;</span>
                          <span>Color: <strong>{{ item.selectedColor?.name || 'Default' }}</strong></span>
                          <span class="mx-2">&bull;</span>
                          <span>Qty: <strong>{{ item.quantity }}</strong></span>
                        </div>
                        <strong class="text-dark small">{{ fashionService.formatPrice(item.price * item.quantity) }}</strong>
                      </div>
                    </div>
                  }
                </div>

                <!-- Price Breakdown -->
                <div class="p-3 bg-light border mt-3 small">
                  <div class="d-flex justify-content-between mb-1 text-muted">
                    <span>Subtotal</span>
                    <span>{{ fashionService.formatPrice(ord.subtotal) }}</span>
                  </div>
                  @if (ord.discount > 0) {
                    <div class="d-flex justify-content-between mb-1 text-success">
                      <span>Privilege Discount</span>
                      <span>-{{ fashionService.formatPrice(ord.discount) }}</span>
                    </div>
                  }
                  <div class="d-flex justify-content-between mb-2 text-muted">
                    <span>Delivery Service</span>
                    <span class="text-success fw-bold">{{ ord.shipping === 0 ? 'COMPLIMENTARY' : fashionService.formatPrice(ord.shipping) }}</span>
                  </div>
                  <div class="d-flex justify-content-between border-top pt-2 fs-6 fw-bold font-serif">
                    <span>Total Amount</span>
                    <span>{{ fashionService.formatPrice(ord.total) }}</span>
                  </div>
                </div>
              </div>

              <!-- Right: Delivery Address & Activity Timeline -->
              <div class="col-12 col-lg-5">
                
                <!-- Destination Card -->
                <div class="p-3 border bg-light mb-3">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="small text-muted fw-bold letter-spacing-medium">CONSIGNEE DESTINATION</span>
                    <i class="bi bi-geo-alt-fill text-champagne"></i>
                  </div>
                  <h6 class="font-serif fw-bold mb-1">{{ ord.customer.name }}</h6>
                  <p class="small text-muted mb-2" style="line-height: 1.5;">
                    {{ ord.customer.address }}<br/>
                    {{ ord.customer.city }}, {{ ord.customer.state }} - {{ ord.customer.pincode }}
                  </p>
                  <div class="small text-muted">
                    <span><i class="bi bi-telephone me-1"></i> {{ ord.customer.phone }}</span><br/>
                    <span><i class="bi bi-envelope me-1"></i> {{ ord.customer.email }}</span>
                  </div>
                </div>

                <!-- Live Status Timeline Activity -->
                <div class="p-3 border bg-white">
                  <span class="small text-muted fw-bold letter-spacing-medium d-block mb-3">MILESTONE CHRONOLOGY</span>
                  
                  <div class="timeline-activity-list d-flex flex-column gap-3">
                    @for (log of ord.statusTimeline; track $index) {
                      <div class="d-flex gap-2 align-items-start">
                        <i class="bi bi-record-circle-fill text-champagne mt-1" style="font-size: 0.8rem;"></i>
                        <div>
                          <strong class="d-block small text-dark">{{ log.status | uppercase }}</strong>
                          <span class="small text-muted d-block" style="font-size: 0.78rem;">{{ log.message }}</span>
                          <span class="text-muted" style="font-size: 0.68rem;">{{ log.timestamp | date:'short' }}</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>

                <!-- Concierge Support Contact -->
                <div class="mt-3 p-3 bg-dark text-white text-center">
                  <span class="d-block small text-champagne fw-bold mb-1 letter-spacing-medium" style="font-size: 0.7rem;">NEED IMMEDIATE DISPATCH ASSISTANCE?</span>
                  <p class="small text-white-50 mb-3" style="font-size: 0.76rem;">
                    Speak with our Malviya Nagar flagship store concierge anytime.
                  </p>
                  <div class="d-flex gap-2">
                    <a [href]="fashionService.getWhatsAppLink('Inquiring regarding order: ' + ord.orderId)" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success rounded-0 flex-grow-1 py-2 fw-bold">
                      <i class="bi bi-whatsapp me-1"></i> WhatsApp
                    </a>
                    <a [href]="fashionService.storeInfo.phoneTel" class="btn btn-sm btn-outline-light rounded-0 flex-grow-1 py-2 fw-bold">
                      <i class="bi bi-telephone-fill me-1"></i> Call Store
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>
        } @else if (searched() && !order()) {
          <div class="text-center py-5 bg-white border shadow-sm p-4 animate-fade-in">
            <i class="bi bi-search text-muted display-4 mb-3 d-block"></i>
            <h4 class="font-serif mb-2">No Matching Record Found</h4>
            <p class="text-muted small mb-4" style="max-width: 480px; margin: 0 auto;">
              We could not find an active  associated with <strong>{{ searchQuery }}</strong>. 
              Please verify your Order ID or contact our concierge directly on WhatsApp.
            </p>
            <a [href]="fashionService.getWhatsAppLink()" target="_blank" rel="noopener noreferrer" class="btn btn-atelier px-4 py-2">
              CONTACT WHATSAPP CONCIERGE (+91 85955 72121)
            </a>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .track-order-page {
      background-color: #faf8f5;
      min-height: 80vh;
    }
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .badge-champagne {
      background-color: #dfc8a8;
      color: #0c0c0c;
    }
    .search-track-box {
      border-radius: 2px;
    }
    .step-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      color: #999;
      transition: all 0.3s ease;
    }
    .step-point {
      flex: 1;
      &.completed .step-circle {
        background: #0c0c0c;
        border-color: #0c0c0c;
        color: #dfc8a8;
      }
      &.active .step-circle {
        background: #dfc8a8;
        border-color: #0c0c0c;
        color: #0c0c0c;
        box-shadow: 0 0 0 4px rgba(223, 200, 168, 0.4);
      }
    }
    .step-title {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
    }
    .step-sub {
      font-size: 0.65rem;
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
export class TrackOrderComponent implements OnInit {
  readonly fashionService = inject(FashionService);
  private readonly route = inject(ActivatedRoute);

  searchQuery: string = '';
  readonly order = signal<OrderRecord | null>(null);
  readonly loading = signal<boolean>(false);
  readonly searched = signal<boolean>(false);

  ngOnInit(): void {
    // Check if order ID passed in URL query param: /track-order?id=DPS-2026-XXXXXX
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.searchQuery = params['id'];
        this.onSearch();
      }
    });
  }

  async onSearch(): Promise<void> {
    if (!this.searchQuery.trim()) return;

    this.loading.set(true);
    this.searched.set(true);
    try {
      const result = await this.fashionService.trackOrder(this.searchQuery.trim());
      this.order.set(result);
    } catch (err) {
      this.order.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  searchWithCode(code: string): void {
    this.searchQuery = code;
    this.onSearch();
  }

  getPaymentBadgeClass(status: string): string {
    if (status === 'paid') return 'bg-success text-white';
    if (status === 'pending') return 'bg-warning text-dark';
    return 'bg-danger text-white';
  }

  getStepperProgress(status: string): number {
    switch (status) {
      case 'Placed': return 10;
      case 'Confirmed': return 35;
      case 'Processing': return 40;
      case 'Shipped': return 65;
      case 'Out for Delivery': return 85;
      case 'Delivered': return 100;
      default: return 20;
    }
  }

  isStepComplete(step: string, current: string): boolean {
    const order = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const stepIdx = order.indexOf(step);
    const currIdx = order.indexOf(current);
    return currIdx >= stepIdx;
  }
}
