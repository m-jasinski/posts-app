import { writable } from 'svelte/store';
import type { Comment } from '../api/dto/Posts.dto';

export type CommentsState = {
	[postId: string]: Comment[];
};

export const commentsStore = writable<CommentsState>({});

export function setComments(postId: number, comments: Comment[]) {
	commentsStore.update((currentState) => {
		return { ...currentState, [postId]: comments };
	});
}
