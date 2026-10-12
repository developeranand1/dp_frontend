import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FashionService, OrderRecord, InquiryRecord } from '../../services/fashion.service';
import { Product } from '../../models/fashion.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="admin-wrapper bg-light min-vh-100">
      
      <!-- 1. LOGIN GATE: Shown if Admin is NOT logged in -->
      @if (!fashionService.isAdminLoggedIn()) {
        <div class="admin-login-stage d-flex align-items-center justify-content-center p-3 p-md-5">
          <div class="admin-login-card bg-white shadow-2xl p-4 p-md-5 border text-center animate-fade-in" style="max-width: 480px; width: 100%;">
            
            <!-- Luxury Maison Seal -->
            <div class="maison-seal mx-auto mb-3 d-flex align-items-center justify-content-center">
              <i class="bi bi-shield-lock-fill text-champagne fs-2"></i>
            </div>

            <span class="badge-editorial badge-champagne mb-2">SECURE CONCIERGE GATEWAY</span>
            <h2 class="font-serif fw-bold mb-1 fs-3">DAPOSH FASHION</h2>
            <p class="text-muted small mb-4">
              Restricted Maison Management Console. Please authenticate with administrator credentials to manage products, Cloudinary uploads and customer orders.
            </p>

            @if (loginError()) {
              <div class="alert alert-danger rounded-0 p-2 small mb-3 text-start">
                <i class="bi bi-exclamation-triangle-fill me-1"></i> {{ loginError() }}
              </div>
            }

            <form (ngSubmit)="onLoginSubmit()">
              <div class="mb-3 text-start">
                <label class="form-label small fw-bold text-dark">Administrator Email</label>
                <div class="input-group">
                  <span class="input-group-text bg-light rounded-0 border-end-0 text-muted">
                    <i class="bi bi-person-fill"></i>
                  </span>
                  <input 
                    type="email" 
                    class="form-control rounded-0 border-start-0" 
                    placeholder="admin@daposhfashion.com" 
                    required 
                    [(ngModel)]="loginEmail" 
                    name="loginEmail"
                  />
                </div>
              </div>

              <div class="mb-4 text-start">
                <label class="form-label small fw-bold text-dark">Master Key / Password</label>
                <div class="input-group">
                  <span class="input-group-text bg-light rounded-0 border-end-0 text-muted">
                    <i class="bi bi-key-fill"></i>
                  </span>
                  <input 
                    [type]="showPassword() ? 'text' : 'password'" 
                    class="form-control rounded-0 border-start-0 border-end-0" 
                    placeholder="Enter password (e.g. admin123)" 
                    required 
                    [(ngModel)]="loginPassword" 
                    name="loginPassword"
                  />
                  <button 
                    type="button" 
                    class="btn btn-light rounded-0 border border-start-0 text-muted" 
                    (click)="showPassword.update(v => !v)">
                    <i class="bi" [ngClass]="showPassword() ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                class="btn btn-dark w-100 py-3 rounded-0 fw-bold letter-spacing-medium mb-3"
                [disabled]="isLoggingIn()">
                @if (isLoggingIn()) {
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  VERIFYING CREDENTIALS...
                } @else {
                  <i class="bi bi-unlock-fill me-1"></i> AUTHENTICATE & ENTER CONSOLE
                }
              </button>

              <!-- Quick Demo Fill Helper -->
              <div class="p-2 bg-light border text-start small mb-3" style="font-size: 0.75rem;">
                <span class="fw-bold d-block text-dark">Default Credentials:</span>
                <span class="text-muted">Email: <code>admin@daposhfashion.com</code> &bull; Password: <code>admin123</code></span>
                <button 
                  type="button" 
                  class="btn btn-link btn-sm p-0 d-block mt-1 text-decoration-none fw-bold text-primary" 
                  (click)="fillDemoCredentials()">
                  &rarr; Click here to auto-fill credentials
                </button>
              </div>

              <div class="text-center">
                <a routerLink="/" class="text-muted small text-decoration-none">
                  <i class="bi bi-arrow-left me-1"></i> Return to Customer Storefront
                </a>
              </div>
            </form>

          </div>
        </div>
      }

      <!-- 2. AUTHENTICATED ADMIN DASHBOARD: Shown only after Login -->
      @if (fashionService.isAdminLoggedIn()) {
        <div class="admin-dashboard-page py-4 py-lg-5 animate-fade-in">
          <div class="container-fluid px-3 px-lg-5">
            
            <!-- Header Banner -->
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 p-4 bg-dark text-white rounded-1 shadow-sm mb-4">
              <div>
                <div class="d-inline-flex align-items-center gap-2 mb-1">
                  <span class="badge badge-champagne text-dark fw-bold">DAPOSH MAISON MANAGEMENT</span>
                  <span class="small text-white-50 letter-spacing-medium">
                    LOGGED IN AS: <strong class="text-white">{{ fashionService.adminUser()?.email || 'admin@daposhfashion.com' }}</strong>
                  </span>
                </div>
                <h2 class="font-serif fs-3 fw-bold mb-0 text-white">Atelier Admin Control Panel</h2>
                <small class="text-white-50">Manage Products, Categories, Cloudinary Uploads & Razorpay Customer Orders</small>
              </div>

              <div class="d-flex align-items-center gap-2">
                <span class="badge" [ngClass]="fashionService.isBackendConnected() ? 'bg-success' : 'bg-warning text-dark'">
                  <i class="bi bi-circle-fill me-1" style="font-size: 0.6rem;"></i>
                  {{ fashionService.isBackendConnected() ? 'API LIVE (ONLINE)' : 'STORE ARCHIVE MODE' }}
                </span>
                <a routerLink="/" class="btn btn-sm btn-outline-light rounded-0 px-3 fw-bold letter-spacing-medium" style="font-size: 0.72rem;">
                  <i class="bi bi-eye me-1"></i> VIEW LIVE STORE
                </a>
                <button class="btn btn-sm btn-danger rounded-0 px-3 fw-bold letter-spacing-medium" style="font-size: 0.72rem;" (click)="onLogout()">
                  <i class="bi bi-box-arrow-right me-1"></i> LOGOUT
                </button>
              </div>
            </div>

            <!-- Metric KPI Cards (5 Equal Interactive Cards with Direct Tab Switching) -->
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5 g-3 mb-4">
              
              <!-- Card 1: Catalog Products -->
              <div class="col">
                <div 
                  class="card admin-kpi-card h-100 p-3 bg-white shadow-sm"
                  [class.kpi-active]="activeTab() === 'products'"
                  (click)="activeTab.set('products')">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="small text-muted fw-bold letter-spacing-medium">CATALOG PRODUCTS</span>
                    <div class="kpi-icon-pill bg-dark text-champagne"><i class="bi bi-grid-3x3-gap"></i></div>
                  </div>
                  <h3 class="font-serif fw-bold mb-1 fs-2 text-dark">{{ fashionService.products().length }}</h3>
                  <div class="d-flex align-items-center justify-content-between pt-2 border-top border-light mt-auto">
                    <small class="text-success"><i class="bi bi-check-circle-fill me-1"></i>Active pieces</small>
                    <span class="kpi-link-arrow small text-muted">&rarr; Manage</span>
                  </div>
                </div>
              </div>

              <!-- Card 2: Total Orders -->
              <div class="col">
                <div 
                  class="card admin-kpi-card h-100 p-3 bg-white shadow-sm"
                  [class.kpi-active]="activeTab() === 'orders'"
                  (click)="activeTab.set('orders')">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="small text-muted fw-bold letter-spacing-medium">TOTAL ORDERS</span>
                    <div class="kpi-icon-pill bg-success-subtle text-success"><i class="bi bi-bag-check-fill"></i></div>
                  </div>
                  <h3 class="font-serif fw-bold mb-1 fs-2 text-dark">{{ orders().length }}</h3>
                  <div class="d-flex align-items-center justify-content-between pt-2 border-top border-light mt-auto">
                    <small class="text-muted">Razorpay &amp; COD</small>
                    <span class="kpi-link-arrow small text-muted">&rarr; Orders</span>
                  </div>
                </div>
              </div>

              <!-- Card 3: Total Revenue -->
              <div class="col">
                <div 
                  class="card admin-kpi-card h-100 p-3 bg-white shadow-sm"
                  [class.kpi-active]="activeTab() === 'orders'"
                  (click)="activeTab.set('orders')">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="small text-muted fw-bold letter-spacing-medium">TOTAL REVENUE</span>
                    <div class="kpi-icon-pill bg-warning-subtle text-warning-emphasis"><i class="bi bi-cash-stack"></i></div>
                  </div>
                  <h3 class="font-serif fw-bold mb-1 fs-3 text-dark text-truncate" [title]="fashionService.formatPrice(totalRevenue())">
                    {{ fashionService.formatPrice(totalRevenue()) }}
                  </h3>
                  <div class="d-flex align-items-center justify-content-between pt-2 border-top border-light mt-auto">
                    <small class="text-success"><i class="bi bi-shield-check me-1"></i>Verified</small>
                    <span class="kpi-link-arrow small text-muted">&rarr; Ledger</span>
                  </div>
                </div>
              </div>

              <!-- Card 4: Pending Shipments -->
              <div class="col">
                <div 
                  class="card admin-kpi-card h-100 p-3 bg-white shadow-sm"
                  [class.kpi-active]="activeTab() === 'orders'"
                  (click)="activeTab.set('orders')">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="small text-muted fw-bold letter-spacing-medium">PENDING SHIPMENTS</span>
                    <div class="kpi-icon-pill bg-danger-subtle text-danger"><i class="bi bi-truck"></i></div>
                  </div>
                  <h3 class="font-serif fw-bold mb-1 fs-2 text-dark">{{ pendingOrdersCount() }}</h3>
                  <div class="d-flex align-items-center justify-content-between pt-2 border-top border-light mt-auto">
                    <small class="text-danger fw-semibold">Action required</small>
                    <span class="kpi-link-arrow small text-muted">&rarr; Dispatch</span>
                  </div>
                </div>
              </div>

              <!-- Card 5: Customer Inquiries -->
              <div class="col">
                <div 
                  class="card admin-kpi-card h-100 p-3 bg-white shadow-sm"
                  [class.kpi-active]="activeTab() === 'inquiries'"
                  (click)="activeTab.set('inquiries')">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="small text-muted fw-bold letter-spacing-medium">CUSTOMER QUERIES</span>
                    <div class="kpi-icon-pill bg-primary-subtle text-primary position-relative">
                      <i class="bi bi-chat-heart-fill"></i>
                      @if (unreadInquiriesCount() > 0) {
                        <span class="kpi-notify-dot"></span>
                      }
                    </div>
                  </div>
                  <div class="d-flex align-items-baseline gap-2">
                    <h3 class="font-serif fw-bold mb-1 fs-2 text-dark">{{ inquiries().length }}</h3>
                    @if (unreadInquiriesCount() > 0) {
                      <span class="badge bg-danger rounded-pill px-2 py-1" style="font-size: 0.65rem;">{{ unreadInquiriesCount() }} NEW</span>
                    }
                  </div>
                  <div class="d-flex align-items-center justify-content-between pt-2 border-top border-light mt-auto">
                    <small class="text-primary fw-semibold">Contact desk</small>
                    <span class="kpi-link-arrow small text-muted">&rarr; Inquiries</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Modern Luxury Segmented Navigation Tabs -->
            <div class="admin-segmented-tabs-wrapper mb-4 p-2 bg-white rounded-2 shadow-sm border d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div class="d-flex flex-wrap gap-2 flex-grow-1">
                <button 
                  type="button"
                  class="admin-tab-btn d-flex align-items-center gap-2 py-2 px-3 rounded-1 fw-bold border-0 transition-all" 
                  [class.tab-btn-active]="activeTab() === 'add-product'"
                  (click)="activeTab.set('add-product')">
                  <i class="bi bi-plus-circle-fill"></i>
                  <span>ADD NEW PRODUCT (CLOUDINARY)</span>
                </button>

                <button 
                  type="button"
                  class="admin-tab-btn d-flex align-items-center gap-2 py-2 px-3 rounded-1 fw-bold border-0 transition-all" 
                  [class.tab-btn-active]="activeTab() === 'products'"
                  (click)="activeTab.set('products')">
                  <i class="bi bi-boxes"></i>
                  <span>MANAGE CATALOG ({{ fashionService.products().length }})</span>
                </button>

                <button 
                  type="button"
                  class="admin-tab-btn d-flex align-items-center gap-2 py-2 px-3 rounded-1 fw-bold border-0 transition-all" 
                  [class.tab-btn-active]="activeTab() === 'orders'"
                  (click)="activeTab.set('orders')">
                  <i class="bi bi-receipt"></i>
                  <span>CUSTOMER ORDERS &amp; TRACKING ({{ orders().length }})</span>
                  @if (pendingOrdersCount() > 0) {
                    <span class="badge bg-warning text-dark rounded-pill px-2 py-1 ms-1" style="font-size: 0.68rem;">{{ pendingOrdersCount() }} PENDING</span>
                  }
                </button>

                <button 
                  type="button"
                  class="admin-tab-btn d-flex align-items-center gap-2 py-2 px-3 rounded-1 fw-bold border-0 transition-all" 
                  [class.tab-btn-active]="activeTab() === 'inquiries'"
                  (click)="activeTab.set('inquiries')">
                  <i class="bi bi-envelope-paper-heart-fill"></i>
                  <span>CUSTOMER QUERIES ({{ inquiries().length }})</span>
                  @if (unreadInquiriesCount() > 0) {
                    <span class="badge bg-danger rounded-pill px-2 py-1 ms-1" style="font-size: 0.68rem;">{{ unreadInquiriesCount() }} UNREAD</span>
                  }
                </button>
              </div>

              <!-- Quick Action Refresh -->
              <div class="d-none d-md-flex align-items-center gap-2 px-2">
                <button class="btn btn-sm btn-outline-dark rounded-1 px-3 py-2 fw-semibold" (click)="refreshOrders(); refreshInquiries();" title="Refresh all data">
                  <i class="bi bi-arrow-clockwise me-1"></i> Sync Data
                </button>
              </div>
            </div>

            <!-- TAB 1: ADD NEW PRODUCT WITH CATEGORY & CLOUDINARY -->
            @if (activeTab() === 'add-product') {
              <div class="card border-0 shadow-sm p-4 p-lg-5 bg-white rounded-1 animate-fade-in">
                <div class="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom">
                  <div>
                    <h4 class="font-serif fw-bold mb-1">Add Product to Store Collection</h4>
                    <p class="text-muted small mb-0">Products added here are saved to the backend database & appear live across the customer storefront.</p>
                  </div>
                  <span class="badge badge-champagne text-dark fw-bold">Cloudinary Image Media</span>
                </div>

                <form (ngSubmit)="onSaveProduct()" #productForm="ngForm">
                  <div class="row g-4">
                    
                    <!-- Left Column: Product Details & Category -->
                    <div class="col-12 col-lg-7">
                      <div class="row g-3">
                        
                        <!-- Title -->
                        <div class="col-12">
                          <label class="form-label fw-bold small">Product Title / Name *</label>
                          <input 
                            type="text" 
                            class="form-control rounded-0" 
                            placeholder="e.g. Atelier Pure Mulberry Silk Kimono Trench" 
                            required 
                            [(ngModel)]="newProduct.name" 
                            name="name"
                          />
                        </div>

                        <!-- Subtitle -->
                        <div class="col-12 col-md-6">
                          <label class="form-label fw-bold small">Subtitle / Tagline</label>
                          <input 
                            type="text" 
                            class="form-control rounded-0" 
                            placeholder="e.g. Spring/Summer Runway Edition" 
                            [(ngModel)]="newProduct.subtitle" 
                            name="subtitle"
                          />
                        </div>

                        <!-- Category -->
                        <div class="col-12 col-md-6">
                          <label class="form-label fw-bold small">Category *</label>
                          <select class="form-select rounded-0" [(ngModel)]="newProduct.category" name="category" required>
                            <option value="Women">Women's Atelier</option>
                            <option value="Men">Men's Tailoring</option>
                            <option value="Atelier Studio">Atelier Studio Exclusive</option>
                            <option value="Accessories">Leather Goods & Accessories</option>
                            <option value="Footwear">Artisan Footwear</option>
                          </select>
                        </div>

                        <!-- Sub Category -->
                        <div class="col-12 col-md-6">
                          <label class="form-label fw-bold small">Sub-Category</label>
                          <input 
                            type="text" 
                            class="form-control rounded-0" 
                            placeholder="e.g. Trench Coats, Silk Blouses, Blazers, Loafers" 
                            [(ngModel)]="newProduct.subCategory" 
                            name="subCategory"
                          />
                        </div>

                        <!-- Aesthetic Mood -->
                        <div class="col-12 col-md-6">
                          <label class="form-label fw-bold small">Aesthetic Mood</label>
                          <select class="form-select rounded-0" [(ngModel)]="newProduct.mood" name="mood">
                            <option value="Minimalist Noir">Minimalist Noir</option>
                            <option value="Parisian Chic">Parisian Chic</option>
                            <option value="Riviera Linen">Riviera Linen</option>
                            <option value="Old Money Luxe">Old Money Luxe</option>
                            <option value="Midnight Gala">Midnight Gala</option>
                            <option value="Urban Studio">Urban Studio</option>
                          </select>
                        </div>

                        <!-- Price & MRP -->
                        <div class="col-12 col-md-4">
                          <label class="form-label fw-bold small">Price (₹ INR) *</label>
                          <input 
                            type="number" 
                            class="form-control rounded-0" 
                            placeholder="14500" 
                            required 
                            [(ngModel)]="newProduct.price" 
                            name="price"
                          />
                        </div>

                        <div class="col-12 col-md-4">
                          <label class="form-label fw-bold small">Original MRP (₹)</label>
                          <input 
                            type="number" 
                            class="form-control rounded-0" 
                            placeholder="18500" 
                            [(ngModel)]="newProduct.originalPrice" 
                            name="originalPrice"
                          />
                        </div>

                        <div class="col-12 col-md-4">
                          <label class="form-label fw-bold small">Badge Text</label>
                          <input 
                            type="text" 
                            class="form-control rounded-0" 
                            placeholder="Runway SS26, Limited Edition" 
                            [(ngModel)]="newProduct.badge" 
                            name="badge"
                          />
                        </div>

                        <!-- Description -->
                        <div class="col-12">
                          <label class="form-label fw-bold small">Editorial Description</label>
                          <textarea 
                            class="form-control rounded-0" 
                            rows="3" 
                            placeholder="Describe the fabric silhouette, artisan finishing, buttons, cut..."
                            [(ngModel)]="newProduct.description" 
                            name="description">
                          </textarea>
                        </div>

                        <!-- Fabric & Care -->
                        <div class="col-12 col-md-6">
                          <label class="form-label fw-bold small">Fabric Composition</label>
                          <input 
                            type="text" 
                            class="form-control rounded-0" 
                            placeholder="100% Mulberry Silk / Hand-tailored" 
                            [(ngModel)]="newProduct.fabricComposition" 
                            name="fabricComposition"
                          />
                        </div>

                        <div class="col-12 col-md-6">
                          <label class="form-label fw-bold small">Care Instructions</label>
                          <input 
                            type="text" 
                            class="form-control rounded-0" 
                            placeholder="Specialist Dry Clean Only" 
                            [(ngModel)]="newProduct.careInstructions" 
                            name="careInstructions"
                          />
                        </div>

                      </div>
                    </div>

                    <!-- Right Column: Cloudinary Image Upload & Preview -->
                    <div class="col-12 col-lg-5">
                      <div class="p-3 bg-light border">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <label class="form-label fw-bold small mb-0">CLOUDINARY IMAGE UPLOAD</label>
                          <span class="badge bg-dark text-champagne small">Auto CDN</span>
                        </div>
                        
                        <p class="text-muted small mb-3" style="font-size: 0.78rem;">
                          Upload image from your device directly to Cloudinary or specify a web image URL.
                        </p>

                        <!-- File Picker for Cloudinary -->
                        <div class="mb-3">
                          <input 
                            type="file" 
                            class="form-control rounded-0" 
                            accept="image/*"
                            (change)="onFileSelected($event)"
                          />
                          @if (isUploadingImage()) {
                            <div class="d-flex align-items-center gap-2 mt-2 text-primary small">
                              <span class="spinner-border spinner-border-sm"></span>
                              <span>Uploading directly to Cloudinary CDN...</span>
                            </div>
                          }
                        </div>

                        <div class="text-center text-muted small my-2">&bull; OR DIRECT IMAGE URL &bull;</div>

                        <div class="mb-3">
                          <input 
                            type="text" 
                            class="form-control rounded-0" 
                            placeholder="https://images.unsplash.com/..." 
                            [(ngModel)]="newProduct.primaryImage" 
                            name="primaryImage"
                          />
                        </div>

                        <!-- Live Image Preview Card -->
                        <div class="image-preview-card text-center p-2 border bg-white mt-2">
                          <span class="d-block small text-muted mb-2 fw-semibold">RUNWAY PREVIEW</span>
                          <img 
                            [src]="newProduct.primaryImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'" 
                            alt="Preview" 
                            class="w-100 object-fit-cover shadow-sm rounded-0" 
                            style="height: 240px;" 
                          />
                        </div>

                        <!-- Quick Checkboxes -->
                        <div class="d-flex flex-wrap gap-3 mt-3 pt-2 border-top">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="chkNew" [(ngModel)]="newProduct.isNew" name="isNew">
                            <label class="form-check-label small" for="chkNew">New Arrival</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="chkBestseller" [(ngModel)]="newProduct.isBestseller" name="isBestseller">
                            <label class="form-check-label small" for="chkBestseller">Bestseller</label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="chkTrending" [(ngModel)]="newProduct.isTrending" name="isTrending">
                            <label class="form-check-label small" for="chkTrending">Trending</label>
                          </div>
                        </div>

                      </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="col-12 pt-3 border-top d-flex gap-3">
                      <button 
                        type="submit" 
                        class="btn btn-dark rounded-0 px-5 py-3 fw-bold letter-spacing-medium"
                        [disabled]="isSaving()">
                        @if (isSaving()) {
                          <span class="spinner-border spinner-border-sm me-2"></span>
                        }
                        PUBLISH SILHOUETTE TO LIVE STORE
                      </button>
                      <button type="button" class="btn btn-outline-secondary rounded-0 px-4" (click)="resetForm()">
                        Clear Form
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            }

            <!-- TAB 2: MANAGE PRODUCTS CATALOG -->
            @if (activeTab() === 'products') {
              <div class="card border-0 shadow-sm p-4 bg-white rounded-1 animate-fade-in">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-3 mb-3 border-bottom">
                  <div>
                    <h4 class="font-serif fw-bold mb-0">Active Store Catalog</h4>
                    <small class="text-muted">Total {{ filteredCatalog().length }} products displayed</small>
                  </div>

                  <!-- Filter Category & Search -->
                  <div class="d-flex gap-2">
                    <select class="form-select form-select-sm rounded-0" [(ngModel)]="catalogCategoryFilter">
                      <option value="All">All Categories</option>
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                      <option value="Atelier Studio">Atelier Studio</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Footwear">Footwear</option>
                    </select>

                    <input 
                      type="text" 
                      class="form-control form-control-sm rounded-0" 
                      placeholder="Filter by name..." 
                      [(ngModel)]="catalogSearch"
                    />
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="table table-hover align-middle mb-0">
                    <thead class="table-light small">
                      <tr>
                        <th>PREVIEW</th>
                        <th>PRODUCT</th>
                        <th>CATEGORY</th>
                        <th>PRICE (INR)</th>
                        <th>BADGE / MOOD</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (prod of filteredCatalog(); track prod.id) {
                        <tr>
                          <td style="width: 70px;">
                            <img [src]="prod.primaryImage" [alt]="prod.name" class="rounded-0 object-fit-cover shadow-sm" style="width: 50px; height: 65px;" />
                          </td>
                          <td>
                            <strong class="d-block text-dark font-serif">{{ prod.name }}</strong>
                            <small class="text-muted">{{ prod.subtitle }}</small>
                          </td>
                          <td>
                            <span class="badge border bg-light text-dark">{{ prod.category }}</span>
                            <small class="d-block text-muted" style="font-size: 0.72rem;">{{ prod.subCategory }}</small>
                          </td>
                          <td>
                            <strong class="text-dark">{{ fashionService.formatPrice(prod.price) }}</strong>
                            @if (prod.originalPrice && prod.originalPrice > prod.price) {
                              <small class="text-muted text-decoration-line-through d-block" style="font-size: 0.7rem;">
                                {{ fashionService.formatPrice(prod.originalPrice) }}
                              </small>
                            }
                          </td>
                          <td>
                            <span class="badge badge-champagne text-dark fw-bold mb-1 d-inline-block">{{ prod.badge || 'Atelier' }}</span>
                            <small class="d-block text-muted">{{ prod.mood }}</small>
                          </td>
                          <td>
                            <div class="d-flex gap-2">
                              <button class="btn btn-sm btn-outline-dark rounded-0 px-2" (click)="fashionService.openQuickView(prod)" title="Preview item">
                                <i class="bi bi-eye"></i>
                              </button>
                              <button class="btn btn-sm btn-outline-danger rounded-0 px-2" (click)="openDeleteProductConfirm(prod)" title="Delete from store">
                                <i class="bi bi-trash3"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>

              </div>
            }

            <!-- TAB 3: CUSTOMER ORDERS & REAL-TIME DISPATCH TRACKING -->
            @if (activeTab() === 'orders') {
              <div class="card border-0 shadow-sm p-4 bg-white rounded-1 animate-fade-in">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-3 mb-3 border-bottom">
                  <div>
                    <h4 class="font-serif fw-bold mb-0">Customer Orders & Dispatch Portal</h4>
                    <small class="text-muted">Orders acquired via Razorpay payment gateway & Cash on Delivery</small>
                  </div>

                  <button class="btn btn-sm btn-outline-dark rounded-0" (click)="refreshOrders()">
                    <i class="bi bi-arrow-clockwise me-1"></i> Refresh Orders
                  </button>
                </div>

                @if (orders().length === 0) {
                  <div class="text-center py-5">
                    <i class="bi bi-inbox text-muted display-4 mb-3 d-block"></i>
                    <h5 class="font-serif">No Customer Orders Yet</h5>
                    <p class="text-muted small">When users complete checkout via Razorpay or COD, their bookings will appear here instantly.</p>
                  </div>
                } @else {
                  <div class="d-flex flex-column gap-3">
                    @for (ord of orders(); track ord.orderId) {
                      <div class="order-admin-card p-3 p-md-4 border bg-white rounded-1 shadow-sm">
                        
                        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 pb-3 mb-3 border-bottom">
                          <div>
                            <div class="d-flex align-items-center gap-2">
                              <h5 class="font-serif fw-bold mb-0">{{ ord.orderId }}</h5>
                              <span class="badge" [ngClass]="ord.paymentStatus === 'paid' ? 'bg-success text-white' : 'bg-warning text-dark'">
                                {{ ord.paymentStatus | uppercase }} &bull; {{ ord.paymentMethod | uppercase }}
                              </span>
                            </div>
                            <small class="text-muted">
                              Customer: <strong class="text-dark">{{ ord.customer.name }}</strong> ({{ ord.customer.phone }}) &bull; {{ ord.customer.email }}
                            </small>
                          </div>

                          <div class="text-md-end">
                            <strong class="d-block fs-5 text-dark">{{ fashionService.formatPrice(ord.total) }}</strong>
                            <span class="badge bg-dark text-champagne">{{ ord.orderStatus | uppercase }}</span>
                          </div>
                        </div>

                        <!-- Items & Shipping Address -->
                        <div class="row g-3">
                          <div class="col-12 col-md-6">
                            <span class="small text-muted fw-bold d-block mb-1">ITEMS PURCHASED</span>
                            <div class="d-flex flex-wrap gap-2">
                              @for (it of ord.items; track $index) {
                                <div class="p-2 border bg-light d-flex align-items-center gap-2 small" style="font-size: 0.75rem;">
                                  <img [src]="it.primaryImage || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=100&q=80'" class="rounded-0 object-fit-cover" style="width: 32px; height: 40px;" />
                                  <div>
                                    <strong class="d-block text-truncate" style="max-width: 140px;">{{ it.name }}</strong>
                                    <span class="text-muted">Size: {{ it.selectedSize }} &bull; Qty: {{ it.quantity }}</span>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>

                          <div class="col-12 col-md-6">
                            <span class="small text-muted fw-bold d-block mb-1">DELIVERY ADDRESS</span>
                            <p class="small text-muted mb-0" style="line-height: 1.4;">
                              {{ ord.customer.address }}, {{ ord.customer.city }}, {{ ord.customer.state }} - {{ ord.customer.pincode }}
                            </p>
                          </div>
                        </div>

                        <!-- Dispatch Controls -->
                        <div class="mt-3 pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3 bg-light p-3">
                          <div class="d-flex flex-wrap align-items-center gap-2">
                            <label class="small fw-bold mb-0">Update Status:</label>
                            <select 
                              class="form-select form-select-sm rounded-0 w-auto" 
                              [ngModel]="ord.orderStatus"
                              (ngModelChange)="onUpdateStatus(ord.orderId, $event, ord.trackingNumber, ord.courierName)">
                              <option value="Placed">Placed</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>

                          <div class="d-flex align-items-center gap-2">
                            <span class="small text-muted">Tracking AWB:</span>
                            <strong class="font-monospace small">{{ ord.trackingNumber || 'BD-IN-9402812' }}</strong>
                            <a [routerLink]="['/track-order']" [queryParams]="{ id: ord.orderId }" target="_blank" class="btn btn-sm btn-outline-dark rounded-0 px-2 py-1" style="font-size: 0.72rem;">
                              <i class="bi bi-box-arrow-up-right me-1"></i> View Live Tracking
                            </a>
                          </div>
                        </div>

                      </div>
                    }
                  </div>
                }

              </div>
            }

            <!-- TAB 4: CUSTOMER INQUIRIES & CONCIERGE QUERIES -->
            @if (activeTab() === 'inquiries') {
              <div class="card border-0 shadow-sm p-4 bg-white rounded-1 animate-fade-in">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-3 mb-4 border-bottom">
                  <div>
                    <div class="d-flex align-items-center gap-2">
                      <h4 class="font-serif fw-bold mb-0">Customer Inquiries & Concierge Queries</h4>
                      @if (unreadInquiriesCount() > 0) {
                        <span class="badge bg-danger rounded-pill px-2 py-1">{{ unreadInquiriesCount() }} UNREAD</span>
                      }
                    </div>
                    <small class="text-muted">Messages received through Contact Us form and boutique concierge desk</small>
                  </div>

                  <div class="d-flex align-items-center gap-2 flex-wrap">
                    <!-- Status Filter buttons -->
                    <div class="btn-group btn-group-sm" role="group">
                      <button 
                        type="button" 
                        class="btn rounded-0"
                        [ngClass]="inquiryStatusFilter() === 'all' ? 'btn-dark' : 'btn-outline-secondary'"
                        (click)="inquiryStatusFilter.set('all')">
                        All ({{ inquiries().length }})
                      </button>
                      <button 
                        type="button" 
                        class="btn rounded-0"
                        [ngClass]="inquiryStatusFilter() === 'unread' ? 'btn-danger' : 'btn-outline-danger'"
                        (click)="inquiryStatusFilter.set('unread')">
                        Unread ({{ unreadInquiriesCount() }})
                      </button>
                      <button 
                        type="button" 
                        class="btn rounded-0"
                        [ngClass]="inquiryStatusFilter() === 'resolved' ? 'btn-success' : 'btn-outline-success'"
                        (click)="inquiryStatusFilter.set('resolved')">
                        Resolved
                      </button>
                    </div>

                    <button class="btn btn-sm btn-outline-dark rounded-0" (click)="refreshInquiries()">
                      <i class="bi bi-arrow-clockwise me-1"></i> Refresh Queries
                    </button>
                  </div>
                </div>

                @if (filteredInquiries().length === 0) {
                  <div class="text-center py-5">
                    <i class="bi bi-envelope-open text-muted display-4 mb-3 d-block"></i>
                    <h5 class="font-serif">No Inquiries Found</h5>
                    <p class="text-muted small">
                      {{ inquiryStatusFilter() !== 'all' ? 'No inquiries matching the selected filter.' : 'When customers send messages through the Contact page, they will appear here in real time.' }}
                    </p>
                  </div>
                } @else {
                  <div class="d-flex flex-column gap-3">
                    @for (inq of filteredInquiries(); track (inq._id || inq.id || inq.createdAt)) {
                      <div class="inquiry-card p-4 border rounded-1 shadow-sm transition-all bg-white" [ngClass]="inq.status === 'unread' ? 'border-warning border-2' : ''">
                        
                        <div class="d-flex flex-wrap align-items-start justify-content-between gap-2 pb-3 mb-3 border-bottom">
                          <div>
                            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
                              <h5 class="font-serif fw-bold mb-0 text-dark">{{ inq.name }}</h5>
                              
                              <span class="badge" [ngClass]="{
                                'bg-danger text-white': inq.status === 'unread',
                                'bg-secondary text-white': inq.status === 'read',
                                'bg-success text-white': inq.status === 'resolved'
                              }">
                                {{ (inq.status || 'unread') | uppercase }}
                              </span>

                              <span class="badge bg-light text-dark border">{{ inq.category || 'General Inquiry' }}</span>
                            </div>

                            <div class="d-flex flex-wrap align-items-center gap-3 text-muted small">
                              <span><i class="bi bi-telephone me-1 text-dark"></i><strong>{{ inq.phone }}</strong></span>
                              <span><i class="bi bi-envelope me-1 text-dark"></i>{{ inq.email }}</span>
                              @if (inq.createdAt) {
                                <span><i class="bi bi-clock me-1"></i>{{ inq.createdAt | date:'medium' }}</span>
                              }
                            </div>
                          </div>

                          <!-- Action buttons -->
                          <div class="d-flex align-items-center gap-2 flex-wrap">
                            <!-- Direct WhatsApp Connect -->
                            <a [href]="getInquiryWhatsApp(inq)" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success rounded-0 px-3 fw-bold" style="font-size: 0.75rem;">
                              <i class="bi bi-whatsapp me-1"></i> REPLY ON WHATSAPP
                            </a>

                            <!-- Direct Email -->
                            <a [href]="'mailto:' + inq.email + '?subject=' + (inq.subject || 'Daposh Fashion Inquiry Response')" class="btn btn-sm btn-outline-dark rounded-0 px-2 py-1" style="font-size: 0.75rem;" title="Email client">
                              <i class="bi bi-envelope-fill"></i>
                            </a>

                            <!-- Mark as Read / Resolved -->
                            @if (inq.status === 'unread') {
                              <button class="btn btn-sm btn-outline-secondary rounded-0 px-2 py-1" style="font-size: 0.75rem;" (click)="onUpdateInquiryStatus(inq._id || inq.id!, 'read')" title="Mark as read">
                                <i class="bi bi-check me-1"></i> Mark Read
                              </button>
                            }

                            @if (inq.status !== 'resolved') {
                              <button class="btn btn-sm btn-outline-success rounded-0 px-2 py-1" style="font-size: 0.75rem;" (click)="onUpdateInquiryStatus(inq._id || inq.id!, 'resolved')" title="Mark as resolved">
                                <i class="bi bi-check-all me-1"></i> Mark Resolved
                              </button>
                            }

                            <!-- Delete -->
                            <button class="btn btn-sm btn-outline-danger rounded-0 px-2 py-1" style="font-size: 0.75rem;" (click)="openDeleteInquiryConfirm(inq)" title="Delete inquiry">
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>

                        <!-- Subject & Message -->
                        <div class="inquiry-content">
                          <h6 class="font-serif fw-bold text-dark mb-2">
                            <span class="text-champagne me-2">&bull;</span>{{ inq.subject || 'Atelier Consultation Request' }}
                          </h6>
                          <div class="p-3 bg-light rounded-1 text-dark small" style="line-height: 1.8; white-space: pre-wrap;">
                            {{ inq.message }}
                          </div>
                        </div>

                      </div>
                    }
                  </div>
                }

              </div>
            }

          </div>
        </div>
      }

      <!-- Custom Luxury Delete Confirmation Modal Dialog -->
      @if (isDeleteModalOpen() && deleteItemData()) {
        <div class="custom-modal-backdrop animate-fade-in" (click)="closeDeleteModal()"></div>
        <div class="custom-delete-modal-dialog animate-scale-up">
          <div class="card border-0 shadow-2xl p-4 p-md-5 bg-white rounded-2 position-relative text-center">
            
            <!-- Close X button -->
            <button 
              type="button" 
              class="btn-close position-absolute top-0 end-0 m-3" 
              [disabled]="isDeleting()"
              (click)="closeDeleteModal()" 
              aria-label="Close">
            </button>

            <!-- Warning Seal Icon -->
            <div class="delete-warning-seal mx-auto mb-3 d-flex align-items-center justify-content-center">
              <i class="bi bi-trash3-fill text-danger fs-2"></i>
            </div>

            <span class="badge badge-champagne text-dark fw-bold mb-2">CONFIRM ACTION</span>
            <h4 class="font-serif fw-bold text-dark mb-2">
              Delete {{ deleteItemData()?.type === 'product' ? 'Product from Store' : 'Customer Inquiry' }}?
            </h4>

            <p class="text-muted small mb-3" style="line-height: 1.6;">
              Are you sure you want to permanently delete this {{ deleteItemData()?.type === 'product' ? 'piece from active catalog' : 'message record' }}? This action cannot be reversed.
            </p>

            <!-- Target Item Preview Card -->
            <div class="p-3 bg-light border rounded-1 mb-4 text-start">
              <strong class="small text-dark d-block text-truncate">
                {{ deleteItemData()?.title }}
              </strong>
              <small class="text-muted d-block" [innerHTML]="deleteItemData()?.subtitle"></small>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-3 justify-content-center">
              <button 
                type="button" 
                class="btn btn-outline-dark rounded-0 px-4 py-2 small fw-bold flex-grow-1"
                [disabled]="isDeleting()"
                (click)="closeDeleteModal()">
                CANCEL &amp; KEEP
              </button>
              <button 
                type="button" 
                class="btn btn-danger rounded-0 px-4 py-2 small fw-bold flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                [disabled]="isDeleting()"
                (click)="executeDelete()">
                @if (isDeleting()) {
                  <span class="spinner-border spinner-border-sm"></span>
                  <span>DELETING...</span>
                } @else {
                  <i class="bi bi-trash3"></i>
                  <span>YES, DELETE</span>
                }
              </button>
            </div>

          </div>
        </div>
      }

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
    .admin-login-stage {
      min-height: 80vh;
      background: radial-gradient(circle at 50% 20%, #1a1816 0%, #0c0c0c 100%);
    }
    .admin-login-card {
      border-radius: 4px;
      animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .maison-seal {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #0c0c0c;
      border: 2px solid #dfc8a8;
    }
    
    /* Luxury KPI Cards */
    .admin-kpi-card {
      border: 1px solid #e9ecef !important;
      border-radius: 6px !important;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 28px -6px rgba(0, 0, 0, 0.08) !important;
        border-color: #dfc8a8 !important;

        .kpi-link-arrow {
          transform: translateX(4px);
          color: #0c0c0c !important;
          font-weight: 700;
        }
      }

      &.kpi-active {
        border-color: #0c0c0c !important;
        box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.1) !important;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #dfc8a8;
        }
      }
    }

    .kpi-icon-pill {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }

    .kpi-notify-dot {
      position: absolute;
      top: -1px;
      right: -1px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #dc3545;
      border: 2px solid #ffffff;
      animation: pulseDot 1.6s infinite ease-in-out;
    }

    @keyframes pulseDot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.8; }
    }

    .kpi-link-arrow {
      transition: transform 0.2s ease, color 0.2s ease;
      font-size: 0.75rem;
    }

    /* Segmented Navigation Tabs */
    .admin-segmented-tabs-wrapper {
      background: #ffffff;
      border: 1px solid #e9ecef !important;
      border-radius: 6px !important;
    }

    .admin-tab-btn {
      color: #495057;
      background: transparent;
      transition: all 0.2s ease;
      font-size: 0.74rem;
      letter-spacing: 0.06em;
      cursor: pointer;

      &:hover {
        background: #f8f9fa;
        color: #0c0c0c;
      }

      &.tab-btn-active {
        background: #0c0c0c !important;
        color: #ffffff !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        i {
          color: #dfc8a8 !important;
        }
      }
    }

    .order-admin-card, .inquiry-card {
      border-radius: 4px;
      transition: border-color 0.2s, box-shadow 0.2s;

      &:hover {
        border-color: #dfc8a8 !important;
      }
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes modalScaleUp {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    /* Custom Delete Confirmation Modal */
    .custom-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(12, 12, 12, 0.78);
      backdrop-filter: blur(5px);
      z-index: 1050;
      animation: fadeIn 0.2s ease-out;
    }

    .custom-delete-modal-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 92%;
      max-width: 450px;
      z-index: 1055;
    }

    .delete-warning-seal {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: #fdf2f2;
      border: 2px solid #ef4444;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.18);
    }

    .animate-scale-up {
      animation: customModalScale 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes customModalScale {
      from { opacity: 0; transform: translate(-50%, -46%) scale(0.92); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
  `]
})
export class AdminComponent implements OnInit {
  readonly fashionService = inject(FashionService);

  // Login credentials state
  loginEmail: string = '';
  loginPassword: string = '';
  readonly isLoggingIn = signal<boolean>(false);
  readonly loginError = signal<string | null>(null);
  readonly showPassword = signal<boolean>(false);

  // Tab & CRUD state
  readonly activeTab = signal<'add-product' | 'products' | 'orders' | 'inquiries'>('add-product');
  readonly isSaving = signal<boolean>(false);
  readonly isUploadingImage = signal<boolean>(false);
  readonly orders = signal<OrderRecord[]>([]);
  readonly totalRevenue = signal<number>(0);

  // Inquiries State
  readonly inquiries = signal<InquiryRecord[]>([]);
  readonly unreadInquiriesCount = signal<number>(0);
  readonly inquiryStatusFilter = signal<'all' | 'unread' | 'read' | 'resolved'>('all');

  // Custom Delete Confirmation Modal State
  readonly isDeleteModalOpen = signal<boolean>(false);
  readonly deleteItemData = signal<{
    type: 'product' | 'inquiry';
    id: string;
    title: string;
    subtitle?: string;
  } | null>(null);
  readonly isDeleting = signal<boolean>(false);

  // New Product Model Form
  newProduct: Partial<Product> = {
    name: '',
    subtitle: '',
    category: 'Women',
    subCategory: 'Trench Coats',
    mood: 'Minimalist Noir',
    price: 12500,
    originalPrice: 16500,
    badge: 'Runway SS26',
    primaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
    description: 'Masterfully tailored luxury silhouette with premium finish.',
    fabricComposition: '100% Pure Mulberry Silk & Fine Weave',
    careInstructions: 'Specialist Dry Clean Only',
    isNew: true,
    isTrending: false,
    isBestseller: true
  };

  catalogCategoryFilter: string = 'All';
  catalogSearch: string = '';

  ngOnInit(): void {
    if (this.fashionService.isAdminLoggedIn()) {
      this.refreshOrders();
      this.refreshInquiries();
    }
  }

  fillDemoCredentials(): void {
    this.loginEmail = 'admin@daposhfashion.com';
    this.loginPassword = 'admin123';
  }

  async onLoginSubmit(): Promise<void> {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError.set('Please enter both email and password.');
      return;
    }

    this.isLoggingIn.set(true);
    this.loginError.set(null);

    try {
      const success = await this.fashionService.loginAdmin(this.loginEmail, this.loginPassword);
      if (success) {
        this.refreshOrders();
        this.refreshInquiries();
      }
    } catch (err: any) {
      this.loginError.set(err?.error?.message || 'Invalid administrator credentials. Access denied.');
    } finally {
      this.isLoggingIn.set(false);
    }
  }

  onLogout(): void {
    this.fashionService.logoutAdmin();
    this.loginEmail = '';
    this.loginPassword = '';
    this.loginError.set(null);
  }

  async refreshOrders(): Promise<void> {
    const data = await this.fashionService.getAllOrders();
    this.orders.set(data.orders);
    this.totalRevenue.set(data.totalRevenue);
  }

  async refreshInquiries(): Promise<void> {
    try {
      const res = await this.fashionService.getInquiries();
      this.inquiries.set(res.inquiries);
      this.unreadInquiriesCount.set(res.unreadCount);
    } catch (err) {
      console.warn('Failed to load inquiries:', err);
    }
  }

  filteredInquiries(): InquiryRecord[] {
    const list = this.inquiries();
    const filter = this.inquiryStatusFilter();
    if (filter === 'all') return list;
    return list.filter(i => (i.status || 'unread') === filter);
  }

  async onUpdateInquiryStatus(id: string, status: 'unread' | 'read' | 'resolved'): Promise<void> {
    try {
      await this.fashionService.updateInquiryStatus(id, status);
      this.fashionService.showToast('Inquiry Updated', `Marked as ${status}`, 'success');
      await this.refreshInquiries();
    } catch (err) {
      this.fashionService.showToast('Update Failed', 'Could not update inquiry status', 'warning');
    }
  }

  openDeleteProductConfirm(product: Product): void {
    this.deleteItemData.set({
      type: 'product',
      id: product.id,
      title: product.name,
      subtitle: `${product.category} &bull; ${this.fashionService.formatPrice(product.price)}`
    });
    this.isDeleteModalOpen.set(true);
  }

  openDeleteInquiryConfirm(inq: InquiryRecord): void {
    this.deleteItemData.set({
      type: 'inquiry',
      id: (inq._id || inq.id)!,
      title: inq.name,
      subtitle: `Topic: ${inq.subject || inq.category} &bull; Phone: ${inq.phone}`
    });
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal(): void {
    if (this.isDeleting()) return;
    this.isDeleteModalOpen.set(false);
    this.deleteItemData.set(null);
  }

  async executeDelete(): Promise<void> {
    const item = this.deleteItemData();
    if (!item) return;

    this.isDeleting.set(true);
    try {
      if (item.type === 'product') {
        await this.fashionService.deleteProduct(item.id);
        this.fashionService.showToast('Product Removed', `"${item.title}" removed from store catalog`, 'info');
      } else if (item.type === 'inquiry') {
        await this.fashionService.deleteInquiry(item.id);
        this.fashionService.showToast('Inquiry Removed', `Inquiry from ${item.title} deleted`, 'info');
        await this.refreshInquiries();
      }
      this.closeDeleteModal();
    } catch (err) {
      this.fashionService.showToast('Delete Failed', 'Could not delete item. Please retry.', 'warning');
    } finally {
      this.isDeleting.set(false);
    }
  }

  getInquiryWhatsApp(inq: InquiryRecord): string {
    const phone = (inq.phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = phone.startsWith('91') ? phone : (phone.length === 10 ? `91${phone}` : phone);
    const text = `Hi ${inq.name}! Thank you for reaching Daposh Fashion atelier. Regarding your inquiry on "${inq.subject || inq.category}": `;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }

  pendingOrdersCount(): number {
    return this.orders().filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  }

  filteredCatalog(): Product[] {
    let list = this.fashionService.products();
    if (this.catalogCategoryFilter !== 'All') {
      list = list.filter(p => p.category === this.catalogCategoryFilter);
    }
    if (this.catalogSearch.trim()) {
      const q = this.catalogSearch.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || (p.subCategory || '').toLowerCase().includes(q));
    }
    return list;
  }

  async onFileSelected(event: any): Promise<void> {
    const file = event.target?.files?.[0];
    if (!file) return;

    this.isUploadingImage.set(true);
    try {
      const uploadedUrl = await this.fashionService.uploadImageToCloudinary(file);
      this.newProduct.primaryImage = uploadedUrl;
      this.fashionService.showToast('Cloudinary Upload Success', 'Image uploaded to Cloudinary CDN!', 'success', uploadedUrl);
    } catch (err: any) {
      const msg = err?.error?.message || err?.message || 'Failed to upload to Cloudinary';
      this.fashionService.showToast('Upload Issue', msg, 'warning');
    } finally {
      this.isUploadingImage.set(false);
    }
  }

  async onSaveProduct(): Promise<void> {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.category) {
      this.fashionService.showToast('Validation Error', 'Please complete title, price and category', 'warning');
      return;
    }

    this.isSaving.set(true);
    try {
      await this.fashionService.createProduct(this.newProduct);
      this.fashionService.showToast('Product Published', `${this.newProduct.name} is now live in store!`, 'success');
      this.resetForm();
      this.catalogCategoryFilter = 'All';
      this.catalogSearch = '';
      await this.fashionService.fetchProductsFromBackend();
      this.activeTab.set('products');
    } catch (err) {
      this.fashionService.showToast('Error', 'Could not publish product', 'warning');
    } finally {
      this.isSaving.set(false);
    }
  }

  // Backwards compatibility aliases if needed
  async onDeleteInquiry(id: string): Promise<void> {
    const inq = this.inquiries().find(i => (i._id || i.id) === id);
    if (inq) this.openDeleteInquiryConfirm(inq);
  }

  async onDeleteProduct(id: string): Promise<void> {
    const prod = this.fashionService.products().find(p => p.id === id);
    if (prod) this.openDeleteProductConfirm(prod);
  }

  async onUpdateStatus(orderId: string, status: string, trackingNumber?: string, courierName?: string): Promise<void> {
    try {
      await this.fashionService.updateOrderStatus(orderId, status, trackingNumber, courierName);
      this.fashionService.showToast('Order Status Updated', `Order #${orderId} marked as ${status}`, 'success');
      this.refreshOrders();
    } catch (err) {
      this.fashionService.showToast('Update Failed', 'Could not update order status', 'warning');
    }
  }

  resetForm(): void {
    this.newProduct = {
      name: '',
      subtitle: '',
      category: 'Women',
      subCategory: 'Trench Coats',
      mood: 'Minimalist Noir',
      price: 12500,
      originalPrice: 16500,
      badge: 'Runway SS26',
      primaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      description: 'Masterfully tailored luxury silhouette with premium finish.',
      fabricComposition: '100% Pure Mulberry Silk & Fine Weave',
      careInstructions: 'Specialist Dry Clean Only',
      isNew: true,
      isTrending: false,
      isBestseller: true
    };
  }
}
