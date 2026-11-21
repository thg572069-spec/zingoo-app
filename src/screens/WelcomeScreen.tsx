
import React from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable
} from "react-native";

type Props = {
  onStart: () => void;
  onLogin: () => void;
};

export default function WelcomeScreen({
  onStart,
  onLogin
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed
            ]}
            onPress={onStart}
          >
            <Text style={styles.primaryButtonText}>
              Começar minha aventura
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed
            ]}
            onPress={onLogin}
          >
            <Text style={styles.secondaryButtonText}>
              Já tenho uma conta — Entrar
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent"
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 22
  },

  actions: {
    width: "100%",
    gap: 12
  },

  primaryButton: {
    backgroundColor: "#FFD166",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF"
  },

  primaryButtonText: {
    color: "#254B82",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center"
  },

  secondaryButton: {
    backgroundColor: "rgba(13, 110, 210, 0.88)",
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF"
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center"
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }]
  }
});
