import { useEffect, useState } from "react";
import "./Diwali.css";

const COLORS = [
  "#fbbf24",
  "#fb923c",
  "#f472b6",
  "#a78bfa",
  "#34d399",
  "#60a5fa",
];
const BULBS = 26;

const SPARKLES = Array.from({ length: 28 }, () => ({
  left: Math.random() * 100,
  size: 3 + Math.random() * 5,
  dur: 8 + Math.random() * 10,
  delay: Math.random() * 10,
}));

function Diwali() {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem("diwali") !== "off";
    } catch {
      return true;
    }
  });

  // On/Off yaad rakho
  useEffect(() => {
    try {
      localStorage.setItem("diwali", on ? "on" : "off");
    } catch {"diwali nahi hai aaj"}
  }, [on]);

  // Click par cracker blast
  useEffect(() => {
    if (!on) return;
    const burst = (e) => {
      if (e.target.closest("button, a, input, .diwali-toggle")) return;
      for (let i = 0; i < 16; i++) {
        const p = document.createElement("span");
        p.className = "spark-burst";
        const angle = (i / 16) * Math.PI * 2;
        const dist = 50 + Math.random() * 50;
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        p.style.background = COLORS[i % COLORS.length];
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 900);
      }
    };
    window.addEventListener("click", burst);
    return () => window.removeEventListener("click", burst);
  }, [on]);

  // Girti hui chingariyan (ek baar generate hoti hain)

  return (
    <>
      <button
        className="diwali-toggle"
        onClick={() => setOn(!on)}
        title={on ? "Diwali mode band karo" : "Diwali mode chalu karo"}
      >
        🪔
      </button>

      {on && (
        <div className="diwali" aria-hidden="true">
          {/* Bulbs ki lari */}
          <div className="diwali-lights">
            {Array.from({ length: BULBS }, (_, i) => (
              <span
                key={i}
                className="bulb"
                style={{
                  "--c": COLORS[i % COLORS.length],
                  "--d": `${(i % 6) * 0.35}s`,
                  "--y": `${Math.abs(Math.sin((i / BULBS) * Math.PI * 4)) * 14}px`,
                }}
              />
            ))}
          </div>

          {/* Chingariyan */}
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="sparkle"
              style={{
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}

          {/* Corner diyas */}
          <div className="diya diya-left">
            <i className="flame" />
            <b />
          </div>
          <div className="diya diya-right">
            <i className="flame" />
            <b />
          </div>
        </div>
      )}
    </>
  );
}

export default Diwali;
