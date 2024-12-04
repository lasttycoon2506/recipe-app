import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  private memberService = inject(MemberService);
  members: Member[] = [];

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (members) => (members = this.members),
      error: (error) => console.log(error),
    });
  }
}
