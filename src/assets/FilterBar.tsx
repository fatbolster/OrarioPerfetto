type FilterBarProps = {
  filter: string;
  applyFilter: (filter: string) => void;
};

const FilterBar = ({ filter, applyFilter }: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <button
        onClick={() => applyFilter("All")}
        className={filter === "All" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => applyFilter("Urgent")}
        className={filter === "Urgent" ? "active" : ""}
      >
        Urgent
      </button>
      <button
        onClick={() => applyFilter("Not Urgent")}
        className={filter === "Not Urgent" ? "active" : ""}
      >
        Not urgent
      </button>
    </div>
  );
};

export default FilterBar;
