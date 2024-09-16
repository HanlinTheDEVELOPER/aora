import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { uploadFile } from "./firebase.storage";

export const create = async (collectionName, data) => {
	try {
		const docRef = await addDoc(collection(db, collectionName), {
			...data,
			avatar: "https://placehold.co/400.png",
		});
		return docRef.id;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const findOneById = async (collectionName, id) => {
	try {
		const docRef = collection(db, collectionName);
		const q = query(docRef, where("id", "==", id));
		const data = (await getDocs(q)).docs[0].data();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const findOnebyEmail = async (collectionName, email) => {
	try {
		const docRef = collection(db, collectionName);
		const q = query(docRef, where("email", "==", email));
		const docId = (await getDocs(q)).docs[0].id;
		const data = (await getDocs(q)).docs[0].data();

		return { id: docId, ...data };
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const update = async (data, collectionName, id) => {
	try {
		const docRef = await updateDoc(doc(db, collectionName, id), data);
		return docRef;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const remove = async (collectionName, id) => {
	try {
		const docRef = await deleteDoc(doc(db, collectionName, id));
		return docRef;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const findVideos = async (collectionName) => {
	try {
		const docRef = await getDocs(collection(db, collectionName));
		const videosWithCreator = docRef.docs.map(async (doc) => {
			const data = doc.data();
			const user = await getDoc(doc.data().creator);
			return {
				id: doc.id,
				...data,
				creator: { ...user.data(), id: user.id },
			};
		});

		return await Promise.all(videosWithCreator);
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const findLatestVideos = async (collectionName) => {
	try {
		// Create a query to get the latest 4 documents
		const videosQuery = query(
			collection(db, collectionName),
			orderBy("createdAt", "desc"),
			// Assuming 'createdAt' is a timestamp field in your documents
			limit(3) // Limit the result to the latest 4 documents
		);

		// Fetch the documents based on the query
		const docRef = await getDocs(videosQuery);

		// Map through the documents and fetch creator details
		const videosWithCreator = docRef.docs.map(async (doc) => {
			const data = doc.data();

			const user = await getDoc(doc.data().creator); // Assuming 'creator' is a DocumentReference

			return {
				id: doc.id,
				...data,
				creator: { ...user.data(), id: user.id },
			};
		});

		// Wait for all promises to resolve and return the array
		return await Promise.all(videosWithCreator);
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const search = async (collectionName, title) => {
	try {
		// Create a query to get the latest 4 documents
		const videosQuery = query(
			collection(db, collectionName),
			orderBy("createdAt", "desc"),
			where("title", "==", title)
		);

		// Fetch the documents based on the query
		const docRef = await getDocs(videosQuery);

		// Map through the documents and fetch creator details
		const videosWithCreator = docRef.docs.map(async (doc) => {
			const data = doc.data();

			const user = await getDoc(doc.data().creator); // Assuming 'creator' is a DocumentReference

			return {
				id: doc.id,
				...data,
				creator: { ...user.data(), id: user.id },
			};
		});

		// Wait for all promises to resolve and return the array
		return await Promise.all(videosWithCreator);
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const findVideoForProfile = async (collectionName, userId) => {
	try {
		const userDocRef = doc(db, `users/${userId}`);
		const docRef = collection(db, collectionName);

		const q = query(docRef, where("creator", "==", userDocRef));
		const docRefData = await getDocs(q);

		const videosWithCreator = docRefData.docs.map(async (doc) => {
			const data = doc.data();
			const user = await getDoc(doc.data().creator);
			return {
				id: doc.id,
				...data,
				creator: { ...user.data(), id: user.id },
			};
		});

		return await Promise.all(videosWithCreator);
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createVideoPost = async (data) => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(data.thumbnail, "thumbnails"),
			uploadFile(data.video, "videos"),
		]);
		const userRef = doc(db, `users/${data.user}`);
		const docRef = await addDoc(collection(db, "videos"), {
			...data,
			thumbnail: thumbnailUrl,
			video: videoUrl,
			creator: userRef,
			createdAt: new Date(),
		});
		return docRef;
	} catch (error) {
		console.log(error);
		return null;
	}
};
