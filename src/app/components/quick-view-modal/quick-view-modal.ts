import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../../services/fashion.service';
import { Product, ColorVariant } from '../../models/fashion.model';

@Component({
  selector: 'app-quick-view-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (fashionService.quickViewProduct(); as product) {
      <div class="modal-backdrop-luxury" (click)="fashionService.closeQuickView()"></div>
      
      <div class="quick-view-modal-container">
        <div class="quick-view-dialog shadow-2xl">
          
          <!-- Close Button -->
          <button class="btn-modal-close" (click)="fashionService.closeQuickView()" aria-label="Close dialog">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="row g-0 modal-body-row">
            
            <!-- Left: Gallery Showcase -->
            <div class="col-12 col-md-6 quick-gallery-col">
              <div class="gallery-wrapper position-relative h-100">
                <img [src]="activeImage()" [alt]="product.name" class="main-gallery-img" />
                
                <!-- Gallery Thumbnails Strip -->
                <div class="thumbnail-strip p-3 d-flex gap-2 position-absolute bottom-0 start-0 w-100">
                  @for (img of product.galleryImages; track img) {
                    <button 
                      class="thumb-btn"
                      [class.active-thumb]="activeImage() === img"
                      (click)="activeImage.set(img)">
                      <img [src]="img" [alt]="product.name + ' thumb'" />
                    </button>
                  }
                </div>
              </div>
            </div>

            <!-- Right: Product Specifications & Actions -->
            <div class="col-12 col-md-6 quick-details-col">
              
              <!-- Badges -->
              <div class="d-flex align-items-center gap-2 mb-2">
                @if (product.badge) {
                  <span class="badge-editorial badge-champagne">{{ product.badge }}</span>
                }
                <span class="badge badge-editorial">{{ product.mood }}</span>
              </div>

              <!-- Title & Pricing -->
              <h2 class="quick-title font-serif mb-1">{{ product.name }}</h2>
              <p class="quick-sub text-muted mb-3">{{ product.subtitle }}</p>

              <div class="d-flex align-items-baseline gap-3 mb-4 pb-3 border-bottom">
                <span class="quick-price fw-bold fs-4 text-dark">
                  {{ fashionService.formatPrice(product.price) }}
                </span>
                @if (product.originalPrice) {
                  <span class="text-muted text-decoration-line-through">
                    {{ fashionService.formatPrice(product.originalPrice) }}
                  </span>
                  <span class="text-danger small fw-semibold">-{{ product.discountPercent }}%</span>
                }
              </div>

              <!-- Color Variant Selector -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="small letter-spacing-medium fw-semibold" style="font-size: 0.72rem;">
                    COLOR: <span class="text-muted">{{ selectedColor()?.name }}</span>
                  </span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  @for (col of product.colorVariants; track col.name) {
                    <button 
                      class="swatch-picker-btn"
                      [style.backgroundColor]="col.hex"
                      [class.active]="selectedColor()?.name === col.name"
                      (click)="onPickColor(col)"
                      [title]="col.name">
                    </button>
                  }
                </div>
              </div>

              <!-- Size Selector & Size Guide -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="small letter-spacing-medium fw-semibold" style="font-size: 0.72rem;">
                    SIZE: <span class="text-dark">{{ selectedSize() }}</span>
                  </span>
                  <button class="btn btn-link p-0 text-dark small text-decoration-underline" style="font-size: 0.72rem;" (click)="showSizeGuide.update(v => !v)">
                    <i class="bi bi-rulers me-1"></i>Size Guide
                  </button>
                </div>

                @if (showSizeGuide()) {
                  <div class="size-guide-box p-3 mb-3 bg-light border small">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <strong class="letter-spacing-medium" style="font-size: 0.7rem;">ATELIER FIT MEASUREMENTS (CM)</strong>
                      <i class="bi bi-x cursor-pointer" (click)="showSizeGuide.set(false)"></i>
                    </div>
                    <table class="table table-sm table-borderless mb-0" style="font-size: 0.72rem;">
                      <thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr></thead>
                      <tbody>
                        <tr><td>XS (34)</td><td>82-85</td><td>62-65</td><td>88-91</td></tr>
                        <tr><td>S (36)</td><td>86-89</td><td>66-69</td><td>92-95</td></tr>
                        <tr><td>M (38)</td><td>90-94</td><td>70-74</td><td>96-100</td></tr>
                        <tr><td>L (40)</td><td>95-99</td><td>75-79</td><td>101-105</td></tr>
                      </tbody>
                    </table>
                  </div>
                }

                <div class="d-flex flex-wrap gap-2">
                  @for (sz of product.sizes; track sz.size) {
                    <button 
                      class="size-choice-btn"
                      [disabled]="!sz.inStock"
                      [class.active]="selectedSize() === sz.size"
                      (click)="selectedSize.set(sz.size)">
                      {{ sz.size }}
                      @if (!sz.inStock) {
                        <span class="sold-out-bar"></span>
                      }
                    </button>
                  }
                </div>
              </div>

              <!-- Quantity & Bag Action -->
              <div class="d-flex align-items-center gap-2 mb-3">
                <div class="quantity-control d-flex align-items-center border">
                  <button class="btn btn-sm p-2 border-0" (click)="decrementQty()" [disabled]="quantity() <= 1">
                    <i class="bi bi-dash"></i>
                  </button>
                  <span class="px-3 fw-semibold small">{{ quantity() }}</span>
                  <button class="btn btn-sm p-2 border-0" (click)="incrementQty()">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>

                <button class="btn-atelier flex-grow-1 py-3" (click)="onAddToCart(product)">
                  <i class="bi bi-bag me-1"></i> ADD TO ATELIER BAG
                </button>

                <button 
                  class="btn-wishlist-modal py-3 px-3" 
                  [class.text-danger]="fashionService.isInWishlist(product.id)"
                  (click)="fashionService.toggleWishlist(product)">
                  <i class="bi" [ngClass]="fashionService.isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
                </button>
              </div>

              <!-- Direct WhatsApp Order & Call Actions (User Request) -->
              <div class="d-flex align-items-center gap-2 mb-4">
                <a 
                  [href]="fashionService.getProductWhatsAppLink(product, selectedColor()?.name, selectedSize())" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-wa-modal flex-grow-1 text-decoration-none d-flex align-items-center justify-content-center gap-2 py-3 px-3 shadow-sm">
                  <i class="bi bi-whatsapp fs-5"></i>
                  <span class="fw-bold letter-spacing-medium" style="font-size: 0.76rem;">ORDER VIA WHATSAPP</span>
                </a>

                <a 
                  [href]="fashionService.storeInfo.phoneTel" 
                  class="btn-call-modal text-decoration-none d-flex align-items-center justify-content-center py-3 px-3 shadow-sm"
                  title="Call Daposh Fashion (+91 85955 72121)">
                  <i class="bi bi-telephone-fill me-1"></i>
                  <span class="fw-semibold d-none d-sm-inline" style="font-size: 0.74rem;">CALL NOW</span>
                </a>
              </div>

              <!-- Official Boutique Location Card -->
              <div class="modal-store-strip p-3 mb-4 bg-white border border-champagne rounded-1">
                <div class="d-flex align-items-start justify-content-between gap-2">
                  <div>
                    <span class="badge badge-champagne text-dark fw-bold mb-1" style="font-size: 0.62rem;">FLAGSHIP BOUTIQUE</span>
                    <h6 class="fw-bold mb-0 font-serif fs-6">Daposh fashion</h6>
                    <p class="small text-muted mb-0" style="font-size: 0.75rem;">
                      <strong>D85 shop no 6, Main road, Malviya nagar, New delhi 110017</strong>
                    </p>
                    <span class="small text-success fw-semibold" style="font-size: 0.72rem;">
                      <i class="bi bi-check-circle-fill me-1"></i> WhatsApp Only: +91 85955 72121
                    </span>
                  </div>
                  <a [href]="fashionService.storeInfo.gpsLocation" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-dark rounded-0 px-2 py-1 text-nowrap" style="font-size: 0.7rem;">
                    <i class="bi bi-geo-alt-fill text-champagne me-1"></i> GPS Map
                  </a>
                </div>
              </div>

              <!-- Product Details Accordion Tabs -->
              <div class="details-tab-list border-top pt-3">
                <div class="mb-3">
                  <h6 class="small fw-bold letter-spacing-medium mb-1">FABRIC & CRAFTSMANSHIP</h6>
                  <p class="small text-muted mb-0">{{ product.fabricComposition }}</p>
                </div>
                <div class="mb-3">
                  <h6 class="small fw-bold letter-spacing-medium mb-1">MODEL & FIT</h6>
                  <p class="small text-muted mb-0">{{ product.modelSpecs }}</p>
                </div>
                <div class="mb-3">
                  <h6 class="small fw-bold letter-spacing-medium mb-1">GARMENT CARE</h6>
                  <p class="small text-muted mb-0">{{ product.careInstructions }}</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop-luxury {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(12, 12, 12, 0.78);
      backdrop-filter: blur(8px);
      z-index: 1060;
    }
    .quick-view-modal-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 94%;
      max-width: 1080px;
      height: 88vh;
      max-height: 88vh;
      z-index: 1070;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .quick-view-dialog {
      background: #faf8f5;
      border-radius: 4px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      max-height: 100%;
      position: relative;
      display: flex;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
    }
    .btn-modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(0, 0, 0, 0.12);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1090;
      transition: all 0.2s;

      &:hover {
        background: #0c0c0c;
        color: #fff;
        transform: rotate(90deg);
      }
    }
    .modal-body-row {
      width: 100%;
      height: 100%;
      margin: 0;
    }
    .quick-gallery-col {
      background-color: #f0ebe1;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    .gallery-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .main-gallery-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .thumbnail-strip {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
      z-index: 2;
    }
    .thumb-btn {
      width: 48px;
      height: 64px;
      padding: 0;
      border: 1.5px solid transparent;
      background: none;
      cursor: pointer;
      border-radius: 2px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.active-thumb {
        border-color: #dfc8a8;
      }
    }
    .quick-details-col {
      height: 100%;
      max-height: 100%;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      padding: 2.25rem 2.25rem 4rem 2.25rem;
    }
    .quick-details-col::-webkit-scrollbar {
      width: 6px;
    }
    .quick-details-col::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.04);
    }
    .quick-details-col::-webkit-scrollbar-thumb {
      background: #dfc8a8;
      border-radius: 4px;
    }
    .quick-details-col::-webkit-scrollbar-thumb:hover {
      background: #c5a880;
    }
    .quick-title {
      font-size: 1.65rem;
      font-weight: 700;
      color: #0c0c0c;
      line-height: 1.25;
    }
    .quick-sub {
      font-size: 0.85rem;
      font-weight: 300;
    }
    .swatch-picker-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: transform 0.2s;

      &:hover { transform: scale(1.15); }
      &.active {
        outline: 2px solid #0c0c0c;
        outline-offset: 2.5px;
      }
    }
    .size-choice-btn {
      min-width: 44px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #dcd7ce;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      position: relative;
      transition: all 0.2s;

      &:hover:not(:disabled) {
        border-color: #0c0c0c;
      }

      &.active {
        background: #0c0c0c;
        color: #ffffff;
        border-color: #0c0c0c;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
    .sold-out-bar {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 80%;
      height: 1px;
      background: #999;
      transform: rotate(-30deg);
    }
    .btn-wishlist-modal {
      background: #ffffff;
      border: 1px solid #dcd7ce;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: #0c0c0c;
      }
    }
    .btn-wa-modal {
      background-color: #25D366;
      color: #ffffff;
      border: 1px solid #25D366;
      border-radius: 2px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background-color: #1ebd5a;
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);
      }
    }
    .btn-call-modal {
      background-color: #0c0c0c;
      color: #ffffff;
      border: 1px solid #0c0c0c;
      border-radius: 2px;
      transition: all 0.2s ease;

      &:hover {
        background-color: #333333;
        color: #dfc8a8;
        transform: translateY(-1px);
      }
    }
    .modal-store-strip {
      border: 1.5px solid #dfc8a8 !important;
      background: #faf7f2 !important;
    }
    .border-champagne {
      border-color: #dfc8a8 !important;
    }
    .badge-champagne {
      background-color: #dfc8a8;
      color: #0c0c0c;
    }
    @keyframes modalScaleUp {
      from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }

    /* Mobile Responsive Optimizations */
    @media (max-width: 767.98px) {
      .quick-view-modal-container {
        width: 95%;
        height: 94vh;
        max-height: 94vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .quick-view-dialog {
        height: 100%;
        max-height: 100%;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        display: block;
      }
      .modal-body-row {
        height: auto !important;
        display: flex;
        flex-direction: column;
      }
      .quick-gallery-col {
        height: 280px !important;
        min-height: 280px !important;
        max-height: 280px !important;
        flex-shrink: 0;
      }
      .quick-details-col {
        height: auto !important;
        max-height: none !important;
        overflow-y: visible !important;
        padding: 1.25rem 1.25rem 4rem 1.25rem !important;
      }
      .btn-modal-close {
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      .quick-title {
        font-size: 1.35rem !important;
      }
      .thumbnail-strip {
        padding: 0.5rem !important;
      }
      .thumb-btn {
        width: 40px;
        height: 54px;
      }
    }
  `]
})
export class QuickViewModalComponent {
  readonly fashionService = inject(FashionService);

  readonly activeImage = signal<string>('');
  readonly selectedColor = signal<ColorVariant | null>(null);
  readonly selectedSize = signal<string>('');
  readonly quantity = signal<number>(1);
  readonly showSizeGuide = signal<boolean>(false);

  constructor() {
    effect(() => {
      const prod = this.fashionService.quickViewProduct();
      if (prod) {
        this.activeImage.set(prod.primaryImage);
        this.selectedColor.set(prod.colorVariants[0]);
        const avail = prod.sizes.find(s => s.inStock)?.size || prod.sizes[0]?.size;
        this.selectedSize.set(avail);
        this.quantity.set(1);
      }
    });
  }

  onPickColor(color: ColorVariant): void {
    this.selectedColor.set(color);
    this.activeImage.set(color.image);
  }

  incrementQty(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQty(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  onAddToCart(product: Product): void {
    const color = this.selectedColor() || product.colorVariants[0];
    const size = this.selectedSize() || product.sizes[0].size;
    this.fashionService.addToCart(product, color, size, this.quantity());
    this.fashionService.closeQuickView();
  }
}

