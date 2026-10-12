import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section';
import { VibeExplorerComponent } from '../../components/vibe-explorer/vibe-explorer';
import { ProductCatalogComponent } from '../../components/product-catalog/product-catalog';
import { LookbookHotspotsComponent } from '../../components/lookbook-hotspots/lookbook-hotspots';
import { AtelierCapsuleComponent } from '../../components/atelier-capsule/atelier-capsule';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    VibeExplorerComponent,
    ProductCatalogComponent,
    LookbookHotspotsComponent,
    AtelierCapsuleComponent
  ],
  template: `
    <!-- Runway Campaign Hero Carousel -->
    <app-hero-section></app-hero-section>

    <!-- Curated Moods & Aesthetics Explorer -->
    <app-vibe-explorer></app-vibe-explorer>

    <!-- Interactive Product Catalog -->
    <app-product-catalog></app-product-catalog>

    <!-- Instagram Runway Banner Spotlight -->
    <section class="instagram-runway-spotlight py-5 text-white position-relative overflow-hidden" style="background: linear-gradient(135deg, #0e0e0e 0%, #1a1614 100%); border-top: 1px solid rgba(223, 200, 168, 0.2); border-bottom: 1px solid rgba(223, 200, 168, 0.2);">
      <div class="container-fluid px-3 px-lg-5">
        <div class="row align-items-center g-4">
          
          <div class="col-12 col-lg-7">
            <div class="d-inline-flex align-items-center gap-2 mb-2">
              <span class="badge badge-champagne text-dark fw-bold">REAL-TIME RUNWAY FEED</span>
              <span class="text-champagne small fw-semibold letter-spacing-medium">&#64;daposhfashion</span>
            </div>
            <h2 class="font-serif display-6 fw-bold mb-3 text-white">
              For Any Collection Choose From Instagram
            </h2>
            <p class="text-white-50 mb-4" style="max-width: 620px; line-height: 1.7;">
              Discover our newest haute couture drops, daily boutique styling, fabric close-ups and runway previews directly on Instagram. Simply send us a screenshot on WhatsApp to order your customized piece!
            </p>

            <!-- Store Location Badge -->
            <div class="d-flex flex-wrap align-items-center gap-3 p-3 bg-black bg-opacity-40 border border-secondary border-opacity-50 rounded-1 mb-4" style="max-width: 600px;">
              <div class="d-flex align-items-center gap-2 text-white">
                <i class="bi bi-geo-alt-fill text-champagne fs-5"></i>
                <div class="small">
                  <strong class="d-block text-white">Daposh fashion &bull; Malviya Nagar</strong>
                  <span class="text-white-50">D85 shop no 6, Main road, Malviya nagar, New delhi 110017</span>
                </div>
              </div>
              <a [href]="fashionService.storeInfo.gpsLocation" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-light rounded-0 ms-auto text-nowrap" style="font-size: 0.72rem;">
                GPS Map 📍
              </a>
            </div>

            <div class="d-flex flex-wrap align-items-center gap-3">
              <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="btn btn-atelier-champagne px-4 py-3 text-decoration-none">
                <i class="bi bi-instagram me-2 fs-5"></i>
                <span>FOLLOW &#64;daposhfashion</span>
              </a>
              <a [href]="fashionService.getWhatsAppLink('Hi Daposh fashion! I want to explore your Instagram collection & order.')" target="_blank" rel="noopener noreferrer" class="btn btn-success rounded-0 px-4 py-3 fw-bold letter-spacing-medium text-decoration-none d-flex align-items-center gap-2">
                <i class="bi bi-whatsapp fs-5"></i>
                <span>WHATSAPP ORDER: +91 85955 72121</span>
              </a>
              <a [href]="fashionService.storeInfo.phoneTel" class="btn btn-outline-light rounded-0 px-4 py-3 fw-bold letter-spacing-medium text-decoration-none d-flex align-items-center gap-2">
                <i class="bi bi-telephone-fill"></i>
                <span>CALL NOW</span>
              </a>
            </div>
          </div>

          <!-- Right: Instagram Visual Showcase Cards -->
          <div class="col-12 col-lg-5">
            <div class="row g-2">
              <div class="col-6">
                <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="insta-visual-tile d-block position-relative overflow-hidden rounded-1">
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" alt="Instagram Collection 1" class="w-100 h-100 object-fit-cover" />
                  <div class="tile-overlay d-flex align-items-center justify-content-center text-white">
                    <i class="bi bi-instagram fs-2"></i>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="insta-visual-tile d-block position-relative overflow-hidden rounded-1">
                  <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80" alt="Instagram Collection 2" class="w-100 h-100 object-fit-cover" />
                  <div class="tile-overlay d-flex align-items-center justify-content-center text-white">
                    <i class="bi bi-instagram fs-2"></i>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="insta-visual-tile d-block position-relative overflow-hidden rounded-1">
                  <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" alt="Instagram Collection 3" class="w-100 h-100 object-fit-cover" />
                  <div class="tile-overlay d-flex align-items-center justify-content-center text-white">
                    <i class="bi bi-instagram fs-2"></i>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="insta-visual-tile d-block position-relative overflow-hidden rounded-1">
                  <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" alt="Instagram Collection 4" class="w-100 h-100 object-fit-cover" />
                  <div class="tile-overlay d-flex align-items-center justify-content-center text-white">
                    <i class="bi bi-instagram fs-2"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Shop The Runway Look Hotspots -->
    <app-lookbook-hotspots></app-lookbook-hotspots>

    <!-- Limited Edition Atelier Capsule Spotlight -->
    <app-atelier-capsule></app-atelier-capsule>
  `,
  styles: [`
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .badge-champagne {
      background-color: #dfc8a8;
      color: #0c0c0c;
    }
    .insta-visual-tile {
      height: 160px;
      .tile-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        opacity: 0;
        transition: opacity 0.3s;
      }
      &:hover .tile-overlay {
        opacity: 1;
      }
    }
  `]
})
export class HomeComponent {
  readonly fashionService = inject(FashionService);
}
