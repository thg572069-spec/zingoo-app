
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView
} from "react-native";

import { colors } from "../theme/colors";

type Props = {
  onStart: () => void;
  onLogin: () => void;
};

export default function WelcomeScreen({ onStart, onLogin }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>
          SEU MUNDO DE IDIOMAS
        </Text>

        <Text style={styles.logo}>ZINGOO</Text>

        <Text style={styles.tagline}>
          Aprender nunca foi tão divertido!
        </Text>

        <View style={styles.landscape}>
          <Text style={styles.snowflake}>❄</Text>
          <Text style={styles.aurora}>✦</Text>

          <View style={styles.mascots}>
            <Text style={styles.mascot}>🦭</Text>
            <Text style={styles.mascot}>🐧</Text>
            <Text style={styles.mascot}>🦉</Text>
            <Text style={styles.mascot}>🦊</Text>
          </View>

          <Text style={styles.landscapeText}>
            Uma aventura cheia de descobertas espera por você!
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.primaryButton}
            onPress={onStart}
          >
            <Text style={styles.primaryButtonText}>
              Começar minha aventura
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={onLogin}
          >
            <Text style={styles.secondaryButtonText}>
              Já tenho uma conta — Entrar
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          ZINGOO • Aprenda explorando
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 18
  },
  eyebrow: {
    color: colors.ocean,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3
  },
  logo: {
    color: colors.polar,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: 5
  },
  tagline: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center"
  },
  landscape: {
    width: "100%",
    flex: 1,
    maxHeight: 340,
    minHeight: 220,
    borderRadius: 30,
    backgroundColor: colors.ice,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginVertical: 20,
    overflow: "hidden"
  },
  snowflake: {
    position: "absolute",
    top: 22,
    left: 28,
    fontSize: 30,
    color: colors.snow
  },
  aurora: {
    position: "absolute",
    top: 35,
    right: 35,
    fontSize: 35,
    color: colors.aurora
  },
  mascots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12
  },
  mascot: {
    fontSize: 55
  },
  landscapeText: {
    color: colors.polar,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 28,
    lineHeight: 21
  },
  actions: {
    width: "100%",
    gap: 12
  },
  primaryButton: {
    backgroundColor: colors.ocean,
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: "center"
  },
  primaryButtonText: {
    color: colors.snow,
    fontSize: 16,
    fontWeight: "800"
  },
  secondaryButton: {
    backgroundColor: colors.snow,
    borderWidth: 1.5,
    borderColor: colors.ocean,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: colors.polar,
    fontSize: 14,
    fontWeight: "700"
  },
  footer: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 18
  }
});
