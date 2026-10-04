import { useRef, useEffect, useCallback } from "react";
import { planets, Planet } from "./planetData";

interface SolarSystemCanvasProps {
  isPlaying: boolean;
  speed: number;
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet | null) => void;
}

export default function SolarSystemCanvas({
  isPlaying,
  speed,
  selectedPlanet,
  onSelectPlanet,
}: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anglesRef = useRef<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);

  // Keep refs in sync with props
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate scale factor based on available space
      const maxOrbit = planets[planets.length - 1].orbitRadius;
      const availableRadius = Math.min(width, height) / 2 - 30;
      const scale = Math.min(1, availableRadius / maxOrbit);

      // Clear canvas
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, width, height);

      // Draw stars background
      drawStars(ctx, width, height);

      // Draw orbit paths
      planets.forEach((planet) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.orbitRadius * scale, 0, Math.PI * 2);
        ctx.strokeStyle =
          selectedPlanet?.name === planet.name
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = selectedPlanet?.name === planet.name ? 1.5 : 0.5;
        ctx.stroke();
      });

      // Draw Sun
      drawSun(ctx, centerX, centerY);

      // Draw planets
      planets.forEach((planet, index) => {
        const angle = anglesRef.current[index];
        const x = centerX + Math.cos(angle) * planet.orbitRadius * scale;
        const y = centerY + Math.sin(angle) * planet.orbitRadius * scale;

        // Planet glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.radius * 2.5);
        gradient.addColorStop(0, planet.glowColor + "60");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, planet.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Planet body
        const planetGradient = ctx.createRadialGradient(
          x - planet.radius * 0.3,
          y - planet.radius * 0.3,
          0,
          x,
          y,
          planet.radius
        );
        planetGradient.addColorStop(0, lightenColor(planet.color, 30));
        planetGradient.addColorStop(1, planet.color);
        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planetGradient;
        ctx.fill();

        // Saturn's rings
        if (planet.name === "Saturn") {
          ctx.beginPath();
          ctx.ellipse(x, y, planet.radius * 2.2, planet.radius * 0.5, 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = "#e8d5a380";
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Selection highlight
        if (selectedPlanet?.name === planet.name) {
          ctx.beginPath();
          ctx.arc(x, y, planet.radius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Planet name label
        ctx.fillStyle =
          selectedPlanet?.name === planet.name
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.6)";
        ctx.font = selectedPlanet?.name === planet.name ? "bold 11px Inter, sans-serif" : "10px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(planet.name, x, y + planet.radius + 14);
      });
    },
    [selectedPlanet]
  );

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (isPlayingRef.current) {
        // Base speed: Earth completes orbit in ~20 seconds at speed 1
        const baseSpeed = (Math.PI * 2) / (20 * 1000);
        planets.forEach((planet, index) => {
          // Speed relative to Earth's period
          const relativeSpeed = 365 / planet.orbitalPeriodDays;
          anglesRef.current[index] += baseSpeed * relativeSpeed * speedRef.current * delta;
        });
      }

      const width = canvas.width;
      const height = canvas.height;
      draw(ctx, width, height);

      animationRef.current = requestAnimationFrame(animate);
    },
    [draw]
  );

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Start animation loop
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Calculate scale factor (same as in draw)
    const maxOrbit = planets[planets.length - 1].orbitRadius;
    const availableRadius = Math.min(canvas.width, canvas.height) / 2 - 30;
    const scale = Math.min(1, availableRadius / maxOrbit);

    // Check if clicked on a planet
    for (let i = planets.length - 1; i >= 0; i--) {
      const planet = planets[i];
      const angle = anglesRef.current[i];
      const px = centerX + Math.cos(angle) * planet.orbitRadius * scale;
      const py = centerY + Math.sin(angle) * planet.orbitRadius * scale;

      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      if (dist <= planet.radius + 8) {
        onSelectPlanet(selectedPlanet?.name === planet.name ? null : planet);
        return;
      }
    }

    // Clicked on empty space
    onSelectPlanet(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="w-full h-full cursor-pointer"
    />
  );
}

// Draw static stars
let starsCache: { x: number; y: number; size: number; brightness: number }[] | null = null;
let starsCacheSize = { w: 0, h: 0 };

function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number) {
  if (!starsCache || starsCacheSize.w !== width || starsCacheSize.h !== height) {
    starsCache = [];
    starsCacheSize = { w: width, h: height };
    for (let i = 0; i < 200; i++) {
      starsCache.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        brightness: Math.random() * 0.6 + 0.2,
      });
    }
  }

  starsCache.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
    ctx.fill();
  });
}

function drawSun(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Sun outer glow
  const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 50);
  outerGlow.addColorStop(0, "rgba(255, 200, 50, 0.3)");
  outerGlow.addColorStop(0.5, "rgba(255, 150, 0, 0.1)");
  outerGlow.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fillStyle = outerGlow;
  ctx.fill();

  // Sun body
  const sunGradient = ctx.createRadialGradient(x - 5, y - 5, 0, x, y, 28);
  sunGradient.addColorStop(0, "#fff5cc");
  sunGradient.addColorStop(0.3, "#ffdd44");
  sunGradient.addColorStop(0.7, "#ff9900");
  sunGradient.addColorStop(1, "#ff6600");
  ctx.beginPath();
  ctx.arc(x, y, 28, 0, Math.PI * 2);
  ctx.fillStyle = sunGradient;
  ctx.fill();

  // Sun inner glow
  const innerGlow = ctx.createRadialGradient(x, y, 20, x, y, 35);
  innerGlow.addColorStop(0, "transparent");
  innerGlow.addColorStop(1, "rgba(255, 100, 0, 0.2)");
  ctx.beginPath();
  ctx.arc(x, y, 35, 0, Math.PI * 2);
  ctx.fillStyle = innerGlow;
  ctx.fill();
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + percent);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + percent);
  const b = Math.min(255, (num & 0x0000ff) + percent);
  return `rgb(${r}, ${g}, ${b})`;
}
