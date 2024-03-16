<script lang="ts">
	import PostsInput from '../components/PostsInput.svelte';
	import Posts from '../containers/Posts.svelte';

	let howManyPostsProp = 3;
</script>

<div class="bg-gray-200">
	<div class="container mx-auto px-4">
		<PostsInput bind:howManyPosts={howManyPostsProp} />
	</div>
</div>
<div class="container mx-auto px-4">
	<Posts bind:howManyPosts={howManyPostsProp} />
</div>
