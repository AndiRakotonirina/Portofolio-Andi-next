'use client';

import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";


const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-lg font-bold">Mon Portfolio</div>

            <LocaleSwitcher />
        </div>
        </nav>
    );
};

export default Navbar;