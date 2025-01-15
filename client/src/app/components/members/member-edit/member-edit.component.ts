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
import { PhotoEditComponent } from '../photo-edit/photo-edit.component';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-member-edit',
	standalone: true,
	imports: [TabsModule, FormsModule, PhotoEditComponent, DatePipe],
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
	ingredients: string[] = [];
	directions: string[] = [];

	ngOnInit(): void {
		this.loadMember();
	}

	loadMember(): void {
		const username = this.accountService.currentUser()?.username;
		if (!username) return;
		this.memberService.getMember(username).subscribe({
			next: (member) => {
				this.member = member;
				this.spliceRecipe(member);
			},
			error: (err) => console.log(err),
		});
	}

	updateMember(): void {
		let ingredientsAsStr = this.ingredients.join(',').concat(' Directions');
		let directionsAsStr = this.directions.join(',');

		this.editForm!.value['recipe'] =
			ingredientsAsStr.concat(directionsAsStr);

		this.memberService.updateMember(this.editForm?.value).subscribe({
			next: () => {
				this.editForm?.reset(this.member);
				this.toastr.success('Profile Updated!');
			},
			error: (err) => console.log(err),
		});
	}

	onMemberUpdated(event: Member): void {
		this.member = event;
	}

	spliceRecipe(member: Member): void {
		let recipe = member.recipe.split('Directions');
		this.ingredients = recipe[0].split(',');
		this.directions = recipe[1].split(',');
	}

	addRow(): void {
		this.ingredients.push('');
	}

	removeRow(): void {
		this.ingredients.pop();
	}
}
