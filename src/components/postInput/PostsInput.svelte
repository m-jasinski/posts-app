<script lang="ts">
	import { onMount } from 'svelte';

	export let howManyPosts: number;
	let postVal: number;
	const minVal = 1;
	const maxVal = 20;
	let inputEl: HTMLInputElement;

	onMount(() => {
		postVal = howManyPosts;
		inputEl.style.setProperty('--value', '' + postVal);
	});

	$: {
		if (inputEl) {
			inputEl.style.setProperty('--value', '' + postVal);
		}
	}

	function updateData(value: Event): void {
		howManyPosts = +(value.target as HTMLInputElement).value;
	}
</script>

<form on:submit={(event) => event.preventDefault()} class="py-5 text-white">
	<fieldset class="flex flex-col">
		<label for="post-length" class="mb-2">Set number of posts to render (1-20)</label>
		<input
			bind:this={inputEl}
			id="post-length"
			type="range"
			bind:value={postVal}
			min="1"
			max="20"
			on:change={(value) => updateData(value)}
			class="styled-slider slider-progress my-2"
		/>
		<p>{postVal} {postVal > 1 ? 'posts' : 'post'}</p>
	</fieldset>
</form>
