import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { useAppSelector } from "./store/hooks";
import { selectCartCount } from "./store/cartSlice";
import { colors } from "./theme";

export type RootStackParamList = {
  Tabs: undefined;
  Detail: { id: string };
};
export type TabParamList = { Home: undefined; Cart: undefined; Favorites: undefined };

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  // TODO BT10.7b: dùng Tab.Navigator (headerShown: false) gồm 3 tab:
  //   Home (title "Sách"), Cart (title "Giỏ hàng"), Favorites (title "Yêu thích")
  // TODO BT10.9c: tab Cart có tabBarBadge = số lượng trong giỏ (useAppSelector(selectCartCount)), ẩn khi bằng 0
  return null;
}

export function RootNavigator() {
  // TODO BT10.7a: dùng Stack.Navigator gồm
  //   Tabs (options: headerShown false) và Detail (title "Chi tiết sách")
  return null;
}
