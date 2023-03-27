export interface CommentsInterface {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    username: string;
}

export interface RepliesInterface {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingId: number;
    replyingTo: string;
    username: string;
}