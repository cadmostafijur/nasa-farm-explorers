 

interface GamesPageProps {
  onBack: () => void;
}

export default function GamesPage({ onBack }: GamesPageProps) {
  const url = "https://spaceplace.nasa.gov/menu/play/";
  const items = [
    { title: "CubeSat Builder", desc: "Build a NASA spacecraft!", emoji: "🛰️" },
    { title: "Go With the Flow", desc: "Use ocean currents to find treasure!", emoji: "🌊" },
    { title: "What's in the Atmosphere?", desc: "Explore Earth's atmosphere layers!", emoji: "🌍" }
  ];

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">NASA Space Place — Play</h1>
        <div className="flex items-center gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border rounded bg-white hover:bg-gray-50 text-sm">Open in new tab ↗</a>
          <button onClick={onBack} className="px-3 py-2 border rounded bg-white hover:bg-gray-50">Back</button>
        </div>
      </div>

      <p className="text-gray-700 mb-4">Direct embed is blocked by NASA for security, so use these cards to play on NASA’s site in a new tab.</p>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((g) => (
          <a key={g.title} href={url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border bg-white shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="h-32 rounded-lg bg-gray-100 flex items-center justify-center text-5xl mb-3">{g.emoji}</div>
            <div className="font-bold mb-1">{g.title}</div>
            <div className="text-sm text-gray-600 mb-3">{g.desc}</div>
            <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm">Play on NASA</button>
          </a>
        ))}
      </div>
    </div>
  );
}

