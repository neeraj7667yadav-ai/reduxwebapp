import { useEffect, useState } from "react";
import "./GiftBox.css";

const QUESTIONS = [
  {
    q: "Diwali kiski yaad me manayi jaati hai jab wo 14 saal baad Ayodhya lautey?",
    options: ["Shri Ram", "Shri Krishna", "Hanuman ji", "Bhagwan Shiv"],
    answer: 0,
  },
  {
    q: "Diwali par kis devi ki puja ki jaati hai?",
    options: ["Maa Durga", "Maa Lakshmi", "Maa Saraswati", "Maa Kali"],
    answer: 1,
  },
  {
    q: "Diwali ko aur kis naam se jaana jaata hai?",
    options: ["Festival of Colours", "Festival of Kites", "Festival of Lights", "Festival of Harvest"],
    answer: 2,
  },
  {
    q: "Diwali kis mahine ki amavasya ko manayi jaati hai?",
    options: ["Chaitra", "Kartik", "Falgun", "Sawan"],
    answer: 1,
  },
];

const SHAYARI = [
  "Diye ki lau se roshan ho har ek raah tumhari,",
  "Khushiyon se mehke har subah, har shaam tumhari.",
  "Lakshmi maa ka aashirwad rahe sada saath,",
  "Poori ho har mehnat, har ek dua tumhari. 🪔",
];

const SHAYARI_2 = [
  "Mehnat ke diye jalate chalo,",
  "Manzil ki taraf badhte chalo,",
  "Is Diwali yeh dua hai meri,",
  "Offer letter ki mithai khilate chalo! 🍬",
];

const MITHAI = ["🍬", "🍮", "🥮", "🍯", "🍡", "🍪"];
const BULB_COLORS = ["#fbbf24", "#fb923c", "#f472b6", "#a78bfa", "#34d399", "#60a5fa"];

function FamilyArt() {
  return (
    <svg viewBox="0 0 240 170" className="gc-family" role="img" aria-label="Diwali manata hua pyaara parivaar">
      <defs>
        <radialGradient id="famGlow">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="90" r="85" fill="url(#famGlow)" />

      {/* Papa */}
      <rect x="48" y="80" width="40" height="62" rx="16" fill="#6366f1" />
      <circle cx="68" cy="60" r="19" fill="#fcd9b6" />
      <path d="M49 58 Q68 30 87 58 Q68 46 49 58Z" fill="#3b2a20" />
      <circle cx="62" cy="62" r="2" fill="#3b2a20" />
      <circle cx="74" cy="62" r="2" fill="#3b2a20" />
      <path d="M62 69 q6 5 12 0" stroke="#b45309" fill="none" strokeWidth="2" strokeLinecap="round" />

      {/* Mummy */}
      <path d="M168 80 L142 144 H194 Z" fill="#ec4899" />
      <circle cx="168" cy="56" r="21" fill="#2b1d16" />
      <circle cx="168" cy="60" r="18" fill="#fcd9b6" />
      <circle cx="168" cy="52" r="2" fill="#dc2626" />
      <circle cx="162" cy="62" r="2" fill="#3b2a20" />
      <circle cx="174" cy="62" r="2" fill="#3b2a20" />
      <path d="M162 69 q6 5 12 0" stroke="#b45309" fill="none" strokeWidth="2" strokeLinecap="round" />

      {/* Bachha */}
      <rect x="104" y="106" width="28" height="38" rx="12" fill="#f59e0b" />
      <circle cx="118" cy="92" r="15" fill="#fcd9b6" />
      <path d="M103 90 Q118 70 133 90 Q118 82 103 90Z" fill="#3b2a20" />
      <circle cx="113" cy="94" r="1.8" fill="#3b2a20" />
      <circle cx="123" cy="94" r="1.8" fill="#3b2a20" />
      <path d="M113 100 q5 4 10 0" stroke="#b45309" fill="none" strokeWidth="2" strokeLinecap="round" />

      {/* Diye */}
      <path d="M14 148 h30 a15 11 0 0 1 -30 0z" fill="#f97316" />
      <ellipse cx="29" cy="139" rx="4" ry="8" fill="#fbbf24" />
      <path d="M196 148 h30 a15 11 0 0 1 -30 0z" fill="#f97316" />
      <ellipse cx="211" cy="139" rx="4" ry="8" fill="#fbbf24" />
    </svg>
  );
}

function GiftBox() {
  const [stage, setStage] = useState("closed"); // closed | quiz | opening | card
  const [unlocked, setUnlocked] = useState(false);
  const [question, setQuestion] = useState(QUESTIONS[0]);
  const [wrongPicks, setWrongPicks] = useState([]);
  const [photo, setPhoto] = useState(null);

  // Photo hatane/badalne par purana URL memory se saaf karo
  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  const openGift = () => {
    if (unlocked) {
      setStage("card");
      return;
    }
    setQuestion(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
    setWrongPicks([]);
    setStage("quiz");
  };

  const pick = (i) => {
    if (i === question.answer) {
      setUnlocked(true);
      setStage("opening");
      window.dispatchEvent(new Event("diwali-burst"));
      setTimeout(() => setStage("card"), 1100);
    } else {
      setWrongPicks((w) => [...w, i]);
    }
  };

  const onPhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <>
      <button
        className={`gift ${stage === "opening" ? "opening" : ""}`}
        onClick={openGift}
        aria-label="Surprise gift kholo"
      >
        <span className="gift-tip">Surprise! 🎁</span>
        <span className="gift-lid"><i className="gift-bow">🎀</i></span>
        <span className="gift-body" />
      </button>

      {/* ---------- MCQ ---------- */}
      {stage === "quiz" && (
        <div className="gq-backdrop" onClick={() => setStage("closed")}>
          <div className="gq-box" onClick={(e) => e.stopPropagation()}>
            <h3>🎁 Gift kholne ke liye sahi jawab do</h3>
            <p className="gq-q">{question.q}</p>
            <div className="gq-options">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className={`gq-opt ${wrongPicks.includes(i) ? "wrong" : ""}`}
                  disabled={wrongPicks.includes(i)}
                  onClick={() => pick(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {wrongPicks.length > 0 && (
              <p className="gq-msg">Arre galat! Ek aur try karo 😄</p>
            )}
          </div>
        </div>
      )}

      {/* ---------- Celebration card ---------- */}
      {stage === "card" && (
        <div className="gq-backdrop" onClick={() => setStage("closed")}>
          <div className="gc-card" onClick={(e) => e.stopPropagation()}>
            <button className="gc-close" onClick={() => setStage("closed")} aria-label="Band karo">✕</button>

            <div className="gc-bulbs">
              {Array.from({ length: 16 }, (_, i) => (
                <span
                  key={i}
                  style={{ "--c": BULB_COLORS[i % 6], "--d": `${(i % 5) * 0.3}s` }}
                />
              ))}
            </div>

            <div className="gc-flowers">🌼🌺🏵️🌸🌼🌺🏵️🌸🌼🌺</div>
            <h2 className="gc-title">🪔 Shubh Deepawali 🪔</h2>

            <div className="gc-body">
              <figure className="gc-photo">
                {photo ? <img src={photo} alt="Aapki photo" /> : <FamilyArt />}
                <figcaption>Hamara pyaara parivaar 💛</figcaption>
                <div className="gc-photo-actions">
                  <label className="gc-btn">
                    📷 Apni photo lagao
                    <input type="file" accept="image/*" hidden onChange={onPhoto} />
                  </label>
                  {photo && (
                    <button className="gc-btn gc-btn-ghost" onClick={() => setPhoto(null)}>
                      Hatao
                    </button>
                  )}
                </div>
              </figure>

              <div className="gc-text">
                <div className="gc-shayari">
                  {SHAYARI.map((l, i) => <p key={i}>{l}</p>)}
                </div>
                <div className="gc-shayari gc-shayari-2">
                  {SHAYARI_2.map((l, i) => <p key={i}>{l}</p>)}
                </div>
              </div>
            </div>

            <div className="gc-mithai">
              {MITHAI.map((m, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>{m}</span>
              ))}
            </div>
            <div className="gc-flowers gc-flowers-bottom">🌸🏵️🌺🌼🌸🏵️🌺🌼🌸🏵️</div>
          </div>
        </div>
      )}
    </>
  );
}

export default GiftBox;