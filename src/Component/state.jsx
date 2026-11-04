import "./Diwali.css"
export default function StatCard({ label, value, icon }) {
  
  return (
    <div className="col-6 col-lg-3">
      <div className="card stat-card shadow-sm rounded-4 h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div className="stat-icon">{icon}</div>
          <div>
            <h3 className="fw-bold mb-0">{value}</h3>
            <small className="text-secondary">{label}</small>
          </div>
        </div>
      </div>
    </div>
  );
}