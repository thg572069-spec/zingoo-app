
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
  onContinue: () => void;
  onBack: () => void;
};

export default function ZuzuIntroScreen({ onContinue, onBack }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Voltar</Text>
        </Pressable>

        <View style={styles.content}>
          <Text style={styles.eyebrow}>SUA NOVA COMPANHEIRA</Text>

          <View style={styles.mascotArea}>
            <Text style={styles.snowflake}>❄</Text>
            <Text style={styles.mascot}>🦭</Text>
            <Text style={styles.sparkle}>✦</Text>
          </View>

          <Text style={styles.title}>
            Oii! Eu sou a Zuzu!
          </Text>

          <Text style={styles.message}>
            Seja muito bem-vindo à ZINGOO!
          </Text>

          <Text style={styles.description}>
            Aqui, você vai explorar um mundo cheio de descobertas,
            aventuras e diversão enquanto aprende novos idiomas.
            {"\n\n"}
            Eu vou acompanhar você, ajudar nas atividades e comemorar
            cada conquista!
          </Text>

          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              Está preparado para começar essa aventura comigo?
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={onContinue}
        >
          <Text style={styles.buttonText}>
            Vamos nessa!
          </Text>
        </Pressable>
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
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  eyebrow: {
    color: colors.ocean,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2
  },
  mascotArea: {
    width: 230,
    height: 210,
    borderRadius: 34,
    backgroundColor: colors.ice,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 28
  },
  mascot: {
    fontSize: 112
  },
  snowflake: {
    position: "absolute",
    top: 20,
    left: 24,
    fontSize: 30,
    color: colors.snow
  },
  sparkle: {
    position: "absolute",
    right: 25,
    bottom: 24,
    fontSize: 35,
    color: colors.sun
  },
  title: {
    color: colors.polar,
    fontSize: 29,
    fontWeight: "900",
    textAlign: "center"
  },
  message: {
    color: colors.ocean,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 12,
    textAlign: "center"
  },
  description: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 18
  },
  speechBubble: {
    backgroundColor: colors.snow,
    borderRadius: 20,
    padding: 18,
    marginTop: 22,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.ice
  },
  speechText: {
    color: colors.polar,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 22
  },
  button: {
    backgroundColor: colors.ocean,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center"
  },
  buttonText: {
    color: colors.snow,
    fontSize: 16,
    fontWeight: "800"
  }
});
