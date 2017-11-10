import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

//import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from "../pages/intro/intro";
import { CardsPage } from '../pages/cards/cards';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider:DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      dbProvider.createDatabase()
        .then(() => {this.openHomeCards(splashScreen);})
        .catch(() => {this.openHomeCards(splashScreen);})

    });
  }

  private openHomeCards(splashScreen: SplashScreen){

    splashScreen.hide();
    this.rootPage = CardsPage;

  }
}
