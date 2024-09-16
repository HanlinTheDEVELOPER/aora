import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadFile = async (file, type) => {
	const storageRef = ref(storage, `${type}/${file.fileName}`);
	const metadata = {
		contentType: file.mimeType,
	};
	const response = await fetch(file.uri);
	const blob = await response.blob();
	const snapshot = await uploadBytes(storageRef, blob, metadata);

	const downloadURL = await getDownloadURL(snapshot.ref);
	return downloadURL;
};
