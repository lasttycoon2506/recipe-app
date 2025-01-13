import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../models/user';

@Component({
	selector: 'app-admin-panel',
	standalone: true,
	imports: [],
	templateUrl: './admin-panel.component.html',
	styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
	private adminService = inject(AdminService);
	usersWithRoles: User[] = [];

	ngOnInit(): void {
		this.getUsersWithRoles();
	}

	getUsersWithRoles(): void {
		this.adminService.getUsersWithRoles().subscribe({
			next: (users) => (this.usersWithRoles = users),
		});
	}

	editRole() {}
}
