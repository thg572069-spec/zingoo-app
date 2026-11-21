
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import {
  AccessibilityInfo,
  Animated,
  Easing,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

import { VideoView, useVideoPlayer } from "expo-video";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ZuzuIntroScreen from "./src/screens/ZuzuIntroScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LanguageScreen, {
  Language
} from "./src/screens/LanguageScreen";

type Screen = "welcome" | "zuzu" | "login" | "language";

const VIDEO_SOURCE = require(
  "./assets/videos/64d5a1c3-28f8-44ae-8f95-6eb8117c3e18.mp4"
);

const WEB_VIDEO_URL =
  "https://raw.githubusercontent.com/thg572069-spec/zingoo-app/main/assets/videos/64d5a1c3-28f8-44ae-8f95-6eb8117c3e18.mp4";

// Transição expansiva das telas

function ScreenTransition({
  children
}: {
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;

  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (reduceMotion === null) return;

    if (reduceMotion) {
      opacity.setValue(1);
      scale.setValue(1);
      return;
    }

    opacity.setValue(0);
    scale.setValue(0.96);

    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      })
    ]);

    animation.start();

    return () => animation.stop();
  }, [reduceMotion, opacity, scale]);

  return (
    <Animated.View
      style={[
        styles.transition,
        {
          opacity,
          transform: [{ scale }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}

// Vídeo de abertura para navegador

function WebOpeningVideo({
  onReady,
  onFinish
}: {
  onReady: () => void;
  onFinish: () => void;
}) {
  const [ready, setReady] = useState(false);

  return React.createElement("video" as any, {
    src: WEB_VIDEO_URL,
    autoPlay: true,
    muted: true,
    playsInline: true,
    controls: false,
    preload: "auto",
    disablePictureInPicture: true,

    onCanPlay: (event: any) => {
      setReady(true);
      onReady();

      const playback = event.currentTarget.play();

      if (playback && playback.catch) {
        playback.catch(() => onFinish());
      }
    },

    onPlay: () => {
      setReady(true);
      onReady();
    },

    onEnded: onFinish,
    onError: onFinish,

    style: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      backgroundColor: "#0D6ED2",
      display: "block",
      opacity: ready ? 1 : 0
    }
  });
}

// Vídeo de abertura para iOS e Android

function NativeOpeningVideo({
  onReady,
  onFinish
}: {
  onReady: () => void;
  onFinish: () => void;
}) {
  const [hasFrame, setHasFrame] = useState(false);

  const player = useVideoPlayer(VIDEO_SOURCE, (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.muted = false;
  });

  useEffect(() => {
    const statusSubscription = player.addListener(
      "statusChange",
      ({ status }) => {
        if (status === "readyToPlay") {
          player.play();
        }

        if (status === "error") {
          onFinish();
        }
      }
    );

    const endSubscription = player.addListener(
      "playToEnd",
      onFinish
    );

    if (player.status === "readyToPlay") {
      player.play();
    }

    if (player.status === "error") {
      onFinish();
    }

    return () => {
      statusSubscription.remove();
      endSubscription.remove();
    };
  }, [player, onFinish]);

  return (
    <VideoView
      style={[
        styles.video,
        { opacity: hasFrame ? 1 : 0 }
      ]}
      player={player}
      contentFit="contain"
      nativeControls={false}
      allowsPictureInPicture={false}
      onFirstFrameRender={() => {
        setHasFrame(true);
        onReady();
      }}
    />
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const [showOpening, setShowOpening] = useState(true);

  const openingFinished = useRef(false);
  const videoStarted = useRef(false);

  const openingOpacity = useRef(new Animated.Value(0)).current;
  const openingScale = useRef(new Animated.Value(0.96)).current;

  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeScale = useRef(new Animated.Value(0.96)).current;

  const handleVideoReady = useCallback(() => {
    if (videoStarted.current) return;

    videoStarted.current = true;

    Animated.parallel([
      Animated.timing(openingOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      }),
      Animated.timing(openingScale, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      })
    ]).start();
  }, [openingOpacity, openingScale]);

  const finishOpening = useCallback(() => {
    if (openingFinished.current) return;

    openingFinished.current = true;

    Animated.parallel([
      Animated.timing(openingOpacity, {
        toValue: 0,
        duration: 450,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false
      }),
      Animated.timing(openingScale, {
        toValue: 1.22,
        duration: 550,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false
      }),
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      }),
      Animated.timing(welcomeScale, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      })
    ]).start(() => {
      setShowOpening(false);
    });
  }, [
    openingOpacity,
    openingScale,
    welcomeOpacity,
    welcomeScale
  ]);

  function handleLanguageContinue(language: Language) {
    setSelectedLanguage(language);
  }

  return (
    <View style={styles.app}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0D6ED2"
      />

      {!showOpening && (
        <View style={styles.screenContainer}>
          <ScreenTransition key={screen}>
            {screen === "welcome" && (
              <WelcomeScreen
                onStart={() => setScreen("zuzu")}
                onLogin={() => setScreen("login")}
              />
            )}

            {screen === "zuzu" && (
              <ZuzuIntroScreen
                onContinue={() => setScreen("language")}
                onBack={() => setScreen("welcome")}
              />
            )}

            {screen === "login" && (
              <LoginScreen
                onBack={() => setScreen("welcome")}
              />
            )}

            {screen === "language" && (
              <LanguageScreen
                initialLanguage={selectedLanguage}
                onContinue={handleLanguageContinue}
                onBack={() => setScreen("zuzu")}
              />
            )}
          </ScreenTransition>
        </View>
      )}

      {showOpening && (
        <View style={styles.opening}>
          <Animated.View
            style={[
              styles.welcomeReveal,
              {
                opacity: welcomeOpacity,
                transform: [{ scale: welcomeScale }]
              }
            ]}
          >
            <WelcomeScreen
              onStart={() => setScreen("zuzu")}
              onLogin={() => setScreen("login")}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.videoLayer,
              {
                opacity: openingOpacity,
                transform: [{ scale: openingScale }]
              }
            ]}
          >
            {Platform.OS === "web" ? (
              <WebOpeningVideo
                onReady={handleVideoReady}
                onFinish={finishOpening}
              />
            ) : (
              <NativeOpeningVideo
                onReady={handleVideoReady}
                onFinish={finishOpening}
              />
            )}
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#0D6ED2"
  },

  opening: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0D6ED2",
    alignItems: "center",
    justifyContent: "center"
  },

  welcomeReveal: {
    ...StyleSheet.absoluteFillObject
  },

  videoLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D6ED2"
  },

  video: {
    width: "100%",
    height: "100%"
  },

  screenContainer: {
    flex: 1
  },

  transition: {
    flex: 1
  }
});
