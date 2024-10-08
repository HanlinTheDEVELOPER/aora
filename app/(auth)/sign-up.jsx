import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../components";
import images from "../../constants/images";
import { useGlobalContext } from "../../context/global-context";
import { auth } from "../../firebaseConfig";
import { create } from "../../lib/firestore.crud";

const SignUp = () => {
	const { setAuth } = useGlobalContext();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const submit = async () => {
		const { username, email, password } = form;
		setIsSubmitting(true);
		try {
			const user = await create("users", { email, username });
			await createUserWithEmailAndPassword(auth, email, password);
			setIsSubmitting(false);
			await SecureStore.setItemAsync(
				auth,
				JSON.stringify({
					id: user,
					email,
					username,
					avatar: "https://placehold.co/400.png",
				})
			);
			setAuth({
				id: user,
				email,
				username,
				avatar: "https://placehold.co/400.png",
			});
			router.replace("/home");
		} catch (error) {
			console.log("error", error);
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className=" bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full h-full px-4 justify-center">
					<Image
						source={images.logo}
						className="w-[130px] h-[80px]"
						resizeMode="contain"
					/>
					<Text className="text-white font-semibold text-xl">
						Sign up to Aora
					</Text>
					<FormField
						value={form.username}
						placeholder="Username"
						title="Username"
						handleChange={(e) => setForm((form) => ({ ...form, username: e }))}
						otherStyles="mt-5 text-white"
					/>
					<FormField
						value={form.email}
						placeholder="Email"
						title="Email"
						handleChange={(e) => setForm((form) => ({ ...form, email: e }))}
						otherStyles="mt-5 text-white"
						keyboardType="email-address"
					/>
					<FormField
						value={form.password}
						placeholder="Password"
						title="Password"
						handleChange={(e) => setForm((form) => ({ ...form, password: e }))}
						otherStyles="mt-5 text-white"
					/>
					<CustomButton
						title="Sign Up"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>
					<View className="flex justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Already have an account?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Sign in
						</Link>
					</View>
				</View>
			</ScrollView>
			<StatusBar style="light" />
		</SafeAreaView>
	);
};

export default SignUp;
