import Style from "./third_container.module.sass";
import Link from "next/link";
import Best from "../../best/best";

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

                <Best />

            </div>
        </div>
    )
}