import { ResolveFn } from '@angular/router';
import { MemberService } from '../services/member.service';
import { inject } from '@angular/core';
import { Member } from '../models/member';

export const memberDetailResolver: ResolveFn<Member | null> = (route) => {
	const memberService = inject(MemberService);

	const username = route.paramMap.get('username');

	if (!username) return null;

	return memberService.getMember(username);
};
