import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = () => {
	const accountService = inject(AccountService);
	const toastrService = inject(ToastrService);

	if (accountService.roles().includes('Admin')) return true;
	else {
		toastrService.error('unauthorized');
		return false;
	}
};
