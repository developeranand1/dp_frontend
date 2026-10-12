import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FashionService, OrderRecord, CustomerDetails, OrderItem } from '../../services/fashion.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    @if (fashionService.isCartOpen()) {
      <div class="cart-backdrop" (click)="fashionService.toggleCart(false)"></div>
      
      <div class="cart-drawer shadow-2xl d-flex flex-column">
        
        <!-- Drawer Header -->
        <div class="p-4 border-bottom d-flex align-items-center justify-content-between bg-white">
          <div>
            <h5 class="font-serif mb-0 fs-5 letter-spacing-medium">ATELIER BAG</h5>
            <small class="text-muted letter-spacing-medium" style="font-size: 0.68rem;">
              {{ fashionService.cartCount() }} {{ fashionService.cartCount() === 1 ? 'SILHOUETTE' : 'SILHOUETTES' }}
            </small>
          </div>
          <button class="btn p-0 border-0 fs-4 text-dark" (click)="fashionService.toggleCart(false)" aria-label="Close Bag">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Free Delivery Progress Bar -->
        <div class="shipping-meter-bar px-4 py-3 border-bottom">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="small fw-semibold letter-spacing-medium" style="font-size: 0.68rem;">
              @if (fashionService.freeShippingProgress() >= 100) {
                <i class="bi bi-check-circle-fill text-success me-1"></i> YOU HAVE UNLOCKED COMPLIMENTARY WHITE-GLOVE DELIVERY
              } @else {
                ADD {{ fashionService.formatPrice(fashionService.freeShippingThreshold() - fashionService.cartSubtotal()) }} MORE FOR FREE EXPRESS COURIER
              }
            </span>
            <span class="small text-muted fw-bold">{{ fashionService.freeShippingProgress() }}%</span>
          </div>
          <div class="progress rounded-0" style="height: 4px;">
            <div 
              class="progress-bar bg-dark" 
              role="progressbar" 
              [style.width.%]="fashionService.freeShippingProgress()">
            </div>
          </div>
        </div>

        <!-- Cart Items List (Scrollable) -->
        <div class="cart-items-container flex-grow-1 overflow-auto p-4">
          @if (fashionService.cart().length === 0) {
            <div class="text-center py-5">
              <i class="bi bi-bag-x text-muted display-4 mb-3 d-block"></i>
              <h5 class="font-serif mb-2">Your Bag is Empty</h5>
              <p class="text-muted small mb-4">Discover our runway archives and add timeless pieces.</p>
              <button class="btn-atelier px-4 py-2" (click)="fashionService.toggleCart(false)">
                START EXPLORING
              </button>
            </div>
          } @else {
            <div class="d-flex flex-column gap-3">
              @for (item of fashionService.cart(); track item.id) {
                <div class="cart-item-card p-3 border d-flex gap-3 bg-white">
                  
                  <!-- Thumbnail -->
                  <img [src]="item.selectedColor.image" [alt]="item.product.name" class="cart-item-thumb" />

                  <!-- Information -->
                  <div class="flex-grow-1 overflow-hidden">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                      <h6 class="cart-item-title mb-0 text-truncate font-serif">{{ item.product.name }}</h6>
                      <button class="btn p-0 border-0 text-muted ms-2 small" (click)="fashionService.removeFromCart(item.id)" title="Remove item">
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-2 text-muted small" style="font-size: 0.72rem;">
                      <span>SIZE: <strong class="text-dark">{{ item.selectedSize }}</strong></span>
                      <span>&bull;</span>
                      <span>COLOR: <strong class="text-dark">{{ item.selectedColor.name }}</strong></span>
                    </div>

                    <div class="d-flex align-items-center justify-content-between mt-2">
                      <!-- Quantity Counter -->
                      <div class="item-qty-pill d-flex align-items-center border">
                        <button class="btn btn-sm p-1 border-0" (click)="fashionService.updateCartQuantity(item.id, item.quantity - 1)">
                          <i class="bi bi-dash"></i>
                        </button>
                        <span class="px-2 small fw-semibold">{{ item.quantity }}</span>
                        <button class="btn btn-sm p-1 border-0" (click)="fashionService.updateCartQuantity(item.id, item.quantity + 1)">
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>

                      <strong class="text-dark small">
                        {{ fashionService.formatPrice(item.product.price * item.quantity) }}
                      </strong>
                    </div>

                  </div>

                </div>
              }
            </div>
          }
        </div>

        <!-- Cart Footer / Summary -->
        @if (fashionService.cart().length > 0) {
          <div class="cart-footer p-4 border-top bg-white">
            
            <!-- Privilege Code Input -->
            <div class="coupon-box mb-3">
              @if (fashionService.appliedCoupon(); as coup) {
                <div class="d-flex justify-content-between align-items-center p-2 bg-light border border-success">
                  <span class="small text-success fw-semibold">
                    <i class="bi bi-patch-check-fill me-1"></i> Privilege '{{ coup.code }}' Active (-{{ coup.discountPercent }}%)
                  </span>
                  <button class="btn btn-sm text-muted p-0 border-0" (click)="fashionService.removeCoupon()">
                    <i class="bi bi-x-circle"></i>
                  </button>
                </div>
              } @else {
                <div class="input-group input-group-sm">
                  <input 
                    type="text" 
                    class="form-control rounded-0" 
                    placeholder="Enter Privilege Code (e.g. ATELIER15)"
                    [(ngModel)]="couponInput"
                  />
                  <button class="btn btn-dark rounded-0 px-3 fw-semibold letter-spacing-medium" style="font-size: 0.68rem;" (click)="onApplyCoupon()">
                    APPLY
                  </button>
                </div>
              }
            </div>

            <!-- Cost Calculations -->
            <div class="cost-breakdown small mb-3">
              <div class="d-flex justify-content-between mb-1 text-muted">
                <span>Subtotal</span>
                <span class="text-dark fw-semibold">{{ fashionService.formatPrice(fashionService.cartSubtotal()) }}</span>
              </div>
              
              @if (fashionService.cartDiscount() > 0) {
                <div class="d-flex justify-content-between mb-1 text-success">
                  <span>Privilege Discount</span>
                  <span>-{{ fashionService.formatPrice(fashionService.cartDiscount()) }}</span>
                </div>
              }

              <div class="d-flex justify-content-between mb-2 text-muted">
                <span>White-Glove Shipping</span>
                @if (fashionService.cartShipping() === 0) {
                  <span class="text-success fw-semibold">COMPLIMENTARY</span>
                } @else {
                  <span class="text-dark">{{ fashionService.formatPrice(fashionService.cartShipping()) }}</span>
                }
              </div>

              <div class="d-flex justify-content-between border-top pt-2 fs-6">
                <span class="fw-bold font-serif">Estimated Total</span>
                <strong class="fw-bold fs-5 text-dark">{{ fashionService.formatPrice(fashionService.cartTotal()) }}</strong>
              </div>
            </div>

            <!-- Online Razorpay Checkout Trigger CTA -->
            <button class="btn-atelier w-100 py-3 mb-2 d-flex align-items-center justify-content-center gap-2" (click)="openCheckoutModal()">
              <span>PROCEED TO ONLINE CHECKOUT</span>
              <i class="bi bi-shield-lock-fill"></i>
            </button>

            <!-- WhatsApp Bag Order Button -->
            <a 
              [href]="fashionService.getCartWhatsAppLink()" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-wa-cart w-100 py-2 mb-2 text-decoration-none d-flex align-items-center justify-content-center gap-2 shadow-sm">
              <i class="bi bi-whatsapp"></i>
              <span class="fw-bold letter-spacing-medium" style="font-size: 0.72rem;">ORDER BAG VIA WHATSAPP</span>
            </a>

            <!-- Store Location Note -->
            <div class="p-2 bg-light border text-center small" style="font-size: 0.7rem;">
              <span class="d-block text-dark fw-bold">📍 Store Pickup Available:</span>
              <span class="text-muted">Daposh fashion &bull; D85 shop no 6, Main road, Malviya nagar, New delhi 110017</span>
            </div>

          </div>
        }

      </div>
    }

    <!-- HIGH-FASHION CHECKOUT MODAL (Name, Phone, Email, Address & Razorpay Pay) -->
    @if (checkoutFormModalOpen()) {
      <div class="modal-backdrop-luxury" (click)="closeCheckoutModal()"></div>
      <div class="checkout-form-modal shadow-2xl p-4 p-md-5 bg-white">
        
        <div class="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
          <div>
            <span class="badge-editorial badge-champagne mb-1">CONCIERGE CHECKOUT</span>
            <h4 class="font-serif fw-bold mb-0">Delivery Details & Payment</h4>
          </div>
          <button class="btn p-0 border-0 fs-4 text-dark" (click)="closeCheckoutModal()">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form (ngSubmit)="onProcessBooking()">
          <div class="row g-3">
            
            <!-- Customer Name -->
            <div class="col-12 col-md-6">
              <label class="form-label small fw-bold">Full Name *</label>
              <input 
                type="text" 
                class="form-control rounded-0" 
                placeholder="e.g. Anand Sharma" 
                required 
                [(ngModel)]="customerForm.name" 
                name="name"
              />
            </div>

            <!-- Phone Number -->
            <div class="col-12 col-md-6">
              <label class="form-label small fw-bold">Phone Number (For WhatsApp & Courier updates) *</label>
              <input 
                type="tel" 
                class="form-control rounded-0" 
                placeholder="e.g. +91 98765 43210" 
                required 
                [(ngModel)]="customerForm.phone" 
                name="phone"
              />
            </div>

            <!-- Email -->
            <div class="col-12 col-md-6">
              <label class="form-label small fw-bold">Email Address *</label>
              <input 
                type="email" 
                class="form-control rounded-0" 
                placeholder="e.g. anand@example.com" 
                required 
                [(ngModel)]="customerForm.email" 
                name="email"
              />
            </div>

            <!-- City -->
            <div class="col-12 col-md-6">
              <label class="form-label small fw-bold">City / Town *</label>
              <input 
                type="text" 
                class="form-control rounded-0" 
                placeholder="e.g. New Delhi" 
                required 
                [(ngModel)]="customerForm.city" 
                name="city"
              />
            </div>

            <!-- Street Address -->
            <div class="col-12">
              <label class="form-label small fw-bold">Complete Delivery Street Address *</label>
              <textarea 
                class="form-control rounded-0" 
                rows="2" 
                placeholder="House / Apartment no, Street name, Locality, Landmark" 
                required 
                [(ngModel)]="customerForm.address" 
                name="address">
              </textarea>
            </div>

            <!-- State & Pincode -->
            <div class="col-6">
              <label class="form-label small fw-bold">State</label>
              <input 
                type="text" 
                class="form-control rounded-0" 
                placeholder="e.g. Delhi" 
                [(ngModel)]="customerForm.state" 
                name="state"
              />
            </div>

            <div class="col-6">
              <label class="form-label small fw-bold">PIN Code *</label>
              <input 
                type="text" 
                class="form-control rounded-0 font-monospace" 
                placeholder="110017" 
                required 
                [(ngModel)]="customerForm.pincode" 
                name="pincode"
              />
            </div>

            <!-- Payment Method Choice (Razorpay vs COD) -->
            <div class="col-12 pt-2">
              <label class="form-label small fw-bold d-block mb-2">Select Booking Payment Method *</label>
              <div class="row g-2">
                <div class="col-6">
                  <div 
                    class="payment-option-card p-3 border text-center cursor-pointer"
                    [class.selected]="selectedPaymentMethod === 'razorpay'"
                    (click)="selectedPaymentMethod = 'razorpay'">
                    <i class="bi bi-credit-card-2-front-fill fs-4 d-block mb-1 text-primary"></i>
                    <strong class="d-block small text-dark">Razorpay Online</strong>
                    <span class="text-muted" style="font-size: 0.68rem;">UPI, Cards, Netbanking</span>
                  </div>
                </div>

                <div class="col-6">
                  <div 
                    class="payment-option-card p-3 border text-center cursor-pointer"
                    [class.selected]="selectedPaymentMethod === 'cod'"
                    (click)="selectedPaymentMethod = 'cod'">
                    <i class="bi bi-cash-coin fs-4 d-block mb-1 text-success"></i>
                    <strong class="d-block small text-dark">Cash on Delivery</strong>
                    <span class="text-muted" style="font-size: 0.68rem;">Pay upon white-glove arrival</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Total Price Summary -->
            <div class="col-12 mt-3 p-3 bg-light border d-flex align-items-center justify-content-between">
              <div>
                <span class="small text-muted d-block">Total Payable Amount</span>
                <strong class="fs-4 text-dark font-serif">{{ fashionService.formatPrice(fashionService.cartTotal()) }}</strong>
              </div>
              <span class="badge badge-champagne text-dark fw-bold">Secure 256-Bit SSL</span>
            </div>

            <!-- Submit Button -->
            <div class="col-12 mt-3">
              <button 
                type="submit" 
                class="btn-atelier w-100 py-3 fw-bold letter-spacing-medium"
                [disabled]="isProcessingPayment()">
                @if (isProcessingPayment()) {
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  CONNECTING RAZORPAY GATEWAY...
                } @else if (selectedPaymentMethod === 'razorpay') {
                  <i class="bi bi-lock-fill me-1"></i> PAY {{ fashionService.formatPrice(fashionService.cartTotal()) }} WITH RAZORPAY
                } @else {
                  <i class="bi bi-check-circle-fill me-1"></i> CONFIRM CASH ON DELIVERY ORDER
                }
              </button>
            </div>

          </div>
        </form>

      </div>
    }

    <!-- ORDER BOOKED SUCCESS CONFIRMATION MODAL -->
    @if (checkoutSuccessModalOpen() && confirmedOrder(); as ord) {
      <div class="modal-backdrop-luxury"></div>
      <div class="checkout-success-modal shadow-2xl p-4 p-md-5 text-center bg-white">
        
        <div class="success-icon mb-3">
          <i class="bi bi-check-circle-fill text-success display-3"></i>
        </div>
        <span class="badge-editorial badge-champagne mb-2">ORDER ACQUIRED & BOOKED</span>
        <h3 class="font-serif mb-2">Thank You, {{ ord.customer.name }}!</h3>
        <p class="text-muted small mb-4">
          Your silhouette booking reference <strong>#{{ ord.orderId }}</strong> has been officially confirmed. 
          A confirmation tracking link has been registered with our Malviya Nagar concierge.
        </p>

        <!-- Order Summary Card -->
        <div class="p-3 bg-light border text-start small mb-4">
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Order ID:</span>
            <strong class="font-monospace">{{ ord.orderId }}</strong>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Payment:</span>
            <span class="badge" [ngClass]="ord.paymentStatus === 'paid' ? 'bg-success text-white' : 'bg-warning text-dark'">
              {{ ord.paymentStatus | uppercase }} ({{ ord.paymentMethod | uppercase }})
            </span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Total Charged:</span>
            <strong>{{ fashionService.formatPrice(ord.total) }}</strong>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Delivery To:</span>
            <span class="text-truncate" style="max-width: 220px;">{{ ord.customer.address }}, {{ ord.customer.city }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="text-muted">Courier Tracking:</span>
            <strong class="text-champagne font-monospace">{{ ord.trackingNumber || 'BD-IN-9810293' }}</strong>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex flex-column gap-2">
          <button class="btn btn-dark rounded-0 py-3 fw-bold letter-spacing-medium" (click)="goToTracking(ord.orderId)">
            <i class="bi bi-truck me-2"></i> TRACK THIS ORDER LIVE NOW
          </button>

          <a 
            [href]="fashionService.getWhatsAppLink('Hi! I placed order #' + ord.orderId + ' for total ' + fashionService.formatPrice(ord.total))" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-outline-success rounded-0 py-2 fw-bold small">
            <i class="bi bi-whatsapp me-1"></i> Send Confirmation on WhatsApp
          </a>

          <button class="btn btn-link text-muted small text-decoration-none mt-2" (click)="closeSuccessModal()">
            Return to Store
          </button>
        </div>

      </div>
    }
  `,
  styles: [`
    .cart-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(12, 12, 12, 0.75);
      backdrop-filter: blur(6px);
      z-index: 1070;
    }
    .cart-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 460px;
      height: 100vh;
      background: #faf8f5;
      z-index: 1080;
      animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .shipping-meter-bar {
      background: #f4efe6;
    }
    .cart-item-card {
      border-radius: 2px;
    }
    .cart-item-thumb {
      width: 72px;
      height: 96px;
      object-fit: cover;
    }
    .cart-item-title {
      font-size: 0.88rem;
    }
    .item-qty-pill {
      background: #faf8f5;
      border-radius: 2px;
    }
    .modal-backdrop-luxury {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      z-index: 1090;
    }
    .checkout-form-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 95%;
      max-width: 620px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: 2px;
      z-index: 1095;
      animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .checkout-success-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 520px;
      border-radius: 2px;
      z-index: 1100;
      animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .payment-option-card {
      border-radius: 2px;
      transition: all 0.2s ease;
      background: #fff;
      &:hover {
        border-color: #0c0c0c !important;
      }
      &.selected {
        border-color: #0c0c0c !important;
        background: #faf8f5;
        box-shadow: 0 0 0 1px #0c0c0c;
      }
    }
    .btn-wa-cart {
      background-color: #25D366;
      color: #ffffff;
      border: 1px solid #25D366;
      border-radius: 2px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background-color: #1ebd5a;
        color: #ffffff;
        transform: translateY(-1px);
      }
    }
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .badge-champagne {
      background-color: #dfc8a8;
      color: #0c0c0c;
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes modalScaleUp {
      from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
  `]
})
export class CartDrawerComponent {
  readonly fashionService = inject(FashionService);
  private readonly router = inject(Router);

  couponInput: string = '';
  readonly checkoutFormModalOpen = signal<boolean>(false);
  readonly checkoutSuccessModalOpen = signal<boolean>(false);
  readonly isProcessingPayment = signal<boolean>(false);
  readonly confirmedOrder = signal<OrderRecord | null>(null);

  selectedPaymentMethod: 'razorpay' | 'cod' = 'razorpay';

  customerForm: CustomerDetails = {
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110017'
  };

  onApplyCoupon(): void {
    if (this.couponInput.trim()) {
      this.fashionService.applyCoupon(this.couponInput);
      this.couponInput = '';
    }
  }

  openCheckoutModal(): void {
    this.fashionService.toggleCart(false);
    this.checkoutFormModalOpen.set(true);
  }

  closeCheckoutModal(): void {
    this.checkoutFormModalOpen.set(false);
  }

  closeSuccessModal(): void {
    this.checkoutSuccessModalOpen.set(false);
  }

  goToTracking(orderId: string): void {
    this.checkoutSuccessModalOpen.set(false);
    this.router.navigate(['/track-order'], { queryParams: { id: orderId } });
  }

  /**
   * Dynamically loads Razorpay checkout script if needed
   */
  private loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  /**
   * Process booking via Razorpay or COD
   */
  async onProcessBooking(): Promise<void> {
    if (!this.customerForm.name || !this.customerForm.phone || !this.customerForm.email || !this.customerForm.address || !this.customerForm.pincode) {
      this.fashionService.showToast('Validation Error', 'Please complete all customer delivery fields', 'warning');
      return;
    }

    const orderItems: OrderItem[] = this.fashionService.cart().map(item => ({
      productId: item.product.id || (item.product as any)._id,
      name: item.product.name,
      primaryImage: item.selectedColor.image || item.product.primaryImage,
      selectedColor: { name: item.selectedColor.name, hex: item.selectedColor.hex },
      selectedSize: item.selectedSize,
      quantity: item.quantity,
      price: item.product.price
    }));

    if (this.selectedPaymentMethod === 'cod') {
      this.isProcessingPayment.set(true);
      try {
        const booked = await this.fashionService.createCodOrder({
          customer: this.customerForm,
          items: orderItems,
          subtotal: this.fashionService.cartSubtotal(),
          discount: this.fashionService.cartDiscount(),
          shipping: this.fashionService.cartShipping(),
          total: this.fashionService.cartTotal()
        });

        this.confirmedOrder.set(booked);
        this.fashionService.cart.set([]);
        this.checkoutFormModalOpen.set(false);
        this.checkoutSuccessModalOpen.set(true);
        this.fashionService.showToast('Order Booked', `Order #${booked.orderId} booked via COD`, 'success');
      } catch (err) {
        this.fashionService.showToast('Booking Error', 'Could not book order', 'warning');
      } finally {
        this.isProcessingPayment.set(false);
      }
      return;
    }

    // Razorpay Flow
    this.isProcessingPayment.set(true);
    try {
      await this.loadRazorpayScript();

      // Step 1: Create Razorpay order via backend
      const rzpOrder = await this.fashionService.createRazorpayOrder(this.fashionService.cartTotal());

      // Open standard Razorpay popup only when real credentials and registered order exist
      const isRealOrder = rzpOrder.orderId && !rzpOrder.orderId.startsWith('order_mock_') && !rzpOrder.isMock;
      const isValidKey = rzpOrder.key && rzpOrder.key.startsWith('rzp_') && !rzpOrder.key.includes('DaposhFashion');

      if ((window as any).Razorpay && isRealOrder && isValidKey) {
        const options = {
          key: rzpOrder.key,
          amount: rzpOrder.amount,
          currency: rzpOrder.currency || 'INR',
          name: 'DAPOSH FASHION ATELIER',
          description: 'Haute Runway Order Booking',
          image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=150&q=80',
          order_id: rzpOrder.orderId,
          prefill: {
            name: this.customerForm.name,
            email: this.customerForm.email,
            contact: this.customerForm.phone
          },
          notes: {
            address: `${this.customerForm.address}, ${this.customerForm.city}`
          },
          theme: {
            color: '#0c0c0c'
          },
          handler: async (response: any) => {
            // Step 2: Payment completed, verify on backend and record order
            const booked = await this.fashionService.verifyPaymentAndBookOrder({
              razorpay_order_id: response.razorpay_order_id || rzpOrder.orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer: this.customerForm,
              items: orderItems,
              subtotal: this.fashionService.cartSubtotal(),
              discount: this.fashionService.cartDiscount(),
              shipping: this.fashionService.cartShipping(),
              total: this.fashionService.cartTotal()
            });

            this.confirmedOrder.set(booked);
            this.fashionService.cart.set([]);
            this.checkoutFormModalOpen.set(false);
            this.checkoutSuccessModalOpen.set(true);
            this.fashionService.showToast('Payment Verified', `Order #${booked.orderId} booked successfully!`, 'success');
          },
          modal: {
            ondismiss: () => {
              this.isProcessingPayment.set(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (failRes: any) => {
          this.fashionService.showToast('Payment Failed', failRes.error?.description || 'Transaction unsuccessful', 'warning');
          this.isProcessingPayment.set(false);
        });
        rzp.open();
      } else {
        // Test simulation mode (avoids Razorpay 401 unauthorized error on fake credentials)
        const booked = await this.fashionService.verifyPaymentAndBookOrder({
          razorpay_order_id: rzpOrder.orderId,
          razorpay_payment_id: `pay_test_${Date.now()}`,
          razorpay_signature: 'sig_test_simulation',
          customer: this.customerForm,
          items: orderItems,
          subtotal: this.fashionService.cartSubtotal(),
          discount: this.fashionService.cartDiscount(),
          shipping: this.fashionService.cartShipping(),
          total: this.fashionService.cartTotal()
        });

        this.confirmedOrder.set(booked);
        this.fashionService.cart.set([]);
        this.checkoutFormModalOpen.set(false);
        this.checkoutSuccessModalOpen.set(true);
        this.fashionService.showToast('Order Confirmed', `Order #${booked.orderId} placed successfully (Test Mode)!`, 'success');
      }
    } catch (err) {
      console.error('Razorpay payment flow error:', err);
      this.fashionService.showToast('Payment Error', 'Could not complete payment', 'warning');
    } finally {
      this.isProcessingPayment.set(false);
    }
  }
}
