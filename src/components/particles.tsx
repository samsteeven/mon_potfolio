"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

interface EngineOptions {
  quantity: number;
  staticity: number;
  ease: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

function createParticlesEngine(
  container: HTMLDivElement,
  canvas: HTMLCanvasElement,
  options: EngineOptions
): () => void {
  const context = canvas.getContext("2d");
  const dpr = window.devicePixelRatio;
  const rgb = hexToRgb(options.color);

  let circles: Circle[] = [];
  const canvasSize = { w: 0, h: 0 };
  let rafID: number | null = null;
  let resizeTimeout: number | null = null;
  const mouse = { x: 0, y: 0 };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.w);
    const y = Math.floor(Math.random() * canvasSize.h);
    const pSize = Math.floor(Math.random() * 2) + options.size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (!context) return;
    const { x, y, translateX, translateY, size, alpha } = circle;
    context.translate(translateX, translateY);
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
    context.fill();
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!update) {
      circles.push(circle);
    }
  };

  const resizeCanvas = () => {
    if (!context) return;
    canvasSize.w = container.offsetWidth;
    canvasSize.h = container.offsetHeight;

    canvas.width = canvasSize.w * dpr;
    canvas.height = canvasSize.h * dpr;
    canvas.style.width = `${canvasSize.w}px`;
    canvas.style.height = `${canvasSize.h}px`;
    context.scale(dpr, dpr);

    circles = [];
    for (let i = 0; i < options.quantity; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const clearContext = () => {
    if (!context) return;
    context.clearRect(0, 0, canvasSize.w, canvasSize.h);
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < options.quantity; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    if (!context) return;
    clearContext();
    circles.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + options.vx;
      circle.y += circle.dy + options.vy;
      circle.translateX +=
        (mouse.x / (options.staticity / circle.magnetism) - circle.translateX) /
        options.ease;
      circle.translateY +=
        (mouse.y / (options.staticity / circle.magnetism) - circle.translateY) /
        options.ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.h + circle.size
      ) {
        circles.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
  };

  const onMouseMove = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const { w, h } = canvasSize;
    const x = event.clientX - rect.left - w / 2;
    const y = event.clientY - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      mouse.x = x;
      mouse.y = y;
    }
  };

  const onResize = () => {
    if (resizeTimeout != null) {
      window.clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(() => {
      resizeCanvas();
      drawParticles();
    }, 200);
  };

  const loop = () => {
    animate();
    rafID = window.requestAnimationFrame(loop);
  };

  resizeCanvas();
  drawParticles();
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);
  rafID = window.requestAnimationFrame(loop);

  return () => {
    if (rafID != null) {
      window.cancelAnimationFrame(rafID);
    }
    if (resizeTimeout != null) {
      window.clearTimeout(resizeTimeout);
    }
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);
  };
}

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    return createParticlesEngine(container, canvas, {
      quantity,
      staticity,
      ease,
      size,
      color,
      vx,
      vy,
    });
  }, [quantity, staticity, ease, size, color, vx, vy, refresh]);

  return (
    <div
      className={`pointer-events-none ${className}`}
      ref={containerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
