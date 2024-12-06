import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';

export const unsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (
	component,
) => {
	if (component.editForm?.dirty) {
		return confirm('Unsaved changes will be lost!');
	}
	return true;
};
