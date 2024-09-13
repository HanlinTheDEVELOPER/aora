import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { useGlobalContext } from "../context/global-context";

export default function App() {
	const { auth, isLoading } = useGlobalContext();
	if (isLoading)
		return (
			<SafeAreaView className="bg-primary h-full justify-center items-center">
				<Text className="text-primary "> Loading</Text>
			</SafeAreaView>
		);
	if (auth && !isLoading) return <Redirect href="/home" />;

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full px-4 items-center justify-center min-h-[85vh]">
					<Image
						source={images.logo}
						className="w-[130px] h-[80px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[250px]"
						resizeMode="contain"
					/>
					<View className="relative mt-5">
						<Text className="text-3xl text-white text-center font-bold">
							Discover Endless Possibilities Withs{" "}
							<Text className="text-secondary-200">Aora</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
							resizeMode="contain"
						/>
					</View>
					<Text className="text-gray-100 text-center text-sm mt-10 font-pregular">
						Where creativity meets innovation: embark on a journey of limitless
						exploration with Aora.
					</Text>
					<CustomButton
						title="Get Started"
						handlePress={() => router.push("/sign-in")}
						containerStyles="mt-10 w-full"
					/>
				</View>
			</ScrollView>
			<StatusBar style="light" />
		</SafeAreaView>
	);
}
