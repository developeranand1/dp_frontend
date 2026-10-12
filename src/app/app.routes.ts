import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TrackOrderComponent } from './pages/track-order/track-order';
import { AdminComponent } from './pages/admin/admin';
import { ContactComponent } from './pages/contact/contact';
import { AboutComponent } from './pages/about/about';
import { FaqComponent } from './pages/faq/faq';
import { TermsComponent } from './pages/terms/terms';
import { PrivacyComponent } from './pages/privacy/privacy';
import { ReturnsComponent } from './pages/returns/returns';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Daposh Fashion | Haute Atelier & Ready-to-Wear' },
  { path: 'contact', component: ContactComponent, title: 'Contact Atelier & Concierge | Daposh Fashion' },
  { path: 'about', component: AboutComponent, title: 'About Daposh Atelier & Heritage | Daposh Fashion' },
  { path: 'faq', component: FaqComponent, title: 'Frequently Asked Questions & Concierge | Daposh Fashion' },
  { path: 'terms', component: TermsComponent, title: 'Terms & Conditions of Service | Daposh Fashion' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacy Charter & Data Discretion | Daposh Fashion' },
  { path: 'returns', component: ReturnsComponent, title: 'Return, Refund & Alteration Policy | Daposh Fashion' },
  { path: 'track-order', component: TrackOrderComponent, title: 'Track Order Status | Daposh Fashion' },
  { path: 'admin', component: AdminComponent, title: 'Atelier Admin Control Panel | Daposh Fashion' },
  { path: '**', redirectTo: '' }
];
