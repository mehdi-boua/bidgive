import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrehomeComponent } from './prehome/prehome.component';
import {  HomeComponent } from './home/home.component';
import {  PageFavorisComponent } from './page-favoris/page-favoris.component';
import {  PageCreationComponent } from './page-creation/page-creation.component';
import {  PageMessagesComponent } from './page-messages/page-messages.component';
import {  PageCompteComponent } from './page-compte/page-compte.component';
import {  PageProduitComponent } from './page-produit/page-produit.component';
import {  PageConnexionComponent } from './page-connexion/page-connexion.component';
import {  PageInscriptionComponent } from './page-inscription/page-inscription.component';
import {  PageMdpComponent } from './page-mdp/page-mdp.component';
import {  MapComponent } from './map/map.component';
import {  PageEncherirComponent } from './page-encherir/page-encherir.component';

const routes: Routes = [ 
  { path: '', component:  PrehomeComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'mes-favoris', component:  PageFavorisComponent },
  { path: 'creer-une-enchere', component:  PageCreationComponent },
  { path: 'mes-messages', component:  PageMessagesComponent },
  { path: 'mon-compte', component:  PageCompteComponent },
  { path: 'produit', component:  PageProduitComponent },
  { path: 'produit/:id', component:  PageProduitComponent },
  { path: 'connexion', component:  PageConnexionComponent },
  { path: 'inscription', component:  PageInscriptionComponent },
  { path: 'mot-de-passe-oublie', component:  PageMdpComponent },
  { path: 'map', component:  MapComponent },
  { path: 'encherir', component:  PageEncherirComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
