<script lang="ts">
	import { onMount } from 'svelte';

	export let howManyPosts: number;
	let postVal: number;
	const minVal = 1;
	const maxVal = 20;
	onMount(() => {
		postVal = howManyPosts;
	});

	function updateData(value: Event): void {
		howManyPosts = +(value.target as HTMLInputElement).value;
	}
</script>

<form on:submit={(event) => event.preventDefault()} class="py-5 text-white">
	<fieldset class="flex flex-col">
		<label for="post-length" class="mb-2">Set number of posts to render (1-20)</label>
		<input
			id="post-length"
			type="range"
			value={postVal}
			min="1"
			max="20"
			on:change={(value) => updateData(value)}
		/>
		<p>{howManyPosts} {howManyPosts > 1 ? 'posts' : 'post'}</p>
	</fieldset>
</form>
