<script lang="ts">
	import { Label, Range } from 'flowbite-svelte';

	export let howManyPosts: number;
	const minVal = 1;
	const maxVal = 20;
</script>

<form on:submit={(event) => event.preventDefault()} class="py-5 text-white">
	<fieldset>
		<Label for="post-length" class="text-white">Set number of posts to render (1-20)</Label>
		<Range id="post-length" min={minVal} max={maxVal} bind:value={howManyPosts} class="bg-white" />
		<p>{howManyPosts} {howManyPosts > 1 ? 'posts' : 'post'}</p>
	</fieldset>
</form>
