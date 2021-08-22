import Style from "./best.module.sass";

export default function Best() {

    return (
        <div className={Style.best}>

            <div className={Style.best_text}>

                <p className={Style.best_text_title}>
                    Bringing you the <br className={Style.best_text_br_1} /> <span>best</span> <br className={Style.best_text_br_2} /> audio gear
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
    )
}