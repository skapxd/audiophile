import Style from './category.module.sass';
import Link from 'next/link'

interface CategoryI {
    name: string
    image: string
    link: string
}

export default function Category(data: CategoryI) {

    return (
        <div className={Style.container}>

            <img
                src={data.image}
                alt=""
                className={Style.img}
            />

            <h5
                className={Style.name}>
                {data.name}
            </h5>

            <Link href={data.link}>
                <a 
                    className={Style.a}
                >
                    shop

                    <span className={Style.arrow_right}></span>
                </a>
            </Link>


        </div>
    )
}