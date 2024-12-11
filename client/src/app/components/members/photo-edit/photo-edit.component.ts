import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../../models/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { Photo } from '../../../models/photo';

@Component({
	selector: 'app-photo-edit',
	standalone: true,
	imports: [NgIf, NgFor, NgStyle, FileUploadModule, DecimalPipe, NgClass],
	templateUrl: './photo-edit.component.html',
	styleUrl: './photo-edit.component.css',
})
export class PhotoEditComponent implements OnInit {
	member = input.required<Member>();
	memberUpdated = output<Member>();
	uploader?: FileUploader;
	hasBaseDropZoneOver = false;
	private accountService = inject(AccountService);
	private memberService = inject(MemberService);
	baseUrl = environment.apiUrl;

	ngOnInit(): void {
		this.uploadInit();
	}

	fileOverBase(event: any) {
		this.hasBaseDropZoneOver = event;
	}

	uploadInit() {
		this.uploader = new FileUploader({
			url: this.baseUrl + 'users/add-pic',
			authToken: 'Bearer ' + this.accountService.currentUser()?.token,
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
			const updatedMember = { ...this.member() };
			updatedMember.photos.push(pic);
			this.memberUpdated.emit(updatedMember);
		};
	}

	setMainPic(photo: Photo) {
		this.memberService.setMainPic(photo).subscribe({
			next: () => {
				const user = this.accountService.currentUser();
				if (user) {
					user.photoUrl = photo.url;
					this.accountService.setMain;
				}
			},
		});
	}
}
