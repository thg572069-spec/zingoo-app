
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

function Snowflake({
  left,
  delay,
  size
}: {
  left: string;
  delay: number;
  size: number;
}) {
  const fall = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(fall, {
            toValue: 1,
            duration: 6500,
            useNativeDriver: true
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.8,
              duration: 1000,
              useNativeDriver: true
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 5500,
              useNativeDriver: true
            })
          ])
        ]),
        Animated.timing(fall, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [fall, opacity, delay]);

  return (
    <Animated.Text
      pointerEvents="none"
      style={[
        styles.snowflake,
        {
          left,
          fontSize: size,
          opacity,
          transform: [
            {
              translateY: fall.interpolate({
                inputRange: [0, 1],
                outputRange: [-35, 620]
              })
            },
            {
              rotate: fall.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "180deg"]
              })
            }
          ]
        }
      ]}
    >
      ❄
    </Animated.Text>
  );
}

function IceCube({
  style,
  delay
}: {
  style: object;
  delay: number;
}) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(float, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [float, delay]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.iceCube,
        style,
        {
          transform: [
            {
              translateY: float.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -12]
              })
            },
            {
              rotate: float.interpolate({
                inputRange: [0, 1],
                outputRange: ["-12deg", "12deg"]
              })
            }
          ]
        }
      ]}
    >
      <View style={styles.iceCubeInner} />
    </Animated.View>
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
    videoPlayer.volume = 1.0;
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

      <View pointerEvents="none" style={styles.decorations}>
        <View style={styles.topIceBand} />
        <View style={styles.bottomIceBand} />

        <Snowflake left="8%" delay={0} size={17} />
        <Snowflake left="23%" delay={1100} size={13} />
        <Snowflake left="42%" delay={500} size={19} />
        <Snowflake left="62%" delay={1800} size={14} />
        <Snowflake left="79%" delay={800} size={18} />
        <Snowflake left="92%" delay={2200} size={12} />

        <IceCube style={styles.cubeTopLeft} delay={0} />
        <IceCube style={styles.cubeTopRight} delay={700} />
        <IceCube style={styles.cubeBottomLeft} delay={1200} />
        <IceCube style={styles.cubeBottomRight} delay={400} />
      </View>

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
    backgroundColor: colors.background,
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
  decorations: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden"
  },
  topIceBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: "rgba(189,239,255,0.12)"
  },
  bottomIceBand: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: "rgba(189,239,255,0.14)"
  },
  snowflake: {
    position: "absolute",
    top: 0,
    color: "#FFFFFF",
    textShadowColor: "rgba(22,143,203,0.55)",
    textShadowRadius: 7
  },
  iceCube: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.85)"
  },
  iceCubeInner: {
    flex: 1,
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    backgroundColor: "rgba(189,239,255,0.25)"
  },
  cubeTopLeft: {
    top: 58,
    left: 18
  },
  cubeTopRight: {
    top: 78,
    right: 20,
    width: 22,
    height: 22
  },
  cubeBottomLeft: {
    bottom: 95,
    left: 25,
    width: 23,
    height: 23
  },
  cubeBottomRight: {
    bottom: 100,
    right: 18
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
