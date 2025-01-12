import { Routes } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { MatchesComponent } from './components/matches/matches.component';
import { memberDetailResolver } from './resolvers/member-detail.resolver';
import { AdminComponent } from './components/admin/admin-component/admin.component';
import { adminGuard } from './guards/admin.guard';

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
		path: 'members/:username',
		resolve: { member: memberDetailResolver },
		component: MemberDetailComponent,
		canActivate: [authGuard],
	},
	{
		path: 'member/edit',
		component: MemberEditComponent,
		canActivate: [authGuard],
		canDeactivate: [unsavedChangesGuard],
	},
	{
		path: 'matches',
		component: MatchesComponent,
		canActivate: [authGuard],
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [authGuard, adminGuard],
	},
];
