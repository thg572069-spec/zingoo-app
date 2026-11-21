
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
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

function SnowDot({
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
            duration: 5000,
            useNativeDriver: true
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.9,
              duration: 700,
              useNativeDriver: true
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 4300,
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
    <Animated.View
      pointerEvents="none"
      style={[
        styles.snowDot,
        {
          left,
          width: size,
          height: size,
          opacity,
          transform: [
            {
              translateY: fall.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, 115]
              })
            }
          ]
        }
      ]}
    />
  );
}

function FloatingCube({
  style,
  delay
}: {
  style: object;
  delay: number;
}) {
  const movement = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(movement, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true
        }),
        Animated.timing(movement, {
          toValue: 0,
          duration: 2600,
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
                outputRange: [0, -9]
              })
            },
            {
              rotate: movement.interpolate({
                inputRange: [0, 1],
                outputRange: ["-8deg", "8deg"]
              })
            }
          ]
        }
      ]}
    >
      <View style={styles.cubeHighlight} />
      <View style={styles.cubeReflection} />
    </Animated.View>
  );
}

function Icicle({ style }: { style: object }) {
  return (
    <View pointerEvents="none" style={[styles.icicle, style]}>
      <View style={styles.icicleShine} />
    </View>
  );
}

function MeltingDrop({
  style,
  delay
}: {
  style: object;
  delay: number;
}) {
  const drop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(drop, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(drop, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [drop, delay]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.meltingDrop,
        style,
        {
          opacity: drop.interpolate({
            inputRange: [0, 0.2, 1],
            outputRange: [0, 1, 0]
          }),
          transform: [
            {
              translateY: drop.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 19]
              })
            }
          ]
        }
      ]}
    />
  );
}

function PolarFrame() {
  return (
    <View pointerEvents="none" style={styles.frame}>
      {/* Moldura superior */}
      <View style={styles.topFrame}>
        <View style={styles.topSnowBase} />

        <View style={[styles.snowPuff, styles.puffTop1]} />
        <View style={[styles.snowPuff, styles.puffTop2]} />
        <View style={[styles.snowPuff, styles.puffTop3]} />
        <View style={[styles.snowPuff, styles.puffTop4]} />
        <View style={[styles.snowPuff, styles.puffTop5]} />

        <Icicle style={styles.icicle1} />
        <Icicle style={styles.icicle2} />
        <Icicle style={styles.icicle3} />
        <Icicle style={styles.icicle4} />
        <Icicle style={styles.icicle5} />

        <MeltingDrop style={styles.drop1} delay={200} />
        <MeltingDrop style={styles.drop2} delay={900} />
        <MeltingDrop style={styles.drop3} delay={1400} />

        <FloatingCube style={styles.topCube1} delay={0} />
        <FloatingCube style={styles.topCube2} delay={700} />

        <SnowDot left="18%" delay={0} size={5} />
        <SnowDot left="38%" delay={900} size={4} />
        <SnowDot left="60%" delay={400} size={6} />
        <SnowDot left="82%" delay={1200} size={4} />
      </View>

      {/* Moldura inferior */}
      <View style={styles.bottomFrame}>
        <View style={styles.bottomSnowBase} />

        <View style={[styles.snowPuff, styles.puffBottom1]} />
        <View style={[styles.snowPuff, styles.puffBottom2]} />
        <View style={[styles.snowPuff, styles.puffBottom3]} />
        <View style={[styles.snowPuff, styles.puffBottom4]} />

        <FloatingCube style={styles.bottomCube1} delay={500} />
        <FloatingCube style={styles.bottomCube2} delay={1100} />

        <View style={styles.iceCrystal} />
        <View style={styles.iceCrystalSmall} />

        <SnowDot left="15%" delay={500} size={5} />
        <SnowDot left="45%" delay={1300} size={4} />
        <SnowDot left="72%" delay={300} size={5} />
        <SnowDot left="90%" delay={1600} size={4} />
      </View>
    </View>
  );
}

export default function ZuzuIntroScreen({ onContinue, onBack }: Props) {
  const { height } = useWindowDimensions();

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

      <PolarFrame />

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
    height: 105,
    backgroundColor: "#BDEFFF",
    borderBottomWidth: 3,
    borderBottomColor: "#FFFFFF",
    overflow: "hidden"
  },
  topSnowBase: {
    position: "absolute",
    left: -20,
    right: -20,
    top: -23,
    height: 78,
    borderRadius: 45,
    backgroundColor: "#FFFFFF"
  },
  snowPuff: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 50
  },
  puffTop1: {
    width: 95,
    height: 42,
    top: 28,
    left: -15
  },
  puffTop2: {
    width: 120,
    height: 45,
    top: 24,
    left: "22%"
  },
  puffTop3: {
    width: 100,
    height: 40,
    top: 31,
    left: "53%"
  },
  puffTop4: {
    width: 110,
    height: 45,
    top: 23,
    right: -20
  },
  puffTop5: {
    width: 75,
    height: 30,
    top: 45,
    left: "76%"
  },
  icicle: {
    position: "absolute",
    top: 57,
    width: 15,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#80D8F4",
    borderWidth: 2,
    borderColor: "#E9FCFF"
  },
  icicleShine: {
    position: "absolute",
    left: 3,
    top: 4,
    width: 3,
    height: 18,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    opacity: 0.8
  },
  icicle1: {
    left: "12%",
    height: 27
  },
  icicle2: {
    left: "35%",
    height: 39
  },
  icicle3: {
    left: "57%",
    height: 24
  },
  icicle4: {
    left: "76%",
    height: 34
  },
  icicle5: {
    right: "5%",
    height: 22
  },
  meltingDrop: {
    position: "absolute",
    top: 83,
    width: 7,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#55C9ED",
    borderWidth: 1,
    borderColor: "#FFFFFF"
  },
  drop1: {
    left: "35%"
  },
  drop2: {
    left: "57%"
  },
  drop3: {
    left: "76%"
  },
  bottomFrame: {
    height: 112,
    backgroundColor: "#BDEFFF",
    borderTopWidth: 3,
    borderTopColor: "#FFFFFF",
    overflow: "hidden"
  },
  bottomSnowBase: {
    position: "absolute",
    left: -20,
    right: -20,
    bottom: -32,
    height: 100,
    borderRadius: 55,
    backgroundColor: "#FFFFFF"
  },
  puffBottom1: {
    width: 100,
    height: 42,
    top: 4,
    left: -25
  },
  puffBottom2: {
    width: 120,
    height: 45,
    top: 0,
    left: "25%"
  },
  puffBottom3: {
    width: 95,
    height: 40,
    top: 5,
    left: "60%"
  },
  puffBottom4: {
    width: 110,
    height: 45,
    top: 0,
    right: -25
  },
  iceCube: {
    position: "absolute",
    width: 29,
    height: 29,
    borderRadius: 8,
    backgroundColor: "#83D9F4",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#168FCB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3
  },
  cubeHighlight: {
    position: "absolute",
    left: 4,
    top: 4,
    width: 9,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    opacity: 0.9
  },
  cubeReflection: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 7,
    height: 7,
    borderRadius: 3,
    backgroundColor: "#C9F5FF"
  },
  topCube1: {
    top: 64,
    left: "5%"
  },
  topCube2: {
    top: 65,
    right: "7%",
    width: 23,
    height: 23
  },
  bottomCube1: {
    top: 42,
    left: "16%"
  },
  bottomCube2: {
    top: 42,
    right: "15%",
    width: 24,
    height: 24
  },
  iceCrystal: {
    position: "absolute",
    right: "42%",
    top: 30,
    width: 17,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#79D5F2",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "25deg" }]
  },
  iceCrystalSmall: {
    position: "absolute",
    right: "39%",
    top: 47,
    width: 12,
    height: 24,
    borderRadius: 7,
    backgroundColor: "#A2E9FA",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "-20deg" }]
  },
  snowDot: {
    position: "absolute",
    top: 0,
    borderRadius: 50,
    backgroundColor: "#FFFFFF"
  },
  snowfall: {
    ...StyleSheet.absoluteFillObject
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
