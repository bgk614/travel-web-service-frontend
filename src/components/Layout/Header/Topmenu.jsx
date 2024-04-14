import React from "react"
import { Link } from "react-router-dom"
import '../../../styles/HeaderStyle/Topmenu.css'



export default function Topmenu() {
    return (
            <div className="topmenu">
                <Link className="menu-link" to='/mypage'>
                    MY PAGE
                </Link>
                <Link className="menu-link" to='/mylike'>
                    MY LIKE
                </Link>
                <Link className="menu-link" to='/myplan'>
                    MY PLAN
                </Link>
                <Link className="menu-link" to='/login'>
                    LOGIN
                </Link>
            </div> 
    );
}