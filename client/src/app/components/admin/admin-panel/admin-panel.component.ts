import { Component, inject } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Member } from '../../../models/member';

@Component({
	selector: 'app-admin-panel',
	standalone: true,
	imports: [],
	templateUrl: './admin-panel.component.html',
	styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
	private adminService = inject(AdminService);
	MembersWithRoles: Member[] = [];

	getMembersWithRoles() {
		this.adminService.getMembersWithRoles().subscribe({
			next: (members) => (this.MembersWithRoles = members),
		});
	}
}
