import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/global-context";

import { StatusBar } from "expo-status-bar";
import EmptyList from "../../components/EmptyList";
import SearchField from "../../components/SearchField";
import Tranding from "../../components/Tranding";
import VideoPost from "../../components/VideoPost";
import { images } from "../../constants";
import { findVideos } from "../../lib/firestore.crud";
import { useFetch } from "../../lib/useFetch";

const Home = () => {
	const { auth } = useGlobalContext();

	const {
		refreshing,
		data: videos,
		handleRefresh,
	} = useFetch(() => findVideos("videos"));

	return (
		<SafeAreaView className="bg-primary h-full ">
			<FlatList
				className="py-2"
				data={videos}
				keyExtractor={(item) => item.createdAt}
				renderItem={({ item }) => <VideoPost item={item} />}
				ListHeaderComponent={() => (
					<>
						<View className="px-6 flex-row justify-between items-center pb-4">
							<View>
								<Text className="text-gray-100 font-pmedium text-lg">
									Welcome Back!
								</Text>
								<Text className="text-white font-psemibold text-2xl">
									{auth.username}
								</Text>
							</View>
							<View>
								<Image
									source={images.logoSmall}
									className="w-10 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>
						<View className="px-6">
							<SearchField placeholder={"Search for a video topic"} />
						</View>
						<View className="my-6 ">
							<Text className="px-6 text-gray-100 font-psemibold text-lg">
								Tranding Videos
							</Text>
							<Tranding />
						</View>
					</>
				)}
				ListEmptyComponent={() => <EmptyList />}
				refreshControl={
					<RefreshControl
						colors={["#FF9C01"]}
						tintColor="#FF9C01"
						refreshing={refreshing}
						onRefresh={() => {
							console.log("refreshing");
							handleRefresh();
						}}
					/>
				}
			/>
			<StatusBar style="light" />
		</SafeAreaView>
	);
};

export default Home;
