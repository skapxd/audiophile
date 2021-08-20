import Style from "./header.module.sass";
import Image from "next/image";
import Link from "next/link";
import Links from "../links/links";
import Drawer from './drawer';

export default function Header() {
    return (
        <>

            <header className={Style.header}>

                <div className={Style.container}>

                    <Drawer />

                    <img
                        src='/brand/logo.svg'
                        className={Style.logo}
                        width={143}
                        height={25}
                    />

                    <div className={Style.custom_flex_2}></div>

                    <div className={Style.link}>
                        <Links />
                    </div>


                    <div className={Style.custom_flex_2}></div>

                    <Image
                        priority
                        src='/brand/shop_card.svg'
                        className={Style.shop_card}
                        width={23.3}
                        height={20}
                    />
                </div>
            </header>
        </>
    )
}