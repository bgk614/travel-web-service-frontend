// components/Layout/Header/Header.tsx
import React from "react"
import '../../../styles/HeaderStyle/Header.css'

import Logo from "./Logo"
import Topmenu from "./TopMenu"
import Navbar from "./NavBar"
import MakeplanButton from "./MakePlanButton"

function Header() {
    return (
        <div className="header">
            <ul>
            <Logo />
            <Topmenu />
            </ul>
            <ul className="bottom-part">
            <Navbar />
            <MakeplanButton />
            </ul>
        </div>
    )
}

export default Header;