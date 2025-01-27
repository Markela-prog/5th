export default function ControlPanel({
  language,
  setLanguage,
  seed,
  setSeed,
  likes,
  setLikes,
  rating,
  setRating,
  viewMode,
  setViewMode,
}) {
  const generateRandomSeed = () => setSeed(Math.floor(Math.random() * 100000));

  return (
    <div className="flex flex-wrap items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md gap-4">
      {/* Language Selector */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <label htmlFor="language" className="text-sm font-medium">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 w-full sm:w-auto"
        >
          <option value="ru">Russian (Russia)</option>
          <option value="ko">Korean (Korea)</option>
          <option value="ja">Japanese (Japan)</option>
        </select>
      </div>

      {/* Seed Generator */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <label htmlFor="seed" className="text-sm font-medium">
          Seed
        </label>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <input
            id="seed"
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-1 w-full sm:w-24"
          />
          <button
            onClick={generateRandomSeed}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg p-2"
            aria-label="Generate Random Seed"
          >
            🔀
          </button>
        </div>
      </div>

      {/* Likes Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <label htmlFor="likes" className="text-sm font-medium">
          Likes
        </label>
        <input
          id="likes"
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={likes}
          onChange={(e) => setLikes(Number(e.target.value))}
          className="w-full sm:w-40"
        />
        <span className="text-sm font-medium">{likes}</span>
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <label htmlFor="rating" className="text-sm font-medium">
          Rating
        </label>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <input
            id="rating"
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))} // Ensure rating is passed properly
            className="w-full sm:w-40"
          />
          <span className="text-sm font-medium">{rating?.toFixed(1)}</span>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full sm:w-auto">
        <button
          onClick={() => setViewMode("table")}
          className={`p-2 rounded-lg ${
            viewMode === "table"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          📋 Table
        </button>
        <button
          onClick={() => setViewMode("gallery")}
          className={`p-2 rounded-lg ${
            viewMode === "gallery"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          🖼️ Gallery
        </button>
      </div>
    </div>
  );
}
