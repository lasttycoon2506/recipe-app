import { Routes } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [authGuard] },
  {
    path: 'recipes',
    component: RecipesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent,
    canActivate: [authGuard],
  },
];
