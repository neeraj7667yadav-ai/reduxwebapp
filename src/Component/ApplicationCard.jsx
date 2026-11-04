import { statusColor } from "../data/Data";

export default function ApplicationCard({ item }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card app-card shadow-sm rounded-4 h-100">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="avatar">{item.company[0]}</div>
            <div>
              <h6 className="fw-bold mb-0">{item.company}</h6>
              <small className="text-secondary">{item.role}</small>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <span className={`badge rounded-pill text-bg-${statusColor[item.status]}`}>
              {item.status}
            </span>
            <small className="text-secondary">📍 {item.location}</small>
          </div>
        </div>
        <div className="card-footer bg-transparent border-0 pb-3">
          <small className="text-secondary">Applied on {item.date}</small>
        </div>
      </div>
    </div>
  );
}