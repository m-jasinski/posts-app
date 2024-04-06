<script lang="ts">
	import Post from '../../components/post/Post.svelte';
	import type { PostDTO } from '../../api/dto/Posts.dto';
	import { fetchComment, fetchPosts } from '../../api/posts.service';
	import { ImagePlaceholder } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	export let howManyPosts: number;

	let posts: PostDTO[] = [];
	let isFetchBtnEnabled = true;
	let howManyComments = 1;
	let initialFlag = false;

	async function fetchData(length: number): Promise<void> {
		if (length === 0) {
			posts = [];
			return;
		}
		const response = await fetchPosts(length);
		posts = response ? response : [];
		isFetchBtnEnabled = true;
	}

	async function fetchComents(): Promise<void> {
		isFetchBtnEnabled = false;
		for (let post of posts) {
			const comments = await fetchComment(post.ID, howManyComments);
			post.comments = comments || [];
			post = { ...post };
			posts = [...posts];
		}
	}

	$: {
		if (!initialFlag) {
			initialFlag = true;
		} else {
			fetchData(howManyPosts);
		}
	}

	onMount(() => {
		fetchData(howManyPosts);
	});
</script>

{#if posts.length > 0}
	<button
		class="bg-accent text-black hover:text-white hover:bg-slate-800 my-5 px-3 py-2 mx-auto rounded-md"
		disabled={!isFetchBtnEnabled}
		on:click={() => fetchComents()}>Fetch All Comments</button
	>
	<h1 class="text-2xl mb-6">Posts:</h1>
	<ul class="posts-list">
		{#each posts as post (post.ID)}
			<li class="post mb-8 pb-8 border-gray-100 border-b-2"><Post {post} /></li>
		{/each}
	</ul>
{:else if posts.length === 0}
	<ImagePlaceholder imgHeight={'40'} class="mt-8" />
	<ImagePlaceholder imgHeight={'40'} class="mt-8" />
	<ImagePlaceholder imgHeight={'40'} class="mt-8" />
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
