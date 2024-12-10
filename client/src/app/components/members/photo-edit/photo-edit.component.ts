import { Component, input } from '@angular/core';
import { Member } from '../../../models/member';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
	selector: 'app-photo-edit',
	standalone: true,
	imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule],
	templateUrl: './photo-edit.component.html',
	styleUrl: './photo-edit.component.css',
})
export class PhotoEditComponent {
	member = input.required<Member>();
}
