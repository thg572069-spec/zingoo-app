import React, { useEffect, useRef } from "react";

import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

import type { LanguageLevel } from "./LanguageLevelScreen";

type Props = {
  level: LanguageLevel;
  onContinue: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/IMG_0770.jpeg"
);

const messages: Record<
  LanguageLevel,
  {
    title: string;
    message: string;
  }
> = {
  "Nunca estudei": {
    title: "Vamos aprender juntinhos!",
    message:
      "Que legal ter você aqui! Vamos começar do zero, dando seus primeiros passos nesse idioma. Você vai se surpreender com tudo o que pode aprender!"
  },

  "Sei algumas palavras": {
    title: "Você já tem um começo!",
    message:
      "Você já tem uma pequena bagagem! Vamos aproveitar o que você sabe e descobrir muitas palavras novas nessa jornada!"
  },

  "Entendo um pouco": {
    title: "Vamos evoluir ainda mais!",
    message:
      "Olha só, você já começou sua jornada! Agora vamos fortalecer seu conhecimento e ganhar ainda mais confiança!"
  },

  "Consigo conversar": {
    title: "Vamos levar seu idioma além!",
    message:
      "Uau! Você já consegue se comunicar! Vamos aprimorar suas habilidades e levar seu conhecimento para outro nível!"
  }
};

export default function PersonalizedWelcomeScreen({
  level,
  onContinue
}: Props) {
  const content = messages[level];

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const continueRef = useRef(onContinue);

  useEffect(() => {
    continueRef.current = onContinue;
  }, [onContinue]);

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true
      }),

      Animated.spring(translateY, {
        toValue: 0,
        speed: 13,
        bounciness: 3,
        useNativeDriver: true
      })
    ]);

    entrance.start();

    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false
    }).start();

    const timer = setTimeout(() => {
      continueRef.current();
    }, 5000);

    return () => {
      clearTimeout(timer);
      entrance.stop();
      progress.stopAnimation();
    };
  }, [opacity, translateY, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      resizeMode="cover"
    >
      <View pointerEvents="none" style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity,
                transform: [{ translateY }]
              }
            ]}
          >
            <Text style={styles.eyebrow}>
              SUA JORNADA NA ZINGOO
            </Text>

            <Text style={styles.title}>
              {content.title}
            </Text>

            <View style={styles.messageCard}>
              <Text style={styles.messageLabel}>
                UMA MENSAGEM DA ZUZU
              </Text>

              <Text style={styles.message}>
                {content.message}
              </Text>
            </View>
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Preparando sua próxima aventura...
            </Text>

            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  { width: progressWidth }
                ]}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#DDF3FF"
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(230, 246, 255, 0.16)"
  },

  safeArea: {
    flex: 1
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 23,
    paddingTop: 35,
    paddingBottom: 25
  },

  content: {
    flex: 1,
    justifyContent: "center"
  },

  eyebrow: {
    color: "#2788B9",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 17
  },

  title: {
    color: "#204C79",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 38,
    letterSpacing: -0.6,
    textAlign: "center",
    marginBottom: 25
  },

  messageCard: {
    backgroundColor: "rgba(255,255,255,0.91)",
    borderRadius: 27,
    paddingHorizontal: 23,
    paddingVertical: 27,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.98)",
    shadowColor: "#39749C",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 5
  },

  messageLabel: {
    color: "#2997C8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.7,
    textAlign: "center",
    marginBottom: 15
  },

  message: {
    color: "#315D7C",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 27,
    textAlign: "center"
  },

  footer: {
    alignItems: "center",
    paddingTop: 18
  },

  footerText: {
    color: "#52718B",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center"
  },

  progressTrack: {
    width: "100%",
    height: 5,
    borderRadius: 5,
    backgroundColor: "rgba(36,91,130,0.15)",
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#168FCB",
    borderRadius: 5
  }
});
