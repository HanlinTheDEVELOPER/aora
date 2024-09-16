import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { signOut } from "firebase/auth";
import {
	FlatList,
	Image,
	RefreshControl,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoBox, VideoPost } from "../../components";
import EmptyList from "../../components/EmptyList";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/global-context";
import { auth as firebaseAuth } from "../../firebaseConfig";
import { findVideoForProfile } from "../../lib/firestore.crud";
import { useFetch } from "../../lib/useFetch";

const Profile = () => {
	const { auth } = useGlobalContext();

	const logout = async () => {
		try {
			await signOut(firebaseAuth);
			await SecureStore.deleteItemAsync("auth");
			router.replace("/sign-in");
		} catch (error) {
			console.log("error", error);
		}
	};

	const { data, refreshing, handleRefresh } = useFetch(() =>
		findVideoForProfile("videos", auth.id)
	);

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={data}
				keyExtractor={(item) => item.video}
				renderItem={({ item }) => <VideoPost item={item} />}
				ListEmptyComponent={() => (
					<EmptyList
						title="No Videos Found"
						subtitle="No videos found for this profile"
					/>
				)}
				refreshControl={
					<RefreshControl
						colors={["#FF9C01"]}
						tintColor="#FF9C01"
						refreshing={refreshing}
						onRefresh={() => {
							handleRefresh();
						}}
					/>
				}
				ListHeaderComponent={() => (
					<View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
						<TouchableOpacity
							onPress={logout}
							className="flex w-full items-end mb-10"
						>
							<Image
								source={icons.logout}
								resizeMode="contain"
								className="w-6 h-6"
							/>
						</TouchableOpacity>

						<View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
							<Image
								source={{ uri: auth?.avatar }}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>

						<InfoBox
							title={auth?.username}
							containerStyles="mt-5"
							titleStyles="text-lg"
						/>

						<View className="mt-5 flex flex-row">
							<InfoBox
								title={0 || data?.length}
								subtitle="Posts"
								titleStyles="text-xl"
								containerStyles="mr-10"
							/>
							<InfoBox
								title="1.2k"
								subtitle="Followers"
								titleStyles="text-xl"
							/>
						</View>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default Profile;
