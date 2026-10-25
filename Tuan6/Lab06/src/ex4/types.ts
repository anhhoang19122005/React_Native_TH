import type { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Tab navigator nằm bên trong màn Home của Stack navigator.
export type TabParamList = { Products: undefined; Favorites: undefined };
export type RootStackParamList = {
  Home: NavigatorScreenParams<TabParamList> | undefined;
  ProductDetails: { id: string };
};
export type RootProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type TabProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;