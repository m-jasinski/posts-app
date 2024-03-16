<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Subscription, fromEvent, of } from 'rxjs';
	import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

	export let howManyPosts: number;
	let inputValue: string;
	let subscription: Subscription | null;
	let inputElement: HTMLInputElement;

	function validateInput(value: string): string {
		if (+value > 20) {
			return '20';
		}
		if (+value < 1) {
			return '0';
		}
		return '' + value;
	}

	onMount(() => {
		inputValue = '' + howManyPosts;

		const input$ = fromEvent(inputElement, 'input').pipe(
			map((event) => validateInput((event.target as HTMLInputElement).value)),
			distinctUntilChanged(),
			debounceTime(500),
			catchError((err) => of(1))
		);

		subscription = input$.subscribe((value) => {
			console.log(value);
			howManyPosts = +value;
			inputValue = '' + Number(value);
		});
	});

	onDestroy(() => {
		if (subscription) {
			subscription.unsubscribe();
		}
	});
</script>

<form on:submit={(event) => event.preventDefault()} class="py-5">
	<fieldset class="flex flex-row">
		<label for="post-length">Set number of posts to render (1-20):</label>
		<input
			bind:this={inputElement}
			id="post-length"
			type="number"
			bind:value={inputValue}
			min="1"
			max="20"
			class="border-primary border-2 w-auto max-w-fit pl-2 ml-5"
		/>
	</fieldset>
</form>
