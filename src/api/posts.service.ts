import type { PostDTO, Comment } from '../api/dto/Posts.dto';

export async function fetchPosts(length: number): Promise<PostDTO[]> {
	return fetch(
		`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=${length}`
	)
		.then((response) => response.json())
		.then((data) => {
			return data.posts;
		})
		.catch((error) => {
			new Error(`Couldn't get posts. ${error}`);
			return [];
		});
}

export async function fetchComment(id: number, howMany: number = 1): Promise<Comment[]> {
	const response = await fetch(
		`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${id}/replies?number=${howMany}`
	);
	const data = await response.json();
	return data.comments;
}
