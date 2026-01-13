const categories = [
  "all",
  "music",
  "education",
  "gaming",
  "news",
  "vlog",
  "tech",
];

const Filters = ({ setCategory }) => (
  <div className="filters">
    {categories.map((cat) => (
      <button
        key={cat}
        className="filter-btn"
        onClick={() => setCategory(cat)}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* nice display */}
      </button>
    ))}
  </div>
);

export default Filters;
