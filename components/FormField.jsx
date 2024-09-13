import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import icons from '../constants/icons';

const FormField = ({
	value,
	placeholder,
	title,
	handleChange,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className={`${otherStyles} w-full space-y-2`}>
			<Text className="text-gray-100 font-pmedium text-base">{title}</Text>
			<View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-xl focus:border-secondary-200 flex-row items-center justify-between">
				<TextInput
					className="flex-1 text-white text-base font-psemibold"
					value={value}
					placeholder={placeholder}
					onChangeText={handleChange}
					placeholderTextColor="#7b7b8b"
					secureTextEntry={title === 'Password' && !showPassword}
					{...props}
				/>
				{title === 'Password' && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
