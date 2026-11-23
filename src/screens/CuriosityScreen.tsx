
import React, { useEffect, useRef } from "react";

import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

import type { Language } from "./LanguageScreen";

type Props = {
  language: Language;
  onContinue: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/enhanced_IMG_0767.jpg"
);

const curiosities: Record<
  Language,
  {
    title: string;
    description: string;
    zuzu: string;
  }
> = {
  "Inglês": {
    title: "O inglês tem 26 letras!",
    description:
      "O alfabeto inglês possui as mesmas 26 letras do alfabeto básico que usamos em português. Mas a pronúncia delas pode ser bem diferente!",
    zuzu: "Uau! Nosso primeiro passo nessa aventura já começou!"
  },
  "Espanhol": {
    title: "O espanhol tem uma letra especial: Ñ!",
    description:
      "A letra Ñ faz parte do alfabeto espanhol e tem um som parecido com o NH de palavras como 'ninho'.",
    zuzu: "Olha só! Até uma letrinha pode ter uma história especial!"
  },
  "Francês": {
    title: "O francês tem uma ligação especial entre palavras!",
    description:
      "Isso se chama liaison: em algumas situações, uma consoante final que normalmente não é pronunciada ganha som quando a próxima palavra começa com vogal.",
    zuzu: "Que interessante! Esse idioma tem sons muito especiais!"
  },
  "Mandarim": {
    title: "No mandarim, o tom muda o significado!",
    description:
      "Uma mesma sílaba pode ter significados diferentes dependendo do tom utilizado na pronúncia. Por isso, ouvir e praticar é tão importante!",
    zuzu: "Incrível! Um pequeno detalhe na pronúncia pode mudar tudo!"
  }
};

export default function CuriosityScreen({
  language,
  onContinue
}: Props) {
  const content = curiosities[language];

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const continueRef = useRef(onContinue);

  useEffect(() => {
    continueRef.current = onContinue;
  }, [onContinue]);

  useEffect(() => {
    const entrance = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 550,
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
      <View style={styles.overlay} />

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
              UMA DESCOBERTA PARA VOCÊ
            </Text>

            <Text style={styles.heading}>
              Olha que curiosidade incrível!
            </Text>

            <View style={styles.languageBadge}>
              <Text style={styles.languageText}>
                {language.toUpperCase()}
              </Text>
            </View>

            <View style={styles.factCard}>
              <View style={styles.factDecoration}>
                <Text style={styles.factDecorationText}>?</Text>
              </View>

              <Text style={styles.factLabel}>
                VOCÊ SABIA?
              </Text>

              <Text style={styles.factTitle}>
                {content.title}
              </Text>

              <Text style={styles.factDescription}>
                {content.description}
              </Text>
            </View>

            <View style={styles.zuzuMessage}>
              <Text style={styles.zuzuMessageText}>
                {content.zuzu}
              </Text>
            </View>
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Sua aventura está apenas começando!
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
    backgroundColor: "rgba(238, 249, 255, 0.12)"
  },

  safeArea: {
    flex: 1
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 23,
    paddingTop: 28,
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
    marginBottom: 13
  },

  heading: {
    color: "#204C79",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: -0.7,
    marginBottom: 17
  },

  languageBadge: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 24
  },

  languageText: {
    color: "#168FCB",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5
  },

  factCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
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
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5
  },

  factDecoration: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#E5F5FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17
  },

  factDecorationText: {
    color: "#168FCB",
    fontSize: 27,
    fontWeight: "900"
  },

  factLabel: {
    color: "#2997C8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 10
  },

  factTitle: {
    color: "#204C79",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 29,
    marginBottom: 13
  },

  factDescription: {
    color: "#607D94",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22
  },

  zuzuMessage: {
    backgroundColor: "rgba(255,255,255,0.78)",
    borderRadius: 20,
    paddingHorizontal: 19,
    paddingVertical: 15,
    marginTop: 20
  },

  zuzuMessageText: {
    color: "#315D7C",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
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
    marginBottom: 12
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
