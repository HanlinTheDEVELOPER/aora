import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import EmptyList from "../../components/EmptyList";
import SearchField from "../../components/SearchField";
import VideoPost from "../../components/VideoPost";
import { images } from "../../constants";
import { search } from "../../lib/firestore.crud";
import { useFetch } from "../../lib/useFetch";

const Search = () => {
	const { query } = useLocalSearchParams();
	console.log("query", query);
	const { data: videos } = useFetch(() => search("videos", query), query);

	return (
		<SafeAreaView className="bg-primary h-full ">
			<FlatList
				className="pt-2 pb-0"
				data={videos}
				keyExtractor={(item) => item.createdAt}
				renderItem={({ item }) => <VideoPost item={item} />}
				ListHeaderComponent={() => (
					<>
						<View className="px-6 flex-row justify-between items-center pb-4">
							<View>
								<Text className="text-gray-100 font-pmedium text-lg">
									Search Result!
								</Text>
								<Text className="text-white font-psemibold text-2xl">
									{query}
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
							<SearchField
								otherStyles="mb-8"
								placeholder={"Search for a video topic"}
								initialValue={query}
							/>
						</View>
					</>
				)}
				ListEmptyComponent={() => (
					<EmptyList
						title={"No Videos Found"}
						subtitle={"No videos found for this topic"}
					/>
				)}
				a
			/>
			<StatusBar style="light" />
		</SafeAreaView>
	);
};

export default Search;
