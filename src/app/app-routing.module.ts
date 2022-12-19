import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SeccionDetailComponent } from './components/seccion-detail/seccion-detail.component';
import { CheckLoginGuard } from './guards/check-login.guard';
import { LoginGuard } from './guards/login.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tutorial',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'seccion/:id',
    component: SeccionDetailComponent,
    canActivate: [LoginGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
