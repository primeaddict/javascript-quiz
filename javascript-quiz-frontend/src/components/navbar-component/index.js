
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { isMobileOnly } from "react-device-detect"

import s from "./navbar.module.scss"

const JAVASCRIPT_LOGO = "/js_logo.svg"

const TopBarMenuItems = [
    { name: "Javascript Quiz", id: "quiz" },
    { name: "About", id: "about" },
    { name: "Credits", id: "credit" },
]

const NavbarComponent = ({ }) => {

    const { push, route } = useRouter()
    console.log("🚀 ~ file: index.js ~ line 20 ~ NavbarComponent ~ useRouter()", useRouter())


    const NavBar = () => {

        return (
            <div className={s.navBar} >
                {TopBarMenuItems.map(element => {
                    const { name, id } = element;
                    let className = `${s.item} ${route.includes(`/${id}`) ? s.selected : ""}`

                    return (
                        <div className={className} id={id} key={id}>
                            <Link href={`/${id}`}>
                                <a>{name}</a>
                            </Link>
                        </div>
                    )
                }

                )}
            </div>
        )
    }

    const MobileDesign = () => {
        return (
            <div>
                <NavBar />
            </div>
        )
    }

    const Common = () => {
        return (
            <div className={s.container}>
                <div className={s.innerContainer}>

                    <div onClick={() => { push("/") }} className={s.logo}>
                        <Image src={JAVASCRIPT_LOGO} width={70} height={70} />
                    </div>
                    <NavBar />

                </div>
            </div>
        )
    }


    // if (!isMobileOnly) return <MobileDesign />

    return <Common />



}

export default NavbarComponent
