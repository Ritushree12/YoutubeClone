const categories = [
  "All",
  "Music",
  "Education",
  "Gaming",
  "News",
  "Vlogs",
  "Tech",
];

const Filters = ({ setCategory }) => (
  <div className="filters">
    {categories.map((cat) => (
      <button key={cat} className="filter-btn" onClick={() => setCategory(cat)}>
        {cat}
      </button>
    ))}
  </div>
);

export default Filters;
