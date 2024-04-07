<script lang="ts">
	import PostsInput from '../components/postInput/PostsInput.svelte';
	import Posts from '../containers/posts/Posts.svelte';

	let howManyPostsProp = 3;
</script>

<div class="bg-primary sticky top-0 z-10">
	<div class="container mx-auto px-4">
		<PostsInput bind:howManyPosts={howManyPostsProp} />
	</div>
</div>
<div class="container mx-auto px-4">
	<Posts bind:howManyPosts={howManyPostsProp} />
</div>
