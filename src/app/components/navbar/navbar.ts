import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- Top Announcement Bar / High-Fashion Ticker -->
    <div class="announcement-bar py-1 px-3 text-center">
      <div class="container-fluid d-flex align-items-center justify-content-between">
        
        <!-- Left Link to Track Order -->
        <div class="d-none d-md-flex align-items-center gap-2">
          <a routerLink="/track-order" class="text-white-50 text-decoration-none small d-flex align-items-center gap-1 top-social-link">
            <i class="bi bi-truck text-champagne"></i>
            <span style="font-size: 0.68rem; font-weight: 600;">TRACK ORDER</span>
          </a>
          <span class="text-white-50 opacity-50">&bull;</span>
          <a routerLink="/admin" class="text-white-50 text-decoration-none small d-flex align-items-center gap-1 top-social-link">
            <i class="bi bi-shield-lock-fill text-champagne"></i>
            <span style="font-size: 0.68rem; font-weight: 600;">ADMIN PANEL</span>
          </a>
        </div>

        <!-- Center Ticker -->
        <div class="ticker-content mx-auto text-uppercase text-white small" style="font-size: 0.72rem; letter-spacing: 0.15em;">
          <span class="fw-semibold text-champagne">{{ announcements[currentAnnouncement()] }}</span>
        </div>

        <!-- Top Right Social & Contact Actions -->
        <div class="d-none d-md-flex align-items-center gap-3">
          <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="text-white-50 text-decoration-none small d-flex align-items-center gap-1 top-social-link" title="Instagram: @daposhfashion">
            <i class="bi bi-instagram text-champagne"></i>
            <span style="font-size: 0.68rem;">INSTAGRAM</span>
          </a>
          <span class="text-white-50 opacity-50">&bull;</span>
          <a [href]="fashionService.getWhatsAppLink()" target="_blank" rel="noopener noreferrer" class="text-white-50 text-decoration-none small d-flex align-items-center gap-1 top-social-link" title="WhatsApp: +91 85955 72121">
            <i class="bi bi-whatsapp text-success"></i>
            <span style="font-size: 0.68rem;">WHATSAPP ONLY</span>
          </a>
          <span class="text-white-50 opacity-50">&bull;</span>
          <a [href]="fashionService.storeInfo.phoneTel" class="text-white-50 text-decoration-none small d-flex align-items-center gap-1 top-social-link" title="Call Us: +91 85955 72121">
            <i class="bi bi-telephone-fill text-champagne"></i>
            <span style="font-size: 0.68rem;">CALL</span>
          </a>
          <span class="text-white-50 opacity-50">&bull;</span>

        
        </div>
      </div>
    </div>

    <!-- Main Sticky Luxury Header -->
    <header class="glass-header sticky-top">
      <div class="container-fluid px-3 px-lg-5">
        <div class="d-flex align-items-center justify-content-between header-row py-3">
          
          <!-- Mobile Menu Toggle Button (Left on Mobile) -->
          <div class="d-flex d-lg-none align-items-center gap-2">
            <button class="btn p-0 border-0 fs-4 text-dark" (click)="fashionService.toggleMobileMenu(true)" aria-label="Open navigation menu">
              <i class="bi bi-list"></i>
            </button>
          </div>

          <!-- Desktop Navigation Links (Left on Desktop) -->
          <nav class="d-none d-lg-flex align-items-center gap-3 gap-xl-4">
            <a 
              routerLink="/" 
              class="nav-atelier-link text-decoration-none" 
              (click)="onSelectCategory('All')">
              COLLECTION
            </a>
            <a 
              routerLink="/" 
              class="nav-atelier-link text-decoration-none" 
              (click)="onSelectCategory('Women')">
              WOMEN
            </a>
            <a 
              routerLink="/" 
              class="nav-atelier-link text-decoration-none" 
              (click)="onSelectCategory('Men')">
              MEN
            </a>
          
            <a 
              routerLink="/contact" 
              routerLinkActive="active"
              class="nav-atelier-link text-decoration-none">
              CONTACT
            </a>
            
            
            <a 
              routerLink="/track-order" 
              routerLinkActive="active"
              class="nav-atelier-link text-decoration-none d-flex align-items-center gap-1">
              <i class="bi bi-truck text-muted"></i>
              <span>TRACK ORDER</span>
            </a>
            
          </nav>

          <!-- Center Brand Wordmark & Official Seal Logo -->
          <div class="brand-center text-center">
            <a routerLink="/" class="brand-logo text-decoration-none d-flex align-items-center justify-content-center gap-2 gap-md-3" (click)="onBrandClick()">
              <img 
                src="assets/images/daposh-logo.png" 
                alt="Daposh Fashion Official Logo" 
                class="brand-badge-img"
              />
              <div class="brand-text-block text-start d-flex flex-column justify-content-center">
                <h1 class="brand-title mb-0">DAPOSH FASHION</h1>
                <span class="brand-subtitle">EVENT STYLING &bull; ATELIER</span>
              </div>
            </a>
          </div>

          <!-- Right Action Icons -->
          <div class="d-flex align-items-center gap-3 gap-lg-4">
       
            <!-- <div class="position-relative d-none d-lg-block">
              <div class="search-input-pill d-flex align-items-center px-3 py-1">
                <i class="bi bi-search text-muted me-2" style="font-size: 0.85rem;"></i>
                <input 
                  type="text" 
                  class="border-0 bg-transparent text-dark search-box"
                  placeholder="Search silk, blazers, coats..." 
                  [(ngModel)]="searchKeyword"
                  (input)="onSearchInput()"
                  (focus)="searchDropdownOpen.set(true)"
                />
                @if (searchKeyword) {
                  <button class="btn p-0 border-0 text-muted ms-1" (click)="clearSearch()">
                    <i class="bi bi-x"></i>
                  </button>
                }
              </div>

         
              @if (searchDropdownOpen() && searchKeyword.trim().length > 1) {
                <div class="search-results-dropdown shadow-lg rounded-0 p-3">
                  <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <span class="small fw-semibold letter-spacing-medium text-muted" style="font-size: 0.68rem;">SUGGESTED CREATIONS</span>
                    <button class="btn p-0 border-0 text-muted small" (click)="searchDropdownOpen.set(false)">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                  @if (searchResults().length === 0) {
                    <p class="small text-muted mb-0 py-2">No matching silhouettes found.</p>
                  } @else {
                    <div class="search-results-list">
                      @for (p of searchResults(); track p.id) {
                        <div class="search-item d-flex align-items-center p-2 gap-3" (click)="selectSearchResult(p)">
                          <img [src]="p.primaryImage" [alt]="p.name" class="search-thumb" />
                          <div class="flex-grow-1 overflow-hidden">
                            <h6 class="search-name mb-0 text-truncate">{{ p.name }}</h6>
                            <span class="search-price text-champagne">{{ fashionService.formatPrice(p.price) }}</span>
                          </div>
                          <span class="badge badge-editorial" style="font-size: 0.6rem;">{{ p.subCategory }}</span>
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div> -->

            <!-- Wishlist Button -->
            <button 
              class="btn-icon-action position-relative" 
              (click)="fashionService.toggleWishlistDrawer(true)"
              aria-label="Wishlist">
              <i class="bi bi-heart"></i>
              @if (fashionService.wishlistCount() > 0) {
                <span class="action-count-badge">{{ fashionService.wishlistCount() }}</span>
              }
            </button>

            <!-- WhatsApp Header Direct Button -->
            <a 
              [href]="fashionService.getWhatsAppLink()" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-whatsapp-header d-none d-lg-inline-flex align-items-center gap-2 text-decoration-none"
              title="Chat / Order on WhatsApp (+91 85955 72121)">
              <i class="bi bi-whatsapp"></i>
              <!-- <span class="small fw-bold letter-spacing-medium" style="font-size: 0.7rem;"></span> -->
            </a>

            <!-- Cart Bag Button -->
            <button 
              class="btn-bag-action d-flex align-items-center gap-2" 
              (click)="fashionService.toggleCart(true)"
              aria-label="Shopping Bag">
              <div class="position-relative">
                <i class="bi bi-bag"></i>
                @if (fashionService.cartCount() > 0) {
                  <span class="action-count-badge">{{ fashionService.cartCount() }}</span>
                }
              </div>
              <span class="d-none d-xl-inline small fw-semibold letter-spacing-medium" style="font-size: 0.72rem;">
                BAG
              </span>
            </button>

          </div>
        </div>
      </div>
    </header>

    <!-- Offcanvas Mobile Navigation Menu -->
    @if (fashionService.isMobileMenuOpen()) {
      <div class="mobile-drawer-backdrop" (click)="fashionService.toggleMobileMenu(false)"></div>
      <div class="mobile-drawer shadow-lg">
        <div class="p-4 d-flex justify-content-between align-items-center border-bottom">
          <div class="d-flex align-items-center gap-2">
            <img 
              src="assets/images/daposh-logo.png" 
              alt="Daposh Fashion Logo" 
              class="rounded-circle shadow-sm"
              style="width: 42px; height: 42px; object-fit: cover; border: 1.5px solid rgba(0,0,0,0.15);"
            />
            <div>
              <h5 class="font-serif mb-0 letter-spacing-loose">DAPOSH FASHION</h5>
              <small class="text-muted letter-spacing-medium" style="font-size: 0.65rem;">EVENT STYLING &bull; NEW DELHI</small>
            </div>
          </div>
          <button class="btn p-0 border-0 fs-3 text-dark" (click)="fashionService.toggleMobileMenu(false)">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="p-4 d-flex flex-column gap-2 overflow-auto flex-grow-1">
          <!-- Prominent Address & Quick Connect Card in Drawer -->
          <div class="mobile-boutique-card p-3 mb-2 bg-dark text-white rounded-1 border border-champagne">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge badge-champagne text-dark fw-bold" style="font-size: 0.65rem;">STORE LOCATION</span>
              <span class="small text-champagne" style="font-size: 0.7rem;"><i class="bi bi-geo-alt-fill"></i> New Delhi</span>
            </div>
            <h6 class="fw-bold mb-1 font-serif text-white fs-6">Daposh fashion</h6>
            <p class="small text-white-50 mb-2" style="font-size: 0.78rem; line-height: 1.4;">
              <strong>D85 shop no 6</strong><br/>
              <strong>Main road, Malviya nagar</strong><br/>
              <strong>New delhi 110017</strong>
            </p>
            <div class="d-flex flex-wrap gap-2 pt-1 border-top border-secondary border-opacity-50">
              <a [href]="fashionService.storeInfo.gpsLocation" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-light rounded-0 flex-grow-1" style="font-size: 0.7rem;">
                <i class="bi bi-pin-map-fill me-1 text-champagne"></i> GPS Map
              </a>
              <a [href]="fashionService.getWhatsAppLink()" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success rounded-0 flex-grow-1" style="font-size: 0.7rem;">
                <i class="bi bi-whatsapp me-1"></i> WhatsApp
              </a>
            </div>
          </div>

          <!-- Quick Navigation Links -->
          <a routerLink="/" class="mobile-nav-item py-2" (click)="onMobileCategory('All')">
            <span class="fw-bold">ALL COLLECTIONS</span>
            <i class="bi bi-arrow-right"></i>
          </a>
          <a routerLink="/" class="mobile-nav-item py-2" (click)="onMobileCategory('Women')">
            <span>WOMEN'S ATELIER</span>
            <i class="bi bi-arrow-right"></i>
          </a>
          <a routerLink="/" class="mobile-nav-item py-2" (click)="onMobileCategory('Men')">
            <span>MEN'S TAILORING</span>
            <i class="bi bi-arrow-right"></i>
          </a>

          <hr class="my-2 border-secondary opacity-25" />

          <!-- Maison Information & Concierge Links -->
          <a routerLink="/about" class="mobile-nav-item py-2 text-decoration-none" (click)="fashionService.toggleMobileMenu(false)">
            <span><i class="bi bi-bank me-2 text-champagne"></i> ABOUT MAISON & HERITAGE</span>
            <i class="bi bi-arrow-right"></i>
          </a>
          <a routerLink="/contact" class="mobile-nav-item py-2 text-decoration-none" (click)="fashionService.toggleMobileMenu(false)">
            <span><i class="bi bi-envelope-paper-heart me-2 text-champagne"></i> CONTACT & INQUIRIES</span>
            <i class="bi bi-arrow-right"></i>
          </a>
          <a routerLink="/faq" class="mobile-nav-item py-2 text-decoration-none" (click)="fashionService.toggleMobileMenu(false)">
            <span><i class="bi bi-question-circle me-2 text-champagne"></i> FAQ & CLIENT HELP</span>
            <i class="bi bi-arrow-right"></i>
          </a>
          <a routerLink="/returns" class="mobile-nav-item py-2 text-decoration-none" (click)="fashionService.toggleMobileMenu(false)">
            <span><i class="bi bi-arrow-repeat me-2 text-champagne"></i> RETURN & REFUND POLICY</span>
            <i class="bi bi-arrow-right"></i>
          </a>

          <hr class="my-2 border-secondary opacity-25" />

          <!-- Track Order Link in Drawer -->
          <a routerLink="/track-order" class="mobile-nav-item py-2 text-decoration-none" (click)="fashionService.toggleMobileMenu(false)">
            <span class="fw-bold text-dark"><i class="bi bi-truck me-2 text-champagne"></i> TRACK ORDER STATUS</span>
            <i class="bi bi-arrow-right"></i>
          </a>

          <!-- Admin Panel Link in Drawer -->
          <a routerLink="/admin" class="mobile-nav-item py-2 text-decoration-none" (click)="fashionService.toggleMobileMenu(false)">
            <span class="fw-bold text-dark"><i class="bi bi-shield-lock me-2 text-champagne"></i> ADMIN CONTROL PANEL</span>
            <i class="bi bi-arrow-right"></i>
          </a>

          <hr class="my-2 border-secondary opacity-25" />

          <!-- Instagram Feature in Mobile Drawer -->
          <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="mobile-nav-item text-start border-0 bg-transparent py-2 text-decoration-none">
            <span class="text-danger fw-bold"><i class="bi bi-instagram me-1"></i> INSTAGRAM: @daposhfashion</span>
            <i class="bi bi-arrow-up-right text-muted"></i>
          </a>
          <small class="text-muted d-block ps-1" style="font-size: 0.68rem; margin-top: -6px;">For any collection choose from Instagram</small>

        </div>

        <div class="p-3 mt-auto bg-light border-top">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <a [href]="fashionService.storeInfo.phoneTel" class="text-dark small text-decoration-none fw-bold">
              <i class="bi bi-telephone-fill me-1 text-success"></i> +91 85955 72121
            </a>
            <span class="badge bg-success text-white small">WhatsApp Active</span>
          </div>
          <small class="text-muted d-block" style="font-size: 0.68rem;">D85 shop no 6, Main road, Malviya nagar, New delhi 110017</small>
        </div>
      </div>
    }
  `,
  styles: [`
    .announcement-bar {
      background-color: #0c0c0c;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .header-row {
      min-height: 72px;
    }
    .brand-logo {
      transition: transform 0.25s ease, opacity 0.2s ease;
      cursor: pointer;

      &:hover {
        opacity: 0.95;
        .brand-badge-img {
          transform: scale(1.06) rotate(1deg);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
        }
      }
    }
    .brand-badge-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid rgba(12, 12, 12, 0.12);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.14);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      flex-shrink: 0;
      background: #0c0c0c;
    }
    .brand-title {
      font-size: 1.35rem;
      letter-spacing: 0.22em;
      font-weight: 900;
      color: #0c0c0c;
      line-height: 1.1;
      transition: color 0.2s;
    }
    .brand-subtitle {
      font-size: 0.62rem;
      letter-spacing: 0.22em;
      font-weight: 700;
      color: #666;
      text-transform: uppercase;
      line-height: 1;
      margin-top: 3px;
    }
    @media (max-width: 991px) {
      .brand-badge-img {
        width: 40px;
        height: 40px;
      }
      .brand-title {
        font-size: 1.05rem;
        letter-spacing: 0.16em;
      }
      .brand-subtitle {
        font-size: 0.52rem;
        letter-spacing: 0.16em;
      }
    }
    @media (max-width: 575px) {
      .brand-badge-img {
        width: 36px;
        height: 36px;
      }
      .brand-title {
        font-size: 0.92rem;
        letter-spacing: 0.1em;
      }
      .brand-subtitle {
        display: none;
      }
    }
    .nav-atelier-link {
      background: none;
      border: none;
      font-size: 0.74rem;
      letter-spacing: 0.16em;
      font-weight: 600;
      text-transform: uppercase;
      color: #1a1a1a;
      cursor: pointer;
      padding: 0.5rem 0;
      position: relative;
      transition: color 0.2s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1.5px;
        background-color: #0c0c0c;
        transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      &:hover {
        color: #000;
        &::after { width: 100%; }
      }

      &.active {
        color: #0c0c0c;
        font-weight: 700;
        &::after { width: 100%; }
      }
    }
    .search-input-pill {
      background: rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 40px;
      transition: all 0.2s ease;
      width: 240px;

      &:focus-within {
        background: #fff;
        border-color: #0c0c0c;
        box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        width: 290px;
      }
    }
    .search-box {
      font-size: 0.78rem;
      width: 100%;
      outline: none;
    }
    .search-results-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 380px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      z-index: 1050;
    }
    .search-thumb {
      width: 44px;
      height: 56px;
      object-fit: cover;
    }
    .search-item {
      cursor: pointer;
      border-radius: 2px;
      transition: background 0.15s;
      &:hover {
        background: #f6f3ee;
      }
    }
    .search-name {
      font-size: 0.8rem;
      font-weight: 600;
    }
    .search-price {
      font-size: 0.76rem;
      font-weight: 600;
    }
    .btn-icon-action {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: #0c0c0c;
      padding: 0.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
    .btn-bag-action {
      background: #0c0c0c;
      color: #ffffff;
      border: 1px solid #0c0c0c;
      padding: 0.45rem 1rem;
      cursor: pointer;
      border-radius: 0;
      transition: all 0.2s ease;

      &:hover {
        background: #222;
        border-color: #222;
        transform: translateY(-1px);
      }
    }
    .action-count-badge {
      position: absolute;
      top: -6px;
      right: -8px;
      background-color: #c5a880;
      color: #0c0c0c;
      font-size: 0.62rem;
      font-weight: 700;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .mobile-drawer-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 1099;
    }
    .mobile-drawer {
      position: fixed;
      top: 0;
      left: 0;
      width: 85%;
      max-width: 360px;
      height: 100vh;
      background: #ffffff;
      z-index: 1100;
      display: flex;
      flex-direction: column;
      animation: slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mobile-nav-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.88rem;
      letter-spacing: 0.12em;
      font-weight: 600;
      color: #111;
      text-decoration: none;
      transition: padding-left 0.2s;
      &:hover {
        padding-left: 6px;
        color: #c5a880;
      }
    }
    .btn-whatsapp-header {
      background: #25D366;
      color: #ffffff;
      padding: 0.38rem 0.85rem;
      border-radius: 999px;
      font-weight: 700;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(37, 211, 102, 0.25);

      &:hover {
        background: #1ebd5a;
        color: #ffffff;
        transform: translateY(-1px);
      }
    }
    @keyframes slideInLeft {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `]
})
export class NavbarComponent {
  readonly fashionService = inject(FashionService);
  private readonly router = inject(Router);

  readonly announcements = [
    '📍 DAPOSH FASHION: D85 shop no 6, Main road, Malviya nagar, New delhi 110017',
    '📸 FOR ANY COLLECTION CHOOSE FROM INSTAGRAM: @daposhfashion',
    '💬 WHATSAPP ONLY: +91 85955 72121 • DIRECT ORDERS & HOME DELIVERY',
    '✨ SS26 RUNWAY COUTURE NOW IN STORE • CALL +91 85955 72121'
  ];
  readonly currentAnnouncement = signal<number>(0);
  searchKeyword: string = '';
  readonly searchDropdownOpen = signal<boolean>(false);

  constructor() {
    setInterval(() => {
      this.currentAnnouncement.update(i => (i + 1) % this.announcements.length);
    }, 4000);
  }

  searchResults() {
    if (!this.searchKeyword.trim()) return [];
    const q = this.searchKeyword.toLowerCase();
    return this.fashionService.products().filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.subCategory || '').toLowerCase().includes(q) ||
      (p.mood || '').toLowerCase().includes(q)
    ).slice(0, 4);
  }

  onSearchInput(): void {
    this.fashionService.setSearchQuery(this.searchKeyword);
    this.searchDropdownOpen.set(true);
  }

  clearSearch(): void {
    this.searchKeyword = '';
    this.fashionService.setSearchQuery('');
    this.searchDropdownOpen.set(false);
  }

  selectSearchResult(product: any): void {
    this.searchDropdownOpen.set(false);
    this.fashionService.openQuickView(product);
  }

  onSelectCategory(cat: string): void {
    this.fashionService.setCategory(cat);
  }

  onMobileCategory(cat: string): void {
    this.fashionService.setCategory(cat);
    this.fashionService.toggleMobileMenu(false);
  }

  onBrandClick(): void {
    this.fashionService.resetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
