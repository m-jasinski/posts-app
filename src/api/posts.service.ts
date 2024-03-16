import type { PostDTO, Comment } from '../api/dto/Posts.dto';

export async function fetchPosts(length: number): PostDTO[] {

    return fetch(
    	`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=${length}`
    )
    	.then((response) => response.json())
    	.then((data) => {
    		console.log(data);
    		return data.posts;
    	})
    	.catch((error) => {
    		console.log(`Couldn't get posts. ${error}`);
    		return [];
    	});
}

export async function fetchComment(id: number, howMany: number = 1): Comment[] {
    const response = await fetch(
        `https://public-api.wordpress.com/rest/v1/sites/${id}/comments?number=${howMany}`
    );
    const data = await response.json();
    return data.comments;
}