import Menu from "../components/Menu";
import { useEffect, useRef, useState } from "react";
import whiteLogoImg from "../assets/white_logo.png";
import logoImg      from "../assets/Screenshot 2026-03-11 112834.png";
import resImg       from "../assets/res.png";
import creditImg    from "../assets/credit.png";

const AWARDS = [
    { title: "Cannes Lions — Gold",            org: "Cannes Lions International",  medal: "gold"   },
    { title: "D&AD — Yellow Pencil",           org: "D&AD Awards",                 medal: "gold"   },
    { title: "Red Dot — Best of the Best",     org: "Red Dot Design Award",        medal: "gold"   },
    { title: "One Show — Gold Pencil",         org: "The One Club",                medal: "gold"   },
    { title: "Clio Awards — Gold",             org: "Clio Awards",                 medal: "gold"   },
    { title: "Webby Award — Winner",           org: "The Webby Awards",            medal: "silver" },
    { title: "ADC — Silver Cube",              org: "Art Directors Club",          medal: "silver" },
    { title: "TDC — Certificate",              org: "Type Directors Club",         medal: "silver" },
    { title: "AIAP — Silver",                  org: "AIAP World Design Awards",    medal: "silver" },
    { title: "Effie — Silver",                 org: "Effie Worldwide",             medal: "silver" },
    { title: "Cannes Lions — Silver",          org: "Cannes Lions International",  medal: "silver" },
    { title: "D&AD — Graphite Pencil",         org: "D&AD Awards",                medal: "bronze" },
    { title: "Red Dot — Honourable Mention",   org: "Red Dot Design Award",       medal: "bronze" },
    { title: "One Show — Merit",               org: "The One Club",               medal: "bronze" },
    { title: "Clio Awards — Bronze",           org: "Clio Awards",                medal: "bronze" },
    { title: "Eurobest — Bronze",              org: "Eurobest Awards",            medal: "bronze" },
    { title: "EPICA — Bronze",                 org: "EPICA Awards",               medal: "bronze" },
    { title: "LIA — Shortlist",                org: "London International Awards", medal: "bronze" },
    { title: "Spikes Asia — Shortlist",        org: "Spikes Asia",                medal: "bronze" },
    { title: "FIAP — Ibero-American Silver",   org: "FIAP Awards",                medal: "silver" },
];

const MEDAL_COLORS = { gold: "#c9a84c", silver: "#9aa4b0", bronze: "#b07242" };

const IMG_COLORS = [
    "#e8d5b0","#b5c9d4","#d4b5c9","#c9d4b5","#b5b5d4",
    "#d4c9b5","#b5d4c9","#d4b5b5","#c9b5d4","#b5d4b5",
    "#d4d4b5","#b5c9b5","#d4b5d4","#c9d4d4","#b5b5c9",
    "#d4c9c9","#c9c9b5","#b5d4d4","#d4b5c9","#c9b5b5",
];

const INFO_GROUPS = [
    { label: "Client",   lines: ["Efes Georgia", "International Brewing Group"] },
    { label: "Services", lines: ["Brand Identity", "Motion Design", "Art Direction", "Print & Packaging"] },
    { label: "Year",     lines: ["2016", "Spring Campaign"] },
    { label: "Awards",   lines: ["Red Dot — Honourable Mention", "D&AD Shortlist", "Cannes Lions Bronze"] },
];

// Animate an element: fade + slide from given direction
const animateIn = (el, { delay = 0, fromX = 0, fromY = 0 } = {}) => {
    if (!el) return;
    el.style.opacity   = "0";
    el.style.transform = `translate(${fromX}px, ${fromY}px)`;
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity   = "1";
        el.style.transform = "translate(0,0)";
    }));
};

const Project = () => {
    const project = JSON.parse(localStorage.getItem("project") || "{}");
    const { title = "", desc = "", color = "#888" } = project;

    const logoRef    = useRef(null);
    const h1TealRef  = useRef(null);
    const h1Ref      = useRef(null);
    const dateRef    = useRef(null);
    const descRef    = useRef(null);
    const imgRef     = useRef(null);
    const cubeRef    = useRef(null);
    const gridRef    = useRef(null);
    const groupsRef      = useRef([]);
    const threeRef       = useRef(null);
    const awardsRef      = useRef([]);
    const awardsSectionRef = useRef(null);
    const rightRef         = useRef(null);
    const darkTriggerRef   = useRef(null);
    const creditRowsRef    = useRef([]);
    const creditTitleRef   = useRef(null);
    const creditImgRef     = useRef(null);
    const [dark, setDark]   = useState(false);
    const [sweep, setSweep] = useState(null); // null | 'in' | 'out'
    const prevDark          = useRef(null);

    useEffect(() => {
        // Left column — staggered slide from left
        animateIn(logoRef.current,   { delay: 0.0,  fromX: -30 });
        animateIn(h1TealRef.current, { delay: 0.15, fromX: -30 });
        animateIn(h1Ref.current,     { delay: 0.25, fromX: -30 });
        animateIn(dateRef.current,   { delay: 0.35, fromX: -30 });
        animateIn(descRef.current,   { delay: 0.42, fromX: -30 });
        animateIn(imgRef.current,    { delay: 0.5,  fromX: -30 });

        // Cube — scale + fade in
        const cube = cubeRef.current;
        if (cube) {
            cube.style.opacity   = "0";
            cube.style.transform = "scale(0.92)";
            cube.style.transition = "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s";
            requestAnimationFrame(() => requestAnimationFrame(() => {
                cube.style.opacity   = "1";
                cube.style.transform = "scale(1)";
            }));
        }

        // Grid border line — fade in
        animateIn(gridRef.current, { delay: 0.55, fromY: 10 });

        // Info groups — stagger up
        groupsRef.current.forEach((el, i) => {
            animateIn(el, { delay: 0.65 + i * 0.1, fromY: 22 });
        });

        const three  = threeRef.current;
        const right  = rightRef.current;
        const awards = awardsSectionRef.current;
        if (!three || !right) return;

        // Set awards initially hidden below
        if (awards) {
            awards.style.opacity   = "0";
            awards.style.transform = "translateY(60px)";
            awards.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)";
        }

        // Drive awards reveal based on horizontal scroll progress
        const updateAwards = () => {
            if (!awards) return;
            const max      = three.scrollWidth - three.clientWidth;
            const progress = max > 0 ? three.scrollLeft / max : 0;
            const ty       = 60 - progress * 60;
            const op       = progress;
            awards.style.transform  = `translateY(${ty}px)`;
            awards.style.opacity    = `${op}`;
            awards.style.transition = "none"; // instant follow during scroll
        };

        three.addEventListener("scroll", updateAwards, { passive: true });

        // Wheel hijack — listen on project_right
        const onWheel = (e) => {
            const threeRect  = three.getBoundingClientRect();
            const rightRect  = right.getBoundingClientRect();
            const threeVisible = threeRect.top < rightRect.bottom && threeRect.bottom > rightRect.top;

            if (!threeVisible) return;

            const atStart = three.scrollLeft <= 0;
            const atEnd   = three.scrollLeft + three.clientWidth >= three.scrollWidth - 1;

            // Scrolling up & at start, or down & at end → release to vertical
            if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) {
                // Restore awards smooth transition when releasing
                if (awards) awards.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)";
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            three.scrollLeft += e.deltaY * 1.5;
        };

        right.addEventListener("wheel", onWheel, { passive: false });

        // Individual award rows stagger in once awards section is fully revealed
        const rowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const i  = Number(el.dataset.awardIdx);
                    el.style.transition = `opacity 0.5s ease ${i * 0.035}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.035}s`;
                    el.style.opacity    = "1";
                    el.style.transform  = "translateY(0)";
                    rowObserver.unobserve(el);
                }
            });
        }, { root: right, threshold: 0.1 });

        awardsRef.current.forEach(el => {
            if (!el) return;
            el.style.opacity   = "0";
            el.style.transform = "translateY(30px)";
            rowObserver.observe(el);
        });

        // Dark mode trigger — fires when sentinel scrolls into view
        const darkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => setDark(entry.isIntersecting));
        }, { root: right, threshold: 0 });

        if (darkTriggerRef.current) darkObserver.observe(darkTriggerRef.current);

        return () => {
            right.removeEventListener("wheel", onWheel);
            three.removeEventListener("scroll", updateAwards);
            rowObserver.disconnect();
            darkObserver.disconnect();
        };
    }, []);

    // Curtain sweep whenever dark mode toggles (skip very first render)
    useEffect(() => {
        if (prevDark.current === null) { prevDark.current = dark; return; }
        prevDark.current = dark;
        setSweep('in');
        const t1 = setTimeout(() => setSweep('out'), 420);
        const t2 = setTimeout(() => setSweep(null),  900);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [dark]);

    // Staggered animations whenever dark mode toggles
    useEffect(() => {
        const targets = [
            logoRef.current,
            h1TealRef.current,
            h1Ref.current,
            dateRef.current,
            descRef.current,
            imgRef.current,
        ].filter(Boolean);

        targets.forEach((el, i) => {
            el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`;
            el.style.opacity    = "0";
            el.style.transform  = "translateY(12px)";

            setTimeout(() => {
                el.style.opacity   = "1";
                el.style.transform = "translateY(0)";
            }, 30 + i * 60);
        });

        // Stagger info groups
        groupsRef.current.forEach((el, i) => {
            if (!el) return;
            el.style.transition = `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.07}s`;
            el.style.opacity    = "0";
            el.style.transform  = "translateY(10px)";
            setTimeout(() => {
                el.style.opacity   = "1";
                el.style.transform = "translateY(0)";
            }, 100 + i * 70);
        });

        // Stagger award rows
        awardsRef.current.forEach((el, i) => {
            if (!el) return;
            el.style.transition = `opacity 0.45s ease ${i * 0.025}s, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 0.025}s`;
            el.style.opacity    = "0";
            el.style.transform  = "translateX(20px)";
            setTimeout(() => {
                el.style.opacity   = "1";
                el.style.transform = "translateX(0)";
            }, i * 25);
        });

        // Credit image — scale + fade
        const cImg = creditImgRef.current;
        if (cImg) {
            cImg.style.transition = "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s";
            cImg.style.opacity    = "0";
            cImg.style.transform  = "scale(0.94)";
            setTimeout(() => {
                cImg.style.opacity   = "1";
                cImg.style.transform = "scale(1)";
            }, 80);
        }

        // Credit title label — slide from left
        const cTitle = creditTitleRef.current;
        if (cTitle) {
            cTitle.style.transition = "opacity 0.5s ease 0.15s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s";
            cTitle.style.opacity    = "0";
            cTitle.style.transform  = "translateX(-16px)";
            setTimeout(() => {
                cTitle.style.opacity   = "1";
                cTitle.style.transform = "translateX(0)";
            }, 120);
        }

        // Credit rows — stagger slide from right, alternating sides
        creditRowsRef.current.forEach((el, i) => {
            if (!el) return;
            const fromX = i % 2 === 0 ? 24 : -24;
            el.style.transition = `opacity 0.5s ease ${0.18 + i * 0.055}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.18 + i * 0.055}s`;
            el.style.opacity    = "0";
            el.style.transform  = `translateX(${fromX}px)`;
            setTimeout(() => {
                el.style.opacity   = "1";
                el.style.transform = "translateX(0)";
            }, 140 + i * 50);
        });
    }, [dark]);

    const T = "background-color 0.9s cubic-bezier(0.22,1,0.36,1), color 0.9s cubic-bezier(0.22,1,0.36,1), border-color 0.9s ease";

    const SWEEP_BG = dark ? "#1f1f1f" : "#fff";

    return (
        <>
        {sweep && (
            <div style={{
                position:        "fixed",
                inset:           0,
                zIndex:          99998,
                backgroundColor: SWEEP_BG,
                animation:       sweep === 'in'
                    ? "panel-enter 420ms cubic-bezier(0.16,1,0.3,1) both"
                    : "panel-exit  480ms cubic-bezier(0.42,0,0.58,1) both",
                pointerEvents:   "none",
            }} />
        )}
        <div className="w-full h-full flex items-stretch max-md:flex-col max-md:h-auto max-md:min-h-[100dvh] max-md:overflow-visible" {...(dark ? { "data-cursor-light": true } : {})} style={{
            backgroundColor: dark ? "#1f1f1f" : "#fff",
            color:           dark ? "#fff"    : "#111",
            transition:      T,
        }}>
            <div className="h-full w-[30%] p-5 max-lg:w-[34%] max-md:w-full max-md:h-auto max-md:px-[16px] max-md:py-[12px] max-md:sticky max-md:top-0 max-md:z-20 max-md:border-b max-md:border-[rgba(0,0,0,0.08)] max-md:flex max-md:flex-row max-md:items-center max-md:gap-[14px]" style={{
                backgroundColor: dark ? "#1f1f1f" : "#fff",
                transition:      T,
            }}>
                <div ref={logoRef} className="w-[47%] max-md:flex-shrink-0">
                    <img className="w-full h-auto block max-md:w-[36px]" src={dark ? whiteLogoImg : logoImg} alt="" />
                </div>

                <div className="mt-[50px] max-md:mt-0 max-md:flex-1 max-md:min-w-0">
                    <h1 ref={h1TealRef} style={{ fontSize: "30px", fontWeight: 700, color: "rgb(41, 152, 154)" }}>
                        EFES GEORGIA
                    </h1>
                    <h1 ref={h1Ref} className="text-[45px] font-bold max-lg:text-[34px] max-md:text-[20px] max-sm:text-[18px]" style={{ color: dark ? "#fff" : "#111", transition: T }}>{title}</h1>

                    <p ref={dateRef} className="mt-5 max-md:text-[12px]" style={{ color: dark ? "#aaa" : "#555", transition: T }}>12/06/2016</p>
                    <p ref={descRef} className="mt-5 max-md:text-[12px]" style={{ color: dark ? "#ccc" : "#111", transition: T }}>{desc}</p>

                    <img
                        ref={imgRef}
                        className="w-[45%] mt-10 pb-[70px] max-md:hidden"
                        src={resImg}
                        alt=""
                    />

                    <div className="max-md:hidden">
                        <Menu />
                    </div>
                </div>
            </div>

            <div ref={rightRef} className="w-[70%] h-full overflow-y-scroll [scrollbar-width:none] p-5 max-lg:w-[66%] max-md:w-full max-md:h-auto max-md:overflow-y-visible max-md:px-[16px] max-md:py-[14px]">
                <div
                    ref={cubeRef}
                    data-cursor-play
                    style={{ backgroundColor: color }}
                    className="w-full h-[80%] max-lg:h-[55vh] max-md:h-[52vw] max-md:min-h-[180px] max-md:max-h-[320px] max-sm:h-[60vw]"
                />

                <div
                    ref={gridRef}
                    style={{
                        display:             "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap:                 "24px",
                        padding:             "28px 0 0",
                        borderTop:           dark ? "1px solid #333" : "1px solid #ddd",
                        transition:          T,
                        marginTop:           "24px",
                    }}
                >
                    {INFO_GROUPS.map((group, i) => (
                        <div
                            key={group.label}
                            ref={el => groupsRef.current[i] = el}
                            style={{ cursor: "default" }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform  = "translateY(-4px)";
                                e.currentTarget.style.transition = "transform 0.3s cubic-bezier(0.22,1,0.36,1)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform  = "translateY(0)";
                                e.currentTarget.style.transition = "transform 0.3s cubic-bezier(0.22,1,0.36,1)";
                            }}
                        >
                            <p style={{
                                fontSize:      "10px",
                                fontWeight:    700,
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                color:         "rgb(41,152,154)",
                                marginBottom:  "10px",
                            }}>
                                {group.label}
                            </p>

                            {group.lines.map((line, j) => (
                                <p key={j} style={{
                                    fontSize:   "13px",
                                    fontWeight: j === 0 ? 600 : 400,
                                    color:      "#111",
                                    lineHeight: "1.6",
                                    margin:     0,
                                }}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>

                <div
                    ref={threeRef}
                    className="flex flex-row items-center gap-5 mt-[50px] overflow-x-scroll [scrollbar-width:none] scroll-smooth"
                >
                    {[
                        { bg: color,                  label: "Campaign Visual"  },
                        { bg: "rgb(41, 152, 154)",    label: "Brand System"     },
                        { bg: "#1f1f1f",              label: "Print & Packaging"},
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 flex items-end p-[18px] cursor-pointer transition-[transform,opacity] duration-400"
                            style={{
                                width:           "400px",
                                height:          "400px",
                                backgroundColor: item.bg,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "scale(0.97)";
                                e.currentTarget.style.opacity   = "0.85";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.opacity   = "1";
                            }}
                        >
                            <p className="m-0 text-white font-semibold text-[14px] tracking-[1px]">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ── Awards section ── */}
                <div ref={awardsSectionRef} style={{ marginTop: "60px", paddingBottom: "40px" }}>

                    <p style={{
                        fontSize:      "10px",
                        fontWeight:    700,
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        color:         "rgb(41,152,154)",
                        marginBottom:  "24px",
                    }}>
                        Recognition
                    </p>

                    {AWARDS.map((award, i) => (
                        <div
                            key={i}
                            ref={el => awardsRef.current[i] = el}
                            data-award-idx={i}
                            style={{
                                display:       "flex",
                                alignItems:    "center",
                                gap:           "20px",
                                padding:       "14px 0",
                                borderBottom:  dark ? "1px solid #333" : "1px solid #e8e8e8",
                                cursor:        "pointer",
                                transition:    `background 0.25s ease, ${T}`,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = dark ? "#2a2a2a" : "#f7f7f7"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                        >
                            {/* Left — small image */}
                            <div style={{
                                width:           "56px",
                                height:          "56px",
                                borderRadius:    "6px",
                                backgroundColor: IMG_COLORS[i % IMG_COLORS.length],
                                flexShrink:      0,
                            }} />

                            {/* Middle — title + org */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: dark ? "#fff" : "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: T }}>
                                    {award.title}
                                </p>
                                <p style={{ margin: "3px 0 0", fontSize: "11px", color: "#888", letterSpacing: "0.5px" }}>
                                    {award.org}
                                </p>
                            </div>

                            {/* Right — medal */}
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                                {/* Ribbon left */}
                                <path d="M14 4L10 14H18L14 4Z" fill={MEDAL_COLORS[award.medal]} opacity="0.7" />
                                {/* Ribbon right */}
                                <path d="M22 4L26 14H18L22 4Z" fill={MEDAL_COLORS[award.medal]} opacity="0.9" />
                                {/* Circle */}
                                <circle cx="18" cy="22" r="10" fill={MEDAL_COLORS[award.medal]} />
                                <circle cx="18" cy="22" r="7.5" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.6" />
                                {/* Star */}
                                <text x="18" y="26" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">★</text>
                            </svg>
                        </div>
                    ))}
                </div>

                {/* Dark mode sentinel — when this enters view, flip to dark */}
                <div ref={darkTriggerRef} style={{ height: "1px", marginTop: "60px" }} />

                <div className="flex items-center justify-center flex-col gap-[100px] max-md:gap-9">
                    <img ref={creditImgRef} className="max-md:w-[70%] max-sm:w-[90%]" src={creditImg} alt="" />

                    <div className="w-full">
                        <p ref={creditTitleRef} className="text-[10px] font-bold tracking-[2px] uppercase text-[rgb(41,152,154)] mb-[18px]">
                            client
                        </p>

                        {[
                            { role: "Creative Director",     name: "Mariam Kvaratskhelia" },
                            { role: "Art Director",          name: "Giorgi Beridze"        },
                            { role: "Lead Designer",         name: "Nino Chikvanaia"       },
                            { role: "Motion Designer",       name: "Luka Tsereteli"        },
                            { role: "Copywriter",            name: "Ana Gogiberidze"       },
                            { role: "Brand Strategist",      name: "David Mchedlidze"      },
                            { role: "Account Manager",       name: "Tamar Jokhadze"        },
                            { role: "Photographer",          name: "Irakli Sabakhtarishvili"},
                        ].map(({ role, name }, i) => (
                            <div key={i} ref={el => creditRowsRef.current[i] = el} style={{
                                display:        "flex",
                                justifyContent: "space-between",
                                alignItems:     "baseline",
                                gap:            "24px",
                                padding:        "10px 0",
                                borderBottom:   dark ? "1px solid #2e2e2e" : "1px solid #ececec",
                                transition:     T,
                            }}>
                                <span style={{
                                    fontSize:      "11px",
                                    fontWeight:    500,
                                    letterSpacing: "0.5px",
                                    color:         dark ? "#888" : "#999",
                                    textTransform: "uppercase",
                                    whiteSpace:    "nowrap",
                                    transition:    T,
                                }}>
                                    {role}
                                </span>
                                <span style={{
                                    fontSize:   "13px",
                                    fontWeight: 600,
                                    color:      dark ? "#fff" : "#111",
                                    textAlign:  "right",
                                    transition: T,
                                }}>
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default Project;
