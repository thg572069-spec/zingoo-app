
import React, { useEffect, useRef, useState } from "react";

import {
  Animated,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export type LearningReason =
  | "Viajar e conhecer outros países"
  | "Conseguir melhores oportunidades de trabalho"
  | "Estudar e ampliar meus conhecimentos"
  | "Assistir a filmes, séries e vídeos sem depender de legendas"
  | "Conversar com pessoas de outros países"
  | "Desenvolvimento pessoal e novos desafios";

type Props = {
  initialReasons: LearningReason[];
  onContinue: (reasons: LearningReason[]) => void;
  onBack: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/IMG_0771.jpeg"
);

const options: {
  title: LearningReason;
  description: string;
}[] = [
  {
    title: "Viajar e conhecer outros países",
    description: "Explore o mundo e viva novas experiências."
  },
  {
    title: "Conseguir melhores oportunidades de trabalho",
    description: "Amplie suas possibilidades profissionais."
  },
  {
    title: "Estudar e ampliar meus conhecimentos",
    description: "Descubra novos conteúdos e oportunidades."
  },
  {
    title: "Assistir a filmes, séries e vídeos sem depender de legendas",
    description: "Entenda seus conteúdos favoritos no idioma original."
  },
  {
    title: "Conversar com pessoas de outros países",
    description: "Faça amizades e conheça novas culturas."
  },
  {
    title: "Desenvolvimento pessoal e novos desafios",
    description: "Supere limites e conquiste novas habilidades."
  }
];

export default function LearningReasonsScreen({
  initialReasons,
  onContinue,
  onBack
}: Props) {
  const [selected, setSelected] =
    useState<LearningReason[]>(initialReasons);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

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

    return () => entrance.stop();
  }, [opacity, translateY]);

  function toggleReason(reason: LearningReason) {
    setSelected((current) =>
      current.includes(reason)
        ? current.filter((item) => item !== reason)
        : [...current, reason]
    );
  }

  function handleContinue() {
    if (selected.length > 0) {
      onContinue(selected);
    }
  }

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity,
                transform: [{ translateY }]
              }
            ]}
          >
            <View style={styles.topBar}>
              <Pressable
                onPress={onBack}
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.pressed
                ]}
                accessibilityRole="button"
                accessibilityLabel="Voltar para a tela anterior"
              >
                <Text style={styles.backArrow}>‹</Text>
              </Pressable>

              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <View style={styles.progressFill} />
                </View>
              </View>
            </View>

            <View style={styles.heading}>
              <Text style={styles.eyebrow}>
                SEUS OBJETIVOS
              </Text>

              <Text style={styles.title}>
                Por que você quer aprender esse idioma?
              </Text>

              <Text style={styles.subtitle}>
                Escolha os motivos que mais combinam com você!
              </Text>

              <Text style={styles.helper}>
                Você pode escolher mais de uma opção.
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {options.map((option, index) => {
                const isSelected = selected.includes(option.title);

                return (
                  <Pressable
                    key={option.title}
                    onPress={() => toggleReason(option.title)}
                    accessibilityRole="checkbox"
                    accessibilityState={{
                      checked: isSelected
                    }}
                    accessibilityLabel={option.title}
                    style={({ pressed }) => [
                      styles.optionCard,
                      isSelected && styles.selectedOption,
                      pressed && styles.optionPressed
                    ]}
                  >
                    <View
                      style={[
                        styles.optionNumber,
                        isSelected && styles.selectedOptionNumber
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionNumberText,
                          isSelected && styles.selectedOptionNumberText
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </View>

                    <View style={styles.optionContent}>
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.selectedOptionText
                        ]}
                      >
                        {option.title}
                      </Text>

                      <Text style={styles.optionDescription}>
                        {option.description}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.checkCircle,
                        isSelected && styles.selectedCheckCircle
                      ]}
                    >
                      {isSelected && (
                        <Text style={styles.checkText}>✓</Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={handleContinue}
              disabled={selected.length === 0}
              accessibilityRole="button"
              accessibilityState={{
                disabled: selected.length === 0
              }}
              style={({ pressed }) => [
                styles.continueButton,
                selected.length === 0 && styles.disabledButton,
                pressed && selected.length > 0 && styles.continuePressed
              ]}
            >
              <Text style={styles.continueText}>
                Continuar
              </Text>

              <Text style={styles.continueArrow}>›</Text>
            </Pressable>

            <Pressable
              onPress={onBack}
              style={styles.bottomBackButton}
              accessibilityRole="button"
            >
              <Text style={styles.bottomBackText}>
                Voltar
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
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

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 21,
    paddingTop: 12,
    paddingBottom: 20
  },

  content: {
    flex: 1
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#315D7C",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3
  },

  backArrow: {
    color: "#2879B9",
    fontSize: 31,
    lineHeight: 34,
    fontWeight: "600",
    marginTop: -3
  },

  progressContainer: {
    flex: 1
  },

  progressTrack: {
    height: 7,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.65)",
    overflow: "hidden"
  },

  progressFill: {
    width: "65%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#2587E8"
  },

  heading: {
    marginBottom: 18
  },

  eyebrow: {
    color: "#2788B9",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.8,
    textAlign: "center",
    marginBottom: 10
  },

  title: {
    color: "#204C79",
    fontSize: 27,
    fontWeight: "900",
    lineHeight: 34,
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 10
  },

  subtitle: {
    color: "#416B89",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
    textAlign: "center"
  },

  helper: {
    color: "#2788B9",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 8
  },

  optionsContainer: {
    gap: 9
  },

  optionCard: {
    minHeight: 72,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.98)",
    borderRadius: 17,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#527C99",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 2
  },

  selectedOption: {
    borderColor: "#2878E5",
    backgroundColor: "#EAF5FF"
  },

  optionPressed: {
    transform: [{ scale: 0.985 }]
  },

  optionNumber: {
    width: 31,
    height: 31,
    borderRadius: 11,
    backgroundColor: "#E8F5FC",
    alignItems: "center",
    justifyContent: "center"
  },

  selectedOptionNumber: {
    backgroundColor: "#D6EBFF"
  },

  optionNumberText: {
    color: "#3286B5",
    fontSize: 13,
    fontWeight: "900"
  },

  selectedOptionNumberText: {
    color: "#1769B4"
  },

  optionContent: {
    flex: 1,
    gap: 3
  },

  optionText: {
    color: "#19364F",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17
  },

  selectedOptionText: {
    color: "#1769B4"
  },

  optionDescription: {
    color: "#638096",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 15
  },

  checkCircle: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#B7CEDD",
    alignItems: "center",
    justifyContent: "center"
  },

  selectedCheckCircle: {
    backgroundColor: "#2878E5",
    borderColor: "#2878E5"
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 16
  },

  continueButton: {
    minHeight: 58,
    borderRadius: 19,
    backgroundColor: "#2587E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#1765B5",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5
  },

  disabledButton: {
    backgroundColor: "#A9C7D5",
    shadowOpacity: 0
  },

  continuePressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }]
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900"
  },

  continueArrow: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "700",
    marginLeft: 9,
    marginTop: -2
  },

  bottomBackButton: {
    alignItems: "center",
    paddingVertical: 11
  },

  bottomBackText: {
    color: "#2879B9",
    fontSize: 15,
    fontWeight: "700"
  },

  pressed: {
    opacity: 0.75
  }
});
