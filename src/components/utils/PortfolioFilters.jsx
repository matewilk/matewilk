const PortfolioFilters = ({ filters, currentFilter, filterHandler }) => {
  if (!filters) return null;

  return (
    <div className="portfolio-filters flex flex-wrap justify-center gap-4">
      <button
        className={`btn btn-small ${
          currentFilter === "" ? "" : "btn-transparent"
        }`}
        onClick={() => filterHandler("")}
      >
        <span>All</span>
      </button>
      {filters?.map((filter) => (
        <button
          className={`btn btn-small ${
            currentFilter === filter.value
              ? "before:invisible"
              : "btn-transparent"
          }`}
          onClick={() => filterHandler(filter.value)}
          key={filter.id}
        >
          <span>{filter.title}</span>
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
