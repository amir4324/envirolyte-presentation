"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type React from "react";

type Slide = {
  kicker: string;
  title: string;
  type: string;
  image?: string;
  images?: string[];
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const slides: Slide[] = [
  { kicker: "Poultry Industry", title: "A Complete Water Treatment & Disinfection Solution for the Poultry Industry", type: "cover", image: "/images/cover-chickens.jpg" },
  { kicker: "The Challenge", title: "Disease Is Not Only a Health Problem — It Is a Business Problem", type: "challenge", image: "/images/poultry-biosecurity-inspection.png" },
  { kicker: "The Gap", title: "Traditional Disinfection Solves Isolated Problems. Farms Need a Complete System.", type: "journey" },
  { kicker: "The Strategic Message", title: "Control the Water. Control More of the Farm’s Risk.", type: "strategy", image: "/images/qatar-chicks.png" },
  { kicker: "Safety & Sustainability", title: "Powerful Against Microorganisms. Designed for Safer Operations.", type: "safety" },
  { kicker: "The Solution", title: "Envirolyte Extends Water Treatment Into Farm-Wide Biosecurity", type: "solution", image: "/images/envirolyte-system.png" },
  { kicker: "Across the Farm", title: "One Technology. Multiple Poultry Applications.", type: "applications", image: "/images/poultry-sanitation-misting.png" },
  { kicker: "How It Works", title: "Generated On-Site Using Only Salt, Water & Electricity", type: "process" },
  { kicker: "System Advantages", title: "Why the Envirolyte System Is Built for Poultry Operations", type: "system-benefits" },
  { kicker: "System Outputs", title: "Two Electrolyzed Solutions. Two Different Functions.", type: "outputs" },
  { kicker: "Anolyte Advantages", title: "A High-Performance Disinfection Solution Generated Fresh On-Site", type: "anolyte-benefits" },
  { kicker: "Business Case", title: "This Is More Than Disinfection — It Is an Operational Cost Decision", type: "business" },
  { kicker: "Assessment & Rollout", title: "Start With an Assessment of Your Farm", type: "assessment", image: "/images/farm-assessment-team.png" },
  { kicker: "Qatar Results — As Reported", title: "What Did the Farm Achieve?", type: "qatar" },
  { kicker: "Completed Projects in Qatar", title: "Poultry Farm — Operating Outcomes in Qatar", type: "qatar-poultry-project", images: ["/images/qatar-poultry-farm-unit.jpeg", "/images/qatar-poultry-farm-tanks.jpeg"] },
  { kicker: "International accreditations", title: "International accreditations", type: "accreditations" },
  { kicker: "Local accreditations", title: "ACES and Qatar University", type: "local-accreditations" },
  { kicker: "International Poultry References", title: "Selected Poultry References & Field Case Studies", type: "references" },
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
const accreditations = [
  { code: "ISO", title: "ISO 9001:2015", description: "Quality management system", tone: "navy", links: [["Open ISO certificate ↗", "/accreditations/iso-9001-2015.jpeg"]] },
  { code: "EPA", title: "EPA", description: "U.S. Environmental Protection Agency", tone: "green", links: [["Open EPA approval ↗", "/accreditations/envirolyte-epa-approval.pdf"]] },
  { code: "FDA", title: "FDA", description: "U.S. Food and Drug Administration", tone: "amber", links: [["Open FDA letter ↗", "/accreditations/fda-letter.jpeg"]] },
  { code: "NSF", title: "NSF", description: "Water health and safety standards", tone: "navy", links: [["Company document ↗", "/accreditations/nsf-ansi-61-company.jpeg"], ["Tallinn facility ↗", "/accreditations/nsf-ansi-61-tallinn.jpeg"]] },
  { code: "ECHA", title: "ECHA", description: "European Chemicals Agency", tone: "green", links: [["Open ECHA document ↗", "/accreditations/echa-approval-2016.pdf"]] },
];
const poultryCaseStudies = [
  { country: "Holland", client: "Alfons Weerink", flock: "60,000 mother hens", unit: "EL400", installed: "December 2012", dosing: "3% in drinking water", source: "/references/weerink-netherlands.pdf" },
  { country: "Germany", client: "P & P Farmbetrieb Doetlingen", flock: "61,000 mother hens", unit: "EL900", installed: "November 2011", dosing: "2.5% in drinking water", source: "/references/doetlingen-germany.pdf" },
  { country: "Canada", client: "Starlite Colony", flock: "30,000 meat turkeys", unit: "EL6000", installed: "April 2007", dosing: "3% in drinking water", result: "Reported: 1% total mortality; acid and other chemicals reduced to zero.", source: "/references/starlite-canada-turkey-farm.pdf" },
];
const poultryReferences = [
  ["Cocorico", "Switzerland", "2009", "Layers"],
  ["Geflügelhof Weber", "Germany", "2016", "Layers"],
  ["Mosterd Poultry Farms Ltd.", "Canada", "2008", "Broilers"],
  ["ELTKAWI Poultry Farm", "Qatar", "2019", "Broilers"],
];

function Dots({ count, active }: { count: number; active: number }) {
  return <div className="mini-dots" aria-hidden="true">{Array.from({ length: count }, (_, i) => <span key={i} className={i === active ? "on" : ""} />)}</div>;
}

function Scene({ slide, index }: { slide: Slide; index: number }) {
  const slideImage = slide.image ? asset(slide.image) : undefined;
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
        <div className="cover-partners reveal" aria-label="Envirolyte and Raseen Aqua Solutions">
          <div className="partner-card envirolyte-partner"><img src={asset("/images/envirolyte-logo.png")} alt="Envirolyte" /></div>
          <div className="partner-card raseen-partner"><img src={asset("/images/raseen-logo.jpeg")} alt="Raseen Aqua Solutions logo" /><span>RASEEN AQUA SOLUTIONS</span></div>
        </div>
        <p className="eyebrow cover-industry reveal">Poultry Industry</p>
        <h1 className="hero-title reveal">A Complete Water Treatment &amp; Disinfection Solution for the Poultry Industry</h1>
        <div className="cover-pillars reveal" aria-label="Core solution areas">
          <span>Sterilization &amp; Disinfection</span>
          <span>Water Purification</span>
        </div>
        <p className="cover-support reveal">For safer operations, healthier birds, and better farm performance.</p>
      </div>
      <div className="cover-image" style={{ backgroundImage: `url(${slideImage})` }}><div className="water-glow" /></div>
    </div>
  );

  if (slide.type === "challenge") return frame(<div className="split media-right"><div className="copy-block"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Diseases and infections create compounding operational pressure across every production cycle.</p><div className="issue-list">{benefits.map(([n, a, b], i) => <div className="issue reveal" key={a} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}><b>{n}</b><strong>{a}</strong><span>{b}</span></div>)}</div></div><figure className="photo reveal"><img src={slideImage} alt="Worker disinfecting a poultry barn" /></figure></div>);

  if (slide.type === "journey") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Effective biosecurity must cover the entire contamination journey — not one chemical or one location.</p><div className="journey journey-six">{[["Water", "Daily intake"], ["Barns", "Living environment"], ["Equipment", "Contact surfaces"], ["Workers", "Movement & hygiene"], ["Vehicles", "Farm access"], ["Chillers", "Cooling units"]].map(([a, b], i) => <div className="journey-node reveal" key={a} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}><b>{i + 1}</b><strong>{a}</strong><span>{b}</span></div>)}</div><div className="thesis reveal">One weak point can reintroduce risk across the full operation.</div></div>);

  if (slide.type === "solution") return frame(<div className="split media-right"><div className="copy-block"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A comprehensive, eco-conscious and cost-focused program — generated on site and applied where the farm needs it.</p><ul className="check-list">{["Drinking water treatment", "Barn cleaning and disinfection", "Microbial control", "Farm sanitation", "Eliminate the use of conventional chemical disinfectants"].map((x, i) => <li className="reveal" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} key={x}>{x}</li>)}</ul></div><figure className="photo equipment reveal"><img src={slideImage} alt="Envirolyte generation equipment" /></figure></div>);

  if (slide.type === "applications") return frame(<div className="split media-right"><div><h2 className="scene-title reveal">{slide.title}</h2><div className="application-list">{apps.map((x, i) => <div className="application reveal" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties} key={x}><b>{i + 1}</b><span>{x}</span></div>)}</div></div><figure className="photo reveal"><img src={slideImage} alt="Poultry sanitation misting application" /></figure></div>);

  if (slide.type === "process") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A conditioned brine solution passes through a diaphragmatic electrolysis cell to create fresh active solutions close to the point of use.</p><div className="process">{[["Water", "Conditioned feed"], ["Salt", "Sodium chloride brine"], ["Electricity", "Controlled current"], ["Envirolyte", "Diaphragmatic cell"], ["Anolyte", "Disinfection solution"]].map(([a, b], i) => <article className="process-step reveal" key={a} style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}><em>{String(i + 1).padStart(2, "0")}</em><strong>{a}</strong><span>{b}</span></article>)}</div><div className="soft-thesis reveal">Fresh generation on demand reduces reliance on transported and stored disinfectants.</div></div>);

  if (slide.type === "system-benefits") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">A scalable generation platform designed to simplify supply, dosing and operational hygiene across the farm.</p><div className="benefit-matrix">{[
    ["01", "On-Site Generation", "Uses only salt, water and electricity."],
    ["02", "Fresh On Demand", "Produces active solution close to the point of use."],
    ["03", "Automated Control", "Supports controlled dosing and repeatable operation."],
    ["04", "Scalable Capacity", "System capacity can be matched to farm demand."],
    ["05", "Reduced Logistics", "Cuts dependence on transported and stored disinfectants."],
    ["06", "One Farm Platform", "Supports water, cleaning, disinfection, fogging and chillers."],
  ].map(([n, a, b], i) => <article className="benefit-tile reveal" key={a} style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}><b>{n}</b><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></div>);

  if (slide.type === "outputs") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="solution-pair"><article className="solution-card aqua reveal"><div className="round-icon">A</div><h3>ANOLYTE</h3><b>DISINFECTION</b><p>Oxidizing solution used for microbial control, water treatment and sanitation.</p><small>Broad-spectrum germicidal function</small></article><article className="solution-card green reveal"><div className="round-icon">C</div><h3>CATHOLYTE</h3><b>CLEANING &amp; DEGREASING</b><p>Alkaline reducing solution used for washing, cleaning support and process applications.</p><small>Detergent / degreasing function</small></article></div></div>);

  if (slide.type === "anolyte-benefits") return frame(<div className="anolyte-benefits-slide"><h2 className="scene-title reveal">{slide.title}</h2><p className="lead reveal">Anolyte combines fast microbial control with practical farm-wide application and fresh on-site availability.</p><div className="anolyte-layout"><div className="anolyte-core reveal"><span>ANOLYTE</span><strong>ACTIVE<br />DISINFECTION</strong><small>Generated fresh where it is needed</small></div><div className="anolyte-points">{[
    ["Broad-Spectrum Control", "Targets bacteria, viruses and fungi."],
    ["Rapid Action", "Delivers fast disinfection at practical dosing levels."],
    ["Water & Surface Use", "Suitable for drinking systems and sanitation programs."],
    ["Biofilm Support", "Helps control contamination inside water lines."],
    ["Low Residue Burden", "Reduces reliance on persistent conventional chemicals."],
    ["Fresh Availability", "Produced on demand without routine chemical deliveries."],
  ].map(([a, b], i) => <article className="anolyte-point reveal" key={a} style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}><b>{i + 1}</b><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></div></div>);

  if (slide.type === "business") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="business-pair"><article className="model old reveal"><h3>CONVENTIONAL CHEMICAL MODEL</h3><div className="model-flow">Purchase → Transport → Store → Handle → Repeat</div><ul><li>Transport &amp; storage burden</li><li>Leak and handling exposure</li><li>Cost tied to recurring purchases</li></ul></article><article className="model new reveal"><h3>ENVIROLYTE MODEL</h3><div className="model-flow">Generate On-Site → Dose → Use When Needed</div><ul><li>Low generation cost</li><li>Reduced transportation</li><li>Potentially steadier cost structure</li></ul></article></div></div>);

  if (slide.type === "assessment") return frame(<div className="assessment-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="assessment-layout"><div><h3 className="subhead reveal">Evaluate the operational baseline</h3><div className="application-list compact">{assessment.map((x, i) => <div className={`application reveal ${i === 5 ? "accent" : ""}`} style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={x}><b>✓</b><span>{x}</span></div>)}</div><div className="thesis reveal">FROM CLEANER WATER → SAFER OPERATIONS → BETTER POULTRY PERFORMANCE</div></div><figure className="photo assessment-photo reveal"><img src={slideImage} alt="Team assessing poultry farm water treatment and sanitation requirements" /><figcaption>Assessment connects site conditions to the right treatment program</figcaption></figure></div></div>);

  if (slide.type === "safety") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="safety-grid">{[["Safety", "Simple handling\nNon-hazardous operation"], ["Environment", "Lower environmental impact\n100% biodegradable*"], ["Performance", "Fast-acting biocide\nLonger residual effect"], ["Simplicity", "Generated on site\nUsed when needed"]].map(([a, b], i) => <article className="safety-item reveal" key={a}><b>{i + 1}</b><h3>{a}</h3><p>{b}</p></article>)}</div><div className="thesis reveal">Fast-acting • Powerful biocide • Simple to handle • Non-toxic* • Environmentally friendly*</div><p className="fineprint reveal">*As described in the supplied material; application and regulatory requirements should be validated locally.</p></div>);

  if (slide.type === "references") return frame(<div className="references-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="references-content"><div className="case-study-grid">{poultryCaseStudies.map((item, i) => <article className={`case-study reveal ${i === 2 ? "featured" : ""}`} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} key={item.client}><div className="case-study-head"><span>{item.country}</span><b>{item.unit}</b></div><h3>{item.client}</h3><strong>{item.flock}</strong><dl><div><dt>Installed</dt><dd>{item.installed}</dd></div><div><dt>Dosing</dt><dd>{item.dosing}</dd></div></dl>{item.result && <p className="case-result">{item.result}</p>}<a href={asset(item.source)} target="_blank" rel="noopener noreferrer">Open case study ↗</a></article>)}</div><div className="reference-photo-grid reveal" aria-label="Supplied poultry installation photos"><a href={asset("/images/poultry-reference-equipment-room.jpeg")} target="_blank" rel="noopener noreferrer"><img src={asset("/images/poultry-reference-equipment-room.jpeg")} alt="Envirolyte equipment and treatment vessels in an installation room" /><span>Installed treatment equipment</span></a><a href={asset("/images/poultry-reference-farm-site.jpeg")} target="_blank" rel="noopener noreferrer"><img src={asset("/images/poultry-reference-farm-site.jpeg")} alt="Poultry farm site and installed Envirolyte equipment" /><span>Farm site and installation</span></a></div></div><div className="reference-strip reveal"><div className="reference-strip-head"><strong>Additional poultry references</strong><a href={asset("/references/poultry-reference-list.jpeg")} target="_blank" rel="noopener noreferrer">Open supplied reference list ↗</a></div><div className="reference-list">{poultryReferences.map(([client, country, year, sector]) => <div className="reference-item" key={client}><b>{client}</b><span>{country}</span><span>{year}</span><strong>{sector}</strong></div>)}</div></div><p className="fineprint reveal">Installation and outcome details are reproduced from the supplied case materials; no independent verification was provided.</p></div>);

  if (slide.type === "qatar") return frame(<div className="qatar-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="qatar-layout"><figure className="qatar-video-wrap reveal"><video className="qatar-video" controls playsInline preload="metadata"><source src={asset("/Video/WhatsApp Video 2026-08-13 at 4.41.49 PM.mp4")} type="video/mp4" />Your browser does not support the video element.</video><figcaption>Qatar poultry operations • Supplied project video</figcaption></figure><div className="qatar-grid">{[["NIL", "Antibiotics & reduced medication"], ["NIL", "Conventional disinfectants & sterilizers"], ["2.5%", "Mortality rate"], ["1.6–1.7 kg", "Average bird weight"], ["2.2 kg", "Average feed per bird"], ["25–27 DAYS", "Cycle time"]].map(([a, b], i) => <article className={`qatar-stat reveal q${i}`} key={b}><strong>{a}</strong><span>{b}</span></article>)}</div></div><p className="fineprint reveal">Operational results reported in the supplied presentation; no independent verification was provided.</p></div>);

  if (slide.type === "qatar-poultry-project") return frame(<div className="poultry-project-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="poultry-project-layout"><div className="poultry-project-gallery reveal">{slide.images?.map((image, i) => <a className="poultry-project-photo" href={asset(image)} target="_blank" rel="noopener noreferrer" key={image}><img src={asset(image)} alt={i === 0 ? "Envirolyte on-site production unit installed at a poultry farm in Qatar" : "Envirolyte equipment and tank connections at a poultry farm in Qatar"} /><span>{i === 0 ? "On-site production unit" : "Equipment and tank connections"}</span></a>)}</div><div className="poultry-project-copy"><span className="project-status reveal">COMPLETED PROJECT • QATAR</span><p className="project-intro reveal">Reported operating outcomes after system implementation:</p><ul className="poultry-project-results">{[<>Operation under intensive rearing conditions.</>, <><strong>50%</strong> lower mortality rate.</>, <><strong>70%</strong> less medication use.</>, <>Improved chick vigor, with livelier and more robust birds.</>, <>Better feed utilization, faster weight gain, and fewer days on feed.</>].map((item, i) => <li className="reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={i}>{item}</li>)}</ul><p className="fineprint">Results are reproduced from the supplied project material and apply to this reported case; no independent verification was provided.</p></div></div></div>);

  if (slide.type === "accreditations") return frame(<div className="accreditations-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="accreditation-grid" aria-label="International accreditations">{accreditations.map((item, i) => <article className={`accreditation-card ${item.tone} reveal`} style={{ "--delay": `${i * 75}ms` } as React.CSSProperties} key={item.code}><span className="accreditation-mark">{item.code}</span><div className="accreditation-copy"><h3>{item.title}</h3><p>{item.description}</p></div><div className="accreditation-links">{item.links.map(([label, href]) => <a href={asset(href)} target="_blank" rel="noopener noreferrer" key={href}>{label}</a>)}</div></article>)}</div></div>);

  if (slide.type === "local-accreditations") return frame(<div className="local-accreditations-slide"><h2 className="scene-title reveal">{slide.title}</h2><div className="local-accreditation-grid" aria-label="Local accreditations and tests"><a className="local-accreditation-doc reveal" href={asset("/accreditations/aces-lab-report.pdf")} target="_blank" rel="noopener noreferrer"><img src={asset("/accreditations/aces-lab-report.png")} alt="ACES laboratory test report" /><strong>ACES test report</strong><span>Microbiological effectiveness of Anolyte</span><small>Open the original document ↗</small></a><a className="local-accreditation-doc reveal" href={asset("/accreditations/qatar-university-engineering.pdf")} target="_blank" rel="noopener noreferrer"><img src={asset("/accreditations/qatar-university-engineering.png")} alt="Qatar University College of Engineering letter" /><strong>Qatar University — College of Engineering</strong><span>Laboratory trials on ANOX solution</span><small>Open the original document ↗</small></a></div><div className="local-accreditation-summary reveal"><strong>Local test and review evidence supporting technical evaluation in Qatar.</strong><span>Each document should be read according to its scope, date and stated test conditions.</span></div></div>);

  if (slide.type === "global") return frame(<div><h2 className="scene-title reveal">{slide.title}</h2><div className="global-layout"><div className="map ghost reveal"><img src={slideImage} alt="World map" /></div><div className="region-list">{[["Europe", "Broad commercial acceptance"], ["United States", "Market presence and use cases"], ["Global", "Applications across multiple sectors"]].map(([a, b], i) => <article className="region reveal" key={a}><b>{i + 1}</b><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></div><div className="soft-thesis reveal">System selection and application remain subject to water quality, dosing requirements, capacity and local regulation.</div></div>);

  if (slide.type === "strategy") return <div className="strategy-layout"><div className="strategy-copy"><p className="eyebrow reveal">{slide.kicker}</p><h2 className="strategy-title reveal">Control the Water.<br />Control More of the Farm’s Risk.</h2><h3 className="reveal">Every bird drinks water. Every day.</h3><p className="lead reveal">That makes water one of the most powerful intervention points in poultry production.</p><div className="thesis reveal">BIOSECURITY + EFFICIENCY + COST CONTROL</div></div><div className="strategy-image reveal" style={{ backgroundImage: `url(${slideImage})` }} /></div>;

  return null;
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
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, input, select, textarea, video")) return;
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
