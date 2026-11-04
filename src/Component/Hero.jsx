import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero rounded-4 p-4 p-md-5 mb-4 text-white">
      <h1 className="fw-bold display-6 mb-2">Apni job search ko organized rakho</h1>
      <p className="lead opacity-75 mb-4">
        Har application ka status ek jagah dekho, aur koi interview miss mat karo.
      </p>
      <Link to="/add" className="btn btn-light btn-lg me-2">+ Add Application</Link>
      <Link to="/about" className="btn btn-outline-light btn-lg">Kaise kaam karta hai</Link>
    </section>
  );
}