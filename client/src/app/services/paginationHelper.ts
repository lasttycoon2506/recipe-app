import { HttpParams, HttpResponse } from '@angular/common/http';
import { WritableSignal } from '@angular/core';
import { Member } from '../models/member';
import { PaginationResult } from '../models/pagination';
import { UserParams } from '../models/userParams';

export function setPaginationHeader(userParams: UserParams): HttpParams {
	let params = new HttpParams();

	params = params.append('pgNumber', userParams.pgNumber);
	params = params.append('pgSize', userParams.pgSize);
	if (userParams.specialty) {
		params = params.append('specialty', userParams.specialty);
	}
	if (userParams.experience) {
		params = params.append('experience', userParams.experience);
	}

	return params;
}

export function setPaginatedResponse(
	response: HttpResponse<Member[]>,
	paginatedMembersSignal: WritableSignal<PaginationResult<Member[]> | null>,
): void {
	paginatedMembersSignal.set({
		items: response.body as Member[],
		pagination: JSON.parse(response.headers.get('Pagination')!),
	});
}
