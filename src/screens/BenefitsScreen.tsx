
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

type Props = {
  onContinue: () => void;
};

const BACKGROUND_IMAGE = require(
  "../../assets/videos/IMG_0763.jpg"
);

const roundedFont = Platform.select({
  ios: "AvenirNext-DemiBold",
  android: "sans-serif-rounded",
  default: "system-ui"
});

function Benefit({
  symbol,
  symbolColor,
  title,
  description,
  delay
}: {
  symbol: string;
  symbolColor: string;
  title: string;
  description: string;
  delay: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true
        }),
        Animated.spring(translateY, {
          toValue: 0,
          speed: 15,
          bounciness: 4,
          useNativeDriver: true
        })
      ])
    ]);

    animation.start();
    return () => animation.stop();
  }, [delay, opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.benefitCard,
        {
          opacity,
          transform: [{ translateY }]
        }
      ]}
    >
      <View style={[styles.symbolCircle, { backgroundColor: symbolColor }]}>
        <Text style={styles.symbolText}>{symbol}</Text>
      </View>

      <View style={styles.benefitCopy}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDescription}>{description}</Text>
      </View>
    </Animated.View>
  );
}

export default function BenefitsScreen({ onContinue }: Props) {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(12)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(titleTranslate, {
        toValue: 0,
        speed: 14,
        bounciness: 3,
        useNativeDriver: true
      }),
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 500,
        delay: 950,
        useNativeDriver: true
      })
    ]).start();

    const transition = setTimeout(onContinue, 5000);
    return () => clearTimeout(transition);
  }, [onContinue, titleOpacity, titleTranslate, footerOpacity]);

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.tint} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.heading,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslate }]
              }
            ]}
          >
            <Text style={styles.eyebrow}>SEU MUNDO, NOVAS POSSIBILIDADES</Text>

            <Text style={styles.title}>
              Na ZINGOO, você
              {"\n"}
              <Text style={styles.titleBlue}>aprende</Text>
              {", "}
              <Text style={styles.titleYellow}>ganha</Text>
              {" e"}
              {"\n"}
              <Text style={styles.titlePink}>se diverte!</Text>
            </Text>

            <Text style={styles.subtitle}>
              Muito mais do que aprender um idioma.
            </Text>
          </Animated.View>

          <View style={styles.benefits}>
            <Benefit
              symbol="A"
              symbolColor="#54C7E8"
              title="Aprenda novos idiomas"
              description="Explore inglês, espanhol, francês e mandarim."
              delay={250}
            />

            <Benefit
              symbol="ZC"
              symbolColor="#FFC64A"
              title="Aprenda e ganhe"
              description="Conquiste ZINGOO Coins enquanto aprende."
              delay={500}
            />

            <Benefit
              symbol="Z"
              symbolColor="#F28CB8"
              title="Faça parte da família ZINGOO"
              description="Uma comunidade feita para aprender e se divertir."
              delay={750}
            />
          </View>

          <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
            <Text style={styles.footerText}>
              A diversão é{" "}
              <Text style={styles.footerHighlight}>garantida!</Text>
            </Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#DDF3FF"
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(241, 250, 255, 0.18)"
  },
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 23,
    paddingVertical: 18
  },
  heading: {
    alignItems: "center",
    marginBottom: 25
  },
  eyebrow: {
    color: "#347DA8",
    fontFamily: roundedFont,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 13,
    textAlign: "center"
  },
  title: {
    color: "#204C79",
    fontFamily: roundedFont,
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 39,
    letterSpacing: -0.7,
    textAlign: "center",
    textShadowColor: "rgba(255,255,255,0.65)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8
  },
  titleBlue: {
    color: "#168FCB"
  },
  titleYellow: {
    color: "#E9A91D"
  },
  titlePink: {
    color: "#E66E9F"
  },
  subtitle: {
    color: "#52718B",
    fontFamily: roundedFont,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center"
  },
  benefits: {
    gap: 12
  },
  benefitCard: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.91)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    borderRadius: 21,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: "#39749C",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3
  },
  symbolCircle: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13
  },
  symbolText: {
    color: "#FFFFFF",
    fontFamily: roundedFont,
    fontSize: 17,
    fontWeight: "900"
  },
  benefitCopy: {
    flex: 1
  },
  benefitTitle: {
    color: "#204C79",
    fontFamily: roundedFont,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: -0.2
  },
  benefitDescription: {
    color: "#607D94",
    fontFamily: roundedFont,
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 16,
    marginTop: 4
  },
  footer: {
    alignItems: "center",
    marginTop: 25
  },
  footerText: {
    color: "#204C79",
    fontFamily: roundedFont,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center"
  },
  footerHighlight: {
    color: "#E66E9F"
  },
  progressTrack: {
    width: 88,
    height: 4,
    borderRadius: 4,
    backgroundColor: "rgba(36,91,130,0.16)",
    overflow: "hidden",
    marginTop: 13
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#168FCB",
    borderRadius: 4
  }
});
