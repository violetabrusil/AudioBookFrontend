 import React from "react";
 import { Link } from "react-router-dom";
 import * as FaIcons from "react-icons/fa"

 function Navbar() {
    return (
        <>
        <div className="navbar">
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars/>
            </Link>
            <h1>hola</h1>

        </div>
        </>
    )
 }

 export default Navbar;