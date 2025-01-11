import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [
		FormsModule,
		BsDropdownModule,
		RouterLink,
		RouterLinkActive,
		HasRoleDirective,
	],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.css',
})
export class NavComponent {
	accountService = inject(AccountService);
	private router = inject(Router);
	private toastr = inject(ToastrService);
	model: any = {};

	login(): void {
		this.accountService.login(this.model).subscribe({
			next: () => this.router.navigateByUrl('/members'),
			error: (err) => this.toastr.error(err.error),
		});
	}

	logout(): void {
		this.accountService.logout();
		this.router.navigateByUrl('/');
	}
}
