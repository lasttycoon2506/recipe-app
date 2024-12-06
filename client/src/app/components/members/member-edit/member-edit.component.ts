import {
	Component,
	HostListener,
	inject,
	OnInit,
	ViewChild,
} from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-member-edit',
	standalone: true,
	imports: [TabsModule, FormsModule],
	templateUrl: './member-edit.component.html',
	styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
	private accountService = inject(AccountService);
	private memberService = inject(MemberService);
	private toastr = inject(ToastrService);
	@ViewChild('editForm') editForm?: NgForm;
	@HostListener('window:beforeunload', ['$event']) notify($event: any) {
		if (this.editForm?.dirty) {
			$event.returnValue = true;
		}
	}
	member?: Member;

	ngOnInit(): void {
		this.loadMember();
	}

	loadMember(): void {
		var username = this.accountService.currentUser()?.username;
		if (!username) return;
		this.memberService.getMember(username).subscribe({
			next: (member) => (this.member = member),
			error: (err) => console.log(err),
		});
	}

	updateMember(): void {
		this.editForm?.reset(this.member);
		this.toastr.success('Profile Updated!');
	}
}
