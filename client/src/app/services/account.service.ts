import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private http = inject(HttpClient);
	private baseUrl = environment.apiUrl;
	currentUser = signal<User | null>(null);
	roles = computed(() => {
		const user = this.currentUser();
		if (user) {
			const payload = JSON.parse(atob(user.token.split('.')[1])).role;
			return Array.isArray(payload) ? payload : [payload];
		}
		return [];
	});

	login(model: any) {
		return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
			map((user) => {
				if (user) {
					this.setCurrentUser(user);
				}
			}),
		);
	}

	register(model: any) {
		model.recipe = this.parseRecipe(model.ingredients, model.directions);
		return this.http
			.post<User>(this.baseUrl + 'account/register', model)
			.pipe(
				map((user) => {
					if (user) {
						this.setCurrentUser(user);
					}
				}),
			);
	}

	logout() {
		localStorage.removeItem('user');
		this.currentUser.set(null);
	}

	setCurrentUser(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
		this.currentUser.set(user);
	}

	parseRecipe(ingredients: string[], directions: string[]): string {
		let ingredsToStr = ingredients.join(',').concat(' Directions ');
		let directionsToStr = directions.join(',');
		return ingredsToStr.concat(directionsToStr);
	}
}
