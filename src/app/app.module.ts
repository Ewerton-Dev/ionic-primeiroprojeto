import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from "@angular/http";

import { FeedPage } from "../pages/feed/feed";
import { IntroPage } from "../pages/intro/intro";
import { MoovieProvider } from '../providers/moovie/moovie';
import { CardsPage } from '../pages/cards/cards';


import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { EditPedidoProvider } from '../providers/edit-pedido/edit-pedido';
import { PedidoProvider } from '../providers/pedido/pedido';
import { ServicosProvider } from '../providers/servicos/servicos';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FeedPage,
    IntroPage,
    CardsPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FeedPage,
    IntroPage,
    CardsPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoovieProvider,
    SQLite,
    DatabaseProvider,
    EditPedidoProvider,
    PedidoProvider,
    ServicosProvider

  ]
})
export class AppModule {}
