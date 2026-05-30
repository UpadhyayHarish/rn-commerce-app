import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home/HomeScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import type { BottomTabParamList } from './navigationTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			headerShown: false,
			tabBarIcon: ({ focused, color, size }) => {
				let iconName: string = '';
				if (route.name === 'Home') {
					iconName = focused ? 'home' : 'home-outline';
				} else if (route.name === 'Cart') {
					iconName = focused ? 'cart' : 'cart-outline';
				} else if (route.name === 'Profile') {
					iconName = focused ? 'person' : 'person-outline';
				}
				return <Ionicons name={iconName as any} size={size} color={color} />;
			},
			tabBarActiveTintColor: '#007AFF',
			tabBarInactiveTintColor: 'gray',
		})}
	>
		<Tab.Screen name="Home" component={HomeScreen} />
		<Tab.Screen name="Cart" component={CartScreen} />
		<Tab.Screen name="Profile" component={ProfileScreen} />
	</Tab.Navigator>
);

export default BottomTabNavigator;
