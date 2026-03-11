import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import logoImg  from "../assets/Screenshot 2026-03-11 112834.png";
import wowImg   from "../assets/wow.png";
import scrollImg from "../assets/scroll.png";
import manImg   from "../assets/man.png";

const Home = () => {

    return (
        <>
            <div className="home_page">
                <div className="left_side">
                    <div className="logo">
                        <img src={logoImg} alt="" />
                    </div>

                    <p className="explore">EXPLORE OUR PORTFOLIO AND <br /> ACCOLADES</p>

                    <Menu />
                </div>

                <div className="middle">
                    <img className="wow" src={wowImg} alt="" />
                    <img className="scrollImg" style={{"marginLeft": "-25px", "width": "40%"}} src={scrollImg} alt="" />
                </div>

                <div className="right_side">
                    <Link to={"/project"} onClick={() => localStorage.setItem("project", JSON.stringify({ title: "Featured", desc: "Selected work", color: "#888" }))}>
                        <img data-cursor-expand src={manImg} alt="" />
                    </Link>
                </div>
            </div>
        </>
    );




}

export default Home
