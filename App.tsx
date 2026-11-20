
import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ZuzuIntroScreen from "./src/screens/ZuzuIntroScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LanguageScreen, {
  Language
} from "./src/screens/LanguageScreen";

type Screen = "welcome" | "zuzu" | "login" | "language";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  function handleLanguageContinue(language: Language) {
    setSelectedLanguage(language);

    Alert.alert(
      "Ótima escolha!",
      `Seu primeiro idioma será ${language}. Na próxima etapa, vamos personalizar sua experiência.`
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

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
  );
}
