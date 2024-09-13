import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import icon from "../../constants/icons";

const TabIcon = ({ name, color, focused, icon }) => {
	return (
		<View className="flex items-center justify-center ">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			<Text
				className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

const TabLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#FFA001",
					tabBarInactiveTintColor: "#CDCDE0",
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor: "#161622",
						borderTopWidth: 0,
						borderTopColor: "#232533",
						height: 84,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Home"
								color={color}
								focused={focused}
								icon={icon.home}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="bookmarks"
					options={{
						title: "Bookmarks",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Bookmarks"
								color={color}
								focused={focused}
								icon={icon.bookmark}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: "Create",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Create"
								color={color}
								focused={focused}
								icon={icon.plus}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Profile"
								color={color}
								focused={focused}
								icon={icon.profile}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabLayout;
