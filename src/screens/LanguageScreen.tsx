
import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";

import { colors } from "../theme/colors";

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

const languages: {
  name: Language;
  flag: string;
  emoji: string;
  place: string;
  description: string;
  reaction: string;
  background: string;
  accent: string;
  image: any;
}[] = [
  {
    name: "Inglês",
    flag: "🇬🇧",
    emoji: "🕰️",
    place: "Londres",
    description: "Explore um mundo de possibilidades!",
    reaction: "Uau! Vamos explorar Londres e descobrir o inglês juntos!",
    background: "#D9F1FF",
    accent: "#168FCB",
    image: require("../../assets/videos/IMG_0749.jpeg")
  },
  {
    name: "Espanhol",
    flag: "🇪🇸",
    emoji: "🏛️",
    place: "Madri",
    description: "Descubra novas culturas e conversas!",
    reaction: "¡Qué divertido! Vamos descobrir o espanhol juntos!",
    background: "#DDF7EF",
    accent: "#42B99B",
    image: require("../../assets/videos/IMG_0748.jpeg")
  },
  {
    name: "Francês",
    flag: "🇫🇷",
    emoji: "🗼",
    place: "Paris",
    description: "Entre em uma aventura cheia de charme!",
    reaction: "Magnifique! Nossa aventura pela língua francesa começa agora!",
    background: "#E1E9FF",
    accent: "#526FB5",
    image: require("../../assets/videos/IMG_0750.jpeg")
  },
  {
    name: "Mandarim",
    flag: "🇨🇳",
    emoji: "🏯",
    place: "Pequim",
    description: "Conheça uma língua fascinante!",
    reaction: "Que incrível! Vamos explorar os sons e os caracteres do mandarim!",
    background: "#E5F8FF",
    accent: "#269CCB",
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

  const selectedInfo = languages.find(
    (language) => language.name === selected
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Voltar</Text>
        </Pressable>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.progressText}>
            SUA AVENTURA COMEÇA AQUI
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.mascot}>🦭</Text>

          <Text style={styles.title}>
            Qual idioma você quer aprender?
          </Text>

          <Text style={styles.subtitle}>
            Escolha seu primeiro destino. Eu vou acompanhar você nessa jornada!
          </Text>
        </View>

        <View style={styles.grid}>
          {languages.map((language) => {
            const isSelected = selected === language.name;

            return (
              <Pressable
                key={language.name}
                onPress={() => setSelected(language.name)}
                style={[
                  styles.languageCard,
                  { backgroundColor: language.background },
                  isSelected && {
                    borderColor: language.accent,
                    borderWidth: 3
                  }
                ]}
              >
                <View style={styles.cardTop}>
                  <Text style={styles.flag}>
                    {language.flag}
                  </Text>

                  {isSelected && (
                    <View
                      style={[
                        styles.check,
                        { backgroundColor: language.accent }
                      ]}
                    >
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>

                <Image
                  source={language.image}
                  style={styles.mascotImage}
                  resizeMode="contain"
                  accessibilityLabel={`Zuzu representando o idioma ${language.name}`}
                />

                <Text style={styles.languageName}>
                  {language.name}
                </Text>

                <Text
                  style={[
                    styles.place,
                    { color: language.accent }
                  ]}
                >
                  {language.emoji} {language.place}
                </Text>

                <Text style={styles.description}>
                  {language.description}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.reactionBox}>
          <Text style={styles.reactionMascot}>🦭</Text>

          <View style={styles.reactionContent}>
            <Text style={styles.reactionTitle}>
              {selectedInfo ? "A Zuzu adorou!" : "Uma dica da Zuzu"}
            </Text>

            <Text style={styles.reactionText}>
              {selectedInfo
                ? selectedInfo.reaction
                : "Escolha um idioma para eu preparar nossa primeira aventura!"}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => selected && onContinue(selected)}
          disabled={!selected}
          style={[
            styles.continueButton,
            !selected && styles.disabledButton
          ]}
        >
          <Text style={styles.continueText}>
            Continuar
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          Você poderá adicionar outros idiomas depois.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 28
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10
  },
  backText: {
    color: colors.polar,
    fontSize: 16,
    fontWeight: "700"
  },
  progressContainer: {
    marginTop: 12
  },
  progressBackground: {
    height: 6,
    borderRadius: 10,
    backgroundColor: colors.ice,
    overflow: "hidden"
  },
  progressFill: {
    width: "35%",
    height: "100%",
    backgroundColor: colors.ocean,
    borderRadius: 10
  },
  progressText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 9
  },
  header: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 25
  },
  mascot: {
    fontSize: 66,
    marginBottom: 12
  },
  title: {
    color: colors.polar,
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 10
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12
  },
  languageCard: {
    width: "47%",
    minHeight: 235,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 22,
    padding: 12,
    alignItems: "center"
  },
  cardTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flag: {
    fontSize: 25
  },
  check: {
    width: 23,
    height: 23,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  checkText: {
    color: colors.snow,
    fontWeight: "900"
  },
  mascotImage: {
    width: 112,
    height: 112,
    marginTop: 5
  },
  languageName: {
    color: colors.polar,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 3,
    textAlign: "center"
  },
  place: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
    textAlign: "center"
  },
  description: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 7,
    textAlign: "center"
  },
  reactionBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.snow,
    borderRadius: 18,
    padding: 15,
    marginTop: 22,
    borderWidth: 1,
    borderColor: colors.ice
  },
  reactionMascot: {
    fontSize: 38,
    marginRight: 12
  },
  reactionContent: {
    flex: 1
  },
  reactionTitle: {
    color: colors.polar,
    fontSize: 13,
    fontWeight: "900"
  },
  reactionText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4
  },
  continueButton: {
    backgroundColor: colors.ocean,
    paddingVertical: 17,
    borderRadius: 17,
    alignItems: "center",
    marginTop: 22
  },
  disabledButton: {
    backgroundColor: "#A9C7D5"
  },
  continueText: {
    color: colors.snow,
    fontSize: 16,
    fontWeight: "900"
  },
  footer: {
    color: colors.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 14
  }
});
