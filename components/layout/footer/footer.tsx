import Links from "../links/links";
import Style from './footer.module.sass';
import Social from "../social/social"

export default function Footer() {
    return (
        <footer className={Style.footer}>

            <div className={Style.container}>

                <div className={Style.logo_and_links}>
                    <img
                        src="/brand/logo.svg"
                        alt="logo"
                        className={Style.logo} />

                    {/* <div className={Style.custom_flex_1}></div> */}

                    <div className={Style.links}>
                        <Links />
                    </div>
                </div>


                <div className={Style.text_and_social}>
                    <p className={Style.text}>
                        Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
                    </p>

                    <div className={Style.flex_1}></div>

                    <div className={Style.social}>
                        <Social />
                    </div>

                </div>

                <p className={Style.copy}>
                Copyright 2021. All Rights Reserved
                </p>


            </div>
        </footer>
    )
}