import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../../services/fashion.service';

@Component({
  selector: 'app-atelier-capsule',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="capsule-section py-5 my-4 position-relative overflow-hidden">
      <div class="container-fluid px-3 px-lg-5">
        <div class="row g-4 align-items-center">
          
          <!-- Left: Big Editorial Imagery Split -->
          <div class="col-12 col-lg-6">
            <div class="capsule-img-duo position-relative">
              <div class="capsule-main-frame shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85" 
                  alt="Florentine Leather Craftsmanship" 
                  class="w-100 h-100 object-fit-cover" 
                />
              </div>
              <div class="capsule-accent-frame shadow-2xl d-none d-sm-block">
                <img 
                  src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=85" 
                  alt="Mongolian Cashmere Detail" 
                  class="w-100 h-100 object-fit-cover" 
                />
                <span class="capsule-accent-tag badge-editorial badge-champagne">EDITION: 100 PIECES</span>
              </div>
            </div>
          </div>

          <!-- Right: Narrative & Countdown Timer -->
          <div class="col-12 col-lg-6 ps-lg-5">
            <div class="capsule-content">
              
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge-dot-gold"></span>
                <span class="section-kicker mb-0">ATELIER STUDIO EXCLUSIVE</span>
              </div>

              <h2 class="capsule-heading font-serif mb-3">
                The Heritage Capsule: Cashmere & Florentine Calf
              </h2>

              <p class="capsule-text text-muted mb-4">
                Each piece in this numbered capsule represents over 36 hours of hand-guided craftsmanship. 
                Sourced from the high plateaus of Inner Mongolia and finished in our historic Florence workshop. 
                Once the initial allocation of 100 units is exhausted, no further restocks will be produced.
              </p>

              <!-- Countdown Timer (Zara / Mango Limited Drop feel) -->
              <div class="countdown-card p-3 mb-4 d-inline-flex flex-column">
                <span class="countdown-label small text-muted letter-spacing-medium mb-2">
                  ALLOCATION WINDOW CLOSES IN:
                </span>
                <div class="d-flex align-items-center gap-3">
                  <div class="countdown-unit text-center">
                    <span class="unit-num font-serif">{{ days() }}</span>
                    <span class="unit-text">DAYS</span>
                  </div>
                  <span class="unit-sep">:</span>
                  <div class="countdown-unit text-center">
                    <span class="unit-num font-serif">{{ hours() }}</span>
                    <span class="unit-text">HOURS</span>
                  </div>
                  <span class="unit-sep">:</span>
                  <div class="countdown-unit text-center">
                    <span class="unit-num font-serif">{{ minutes() }}</span>
                    <span class="unit-text">MINS</span>
                  </div>
                  <span class="unit-sep">:</span>
                  <div class="countdown-unit text-center">
                    <span class="unit-num font-serif">{{ seconds() }}</span>
                    <span class="unit-text">SECS</span>
                  </div>
                </div>
              </div>

              <!-- Craftsmanship Pillars -->
              <div class="row g-3 mb-4">
                <div class="col-6 col-sm-4">
                  <div class="pillar-box border-top pt-2">
                    <span class="pillar-num font-serif text-champagne">100%</span>
                    <p class="pillar-desc mb-0 small text-muted">Grade A Mongolian Cashmere Fleece</p>
                  </div>
                </div>
                <div class="col-6 col-sm-4">
                  <div class="pillar-box border-top pt-2">
                    <span class="pillar-num font-serif text-champagne">24K</span>
                    <p class="pillar-desc mb-0 small text-muted">Gold-Plated Turnlock Hardware</p>
                  </div>
                </div>
                <div class="col-6 col-sm-4">
                  <div class="pillar-box border-top pt-2">
                    <span class="pillar-num font-serif text-champagne">#42</span>
                    <p class="pillar-desc mb-0 small text-muted">Individual Certificate of Authenticity</p>
                  </div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="d-flex flex-wrap align-items-center gap-3">
                <button class="btn-atelier px-4 py-3" (click)="onAcquireCapsule()">
                  <span>ACQUIRE CAPSULE PIECE</span>
                  <i class="bi bi-shield-check"></i>
                </button>
                <button class="btn-atelier-outline px-4 py-3" (click)="onViewAllStudio()">
                  <span>EXPLORE ALL STUDIO DROPS</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .capsule-section {
      background-color: #f7f3ec;
      border-top: 1px solid rgba(0,0,0,0.06);
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .badge-dot-gold {
      width: 7px;
      height: 7px;
      background: #c5a880;
      border-radius: 50%;
    }
    .capsule-img-duo {
      height: 520px;
    }
    .capsule-main-frame {
      width: 80%;
      height: 100%;
      overflow: hidden;
      border-radius: 2px;
    }
    .capsule-accent-frame {
      position: absolute;
      right: 0;
      bottom: -30px;
      width: 48%;
      height: 60%;
      overflow: hidden;
      border: 4px solid #f7f3ec;
      border-radius: 2px;
    }
    .capsule-accent-tag {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    .capsule-heading {
      font-size: 2.2rem;
      font-weight: 400;
      color: #0c0c0c;
      line-height: 1.15;
      @media (min-width: 992px) {
        font-size: 2.75rem;
      }
    }
    .countdown-card {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 2px;
    }
    .unit-num {
      font-size: 1.65rem;
      font-weight: 500;
      color: #0c0c0c;
      line-height: 1;
      display: block;
    }
    .unit-text {
      font-size: 0.58rem;
      letter-spacing: 0.16em;
      color: #888;
      display: block;
      margin-top: 2px;
    }
    .unit-sep {
      font-size: 1.25rem;
      color: #ccc;
      font-weight: 300;
    }
    .pillar-num {
      font-size: 1.5rem;
      line-height: 1;
      display: block;
      color: #9b7e56;
    }
    .pillar-desc {
      font-size: 0.72rem;
      line-height: 1.35;
    }
  `]
})
export class AtelierCapsuleComponent implements OnInit, OnDestroy {
  readonly fashionService = inject(FashionService);

  readonly days = signal<string>('03');
  readonly hours = signal<string>('14');
  readonly minutes = signal<string>('42');
  readonly seconds = signal<string>('18');

  private timerInterval: any;

  ngOnInit(): void {
    // Live ticking countdown timer
    let totalSecs = (3 * 86400) + (14 * 3600) + (42 * 60) + 18;
    this.timerInterval = setInterval(() => {
      totalSecs = Math.max(0, totalSecs - 1);
      const d = Math.floor(totalSecs / 86400);
      const h = Math.floor((totalSecs % 86400) / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      this.days.set(d.toString().padStart(2, '0'));
      this.hours.set(h.toString().padStart(2, '0'));
      this.minutes.set(m.toString().padStart(2, '0'));
      this.seconds.set(s.toString().padStart(2, '0'));
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  onAcquireCapsule(): void {
    const bagProduct = this.fashionService.products().find(p => p.id === 'dps-006');
    if (bagProduct) {
      this.fashionService.openQuickView(bagProduct);
    }
  }

  onViewAllStudio(): void {
    this.fashionService.setCategory('Atelier Studio');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

