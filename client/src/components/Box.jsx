import { Link } from "react-router-dom";
import { memo } from "react";

const TITLES = ["Horizon", "Echo", "Vessel", "Drift", "Pulse", "Terrain", "Flux",
    "Ember", "Veil", "Cascade", "Orbit", "Shard", "Mirage", "Crest", "Bloom"];

const DESCS = ["Brand identity & print", "Web design & motion", "Editorial & typography",
    "Spatial & installation", "Digital campaign", "Art direction", "UI/UX & product"];

const Box = ({ color, index = 0 }) => {
    const title = TITLES[index % TITLES.length];
    const desc  = DESCS[index % DESCS.length];

    const handleClick = () => {
        localStorage.setItem("project", JSON.stringify({ title, desc, color }));
    };

    return (
        <Link to={"/project"} onClick={handleClick}>
            <div className="box" data-cursor-expand style={{ flexShrink: 0 }}>
                <div
                    className="box_top"
                    style={{ width: "300px", height: "300px", backgroundColor: color, border: "1px solid white" }}
                />
                <div style={{"marginTop": "30x"}} className="box_bottom">
                    <h1 style={{ margin: 0, fontWeight: 700, fontSize: "2rem" }}>{title}</h1>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#000", marginTop: "3px" }}>{desc}</p>
                </div>
            </div>
        </Link>
    );
};

export default memo(Box);
