import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";

const BANNERS = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
];

const { width } = Dimensions.get("window");

const BannerCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "next" | "prev" | null
  >(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate next image sliding over current
  const animateToNext = (nextIdx: number) => {
    setIsAnimating(true);
    setAnimationDirection("next");
    translateX.setValue(width);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      setIndex(nextIdx);
      setIsAnimating(false);
      setAnimationDirection(null);
    });
  };

  // Animate to previous image
  const animateToPrev = (prevIdx: number) => {
    setIsAnimating(true);
    setAnimationDirection("prev");
    translateX.setValue(-width);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      setIndex(prevIdx);
      setIsAnimating(false);
      setAnimationDirection(null);
    });
  };

  // Auto-advance every 3s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isAnimating) {
        const next = (index + 1) % BANNERS.length;
        animateToNext(next);
      }
    }, 3000);
    return () => clearInterval(timerRef?.current);
  }, [index, isAnimating]);

  // PanResponder for swipe
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 20,
    onPanResponderRelease: (_, gestureState) => {
      if (isAnimating) return;
      if (gestureState.dx < -50) {
        // swipe left
        const next = (index + 1) % BANNERS.length;
        animateToNext(next);
      } else if (gestureState.dx > 50) {
        // swipe right
        const prev = (index - 1 + BANNERS.length) % BANNERS.length;
        animateToPrev(prev);
      }
    },
  });

  // Render two images: current and next/prev, with next/prev sliding over current
  const nextIdx = (index + 1) % BANNERS.length;
  const prevIdx = (index - 1 + BANNERS.length) % BANNERS.length;
  const showIdx = isAnimating
    ? animationDirection === "next"
      ? nextIdx
      : prevIdx
    : index;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Image
        source={{ uri: BANNERS[index] }}
        style={[styles.image, StyleSheet.absoluteFill]}
        resizeMode="cover"
      />
      {isAnimating && (
        <Animated.Image
          source={{ uri: BANNERS[showIdx] }}
          style={[
            styles.image,
            StyleSheet.absoluteFill,
            { transform: [{ translateX }] },
          ]}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default BannerCarousel;
