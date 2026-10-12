import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FashionService } from '../../services/fashion.service';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Orders & Bespoke' | 'Payments' | 'Shipping & Courier' | 'Returns & Alterations' | 'Boutique Visit';
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="faq-page bg-light py-5">
      <div class="container py-lg-4">
        
        <!-- Header -->
        <div class="text-center mb-5 animate-fade-in">
          <span class="badge-editorial badge-champagne mb-2">CONCIERGE INTELLIGENCE & ASSISTANCE</span>
          <h1 class="font-serif display-5 fw-bold mb-2">Frequently Asked Questions</h1>
          <p class="text-muted mx-auto" style="max-width: 640px;">
            Everything you need to know about acquiring ready-to-wear runway editions, custom tailoring, secure Razorpay transactions, and white-glove courier dispatches.
          </p>
        </div>

        <!-- Search & Category Filters -->
        <div class="card border-0 shadow-sm p-3 p-md-4 bg-white mb-5 rounded-1">
          <div class="row g-3 align-items-center">
            <div class="col-12 col-md-6">
              <div class="input-group">
                <span class="input-group-text bg-light rounded-0 border-end-0 text-muted">
                  <i class="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  class="form-control rounded-0 border-start-0" 
                  placeholder="Search questions (e.g. shipping, returns, silk, sizing)..." 
                  [(ngModel)]="searchQuery"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="d-flex flex-wrap gap-2 justify-content-md-end">
                @for (cat of categories; track cat) {
                  <button 
                    type="button" 
                    class="btn btn-sm rounded-0 fw-bold letter-spacing-medium"
                    [ngClass]="selectedCategory() === cat ? 'btn-dark' : 'btn-outline-secondary'"
                    (click)="selectedCategory.set(cat)">
                    {{ cat }}
                  </button>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Accordion List -->
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="accordion-container d-flex flex-column gap-3 mb-5">
              @for (item of filteredFaqs(); track item.question; let idx = $index) {
                <div class="faq-card bg-white border rounded-1 shadow-sm overflow-hidden transition-all">
                  <button 
                    type="button" 
                    class="faq-header w-100 p-4 border-0 bg-transparent text-start d-flex align-items-center justify-content-between gap-3"
                    (click)="toggleFaq(item)">
                    <div class="d-flex align-items-center gap-3">
                      <span class="badge bg-light text-muted border small px-2 py-1">{{ item.category }}</span>
                      <h3 class="font-serif fs-6 fw-bold mb-0 text-dark">{{ item.question }}</h3>
                    </div>
                    <div class="faq-toggle-icon fs-5 text-champagne">
                      <i class="bi" [ngClass]="item.isOpen ? 'bi-dash-circle-fill text-dark' : 'bi-plus-circle-fill'"></i>
                    </div>
                  </button>

                  @if (item.isOpen) {
                    <div class="faq-body px-4 pb-4 pt-1 border-top animate-fade-in text-muted small" style="line-height: 1.8;">
                      <p class="mb-0">{{ item.answer }}</p>
                    </div>
                  }
                </div>
              } @empty {
                <div class="p-5 text-center bg-white border rounded-1">
                  <i class="bi bi-question-circle text-muted fs-1 mb-2 d-block"></i>
                  <h5 class="font-serif fw-bold">No Matching Inquiries Found</h5>
                  <p class="text-muted small mb-3">Our concierge is readily available to answer your personalized question directly.</p>
                  <a [href]="fashionService.getWhatsAppLink('Hi Daposh fashion! I have a question not listed in your FAQ.')" target="_blank" rel="noopener noreferrer" class="btn btn-dark rounded-0 px-4 py-2 small fw-bold">
                    <i class="bi bi-whatsapp me-2 text-success"></i> ASK CONCIERGE ON WHATSAPP
                  </a>
                </div>
              }
            </div>

            <!-- Still Have Questions Banner -->
            <div class="p-4 p-md-5 bg-dark text-white rounded-1 border border-champagne text-center shadow-sm">
              <span class="badge badge-champagne text-dark fw-bold mb-2">PERSONAL CLIENT CONCIERGE</span>
              <h2 class="font-serif fs-4 fw-bold mb-2 text-white">Have a Bespoke or Press Question?</h2>
              <p class="text-white-50 mx-auto small mb-4" style="max-width: 540px;">
                Our Malviya Nagar boutique stylists are available 7 days a week from 11:00 AM to 9:00 PM IST to assist with sizing, alterations, and appointments.
              </p>
              <div class="d-flex flex-wrap justify-content-center gap-3">
                <a routerLink="/contact" class="btn btn-atelier-champagne px-4 py-2" style="font-size: 0.78rem;">
                  SUBMIT CONFIDENTIAL INQUIRY
                </a>
                <a [href]="fashionService.getWhatsAppLink('Hi! I need assistance regarding Daposh collections.')" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light rounded-0 px-4 py-2 fw-bold" style="font-size: 0.78rem;">
                  <i class="bi bi-whatsapp me-1 text-success"></i> WHATSAPP (+91 85955 72121)
                </a>
              </div>
            </div>

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
    .btn-atelier-champagne {
      background-color: #dfc8a8;
      color: #0c0c0c;
      font-weight: 700;
      letter-spacing: 0.08em;
      border: 1px solid #dfc8a8;
      border-radius: 0;
      text-transform: uppercase;
      transition: all 0.2s ease;
    }
    .btn-atelier-champagne:hover {
      background-color: #cbaf8c;
      color: #000;
    }
    .transition-all {
      transition: all 0.2s ease-in-out;
    }
    .animate-fade-in {
      animation: fadeIn 0.25s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class FaqComponent {
  readonly fashionService = inject(FashionService);

  searchQuery = '';
  readonly selectedCategory = signal<string>('All');

  readonly categories: string[] = [
    'All',
    'Orders & Bespoke',
    'Payments',
    'Shipping & Courier',
    'Returns & Alterations',
    'Boutique Visit'
  ];

  faqs: FaqItem[] = [
    {
      category: 'Orders & Bespoke',
      question: 'How do I place a custom couture or bridal tailoring order?',
      answer: 'You can choose between browsing ready-to-wear pieces directly on our storefront or booking a bespoke consultation via our Contact page or WhatsApp (+91 85955 72121). Our master tailors will take your exact anatomical measurements and curate luxury fabric swatches.',
      isOpen: true
    },
    {
      category: 'Orders & Bespoke',
      question: 'Are all garments hand-finished in your New Delhi atelier?',
      answer: 'Yes. Every garment bearing the Daposh Fashion label is designed, drafted, patterned, and hand-finished by master craftspeople at our atelier in Malviya Nagar, New Delhi.',
      isOpen: false
    },
    {
      category: 'Payments',
      question: 'Which payment methods are accepted on Daposh Fashion?',
      answer: 'We accept all major Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and EMI options through Razorpay with 256-bit bank-grade encryption. Cash on Delivery (COD) is also available across serviceable PIN codes throughout India.',
      isOpen: false
    },
    {
      category: 'Payments',
      question: 'Is my transaction secure when paying via Razorpay?',
      answer: 'Absolutely. Razorpay is PCI-DSS Level 1 compliant, adhering to the highest global financial security protocols. Daposh Fashion never stores your card or CVV credentials.',
      isOpen: false
    },
    {
      category: 'Shipping & Courier',
      question: 'What are your delivery timelines and courier partners?',
      answer: 'Ready-to-ship runway garments are dispatched within 24 to 48 hours via BlueDart Air Express or Delhivery. Standard transit time is 2-4 business days for major Indian metros, and 4-6 business days for regional zones. Bespoke commissions typically require 7-14 business days.',
      isOpen: false
    },
    {
      category: 'Shipping & Courier',
      question: 'How do I track my order once it has been dispatched?',
      answer: 'Visit our "Track Order" page in the navigation bar or footer. Enter your Order ID (e.g. DAPOSH-1082) or registered 10-digit phone number to view live 5-stage shipment progress and courier tracking links.',
      isOpen: false
    },
    {
      category: 'Returns & Alterations',
      question: 'What is Daposh Fashion’s Return and Exchange policy?',
      answer: 'We provide a seamless 30-day exchange and return window for unworn ready-to-wear items with original security tags and designer box intact. We arrange complimentary reverse courier pickups from your doorstep.',
      isOpen: false
    },
    {
      category: 'Returns & Alterations',
      question: 'Do you offer complimentary size alterations after delivery?',
      answer: 'Yes! We believe in impeccable fit. If your garment requires minor waist, hem, or sleeve adjustments, you can bring it to our Malviya Nagar flagship boutique or ship it to our atelier for complimentary fine-tuning.',
      isOpen: false
    },
    {
      category: 'Boutique Visit',
      question: 'Can I visit the Daposh Fashion flagship boutique without an appointment?',
      answer: 'Walk-in visitors are warmly welcomed Monday through Sunday from 11:00 AM to 9:00 PM IST at D85 shop no 6, Main road, Malviya nagar, New delhi 110017. For bridal couture or custom bridal trousseau consultations, scheduling in advance is recommended.',
      isOpen: false
    }
  ];

  filteredFaqs(): FaqItem[] {
    let list = this.faqs;
    const cat = this.selectedCategory();
    if (cat !== 'All') {
      list = list.filter(f => f.category === cat);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    }
    return list;
  }

  toggleFaq(item: FaqItem): void {
    item.isOpen = !item.isOpen;
  }
}
