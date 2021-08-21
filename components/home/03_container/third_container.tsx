import Style from "./third_container.module.sass";
import Link from "next/link";
export default function ThirdContainer() {

    return (

        <div className={Style.bg}>

            <div
                className={Style.container}
            >

                <div className={Style.zx9}>

                    <img
                        src="/products/zx9_speaker.png"
                        alt="zx9 speaker"
                        className={Style.zx9_img}
                    />

                    <div className={Style.zx9_text}>

                        <p className={Style.zx9_text_1}>
                            zx9 <br /> speaker
                        </p>

                        <p className={Style.zx9_text_2}>
                            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                        </p>

                        <Link href=''>
                            <a
                                className={Style.button}>
                                see product
                            </a>
                        </Link>

                    </div>

                </div>


                <div className={Style.zx7}>

                    <img
                        src="/products/zx7_speaker.png"
                        alt=""
                        className={Style.zx7_img}
                    />

                    <p className={Style.zx7_name}>
                        ZX7 SPEAKER
                    </p>

                    <Link href=''>
                        <a
                            className={Style.button}>
                            see product
                        </a>
                    </Link>

                </div>

                <div className={Style.yx1}>

                    <img
                        src="/products/yx1_earphones.png"
                        alt=""
                        className={Style.yx1_img}
                    />

                    <div className={Style.yx1_text}>
                        <p className={Style.yx1_text_name}>
                            yx1 earphones
                        </p>


                        <Link href=''>
                            <a
                                className={Style.button}>
                                see product
                            </a>
                        </Link>

                    </div>

                </div>

                <div className={Style.best}>

                    <div className={Style.best_text}>

                        <p className={Style.best_text_title}>
                            Bringing you the <br className={Style.best_text_br_1}/> <span>best</span> <br className={Style.best_text_br_2}/> audio gear
                        </p>

                        <p className={Style.best_text_paragraph}>
                            Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                        </p>

                    </div>

                    <img
                        src="/brand/best.png"
                        alt=""
                        className={Style.best_img}
                    />

                </div>
            </div>
        </div>
    )
}