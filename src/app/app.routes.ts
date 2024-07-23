import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { DetailsComponent } from './views/details/details.component';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { AuthGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
    canDeactivate:[AuthGuard]
  },
  {
    path: 'my-favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
