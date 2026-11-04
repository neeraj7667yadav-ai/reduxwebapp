import { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

function AnimatedBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Smooth follow: cursor ke peeche dheere se aata hai
    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;

      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--px", (x / window.innerWidth - 0.5).toFixed(3));
      el.style.setProperty("--py", (y / window.innerHeight - 0.5).toFixed(3));

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="bg-live" ref={ref} aria-hidden="true">
      <span className="bg-blob bg-blob-1" />
      <span className="bg-blob bg-blob-2" />
      <span className="bg-blob bg-blob-3" />
      <div className="bg-dots" />
      <div className="bg-glow" />
    </div>
  );
}

export default AnimatedBackground;