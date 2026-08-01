"use client";

import { useEffect, useState } from "react";

import { Particles } from "@/components/particles";

interface ParticlesBackgroundProps {
  className?: string;
  quantity?: number;
  ease?: number;
  size?: number;
  staticity?: number;
}

const DARK_COLOR = "#ffffff";
const LIGHT_COLOR = "#000000";

function getThemeColor(): string {
  if (typeof document === "undefined") return LIGHT_COLOR;
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? DARK_COLOR
    : LIGHT_COLOR;
}

export function ParticlesBackground({
  className,
  quantity = 100,
  ease = 80,
  size,
  staticity,
}: ParticlesBackgroundProps) {
  const [color, setColor] = useState<string>(() => getThemeColor());

  useEffect(() => {
    const updateColor = () => setColor(getThemeColor());

    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Particles
      className={className}
      quantity={quantity}
      ease={ease}
      color={color}
      size={size}
      staticity={staticity}
    />
  );
}
