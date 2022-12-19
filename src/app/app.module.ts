import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { QRCodeModule } from 'angularx-qrcode';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { LoginComponent } from './pages/login/login.component';
import { PermissionsGuard } from './guards/permissions.guard';
import { AuthService } from './services/auth.service';
import { LoginGuard } from './guards/login.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
import { SeccionDetailComponent } from './components/seccion-detail/seccion-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { SeccionesComponent } from './components/secciones/secciones.component';

@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    LoginComponent,
    HomeComponent,
    SeccionesComponent,
    SeccionDetailComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    QRCodeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, PermissionsGuard, AuthService, LoginGuard, CheckLoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
