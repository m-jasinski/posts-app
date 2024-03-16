export interface PostDTO {
	ID: number;
	site_ID: number;
	URL: string;
	title: string;
	content: string;
	comments?: Comment[];
	author: {
		name: string;
		avatar_URL: string;
	};
	discussion: {
		comment_count: number;
	};
	excerpt: string;
	post_thumbnail: {
		ID: number;
		URL: string;
		width: number;
		height: number;
	};
}

export interface Comment {
	content: string;
	author: {
		name: string;
	};
}
