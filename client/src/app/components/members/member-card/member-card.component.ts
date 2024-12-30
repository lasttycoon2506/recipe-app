import { Component, EventEmitter, inject, input, Output } from '@angular/core';
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
	@Output() reload = new EventEmitter<void>();

	async like() {
		this.likesService.like(this.member().id);

		this.reload.emit();
	}
}
