import { useMemo } from "react";
import Animated, {
  SlideOutRight,
  SlideOutDown,
  FadeInLeft,
  FadeInUp,
  FadeOut,
  FadeIn,
} from "react-native-reanimated";
import {
  type TouchableOpacityProps,
  TouchableOpacity,
  type ViewStyle,
  type StyleProp,
} from "react-native";

type AnimatedContainerProps = TouchableOpacityProps & {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  animatedStyle?: "slideUp" | "slideLeft" | "fade" | "none";
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedContainer = ({
  style,
  children,
  delay = 0,
  duration = 300,
  animatedStyle = "none",
  ...props
}: AnimatedContainerProps) => {
  /***** Memoization *****/
  const getEnteringAnimation = useMemo(() => {
    switch (animatedStyle) {
      case "slideUp":
        return FadeInUp.delay(delay)
          .duration(duration)
          .springify()
          .damping(15)
          .stiffness(100)
          .mass(1);
      case "slideLeft":
        return FadeInLeft.duration(duration)
          .delay(delay)
          .springify()
          .damping(15)
          .stiffness(100)
          .mass(1);
      case "fade":
        return FadeIn.duration(duration)
          .delay(delay)
          .springify()
          .damping(15)
          .stiffness(100)
          .mass(1);
      default:
        return;
    }
  }, [animatedStyle, delay, duration]);
  const getExitingAnimation = useMemo(() => {
    switch (animatedStyle) {
      case "slideUp":
        return SlideOutDown.duration(duration).delay(delay);
      case "slideLeft":
        return SlideOutRight.duration(duration).delay(delay);
      case "fade":
        return FadeOut.duration(duration).delay(delay);
      case "none":
      default:
        return;
    }
  }, [animatedStyle, delay, duration]);

  return (
    <AnimatedTouchableOpacity
      style={style}
      disabled={!props.onPress}
      exiting={getExitingAnimation}
      entering={getEnteringAnimation}
      {...props}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};
