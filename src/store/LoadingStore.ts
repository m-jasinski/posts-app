import { writable } from 'svelte/store';

export type LoadingState = {
	[postId: string]: boolean;
};

export const loadingStore = writable<LoadingState>({});

export function setLoading(postId: number, isLoading: boolean) {
	loadingStore.update((currentState) => {
		return { ...currentState, [postId]: isLoading };
	});
}
