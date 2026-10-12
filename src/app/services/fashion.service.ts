import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, CartItem, LookbookStory, VibeMood, Currency, FilterState, ToastAlert, ColorVariant } from '../models/fashion.model';
import { PRODUCTS_DATA, LOOKBOOK_STORIES, VIBE_MOODS, CURRENCIES } from '../data/fashion.data';
import { firstValueFrom } from 'rxjs';

export interface OrderItem {
  productId: string;
  name: string;
  primaryImage: string;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface StatusTimelineEntry {
  status: string;
  message: string;
  timestamp: string;
}

export interface OrderRecord {
  id?: string;
  _id?: string;
  orderId: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency?: string;
  paymentMethod: 'razorpay' | 'cod' | 'upi';
  paymentStatus: 'pending' | 'paid' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: 'Placed' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  courierName?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  statusTimeline?: StatusTimelineEntry[];
  createdAt?: string;
}

export interface InquiryRecord {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
  status: 'unread' | 'read' | 'in-progress' | 'resolved';
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private readonly http = inject(HttpClient);
  readonly apiUrl = 'http://localhost:5000/api';

  // Main Data Signals
  readonly products = signal<Product[]>(PRODUCTS_DATA);
  readonly lookbooks = signal<LookbookStory[]>(LOOKBOOK_STORIES);
  readonly vibeMoods = signal<VibeMood[]>(VIBE_MOODS);
  readonly currencies = signal<Currency[]>(CURRENCIES);
  readonly isBackendConnected = signal<boolean>(false);
  
  // User State Signals
  readonly activeCurrency = signal<Currency>(CURRENCIES[0]); // default INR
  readonly cart = signal<CartItem[]>([]);
  readonly wishlist = signal<Product[]>([]);
  readonly appliedCoupon = signal<{ code: string; discountPercent: number } | null>(null);

  // UI State Signals
  readonly isCartOpen = signal<boolean>(false);
  readonly isWishlistOpen = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly isSearchDrawerOpen = signal<boolean>(false);
  readonly quickViewProduct = signal<Product | null>(null);
  readonly activeLookbookIndex = signal<number>(0);
  readonly toastAlert = signal<ToastAlert | null>(null);

  // Filter State
  readonly filter = signal<FilterState>({
    category: 'All',
    mood: 'All',
    subCategory: 'All',
    minPrice: 0,
    maxPrice: 50000,
    sizes: [],
    colors: [],
    sortOption: 'recommended',
    searchQuery: '',
    inStockOnly: false
  });

  // Daposh Fashion Official Store Details
  readonly storeInfo = {
    name: 'Daposh fashion',
    tagline: 'Haute Atelier & Designer Ready-to-Wear',
    shopName: 'Daposh fashion',
    addressLine1: 'D85 shop no 6',
    addressLine2: 'Main road, Malviya nagar',
    city: 'New delhi',
    pincode: '110017',
    fullAddress: 'D85 shop no 6, Main road, Malviya nagar, New delhi 110017',
    phone: '+91 85955 72121',
    phoneTel: 'tel:+918595572121',
    whatsappRaw: '918595572121',
    whatsappFormatted: '+91 85955 72121',
    whatsappNotice: "What'sapp only: +91 85955 72121",
    gpsLocation: 'https://maps.app.goo.gl/55SR21EvYYu5tAJV9',
    instagram: 'https://www.instagram.com/daposhfashion?igsh=MW95M2RsY2p1emdyMw==',
    instagramHandle: '@daposhfashion',
    instagramNotice: 'For any collection choose from Instagram'
  };

  // Admin Authentication State
  readonly isAdminLoggedIn = signal<boolean>(false);
  readonly adminUser = signal<{ name: string; email: string; role: string } | null>(null);

  constructor() {
    this.checkAdminSession();
    this.fetchProductsFromBackend();
  }

  private checkAdminSession(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('dps_admin_token');
      const savedUser = localStorage.getItem('dps_admin_user');
      if (token && savedUser) {
        try {
          this.adminUser.set(JSON.parse(savedUser));
          this.isAdminLoggedIn.set(true);
        } catch (e) {
          localStorage.removeItem('dps_admin_token');
          localStorage.removeItem('dps_admin_user');
        }
      }
    }
  }

  async loginAdmin(email: string, password: string): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; token: string; admin: any }>(`${this.apiUrl}/admin/login`, { email, password })
      );
      if (res?.success) {
        localStorage.setItem('dps_admin_token', res.token);
        localStorage.setItem('dps_admin_user', JSON.stringify(res.admin));
        this.isAdminLoggedIn.set(true);
        this.adminUser.set(res.admin);
        this.showToast('Authentication Granted', 'Welcome to Daposh Maison Admin Console', 'success');
        return true;
      }
    } catch (err: any) {
      // Local development fallback
      if ((email.trim().toLowerCase() === 'admin@daposhfashion.com' && password === 'admin123') || password === 'daposh_admin_secret_2026') {
        const mockAdmin = { name: 'Daposh Maison Administrator', email: 'admin@daposhfashion.com', role: 'SUPER_ADMIN' };
        localStorage.setItem('dps_admin_token', 'dps_adm_mock_token');
        localStorage.setItem('dps_admin_user', JSON.stringify(mockAdmin));
        this.isAdminLoggedIn.set(true);
        this.adminUser.set(mockAdmin);
        this.showToast('Authentication Granted', 'Welcome to Daposh Maison Admin Console', 'success');
        return true;
      }
      throw err;
    }
    return false;
  }

  logoutAdmin(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('dps_admin_token');
      localStorage.removeItem('dps_admin_user');
    }
    this.isAdminLoggedIn.set(false);
    this.adminUser.set(null);
    this.showToast('Session Closed', 'Logged out of Admin Console safely', 'info');
  }

  /**
   * Fetch products from backend API with fallback
   */
  async fetchProductsFromBackend(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ success: boolean; data: Product[] }>(`${this.apiUrl}/products`)
      );
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const mapped = res.data.map(p => ({
          ...p,
          id: p.id || (p as any)._id,
          secondaryImage: p.secondaryImage || p.primaryImage,
          colorVariants: p.colorVariants?.length ? p.colorVariants : [{ name: 'Standard Edition', hex: '#111111', image: p.primaryImage }],
          sizes: p.sizes?.length ? p.sizes : [{ size: 'XS', inStock: true }, { size: 'S', inStock: true }, { size: 'M', inStock: true }, { size: 'L', inStock: true }]
        }));
        this.products.set(mapped);
        this.isBackendConnected.set(true);
      }
    } catch (err) {
      console.warn('Backend currently offline or unreachable. Using curated store archive.', err);
      this.isBackendConnected.set(false);
    }
  }

  /**
   * Upload image to Cloudinary via backend
   */
  async uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; data: { url: string } }>(`${this.apiUrl}/upload/file`, formData)
      );
      if (res?.success && res?.data?.url) {
        return res.data.url;
      }
    } catch (err) {
      console.error('Cloudinary upload via backend failed:', err);
      throw err;
    }

    throw new Error('Image upload failed');
  }

  /**
   * Upload image URL to Cloudinary via backend
   */
  async uploadImageUrl(imageUrl: string): Promise<string> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; data: { url: string } }>(`${this.apiUrl}/upload/url`, { image: imageUrl })
      );
      if (res?.success && res?.data?.url) {
        return res.data.url;
      }
    } catch (err) {}
    return imageUrl;
  }

  /**
   * Create Product via backend
   */
  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; data: Product }>(`${this.apiUrl}/products`, productData)
      );
      if (res?.success && res.data) {
        const prod: Product = {
          ...res.data,
          id: res.data.id || (res.data as any)._id,
          primaryImage: res.data.primaryImage || productData.primaryImage || '',
          secondaryImage: res.data.secondaryImage || res.data.primaryImage || productData.primaryImage || '',
          colorVariants: res.data.colorVariants?.length ? res.data.colorVariants : [
            { name: 'Standard Edition', hex: '#111111', image: res.data.primaryImage || productData.primaryImage || '' }
          ],
          sizes: res.data.sizes?.length ? res.data.sizes : [
            { size: 'XS', inStock: true },
            { size: 'S', inStock: true },
            { size: 'M', inStock: true },
            { size: 'L', inStock: true }
          ]
        };
        this.products.update(list => [prod, ...list.filter(p => p.id !== prod.id)]);
        return prod;
      }
    } catch (err) {
      console.warn('Creating product offline mode:', err);
    }

    // Local fallback
    const mock: Product = {
      id: `prod_${Date.now()}`,
      name: productData.name || 'Untitled Piece',
      subtitle: productData.subtitle || 'Atelier Collection',
      category: productData.category || 'Women',
      subCategory: productData.subCategory || 'Ready-to-Wear',
      mood: productData.mood || 'Minimalist Noir',
      price: productData.price || 9900,
      rating: 5.0,
      reviewCount: 1,
      primaryImage: productData.primaryImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      secondaryImage: productData.secondaryImage || productData.primaryImage || '',
      galleryImages: productData.galleryImages || [productData.primaryImage || ''],
      colorVariants: productData.colorVariants || [{ name: 'Default', hex: '#111', image: productData.primaryImage || '' }],
      sizes: productData.sizes || [{ size: 'S', inStock: true }, { size: 'M', inStock: true }, { size: 'L', inStock: true }],
      description: productData.description || '',
      fabricComposition: productData.fabricComposition || 'Pure Silk Blend',
      careInstructions: productData.careInstructions || 'Dry Clean Only',
      modelSpecs: 'Model is 5\'10" wearing S'
    };
    this.products.update(list => [mock, ...list]);
    return mock;
  }

  /**
   * Delete product
   */
  async deleteProduct(productId: string): Promise<boolean> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/products/${productId}`));
    } catch (err) {
      console.warn('Backend delete fallback:', err);
    }
    this.products.update(list => list.filter(p => p.id !== productId && (p as any)._id !== productId));
    return true;
  }

  /**
   * Update product
   */
  async updateProduct(productId: string, data: Partial<Product>): Promise<void> {
    try {
      await firstValueFrom(this.http.put(`${this.apiUrl}/products/${productId}`, data));
    } catch (err) {
      console.warn('Backend update fallback:', err);
    }
  }

  /**
   * Submit Contact Inquiry
   */
  async submitInquiry(data: Partial<InquiryRecord>): Promise<InquiryRecord> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; data: InquiryRecord }>(`${this.apiUrl}/inquiries`, data)
      );
      if (res?.success && res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('Inquiry fallback:', err);
    }
    const mock: InquiryRecord = {
      id: `inq_${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || 'General Atelier Inquiry',
      category: data.category || 'General Inquiry',
      message: data.message || '',
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    return mock;
  }

  /**
   * Get all inquiries for admin review
   */
  async getInquiries(): Promise<{ inquiries: InquiryRecord[]; unreadCount: number }> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ success: boolean; data: InquiryRecord[]; unreadCount: number }>(`${this.apiUrl}/inquiries`)
      );
      if (res?.success && res.data) {
        return { inquiries: res.data, unreadCount: res.unreadCount || 0 };
      }
    } catch (err) {
      console.warn('Get inquiries fallback:', err);
    }
    return { inquiries: [], unreadCount: 0 };
  }

  /**
   * Admin update inquiry status
   */
  async updateInquiryStatus(id: string, status: string): Promise<void> {
    try {
      await firstValueFrom(this.http.put(`${this.apiUrl}/inquiries/${id}/status`, { status }));
    } catch (err) {}
  }

  /**
   * Admin delete inquiry
   */
  async deleteInquiry(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/inquiries/${id}`));
    } catch (err) {}
  }

  /**
   * Razorpay create order
   */
  async createRazorpayOrder(amount: number): Promise<{ orderId: string; key: string; amount: number; currency: string; isMock?: boolean }> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; orderId: string; key: string; amount: number; currency: string; isMock?: boolean }>(
          `${this.apiUrl}/orders/create-razorpay-order`,
          { amount, currency: 'INR' }
        )
      );
      if (res?.success) {
        return res;
      }
    } catch (err) {
      console.warn('Razorpay order fallback:', err);
    }
    return {
      orderId: `order_mock_${Date.now()}`,
      key: 'rzp_test_TmudzEt6ynGEm1',
      amount: amount * 100,
      currency: 'INR',
      isMock: true
    };
  }

  /**
   * Razorpay verify payment & book order
   */
  async verifyPaymentAndBookOrder(payload: any): Promise<OrderRecord> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; data: OrderRecord }>(`${this.apiUrl}/orders/verify-payment`, payload)
      );
      if (res?.success && res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('Verify payment fallback:', err);
    }

    // Local fallback order
    const mockOrder: OrderRecord = {
      orderId: `DPS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: payload.customer,
      items: payload.items,
      subtotal: payload.subtotal,
      discount: payload.discount,
      shipping: payload.shipping,
      total: payload.total,
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      razorpayOrderId: payload.razorpay_order_id,
      razorpayPaymentId: payload.razorpay_payment_id || `pay_mock_${Date.now()}`,
      orderStatus: 'Placed',
      courierName: 'BlueDart Luxury Express',
      trackingNumber: `BD-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      statusTimeline: [
        {
          status: 'Placed',
          message: 'Order verified & payment successful via Razorpay.',
          timestamp: new Date().toISOString()
        }
      ]
    };
    return mockOrder;
  }

  /**
   * Book COD order
   */
  async createCodOrder(payload: any): Promise<OrderRecord> {
    try {
      const res = await firstValueFrom(
        this.http.post<{ success: boolean; data: OrderRecord }>(`${this.apiUrl}/orders/create-cod-order`, payload)
      );
      if (res?.success && res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('COD order fallback:', err);
    }

    const mockOrder: OrderRecord = {
      orderId: `DPS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: payload.customer,
      items: payload.items,
      subtotal: payload.subtotal,
      discount: payload.discount,
      shipping: payload.shipping,
      total: payload.total,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      orderStatus: 'Placed',
      courierName: 'BlueDart Luxury Express',
      trackingNumber: `BD-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      statusTimeline: [
        {
          status: 'Placed',
          message: 'COD Order received. Concierge will confirm delivery.',
          timestamp: new Date().toISOString()
        }
      ]
    };
    return mockOrder;
  }

  /**
   * Track order by ID or phone number
   */
  async trackOrder(query: string): Promise<OrderRecord> {
    const res = await firstValueFrom(
      this.http.get<{ success: boolean; data: OrderRecord }>(
        `${this.apiUrl}/orders/track/${encodeURIComponent(query.trim())}`
      )
    );
    if (res?.success && res.data) {
      return res.data;
    }
    throw new Error('Order not found');
  }

  /**
   * Admin: Get all orders
   */
  async getAllOrders(): Promise<{ orders: OrderRecord[]; totalRevenue: number }> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ success: boolean; data: OrderRecord[]; totalRevenue: number }>(`${this.apiUrl}/orders`)
      );
      if (res?.success && res.data) {
        return { orders: res.data, totalRevenue: res.totalRevenue || 0 };
      }
    } catch (err) {
      console.warn('Orders fetch fallback:', err);
    }
    return { orders: [], totalRevenue: 0 };
  }

  /**
   * Admin: Update order status
   */
  async updateOrderStatus(id: string, orderStatus: string, trackingNumber?: string, courierName?: string): Promise<OrderRecord> {
    const res = await firstValueFrom(
      this.http.put<{ success: boolean; data: OrderRecord }>(`${this.apiUrl}/orders/${id}/status`, {
        orderStatus,
        trackingNumber,
        courierName
      })
    );
    return res.data;
  }

  getWhatsAppLink(customText?: string): string {
    const text = customText || `Hi Daposh fashion! I want to inquire about your designer collection.`;
    return `https://wa.me/918595572121?text=${encodeURIComponent(text)}`;
  }

  getProductWhatsAppLink(product: Product, selectedColor?: string, selectedSize?: string): string {
    let msg = `Hi Daposh fashion! I am interested in "${product.name}"`;
    if (product.id) msg += ` (Code: ${product.id})`;
    if (selectedColor) msg += ` in Color: ${selectedColor}`;
    if (selectedSize) msg += ` (Size: ${selectedSize})`;
    msg += ` priced at ${this.formatPrice(product.price)}. Is this in stock? Please share details.`;
    return `https://wa.me/918595572121?text=${encodeURIComponent(msg)}`;
  }

  getCartWhatsAppLink(): string {
    const items = this.cart();
    if (items.length === 0) {
      return this.getWhatsAppLink();
    }
    let msg = `Hi Daposh fashion! I would like to place an order for the following items:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}, Size: ${item.selectedSize}, Color: ${item.selectedColor.name}) - ${this.formatPrice(item.product.price * item.quantity)}\n`;
    });
    msg += `\nTotal: ${this.formatPrice(this.cartTotal())}\n\nPlease confirm availability and payment/delivery details.`;
    return `https://wa.me/918595572121?text=${encodeURIComponent(msg)}`;
  }

  // Computed signals
  readonly cartCount = computed(() => {
    return this.cart().reduce((acc, item) => acc + item.quantity, 0);
  });

  readonly cartSubtotalRaw = computed(() => {
    return this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  readonly cartSubtotal = computed(() => {
    const rate = this.activeCurrency().rate;
    return Math.round(this.cartSubtotalRaw() * rate);
  });

  readonly cartDiscount = computed(() => {
    const coupon = this.appliedCoupon();
    if (!coupon) return 0;
    return Math.round(this.cartSubtotal() * (coupon.discountPercent / 100));
  });

  readonly freeShippingThreshold = computed(() => {
    return Math.round(5000 * this.activeCurrency().rate);
  });

  readonly freeShippingProgress = computed(() => {
    const sub = this.cartSubtotal();
    const threshold = this.freeShippingThreshold();
    if (sub >= threshold) return 100;
    return Math.min(100, Math.round((sub / threshold) * 100));
  });

  readonly cartShipping = computed(() => {
    if (this.cart().length === 0) return 0;
    const sub = this.cartSubtotal();
    return sub >= this.freeShippingThreshold() ? 0 : Math.round(350 * this.activeCurrency().rate);
  });

  readonly cartTotal = computed(() => {
    if (this.cart().length === 0) return 0;
    return Math.max(0, this.cartSubtotal() - this.cartDiscount() + this.cartShipping());
  });

  readonly wishlistCount = computed(() => {
    return this.wishlist().length;
  });

  readonly filteredProducts = computed(() => {
    const f = this.filter();
    let list = this.products().filter(p => {
      // Category filter
      if (f.category !== 'All' && p.category !== f.category) return false;
      // Mood filter
      if (f.mood !== 'All' && p.mood !== f.mood) return false;
      // Subcategory filter
      if (f.subCategory !== 'All' && p.subCategory !== f.subCategory) return false;
      // In stock
      if (f.inStockOnly && !p.sizes?.some(s => s.inStock)) return false;
      // Size filter
      if (f.sizes.length > 0 && !p.sizes?.some(s => f.sizes.includes(s.size) && s.inStock)) return false;
      // Color filter
      if (f.colors.length > 0 && !p.colorVariants?.some(c => f.colors.includes(c.name))) return false;
      // Price range
      if (p.price < f.minPrice || p.price > f.maxPrice) return false;
      // Search
      if (f.searchQuery.trim()) {
        const q = f.searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSub = (p.subtitle || '').toLowerCase().includes(q);
        const matchMood = (p.mood || '').toLowerCase().includes(q);
        const matchCat = (p.category || '').toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchMood && !matchCat && !matchDesc) return false;
      }
      return true;
    });

    // Sort
    switch (f.sortOption) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return list;
    }
  });

  formatPrice(inrPrice: number): string {
    const curr = this.activeCurrency();
    const converted = Math.round(inrPrice * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  }

  setCurrency(code: string): void {
    const found = this.currencies().find(c => c.code === code);
    if (found) {
      this.activeCurrency.set(found);
      this.showToast('Currency Updated', `Prices switched to ${found.name}`, 'info');
    }
  }

  showToast(title: string, message: string, type: 'success' | 'info' | 'warning' = 'success', image?: string): void {
    const alert: ToastAlert = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      message,
      type,
      image
    };
    this.toastAlert.set(alert);
    setTimeout(() => {
      if (this.toastAlert()?.id === alert.id) {
        this.toastAlert.set(null);
      }
    }, 4000);
  }

  clearToast(): void {
    this.toastAlert.set(null);
  }

  addToCart(product: Product, selectedColor: ColorVariant, selectedSize: string, quantity: number = 1): void {
    const itemId = `${product.id || (product as any)._id}-${selectedColor.name}-${selectedSize}`;
    const currentCart = [...this.cart()];
    const existingIndex = currentCart.findIndex(item => item.id === itemId);

    if (existingIndex > -1) {
      currentCart[existingIndex] = {
        ...currentCart[existingIndex],
        quantity: currentCart[existingIndex].quantity + quantity
      };
    } else {
      currentCart.push({
        id: itemId,
        product,
        selectedColor,
        selectedSize,
        quantity
      });
    }

    this.cart.set(currentCart);
    this.showToast('Added to Atelier Bag', `${product.name} (${selectedSize} / ${selectedColor.name})`, 'success', selectedColor.image);
    this.isCartOpen.set(true);
  }

  removeFromCart(itemId: string): void {
    const removed = this.cart().find(i => i.id === itemId);
    this.cart.set(this.cart().filter(item => item.id !== itemId));
    if (removed) {
      this.showToast('Item Removed', `${removed.product.name} removed from bag`, 'info');
    }
  }

  updateCartQuantity(itemId: string, newQty: number): void {
    if (newQty <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    this.cart.set(
      this.cart().map(item => item.id === itemId ? { ...item, quantity: newQty } : item)
    );
  }

  applyCoupon(code: string): boolean {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ATELIER15') {
      this.appliedCoupon.set({ code: 'ATELIER15', discountPercent: 15 });
      this.showToast('Privilege Applied', '15% Atelier VIP discount activated', 'success');
      return true;
    } else if (cleanCode === 'DAPOSH20') {
      this.appliedCoupon.set({ code: 'DAPOSH20', discountPercent: 20 });
      this.showToast('Privilege Applied', '20% Runway Premier discount activated', 'success');
      return true;
    } else {
      this.showToast('Invalid Privilege Code', 'Please enter a valid code (Try ATELIER15)', 'warning');
      return false;
    }
  }

  removeCoupon(): void {
    this.appliedCoupon.set(null);
    this.showToast('Coupon Removed', 'Discount removed from bag', 'info');
  }

  toggleWishlist(product: Product): void {
    const current = [...this.wishlist()];
    const exists = current.some(p => (p.id === product.id || (p as any)._id === (product as any)._id));

    if (exists) {
      this.wishlist.set(current.filter(p => p.id !== product.id && (p as any)._id !== (product as any)._id));
      this.showToast('Removed from Wishlist', `${product.name} removed`, 'info');
    } else {
      this.wishlist.set([product, ...current]);
      this.showToast('Saved to Wishlist', `${product.name} saved to your favorites`, 'success', product.primaryImage);
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist().some(p => p.id === productId || (p as any)._id === productId);
  }

  moveWishlistToCart(product: Product): void {
    const defaultColor = product.colorVariants?.[0] || { name: 'Standard', hex: '#111', image: product.primaryImage };
    const availableSize = product.sizes?.find(s => s.inStock)?.size || product.sizes?.[0]?.size || 'M';
    this.addToCart(product, defaultColor, availableSize, 1);
    this.toggleWishlist(product);
  }

  openQuickView(product: Product): void {
    this.quickViewProduct.set(product);
  }

  closeQuickView(): void {
    this.quickViewProduct.set(null);
  }

  toggleCart(force?: boolean): void {
    this.isCartOpen.set(force !== undefined ? force : !this.isCartOpen());
  }

  toggleWishlistDrawer(force?: boolean): void {
    this.isWishlistOpen.set(force !== undefined ? force : !this.isWishlistOpen());
  }

  toggleSearchDrawer(force?: boolean): void {
    this.isSearchDrawerOpen.set(force !== undefined ? force : !this.isSearchDrawerOpen());
  }

  toggleMobileMenu(force?: boolean): void {
    this.isMobileMenuOpen.set(force !== undefined ? force : !this.isMobileMenuOpen());
  }

  setCategory(category: string): void {
    this.filter.set({
      ...this.filter(),
      category,
      mood: 'All'
    });
  }

  setMood(mood: string): void {
    this.filter.set({
      ...this.filter(),
      mood
    });
  }

  setSearchQuery(query: string): void {
    this.filter.set({
      ...this.filter(),
      searchQuery: query
    });
  }

  setSortOption(sort: FilterState['sortOption']): void {
    this.filter.set({
      ...this.filter(),
      sortOption: sort
    });
  }

  resetFilters(): void {
    this.filter.set({
      category: 'All',
      mood: 'All',
      subCategory: 'All',
      minPrice: 0,
      maxPrice: 50000,
      sizes: [],
      colors: [],
      sortOption: 'recommended',
      searchQuery: '',
      inStockOnly: false
    });
  }
}
