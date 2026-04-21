import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, PanResponder, Animated } from "react-native";

export default function CustomSlider({
  min = 0,
  max = 10,
  step = 1,
  value = 0,
  onChange,
}) {
  const trackWidth = useRef(0);
  const thumbPosition = useRef(0);      // tracks current X in pixels
  const dragStartPosition = useRef(0);  // X at the moment finger touches down
  const pan = useRef(new Animated.Value(0)).current;

  const [currentValue, setCurrentValue] = useState(value);

  const THUMB_SIZE = 40;
  const THUMB_OFFSET = THUMB_SIZE / 2; // center thumb on track

  const valueToPosition = (val) => {
    if (trackWidth.current === 0) return 0;
    return ((val - min) / (max - min)) * trackWidth.current;
  };

  const positionToValue = (pos) => {
    let val = (pos / trackWidth.current) * (max - min) + min;
    val = Math.round(val / step) * step;
    return Math.min(max, Math.max(min, val));
  };

  // Sync external value changes
  useEffect(() => {
    const pos = valueToPosition(value);
    thumbPosition.current = pos;
    pan.setValue(pos);
    setCurrentValue(value);
  }, [value]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        // Save where the thumb was when the finger touched down
        dragStartPosition.current = thumbPosition.current;
      },

      onPanResponderMove: (_, gesture) => {
        // New position = where we started + how far finger moved
        let newPos = dragStartPosition.current + gesture.dx;
        newPos = Math.max(0, Math.min(newPos, trackWidth.current)); // clamp

        thumbPosition.current = newPos;
        pan.setValue(newPos);

        const val = positionToValue(newPos);
        setCurrentValue(val);
        onChange && onChange(val);
      },

      onPanResponderRelease: () => {
        // thumbPosition.current already holds the final clamped value — nothing to do
      },
    })
  ).current;

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        trackWidth.current = e.nativeEvent.layout.width;
        const pos = valueToPosition(currentValue);
        thumbPosition.current = pos;
        pan.setValue(pos);
      }}
    >
      {/* Background Track */}
      <View style={styles.track} />

      {/* Active (filled) Track */}
      <Animated.View
        style={[
          styles.activeTrack,
          { width: pan },
        ]}
      />

      {/* Thumb */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            transform: [{ translateX: Animated.subtract(pan, THUMB_OFFSET) }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
  },
  track: {
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    position: "absolute",
    width: "100%",
  },
  activeTrack: {
    height: 4,
    backgroundColor: "#4A90D9",
    borderRadius: 2,
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#4A90D9",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});