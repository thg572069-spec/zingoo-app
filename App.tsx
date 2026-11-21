
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ZuzuIntroScreen from "./src/screens/ZuzuIntroScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LanguageScreen, {
  Language
} from "./src/screens/LanguageScreen";

type Screen = "welcome" | "zuzu" | "login" | "language";
type OpeningStage = "loading" | "video" | "finished";

const VIDEO_SOURCE = require(
  "./assets/videos/64d5a1c3-28f8-44ae-8f95-6eb8117c3e18.mp4"
);

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  const [openingStage, setOpeningStage] =
    useState<OpeningStage>("loading");

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
          setOpeningStage("finished");
        }
      }
    );

    const endSubscription = player.addListener(
      "playToEnd",
      () => {
        setOpeningStage("finished");
      }
    );

    return () => {
      statusSubscription.remove();
      endSubscription.remove();
    };
  }, [player]);

  function handleLanguageContinue(language: Language) {
    setSelectedLanguage(language);
  }

  return (
    <View style={styles.app}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0D6ED2"
      />

      {openingStage !== "finished" && (
        <View style={styles.opening}>
          <VideoView
            style={[
              styles.video,
              {
                opacity: openingStage === "video" ? 1 : 0
              }
            ]}
            player={player}
            contentFit="contain"
            nativeControls={false}
            allowsPictureInPicture={false}
            onFirstFrameRender={() => {
              setOpeningStage("video");
            }}
          />
        </View>
      )}

      {openingStage === "finished" && (
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
