
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";

export type Language =
  | "Inglês"
  | "Espanhol"
  | "Francês"
  | "Mandarim";

type Props = {
  initialLanguage: Language | null;
  onContinue: (language: Language) => void;
  onBack: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/enhanced_IMG_0766.png"
);

const languages: {
  name: Language;
  image: any;
}[] = [
  {
    name: "Inglês",
    image: require("../../assets/videos/IMG_0749.jpeg")
  },
  {
    name: "Espanhol",
    image: require("../../assets/videos/IMG_0748.jpeg")
  },
  {
    name: "Francês",
    image: require("../../assets/videos/IMG_0750.jpeg")
  },
  {
    name: "Mandarim",
    image: require("../../assets/videos/IMG_0751.jpeg")
  }
];

export default function LanguageScreen({
  initialLanguage,
  onContinue,
  onBack
}: Props) {
  const [selected, setSelected] = useState<Language | null>(
    initialLanguage
  );

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
          {/* Voltar e progresso */}

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

          {/* Título */}

          <View style={styles.heading}>
            <Text style={styles.title}>
              <Text style={styles.titleOrange}>
                Qual idioma
              </Text>
              {" você\nquer aprender?"}
            </Text>

            <Text style={styles.subtitle}>
              Escolha seu próximo destino!
            </Text>
          </View>

          {/* Cartões dos idiomas */}

          <View style={styles.grid}>
            {languages.map((language) => {
              const isSelected = selected === language.name;

              return (
                <Pressable
                  key={language.name}
                  onPress={() => setSelected(language.name)}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: isSelected
                  }}
                  accessibilityLabel={`Selecionar ${language.name}`}
                  style={[
                    styles.languageCard,
                    isSelected && styles.selectedCard
                  ]}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={language.image}
                      style={styles.languageImage}
                      resizeMode="cover"
                    />

                    {isSelected && (
                      <View style={styles.checkCircle}>
                        <Text style={styles.checkText}>
                          ✓
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.languageName}>
                    {language.name.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Continuar */}

          <Pressable
            onPress={() => {
              if (selected) {
                onContinue(selected);
              }
            }}
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
    backgroundColor: "#E8F7FF"
  },

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(238, 249, 255, 0.10)"
  },

  safeArea: {
    flex: 1
  },

  container: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 22
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    marginBottom: 32
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
    width: "40%",
    height: 17,
    borderRadius: 20,
    backgroundColor: "#238BE8"
  },

  progressIndicator: {
    position: "absolute",
    left: "38%",
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
    width: "82%",
    marginBottom: 26
  },

  title: {
    color: "#18364F",
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 40,
    letterSpacing: -0.7
  },

  titleOrange: {
    color: "#E68A35"
  },

  subtitle: {
    color: "#435B70",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 13
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 15
  },

  languageCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.95)",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    shadowColor: "#527C99",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 4
  },

  selectedCard: {
    borderColor: "#2878E5",
    backgroundColor: "#EAF5FF",
    borderWidth: 3,
    padding: 9
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 17,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#E8F4FA"
  },

  languageImage: {
    width: "100%",
    height: "100%"
  },

  checkCircle: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: "#2878E5",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },

  checkText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    lineHeight: 27
  },

  languageName: {
    color: "#19364F",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 7
  },

  continueButton: {
    backgroundColor: "#2587E8",
    minHeight: 62,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
    paddingVertical: 15
  },

  bottomBackText: {
    color: "#2879B9",
    fontSize: 18,
    fontWeight: "600"
  }
});
