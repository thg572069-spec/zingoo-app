
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

export type ReferralSource =
  | "TikTok"
  | "Instagram"
  | "Kwai"
  | "YouTube"
  | "Influenciadores e blogueiros"
  | "Indicação de amigos ou familiares"
  | "Google ou outros sites"
  | "Anúncios na internet"
  | "Outro";

type Props = {
  initialSource: ReferralSource | null;
  onContinue: (source: ReferralSource) => void;
  onBack: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/IMG_0768.jpeg"
);

const options: {
  value: ReferralSource;
  label: string;
  wide?: boolean;
}[] = [
  { value: "TikTok", label: "TikTok" },
  { value: "Instagram", label: "Instagram" },
  { value: "Kwai", label: "Kwai" },
  { value: "YouTube", label: "YouTube" },
  {
    value: "Influenciadores e blogueiros",
    label: "Influenciadores e blogueiros",
    wide: true
  },
  {
    value: "Indicação de amigos ou familiares",
    label: "Indicação de amigos ou familiares",
    wide: true
  },
  {
    value: "Google ou outros sites",
    label: "Google ou outros sites"
  },
  {
    value: "Anúncios na internet",
    label: "Anúncios na internet"
  },
  { value: "Outro", label: "Outro" }
];

export default function ReferralSourceScreen({
  initialSource,
  onContinue,
  onBack
}: Props) {
  const [selected, setSelected] =
    useState<ReferralSource | null>(initialSource);

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
      <View style={styles.backgroundOverlay} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.container}
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
                style={styles.backButton}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
              >
                <Text style={styles.backArrow}>‹</Text>
              </Pressable>

              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <View style={styles.progressFill} />
                  <View style={styles.progressIndicator} />
                </View>
              </View>
            </View>

            <View style={styles.heading}>
              <Text style={styles.eyebrow}>
                SÓ MAIS UMA PERGUNTINHA
              </Text>

              <Text style={styles.title}>
                Como você conheceu a{" "}
                <Text style={styles.titleBlue}>ZINGOO?</Text>
              </Text>

              <Text style={styles.subtitle}>
                Conta pra gente! Queremos saber como você chegou até aqui.
              </Text>
            </View>

            <View style={styles.optionsGrid}>
              {options.map((option) => {
                const isSelected = selected === option.value;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setSelected(option.value)}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: isSelected
                    }}
                    accessibilityLabel={`Selecionar ${option.label}`}
                    style={[
                      styles.optionCard,
                      option.wide && styles.wideOption,
                      isSelected && styles.selectedOption
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText
                      ]}
                    >
                      {option.label}
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
              style={[
                styles.continueButton,
                !selected && styles.disabledButton
              ]}
            >
              <Text style={styles.continueText}>
                Continuar
              </Text>
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

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(238, 249, 255, 0.12)"
  },

  safeArea: {
    flex: 1
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 22
  },

  content: {
    flex: 1
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    marginBottom: 30
  },

  backButton: {
    width: 34,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },

  backArrow: {
    color: "#526B7D",
    fontSize: 42,
    fontWeight: "300",
    lineHeight: 44
  },

  progressContainer: {
    flex: 1,
    justifyContent: "center"
  },

  progressTrack: {
    height: 17,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    overflow: "visible"
  },

  progressFill: {
    width: "60%",
    height: 17,
    borderRadius: 20,
    backgroundColor: "#238BE8"
  },

  progressIndicator: {
    position: "absolute",
    left: "58%",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#24B6D2",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#245D88",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 5
  },

  heading: {
    marginBottom: 25
  },

  eyebrow: {
    color: "#2788B9",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 12
  },

  title: {
    color: "#18364F",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 38,
    letterSpacing: -0.7
  },

  titleBlue: {
    color: "#168FCB"
  },

  subtitle: {
    color: "#435B70",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    marginTop: 12
  },

  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12
  },

  optionCard: {
    width: "48%",
    minHeight: 65,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.98)",
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    shadowColor: "#527C99",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3
  },

  wideOption: {
    width: "100%"
  },

  selectedOption: {
    borderColor: "#2878E5",
    backgroundColor: "#EAF5FF"
  },

  optionText: {
    flex: 1,
    color: "#19364F",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18
  },

  selectedOptionText: {
    color: "#1769B4"
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
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 17
  },

  continueButton: {
    backgroundColor: "#2587E8",
    minHeight: 62,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
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

  continueText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800"
  },

  bottomBackButton: {
    alignItems: "center",
    paddingVertical: 14
  },

  bottomBackText: {
    color: "#2879B9",
    fontSize: 17,
    fontWeight: "600"
  }
});
