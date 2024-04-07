<script lang="ts">
	export let isFetchBtnEnabled: Boolean;
	export let caption: string;
</script>

<button
	class="bg-accent text-black hover:text-white hover:bg-slate-800 my-5 px-3 py-2 mx-auto rounded-md"
	disabled={!isFetchBtnEnabled}
	title={caption}
	on:click>{caption}</button
>

<style>
	button:disabled {
		@apply bg-slate-200 text-black;
		cursor: not-allowed;
	}
</style>
