import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrehomeComponent } from './prehome/prehome.component';
import { HomeComponent } from './home/home.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { PageFavorisComponent } from './page-favoris/page-favoris.component';
import { PageCreationComponent } from './page-creation/page-creation.component';
import { PageMessagesComponent } from './page-messages/page-messages.component';
import { PageProfilComponent } from './page-profil/page-profil.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PrehomeComponent,
    HomeComponent,
    UserNavComponent,
    PageFavorisComponent,
    PageCreationComponent,
    PageMessagesComponent,
    PageProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [PrehomeComponent,HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
