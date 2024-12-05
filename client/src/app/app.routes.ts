import { Routes } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MemberListComponent } from './components/members/member-list/member-list.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'messages',
		component: MessagesComponent,
		canActivate: [authGuard],
	},
	{
		path: 'members',
		component: MemberListComponent,
		canActivate: [authGuard],
	},
	{
		path: 'members/:id',
		component: MemberDetailComponent,
		canActivate: [authGuard],
	},
];
