import "./Garland.css";

const FLOWERS = ["🌼", "🌺", "🏵️", "🌸", "🌼", "🌺"];

function Strand({ side }) {
  return (
    <div className={`garland garland-${side}`} aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="g-flower"
          style={{ animationDelay: `${(i % 7) * 0.25}s` }}
        >
          {FLOWERS[i % FLOWERS.length]}
        </span>
      ))}
    </div>
  );
}

function Garland() {
  return (
    <>
      <Strand side="left" />
      <Strand side="right" />
    </>
  );
}

export default Garland;