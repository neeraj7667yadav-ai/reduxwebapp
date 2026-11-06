import {useNavigate, useParams } from "react-router-dom";
import './Jobdetails.css';
import { applications} from "../data/Data";
function Section({ title, children }) {
  return (
    <div className="section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function List({ items }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Tags({ items }) {
  return (
    <div>
      {items.map((item) => (
        <span className="chip" key={item}>{item}</span>
      ))}
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="fact">
      <p className="fact-label">{label}</p>
      <p className="fact-value">{value}</p>
    </div>
  );
}

function JobDetails() {
    const {id}= useParams();
  const navigate = useNavigate();
  const app = applications.find((a)=>a.id === Number(id));
  if(!app){
    return(
        <div className="job-card">
             <p>Ye application nahi mili.</p>
        <button className= " btn btn-primary"onClick={() => navigate("/")}>Home par jao</button>
        </div>
    )
  }

  const initials = app.company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
   <div className="container" >
      <div className="job-card bg-white">
      {/* 1. Header */}
      <div className="header">
        <div className="logo">{initials}</div>
        <div className="header-text">
          <h2>{app.role}</h2>
          <p className="muted">
            {app.company} · Posted {app.postedAgo} · {app.applicants} applicants
          </p>
        </div>
        <span className="status">{app.status}</span>
      </div>

      {/* 2. Quick facts */}
      <div className="facts">
        <Fact label="Location" value={app.location} />
        <Fact label="Job type" value={app.type} />
        <Fact label="Experience" value={app.experience} />
        <Fact label="Salary" value={app.salary} />
      </div>

      {/* 3-7. Sections */}
      <Section title="About the role">
        <p className="muted">{app.about}</p>
      </Section>

      <Section title="Responsibilities">
        <List items={app.responsibilities} />
      </Section>

      <Section title="Requirements">
        <List items={app.requirements} />
      </Section>

      <Section title="Skills">
        <Tags items={app.skills} />
      </Section>

      <Section title="Benefits">
        <Tags items={app.benefits} />
      </Section>

      {/* 8. How to apply */}
      <div className="section apply">
        <div>
          <h3>How to apply</h3>
          <p className="muted">
            Last date: {app.Date} · {app.email}
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => navigate(-1)}>Back</button>
          <button className="primary">Apply now</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default JobDetails;
