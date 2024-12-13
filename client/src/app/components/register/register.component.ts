import { Component, inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, TextInputComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
	private accountService = inject(AccountService);
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);
	private toastr = inject(ToastrService);
	registerForm: FormGroup = new FormGroup({});

	ngOnInit(): void {
		this.initForm();
	}

	initForm(): void {
		this.registerForm = this.formBuilder.group({
			username: [
				'',
				[
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(16),
				],
			],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(16),
				],
			],
			specialty: ['', Validators.required],
			experience: ['', Validators.required],
		});
	}

	register(): void {
		this.accountService.register(this.registerForm.value).subscribe({
			next: () => this.router.navigateByUrl('/members'),
			error: (error) => this.toastr.error(error.error),
		});
	}
}
