import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useEffect, useRef } from "react";
import whiteLogoImg from "../assets/white_logo.png";
import weImg        from "../assets/Screenshot_2026-03-11_160521-removebg-preview.png";
import georgiaImg   from "../assets/gerogia.png";
import touchImg     from "../assets/touch.png";

const Contact = () => {

    const hourRef    = useRef(null);
    const minRef     = useRef(null);
    const secRef     = useRef(null);
    const digitalRef = useRef(null);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const h   = now.getHours() % 12;
            const m   = now.getMinutes();
            const s   = now.getSeconds();

            if (hourRef.current)    hourRef.current.style.transform    = `rotate(${h * 30 + m * 0.5}deg)`;
            if (minRef.current)     minRef.current.style.transform     = `rotate(${m * 6}deg)`;
            if (secRef.current)     secRef.current.style.transform     = `rotate(${s * 6}deg)`;
            if (digitalRef.current) digitalRef.current.textContent     =
                `${String(now.getHours()).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <div className="contact">
                <div className="contact_left" data-cursor-light>
                    <div className="logo">
                        <Link to={"/"}>
                            <img src={whiteLogoImg} alt="" />
                        </Link>
                    </div>

                    <div className="we">
                        <img src={weImg} alt="" />
                    </div>

                    <Menu />
                </div>

                <div className="contact_right">
                    <div className="time">
                        <div className="time_left" style={{ display: "flex", alignItems: "center", gap: "20px" }}>

                            {/* Modern analog clock */}
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                {/* Outer ring */}
                                <circle cx="60" cy="60" r="56" fill="none" stroke="#111" strokeWidth="1.5" />

                                {/* Tick marks */}
                                {Array.from({ length: 60 }).map((_, i) => {
                                    const angle   = (i * 6 - 90) * (Math.PI / 180);
                                    const isHour  = i % 5 === 0;
                                    const r1      = isHour ? 46 : 50;
                                    const r2      = 54;
                                    return (
                                        <line
                                            key={i}
                                            x1={60 + r1 * Math.cos(angle)}
                                            y1={60 + r1 * Math.sin(angle)}
                                            x2={60 + r2 * Math.cos(angle)}
                                            y2={60 + r2 * Math.sin(angle)}
                                            stroke="#111"
                                            strokeWidth={isHour ? 2 : 0.8}
                                            strokeLinecap="round"
                                        />
                                    );
                                })}

                                {/* Hour hand */}
                                <line
                                    ref={hourRef}
                                    x1="60" y1="60" x2="60" y2="28"
                                    stroke="#111" strokeWidth="3" strokeLinecap="round"
                                    style={{ transformOrigin: "60px 60px", transition: "transform 0.4s cubic-bezier(0.4,2.08,0.55,0.44)" }}
                                />

                                {/* Minute hand */}
                                <line
                                    ref={minRef}
                                    x1="60" y1="60" x2="60" y2="16"
                                    stroke="#111" strokeWidth="2" strokeLinecap="round"
                                    style={{ transformOrigin: "60px 60px", transition: "transform 0.4s cubic-bezier(0.4,2.08,0.55,0.44)" }}
                                />

                                {/* Second hand — teal, thin, extends behind center */}
                                <line
                                    ref={secRef}
                                    x1="60" y1="72" x2="60" y2="12"
                                    stroke="rgb(41,152,154)" strokeWidth="1" strokeLinecap="round"
                                    style={{ transformOrigin: "60px 60px" }}
                                />

                                {/* Center cap */}
                                <circle cx="60" cy="60" r="3.5" fill="rgb(41,152,154)" />
                                <circle cx="60" cy="60" r="1.5" fill="#fff" />
                            </svg>

                            {/* Digital time hh:mm — updated via ref, no re-render */}
                            <p ref={digitalRef} style={{ margin: 0, fontSize: "28px", fontWeight: 300, letterSpacing: "2px" }} />
                        </div>

                        <div className="time_right">
                            <p>+4 GMT</p>
                        </div>
                    </div>

                    <div className="geo">
                        <img src={georgiaImg} alt="" />
                    </div>


                    <div className="touch">
                        <img src={touchImg} alt="" />

                        <div className="links">
                            <a href="https://www.instagram.com/leavingstone.agency">INSTAGRAM</a>
                            <a href="https://www.linkedin.com/company/leavingstone/">LINKEDIN</a>
                            <a href="https://www.facebook.com/LeavingStone">FACEBOOK</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Contact;
