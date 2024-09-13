import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

import icons from "../constants/icons";

const FormField = ({
	value,
	placeholder,
	handleChange,
	otherStyles,
	...props
}) => {
	return (
		<View className={`${otherStyles} w-full my-2`}>
			<View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-xl focus:border-secondary-200 flex-row items-center justify-between ">
				<TextInput
					className="flex-1 text-white text-lg font-psemibold"
					value={value}
					placeholder={placeholder}
					onChangeText={handleChange}
					placeholderTextColor="#7b7b8b"
					{...props}
				/>

				<TouchableOpacity onPress={() => {}}>
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
