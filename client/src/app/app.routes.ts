import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'recipes', component: RecipesListComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
];
