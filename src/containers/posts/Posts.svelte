<script lang="ts">
	import { onMount } from 'svelte';
	import Post from '../../components/post/Post.svelte';
	import Button from '../../components/button/Button.svelte';
	import { fetchComment, fetchPosts } from '../../api/posts.service';
	import { ImagePlaceholder } from 'flowbite-svelte';
	import type { PostDTO, Comment } from '../../api/dto/Posts.dto';
	import { setLoading, loadingStore } from '../../store/LoadingStore';
	import { setComments, commentsStore } from '../../store/CommentsStore';

	export let howManyPosts: number;
	let posts: PostDTO[] = [];
	let isFetchBtnEnabled = false;
	let howManyComments = 1;
	let initialFlag = false;
	let isLoadingPosts = true;
	let isRequestSuccesfull: boolean | null = null;
	let canceledRequest = false;

	$: {
		if (!initialFlag) {
			initialFlag = true;
		} else {
			fetchData(howManyPosts);
		}
	}

	async function fetchData(length: number): Promise<void> {
		loadingStore.set({});
		commentsStore.set({});
		canceledRequest = true;
		if (length === 0) {
			posts = [];
			return;
		}
		try {
			isLoadingPosts = true;
			const response = await fetchPosts(length);
			posts = response ? response : [];
			isRequestSuccesfull = true;
			isLoadingPosts = false;
			isFetchBtnEnabled = true;
		} catch (e) {
			posts = [];
			isLoadingPosts = false;
			isRequestSuccesfull = false;
		}
	}

	async function fetchComents(): Promise<void> {
		canceledRequest = false;
		isFetchBtnEnabled = false;

		for (let post of posts) {
			setLoading(post.ID, true);

			try {
				if (post.discussion.comment_count > 0) {
					const comments: Comment[] = await fetchComment(post.ID, howManyComments);
					setComments(post.ID, comments);
				} else {
					setComments(post.ID, []);
				}
			} catch (e) {
				setComments(post.ID, []);
			}
			setLoading(post.ID, false);

			if (canceledRequest) {
				canceledRequest = false;
				break;
			}
		}
	}

	onMount(() => {
		fetchData(howManyPosts);
	});
</script>

{#if posts.length > 0}
	<Button caption="Fetch All Comments" {isFetchBtnEnabled} on:click={() => fetchComents()}></Button>
	<h1 class="text-2xl mb-6">Posts:</h1>
	<ul class="posts-list">
		{#each posts as post (post.ID)}
			<Post {post} />
		{/each}
	</ul>
{:else if isLoadingPosts}
	<ImagePlaceholder imgHeight={'40'} class="mt-8" />
	<ImagePlaceholder imgHeight={'40'} class="mt-8" />
	<ImagePlaceholder imgHeight={'40'} class="mt-8" />
{:else if !isLoadingPosts && !isRequestSuccesfull}
	<div class="mt-5 text-xl">Cannot get posts</div>
{/if}
