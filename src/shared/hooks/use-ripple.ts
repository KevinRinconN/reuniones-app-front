import React, { useCallback, useState } from "react";

export type RippleType = {
  key: React.Key;
  x: number;
  y: number;
  size: number;
};

export interface UseRippleProps {}

export function useRipple(props: UseRippleProps = {}) {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const onPress = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const trigger = event.currentTarget;
    const rect = trigger.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: Date.now().toString(),
        size,
        x: x - size / 2,
        y: y - size / 2,
      },
    ]);
  }, []);

  const onClear = useCallback((key: React.Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
  }, []);

  return { ripples, onClear, onPress, ...props };
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
