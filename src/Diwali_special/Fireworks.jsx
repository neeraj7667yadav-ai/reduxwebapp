import { useEffect, useRef } from "react";

const COLORS = ["#fbbf24", "#fb923c", "#f472b6", "#a78bfa", "#34d399", "#60a5fa", "#f87171"];

function Fireworks() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, frame, lastLaunch = 0;
    const rockets = [];
    const parts = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    const launch = () => {
      rockets.push({
        x: w * (0.1 + Math.random() * 0.8),
        y: h,
        ty: h * (0.12 + Math.random() * 0.35),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const burst = (x, y, color) => {
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 1 + Math.random() * 4.5;
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color });
      }
    };

    const tick = (t) => {
      if (t - lastLaunch > 1500) {
        launch();
        lastLaunch = t;
      }

      // Purane frame ko dheere mita do = trail effect
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y -= 8;
        ctx.fillStyle = "#fff7ae";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.ty) {
          burst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + 0.05;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.013;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(tick);
    };

    // Gift khulne par 6 rockets ek saath
    const onGift = () => {
      for (let i = 0; i < 6; i++) setTimeout(launch, i * 180);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("diwali-burst", onGift);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("diwali-burst", onGift);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1030,
      }}
    />
  );
}

export default Fireworks;