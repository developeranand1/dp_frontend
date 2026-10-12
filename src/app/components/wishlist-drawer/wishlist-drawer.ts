import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-wishlist-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (fashionService.isWishlistOpen()) {
      <div class="wishlist-backdrop" (click)="fashionService.toggleWishlistDrawer(false)"></div>

      <div class="wishlist-drawer shadow-2xl d-flex flex-column">
        
        <!-- Header -->
        <div class="p-4 border-bottom d-flex align-items-center justify-content-between bg-white">
          <div>
            <h5 class="font-serif mb-0 fs-5 letter-spacing-medium">SAVED ARCHIVES</h5>
            <small class="text-muted letter-spacing-medium" style="font-size: 0.68rem;">
              {{ fashionService.wishlistCount() }} {{ fashionService.wishlistCount() === 1 ? 'FAVORITE' : 'FAVORITES' }}
            </small>
          </div>
          <button class="btn p-0 border-0 fs-4 text-dark" (click)="fashionService.toggleWishlistDrawer(false)" aria-label="Close Wishlist">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Wishlist Items -->
        <div class="wishlist-items-container flex-grow-1 overflow-auto p-4">
          @if (fashionService.wishlist().length === 0) {
            <div class="text-center py-5">
              <i class="bi bi-heart text-muted display-4 mb-3 d-block"></i>
              <h5 class="font-serif mb-2">No Favorites Saved</h5>
              <p class="text-muted small mb-4">Click the heart icon on any silhouette to curate your private wardrobe.</p>
              <button class="btn-atelier px-4 py-2" (click)="fashionService.toggleWishlistDrawer(false)">
                EXPLORE CATALOG
              </button>
            </div>
          } @else {
            <div class="d-flex flex-column gap-3">
              @for (prod of fashionService.wishlist(); track prod.id) {
                <div class="wishlist-card p-3 border d-flex gap-3 bg-white">
                  <img [src]="prod.primaryImage" [alt]="prod.name" class="wishlist-thumb" />

                  <div class="flex-grow-1 overflow-hidden">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                      <h6 class="wishlist-title mb-0 text-truncate font-serif">{{ prod.name }}</h6>
                      <button class="btn p-0 border-0 text-muted ms-2 small" (click)="fashionService.toggleWishlist(prod)">
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </div>

                    <p class="small text-muted mb-2 text-truncate" style="font-size: 0.75rem;">
                      {{ prod.subtitle }}
                    </p>

                    <div class="d-flex align-items-center justify-content-between mt-2">
                      <strong class="text-dark small">
                        {{ fashionService.formatPrice(prod.price) }}
                      </strong>

                      <button class="btn-atelier-champagne btn-sm px-3 py-1" (click)="fashionService.moveWishlistToCart(prod)">
                        <i class="bi bi-bag-plus me-1"></i> MOVE TO BAG
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <!-- Footer -->
        @if (fashionService.wishlist().length > 0) {
          <div class="p-4 border-top bg-white">
            <button class="btn-atelier w-100 py-3" (click)="moveAllToCart()">
              <span>MOVE ALL TO ATELIER BAG</span>
            </button>
          </div>
        }

      </div>
    }
  `,
  styles: [`
    .wishlist-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(12, 12, 12, 0.75);
      backdrop-filter: blur(6px);
      z-index: 1070;
    }
    .wishlist-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 440px;
      height: 100vh;
      background: #faf8f5;
      z-index: 1080;
      animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .wishlist-thumb {
      width: 70px;
      height: 92px;
      object-fit: cover;
    }
    .wishlist-title {
      font-size: 0.88rem;
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
  `]
})
export class WishlistDrawerComponent {
  readonly fashionService = inject(FashionService);

  moveAllToCart(): void {
    const list = [...this.fashionService.wishlist()];
    for (const item of list) {
      this.fashionService.moveWishlistToCart(item);
    }
    this.fashionService.toggleWishlistDrawer(false);
  }
}

