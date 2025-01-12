import { Component } from '@angular/core';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [AdminPanelComponent],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.css',
})
export class AdminComponent {}
