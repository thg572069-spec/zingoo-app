
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
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.85)",
    shadowColor: "#163E70",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 7
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: "rgba(20, 55, 95, 0.35)",
    textShadowOffset: {
      width: 0,
      height: 1
    },
    textShadowRadius: 3
  },

  secondaryButton: {
    backgroundColor: "rgba(13, 110, 210, 0.30)",
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.65)",
    shadowColor: "#163E70",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    textShadowColor: "rgba(20, 55, 95, 0.4)",
    textShadowOffset: {
      width: 0,
      height: 1
    },
    textShadowRadius: 3
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }]
  }
});
