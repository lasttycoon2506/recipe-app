import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent {
	private accountService = inject(AccountService);
	cancelRegister = output<boolean>();
	model: any = {};
	inputValidationErrors: string[] = [];

	register() {
		this.accountService.register(this.model).subscribe({
			next: () => this.cancel(),
			error: (error) => {
				console.log(error);
				this.inputValidationErrors.push(
					error.error.errors['Username'].flat(),
				);
				this.inputValidationErrors.push(
					error.error.errors['Password'].flat(),
				);
			},
		});
	}

	cancel() {
		this.cancelRegister.emit(false);
	}
}
