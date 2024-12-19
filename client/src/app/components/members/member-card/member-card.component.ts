import { Component, computed, inject, input } from '@angular/core';
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
	isLikedByUser = computed(() =>
		this.likesService.whoUserLikesIds().includes(this.member().id),
	);

	toggleLike() {
		if (this.isLikedByUser()) {
			this.likesService.whoUserLikesIds.update((ids) =>
				ids.filter((id) => id !== this.member().id),
			);
		} else {
			this.likesService.whoUserLikesIds.update((ids) => [
				...ids,
				this.member().id,
			]);
		}
	}
}
