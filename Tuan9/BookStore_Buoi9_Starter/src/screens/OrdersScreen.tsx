import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { RootScreenProps } from "../navigation/types";
import { Order } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // Không có người dùng thì không hỏi đơn; phải tắt chờ để hiện lời nhắc đăng nhập.
    if (!user) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try { setOrders(await getOrdersByUser(user.id)); }
    catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(o) => String(o.id)}
        contentContainerStyle={{ padding: 12, gap: 10, flexGrow: 1 }}
        ListEmptyComponent={<EmptyState emoji="🧾"
          title="Bạn chưa có đơn hàng nào"
          actionLabel="Mua sắm ngay" onAction={() => navigation.navigate("Tabs", { screen: "Home" })} />}
        renderItem={({ item: o }) => (
          <View style={styles.card}>
            <View style={styles.head}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={styles.code}>Đơn #{o.id}</Text>
                <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                <Text style={styles.total}>{formatPrice(o.total)}</Text>
              </View>
              <StatusBadge status={o.status} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: radius.md },
  head: { flexDirection: "row", gap: 8 },
  code: { color: colors.navy, fontWeight: "800" },
  date: { color: colors.muted, fontSize: 12 },
  total: { color: colors.indigo, fontWeight: "800", fontSize: 18 },
});