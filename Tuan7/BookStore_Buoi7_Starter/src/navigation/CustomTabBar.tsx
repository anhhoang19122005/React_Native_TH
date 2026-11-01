import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TodoBox } from "../components/TodoBox";
import { TabBar, TabItem } from "../components/TabBar";   // ← Tab Bar giao diện đã dựng sẵn
import { useCart } from "../store/hooks";
import { View } from "react-native";

const EMOJI: Record<string, string> = { Home: "🏠", Categories: "🗂️", Cart: "🛒", Account: "👤" };


// Nối Tab Bar tự dựng với React Navigation: nhận { state, descriptors, navigation }
export function CustomTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  // TODO BT7.1a: dựng mảng `items: TabItem[]` từ state.routes
  const { totalQuantity } = useCart();
  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name] ?? "•",
    badge: route.name === "Cart" ? totalQuantity : undefined,
  }));
  //   key = route.key · label = descriptors[route.key].options.title ?? route.name · emoji tra theo route.name
  // TODO BT7.1a: viết onPress(key): emit "tabPress" rồi navigation.navigate(route.name) nếu chưa focus
  const onPress = (key: string) => {
    const route = state.routes.find((item) => item.key === key)
    if (!route)
      return;
    const event = navigation.emit({type: "tabPress", target: key, canPreventDefault: true})
    if (state.routes[state.index].key !== key && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  }
  // TODO BT7.1a: return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />
  return (
    <View style={{paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right, backgroundColor: "#fff"}}>
      <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress}/>
    </View>
  )
  // TODO BT7.3e: gắn badge = totalQuantity (từ useCart) cho route "Cart"
}
