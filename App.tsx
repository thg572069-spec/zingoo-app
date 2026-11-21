
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
type OpeningStage = "splash" | "welcome" | "finished";

const SPLASH_VIDEO = require(
  "./assets/videos/1795239482359.mp4"
);

const WELCOME_VIDEO = require(
  "./assets/videos/1795239322930.mp4"
);

const SPLASH_VIDEO_URL =
  "https://raw.githubusercontent.com/thg572069-spec/zingoo-app/main/assets/videos/1795239482359.mp4";

const WELCOME_VIDEO_URL =
  "https://raw.githubusercontent.com/thg572069-spec/zingoo-app/main/assets/videos/1795239322930.mp4";

// Transição das telas internas

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

// Vídeo para navegador

function WebVideo({
  source,
  onReady,
  onFinish,
  loop,
  fit
}: {
  source: string;
  onReady: () => void;
  onFinish: () => void;
  loop: boolean;
  fit: "cover" | "contain";
}) {
  const [ready, setReady] = useState(false);

  return React.createElement("video" as any, {
    src: source,
    autoPlay: true,
    muted: false,
    loop,
    playsInline: true,
    controls: false,
    preload: "auto",
    disablePictureInPicture: true,

    onCanPlay: (event: any) => {
      setReady(true);
      onReady();

      const playback = event.currentTarget.play();

      if (playback && playback.catch) {
        playback.catch(() => {});
      }
    },

    onClick: (event: any) => {
      const playback = event.currentTarget.play();

      if (playback && playback.catch) {
        playback.catch(() => {});
      }
    },

    onPlay: () => {
      setReady(true);
      onReady();
    },

    onEnded: () => {
      if (!loop) onFinish();
    },

    onError: () => {
      if (!loop) onFinish();
    },

    style: {
      width: "100%",
      height: "100%",
      objectFit: fit,
      backgroundColor: "#0D6ED2",
      display: "block",
      border: 0,
      outline: "none",
      opacity: ready ? 1 : 0
    }
  });
}

// Vídeo nativo para iOS e Android

function NativeVideo({
  source,
  onReady,
  onFinish,
  loop,
  fit
}: {
  source: any;
  onReady: () => void;
  onFinish: () => void;
  loop: boolean;
  fit: "cover" | "contain";
}) {
  const [hasFrame, setHasFrame] = useState(false);

  const player = useVideoPlayer(source, (videoPlayer) => {
    videoPlayer.loop = loop;
    videoPlayer.muted = false;
  });

  useEffect(() => {
    const statusSubscription = player.addListener(
      "statusChange",
      ({ status }) => {
        if (status === "readyToPlay") {
          player.play();
        }

        if (status === "error" && !loop) {
          onFinish();
        }
      }
    );

    const endSubscription = player.addListener(
      "playToEnd",
      () => {
        if (!loop) onFinish();
      }
    );

    if (player.status === "readyToPlay") {
      player.play();
    }

    if (player.status === "error" && !loop) {
      onFinish();
    }

    return () => {
      statusSubscription.remove();
      endSubscription.remove();
    };
  }, [player, onFinish, loop]);

  return (
    <VideoView
      style={[
        styles.video,
        { opacity: hasFrame ? 1 : 0 }
      ]}
      player={player}
      contentFit={fit}
      nativeControls={false}
      allowsPictureInPicture={false}
      onFirstFrameRender={() => {
        setHasFrame(true);
        onReady();
      }}
    />
  );
}

// Escolhe a reprodução conforme a plataforma

function OpeningVideo({
  stage,
  onReady,
  onFinish
}: {
  stage: "splash" | "welcome";
  onReady: () => void;
  onFinish: () => void;
}) {
  const isWelcome = stage === "welcome";

  const nativeSource = isWelcome
    ? WELCOME_VIDEO
    : SPLASH_VIDEO;

  const webSource = isWelcome
    ? WELCOME_VIDEO_URL
    : SPLASH_VIDEO_URL;

  const loop = isWelcome;
  const fit = isWelcome ? "contain" : "contain";

  if (Platform.OS === "web") {
    return (
      <WebVideo
        source={webSource}
        onReady={onReady}
        onFinish={onFinish}
        loop={loop}
        fit={fit}
      />
    );
  }

  return (
    <NativeVideo
      source={nativeSource}
      onReady={onReady}
      onFinish={onFinish}
      loop={loop}
      fit={fit}
    />
  );
}

export default function App() {
  const [stage, setStage] = useState<OpeningStage>("splash");

  const [screen, setScreen] = useState<Screen>("welcome");

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const [videoReady, setVideoReady] = useState(false);

  const [reduceMotion, setReduceMotion] = useState(false);

  const splashOpacity = useRef(new Animated.Value(0)).current;
  const splashScale = useRef(new Animated.Value(0.96)).current;

  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeScale = useRef(new Animated.Value(0.96)).current;

  const splashFinished = useRef(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion
    );

    return () => subscription.remove();
  }, []);

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);

    const opacity = stage === "splash"
      ? splashOpacity
      : welcomeOpacity;

    const scale = stage === "splash"
      ? splashScale
      : welcomeScale;

    if (reduceMotion) {
      opacity.setValue(1);
      scale.setValue(1);
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      })
    ]).start();
  }, [
    stage,
    reduceMotion,
    splashOpacity,
    splashScale,
    welcomeOpacity,
    welcomeScale
  ]);

  const handleSplashFinish = useCallback(() => {
    if (splashFinished.current) return;

    splashFinished.current = true;
    setVideoReady(false);

    if (reduceMotion) {
      setStage("welcome");
      return;
    }

    Animated.parallel([
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 450,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false
      }),
      Animated.timing(splashScale, {
        toValue: 1.2,
        duration: 550,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false
      })
    ]).start(() => {
      setStage("welcome");
    });
  }, [reduceMotion, splashOpacity, splashScale]);

  function openInternalScreen(nextScreen: Screen) {
    setScreen(nextScreen);
    setStage("finished");
  }

  function backToWelcome() {
    setScreen("welcome");
    setVideoReady(false);

    welcomeOpacity.setValue(0);
    welcomeScale.setValue(0.96);

    setStage("welcome");
  }

  function handleLanguageContinue(language: Language) {
    setSelectedLanguage(language);
  }

  const currentOpacity =
    stage === "splash" ? splashOpacity : welcomeOpacity;

  const currentScale =
    stage === "splash" ? splashScale : welcomeScale;

  return (
    <View style={styles.app}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0D6ED2"
      />

      {stage !== "finished" && (
        <View style={styles.opening}>
          <Animated.View
            style={[
              styles.videoLayer,
              {
                opacity: currentOpacity,
                transform: [
                  {
                    scale: currentScale
                  }
                ]
              }
            ]}
          >
            <OpeningVideo
              key={stage}
              stage={stage === "splash" ? "splash" : "welcome"}
              onReady={handleVideoReady}
              onFinish={
                stage === "splash"
                  ? handleSplashFinish
                  : () => {}
              }
            />
          </Animated.View>

          {stage === "welcome" && videoReady && (
            <View style={styles.welcomeButtons}>
              <WelcomeScreen
                onStart={() => openInternalScreen("zuzu")}
                onLogin={() => openInternalScreen("login")}
              />
            </View>
          )}
        </View>
      )}

      {stage === "finished" && (
        <View style={styles.screenContainer}>
          <ScreenTransition key={screen}>
            {screen === "zuzu" && (
              <ZuzuIntroScreen
                onContinue={() => openInternalScreen("language")}
                onBack={backToWelcome}
              />
            )}

            {screen === "login" && (
              <LoginScreen
                onBack={backToWelcome}
              />
            )}

            {screen === "language" && (
              <LanguageScreen
                initialLanguage={selectedLanguage}
                onContinue={handleLanguageContinue}
                onBack={() => openInternalScreen("zuzu")}
              />
            )}
          </ScreenTransition>
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
    overflow: "hidden"
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

  welcomeButtons: {
    ...StyleSheet.absoluteFillObject
  },

  screenContainer: {
    flex: 1
  },

  transition: {
    flex: 1
  }
});
