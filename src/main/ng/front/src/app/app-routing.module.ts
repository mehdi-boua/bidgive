import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrehomeComponent } from './prehome/prehome.component';
import {  HomeComponent } from './home/home.component';
import {  PageFavorisComponent } from './page-favoris/page-favoris.component';
import {  PageCreationComponent } from './page-creation/page-creation.component';
import {  PageMessagesComponent } from './page-messages/page-messages.component';
import {  PageProfilComponent } from './page-profil/page-profil.component';

const routes: Routes = [ 
  { path: '', component:  PrehomeComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'mes-favoris', component:  PageFavorisComponent },
  { path: 'creer-une-enchere', component:  PageCreationComponent },
  { path: 'mes-messages', component:  PageMessagesComponent },
  { path: 'mon-compte', component:  PageProfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
