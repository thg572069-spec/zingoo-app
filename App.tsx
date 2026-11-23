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
import { BlurView } from "expo-blur";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ZuzuIntroScreen from "./src/screens/ZuzuIntroScreen";
import BenefitsScreen from "./src/screens/BenefitsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LanguageScreen, {
  Language
} from "./src/screens/LanguageScreen";
import CuriosityScreen from "./src/screens/CuriosityScreen";
import ReferralSourceScreen, {
  ReferralSource
} from "./src/screens/ReferralSourceScreen";
import LanguageLevelScreen, {
  LanguageLevel
} from "./src/screens/LanguageLevelScreen";
import PersonalizedWelcomeScreen from "./src/screens/PersonalizedWelcomeScreen";

type Screen =
  | "welcome"
  | "zuzu"
  | "benefits"
  | "login"
  | "language"
  | "curiosity"
  | "referral"
  | "level"
  | "personalized"
  | "next";

type OpeningStage = "splash" | "welcome" | "finished";

const SPLASH_VIDEO = require(
  "./assets/videos/1795239482359.mp4"
);

const WELCOME_VIDEO = require(
  "./assets/videos/1795376843324.mp4"
);

const SPLASH_VIDEO_URL =
  "https://raw.githubusercontent.com/thg572069-spec/zingoo-app/main/assets/videos/1795239482359.mp4";

const WELCOME_VIDEO_URL =
  "https://raw.githubusercontent.com/thg572069-spec/zingoo-app/main/assets/videos/1795376843324.mp4";

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

// Vídeo de abertura para navegador

function WebVideo({
  source,
  onReady,
  onFinish
}: {
  source: string;
  onReady: () => void;
  onFinish: () => void;
}) {
  const [ready, setReady] = useState(false);

  return React.createElement("video" as any, {
    src: source,
    autoPlay: true,
    muted: false,
    loop: false,
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

    onEnded: onFinish,
    onError: onFinish,

    style: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      backgroundColor: "#0D6ED2",
      display: "block",
      border: 0,
      outline: "none",
      opacity: ready ? 1 : 0
    }
  });
}

// Boas-vindas com fundo ampliado e desfocado no navegador

function WebWelcomeVideo({
  source,
  onReady
}: {
  source: string;
  onReady: () => void;
}) {
  const backgroundRef = useRef<any>(null);
  const foregroundRef = useRef<any>(null);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [foregroundReady, setForegroundReady] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!backgroundReady || !foregroundReady || started.current) return;

    const background = backgroundRef.current;
    const foreground = foregroundRef.current;

    if (!background || !foreground) return;

    started.current = true;
    background.currentTime = foreground.currentTime;

    const backgroundPlayback = background.play();
    const foregroundPlayback = foreground.play();

    if (backgroundPlayback?.catch) {
      backgroundPlayback.catch(() => {});
    }

    if (foregroundPlayback?.catch) {
      foregroundPlayback.catch(() => {});
    }

    onReady();
  }, [backgroundReady, foregroundReady, onReady]);

  return (
    <View style={styles.videoComposition}>
      <View style={styles.backgroundVideo}>
        {React.createElement("video" as any, {
          ref: backgroundRef,
          src: source,
          autoPlay: false,
          muted: true,
          loop: true,
          playsInline: true,
          controls: false,
          preload: "auto",
          onCanPlay: () => setBackgroundReady(true),
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(24px)",
            transform: "scale(1.12)",
            opacity: backgroundReady ? 1 : 0
          }
        })}
      </View>

      <View style={styles.foregroundVideo}>
        {React.createElement("video" as any, {
          ref: foregroundRef,
          src: source,
          autoPlay: false,
          muted: false,
          loop: true,
          playsInline: true,
          controls: false,
          preload: "auto",
          onCanPlay: () => setForegroundReady(true),
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: foregroundReady ? 1 : 0
          }
        })}
      </View>
    </View>
  );
}

// Vídeo nativo para iOS e Android

function NativeVideo({
  source,
  onReady,
  onFinish
}: {
  source: any;
  onReady: () => void;
  onFinish: () => void;
}) {
  const [hasFrame, setHasFrame] = useState(false);

  const player = useVideoPlayer(source, (videoPlayer) => {
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

// Boas-vindas com dois vídeos sincronizados no iOS e Android

function NativeWelcomeVideo({
  source,
  onReady
}: {
  source: any;
  onReady: () => void;
}) {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [foregroundReady, setForegroundReady] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);

  const started = useRef(false);
  const readyCallback = useRef(false);

  const backgroundPlayer = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.muted = true;
  });

  const foregroundPlayer = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.muted = false;
  });

  useEffect(() => {
    const backgroundSubscription = backgroundPlayer.addListener(
      "statusChange",
      ({ status }) => {
        if (status === "readyToPlay") {
          setBackgroundReady(true);
        }
      }
    );

    const foregroundSubscription = foregroundPlayer.addListener(
      "statusChange",
      ({ status }) => {
        if (status === "readyToPlay") {
          setForegroundReady(true);
        }
      }
    );

    if (backgroundPlayer.status === "readyToPlay") {
      setBackgroundReady(true);
    }

    if (foregroundPlayer.status === "readyToPlay") {
      setForegroundReady(true);
    }

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, [backgroundPlayer, foregroundPlayer]);

  useEffect(() => {
    if (!backgroundReady || !foregroundReady || started.current) return;

    started.current = true;

    backgroundPlayer.currentTime = foregroundPlayer.currentTime;

    backgroundPlayer.play();
    foregroundPlayer.play();
  }, [
    backgroundReady,
    foregroundReady,
    backgroundPlayer,
    foregroundPlayer
  ]);

  const handleFirstFrame = useCallback(() => {
    setHasFrame(true);

    if (!readyCallback.current) {
      readyCallback.current = true;
      onReady();
    }
  }, [onReady]);

  return (
    <View style={styles.videoComposition}>
      <VideoView
        style={styles.backgroundVideo}
        player={backgroundPlayer}
        contentFit="cover"
        nativeControls={false}
        allowsPictureInPicture={false}
      />

      <BlurView
        intensity={35}
        tint="dark"
        style={styles.blurLayer}
      />

      <VideoView
        style={[
          styles.foregroundVideo,
          { opacity: hasFrame ? 1 : 0 }
        ]}
        player={foregroundPlayer}
        contentFit="cover"
        nativeControls={false}
        allowsPictureInPicture={false}
        onFirstFrameRender={handleFirstFrame}
      />
    </View>
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

  if (isWelcome) {
    if (Platform.OS === "web") {
      return (
        <WebWelcomeVideo
          source={WELCOME_VIDEO_URL}
          onReady={onReady}
        />
      );
    }

    return (
      <NativeWelcomeVideo
        source={WELCOME_VIDEO}
        onReady={onReady}
      />
    );
  }

  if (Platform.OS === "web") {
    return (
      <WebVideo
        source={SPLASH_VIDEO_URL}
        onReady={onReady}
        onFinish={onFinish}
      />
    );
  }

  return (
    <NativeVideo
      source={SPLASH_VIDEO}
      onReady={onReady}
      onFinish={onFinish}
    />
  );
}

export default function App() {
  const [stage, setStage] = useState<OpeningStage>("splash");

  const [screen, setScreen] = useState<Screen>("welcome");

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const [selectedReferralSource, setSelectedReferralSource] =
    useState<ReferralSource | null>(null);

  const [selectedLevel, setSelectedLevel] =
    useState<LanguageLevel | null>(null);

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
    openInternalScreen("curiosity");
  }

  function handleReferralContinue(source: ReferralSource) {
    setSelectedReferralSource(source);
    openInternalScreen("level");
  }

  function handleLevelContinue(level: LanguageLevel) {
    setSelectedLevel(level);
    openInternalScreen("personalized");
  }

  function handlePersonalizedContinue() {
    openInternalScreen("next");
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
                onContinue={() => openInternalScreen("benefits")}
                onBack={backToWelcome}
              />
            )}

            {screen === "benefits" && (
              <BenefitsScreen
                onContinue={() => openInternalScreen("language")}
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
                onBack={() => openInternalScreen("benefits")}
              />
            )}

            {screen === "curiosity" && selectedLanguage && (
              <CuriosityScreen
                language={selectedLanguage}
                onContinue={() => openInternalScreen("referral")}
              />
            )}

            {screen === "referral" && (
              <ReferralSourceScreen
                initialSource={selectedReferralSource}
                onContinue={handleReferralContinue}
                onBack={() => openInternalScreen("language")}
              />
            )}

            {screen === "level" && (
              <LanguageLevelScreen
                initialLevel={selectedLevel}
                onContinue={handleLevelContinue}
                onBack={() => openInternalScreen("referral")}
              />
            )}

            {screen === "personalized" && selectedLevel && (
              <PersonalizedWelcomeScreen
                level={selectedLevel}
                onContinue={handlePersonalizedContinue}
              />
            )}

            {screen === "next" && (
              <View style={styles.emptyNextScreen} />
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

  videoComposition: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    backgroundColor: "#0D6ED2",
    alignItems: "center",
    justifyContent: "center"
  },

  backgroundVideo: {
    ...StyleSheet.absoluteFillObject
  },

  blurLayer: {
    ...StyleSheet.absoluteFillObject
  },

  foregroundVideo: {
    ...StyleSheet.absoluteFillObject
  },

  welcomeButtons: {
    ...StyleSheet.absoluteFillObject
  },

  screenContainer: {
    flex: 1
  },

  transition: {
    flex: 1
  },

  emptyNextScreen: {
    flex: 1,
    backgroundColor: "#DDF3FF"
  }
});
