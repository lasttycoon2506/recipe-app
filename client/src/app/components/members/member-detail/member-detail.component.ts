import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
	selector: 'app-member-detail',
	standalone: true,
	imports: [TabsModule],
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
		var id = this.route.snapshot.paramMap.get('id');
		if (!id) return;
		this.memberService.getMember(id).subscribe({
			next: (member) => (this.member = member),
			error: (err) => console.log(err),
		});
	}
}
