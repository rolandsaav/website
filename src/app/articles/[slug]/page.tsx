import { db } from "@/app/firebase";
import { Article } from "@/types/Article";
import { collection, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { cache } from "react";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	const article = await getArticle(params.slug);

	return {
		title: article.title,
	};
}

export const dynamicParams = false;

export async function generateStaticParams() {
	const articlesSnapshot = await getDocs(collection(db, "articles"));

	const articles: Article[] = articlesSnapshot.docs.map((doc) => {
		return doc.data() as Article;
	});
	const result = articles.map((article) => ({
		slug: article.slug,
	}));
	return result;
}

export const revalidate = 3600;

const getArticle = cache(async (slug: string) => {
	const articlesRef = collection(db, "articles");
	const articleQuery = query(articlesRef, where("slug", "==", slug));
	const querySnapshot = await getDocs(articleQuery);
	return querySnapshot.docs[0].data() as Article;
});

export default async function Page({ params }: { params: { slug: string } }) {
	const article = await getArticle(params.slug);
	const localDate = new Date(article.date.seconds * 1000).toLocaleDateString();

	return (
		<>
			<Head>
				<title>{article.title}</title>
			</Head>
			<div className="article-wrapper">
				<div className="article-topper">
					<Link href="/" className="font-semibold">
						Home
					</Link>
					<div className="font-semibold">{localDate}</div>
				</div>
				<article
					className="prose prose-lg article-content"
					dangerouslySetInnerHTML={{ __html: article.html }}
				></article>
			</div>
		</>
	);
}
