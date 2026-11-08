import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { TodoBox } from "../components/TodoBox";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { register } from "../services/authService"; // đã viết sẵn: register(name, email, password)
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  // TODO BT8.2: state name, email, password, confirm, errors (Record<string, string | null>), submitError, loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // TODO BT8.2: hàm submit giống BT8.1, thêm luật: "Nhập lại mật khẩu" phải khớp mật khẩu
  //   validateRequired("họ tên")(name) trả về hàm validate tên
  const submit = async () => {
    const e = {
      name: validateRequired("họ tên")(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: confirm === password ? null : "Mật khẩu nhập lại không khớp",
    };
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;
    setLoading(true)
    setSubmitError(null)
    try {
      const {user, token} = await register(name,email,password);
      signIn(user, token);
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));;
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Tạo tài khoản mới</Text>

        <FormField label="Name" error={errors.name} value={name} onChangeText={setName}/>
        <FormField label="Email" error={errors.email} value={email} onChangeText={setEmail}/>
        <FormField label="Password" error={errors.password} value={password} onChangeText={setPassword} secureTextEntry/>
        <FormField label="Confirm password" value={confirm} onChangeText={setConfirm} secureTextEntry error={errors.confirm}/>
        <Text style={styles.submitError}>{submitError}</Text>
        <PrimaryButton title="Register" onPress={submit} loading={loading}/>
        <Pressable onPress={() => navigation.replace("Login", route.params)}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
});
