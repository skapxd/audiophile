import Style from "./first_container.module.sass";
import Image from "next/image";

export default function FirstScreen() {

    return ( 
        <div className={Style.bg}>

            <div className={Style.container}>

                <div className={Style.new_products}>
                    <p className={Style.text_1}>new product</p>
                    <p className={Style.text_2}>
                        XX99 Mark II <br />
                        HeadphoneS
                    </p>
                    <p className={Style.text_3}>
                        Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                    </p>

                    <button className={Style.button}>
                        see product
                    </button>
                </div>

                <div className={Style.head_phone}>

                    
                    <Image
                        priority
                        src='/products/xx99_mark_ii.png'
                        layout='fill'
                        className={Style.head_phone}

                    />
                </div>
            </div>

        </div>
    )
}