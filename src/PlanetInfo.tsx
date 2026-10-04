import { Planet, planets } from "./planetData";

interface PlanetInfoProps {
  planet: Planet;
  onClose: () => void;
}

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  return (
    <div className="absolute top-4 right-4 w-80 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-fade-in">
      {/* Header */}
      <div className="relative p-5 pb-4">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${planet.color}40, transparent)`,
          }}
        />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.glowColor})`,
                boxShadow: `0 0 20px ${planet.color}40`,
              }}
            >
              <span className="drop-shadow-md">{planet.emoji}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{planet.name}</h2>
              <p className="text-xs text-gray-400">Planet #{planets.indexOf(planet) + 1} from the Sun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3">
        <StatCard label="Diameter" value={planet.realDiameter} icon="📏" />
        <StatCard label="Distance from Sun" value={planet.realDistance} icon="📡" />
        <StatCard label="Orbital Period" value={planet.orbitalPeriod} icon="🔄" />
        <StatCard
          label="Relative Size"
          value={getRelativeSize(planet)}
          icon="📊"
        />
      </div>

      {/* Description */}
      <div className="px-5 pb-5">
        <p className="text-sm text-gray-300 leading-relaxed">
          {planet.description}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-xs">{icon}</span>
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
          {label}
        </span>
      </div>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function getRelativeSize(planet: Planet): string {
  const earthDiameter = 12756;
  const diameter = parseFloat(planet.realDiameter.replace(/,/g, ""));
  const ratio = diameter / earthDiameter;
  if (ratio > 1) return `${ratio.toFixed(1)}× Earth`;
  return `${ratio.toFixed(2)}× Earth`;
}


