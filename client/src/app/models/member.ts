import { Photo } from './photo';

export type Member = {
	id: number;
	username: string;
	photoUrl: string;
	photos: Photo[];
	created: Date;
	lastActive: Date;
	experience: string;
	specialty: string;
	recipe: string;
};
