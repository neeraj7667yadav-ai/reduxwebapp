import { useState } from "react";
import "./Home.css";

import Hero from "../Component/Hero";
import StatCard from "../Component/state";
import SearchFilter from "../Component/searchFilter";
import ApplicationCard from "../Component/ApplicationCard";
import { applications } from './../data/Data';

export default function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const count = (status) => applications.filter((a) => a.status === status).length;

  const visible = applications.filter((a) => {
    const matchSearch =
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "All" || a.status === filter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="py-4">
      <span className="diwali-badge">🪔 Shubh Diwali — Nayi job, nayi roshni!</span>
      <Hero />

      <div className="row g-3 mb-4">
        <StatCard  label="Interview" value={count("Interview")} icon="🗓️" />
        <StatCard  label="Offers" value={count("Offer")} icon="🎉" />
        <StatCard  label="Rejected" value={count("Rejected")} icon="📉" />
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <h5 className="fw-bold mb-3">Recent Applications</h5>
      <div className="row g-4">
        {visible.map((item) => (
          <ApplicationCard key={item.id} item={item} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="text-center text-secondary py-5">
          <div className="fs-1">🔎</div>
          <p className="mb-0">Koi application nahi mili.</p>
        </div>
      )}
    </div>
  );
}