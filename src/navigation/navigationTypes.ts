import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
	MainTabs: undefined;
	ProductDetails: { productId: string };
};

export type BottomTabParamList = {
	Home: undefined;
	Cart: undefined;
	Profile: undefined;
};

export type RootStackNav = NativeStackNavigationProp<RootStackParamList>;
export type BottomTabNav = BottomTabNavigationProp<BottomTabParamList>;
