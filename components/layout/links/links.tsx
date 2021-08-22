import Link from "next/link";
import Style from "./links.module.sass";
export default function Links() {
    return (
        <div className={Style.container}>

            <Link href='/'
            >
                <a className={Style.link}>HOME</a>
            </Link>

            <Link href='/headphones'
            >
                <a className={Style.link}>HEADPHONE</a>
            </Link>

            <Link href='/speakers'
            >
                <a className={Style.link}>SPEAKERS</a>
            </Link>

            <Link href='/earphones'
            >
                <a className={Style.link}>EARPHONES</a>
            </Link>

        </div>
    )
}