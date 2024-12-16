import { User } from './user';

export class UserParams {
	pgSize: number = 10;
	pgNumber: number = 1;
	specialty?: string;
	experience?: string;

	/**
	 *
	 */
	constructor(user: User) {}
}
