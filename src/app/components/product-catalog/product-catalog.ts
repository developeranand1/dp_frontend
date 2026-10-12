import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FashionService } from '../../services/fashion.service';
import { Product, ColorVariant, SizeOption } from '../../models/fashion.model';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="catalog-section" class="catalog-section py-5 position-relative">
      <div class="container-fluid px-3 px-lg-5">

        <!-- Section Title & Meta Count -->
        <div class="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between mb-4">
          <div>
            <span class="section-kicker">CURATED SILHOUETTES</span>
            <h2 class="section-title mb-0">The Atelier Catalog</h2>
          </div>
          <div class="text-md-end mt-2 mt-md-0">
            <span class="text-muted small letter-spacing-medium" style="font-size: 0.75rem;">
              SHOWING <strong class="text-dark">{{ fashionService.filteredProducts().length }}</strong> OF {{ fashionService.products().length }} CREATIONS
            </span>
          </div>
        </div>

        <!-- Instagram Collection Highlight Banner Strip -->
        <div class="instagram-catalog-banner p-3 p-md-4 mb-4 bg-dark text-white rounded-1 border border-champagne d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 shadow-sm">
          <div class="d-flex align-items-center gap-3">
            <div class="insta-icon-circle bg-danger text-white rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-instagram fs-4"></i>
            </div>
            <div>
              <span class="badge badge-champagne text-dark fw-bold mb-1" style="font-size: 0.65rem;">EXCLUSIVE ARCHIVES</span>
              <h5 class="font-serif mb-1 text-white fs-5 fw-bold">For any collection choose from Instagram: <span class="text-champagne">@daposhfashion</span></h5>
              <p class="small text-white-50 mb-0" style="font-size: 0.8rem;">
                Browse our real-time daily couture drops, lookbook reels & stories on Instagram. Send a screenshot on WhatsApp for instant orders & bespoke tailoring!
              </p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-light rounded-0 px-3 py-2 fw-semibold letter-spacing-medium" style="font-size: 0.72rem;">
              <i class="bi bi-instagram me-1"></i> VIEW INSTAGRAM
            </a>
            <a [href]="fashionService.getWhatsAppLink('Hi Daposh fashion! I saw a piece on your Instagram @daposhfashion and want to inquire about availability.')" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success rounded-0 px-3 py-2 fw-semibold letter-spacing-medium" style="font-size: 0.72rem;">
              <i class="bi bi-whatsapp me-1"></i> INQUIRE VIA WHATSAPP
            </a>
          </div>
        </div>

        <!-- Filter Controls Bar (Zara & Mango minimalist styling) -->
        <div class="catalog-filter-bar mb-4 pb-3 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3">
          
          <!-- Category Tabs -->
          <div class="d-flex flex-wrap align-items-center gap-1 gap-md-2">
            @for (cat of categories; track cat) {
              <button 
                class="category-tab-btn" 
                [class.active]="fashionService.filter().category === cat"
                (click)="setCategory(cat)">
                {{ cat }}
              </button>
            }
          </div>

          <!-- Right Sorting and Layout Controls -->
          <div class="d-flex align-items-center gap-3 ms-auto">
            
            <!-- Sort Dropdown -->
            <div class="d-flex align-items-center gap-2">
              <span class="d-none d-sm-inline small text-muted letter-spacing-medium" style="font-size: 0.7rem;">SORT BY:</span>
              <select 
                class="form-select form-select-sm sort-select border-0 bg-transparent fw-semibold" 
                [(ngModel)]="activeSort" 
                (ngModelChange)="onSortChange($event)">
                <option value="recommended">Featured / Editorial</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <!-- Grid Columns Switcher (Zara style) -->
            <div class="d-none d-lg-flex align-items-center border-start ps-3 gap-1">
              <button 
                class="btn-grid-toggle" 
                [class.active]="gridColumns() === 2" 
                (click)="gridColumns.set(2)" 
                title="2 Large Columns (Editorial View)">
                <i class="bi bi-grid-fill"></i>
              </button>
              <button 
                class="btn-grid-toggle" 
                [class.active]="gridColumns() === 3" 
                (click)="gridColumns.set(3)" 
                title="3 Columns">
                <i class="bi bi-grid-3x3-gap-fill"></i>
              </button>
              <button 
                class="btn-grid-toggle" 
                [class.active]="gridColumns() === 4" 
                (click)="gridColumns.set(4)" 
                title="4 Compact Columns">
                <i class="bi bi-grid-3x2-gap-fill"></i>
              </button>
            </div>

          </div>
        </div>

        <!-- Active Filter Tags / Pills Bar -->
        @if (hasActiveFilters()) {
          <div class="active-filters-strip mb-4 d-flex flex-wrap align-items-center gap-2">
            <span class="small text-muted letter-spacing-medium me-1" style="font-size: 0.7rem;">FILTERED BY:</span>
            
            @if (fashionService.filter().category !== 'All') {
              <span class="filter-pill">
                Category: {{ fashionService.filter().category }}
                <i class="bi bi-x ms-1 cursor-pointer" (click)="fashionService.setCategory('All')"></i>
              </span>
            }

            @if (fashionService.filter().mood !== 'All') {
              <span class="filter-pill">
                Mood: {{ fashionService.filter().mood }}
                <i class="bi bi-x ms-1 cursor-pointer" (click)="fashionService.setMood('All')"></i>
              </span>
            }

            @if (fashionService.filter().searchQuery) {
              <span class="filter-pill">
                Query: "{{ fashionService.filter().searchQuery }}"
                <i class="bi bi-x ms-1 cursor-pointer" (click)="fashionService.setSearchQuery('')"></i>
              </span>
            }

            <button class="btn btn-sm btn-link text-dark text-decoration-underline p-0 ms-2 small letter-spacing-medium" (click)="resetAllFilters()">
              CLEAR ALL
            </button>
          </div>
        }

        <!-- Product Grid -->
        @if (fashionService.filteredProducts().length === 0) {
          <div class="empty-catalog text-center py-5 my-5">
            <div class="empty-icon mb-3 text-muted">
              <i class="bi bi-search display-4"></i>
            </div>
            <h4 class="font-serif mb-2">No Matching Silhouettes Found</h4>
            <p class="text-muted small mb-4">We could not find any creations matching your selected criteria.</p>
            <button class="btn-atelier px-4 py-2" (click)="resetAllFilters()">
              RESET ALL CRITERIA
            </button>
          </div>
        } @else {
          <div class="row g-3 g-lg-4" [ngClass]="getGridRowClasses()">
            @for (product of fashionService.filteredProducts(); track product.id) {
              <div class="col product-col">
                <div class="product-editorial-card position-relative">
                  
                  <!-- Card Image Frame -->
                  <div class="product-media-container position-relative overflow-hidden">
                    
                    <!-- Primary & Secondary Image -->
                    <img 
                      [src]="getActiveImage(product)" 
                      [alt]="product.name" 
                      class="product-primary-img" 
                    />
                    <img 
                      [src]="product.secondaryImage" 
                      [alt]="product.name + ' Alternate View'" 
                      class="product-secondary-img" 
                    />

                    <!-- Badges -->
                    <div class="product-badge-group position-absolute top-0 start-0 m-3 d-flex flex-column gap-1 z-2">
                      @if (product.badge) {
                        <span class="badge-editorial fw-bold" [class.badge-champagne]="product.badge.includes('Silk') || product.badge.includes('Cashmere')">
                          {{ product.badge }}
                        </span>
                      }
                      @if (product.discountPercent) {
                        <span class="badge-editorial badge-sale fw-bold">
                          -{{ product.discountPercent }}%
                        </span>
                      }
                    </div>

                    <!-- Top Right Action Cluster: Wishlist & Direct WhatsApp -->
                    <div class="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2 z-2">
                      <!-- Wishlist Floating Heart Button -->
                      <button 
                        class="btn-wishlist-float"
                        [class.in-wishlist]="fashionService.isInWishlist(product.id)"
                        (click)="onToggleWishlist($event, product)"
                        [attr.aria-label]="fashionService.isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'">
                        <i class="bi" [ngClass]="fashionService.isInWishlist(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
                      </button>

                      <!-- Floating Quick WhatsApp Button on Card -->
                      <a 
                        [href]="fashionService.getProductWhatsAppLink(product, selectedColorForProduct(product.id)?.name)"
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="btn-whatsapp-float"
                        (click)="$event.stopPropagation()"
                        title="Quick WhatsApp Inquiry">
                        <i class="bi bi-whatsapp"></i>
                      </a>
                    </div>

                    <!-- Quick View Overlay Button -->
                    <button 
                      class="btn-quick-view position-absolute start-50 translate-middle-x z-2"
                      (click)="fashionService.openQuickView(product)">
                      <i class="bi bi-eye me-1"></i> QUICK VIEW
                    </button>

                    <!-- Quick Size Selector Drawer (Slides up inside card) -->
                    <div class="quick-add-sizes-drawer position-absolute bottom-0 start-0 w-100 p-2 z-3 text-center">
                      <span class="quick-add-title d-block mb-1">SELECT SIZE TO ADD</span>
                      <div class="d-flex justify-content-center flex-wrap gap-1">
                        @for (sz of product.sizes; track sz.size) {
                          <button 
                            class="size-pill-btn" 
                            [disabled]="!sz.inStock"
                            [class.out-of-stock]="!sz.inStock"
                            (click)="onQuickAdd(product, sz.size)">
                            {{ sz.size }}
                          </button>
                        }
                      </div>
                    </div>

                  </div>

                  <!-- Product Information Details -->
                  <div class="product-info-block pt-3">
                    
                    <!-- Color Swatches & Mood -->
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <div class="d-flex align-items-center gap-1">
                        @for (col of product.colorVariants; track col.name) {
                          <button 
                            class="color-swatch-dot"
                            [style.backgroundColor]="col.hex"
                            [class.active-swatch]="selectedColorForProduct(product.id)?.name === col.name"
                            (click)="selectColor(product.id, col)"
                            [title]="col.name">
                          </button>
                        }
                      </div>
                      <span class="product-mood-tag text-muted fw-semibold">{{ product.mood }}</span>
                    </div>

                    <!-- Title & Subtitle (Bold) -->
                    <h3 class="product-title mb-1 fw-bold" (click)="fashionService.openQuickView(product)">
                      {{ product.name }}
                    </h3>
                    <p class="product-subtitle mb-2 text-muted text-truncate">{{ product.subtitle }}</p>

                    <!-- Pricing & Rating (Bold) -->
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <div class="d-flex align-items-baseline gap-2">
                        <span class="product-price fw-bold text-dark fs-6">
                          {{ fashionService.formatPrice(product.price) }}
                        </span>
                        @if (product.originalPrice) {
                          <span class="product-original-price text-muted text-decoration-line-through small">
                            {{ fashionService.formatPrice(product.originalPrice) }}
                          </span>
                        }
                      </div>
                      <div class="d-flex align-items-center small text-muted fw-semibold">
                        <i class="bi bi-star-fill text-warning me-1" style="font-size: 0.72rem;"></i>
                        <span style="font-size: 0.75rem;">{{ product.rating }} ({{ product.reviewCount }})</span>
                      </div>
                    </div>

                    <!-- Dedicated WhatsApp Order & Call Action Buttons on Every Product -->
                    <div class="product-card-actions pt-2 border-top d-flex align-items-center gap-2">
                      <a 
                        [href]="fashionService.getProductWhatsAppLink(product, selectedColorForProduct(product.id)?.name)" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="btn-product-wa-order flex-grow-1 text-decoration-none d-flex align-items-center justify-content-center gap-1 py-2 px-2"
                        title="Order this product directly on WhatsApp">
                        <i class="bi bi-whatsapp"></i>
                        <span class="wa-btn-text">WHATSAPP ORDER</span>
                      </a>
                      <a 
                        [href]="fashionService.storeInfo.phoneTel" 
                        class="btn-product-call-icon text-decoration-none d-flex align-items-center justify-content-center py-2 px-2"
                        title="Call Daposh Fashion (+91 85955 72121)">
                        <i class="bi bi-telephone-fill"></i>
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            }
          </div>
        }

      </div>
    </section>
  `,
  styles: [`
    .catalog-section {
      background-color: #faf8f5;
    }
    .category-tab-btn {
      background: transparent;
      border: 1px solid transparent;
      padding: 0.45rem 1.15rem;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #555;
      cursor: pointer;
      border-radius: 40px;
      transition: all 0.2s ease;

      &:hover {
        color: #000;
        background: rgba(0, 0, 0, 0.05);
      }

      &.active {
        background: #0c0c0c;
        color: #fff;
        border-color: #0c0c0c;
      }
    }
    .sort-select {
      font-size: 0.78rem;
      cursor: pointer;
      outline: none;
      box-shadow: none;
    }
    .btn-grid-toggle {
      background: none;
      border: none;
      color: #999;
      font-size: 1.1rem;
      padding: 0.2rem 0.4rem;
      cursor: pointer;
      transition: color 0.2s;

      &:hover, &.active {
        color: #0c0c0c;
      }
    }
    .filter-pill {
      display: inline-flex;
      align-items: center;
      background: #eae6df;
      color: #222;
      font-size: 0.72rem;
      padding: 0.25rem 0.65rem;
      border-radius: 20px;
      font-weight: 500;
    }
    .cursor-pointer {
      cursor: pointer;
    }
    .product-editorial-card {
      transition: transform 0.3s ease;
    }
    .product-media-container {
      aspect-ratio: 3 / 4;
      background-color: #f0ebe1;
      border-radius: 2px;
      cursor: pointer;

      .product-primary-img, .product-secondary-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
      }

      .product-secondary-img {
        opacity: 0;
      }

      &:hover {
        .product-primary-img {
          opacity: 0;
        }
        .product-secondary-img {
          opacity: 1;
          transform: scale(1.04);
        }
        .btn-quick-view {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        .quick-add-sizes-drawer {
          transform: translateY(0);
        }
      }
    }
    .btn-wishlist-float {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.12);
        background: #fff;
      }

      &.in-wishlist {
        background: #fff;
        border-color: rgba(239, 68, 68, 0.2);
      }
    }
    .btn-quick-view {
      bottom: 60px;
      background: rgba(14, 14, 14, 0.88);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      padding: 0.5rem 1.25rem;
      border-radius: 0;
      backdrop-filter: blur(8px);
      cursor: pointer;
      opacity: 0;
      transform: translate(-50%, 10px);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;

      &:hover {
        background: #000;
        color: #dfc8a8;
      }
    }
    .quick-add-sizes-drawer {
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      transform: translateY(100%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .quick-add-title {
      font-size: 0.62rem;
      letter-spacing: 0.16em;
      color: #666;
      font-weight: 600;
      text-transform: uppercase;
    }
    .size-pill-btn {
      background: #faf8f5;
      border: 1px solid #dcd7ce;
      color: #111;
      font-size: 0.68rem;
      font-weight: 600;
      padding: 0.2rem 0.55rem;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.15s;

      &:hover:not(:disabled) {
        background: #0c0c0c;
        color: #fff;
        border-color: #0c0c0c;
      }

      &.out-of-stock {
        opacity: 0.4;
        text-decoration: line-through;
        cursor: not-allowed;
      }
    }
    .color-swatch-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;
      padding: 0;
      transition: transform 0.15s;

      &:hover {
        transform: scale(1.2);
      }

      &.active-swatch {
        outline: 1.5px solid #0c0c0c;
        outline-offset: 2px;
      }
    }
    .product-mood-tag {
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .product-title {
      font-size: 0.92rem;
      font-weight: 600;
      line-height: 1.3;
      color: #0c0c0c;
      cursor: pointer;
      transition: color 0.15s;

      &:hover {
        color: #c5a880;
      }
    }
    .product-subtitle {
      font-size: 0.78rem;
      font-weight: 300;
    }
    .product-price {
      font-size: 0.98rem;
      letter-spacing: -0.01em;
    }
    .btn-whatsapp-float {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #25D366;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
      box-shadow: 0 4px 10px rgba(37, 211, 102, 0.4);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;

      &:hover {
        transform: scale(1.12);
        background: #1ebd5a;
        color: #ffffff;
      }
    }
    .btn-product-wa-order {
      background-color: #25D366;
      color: #ffffff;
      border: 1px solid #25D366;
      border-radius: 2px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(37, 211, 102, 0.25);

      &:hover {
        background-color: #1ebd5a;
        border-color: #1ebd5a;
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 4px 10px rgba(37, 211, 102, 0.35);
      }
    }
    .btn-product-call-icon {
      background-color: #0c0c0c;
      color: #ffffff;
      border: 1px solid #0c0c0c;
      border-radius: 2px;
      width: 36px;
      height: 34px;
      font-size: 0.85rem;
      transition: all 0.2s ease;

      &:hover {
        background-color: #333333;
        border-color: #333333;
        color: #dfc8a8;
        transform: translateY(-1px);
      }
    }
    .wa-btn-text {
      white-space: nowrap;
    }
    .instagram-catalog-banner {
      background: linear-gradient(135deg, #141414 0%, #1f1a17 100%) !important;
      border: 1px solid #dfc8a8 !important;
    }
    .insta-icon-circle {
      width: 48px;
      height: 48px;
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
      flex-shrink: 0;
    }
    .text-champagne {
      color: #dfc8a8 !important;
    }
  `]
})
export class ProductCatalogComponent {
  readonly fashionService = inject(FashionService);

  readonly categories = ['All', 'Women', 'Men', 'Atelier Studio', 'Accessories', 'Footwear'];
  readonly gridColumns = signal<number>(4);
  activeSort: string = 'recommended';

  // Local map to track selected color swatch per product
  private selectedColors = new Map<string, ColorVariant>();

  getGridRowClasses(): string {
    switch (this.gridColumns()) {
      case 2:
        return 'row-cols-1 row-cols-md-2';
      case 3:
        return 'row-cols-1 row-cols-sm-2 row-cols-lg-3';
      default:
        return 'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4';
    }
  }

  setCategory(cat: string): void {
    this.fashionService.setCategory(cat);
  }

  onSortChange(newSort: any): void {
    this.fashionService.setSortOption(newSort);
  }

  hasActiveFilters(): boolean {
    const f = this.fashionService.filter();
    return f.category !== 'All' || f.mood !== 'All' || !!f.searchQuery;
  }

  resetAllFilters(): void {
    this.fashionService.resetFilters();
  }

  selectColor(productId: string, color: ColorVariant): void {
    this.selectedColors.set(productId, color);
  }

  selectedColorForProduct(productId: string): ColorVariant | undefined {
    return this.selectedColors.get(productId);
  }

  getActiveImage(product: Product): string {
    const color = this.selectedColors.get(product.id);
    return color ? color.image : product.primaryImage;
  }

  onToggleWishlist(event: Event, product: Product): void {
    event.stopPropagation();
    this.fashionService.toggleWishlist(product);
  }

  onQuickAdd(product: Product, size: string): void {
    const color = this.selectedColors.get(product.id) || product.colorVariants[0];
    this.fashionService.addToCart(product, color, size, 1);
  }
}

