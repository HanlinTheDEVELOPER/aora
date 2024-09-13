import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			disabled={isLoading}
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary-200 rounded-xl px-4 py-2 min-h-[60px] items-center justify-center  ${containerStyles} ${
				isLoading && 'opacity-50'
			}`}>
			<Text className={`text-primary font-semibold text-lg ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
