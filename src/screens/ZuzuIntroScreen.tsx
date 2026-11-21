
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { colors } from "../theme/colors";

type Props = {
  onContinue: () => void;
  onBack: () => void;
};

// Nome do arquivo preservado com os caracteres Unicode exatos do GitHub.
const ZUZU_INTRO_VIDEO = require(
  "../../assets/videos/PixVerse_V6_Image_Text_720P_Der_uma_animac\u0327a\u0303o_n.mov.mp4"
);

export default function ZuzuIntroScreen({
  onContinue,
  onBack
}: Props) {
  const [firstFrameRendered, setFirstFrameRendered] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.94)).current;

  const player = useVideoPlayer(ZUZU_INTRO_VIDEO, (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.muted = true;
  });

  useEffect(() => {
    const subscription = player.addListener(
      "statusChange",
      ({ status }) => {
        if (status === "readyToPlay") {
          player.play();
        }

        if (status === "error") {
          setShowButton(true);
        }
      }
    );

    return () => subscription.remove();
  }, [player]);

  useEffect(() => {
    if (!firstFrameRendered) return;

    const timeout = setTimeout(() => {
      player.pause();
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [firstFrameRendered, player]);

  useEffect(() => {
    if (!showButton) return;

    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        speed: 16,
        bounciness: 5,
        useNativeDriver: true
      })
    ]).start();
  }, [showButton, buttonOpacity, buttonScale]);

  return (
    <View style={styles.container}>
      <VideoView
        style={StyleSheet.absoluteFill}
        player={player}
        contentFit="contain"
        nativeControls={false}
        allowsPictureInPicture={false}
        onFirstFrameRender={() => setFirstFrameRendered(true)}
      />

      <SafeAreaView
        style={styles.overlay}
        pointerEvents="box-none"
      >
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

        <View
          style={styles.bottomArea}
          pointerEvents="box-none"
        >
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
    backgroundColor: colors.background,
    overflow: "hidden"
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
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 15
  },

  backText: {
    color: colors.polar,
    fontSize: 15,
    fontWeight: "800"
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
