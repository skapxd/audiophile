import Style from './product.module.sass'
import Link from "next/link";

interface ProductI {
    name: string
    description: string
    link: string
    srcImg: string
    index: number
}

export default function Product(data: ProductI) {

    const positionTextCard = (data.index % 2 === 0)
        ? Style.container
        : Style.container_reverse

    return (
        <div className={positionTextCard}>

            <div className={Style.container_img}>
                <img
                    loading="lazy"
                    src={data.srcImg}
                    alt={data.name}
                />

            </div>


            <div className={Style.info}>

                {
                    data.index === 0
                        ? (<h4 className={Style.new_product}>
                            new product
                        </h4>)
                        : (<> </>)
                }

                <h2 className={Style.info_name}>
                    {data.name}
                </h2>

                <p className={Style.info_description}>
                    {data.description}
                </p>

                <Link href={data.link}>
                    <a className={Style.info_link} > see product </a>
                </Link>
            </div>
        </ div>
    )
}