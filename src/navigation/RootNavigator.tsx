import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailsScreen from '../screens/ProductDetails/ProductDetailsScreen';
import type { RootStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
		</Stack.Navigator>
	</NavigationContainer>
);

export default RootNavigator;
