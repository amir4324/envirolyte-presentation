"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type React from "react";

type Slide = {
  kicker: string;
  title: string;
  type: string;
  image?: string;
};

const slides: Slide[] = [
  { kicker: "Poultry Industry", title: "A Complete Water Treatment & Disinfection Solution for the Poultry Industry", type: "cover", image: "/images/cover-chickens.jpg" },
  { kicker: "The Challenge", title: "Disease Is Not Only a Health Problem — It Is a Business Problem", type: "challenge", image: "/images/barn-disinfection.jpg" },
  { kicker: "The Gap", title: "Traditional Disinfection Solves Isolated Problems. Farms Need a Complete System.", type: "journey" },
  { kicker: "The Solution", title: "Envirolyte Extends Water Treatment Into Farm-Wide Biosecurity", type: "solution", image: "/images/envirolyte-system.png" },
  { kicker: "How It Works", title: "Generated On-Site Using Only Salt, Water & Electricity", type: "process" },
  { kicker: "System Outputs", title: "Two Electrolyzed Solutions. Two Different Functions.", type: "outputs" },
  { kicker: "Across the Farm", title: "One Technology. Multiple Poultry Applications.", type: "applications", image: "/images/modern-poultry-water.jpg" },
  { kicker: "Reported Impact", title: "Cleaner Operations Can Translate Into Better Farm Performance", type: "metrics" },
  { kicker: "Business Case", title: "This Is More Than Disinfection — It Is an Operational Cost Decision", type: "business" },
  { kicker: "Safety & Sustainability", title: "Powerful Against Microorganisms. Designed for Safer Operations.", type: "safety" },
  { kicker: "Selected Installations", title: "From Qatar to International Poultry Operations", type: "markets", image: "/images/international-poultry-network.png" },
  { kicker: "Qatar Results — As Reported", title: "What Did the Farm Achieve?", type: "qatar" },
  { kicker: "Global Reach", title: "A Technology With International Market Acceptance", type: "global", image: "/images/world-map.png" },
  { kicker: "The Strategic Message", title: "Control the Water. Control More of the Farm’s Risk.", type: "strategy", image: "/images/qatar-chicks.png" },
  { kicker: "Next Step", title: "Start With an Assessment of Your Farm", type: "closing", image: "/images/qatar-system.png" },
];

const benefits = [
  ["01", "Mortality", "Higher flock losses"],
  ["02", "Medication", "More treatment requirements"],
  ["03", "Efficiency", "Lower operational performance"],
  ["04", "Water", "Continuous contamination risk"],
  ["05", "Biosecurity", "Pressure across people and assets"],
];

const apps = ["Drinking water systems", "Barn air — fogging", "Barn floors", "Hatcheries", "Chiller water", "Staff hands & feet", "Vehicles and access points"];
const assessment = ["Drinking water system", "Current disinfection procedures", "Medication and chemical usage", "Mortality levels", "Farm sanitation requirements", "Potential operational savings"];

function Dots({ count, active }: { count: number; active: number }) {
  return <div className="mini-dots" aria-hidden="true">{Array.from({ length: count }, (_, i) => <span key={i} className={i === active ? "on" : ""} />)}</div>;
}

function Scene({ slide, index }: { slide: Slide; index: number }) {
  const frame = (children: React.ReactNode) => (
    <>
      <header className="scene-head reveal"><span>{slide.kicker}</span><div className="brand-word">ENVIROLYTE</div></header>
      <main className="scene-main">{children}</main>
      <footer className="scene-foot reveal"><span>ENVIROLYTE • POULTRY BIOSECURITY</span><strong>{String(index + 1).padStart(2, "0")}</strong></footer>
    </>
  );

  if (slide.type === "cover") return (
    <div className="cover-layout">
      <div className="cover-copy">
        <img className="envirolyte-logo reveal" src="/images/envirolyte-logo.png" alt="Envirolyte" />
        <p className="eyebrow reveal">POULTRY INDUSTRY</p>
        <h1 className="hero-title reveal">A Complete Water Treatment &amp; Disinfection Solution for the Poultry Industry</h1>
        <p className="cover-tags reveal">STERILIZATION <i /> DISINFECTION <i /> WATER PURIFICATION</p>
        <p className="cover-support reveal">For safer operations, healthier birds, and better farm performance.</p>
      </div>
      <div className="cover-image" style={{ backgroundImage: `url(${slide.image})` }}><div className="water-glow" /></div>
    </div>
  );

  if (slide.type === "challenge") return frame(<div className="split media-right"><div className="copy-block"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Diseases and infections create compounding operational pressure across every production cycle.</p><div className="issue-list">{benefits.map(([n, a, b], i) => <div className="issue reveal" key={a} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}><b>{n}</b><strong>{a}</strong><span>{b}</span></div>)}</div></div><figure className="photo reveal"><img src={slide.image} alt="Worker disinfecting a poultry barn" /></figure></div>);

  if (slide.type === "journey") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Effective biosecurity must cover the entire contamination journey — not one chemical or one location.</p><div className="journey">{[["Water", "Daily intake"], ["Barns", "Living environment"], ["Equipment", "Contact surfaces"], ["Workers", "Movement & hygiene"], ["Vehicles", "Farm access"]].map(([a, b], i) => <div className="journey-node reveal" key={a} style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}><b>{i + 1}</b><strong>{a}</strong><span>{b}</span></div>)}</div><div className="thesis reveal">One weak point can reintroduce risk across the full operation.</div></div>);

  if (slide.type === "solution") return frame(<div className="split media-right"><div className="copy-block"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A comprehensive, eco-conscious and cost-focused program — generated on site and applied where the farm needs it.</p><ul className="check-list">{["Drinking water treatment", "Barn disinfection", "Microbial control", "Farm sanitation", "Less dependence on conventional chemicals"].map((x, i) => <li className="reveal" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} key={x}>{x}</li>)}</ul></div><figure className="photo equipment reveal"><img src={slide.image} alt="Envirolyte generation equipment" /></figure></div>);

  if (slide.type === "process") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A conditioned brine solution passes through a diaphragmatic electrolysis cell to create fresh active solutions close to the point of use.</p><div className="process">{[["Water", "Conditioned feed"], ["Salt", "Sodium chloride brine"], ["Electricity", "Controlled current"], ["Envirolyte", "Diaphragmatic cell"], ["Anolyte", "Disinfection solution"]].map(([a, b], i) => <article className="process-step reveal" key={a} style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}><em>{String(i + 1).padStart(2, "0")}</em><strong>{a}</strong><span>{b}</span></article>)}</div><div className="soft-thesis reveal">Fresh generation on demand reduces reliance on transported and stored disinfectants.</div></div>);

  if (slide.type === "outputs") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="solution-pair"><article className="solution-card aqua reveal"><div className="round-icon">A</div><h3>ANOLYTE</h3><b>DISINFECTION</b><p>Oxidizing solution used for microbial control, water treatment and sanitation.</p><small>Broad-spectrum germicidal function</small></article><article className="solution-card green reveal"><div className="round-icon">C</div><h3>CATHOLYTE</h3><b>CLEANING &amp; DEGREASING</b><p>Alkaline reducing solution used for washing, cleaning support and process applications.</p><small>Detergent / degreasing function</small></article></div></div>);

  if (slide.type === "applications") return frame(<div className="split media-right"><div><h2 className="scene-title reveal">{slide.title}</h2><div className="application-list">{apps.map((x, i) => <div className="application reveal" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties} key={x}><b>{i + 1}</b><span>{x}</span></div>)}</div></div><figure className="photo reveal"><img src={slide.image} alt="Modern poultry drinking system" /></figure></div>);

  if (slide.type === "metrics") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="source-line reveal">Benefits reported in the supplied Envirolyte material</p><div className="metric-grid">{[["50%", "Lower mortality rate"], ["70%", "Fewer medications"], ["BETTER", "Feed utilization"], ["FASTER", "Weight gain"]].map(([a, b], i) => <article className={`metric reveal m${i}`} key={a}><strong>{a}</strong><span>{b}</span></article>)}</div><p className="fineprint reveal">The supplied material also reports destruction of germs and activity against pathogens including Salmonella and E. coli.</p></div>);

  if (slide.type === "business") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="business-pair"><article className="model old reveal"><h3>CONVENTIONAL CHEMICAL MODEL</h3><div className="model-flow">Purchase → Transport → Store → Handle → Repeat</div><ul><li>Transport &amp; storage burden</li><li>Leak and handling exposure</li><li>Cost tied to recurring purchases</li></ul></article><article className="model new reveal"><h3>ENVIROLYTE MODEL</h3><div className="model-flow">Generate On-Site → Dose → Use When Needed</div><ul><li>Low generation cost</li><li>Reduced transportation</li><li>Potentially steadier cost structure</li></ul></article></div></div>);

  if (slide.type === "safety") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="safety-grid">{[["Safety", "Simple handling\nNon-hazardous operation"], ["Environment", "Lower environmental impact\n100% biodegradable*"], ["Performance", "Fast-acting biocide\nLonger residual effect"], ["Simplicity", "Generated on site\nUsed when needed"]].map(([a, b], i) => <article className="safety-item reveal" key={a}><b>{i + 1}</b><h3>{a}</h3><p>{b}</p></article>)}</div><div className="thesis reveal">Fast-acting • Powerful biocide • Simple to handle • Non-toxic* • Environmentally friendly*</div><p className="fineprint reveal">*As described in the supplied material; application and regulatory requirements should be validated locally.</p></div>);

  if (slide.type === "markets") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="markets-layout"><div className="market-list reveal"><span>EXAMPLES IN THE SUPPLIED PRESENTATION</span><b>Serbia — slaughterhouse</b><b>Iran — two installations</b><b>France — large hen farm</b><b>Qatar — two poultry farms</b></div><figure className="installation-photo reveal"><img src={slide.image} alt="Modern integrated poultry production complex" /><figcaption><strong>ONE PLATFORM</strong><span>Scalable across poultry operations and markets</span></figcaption></figure></div></div>);

  if (slide.type === "qatar") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="qatar-grid">{[["NIL", "Antibiotics & reduced medication"], ["NIL", "Conventional disinfectants & sterilizers"], ["2.5%", "Mortality rate"], ["1.6–1.7 kg", "Average bird weight"], ["2.2 kg", "Average feed per bird"], ["25–27 DAYS", "Cycle time"]].map(([a, b], i) => <article className={`qatar-stat reveal q${i}`} key={b}><strong>{a}</strong><span>{b}</span></article>)}</div><p className="fineprint reveal">Operational results reported in the supplied presentation; no independent verification was provided.</p></div>);

  if (slide.type === "global") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="global-layout"><div className="map ghost reveal"><img src={slide.image} alt="World map" /></div><div className="region-list">{[["Europe", "Broad commercial acceptance"], ["United States", "Market presence and use cases"], ["Global", "Applications across multiple sectors"]].map(([a, b], i) => <article className="region reveal" key={a}><b>{i + 1}</b><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></div><div className="soft-thesis reveal">System selection and application remain subject to water quality, dosing requirements, capacity and local regulation.</div></div>);

  if (slide.type === "strategy") return <div className="strategy-layout"><div className="strategy-copy"><p className="eyebrow reveal">{slide.kicker}</p><h2 className="strategy-title reveal">Control the Water.<br />Control More of the Farm’s Risk.</h2><h3 className="reveal">Every bird drinks water. Every day.</h3><p className="lead reveal">That makes water one of the most powerful intervention points in poultry production.</p><div className="thesis reveal">BIOSECURITY + EFFICIENCY + COST CONTROL</div></div><div className="strategy-image reveal" style={{ backgroundImage: `url(${slide.image})` }} /></div>;

  return frame(<div className="split media-right"><div><h2 className="scene-title reveal">{slide.title}</h2><h3 className="subhead reveal">Evaluate the operational baseline</h3><div className="application-list compact">{assessment.map((x, i) => <div className={`application reveal ${i === 5 ? "accent" : ""}`} style={{ "--delay": `${i * 80}ms` } as React.CSSProperties} key={x}><b>✓</b><span>{x}</span></div>)}</div><div className="thesis reveal">FROM CLEANER WATER → SAFER OPERATIONS → BETTER POULTRY PERFORMANCE</div></div><figure className="photo reveal"><img src={slide.image} alt="Envirolyte poultry farm installation in Qatar" /><figcaption>Raseen Aqua Solutions • Doha, Qatar</figcaption></figure></div>);
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menu, setMenu] = useState(false);
  const [help, setHelp] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const touchStart = useRef<number | null>(null);
  const total = slides.length;
  const go = useCallback((n: number) => { setCurrent(Math.max(0, Math.min(total - 1, n))); setMenu(false); }, [total]);
  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);
  const progress = useMemo(() => `${((current + 1) / total) * 100}%`, [current, total]);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) { event.preventDefault(); next(); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); prev(); }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(total - 1);
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
      if (event.key === "Escape") { setMenu(false); setHelp(false); }
      if (event.key === "?") setHelp(true);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go, next, prev, total]);

  return (
    <div className={`presentation ${quiet ? "quiet" : ""}`} onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current == null) return; const d = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(d) > 55) d < 0 ? next() : prev(); touchStart.current = null; }}>
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <div className="deck" aria-live="polite">
        <div className="brand-rails" aria-hidden="true"><i /><i /><i /></div>
        {slides.map((slide, index) => <section key={slide.title} className={`scene ${index === current ? "active" : index < current ? "past" : "future"}`} aria-hidden={index !== current}><Scene slide={slide} index={index} /></section>)}
        <div className="progress"><i style={{ width: progress }} /></div>
        <nav className="controls" aria-label="Presentation controls">
          <button onClick={prev} disabled={current === 0} aria-label="Previous slide">←</button>
          <button className="counter" onClick={() => setMenu(true)} aria-label="Open slide menu"><b>{String(current + 1).padStart(2, "0")}</b><span>/ {String(total).padStart(2, "0")}</span></button>
          <button onClick={next} disabled={current === total - 1} aria-label="Next slide">→</button>
        </nav>
        <div className="utility">
          <button onClick={() => setQuiet(!quiet)} title="Toggle animation">{quiet ? "▶" : "◌"}</button>
          <button onClick={() => document.documentElement.requestFullscreen?.()} title="Fullscreen">⛶</button>
          <button onClick={() => setHelp(true)} title="Keyboard help">?</button>
        </div>
        <Dots count={total} active={current} />
      </div>
      {menu && <div className="overlay" role="dialog" aria-modal="true" aria-label="Slide navigator" onClick={() => setMenu(false)}><div className="drawer" onClick={(e) => e.stopPropagation()}><header><div><span>Presentation Navigator</span><h2>Envirolyte for Poultry</h2></div><button onClick={() => setMenu(false)}>×</button></header><div className="slide-menu">{slides.map((s, i) => <button key={s.title} onClick={() => go(i)} className={i === current ? "active" : ""}><b>{String(i + 1).padStart(2, "0")}</b><span><em>{s.kicker}</em>{s.title}</span></button>)}</div></div></div>}
      {help && <div className="overlay" role="dialog" aria-modal="true" aria-label="Presentation help" onClick={() => setHelp(false)}><div className="help-card" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setHelp(false)}>×</button><span className="eyebrow">CONTROLS</span><h2>Present with confidence</h2><div className="key-grid"><kbd>→</kbd><span>Next scene</span><kbd>←</kbd><span>Previous scene</span><kbd>Space</kbd><span>Advance</span><kbd>F</kbd><span>Full screen</span><kbd>Home</kbd><span>First scene</span><kbd>End</kbd><span>Last scene</span></div><p>Swipe left or right on touch screens. Click the slide counter to jump directly to any scene.</p></div></div>}
    </div>
  );
}
