import { Component, inject, input } from '@angular/core';
import { Member } from '../../../models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../../services/likes.service';

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

	like() {
		if (!this.likesService.whoUserLikesIds().includes(this.member().id)) {
		}

		this.likesService.whoUserLikesIds.update((ids) => [
			...ids,
			this.member().id,
		]);
	}
}
