import React from "react";
import { Image, Text, View } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";
const EmptyList = ({ title, subtitle }) => {
	return (
		<View className="flex-1 px-6 justify-center items-center h-full ">
			<Image source={images.empty} className="w-60 h-52" resizeMode="contain" />
			<Text className="text-white font-psemibold text-lg">{title}</Text>
			<Text className="text-gray-100 font-psemibold text-base">{subtitle}</Text>
			<CustomButton
				title="Upload"
				containerStyles="mt-4 w-full"
				textStyles="text-white font-bold text-xl"
			/>
		</View>
	);
};

export default EmptyList;
