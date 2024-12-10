import { Component, inject, input, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { AccountService } from '../../../services/account.service';

@Component({
	selector: 'app-photo-edit',
	standalone: true,
	imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule],
	templateUrl: './photo-edit.component.html',
	styleUrl: './photo-edit.component.css',
})
export class PhotoEditComponent implements OnInit {
	member = input.required<Member>();
	uploader?: FileUploader;
	hasBaseDropzoneOver = false;
	private accountService = inject(AccountService);

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	fileOverBase(event: any) {
		this.hasBaseDropzoneOver = event;
	}

	upload() {
		this.uploader = new FileUploader({
			url: environment.apiUrl,
			authToken: this.accountService.currentUser()?.token,
			autoUpload: false,
			allowedFileType: ['image'],
			isHTML5: true,
			removeAfterUpload: true,
			maxFileSize: 1024 * 1024 * 10,
		});
	}
}
