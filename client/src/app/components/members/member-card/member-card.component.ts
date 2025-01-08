import { Component, inject, input, output } from '@angular/core';
import { Member } from '../../../models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../../services/likes.service';
import { sleep } from '../../../helpers/sleepHelper';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-member-card',
	standalone: true,
	imports: [RouterLink, NgxSpinnerModule],
	templateUrl: './member-card.component.html',
	styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
	likesService = inject(LikesService);
	private spinnerService = inject(NgxSpinnerService);
	member = input.required<Member>();
	reload = output<boolean>();

	async like() {
		this.likesService.like(this.member().id);
		this.spinnerService.show();
		await sleep(); //1 sec - allows db to update and send refreshed members-list
		this.spinnerService.hide();
		this.reload.emit(true);
	}
}
