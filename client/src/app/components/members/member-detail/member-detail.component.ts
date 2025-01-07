import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { MemberMessageComponent } from '../member-message/member-message.component';

@Component({
	selector: 'app-member-detail',
	standalone: true,
	imports: [TabsModule, DatePipe, MemberMessageComponent],
	templateUrl: './member-detail.component.html',
	styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private memberService = inject(MemberService);
	member?: Member;

	ngOnInit(): void {
		this.loadMember();
	}

	loadMember(): void {
		const username = this.route.snapshot.paramMap.get('username');
		if (!username) return;
		this.memberService.getMember(username).subscribe({
			next: (member) => (this.member = member),
			error: (err) => console.log(err),
		});
	}
}
