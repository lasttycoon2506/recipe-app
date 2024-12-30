import { Component, inject, input, output } from '@angular/core';
import { Member } from '../../../models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../../services/likes.service';
import { sleep } from '../../../helpers/sleepHelper';

@Component({
	selector: 'app-member-card',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './member-card.component.html',
	styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
	private likesService = inject(LikesService);
	member = input.required<Member>();
	reload = output<boolean>();

	async like() {
		this.likesService.like(this.member().id);
		await sleep(); //1 sec - allows db to update and send refreshed members-list
		this.reload.emit(true);
	}
}
