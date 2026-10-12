import { Product, LookbookStory, VibeMood, Currency } from '../models/fashion.model';

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', rate: 1, name: 'INR (Indian Rupee)' },
  { code: 'USD', symbol: '$', rate: 0.012, name: 'USD (US Dollar)' },
  { code: 'EUR', symbol: '€', rate: 0.011, name: 'EUR (Euro)' },
  { code: 'GBP', symbol: '£', rate: 0.0095, name: 'GBP (British Pound)' },
  { code: 'AED', symbol: 'AED ', rate: 0.044, name: 'AED (UAE Dirham)' }
];

export const VIBE_MOODS: VibeMood[] = [
  {
    id: 'paris-atelier',
    name: 'Parisian Chic',
    subtitle: 'Effortless tailoring & crisp neutrals',
    tagline: 'Rue Saint-Honoré Elegance',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    itemCount: 18
  },
  {
    id: 'minimalist-noir',
    name: 'Minimalist Noir',
    subtitle: 'Sharp silhouettes & sculpted obsidian',
    tagline: 'Modern Architectural Form',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    itemCount: 24
  },
  {
    id: 'old-money',
    name: 'Old Money Luxe',
    subtitle: 'Cashmere knits, equestrian heritage & ivory',
    tagline: 'Quiet Luxury In Excelcis',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    itemCount: 16
  },
  {
    id: 'riviera-silk',
    name: 'Riviera Linen & Silk',
    subtitle: 'Sun-drenched mulberry silks & flowing linen',
    tagline: 'Côte d’Azur Escape',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    itemCount: 14
  },
  {
    id: 'midnight-gala',
    name: 'Midnight Gala',
    subtitle: 'Floor-sweeping satin, velvet & statement lapels',
    tagline: 'Red Carpet High Drama',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    itemCount: 12
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'dps-001',
    name: 'Sartorial Double-Breasted Wool Blazer',
    subtitle: 'Italian Virgin Wool with Structured Hourglass Shoulders',
    category: 'Women',
    subCategory: 'Tailored Blazers',
    mood: 'Minimalist Noir',
    price: 18900,
    originalPrice: 24500,
    discountPercent: 23,
    badge: 'Runway SS26',
    isNew: true,
    isTrending: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 38,
    primaryImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Obsidian Noir', hex: '#111111', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Alabaster Chalk', hex: '#F4EFE6', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Camel Vicuña', hex: '#A87C52', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 4 },
      { size: 'S', inStock: true, stockCount: 12 },
      { size: 'M', inStock: true, stockCount: 8 },
      { size: 'L', inStock: true, stockCount: 3 },
      { size: 'XL', inStock: false, stockCount: 0 }
    ],
    description: 'Precision cut in Biella, Italy, this double-breasted blazer embodies DAPOSH’s master tailoring. Crafted with peak lapels, horn buttons, and internal silk canvas canvassing for an impeccable architectural drape.',
    fabricComposition: '100% Italian Virgin Wool (Super 130s), Cupro Bemberg lining',
    careInstructions: 'Specialist dry clean only. Steam gently between wearings.',
    modelSpecs: 'Model is 5\'10" (178cm), 32-24-35, wearing size S',
    sustainableNotes: 'Zero-waste pattern drafting; certified OEKO-TEX Standard 100 lining',
    reviews: [
      {
        id: 'rev-1',
        author: 'Aria V. (London)',
        rating: 5,
        date: 'March 28, 2026',
        title: 'Zara couture caliber at its absolute peak',
        comment: 'The shoulder contour is identical to Parisian couture houses. The wool holds its crisp shape even after 10-hour flights.',
        verified: true,
        sizePurchased: 'S',
        fitFeedback: 'True to Size'
      },
      {
        id: 'rev-2',
        author: 'Meera K. (Mumbai)',
        rating: 5,
        date: 'March 14, 2026',
        title: 'Exquisite draping & luxurious feel',
        comment: 'Wore this to Milan fashion week previews and received countless compliments. The horn button details are stunning.',
        verified: true,
        sizePurchased: 'M',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'dps-002',
    name: 'Mulberry Silk Bias-Cut Column Slip Gown',
    subtitle: 'Heavyweight 22 Momme Silk Charmeuse with Low Scalloped Back',
    category: 'Women',
    subCategory: 'Evening Gowns',
    mood: 'Midnight Gala',
    price: 26500,
    originalPrice: 31000,
    discountPercent: 15,
    badge: 'Pure Mulberry Silk',
    isNew: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 24,
    primaryImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Champagne Satin', hex: '#DFC8A8', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Onyx Black', hex: '#141414', image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Emerald Velvet', hex: '#1C3B2B', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 2 },
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 5 },
      { size: 'L', inStock: true, stockCount: 2 }
    ],
    description: 'An iconic silhouette honoring 90s minimalism. Cut on the bias to fluidly skim feminine curves with zero restriction. Features whisper-thin French rouleau straps and delicate rolled hems.',
    fabricComposition: '100% Grade 6A Mulberry Silk (22 Momme)',
    careInstructions: 'Eco dry clean or cold hand wash with silk shampoo. Dry flat away from direct heat.',
    modelSpecs: 'Model is 5\'11" (180cm), wearing size XS in Champagne Satin',
    sustainableNotes: 'Non-toxic vegetable dyes, 100% biodegradable silk fibers'
  },
  {
    id: 'dps-003',
    name: 'Oversized Water-Repellent Gabardine Trench',
    subtitle: 'Double Storm Flap with Tortoiseshell Buckle Belt',
    category: 'Atelier Studio',
    subCategory: 'Trench Coats',
    mood: 'Parisian Chic',
    price: 32900,
    originalPrice: 38000,
    discountPercent: 13,
    badge: 'Atelier Exclusive',
    isNew: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 42,
    primaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Heritage Khaki', hex: '#C5B396', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Midnight Navy', hex: '#1B263B', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 9 },
      { size: 'M', inStock: true, stockCount: 11 },
      { size: 'L', inStock: true, stockCount: 4 }
    ],
    description: 'A signature investment outerwear piece engineered from high-density organic cotton gabardine. Cut oversized with dropped shoulders, exaggerated storm shield, and leather-wrapped metal buckles.',
    fabricComposition: '100% Compact Organic Cotton Gabardine, Water-Resistant Finish',
    careInstructions: 'Professional trench dry clean only.',
    modelSpecs: 'Model is 5\'9" (175cm), wearing size S',
    sustainableNotes: 'GOTS Certified Cotton, PFC-Free DWR finish'
  },
  {
    id: 'dps-004',
    name: 'Mongolian Cashmere Turtleneck Knit',
    subtitle: 'Featherlight 7-Gauge Ribbed Knit in Un-dyed Alabaster',
    category: 'Women',
    subCategory: 'Cashmere Knits',
    mood: 'Old Money Luxe',
    price: 15400,
    originalPrice: 19500,
    discountPercent: 21,
    badge: '100% Cashmere',
    isNew: true,
    isTrending: false,
    rating: 4.9,
    reviewCount: 29,
    primaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Oatmeal Heather', hex: '#DED6C7', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Charcoal Melange', hex: '#373A36', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: 'XS', inStock: true, stockCount: 5 },
      { size: 'S', inStock: true, stockCount: 14 },
      { size: 'M', inStock: true, stockCount: 8 },
      { size: 'L', inStock: false, stockCount: 0 }
    ],
    description: 'Spun from the finest Inner Mongolian cashmere under-fleece fibers. Incredibly soft against bare skin with thermal self-regulation and timeless raglan seams.',
    fabricComposition: '100% Grade A Mongolian Cashmere',
    careInstructions: 'Hand wash cold with wool wash. Do not wring. Store folded with cedar blocks.',
    modelSpecs: 'Model is 5\'10", wearing size S in Oatmeal',
    sustainableNotes: 'Sustainable Fibre Alliance (SFA) certified cashmere herds'
  },
  {
    id: 'dps-005',
    name: 'Pleated High-Rise Wide-Leg Palazzo Trouser',
    subtitle: 'Flowing Japanese Triacetate with Deep Knife Pleats',
    category: 'Women',
    subCategory: 'Tailored Blazers',
    mood: 'Minimalist Noir',
    price: 11900,
    originalPrice: 14900,
    discountPercent: 20,
    badge: 'Staff Pick',
    isNew: false,
    isTrending: true,
    rating: 4.7,
    reviewCount: 31,
    primaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Ebony Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Warm Ecru', hex: '#EBE6DE', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: '24', inStock: true, stockCount: 3 },
      { size: '26', inStock: true, stockCount: 7 },
      { size: '28', inStock: true, stockCount: 9 },
      { size: '30', inStock: true, stockCount: 4 }
    ],
    description: 'Designed to elongate the leg line with an ultra high-rise waistband, deep inverted front pleats, and a sweeping wide silhouette that pools effortlessly over pointed pumps.',
    fabricComposition: '72% Japanese Triacetate, 28% Recycled Poly',
    careInstructions: 'Machine wash delicate, line dry.',
    modelSpecs: 'Model is 5\'10", wearing size 26'
  },
  {
    id: 'dps-006',
    name: 'Handcrafted Box-Calf Kelly Shoulder Bag',
    subtitle: 'Florentine Leather with 24k Gold-Dipped Turnlock Clasp',
    category: 'Accessories',
    subCategory: 'Leather Bags',
    mood: 'Old Money Luxe',
    price: 38500,
    originalPrice: 45000,
    discountPercent: 14,
    badge: 'Limited 100 Pcs',
    isNew: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 19,
    primaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Bordeaux Rouge', hex: '#4A1521', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Noir Saddle', hex: '#171717', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: 'One Size', inStock: true, stockCount: 7 }
    ],
    description: 'Meticulously crafted by fourth-generation artisans in Florence. Features structured box-calf leather with hand-painted raw edge lacquer, lambskin suede interior, and dual detachable straps.',
    fabricComposition: '100% Full-Grain Florentine Calfskin, 24k Gold-Plated Brass Hardware',
    careInstructions: 'Protect with luxury leather balm, store in included flannel dust pouch.',
    modelSpecs: 'Dimensions: 25cm W x 18cm H x 9cm D'
  },
  {
    id: 'dps-007',
    name: 'Sculpted Slingback Kitten Heel Pumps',
    subtitle: 'Glossy Italian Patent Calf with Architectural Stiletto Accent',
    category: 'Footwear',
    subCategory: 'Loafers',
    mood: 'Parisian Chic',
    price: 16800,
    originalPrice: 19800,
    discountPercent: 15,
    badge: 'Runway SS26',
    isNew: true,
    isTrending: false,
    rating: 4.8,
    reviewCount: 16,
    primaryImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Mirror Patent Noir', hex: '#141414', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Nude Biscotti', hex: '#D2B48C', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: 'EU 36', inStock: true, stockCount: 3 },
      { size: 'EU 37', inStock: true, stockCount: 8 },
      { size: 'EU 38', inStock: true, stockCount: 10 },
      { size: 'EU 39', inStock: true, stockCount: 4 },
      { size: 'EU 40', inStock: true, stockCount: 2 }
    ],
    description: 'An elongated, razor-sharp pointed toe balanced on a graceful 50mm curved stiletto heel. Features memory foam footbed cushioning and an adjustable elasticated slingback strap.',
    fabricComposition: '100% Patent Calfskin, Leather Sole with Anti-Slip Inset',
    careInstructions: 'Wipe with microfiber cloth.',
    modelSpecs: 'Heel Height: 50mm / 2 inches'
  },
  {
    id: 'dps-008',
    name: 'Men’s Relaxed Deconstructed Linen Suit Jacket',
    subtitle: 'Washed French Normandy Flax with Unstructured Natural Shoulder',
    category: 'Men',
    subCategory: 'Tailored Blazers',
    mood: 'Riviera Linen',
    price: 21900,
    originalPrice: 27000,
    discountPercent: 19,
    badge: 'Pure French Linen',
    isNew: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 22,
    primaryImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    colorVariants: [
      { name: 'Oatmeal Natural', hex: '#D8CBB5', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85' },
      { name: 'French Riviera Navy', hex: '#202D3C', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85' }
    ],
    sizes: [
      { size: '38R', inStock: true, stockCount: 6 },
      { size: '40R', inStock: true, stockCount: 9 },
      { size: '42R', inStock: true, stockCount: 7 },
      { size: '44R', inStock: true, stockCount: 2 }
    ],
    description: 'Effortless Mediterranean sprezzatura. Tailored without shoulder pads or canvassing for a breathable, relaxed drape that naturally molds to the wearer over time.',
    fabricComposition: '100% Normandy Certified Flax Linen',
    careInstructions: 'Dry clean or cold gentle cycle.',
    modelSpecs: 'Model is 6\'2" (188cm), wearing 40R'
  }
];

export const LOOKBOOK_STORIES: LookbookStory[] = [
  {
    id: 'lb-spring-26',
    title: 'THE SARTORIAL SILHOUETTE',
    subtitle: 'DAPOSH Spring/Summer 2026 Campaign',
    season: 'Spring / Summer 2026',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
    tagline: 'Quiet Luxury Reframed Through Radical Tailoring',
    description: 'Shot on location along the sun-bleached colonnades of Lake Como, the new collection investigates the dialogue between architectural rigidity and the fluidity of pure silk.',
    hotspots: [
      { id: 'hs-1', productId: 'dps-001', xPercent: 38, yPercent: 44, title: 'Virgin Wool Blazer', price: 18900 },
      { id: 'hs-2', productId: 'dps-006', xPercent: 62, yPercent: 68, title: 'Florentine Kelly Bag', price: 38500 }
    ],
    featuredProductIds: ['dps-001', 'dps-002', 'dps-006', 'dps-007']
  },
  {
    id: 'lb-monochrome',
    title: 'NOIR ARCHITECTURE',
    subtitle: 'The Evening Capsule Collection',
    season: 'Pre-Fall 2026',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
    tagline: 'Monochrome Supremacy & Sculpted Lines',
    description: 'An ode to evening minimalism. Where razor-sharp pleats meet high-gloss patent leather and whisper-weight mulberry silks.',
    hotspots: [
      { id: 'hs-3', productId: 'dps-005', xPercent: 45, yPercent: 72, title: 'Pleated Palazzo Trouser', price: 11900 },
      { id: 'hs-4', productId: 'dps-003', xPercent: 54, yPercent: 32, title: 'Gabardine Trench', price: 32900 }
    ],
    featuredProductIds: ['dps-003', 'dps-004', 'dps-005', 'dps-008']
  }
];

