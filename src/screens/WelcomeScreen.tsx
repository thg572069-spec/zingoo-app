
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
              Começar
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
              Entrar
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
    backgroundColor: "#FFB52E",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFD477",
    shadowColor: "#9B5A00",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 7
  },

  primaryButtonText: {
    color: "#49300B",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center"
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D9EEFF",
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
    color: "#1267B5",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center"
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }]
  }
});
