import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useCallback, useEffect, useRef, useState } from "react";
import Box from "../components/Box";
import whiteLogoImg from "../assets/white_logo.png";
import projectsImg  from "../assets/projects.png";
import inputImg     from "../assets/input.png";
import filImg       from "../assets/fil.png";
import minusImg     from "../assets/minus.png";
import menuIconImg  from "../assets/menu.png";
import cubeIconImg  from "../assets/cube.png";
import logoImg      from "../assets/Screenshot 2026-03-11 112834.png";

const FILTER_DATA = {
    "Categories": ["Branding","Motion","Editorial","Digital","Spatial","Typography","Photography","Illustration","3D","UI/UX"],
    "Clients":    ["Nike","Apple","Adidas","Sony","Netflix","Spotify","Tesla","Google","Chanel","Dior"],
    "Awards":     ["Cannes Lions","D&AD","Red Dot","One Show","Clio","Webby","AIAP","TDC","ADC","Effie"],
    "Keywords":   ["Minimal","Bold","Luxury","Urban","Abstract","Geometric","Organic","Dark","Neon","Retro"],
};

const TEAL      = "rgb(41, 152, 154)";
const CUBE_SCALE = 0.28;   // how far it zooms out in canvas mode

const Work = () => {

    const [isOpen,        setIsOpen]        = useState(true);
    const [headerHeight,  setHeaderHeight]  = useState(0);
    const [activeView,    setActiveView]    = useState("menu");
    const [activeFilter,  setActiveFilter]  = useState(null);
    const [bar,           setBar]           = useState(false);

    /* ── Cube-view pan state ── */
    const [offset,    setOffset]    = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [cubeReady,  setCubeReady]  = useState(false);   // triggers zoom-out animation
    const dragOrigin = useRef(null);

    const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 60%, 65%)`;
    const boxes = useState(() => Array.from({ length: 50 }, () => randomColor()))[0];

    const menuRef    = useRef(null);
    const menuTopRef = useRef(null);

    useEffect(() => {
        if (menuTopRef.current) setHeaderHeight(menuTopRef.current.offsetHeight);
    }, []);

    /* Trigger zoom-out animation one frame after cube canvas mounts */
    useEffect(() => {
        if (activeView !== "cube") { setCubeReady(false); return; }
        const id = requestAnimationFrame(() =>
            requestAnimationFrame(() => setCubeReady(true))
        );
        return () => cancelAnimationFrame(id);
    }, [activeView]);

    const toggleFilter = (key) => setActiveFilter(f => f === key ? null : key);

    const switchView = (view) => {
        setActiveView(view);
        if (view === "menu") { setOffset({ x: 0, y: 0 }); }
    };

    /* ── Mouse drag handlers ── */
    const hasMoved = useRef(false);

    const onMouseDown = useCallback((e) => {
        hasMoved.current = false;
        setIsDragging(true);
        dragOrigin.current = {
            startX: e.clientX,
            startY: e.clientY,
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        };
    }, [offset]);

    const onMouseMove = useCallback((e) => {
        if (!isDragging || !dragOrigin.current) return;
        const dx = Math.abs(e.clientX - dragOrigin.current.startX);
        const dy = Math.abs(e.clientY - dragOrigin.current.startY);
        if (dx > 4 || dy > 4) hasMoved.current = true;
        setOffset({
            x: e.clientX - dragOrigin.current.x,
            y: e.clientY - dragOrigin.current.y,
        });
    }, [isDragging]);

    const onMouseUp = useCallback(() => setIsDragging(false), []);

    /* Block child clicks only when the user actually dragged */
    const onClickCapture = useCallback((e) => {
        if (hasMoved.current) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, []);

    /* ── Cube inner transform ──
       Before ready → scale(1) so it starts at full size, then zooms to CUBE_SCALE.
       While dragging → transition: none for buttery smoothness. */
    const cubeTransform = cubeReady
        ? `translate(${offset.x}px, ${offset.y}px) scale(${CUBE_SCALE})`
        : `translate(0px, 0px) scale(1)`;

    return (
        <>
            <div className="sidebar">
                <div className="logo1"><img src={logoImg} alt="" /></div>
                <div className="menu1"><img onClick={() => setBar(true)} src="./src/assets/big_menu.png" alt="" /></div>
            </div>

            <div className={bar ? "side" : ""} />

            <div className="work">

                {/* ── Left panel ── */}
                <div className="work_left" data-cursor-light>

                    <div className="logo">
                        <Link to={"/"}><img src={whiteLogoImg} alt="" /></Link>
                    </div>

                    <div className="projects">
                        <img src={projectsImg} alt="" />
                    </div>

                    <div className="filter">
                        <div className="inp">
                            <input type="text" name="projectName" placeholder="SEARCH" />
                            <img src={inputImg} alt="" />
                        </div>

                        {Object.keys(FILTER_DATA).map((key) => (
                            <div
                                key={key}
                                className="filt"
                                style={{
                                    marginTop:  key === "Categories" ? "10px" : undefined,
                                    cursor:     "pointer",
                                    opacity:    activeFilter && activeFilter !== key ? 0.4 : 1,
                                    transition: "opacity 0.2s ease",
                                }}
                                onClick={() => toggleFilter(key)}
                            >
                                <p>Filter by {key}</p>
                                <img src={filImg} alt="" />
                            </div>
                        ))}
                    </div>

                    <div
                        className="menu"
                        ref={menuRef}
                        style={{
                            position:   "absolute",
                            zIndex:     9999,
                            marginTop:  "-50px",
                            clipPath:   headerHeight
                                ? (isOpen ? "inset(0 0 0 0)" : `inset(calc(100% - ${headerHeight}px) 0 0 0)`)
                                : "none",
                            transition: isOpen
                                ? "clip-path 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                                : "clip-path 0.45s cubic-bezier(0.55, 0, 0.45, 1)",
                        }}
                    >
                        <div className="menu_bottom">
                            <Link to={"/"}><p>Home</p></Link>
                            <Link to={"/projects"}><p>Work</p></Link>
                            <Link to={"/contact"}><p>Contact</p></Link>
                        </div>
                        <div className="menu_top" ref={menuTopRef}>
                            <p>MENU</p>
                            <img
                                className="minus"
                                style={{ width: "17%", cursor: "pointer" }}
                                src={minusImg}
                                alt=""
                                onClick={() => setIsOpen(o => !o)}
                            />
                        </div>
                    </div>

                </div>

                {/* ── Filter panel ── */}
                {activeFilter && (
                    <div className="filter-panel" style={{
                        position:        "absolute",
                        left:            "25%",
                        top:             0,
                        width:           "220px",
                        height:          "100%",
                        backgroundColor: "#1f1f1f",
                        border:          "1px solid white",
                        zIndex:          100,
                        display:         "flex",
                        flexDirection:   "column",
                        padding:         "24px 16px",
                        overflowY:       "auto",
                        scrollbarWidth:  "thin",
                        scrollbarColor:  `${TEAL} #1f1f1f`,
                    }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
                            <p style={{ color:"white", fontWeight:700, fontSize:"13px", margin:0 }}>
                                {activeFilter.toUpperCase()}
                            </p>
                            <span onClick={() => setActiveFilter(null)} style={{ color:TEAL, cursor:"pointer", fontSize:"18px", lineHeight:1 }}>✕</span>
                        </div>

                        {FILTER_DATA[activeFilter].map((item, i) => (
                            <div key={item} style={{
                                height:"214px",
                                backgroundColor:`hsl(${(i * 47) % 360}, 60%, 65%)`,
                                border:"1px solid white",
                                color:"white",
                                fontSize:"14px",
                                fontWeight:600,
                                padding:"12px",
                                marginBottom:"10px",
                                cursor:"pointer",
                                display:"flex",
                                alignItems:"flex-end",
                                flexShrink:0,
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Right panel ── */}
                <div className="work_right" data-cursor-dark style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>

                    <div className="right_header">
                        <p>CHANGE VIEW</p>

                        {/* Grid icon */}
                        <div
                            onClick={() => switchView("menu")}
                            style={{
                                display:"flex", alignItems:"center", justifyContent:"center",
                                width:"32px", height:"32px", borderRadius:"50%", cursor:"pointer",
                                border: activeView === "menu" ? `2px solid ${TEAL}` : "2px solid transparent",
                                transition:"border 0.3s ease",
                            }}
                        >
                            <img src={menuIconImg} alt="" style={{
                                filter: activeView === "menu"
                                    ? "invert(48%) sepia(79%) saturate(400%) hue-rotate(138deg) brightness(90%)"
                                    : "none",
                                width:"18px", transition:"filter 0.3s ease",
                            }} />
                        </div>

                        {/* Cube icon */}
                        <div
                            onClick={() => switchView("cube")}
                            style={{
                                display:"flex", alignItems:"center", justifyContent:"center",
                                width:"32px", height:"32px", borderRadius:"50%", cursor:"pointer",
                                border: activeView === "cube" ? `2px solid ${TEAL}` : "2px solid transparent",
                                transition:"border 0.3s ease",
                            }}
                        >
                            <img src={cubeIconImg} alt="" style={{
                                filter: activeView === "cube"
                                    ? "invert(48%) sepia(79%) saturate(400%) hue-rotate(138deg) brightness(90%)"
                                    : "none",
                                width:"18px", transition:"filter 0.3s ease",
                            }} />
                        </div>
                    </div>

                    {/* ══ GRID VIEW ══ */}
                    {activeView === "menu" && (
                        <div className="pro">
                            {boxes.map((color, i) => (
                                <Box key={i} color={color} index={i} />
                            ))}
                        </div>
                    )}

                    {/* ══ CUBE / PAN VIEW ══ */}
                    {activeView === "cube" && (
                        <div
                            className="cube-canvas"
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                            onClickCapture={onClickCapture}
                            style={{ cursor: isDragging ? "grabbing" : "grab" }}
                        >
                            {/* Drag hint — fades out after 2 s */}
                            <div className="cube-hint">
                                <span className="cube-hint-icon">✦</span>
                                Drag to explore
                            </div>

                            <div
                                className="cube-inner"
                                style={{
                                    transform:       cubeTransform,
                                    transformOrigin: "top left",
                                    transition:      isDragging ? "none" : "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                                }}
                            >
                                {boxes.map((color, i) => (
                                    <Box key={i} color={color} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </>
    );
};

export default Work;
