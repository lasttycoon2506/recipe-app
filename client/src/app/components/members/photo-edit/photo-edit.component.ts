import { Component, input } from '@angular/core';
import { Member } from '../../../models/member';

@Component({
	selector: 'app-photo-edit',
	standalone: true,
	imports: [],
	templateUrl: './photo-edit.component.html',
	styleUrl: './photo-edit.component.css',
})
export class PhotoEditComponent {
	member = input.required<Member>();
}
