
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { colors } from "../theme/colors";

type Props = {
  onContinue: () => void;
  onBack: () => void;
};

const ZUZU_INTRO_IMAGE = require(
  "../../assets/videos/IMG_0762.png"
);

const SPEECH =
  "Oi! Eu sou a Zuzu. Que alegria ter você aqui! Vamos aprender novos idiomas, descobrir coisas incríveis e nos divertir muito pelo caminho. Preparado para começar?";

const SPEECH_WORDS = SPEECH.split(" ");

export default function ZuzuIntroScreen({
  onContinue,
  onBack
}: Props) {
  const [showButton, setShowButton] = useState(false);

  const bubbleOpacity = useRef(new Animated.Value(0)).current;
  const bubbleTranslate = useRef(new Animated.Value(18)).current;
  const bubbleScale = useRef(new Animated.Value(0.96)).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.94)).current;

  const wordAnimations = useRef(
    SPEECH_WORDS.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bubbleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(bubbleTranslate, {
        toValue: 0,
        speed: 14,
        bounciness: 4,
        useNativeDriver: true
      }),
      Animated.spring(bubbleScale, {
        toValue: 1,
        speed: 14,
        bounciness: 4,
        useNativeDriver: true
      })
    ]).start();

    Animated.stagger(
      75,
      wordAnimations.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true
        })
      )
    ).start();

    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 5200);

    return () => clearTimeout(timeout);
  }, [
    bubbleOpacity,
    bubbleTranslate,
    bubbleScale,
    wordAnimations
  ]);

  useEffect(() => {
    if (!showButton) return;

    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        speed: 15,
        bounciness: 5,
        useNativeDriver: true
      })
    ]).start();
  }, [showButton, buttonOpacity, buttonScale]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ZUZU_INTRO_IMAGE}
        style={styles.backgroundImage}
        imageStyle={styles.image}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.overlay}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed
          ]}
          accessibilityRole="button"
          accessibilityLabel="Voltar para a tela de boas-vindas"
        >
          <Text style={styles.backText}>‹ Voltar</Text>
        </Pressable>

        <Animated.View
          style={[
            styles.speechBubble,
            {
              opacity: bubbleOpacity,
              transform: [
                { translateY: bubbleTranslate },
                { scale: bubbleScale }
              ]
            }
          ]}
        >
          <Text style={styles.speechText}>
            {SPEECH_WORDS.map((word, index) => (
              <Animated.Text
                key={index}
                style={{
                  opacity: wordAnimations[index],
                  transform: [
                    {
                      translateY: wordAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [5, 0]
                      })
                    }
                  ]
                }}
              >
                {word}
                {index < SPEECH_WORDS.length - 1 ? " " : ""}
              </Animated.Text>
            ))}
          </Text>

          <View style={styles.bubbleTail} />
        </Animated.View>

        <View style={styles.bottomArea}>
          {showButton && (
            <Animated.View
              style={{
                opacity: buttonOpacity,
                transform: [{ scale: buttonScale }]
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed
                ]}
                onPress={onContinue}
                accessibilityRole="button"
              >
                <Text style={styles.buttonText}>
                  Vamos nessa!
                </Text>

                <Text style={styles.buttonArrow}>›</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8CC8F0",
    overflow: "hidden"
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%"
  },

  image: {
    width: "100%",
    height: "100%"
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 18,
    justifyContent: "space-between"
  },

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 15
  },

  backText: {
    color: colors.polar,
    fontSize: 15,
    fontWeight: "800"
  },

  speechBubble: {
    position: "absolute",
    top: "28%",
    alignSelf: "center",
    width: "88%",
    maxWidth: 360,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#164F8B",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8
  },

  speechText: {
    color: "#164F8B",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "center"
  },

  bubbleTail: {
    position: "absolute",
    bottom: -11,
    left: "50%",
    marginLeft: -12,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF"
  },

  bottomArea: {
    minHeight: 68,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  button: {
    minWidth: 220,
    minHeight: 56,
    borderRadius: 19,
    paddingHorizontal: 24,
    backgroundColor: colors.ocean,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.polar,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.18,
    shadowRadius: 9,
    elevation: 5
  },

  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }]
  },

  buttonText: {
    color: colors.snow,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.2
  },

  buttonArrow: {
    color: colors.snow,
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 10,
    marginTop: -2
  },

  pressed: {
    opacity: 0.75
  }
});
