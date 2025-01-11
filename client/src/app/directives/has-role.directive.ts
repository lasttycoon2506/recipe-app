import {
	Directive,
	inject,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { AccountService } from '../services/account.service';

@Directive({
	selector: '[appHasRole]',
	standalone: true,
})
export class HasRoleDirective implements OnInit {
	@Input() appHasRole: string = '';
	private accountService = inject(AccountService);
	viewContainerRef = inject(ViewContainerRef);
	templateRef = inject(TemplateRef);

	ngOnInit(): void {
		if (this.accountService.roles().includes(this.appHasRole))
			this.viewContainerRef.createEmbeddedView(this.templateRef);
		else this.viewContainerRef.clear();
	}
}
