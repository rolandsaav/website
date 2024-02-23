import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { cache } from "react";
import { db } from "./firebase";
import { Article } from "@/types/Article";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Roland Saavedra",
};

async function getData() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const json = res.json();
	return json;
}

const getArticles = cache(async () => {
	const articlesRef = collection(db, "articles");
	const articlesSnapshot = await getDocs(articlesRef);

	return articlesSnapshot.docs.map((article) => {
		const data: Article = article.data() as Article;
		const id = article.id;

		return {
			title: data.title,
			slug: data.slug,
			description: data.description,
			date: data.date,
			time: data.time,
			id: id,
		};
	});
});

export default async function Home() {
	const articles = await getArticles();
	return (
		<div className="wrapper">
			<div className="left">
				<div className="relative overflow-hidden rounded-full mb-4 border h-24 w-24 aspect-square">
					<Image alt="Profile Picture" fill src={"/violinpic.jpg"} />
				</div>
				<div className="name font-bold text-lg">Roland Saavedra</div>
				<div className="description text-zinc-700 pt-2">
					Computer Science undergrad at Georgia Tech. Interested in
					entrepreneurship, language, mathematics, finance, and design.
				</div>
				<div className="links text-zinc-500 pt-6">
					<a target="_blank" href="https://www.github.com/rolandsaav">
						Github
					</a>
					<a target="_blank" href="https://www.linkedin.com/in/rsaav">
						Linkedin
					</a>
					<a
						href="SaavedraResume2024.pdf"
						download="RolandSaavedra"
						target="_blank"
					>
						Resume
					</a>
				</div>
				<div className="navigation text-zink-700 font-semibold pt-8">
					<Link href="/" className="navlink navlink-active">
						Articles
					</Link>
					<Link href="/background" className="navlink navlink-off">
						Background
					</Link>
					<Link href="/projects" className="navlink navlink-off">
						Projects
					</Link>
					<Link href="/" className="navlink navlink-off">
						Contact
					</Link>
				</div>
			</div>
			<div className="right">
				{articles
					.sort((a, b) => {
						if (a.date.seconds > b.date.seconds) {
							return -1;
						} else if (a.date.seconds < b.date.seconds) {
							return 1;
						} else {
							return 0;
						}
					})
					.map((post) => {
						const localDate = new Date(
							post.date.seconds * 1000,
						).toLocaleDateString();
						return (
							<Link
								key={post.id}
								href={`/articles/${post.slug}`}
								className="article-link"
							>
								<div className="details">{localDate}</div>
								<div className="title text-zinc-800">{post.title}</div>
								<div className="description">{post.description}</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
}
