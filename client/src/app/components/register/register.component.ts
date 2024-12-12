import { Component, inject, OnInit, output } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
	private accountService = inject(AccountService);
	cancelRegister = output<boolean>();
	model: any = {};
	inputValidationErrors: string[] = [];
	registerForm: FormGroup = new FormGroup({});

	ngOnInit(): void {
		this.initForm();
	}

	initForm(): void {
		this.registerForm = new FormGroup({
			username: new FormControl('', [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(16),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(16),
			]),
		});
	}

	register(): void {
		console.log(this.registerForm.value);
		console.log(this.registerForm.status);
		// this.accountService.register(this.model).subscribe({
		// 	next: () => this.cancel(),
		// 	error: (error) => {
		// 		console.log(error);
		// 		this.inputValidationErrors.push(
		// 			error.error.errors['Username'].flat(),
		// 		);
		// 		this.inputValidationErrors.push(
		// 			error.error.errors['Password'].flat(),
		// 		);
		// 	},
		// });
	}

	cancel() {
		this.cancelRegister.emit(false);
	}
}
