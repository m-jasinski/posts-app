<script lang="ts">
	import { onDestroy } from 'svelte';
	import Post from '../components/Post.svelte';
	import type { PostDTO } from '../api/dto/Posts.dto';
	import { fetchComment, fetchPosts } from '../api/posts.service';

	export let howManyPosts: number;

	let posts: PostDTO[] = [];
	let commentsMap = new Map();
	let isFetchBtnEnabled = true;
	let howManyComments = 1;

	onDestroy(() => {
		commentsMap = new Map();
	});

	async function fetchData(length: number) {
		if (length === 0) {
			posts = [];
			return;
		}
		const response = await fetchPosts(length);
		posts = response ? response : [];
		isFetchBtnEnabled = true;
	}

	async function fetchComents() {
		isFetchBtnEnabled = false;
		for (let post of posts) {
			if (post.discussion.comment_count > 0) {
				const comments = await fetchComment(post.ID, howManyComments);
				console.log('Comments: ', comments);
				post.comments = comments;
				post = { ...post };
				posts = [...posts];
			}
		}
	}

	$: {
		fetchData(howManyPosts);
	}
</script>

{#if posts.length > 0}
	<button
		class="bg-primary hover:bg-slate-800 text-white my-5 px-3 py-2 mx-auto"
		disabled={!isFetchBtnEnabled}
		on:click={() => fetchComents()}>Fetch Comments</button
	>
	<h1 class="text-2xl mb-6">Posts:</h1>
	<ul class="posts-list">
		{#each posts as post (post.ID)}
			<li class="post mb-8 pb-8 border-gray-100 border-b-2"><Post {post} /></li>
		{/each}
	</ul>
{:else if posts.length === 0}
	<div class="flex flex-row">
		<p class="mt-4">No posts.</p>
	</div>
{:else}{/if}

<style>
	button:disabled {
		@apply bg-slate-200 text-black;
		cursor: not-allowed;
	}
	.post:last-child {
		border: none;
	}
</style>
