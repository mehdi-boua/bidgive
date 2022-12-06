import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { GlobalService} from './services/global.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrehomeComponent } from './prehome/prehome.component';
import { HomeComponent } from './home/home.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { PageFavorisComponent } from './page-favoris/page-favoris.component';
import { PageCreationComponent } from './page-creation/page-creation.component';
import { PageMessagesComponent } from './page-messages/page-messages.component';
import { PageCompteComponent } from './page-compte/page-compte.component';
import { HeaderComponent } from './header/header.component';
import { CardEnchereComponent } from './card-enchere/card-enchere.component';
import { PageProduitComponent } from './page-produit/page-produit.component';
import { PageInscriptionComponent } from './page-inscription/page-inscription.component';
import { PageConnexionComponent } from './page-connexion/page-connexion.component';
import { PageMdpComponent } from './page-mdp/page-mdp.component';
import { MapComponent } from './map/map.component';
import { PageEncherirComponent } from './page-encherir/page-encherir.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    PrehomeComponent,
    HomeComponent,
    UserNavComponent,
    PageFavorisComponent,
    PageCreationComponent,
    PageMessagesComponent,
    PageCompteComponent,
    HeaderComponent,
    CardEnchereComponent,
    PageProduitComponent,
    PageInscriptionComponent,
    PageConnexionComponent,
    PageMdpComponent,
    MapComponent,
    PageEncherirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
