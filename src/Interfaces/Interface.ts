export interface CommentsInterface {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    username: string;
    modified?: boolean;
}

export interface RepliesInterface {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingId: number;
    replyingTo: string;
    username: string;
    modified?: boolean;
}

export interface NotificationInterface {
    id: number;
    userId: number;
    content: string;
    type: string;
}