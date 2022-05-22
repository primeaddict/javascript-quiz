import React from "react";
import NavbarComponent from "../navbar-component";

import s from "./base.module.scss"

const BaseComponent = ({ children }) => {

    return (
        <>
        <div className={s.container}>
            <NavbarComponent />
            {children}
        </div>
        </>
    )



}

export default BaseComponent