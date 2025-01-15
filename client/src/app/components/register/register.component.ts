import { Component, inject, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, TextInputComponent, NgFor],
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
			ingredients: this.formBuilder.array([]),
			directions: this.formBuilder.array([]),
		});
	}

	register(): void {
		this.accountService.register(this.registerForm.value).subscribe({
			next: () => this.router.navigateByUrl('/members'),
			error: (error) => this.toastr.error(error.error),
		});
	}

	get directions(): FormArray {
		return this.registerForm.get('directions') as FormArray;
	}

	addDirection() {
		this.directions.push(this.formBuilder.control('', Validators.required));
	}

	removeDirection(index: number) {
		this.directions.removeAt(index);
	}
}
