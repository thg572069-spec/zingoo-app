
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

const ZUZU_INTRO_VIDEO = require(
  "../../assets/videos/PixVerse_V6_Image_Text_720P_Der_uma_animac\u0327a\u0303o_n.mov.mp4"
);

function IceCube({
  style,
  delay = 0
}: {
  style: object;
  delay?: number;
}) {
  const movement = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(movement, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true
        }),
        Animated.timing(movement, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [movement, delay]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.iceCube,
        style,
        {
          transform: [
            {
              translateY: movement.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -3]
              })
            },
            {
              rotate: movement.interpolate({
                inputRange: [0, 1],
                outputRange: ["-7deg", "7deg"]
              })
            }
          ]
        }
      ]}
    >
      <View style={styles.cubeShine} />
    </Animated.View>
  );
}

function SnowFrame() {
  return (
    <View pointerEvents="none" style={styles.frame}>
      {/* Acabamento superior */}
      <View style={styles.topFrame}>
        <View style={styles.topSnow} />
        <View style={[styles.snowBump, styles.topBumpLeft]} />
        <View style={[styles.snowBump, styles.topBumpCenter]} />
        <View style={[styles.snowBump, styles.topBumpRight]} />

        <View style={[styles.icicle, styles.icicleLeft]} />
        <View style={[styles.icicle, styles.icicleCenter]} />
        <View style={[styles.icicle, styles.icicleRight]} />

        <IceCube style={styles.topCubeLeft} />
        <IceCube style={styles.topCubeRight} delay={700} />
      </View>

      {/* Acabamento inferior */}
      <View style={styles.bottomFrame}>
        <View style={styles.bottomSnow} />
        <View style={[styles.snowBump, styles.bottomBumpLeft]} />
        <View style={[styles.snowBump, styles.bottomBumpRight]} />

        <IceCube style={styles.bottomCubeLeft} delay={400} />
        <IceCube style={styles.bottomCubeRight} delay={900} />
      </View>
    </View>
  );
}

export default function ZuzuIntroScreen({ onContinue, onBack }: Props) {
  const [firstFrameRendered, setFirstFrameRendered] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.94)).current;

  const player = useVideoPlayer(ZUZU_INTRO_VIDEO, (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.muted = false;
    videoPlayer.volume = 1;
  });

  useEffect(() => {
    const subscription = player.addListener("statusChange", ({ status }) => {
      if (status === "readyToPlay") {
        player.play();
      }

      if (status === "error") {
        setShowButton(true);
      }
    });

    return () => subscription.remove();
  }, [player]);

  useEffect(() => {
    if (!firstFrameRendered) return;

    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [firstFrameRendered]);

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
      <View style={styles.videoFrame}>
        <VideoView
          style={styles.video}
          player={player}
          contentFit="contain"
          nativeControls={false}
          playsInline={true}
          allowsPictureInPicture={false}
          onFirstFrameRender={() => setFirstFrameRendered(true)}
        />
      </View>

      <SnowFrame />

      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => undefined}
        accessible={false}
      />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
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

        <View style={styles.bottomArea} pointerEvents="box-none">
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
                <Text style={styles.buttonText}>Vamos nessa!</Text>
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
    backgroundColor: "#BDEFFF",
    overflow: "hidden"
  },
  videoFrame: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  video: {
    width: "100%",
    height: "100%"
  },
  frame: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between"
  },
  topFrame: {
    height: 30,
    backgroundColor: "#BDEFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    overflow: "hidden"
  },
  topSnow: {
    position: "absolute",
    top: -15,
    left: -10,
    right: -10,
    height: 29,
    borderRadius: 20,
    backgroundColor: "#FFFFFF"
  },
  snowBump: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 20
  },
  topBumpLeft: {
    top: 10,
    left: 20,
    width: 40,
    height: 16
  },
  topBumpCenter: {
    top: 12,
    left: "48%",
    width: 35,
    height: 14
  },
  topBumpRight: {
    top: 9,
    right: 30,
    width: 45,
    height: 17
  },
  icicle: {
    position: "absolute",
    top: 20,
    width: 8,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#80D8F4",
    borderWidth: 1,
    borderColor: "#FFFFFF"
  },
  icicleLeft: {
    left: "27%"
  },
  icicleCenter: {
    left: "69%",
    height: 7
  },
  icicleRight: {
    right: "13%",
    height: 6
  },
  bottomFrame: {
    height: 30,
    backgroundColor: "#BDEFFF",
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    overflow: "hidden"
  },
  bottomSnow: {
    position: "absolute",
    bottom: -17,
    left: -10,
    right: -10,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#FFFFFF"
  },
  bottomBumpLeft: {
    top: 1,
    left: 35,
    width: 45,
    height: 15
  },
  bottomBumpRight: {
    top: 2,
    right: 35,
    width: 48,
    height: 14
  },
  iceCube: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#83D9F4",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    shadowColor: "#168FCB",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  cubeShine: {
    position: "absolute",
    top: 2,
    left: 2,
    width: 5,
    height: 3,
    borderRadius: 3,
    backgroundColor: "#FFFFFF"
  },
  topCubeLeft: {
    top: 12,
    left: 8
  },
  topCubeRight: {
    top: 12,
    right: 8
  },
  bottomCubeLeft: {
    top: 11,
    left: 10
  },
  bottomCubeRight: {
    top: 11,
    right: 10
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
    shadowOffset: { width: 0, height: 5 },
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
