import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

import { router, usePathname } from "expo-router";
import icons from "../constants/icons";

const FormField = ({ placeholder, initialValue, otherStyles, ...props }) => {
	const [query, setQuery] = useState(initialValue || "");
	const pathname = usePathname();
	const handlePress = () => {
		if (query.length === 0) return;
		if (pathname.startsWith("/search")) {
			router.setParams({ query });
		} else {
			router.push(`/search/${query}`);
		}
	};
	return (
		<View className={`my-2 ${otherStyles} w-full `}>
			<View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-xl focus:border-secondary-200 flex-row items-center justify-between ">
				<TextInput
					className="flex-1 text-white text-lg font-psemibold"
					value={query}
					placeholder={placeholder}
					onChangeText={(e) => setQuery(e)}
					placeholderTextColor="#CDCDE0"
					{...props}
				/>

				<TouchableOpacity onPress={handlePress}>
					<Image
						source={icons.search}
						className="w-6 h-6"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default FormField;
