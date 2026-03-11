import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useEffect, useRef, useState } from "react";
import Box from "../components/Box";
import whiteLogoImg from "../assets/white_logo.png";
import projectsImg  from "../assets/projects.png";
import inputImg     from "../assets/input.png";
import filImg       from "../assets/fil.png";
import minusImg     from "../assets/minus.png";
import menuIconImg  from "../assets/menu.png";
import cubeIconImg  from "../assets/cube.png";
import logoImg  from "../assets/Screenshot 2026-03-11 112834.png";

const FILTER_DATA = {
    "Categories": ["Branding", "Motion", "Editorial", "Digital", "Spatial", "Typography", "Photography", "Illustration", "3D", "UI/UX"],
    "Clients":    ["Nike", "Apple", "Adidas", "Sony", "Netflix", "Spotify", "Tesla", "Google", "Chanel", "Dior"],
    "Awards":     ["Cannes Lions", "D&AD", "Red Dot", "One Show", "Clio", "Webby", "AIAP", "TDC", "ADC", "Effie"],
    "Keywords":   ["Minimal", "Bold", "Luxury", "Urban", "Abstract", "Geometric", "Organic", "Dark", "Neon", "Retro"],
};

const Work = () => {

    const [isOpen, setIsOpen]       = useState(true);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [activeView, setActiveView]   = useState("menu");
    const [activeFilter, setActiveFilter] = useState(null);

    const TEAL = "rgb(41, 152, 154)";

    const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 60%, 65%)`;
    const boxes = useState(() => Array.from({ length: 50 }, () => randomColor()))[0];

    const menuRef    = useRef(null);
    const menuTopRef = useRef(null);

    useEffect(() => {
        if (menuTopRef.current) {
            setHeaderHeight(menuTopRef.current.offsetHeight);
        }
    }, []);

    const toggleFilter = (key) => setActiveFilter(f => f === key ? null : key);

    const [bar, setBar] = useState(false);

    return (
        <>

            <div className={`sidebar`}>
                <div className="logo1">
                    <img src={logoImg} alt="" />
                </div>

                <div className="menu1">
                    <img onClick={() => setBar((true))} src="./src/assets/big_menu.png" alt="" />
                </div>

            </div>

            <div className={bar ? "side" : ""}>
                
            </div>
        
            <div className="work">

                <div className="work_left" data-cursor-light>

                    <div className="logo">
                        <Link to={"/"}>
                            <img src={whiteLogoImg} alt="" />
                        </Link>
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
                                    marginTop: key === "Categories" ? "10px" : undefined,
                                    cursor: "pointer",
                                    opacity: activeFilter && activeFilter !== key ? 0.4 : 1,
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
                                ? (isOpen
                                    ? "inset(0 0 0 0)"
                                    : `inset(calc(100% - ${headerHeight}px) 0 0 0)`)
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

                {/* Filter panel — slides in over work_right when a filter is active */}
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
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <p style={{ color: "white", fontWeight: 700, fontSize: "13px", margin: 0 }}>
                                {activeFilter.toUpperCase()}
                            </p>
                            <span
                                onClick={() => setActiveFilter(null)}
                                style={{ color: TEAL, cursor: "pointer", fontSize: "18px", lineHeight: 1 }}
                            >✕</span>
                        </div>

                        {FILTER_DATA[activeFilter].map((item, i) => (
                            <div key={item} style={{
                                height:          "214px",
                                backgroundColor: `hsl(${(i * 47) % 360}, 60%, 65%)`,
                                border:          "1px solid white",
                                color:           "white",
                                fontSize:        "14px",
                                fontWeight:      600,
                                padding:         "12px",
                                marginBottom:    "10px",
                                cursor:          "pointer",
                                display:         "flex",
                                alignItems:      "flex-end",
                                flexShrink:      0,
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}

                <div className="work_right" data-cursor-dark style={{ display: "flex", flexDirection: "column" }}>
                    <img className="work1" src="./src/assets/work.png" alt="" />
                    
                    <div className="right_header">
                        <p>CHANGE VIEW</p>

                        <div
                            onClick={() => setActiveView("menu")}
                            style={{
                                display:        "flex",
                                alignItems:     "center",
                                justifyContent: "center",
                                width:          "32px",
                                height:         "32px",
                                borderRadius:   "50%",
                                cursor:         "pointer",
                                border:         activeView === "menu" ? `2px solid ${TEAL}` : "2px solid transparent",
                                transition:     "border 0.3s ease",
                            }}
                        >
                            <img
                                src={menuIconImg}
                                alt=""
                                style={{
                                    filter:     activeView === "menu"
                                        ? "invert(48%) sepia(79%) saturate(400%) hue-rotate(138deg) brightness(90%)"
                                        : "none",
                                    width:      "18px",
                                    transition: "filter 0.3s ease",
                                }}
                            />
                        </div>

                        <div
                            onClick={() => setActiveView("cube")}
                            style={{
                                display:        "flex",
                                alignItems:     "center",
                                justifyContent: "center",
                                width:          "32px",
                                height:         "32px",
                                borderRadius:   "50%",
                                cursor:         "pointer",
                                border:         activeView === "cube" ? `2px solid ${TEAL}` : "2px solid transparent",
                                transition:     "border 0.3s ease",
                            }}
                        >
                            <img
                                src={cubeIconImg}
                                alt=""
                                style={{
                                    filter:     activeView === "cube"
                                        ? "invert(48%) sepia(79%) saturate(400%) hue-rotate(138deg) brightness(90%)"
                                        : "none",
                                    width:      "18px",
                                    transition: "filter 0.3s ease",
                                }}
                            />
                        </div>
                    </div>

                    <div className="pro">
                        {boxes.map((color, i) => (
                            <Box key={i} color={color} index={i} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Work;
