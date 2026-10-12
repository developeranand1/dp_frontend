import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../../services/fashion.service';

interface HeroSlide {
  id: number;
  seasonBadge: string;
  headline: string;
  subheadline: string;
  description: string;
  categoryTarget: string;
  image: string;
  secondaryImage?: string;
  theme: 'dark' | 'light';
  accentText: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-stage position-relative overflow-hidden">
      <!-- Slide Containers -->
      @for (slide of slides; track slide.id; let idx = $index) {
        <div 
          class="hero-slide" 
          [class.active]="activeSlideIndex() === idx"
          [style.backgroundImage]="'url(' + slide.image + ')'">
          
          <!-- Gradient Editorial Overlays -->
          <div class="hero-overlay"></div>

          <!-- Hero Content Layer -->
          <div class="container h-100 d-flex align-items-center position-relative z-2">
            <div class="row w-100 align-items-center">
              <div class="col-12 col-lg-8 col-xl-7 hero-text-block">
                
                <!-- Badge Tag -->
                <div class="d-inline-flex align-items-center gap-2 mb-3 hero-badge-wrapper animate-item">
                  <span class="badge-dot"></span>
                  <span class="hero-kicker">{{ slide.seasonBadge }}</span>
                  <span class="hero-divider">/</span>
                  <span class="hero-accent">{{ slide.accentText }}</span>
                </div>

                <!-- Editorial Headline (Zara / Mango style) -->
                <h1 class="hero-title mb-3 font-serif animate-item delay-1">
                  {{ slide.headline }}
                </h1>

                <!-- Subheadline -->
                <p class="hero-subtitle mb-4 animate-item delay-2">
                  {{ slide.description }}
                </p>

                <!-- Actions CTA -->
                <div class="d-flex flex-wrap align-items-center gap-3 animate-item delay-3">
                  <button 
                    class="btn-atelier-champagne px-4 py-3" 
                    (click)="onExploreCategory(slide.categoryTarget)">
                    <span>EXPLORE THE COLLECTION</span>
                    <i class="bi bi-arrow-right"></i>
                  </button>
                  <a 
                    [href]="fashionService.getWhatsAppLink()" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn btn-success rounded-0 px-4 py-3 fw-bold letter-spacing-medium text-decoration-none d-flex align-items-center gap-2">
                    <i class="bi bi-whatsapp fs-5"></i>
                    <span>WHATSAPP ORDER</span>
                  </a>
                  <a 
                    [href]="fashionService.storeInfo.instagram" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn btn-outline-light rounded-0 px-3 py-3 fw-semibold letter-spacing-medium text-decoration-none d-flex align-items-center gap-2">
                    <i class="bi bi-instagram"></i>
                    <span>INSTAGRAM</span>
                  </a>
                </div>

              </div>

              <!-- Floating Editorial Detail Card (Desktop only) -->
              <div class="d-none d-lg-block col-lg-4 col-xl-5 ps-xl-5 text-end animate-item delay-2">
                <div class="floating-curation-pill ms-auto p-4 glass-card text-start shadow-2xl">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="badge badge-editorial">ATELIER HIGHLIGHT</span>
                    <span class="text-champagne small fw-semibold">EDITION 0{{ idx + 1 }}/0{{ slides.length }}</span>
                  </div>
                  <h6 class="font-serif mb-1 fs-5 text-dark">Pure Mulberry Silk Charmeuse</h6>
                  <p class="small text-muted mb-3" style="font-size: 0.78rem;">
                    Engineered in limited quantities with artisanal hand-rolled hems and French rouleau straps.
                  </p>
                  <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                    <div>
                      <span class="text-muted small d-block" style="font-size: 0.68rem;">INVESTMENT PIECE</span>
                      <strong class="text-dark">{{ fashionService.formatPrice(26500) }}</strong>
                    </div>
                    <button class="btn btn-sm btn-dark rounded-0 px-3 py-2" (click)="onExploreCategory('Women')">
                      View Piece
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      }

      <!-- Bottom Floating Controls & Pagination -->
      <div class="hero-controls-bar position-absolute bottom-0 start-0 w-100 py-3 z-3">
        <div class="container d-flex align-items-center justify-content-between">
          
          <!-- Slide Progress Indicators -->
          <div class="d-flex align-items-center gap-3">
            @for (s of slides; track s.id; let idx = $index) {
              <button 
                class="slide-indicator-line" 
                [class.active]="activeSlideIndex() === idx"
                (click)="setSlide(idx)"
                [attr.aria-label]="'Go to slide ' + (idx + 1)">
                <span class="progress-fill"></span>
              </button>
            }
          </div>

          <!-- Editorial Ticker Meta -->
          <div class="d-none d-md-flex align-items-center gap-4 text-white-50 small letter-spacing-medium" style="font-size: 0.72rem;">
            <span><i class="bi bi-shield-check text-champagne me-1"></i> AUTHENTIC COUTURE</span>
            <span><i class="bi bi-arrow-repeat text-champagne me-1"></i> COMPLIMENTARY EXCHANGES</span>
            <span><i class="bi bi-gem text-champagne me-1"></i> BESPOKE PACKAGING</span>
          </div>

          <!-- Arrows -->
          <div class="d-flex align-items-center gap-2">
            <button class="hero-nav-arrow" (click)="prevSlide()" aria-label="Previous Campaign Slide">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="hero-nav-arrow" (click)="nextSlide()" aria-label="Next Campaign Slide">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-stage {
      height: 90vh;
      min-height: 640px;
      max-height: 920px;
      background-color: #0c0c0c;
    }
    .hero-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center 25%;
      opacity: 0;
      visibility: hidden;
      transform: scale(1.04);
      transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);

      &.active {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
    }
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg, 
        rgba(10, 10, 10, 0.88) 0%, 
        rgba(10, 10, 10, 0.65) 45%, 
        rgba(10, 10, 10, 0.25) 100%
      );
    }
    .badge-dot {
      width: 7px;
      height: 7px;
      background-color: #c5a880;
      border-radius: 50%;
      display: inline-block;
      animation: pulse 2s infinite;
    }
    .hero-kicker {
      font-size: 0.78rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #dfc8a8;
      font-weight: 600;
    }
    .hero-divider {
      color: rgba(255, 255, 255, 0.3);
      font-size: 0.8rem;
    }
    .hero-accent {
      font-size: 0.75rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.75);
    }
    .hero-title {
      font-size: 3rem;
      font-weight: 400;
      line-height: 1.08;
      color: #ffffff;
      letter-spacing: -0.01em;
      max-width: 720px;

      @media (min-width: 768px) {
        font-size: 4.25rem;
      }
      @media (min-width: 1200px) {
        font-size: 5.2rem;
      }
    }
    .hero-subtitle {
      font-size: 1.05rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 300;
      max-width: 580px;

      @media (min-width: 768px) {
        font-size: 1.2rem;
      }
    }
    .floating-curation-pill {
      max-width: 360px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .hero-controls-bar {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
    }
    .slide-indicator-line {
      width: 48px;
      height: 3px;
      background: rgba(255, 255, 255, 0.25);
      border: none;
      padding: 0;
      position: relative;
      cursor: pointer;
      overflow: hidden;

      .progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        background-color: #c5a880;
        transition: width 0.3s ease;
      }

      &.active {
        width: 72px;
        .progress-fill {
          width: 100%;
        }
      }
    }
    .hero-nav-arrow {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      backdrop-filter: blur(8px);
      transition: all 0.2s ease;

      &:hover {
        background: #c5a880;
        color: #0c0c0c;
        border-color: #c5a880;
      }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
  `]
})
export class HeroSectionComponent {
  readonly fashionService = inject(FashionService);

  readonly slides: HeroSlide[] = [
    {
      id: 1,
      seasonBadge: 'PARIS RUNWAY SS\'26',
      headline: 'The Art of Sculpted Fluidity',
      subheadline: 'Architectural Tailoring & Pure Mulberry Silks',
      description: 'Discover masterfully constructed silhouettes engineered in Como and Biella. Where quiet luxury meets uncompromising modern form.',
      categoryTarget: 'Women',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=88',
      theme: 'dark',
      accentText: 'SPRING/SUMMER 2026'
    },
    {
      id: 2,
      seasonBadge: 'ATELIER EXCLUSIVE CAPSULE',
      headline: 'Monochrome Supremacy',
      subheadline: 'Virgin Wool, Italian Trench & Evening Charmeuse',
      description: 'A curated wardrobe for the modern connoisseur. Precise lines designed to command every room from dawn to late gala.',
      categoryTarget: 'Atelier Studio',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=88',
      theme: 'dark',
      accentText: 'LIMITED EDITION'
    },
    {
      id: 3,
      seasonBadge: 'RIVIERA SPREZZATURA',
      headline: 'Linen, Light & Solitude',
      subheadline: 'Deconstructed Natural Suits & French Flax',
      description: 'Crafted without rigid canvassing for uninhibited movement under Mediterranean sun. Pure ease and sartorial nonchalance.',
      categoryTarget: 'Men',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=88',
      theme: 'dark',
      accentText: 'NORMANDY FLAX'
    }
  ];

  readonly activeSlideIndex = signal<number>(0);
  private timer: any;

  constructor() {
    this.startAutoPlay();
  }

  startAutoPlay(): void {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 6500);
  }

  setSlide(index: number): void {
    clearInterval(this.timer);
    this.activeSlideIndex.set(index);
    this.startAutoPlay();
  }

  nextSlide(): void {
    this.activeSlideIndex.update(curr => (curr + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.activeSlideIndex.update(curr => (curr - 1 + this.slides.length) % this.slides.length);
  }

  onExploreCategory(cat: string): void {
    this.fashionService.setCategory(cat);
    this.scrollToId('catalog-section');
  }

  scrollToId(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

