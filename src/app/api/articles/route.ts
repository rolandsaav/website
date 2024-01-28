import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
	const articlesSnapshot = await getDocs(collection(db, "articles"));

	const result = articlesSnapshot.docs.map((doc) => {
		return doc.data();
	});

	return Response.json(result);
}
