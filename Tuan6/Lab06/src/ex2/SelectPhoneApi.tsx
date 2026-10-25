import { useCallback, useEffect, useState } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { ErrorBox } from "../components/ErrorBox";
import { ActivityIndicator, Text, View } from "react-native";
import { SelectPhoneApp } from "../ex1/SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
 
  const load = useCallback(async () => {
    // TODO 1: setError(null); setPhone(null);
    setError(null);
    setPhone(null);
    try {
        setPhone(await fetchPhone("1"));
    // TODO 2: try { setPhone(await fetchPhone("1")) } catch (e) { setError(...) }
    } catch (e) {
        setError("Failed to fetch phone data.");
    }
  }, []);
 
  // TODO 3: useEffect gọi load() khi màn hình mở lần đầu
  
  useEffect(() => {
    load();
  },[])

  // TODO 4: nếu có error → <ErrorBox message={error} onRetry={load} />
    if (error) {
        return <ErrorBox message={error} onRetry={load} />;
    }
  // TODO 5: nếu chưa có phone → <Loading />  (vòng xoay ActivityIndicator + chữ "Đang tải...")
    if (!phone) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Đang tải...</Text>
            </View>
        );
    }
  // TODO 6: ngược lại → <SelectPhoneApp phone={phone} />   (dùng lại toàn bộ Bài 1)
    return <SelectPhoneApp phone={phone} />;
}
