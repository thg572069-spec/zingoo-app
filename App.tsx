
import React, { useState } from "react";
import { StatusBar } from "react-native";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ZuzuIntroScreen from "./src/screens/ZuzuIntroScreen";
import LoginScreen from "./src/screens/LoginScreen";

type Screen = "welcome" | "zuzu" | "login";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

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
          onContinue={() => {
            // A próxima etapa será a escolha do idioma.
            setScreen("welcome");
          }}
          onBack={() => setScreen("welcome")}
        />
      )}

      {screen === "login" && (
        <LoginScreen
          onBack={() => setScreen("welcome")}
        />
      )}
    </>
  );
}
