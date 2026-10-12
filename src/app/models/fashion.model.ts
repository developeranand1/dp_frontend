export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface SizeOption {
  size: string;
  inStock: boolean;
  stockCount?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Women' | 'Men' | 'Atelier Studio' | 'Accessories' | 'Footwear';
  subCategory: string; // 'Trench Coats', 'Silk Blouses', 'Tailored Blazers', 'Evening Gowns', 'Cashmere Knits', 'Leather Bags', 'Loafers'
  mood: string; // 'Minimalist Noir', 'Parisian Chic', 'Riviera Linen', 'Old Money Luxe', 'Midnight Gala', 'Urban Studio'
  price: number; // in INR (can be converted by currency service)
  originalPrice?: number;
  discountPercent?: number;
  badge?: string; // 'Runway SS26', 'Pure Mulberry Silk', 'Atelier Exclusive', 'Limited Edition', 'Conscious Luxe'
  isNew?: boolean;
  isTrending?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  colorVariants: ColorVariant[];
  sizes: SizeOption[];
  description: string;
  fabricComposition: string;
  careInstructions: string;
  modelSpecs: string; // e.g., 'Model is 5\'10" (178cm), 32-24-35, wearing Size S'
  sustainableNotes?: string;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // unique item instance id (productId + color + size)
  product: Product;
  selectedColor: ColorVariant;
  selectedSize: string;
  quantity: number;
}

export interface LookbookHotspot {
  id: string;
  productId: string;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  title: string;
  price: number;
}

export interface LookbookStory {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  coverImage: string;
  tagline: string;
  description: string;
  hotspots: LookbookHotspot[];
  featuredProductIds: string[];
}

export interface VibeMood {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // rate against INR
  name: string;
}

export interface ToastAlert {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  image?: string;
}

export interface FilterState {
  category: string;
  mood: string;
  subCategory: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  sortOption: 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
  inStockOnly: boolean;
}

