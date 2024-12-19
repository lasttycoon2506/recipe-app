import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AccountService } from './services/account.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	title = 'Recipe App';
	private accountService = inject(AccountService);

	ngOnInit(): void {
		this.setCurrentUser();
	}

	setCurrentUser() {
		const user = localStorage.getItem('user');
		if (!user) return;
		const userParsed = JSON.parse(user);
		this.accountService.setCurrentUser(userParsed);
	}
}
