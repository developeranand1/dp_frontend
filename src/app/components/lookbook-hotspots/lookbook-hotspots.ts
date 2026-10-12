import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../../services/fashion.service';
import { LookbookStory, LookbookHotspot, Product } from '../../models/fashion.model';

@Component({
  selector: 'app-lookbook-hotspots',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="lookbook-section" class="lookbook-section py-5 position-relative text-white">
      <div class="container-fluid px-3 px-lg-5">
        
        <!-- Section Header -->
        <div class="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
          <div>
            <span class="section-kicker text-champagne">EDITORIAL CAMPAIGN</span>
            <h2 class="section-title text-white mb-1">Shop The Runway Look</h2>
            <p class="text-white-50 mb-0" style="font-size: 0.9rem; font-weight: 300;">
              Click interactive runway pins to inspect and acquire complete head-to-toe styling.
            </p>
          </div>
          
          <!-- Campaign Switcher Pills -->
          <div class="d-flex align-items-center gap-2 mt-3 mt-md-0">
            @for (story of fashionService.lookbooks(); track story.id; let idx = $index) {
              <button 
                class="campaign-tab-btn"
                [class.active]="activeStoryIndex() === idx"
                (click)="setStory(idx)">
                {{ story.season }}
              </button>
            }
          </div>
        </div>

        @if (currentStory(); as story) {
          <div class="row g-4 align-items-center">
            
            <!-- Left: Interactive Hotspot Image Canvas -->
            <div class="col-12 col-lg-7 col-xl-8">
              <div class="lookbook-canvas position-relative overflow-hidden shadow-2xl">
                <img [src]="story.coverImage" [alt]="story.title" class="lookbook-image w-100" />
                <div class="lookbook-gradient-overlay"></div>

                <!-- Hotspot Pulsing Pins -->
                @for (hs of story.hotspots; track hs.id) {
                  <div 
                    class="hotspot-pin-wrapper position-absolute"
                    [style.left.%]="hs.xPercent"
                    [style.top.%]="hs.yPercent">
                    
                    <button 
                      class="hotspot-pin-button"
                      [class.pin-active]="activeHotspot()?.id === hs.id"
                      (click)="selectHotspot(hs)"
                      [attr.aria-label]="'Inspect ' + hs.title">
                      <span class="pin-ring"></span>
                      <i class="bi bi-plus-lg"></i>
                    </button>

                    <!-- Tooltip Pill on Hover / Select -->
                    <div class="hotspot-tag-pill" [class.show-pill]="activeHotspot()?.id === hs.id">
                      <span class="tag-title">{{ hs.title }}</span>
                      <span class="tag-price text-champagne">{{ fashionService.formatPrice(hs.price) }}</span>
                    </div>

                  </div>
                }

                <!-- Corner Tag -->
                <div class="position-absolute bottom-0 start-0 m-4 z-2">
                  <span class="badge badge-editorial badge-champagne mb-1">{{ story.subtitle }}</span>
                  <h3 class="font-serif mb-0 fs-2 text-white">{{ story.title }}</h3>
                </div>
              </div>
            </div>

            <!-- Right: Inspected Silhouette Detail Card -->
            <div class="col-12 col-lg-5 col-xl-4">
              <div class="story-detail-panel p-4 glass-card-dark text-white">
                <span class="text-champagne small fw-semibold letter-spacing-medium d-block mb-1">
                  DIRECTOR'S STYLING NOTES
                </span>
                <p class="small text-white-50 mb-4" style="line-height: 1.6;">
                  {{ story.description }}
                </p>

                <!-- Currently Selected Hotspot Item Card -->
                @if (selectedProduct(); as prod) {
                  <div class="inspected-product-box p-3 border border-secondary border-opacity-50">
                    <div class="d-flex align-items-center gap-3 mb-3">
                      <img [src]="prod.primaryImage" [alt]="prod.name" class="inspected-thumb" />
                      <div>
                        <span class="badge badge-editorial mb-1">{{ prod.subCategory }}</span>
                        <h5 class="font-serif mb-1 fs-6">{{ prod.name }}</h5>
                        <strong class="text-champagne">{{ fashionService.formatPrice(prod.price) }}</strong>
                      </div>
                    </div>

                    <p class="small text-white-50 mb-3" style="font-size: 0.78rem;">
                      {{ prod.subtitle }}
                    </p>

                    <div class="d-flex align-items-center gap-2">
                      <button class="btn-atelier-champagne flex-grow-1 py-2 text-center" (click)="fashionService.openQuickView(prod)">
                        <span>INSPECT SILHOUETTE</span>
                      </button>
                      <button 
                        class="btn btn-outline-light rounded-0 py-2 px-3" 
                        (click)="fashionService.toggleWishlist(prod)"
                        title="Save to Wishlist">
                        <i class="bi" [ngClass]="fashionService.isInWishlist(prod.id) ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
                      </button>
                    </div>
                  </div>
                } @else {
                  <div class="text-center py-4 border border-secondary border-opacity-25 p-3">
                    <i class="bi bi-cursor-fill text-champagne fs-3 mb-2 d-block"></i>
                    <p class="small text-white-50 mb-0">Select any circular pin on the lookbook image to inspect its garment details.</p>
                  </div>
                }

                <!-- Quick Lookbook items reel -->
                <div class="mt-4 pt-3 border-top border-secondary border-opacity-25">
                  <span class="small letter-spacing-medium text-white-50 d-block mb-2" style="font-size: 0.68rem;">
                    ENSEMBLE COMPONENTS
                  </span>
                  <div class="d-flex gap-2 overflow-auto pb-2">
                    @for (pid of story.featuredProductIds; track pid) {
                      @if (getProductById(pid); as p) {
                        <div class="ensemble-chip d-flex align-items-center gap-2 p-1 pe-2 cursor-pointer" (click)="fashionService.openQuickView(p)">
                          <img [src]="p.primaryImage" [alt]="p.name" class="chip-img" />
                          <div class="text-truncate" style="max-width: 110px;">
                            <span class="d-block small text-truncate" style="font-size: 0.7rem;">{{ p.name }}</span>
                            <span class="text-champagne small" style="font-size: 0.68rem;">{{ fashionService.formatPrice(p.price) }}</span>
                          </div>
                        </div>
                      }
                    }
                  </div>
                </div>

              </div>
            </div>

          </div>
        }

      </div>
    </section>
  `,
  styles: [`
    .lookbook-section {
      background-color: #101010;
    }
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .campaign-tab-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #bbb;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 0.4rem 1rem;
      cursor: pointer;
      border-radius: 40px;
      transition: all 0.2s ease;

      &:hover {
        color: #fff;
        border-color: #fff;
      }

      &.active {
        background: #dfc8a8;
        color: #0c0c0c;
        border-color: #dfc8a8;
        font-weight: 700;
      }
    }
    .lookbook-canvas {
      aspect-ratio: 16 / 10;
      border-radius: 2px;
      position: relative;
    }
    .lookbook-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .lookbook-gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
      pointer-events: none;
    }
    .hotspot-pin-wrapper {
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    .hotspot-pin-button {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(14, 14, 14, 0.85);
      border: 2px solid #dfc8a8;
      color: #dfc8a8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: all 0.25s ease;

      &:hover, &.pin-active {
        background: #dfc8a8;
        color: #0c0c0c;
        transform: scale(1.15);
      }
    }
    .pin-ring {
      position: absolute;
      top: -6px;
      left: -6px;
      width: calc(100% + 12px);
      height: calc(100% + 12px);
      border-radius: 50%;
      border: 1.5px solid #dfc8a8;
      animation: pinPulse 2s infinite;
      pointer-events: none;
    }
    .hotspot-tag-pill {
      position: absolute;
      left: calc(100% + 12px);
      top: 50%;
      transform: translateY(-50%);
      background: rgba(12, 12, 12, 0.95);
      border: 1px solid rgba(223, 200, 168, 0.4);
      padding: 0.35rem 0.75rem;
      white-space: nowrap;
      border-radius: 2px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      pointer-events: none;

      &.show-pill {
        opacity: 1;
        visibility: visible;
      }
    }
    .tag-title {
      display: block;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
    }
    .tag-price {
      font-size: 0.72rem;
      font-weight: 600;
    }
    .glass-card-dark {
      background: rgba(22, 22, 22, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(14px);
    }
    .inspected-thumb {
      width: 54px;
      height: 70px;
      object-fit: cover;
    }
    .ensemble-chip {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      flex-shrink: 0;
      transition: background 0.15s;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
      }
    }
    .chip-img {
      width: 32px;
      height: 42px;
      object-fit: cover;
    }
    .cursor-pointer {
      cursor: pointer;
    }
    @keyframes pinPulse {
      0% { transform: scale(0.9); opacity: 0.9; }
      100% { transform: scale(1.6); opacity: 0; }
    }
  `]
})
export class LookbookHotspotsComponent {
  readonly fashionService = inject(FashionService);

  readonly activeStoryIndex = signal<number>(0);
  readonly activeHotspot = signal<LookbookHotspot | null>(null);

  constructor() {
    // Default select first hotspot of first story
    const firstStory = this.fashionService.lookbooks()[0];
    if (firstStory && firstStory.hotspots.length > 0) {
      this.activeHotspot.set(firstStory.hotspots[0]);
    }
  }

  currentStory(): LookbookStory | undefined {
    return this.fashionService.lookbooks()[this.activeStoryIndex()];
  }

  setStory(index: number): void {
    this.activeStoryIndex.set(index);
    const story = this.fashionService.lookbooks()[index];
    if (story && story.hotspots.length > 0) {
      this.activeHotspot.set(story.hotspots[0]);
    } else {
      this.activeHotspot.set(null);
    }
  }

  selectHotspot(hs: LookbookHotspot): void {
    this.activeHotspot.set(hs);
  }

  selectedProduct(): Product | undefined {
    const hs = this.activeHotspot();
    if (!hs) return undefined;
    return this.fashionService.products().find(p => p.id === hs.productId);
  }

  getProductById(id: string): Product | undefined {
    return this.fashionService.products().find(p => p.id === id);
  }
}

