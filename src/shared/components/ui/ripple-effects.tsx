"use client";

import { RippleType } from "@/shared/hooks/use-ripple";
import { cn } from "@/shared/lib/utils";
import {
  AnimatePresence,
  motion,
  LazyMotion,
  domAnimation,
} from "framer-motion";

interface RippleEffectsProps {
  ripples: Array<RippleType>;
  onClear: (key: React.Key) => void;
  className?: string;
}

export const RippleEffects: React.FC<RippleEffectsProps> = ({
  ripples,
  onClear,
  className,
}) => (
  <AnimatePresence>
    {ripples.map((ripple) => (
      <LazyMotion key={ripple.key} features={domAnimation}>
        <motion.span
          data-slot="ripple"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          exit={{ opacity: 0 }}
          className={cn("absolute rounded-full pointer-events-none", className)}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
            zIndex: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          onAnimationComplete={() => onClear(ripple.key)}
        />
      </LazyMotion>
    ))}
  </AnimatePresence>
);
