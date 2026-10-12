import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast';
import { NavbarComponent } from './components/navbar/navbar';
import { QuickViewModalComponent } from './components/quick-view-modal/quick-view-modal';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';
import { WishlistDrawerComponent } from './components/wishlist-drawer/wishlist-drawer';
import { FooterComponent } from './components/footer/footer';
import { FashionService } from './services/fashion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastComponent,
    NavbarComponent,
    QuickViewModalComponent,
    CartDrawerComponent,
    WishlistDrawerComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly fashionService = inject(FashionService);

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
