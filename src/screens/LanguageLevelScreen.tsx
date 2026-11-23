
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

export type LanguageLevel =
  | "Nunca estudei"
  | "Sei algumas palavras"
  | "Entendo um pouco"
  | "Consigo conversar";

type Props = {
  initialLevel: LanguageLevel | null;
  onContinue: (level: LanguageLevel) => void;
  onBack: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/enhanced_IMG_0769.png"
);

const options: LanguageLevel[] = [
  "Nunca estudei",
  "Sei algumas palavras",
  "Entendo um pouco",
  "Consigo conversar"
];

export default function LanguageLevelScreen({
  initialLevel,
  onContinue,
  onBack
}: Props) {
  const [selected, setSelected] =
    useState<LanguageLevel | null>(initialLevel);

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

  function handleContinue() {
    if (selected) {
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
                VAMOS CONHECER SEU NÍVEL
              </Text>

              <Text style={styles.title}>
                Quanto você já sabe desse idioma?
              </Text>

              <Text style={styles.subtitle}>
                Não precisa ter vergonha! Queremos conhecer seu ponto de partida.
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {options.map((option, index) => {
                const isSelected = selected === option;

                return (
                  <Pressable
                    key={option}
                    onPress={() => setSelected(option)}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: isSelected
                    }}
                    accessibilityLabel={`Selecionar ${option}`}
                    style={({ pressed }) => [
                      styles.optionCard,
                      isSelected && styles.selectedOption,
                      pressed && styles.optionPressed
                    ]}
                  >
                    <View style={styles.optionNumber}>
                      <Text
                        style={[
                          styles.optionNumberText,
                          isSelected && styles.selectedOptionNumberText
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText
                      ]}
                    >
                      {option}
                    </Text>

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
              disabled={!selected}
              accessibilityRole="button"
              accessibilityState={{
                disabled: !selected
              }}
              style={({ pressed }) => [
                styles.continueButton,
                !selected && styles.disabledButton,
                pressed && selected && styles.continuePressed
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
    paddingHorizontal: 22,
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
    marginBottom: 27
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
    width: "55%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#2587E8"
  },

  heading: {
    marginBottom: 25
  },

  eyebrow: {
    color: "#2788B9",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.8,
    textAlign: "center",
    marginBottom: 12
  },

  title: {
    color: "#204C79",
    fontSize: 29,
    fontWeight: "900",
    lineHeight: 36,
    letterSpacing: -0.6,
    textAlign: "center",
    marginBottom: 12
  },

  subtitle: {
    color: "#416B89",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 5
  },

  optionsContainer: {
    gap: 12
  },

  optionCard: {
    minHeight: 68,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.98)",
    borderRadius: 19,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#527C99",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3
  },

  selectedOption: {
    borderColor: "#2878E5",
    backgroundColor: "#EAF5FF"
  },

  optionPressed: {
    transform: [{ scale: 0.985 }]
  },

  optionNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#E8F5FC",
    alignItems: "center",
    justifyContent: "center"
  },

  optionNumberText: {
    color: "#3286B5",
    fontSize: 14,
    fontWeight: "900"
  },

  selectedOptionNumberText: {
    color: "#1769B4"
  },

  optionText: {
    flex: 1,
    color: "#19364F",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21
  },

  selectedOptionText: {
    color: "#1769B4"
  },

  checkCircle: {
    width: 24,
    height: 24,
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
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 17
  },

  continueButton: {
    minHeight: 60,
    borderRadius: 19,
    backgroundColor: "#2587E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
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
    paddingVertical: 13
  },

  bottomBackText: {
    color: "#2879B9",
    fontSize: 16,
    fontWeight: "700"
  },

  pressed: {
    opacity: 0.75
  }
});
