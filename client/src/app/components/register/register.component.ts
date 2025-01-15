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
	get ingredients(): FormArray {
		return this.registerForm.get('ingredients') as FormArray;
	}
	get directions(): FormArray {
		return this.registerForm.get('directions') as FormArray;
	}

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
		this.parseRecipe(this.ingredients, this.directions);

		this.accountService.register(this.registerForm.value).subscribe({
			next: () => this.router.navigateByUrl('/members'),
			error: (error) => this.toastr.error(error.error),
		});
	}

	addRow(section: string): void {
		if (section === 'ingredients')
			this.ingredients.push(
				this.formBuilder.control('', Validators.required),
			);
		else
			this.directions.push(
				this.formBuilder.control('', Validators.required),
			);
	}

	removeRow(index: number, section: string): void {
		if (section === 'ingredients') this.ingredients.removeAt(index);
		else this.directions.removeAt(index);
	}

	parseRecipe(ingredients: FormArray, directions: FormArray) {
		let ingredsToStr = ingredients.value.join(',').append(' Directions');
		let directionsToStr = directions.value.join(',');
		console.log(ingredsToStr.concat(directionsToStr));
	}
}
