import { HttpParams, HttpResponse } from '@angular/common/http';
import { WritableSignal } from '@angular/core';
import { Member } from '../models/member';
import { PaginationResult } from '../models/pagination';

export function setPaginationHeader(
	pgNumber: number,
	pgSize: number,
	specialty?: string,
	experience?: string,
): HttpParams {
	let params = new HttpParams();

	params = params.append('pgNumber', pgNumber);
	params = params.append('pgSize', pgSize);
	if (specialty) {
		params = params.append('specialty', specialty);
	}
	if (experience) {
		params = params.append('experience', experience);
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
