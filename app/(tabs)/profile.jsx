import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../../components";
// import { app } from "../../firebaseConfig";
import * as SecureStore from "expo-secure-store";

const auth = getAuth();

const Profile = () => {
	const logOut = async () => {
		try {
			await signOut(auth);
			await SecureStore.deleteItemAsync("auth");
			router.replace("/sign-in");
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<SafeAreaView>
			<Text>Profile</Text>
			<CustomButton title="Sign out" handlePress={logOut} />
		</SafeAreaView>
	);
};

export default Profile;
