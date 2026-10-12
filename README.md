# DAPOSH ATELIER | Haute Couture & Ready-to-Wear

> **A High-End Luxury Fashion E-Commerce Web Application**  
> Inspired by the architectural minimalism and editorial grandeur of **Zara, Mango, Nykaa Fashion, Cider, and H&M Studio**.

Built with the **Latest Angular (v22)** using standalone components and reactive Signals, **Bootstrap 5.3**, and **Bootstrap Icons**, featuring editorial typography, high-resolution photography, and interactive luxury shopping mechanics.

---

## 🌟 Reference Inspirations & Unique Innovations

| Brand Inspiration | Distinctive Features Adopted in DAPOSH ATELIER |
| :--- | :--- |
| **Zara** | High-contrast editorial lookbook, stark Obsidian & Alabaster palette, responsive grid switcher (2-col editorial vs 3-col & 4-col), floating quick size selector drawer on product cards. |
| **Mango** | Clean European Mediterranean chic, refined serif typography (*Italiana* & *Playfair Display*), curated editorial stories, and limited capsule spotlights. |
| **Cider** | **"Shop by Mood & Aesthetic"** explorer (*Parisian Chic*, *Minimalist Noir*, *Old Money Luxe*, *Riviera Linen*, *Midnight Gala*), interactive color swatches that swap model photography instantly. |
| **Nykaa Fashion** | Multi-currency converter (₹ INR, $ USD, € EUR, £ GBP, AED), free shipping threshold progress bar, luxury certification tags (*Runway SS26*, *Pure Mulberry Silk*, *100% Cashmere*). |
| **H&M Studio Collection** | **Atelier Capsule Spotlight** with a real-time countdown timer for limited drop allocations, zero-waste craftsmanship notes, and sustainable fabric provenance. |

---

## ✨ Key Features & Architecture

1. **Editorial Announcement Ticker & Luxury Header**:
   - Auto-rotating global announcements ticker (Complimentary Express Delivery, Private Concierge).
   - Sticky glassmorphism header with logo typography, mega-menu, live search with instant autosuggest preview, currency selector, and cart/wishlist badge counters.
2. **Runway Campaign Hero Stage**:
   - Autoplay campaign carousel with high-contrast editorial photography, season kicker badges, headline typography, and direct CTA navigation.
3. **Shop by Aesthetic & Mood Explorer**:
   - Visual curation cards that dynamically filter the entire catalog with a single click.
4. **Interactive Filterable Product Catalog**:
   - Category filtering (*Women*, *Men*, *Atelier Studio*, *Accessories*, *Footwear*).
   - Dynamic sorting (*Featured*, *Price: Low to High*, *Price: High to Low*, *Top Rated*, *Newest*).
   - Multi-column layout switcher (2-column editorial zoom, 3-column, 4-column).
   - Interactive color swatches on cards that instantly switch product images.
   - Quick-add size drawer that slides up on card hover.
   - Dual-image hover preview (front angle to runway angle).
5. **Interactive "Shop The Runway Look" Hotspots**:
   - Pulsing circular pins directly on models on the runway. Clicking pins reveals garment details and allows direct inspection and purchase.
6. **Limited Edition Atelier Capsule Spotlight**:
   - Live countdown timer for limited drops.
   - Craftsmanship pillars: Mongolian Cashmere, 24k Gold Hardware, Numbered Authenticity Certificate.
7. **Quick View Editorial Modal**:
   - Thumbnail gallery, color swatch selector, size selector with interactive Size Guide table, fabric composition, model specs, and quantity controller.
8. **Slide-Out Atelier Cart Drawer**:
   - Dynamic White-Glove delivery progress bar.
   - Real-time price conversion across 5 global currencies.
   - Privilege coupon code verification (e.g., `ATELIER15` for 15% off, `DAPOSH20` for 20% off).
   - Simulated checkout flow with order number generation.
9. **Saved Archives (Wishlist) Drawer**:
   - Slide-out wishlist manager with 1-click "Move to Bag" or "Move All to Bag".
10. **VIP Salon Society Footer**:
    - Newsletter subscription modal with instant discount code revelation.
    - Salon boutique flagships (*Mumbai Bandra*, *Paris Rue Saint-Honoré*, *London Mayfair*, *New York Mercer St*).
11. **Mobile Bottom Navigation Bar**:
    - Native mobile app experience with bottom navigation pills and live count indicators.

---

## 🛠️ Technology Stack

- **Framework**: Angular 22 (Standalone Components, Signals, Computed Signals, Effects)
- **Styling**: Bootstrap 5.3 + Custom SCSS Editorial Luxury Design System
- **Icons**: Bootstrap Icons (v1.13+)
- **Typography**: Google Fonts (*Italiana*, *Playfair Display*, *Plus Jakarta Sans*)
- **Imagery**: Curated high-resolution fashion photography CDN

---

## 🚀 How to Run the Project

To start the development server on your machine:

```bash
# In PowerShell or Command Prompt within d:\daposhfashion
npm start
```

Then open your browser and navigate to:
```
http://localhost:4200/
```

To build for production:
```bash
npm run build
```
The optimized production bundle will be generated in `dist/daposhfashion/`.
