import type { PostDTO, Comment } from '../api/dto/Posts.dto';

export async function fetchPosts(length: number): Promise<PostDTO[]> {
	try {
		const response = await fetch(
			`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=${length}`
		);
		const data = await response.json();
		return data.posts;
	} catch (e) {
		throw new Error(`Couldn't get posts. ${e}`);
	}
}

export async function fetchComment(id: number, howMany: number = 1): Promise<Comment[]> {
	try {
		const response = await fetch(
			`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${id}/replies?number=${howMany}`
		);
		const data = await response.json();
		return data.comments;
	} catch (e) {
		throw new Error(`Couldn't get comments. ${e}`);
	}
}
