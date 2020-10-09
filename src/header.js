import React from "react";
import "./style.css";
import {ReactComponent as VindenLogo} from "./logo.svg";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <VindenLogo/>
            </div>
        );
    }
}

export default Header;
