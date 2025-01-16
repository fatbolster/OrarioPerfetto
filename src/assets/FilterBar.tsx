import React, { useEffect, useState } from "react";
import "./FilterBar.css";

type Email = {
  id: number;
  subject: string;
  summary: string;
  urgency: string;
};

type FilterBarProps = {
  emails: Email[];
  filter: string;
  applyFilter: (filter: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({
  emails,
  filter,
  applyFilter,
}) => {
  const [urgencyOrder, setUrgencyOrder] = useState<string[]>([]);

  useEffect(() => {
    // Fixed order of urgencies
    const predefinedOrder = ["Urgent", "Mildly Urgent", "Not Urgent"];

    // Ensure all predefined urgencies are included, even if no emails match
    setUrgencyOrder(["All", ...predefinedOrder]);
  }, []);

  return (
    <div className="filter-bar">
      {/* Filter Buttons */}
      <div className="filter-buttons">
        {urgencyOrder.map((urgency) => (
          <button
            key={urgency}
            onClick={() => applyFilter(urgency)}
            className={`filter-button ${
              filter === urgency ? "active" : ""
            } ${urgency.toLowerCase().replace(" ", "-")}`}
          >
            {urgency}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
