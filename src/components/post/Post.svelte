<script lang="ts">
	import { Skeleton } from 'flowbite-svelte';
	import type { PostDTO, Comment } from '../../api/dto/Posts.dto';
	import { loadingStore } from '../../store/LoadingStore';
	import { commentsStore } from '../../store/CommentsStore';

	export let post: PostDTO;
	let comments: Comment[] | undefined = undefined;
	let isCommentsLoaded = false;

	$: isLoading = $loadingStore[post.ID] || false;
	$: if ($commentsStore[post.ID] !== undefined) {
		comments = $commentsStore[post.ID];
		isCommentsLoaded = true;
	} else {
		isCommentsLoaded = false;
	}
</script>

<li class="post mb-8 pb-8 border-gray-100 border-b-2">
	<div class="flex flex-col md:flex-row w-full">
		<img
			class="w-40 h-40 object-cover hidden md:block rounded-md bg-gray-200"
			src={post.post_thumbnail.URL}
			alt={post.title}
			loading="lazy"
		/>
		<div class="md:ml-4 flex flex-col justify-between">
			<div>
				<a href={post.URL} target="_blank" rel="nofollow" title={post.title}
					><h2 class="linked-header text-xl font-bold">{@html post.title}</h2></a
				>
				<div>{@html post.excerpt}</div>
			</div>
			<div class="flex flex-row mt-3 items-center">
				<div class="overflow-hidden rounded-full">
					<img
						class="w-10 h-10"
						src={post.author.avatar_URL}
						alt={post.author.name}
						loading="lazy"
					/>
				</div>
				<div class="ml-3">{@html post.author.name}</div>
			</div>
		</div>
	</div>
	{#if isCommentsLoaded && !isLoading}
		{#if comments && comments.length > 0}
			<h3 class="mt-8 mb-3 text-lg">Comments:</h3>
			<ul>
				{#each comments as comment}
					<li class="bg-gray-100 p-3 mb-4 rounded-lg flex flex-col">
						<div class="text-sm mb-1 text-gray-500">{comment.author.name}</div>
						<div>{@html comment.content}</div>
					</li>
				{/each}
			</ul>
		{:else}
			<h3 class="mt-8 text-lg">No comments.</h3>
		{/if}
	{/if}
	{#if isLoading}
		<Skeleton size="sm" class="my-8" />
	{/if}
</li>
