import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import whiteLogoImg from "../assets/white_logo.png";
import Menu from "../components/Menu";

/* ── Static data maps ─────────────────────────────────── */
const CLIENTS  = ["Nike","Apple","Adidas","Sony","Netflix","Spotify","Tesla","Google","Chanel","Dior","Puma","Zara","LVMH","BMW","Airbnb"];
const YEARS    = [2025,2024,2025,2023,2025,2024,2024,2025,2023,2024,2025,2024,2023,2025,2024];
const SERVICES_MAP = {
    "Brand identity & print":  ["Brand Strategy","Logo Design","Print Collateral"],
    "Web design & motion":     ["UX/UI Design","Motion Graphics","Front-End Dev"],
    "Editorial & typography":  ["Art Direction","Typography","Layout Design"],
    "Spatial & installation":  ["Spatial Design","3D Visualisation","Installation"],
    "Digital campaign":        ["Campaign Strategy","Digital Design","Social Media"],
    "Art direction":           ["Art Direction","Photography","Creative Direction"],
    "UI/UX & product":         ["Product Design","UX Research","Prototyping"],
};
const OVERVIEW =
    "This project represents a bold exploration of identity through form and colour. " +
    "Working closely with the client, we developed a visual language that speaks to both " +
    "heritage and innovation — translating abstract ideas into a cohesive system that scales " +
    "seamlessly across every touchpoint.";

/* ── Helpers ──────────────────────────────────────────── */
const pick = (arr, seed) => arr[Math.abs(seed) % arr.length];
const seed = (str = "") => str.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

const Project = () => {
    const [project, setProject] = useState({ title: "Horizon", desc: "Brand identity & print", color: "hsl(210,60%,65%)" });
    const [vis, setVis]         = useState(false);

    useEffect(() => {
        const raw = localStorage.getItem("project");
        if (raw) setProject(JSON.parse(raw));
        const t = setTimeout(() => setVis(true), 60);
        return () => clearTimeout(t);
    }, []);

    const s        = seed(project.title);
    const client   = pick(CLIENTS,  s);
    const year     = pick(YEARS,    s);
    const services = SERVICES_MAP[project.desc] ?? ["Brand Strategy","Design","Development"];
    const num      = String((s % 15) + 1).padStart(2, "0");

    return (
        <div className={`project proj-page${vis ? " proj-vis" : ""}`}>

            {/* ══════════ LEFT — dark panel ══════════ */}
            <div className="project_left proj-left" data-cursor-light>

                {/* Back + logo */}
                <div className="proj-top">
                    <Link to="/projects" className="proj-back">
                        <span className="proj-back-arr">←</span>
                        <span>BACK</span>
                    </Link>
                    <img src={whiteLogoImg} alt="Leavingstone" className="proj-logo" />
                </div>

                {/* Title block */}
                <div className="proj-title-block">
                    <span className="proj-num">{num}</span>
                    <div className="proj-title-clip">
                        <h1 className="proj-title">{project.title}</h1>
                    </div>
                    <p className="proj-cat">{project.desc}</p>
                </div>

                {/* Meta */}
                <div className="proj-meta">
                    {[
                        { label: "Year",    value: year },
                        { label: "Client",  value: client },
                    ].map(({ label, value }, i) => (
                        <div key={label} className="proj-meta-row" style={{ animationDelay: `${0.35 + i * 0.1}s` }}>
                            <span className="proj-meta-label">{label}</span>
                            <span className="proj-meta-value">{value}</span>
                        </div>
                    ))}

                    <div className="proj-meta-row" style={{ animationDelay: "0.55s" }}>
                        <span className="proj-meta-label">Services</span>
                        <div className="proj-tags">
                            {services.map(s => (
                                <span key={s} className="proj-tag">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Color swatch + menu */}
                <div className="proj-foot">
                    <div className="proj-swatch">
                        <div className="proj-swatch-inner" style={{ background: project.color }} />
                        <span className="proj-swatch-label">{project.color}</span>
                    </div>
                    <Menu />
                </div>
            </div>

            {/* ══════════ RIGHT — light panel ══════════ */}
            <div className="project_right proj-right">

                {/* Hero colour block */}
                <div className="proj-hero">
                    <div className="proj-hero-fill" style={{ background: project.color }} />
                    <div className="proj-hero-overlay" />
                    <span className="proj-hero-title">{project.title.toUpperCase()}</span>
                    <span className="proj-hero-year">{year}</span>
                </div>

                {/* Overview */}
                <section className="proj-section">
                    <span className="proj-section-eye">01 — OVERVIEW</span>
                    <p className="proj-overview">{OVERVIEW}</p>
                </section>

                {/* Duo tint blocks */}
                <div className="proj-duo">
                    <div className="proj-duo-block" style={{ background: project.color, opacity: 0.75 }} />
                    <div className="proj-duo-block" style={{ background: project.color, opacity: 0.38 }} />
                </div>

                {/* Deliverables */}
                <section className="proj-section">
                    <span className="proj-section-eye">02 — DELIVERABLES</span>
                    <div className="proj-deliverables">
                        {services.map((sv, i) => (
                            <div key={sv} className="proj-dlv">
                                <span className="proj-dlv-num">{String(i + 1).padStart(2, "0")}</span>
                                <span className="proj-dlv-name">{sv}</span>
                                <span className="proj-dlv-line" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Full-bleed footer block */}
                <div className="proj-bleed" style={{ background: project.color }} >
                    <span className="proj-bleed-label">{client} × Leavingstone — {year}</span>
                </div>

            </div>
        </div>
    );
};

export default Project;
