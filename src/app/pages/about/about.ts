import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-page bg-light py-5">
      <div class="container py-lg-4">
        
        <!-- Hero Editorial Banner -->
        <div class="editorial-about-hero text-center mb-5 animate-fade-in">
          <span class="badge-editorial badge-champagne mb-2">MAISON HERITAGE & ATELIER ARTISTRY</span>
          <h1 class="font-serif display-4 fw-bold mb-3">The House of Daposh Fashion</h1>
          <p class="text-muted mx-auto fs-6" style="max-width: 680px; line-height: 1.8;">
            Born from a passion for sculptural tailoring, architectural couture and pure natural textiles, Daposh Fashion curates timeless ready-to-wear and bespoke bridal creations for the contemporary connoisseur.
          </p>
        </div>

        <!-- Vision & Showcase Row -->
        <div class="row align-items-center g-4 g-lg-5 mb-5 pb-lg-4">
          <div class="col-12 col-lg-6">
            <span class="text-champagne small fw-bold letter-spacing-medium d-block mb-1">CRAFTED IN NEW DELHI</span>
            <h2 class="font-serif display-6 fw-bold mb-3">Artisanal Mastery Meets Modern Runway Silhouettes</h2>
            <p class="text-muted" style="line-height: 1.8;">
              Nestled on Main Road in Malviya Nagar, New Delhi, our flagship boutique houses master tailors, pattern architects, and textile artisans. Every piece in our collection is conceived through meticulous draping, hand-finished seams, and white-glove artisan care.
            </p>
            <p class="text-muted" style="line-height: 1.8;">
              We reject fleeting micro-trends. Instead, we champion architectural trench coats, pure mulberry silk blouses, bespoke bridal gowns, and Italian-cut merino wool blazers that transcend seasons.
            </p>
            <div class="d-flex flex-wrap gap-3 pt-2">
              <a routerLink="/" class="btn btn-dark rounded-0 px-4 py-3 fw-bold letter-spacing-medium text-nowrap" style="font-size: 0.76rem;">
                EXPLORE RUNWAY CATALOG
              </a>
              <a [href]="fashionService.storeInfo.instagram" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark rounded-0 px-4 py-3 fw-bold letter-spacing-medium text-nowrap" style="font-size: 0.76rem;">
                <i class="bi bi-instagram me-1"></i> INSTAGRAM ARCHIVES
              </a>
            </div>
          </div>

          <div class="col-12 col-lg-6">
            <div class="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85" 
                alt="Daposh Atelier Craftsmanship" 
                class="w-100 shadow-lg object-fit-cover rounded-1" 
                style="height: 480px;" 
              />
              <div class="position-absolute bottom-0 start-0 m-4 p-3 bg-white shadow-lg border" style="max-width: 280px;">
                <span class="small fw-bold d-block text-dark font-serif">100% PURE MULBERRY SILK</span>
                <small class="text-muted" style="font-size: 0.72rem;">Grade 6A Mulberry Silk & Fine Tropical Wools</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Three Core Pillars of Daposh Atelier -->
        <div class="row g-4 mb-5">
          <div class="col-12 col-md-4">
            <div class="card h-100 border-0 p-4 p-lg-5 bg-white shadow-sm rounded-1 text-center">
              <div class="pillar-icon mx-auto mb-3 text-champagne fs-2"><i class="bi bi-gem"></i></div>
              <h4 class="font-serif fw-bold mb-2 fs-5">Uncompromising Materials</h4>
              <p class="text-muted small mb-0" style="line-height: 1.7;">
                From 22-momme pure mulberry silk crepe to Super 130s Italian tropical wools and full-grain vegetable-tanned leathers, our materials embody timeless luxury.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="card h-100 border-0 p-4 p-lg-5 bg-white shadow-sm rounded-1 text-center">
              <div class="pillar-icon mx-auto mb-3 text-champagne fs-2"><i class="bi bi-scissors"></i></div>
              <h4 class="font-serif fw-bold mb-2 fs-5">Bespoke Precision</h4>
              <p class="text-muted small mb-0" style="line-height: 1.7;">
                Every creation can be tailored to your unique anatomical measurements. Our concierge works closely with clients worldwide for custom commissions and bridal couture.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="card h-100 border-0 p-4 p-lg-5 bg-white shadow-sm rounded-1 text-center">
              <div class="pillar-icon mx-auto mb-3 text-champagne fs-2"><i class="bi bi-box2-heart"></i></div>
              <h4 class="font-serif fw-bold mb-2 fs-5">White-Glove Delivery</h4>
              <p class="text-muted small mb-0" style="line-height: 1.7;">
                Orders are hand-inspected, packed in our signature DAPOSH matte black presentation box, and dispatched with priority Air Express couriers.
              </p>
            </div>
          </div>
        </div>

        <!-- Flagship Store Showcase Banner -->
        <div class="boutique-invite-banner p-4 p-md-5 bg-dark text-white rounded-1 border border-champagne text-center">
          <span class="badge badge-champagne text-dark fw-bold mb-2">SALON DES RENDEZ-VOUS</span>
          <h3 class="font-serif display-6 fw-bold mb-2">Visit Our Malviya Nagar Flagship Boutique</h3>
          <p class="text-white-50 mx-auto small mb-4" style="max-width: 580px;">
            Experience the tactile richness of our textiles, explore limited runway editions, and enjoy personalized styling with our resident concierge.
          </p>
          <div class="d-flex flex-wrap justify-content-center gap-3">
            <a [href]="fashionService.storeInfo.gpsLocation" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light rounded-0 px-4 py-2 fw-bold" style="font-size: 0.78rem;">
              GPS LOCATION MAPS 📍
            </a>
            <a routerLink="/contact" class="btn btn-atelier-champagne px-4 py-2" style="font-size: 0.78rem;">
              SCHEDULE PRIVATE CONSULTATION
            </a>
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
    .pillar-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #faf8f5;
      display: flex;
      align-items: center;
      justify-content: center;
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
export class AboutComponent {
  readonly fashionService = inject(FashionService);
}
