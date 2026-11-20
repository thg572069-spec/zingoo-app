
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

import { colors } from "../theme/colors";

type Props = {
  onBack: () => void;
};

export default function LoginScreen({ onBack }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Faltou preencher",
        "Informe seu e-mail e sua senha."
      );
      return;
    }

    Alert.alert(
      "Login em desenvolvimento",
      "A conexão segura com as contas da ZINGOO será implementada em uma próxima etapa."
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>‹ Voltar</Text>
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.mascot}>🦭</Text>
            <Text style={styles.logo}>ZINGOO</Text>
            <Text style={styles.title}>Que bom ter você de volta!</Text>
            <Text style={styles.subtitle}>
              Entre na sua conta e continue sua aventura.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              placeholderTextColor={colors.muted}
              secureTextEntry
            />

            <Pressable
              style={styles.button}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>

            <Text style={styles.note}>
              A recuperação de senha e a autenticação serão conectadas
              quando desenvolvermos o sistema de contas.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  flex: {
    flex: 1
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 30
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 4
  },
  backText: {
    color: colors.polar,
    fontSize: 16,
    fontWeight: "700"
  },
  header: {
    alignItems: "center",
    marginTop: 35,
    marginBottom: 35
  },
  mascot: {
    fontSize: 75
  },
  logo: {
    color: colors.polar,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 4,
    marginTop: 8
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 22
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 21
  },
  form: {
    width: "100%"
  },
  label: {
    color: colors.polar,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 16
  },
  input: {
    backgroundColor: colors.snow,
    borderWidth: 1,
    borderColor: colors.ice,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: colors.text,
    fontSize: 15
  },
  button: {
    backgroundColor: colors.ocean,
    paddingVertical: 17,
    borderRadius: 17,
    alignItems: "center",
    marginTop: 28
  },
  buttonText: {
    color: colors.snow,
    fontSize: 16,
    fontWeight: "800"
  },
  note: {
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 20
  }
});
