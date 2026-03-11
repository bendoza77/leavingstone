import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import minusImg from "../assets/minus.png";

const Menu = () => {
    const [isOpen, setIsOpen]           = useState(true);
    const [headerHeight, setHeaderHeight] = useState(0);

    const menuTopRef = useRef(null);

    useEffect(() => {
        if (menuTopRef.current) {
            setHeaderHeight(menuTopRef.current.offsetHeight);
        }
    }, []);

    return (
        <div
            className="menu"
            style={{
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
            {/* links on top so top-to-bottom clip removes them first */}
            <div className="menu_bottom">
                <Link to={"/"}><p>Home</p></Link>
                <Link to={"/projects"}><p>Work</p></Link>
                <Link to={"/contact"}><p>Contact</p></Link>
            </div>

            {/* header at bottom so it stays visible last */}
            <div className="menu_top" ref={menuTopRef}>
                <p>MENU</p>
                <img
                    className="minus"
                    style={{ width: "17%", cursor: "pointer" }}
                    src="./src/assets/minus.png"
                    alt=""
                    onClick={() => setIsOpen(o => !o)}
                />
            </div>
        </div>
    );
};

export default Menu;
