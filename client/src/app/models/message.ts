export type Message = {
	id: number;
	senderUsername: string;
	senderId: number;
	senderPicUrl: string;
	receiverUsername: string;
	receiverId: number;
	receiverPicUrl: string;
	content: string;
	timeSent: Date;
	read: boolean;
};
