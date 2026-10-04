import { useState } from "react";
import SolarSystemCanvas from "./SolarSystemCanvas";
import PlanetInfo from "./PlanetInfo";
import Controls from "./Controls";
import { Planet } from "./planetData";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a1a]">
      {/* Canvas */}
      <div className="absolute inset-0">
        <SolarSystemCanvas
          isPlaying={isPlaying}
          speed={speed}
          selectedPlanet={selectedPlanet}
          onSelectPlanet={setSelectedPlanet}
        />
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          🌌 Solar System Explorer
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Click on any planet to learn more • Use controls to adjust animation
        </p>
      </div>

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <PlanetInfo
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
      />

      {/* Keyboard hint */}
      <div className="absolute bottom-4 left-4 z-10 text-[10px] text-gray-600">
        Click a planet to see details • Click empty space to deselect
      </div>
    </div>
  );
}
