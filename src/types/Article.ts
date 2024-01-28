type Timestamp = {
	seconds: number;
	nanoseconds: number;
};

export type Article = {
	id: string;
	title: string;
	slug: string;
	markdwon: string;
	html: string;
	time: string;
	date: Timestamp;
	description: string;
};
