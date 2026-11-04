import { statuses } from "../data/Data";

export default function SearchFilter({ search, setSearch, filter, setFilter }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
      <input
        className="form-control form-control-lg rounded-pill search-box"
        type="search"
        placeholder="🔍 Company ya role dhoondho..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="d-flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`btn btn-sm rounded-pill px-3 ${
              filter === s ? "btn-dark" : "btn-outline-secondary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}