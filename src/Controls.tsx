interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function Controls({
  isPlaying,
  speed,
  onTogglePlay,
  onSpeedChange,
}: ControlsProps) {
  const speedPresets = [
    { label: "0.5×", value: 0.5 },
    { label: "1×", value: 1 },
    { label: "2×", value: 2 },
    { label: "5×", value: 5 },
    { label: "10×", value: 10 },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-2xl z-10">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/10"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10" />

      {/* Speed Controls */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mr-2">
          Speed
        </span>
        {speedPresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onSpeedChange(preset.value)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              speed === preset.value
                ? "bg-blue-500/30 text-blue-300 border border-blue-500/40"
                : "text-gray-400 hover:text-white hover:bg-white/10 border border-transparent"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10" />

      {/* Speed Slider */}
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0.1"
          max="20"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
          title={`Speed: ${speed.toFixed(1)}×`}
        />
        <span className="text-xs text-gray-400 font-mono w-10 text-right">
          {speed.toFixed(1)}×
        </span>
      </div>
    </div>
  );
}
