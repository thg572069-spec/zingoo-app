
import React, { useCallback, useEffect, useState } from "react";
import {
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

type OpeningVideoProps = {
  onFinish: () => void;
};

function WebOpeningVideo({ onFinish }: OpeningVideoProps) {
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

      const playback = event.currentTarget.play();

      if (playback && playback.catch) {
        playback.catch(() => onFinish());
      }
    },
    onPlay: () => setReady(true),
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

function NativeOpeningVideo({ onFinish }: OpeningVideoProps) {
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
      onFirstFrameRender={() => setHasFrame(true)}
    />
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const [showOpening, setShowOpening] = useState(true);

  const finishOpening = useCallback(() => {
    setShowOpening(false);
  }, []);

  function handleLanguageContinue(language: Language) {
    setSelectedLanguage(language);
  }

  return (
    <View style={styles.app}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0D6ED2"
      />

      {showOpening ? (
        <View style={styles.opening}>
          {Platform.OS === "web" ? (
            <WebOpeningVideo onFinish={finishOpening} />
          ) : (
            <NativeOpeningVideo onFinish={finishOpening} />
          )}
        </View>
      ) : (
        <>
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
        </>
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
  video: {
    width: "100%",
    height: "100%"
  }
});
