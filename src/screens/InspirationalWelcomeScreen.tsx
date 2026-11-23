
import React, { useEffect, useRef } from "react";

import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { LearningReason } from "./LearningReasonsScreen";

type Props = {
  reasons: LearningReason[];
  onContinue: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/IMG_0772.jpeg"
);

const messages: Record<LearningReason, string> = {
  "Viajar e conhecer outros países":
    "Você quer explorar novos lugares, conhecer culturas e viver experiências inesquecíveis.",

  "Conseguir melhores oportunidades de trabalho":
    "Você está construindo novas possibilidades para sua carreira e para o seu futuro.",

  "Estudar e ampliar meus conhecimentos":
    "Sua curiosidade pode levar você a descobertas incríveis e a novos caminhos de conhecimento.",

  "Assistir a filmes, séries e vídeos sem depender de legendas":
    "Você poderá aproveitar seus filmes, séries e conteúdos favoritos de uma forma ainda mais completa.",

  "Conversar com pessoas de outros países":
    "Novas amizades e conversas com pessoas do mundo inteiro podem estar mais perto do que você imagina.",

  "Desenvolvimento pessoal e novos desafios":
    "Cada nova palavra será uma conquista e mais um passo no seu desenvolvimento pessoal."
};

export default function InspirationalWelcomeScreen({
  reasons,
  onContinue
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const hasContinued = useRef(false);

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(translateY, {
        toValue: 0,
        speed: 14,
        bounciness: 3,
        useNativeDriver: true
      })
    ]);

    entrance.start();

    const timeout = setTimeout(() => {
      if (!hasContinued.current) {
        hasContinued.current = true;
        onContinue();
      }
    }, 4000);

    return () => {
      entrance.stop();
      clearTimeout(timeout);
    };
  }, [opacity, translateY, onContinue]);

  const personalizedMessages = reasons
    .filter((reason) => messages[reason])
    .map((reason) => messages[reason]);

  const personalizedText = personalizedMessages.length > 0
    ? personalizedMessages.join(" ")
    : "Uma jornada cheia de descobertas, experiências e novas possibilidades espera por você.";

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
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
              SUA JORNADA COMEÇA AQUI
            </Text>

            <Text style={styles.title}>
              Um idioma pode abrir um mundo inteiro!
            </Text>

            <Text style={styles.message}>
              {personalizedText}
            </Text>

            <View style={styles.highlightContainer}>
              <Text style={styles.highlight}>
                O mundo fica maior quando você aprende uma nova língua!
              </Text>
            </View>
          </Animated.View>

          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"]
                  })
                }
              ]}
            />
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

  safeArea: {
    flex: 1
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 25
  },

  content: {
    alignItems: "center",
    justifyContent: "center"
  },

  eyebrow: {
    color: "#287DB5",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 15
  },

  title: {
    color: "#204C79",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 37,
    letterSpacing: -0.6,
    textAlign: "center",
    marginBottom: 20
  },

  message: {
    color: "#315C7B",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 25,
    textAlign: "center"
  },

  highlightContainer: {
    marginTop: 25,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.76)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)"
  },

  highlight: {
    color: "#176DB1",
    fontSize: 15,
    fontWeight: "900",
    lineHeight: 22,
    textAlign: "center"
  },

  progressTrack: {
    height: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.55)",
    overflow: "hidden",
    marginTop: 30
  },

  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#2587E8"
  }
});
