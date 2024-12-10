import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../../models/member';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileItem, FileUploader, FileUploadModule } from 'ng2-file-upload';
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
	memberUpdated = output<Member>();
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

		this.uploader.onAfterAddingFile = (file) =>
			(file.withCredentials = false);

		this.uploader.onSuccessItem = (item, response, status, headers) => {
			const pic = JSON.parse(response);
			const updatedMember = this.member();
			updatedMember.photos.push(pic);
			this.memberUpdated.emit(updatedMember);
		};
	}
}
