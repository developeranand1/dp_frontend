import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../../services/fashion.service';
import { VibeMood } from '../../models/fashion.model';

@Component({
  selector: 'app-vibe-explorer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="vibe-explorer" class="vibe-section py-5 my-3 position-relative">
      <div class="container-fluid px-3 px-lg-5">
        
        <!-- Header Editorial -->
        <div class="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between mb-4 pb-2 border-bottom">
          <div>
            <span class="section-kicker">AESTHETIC ARCHIVES</span>
            <h2 class="section-title mb-1">Curated Moods & Vibes</h2>
            <p class="text-muted mb-0" style="font-size: 0.9rem; font-weight: 300;">
              Immerse yourself into distinct sartorial universes curated by DAPOSH fashion directors.
            </p>
          </div>
          <div class="mt-3 mt-md-0 d-flex align-items-center gap-2">
            <span class="small text-muted letter-spacing-medium" style="font-size: 0.72rem;">ACTIVE FILTER:</span>
            <span class="badge badge-editorial bg-dark text-white">{{ fashionService.filter().mood }}</span>
            @if (fashionService.filter().mood !== 'All') {
              <button class="btn btn-sm text-champagne p-0 border-0 ms-2 small" (click)="clearMoodFilter()">
                <u>Reset</u>
              </button>
            }
          </div>
        </div>

        <!-- Horizontal Scrollable / Grid Mood Cards -->
        <div class="row g-3 g-lg-4 row-cols-1 row-cols-sm-2 row-cols-lg-5">
          @for (mood of fashionService.vibeMoods(); track mood.id) {
            <div class="col">
              <div 
                class="mood-card position-relative overflow-hidden cursor-pointer"
                [class.active-mood]="fashionService.filter().mood === mood.name"
                (click)="onSelectMood(mood.name)">
                
                <!-- Mood Image with Hover Zoom -->
                <div class="mood-img-container">
                  <img [src]="mood.image" [alt]="mood.name" class="mood-img" />
                  <div class="mood-gradient"></div>
                </div>

                <!-- Mood Text Overlays -->
                <div class="mood-content position-absolute bottom-0 start-0 w-100 p-3 p-lg-4 z-2 text-white">
                  <span class="mood-tagline d-block mb-1">{{ mood.tagline }}</span>
                  <h4 class="mood-title font-serif mb-1">{{ mood.name }}</h4>
                  <p class="mood-sub mb-3 text-white-50 small">{{ mood.subtitle }}</p>
                  
                  <div class="d-flex align-items-center justify-content-between pt-2 border-top border-white border-opacity-25">
                    <span class="mood-count text-champagne small fw-semibold">
                      {{ mood.itemCount }} Silhouettes
                    </span>
                    <span class="mood-explore-btn">
                      <i class="bi bi-arrow-up-right"></i>
                    </span>
                  </div>
                </div>

                <!-- Active Indicator Border -->
                @if (fashionService.filter().mood === mood.name) {
                  <div class="mood-selected-tag position-absolute top-0 end-0 m-3 badge badge-editorial badge-champagne">
                    ACTIVE VIBE
                  </div>
                }

              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .vibe-section {
      background-color: #faf8f5;
    }
    .text-champagne {
      color: #dfc8a8 !important;
    }
    .mood-card {
      height: 440px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
        
        .mood-img {
          transform: scale(1.08);
        }
        .mood-explore-btn {
          background-color: #ffffff;
          color: #0c0c0c;
          transform: scale(1.1);
        }
      }

      &.active-mood {
        border: 2px solid #0c0c0c;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
      }
    }
    .mood-img-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    .mood-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mood-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(12, 12, 12, 0.92) 0%, rgba(12, 12, 12, 0.35) 50%, rgba(0, 0, 0, 0.05) 100%);
    }
    .mood-tagline {
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #dfc8a8;
      font-weight: 600;
    }
    .mood-title {
      font-size: 1.5rem;
      letter-spacing: -0.01em;
      font-weight: 400;
    }
    .mood-sub {
      font-size: 0.76rem;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .mood-explore-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      color: #fff;
      transition: all 0.25s ease;
    }
  `]
})
export class VibeExplorerComponent {
  readonly fashionService = inject(FashionService);

  onSelectMood(moodName: string): void {
    if (this.fashionService.filter().mood === moodName) {
      this.fashionService.setMood('All');
    } else {
      this.fashionService.setMood(moodName);
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  clearMoodFilter(): void {
    this.fashionService.setMood('All');
  }
}

