import Style from "./index.module.sass";
import HeaderNameProduct from "../../components/layout/header_name_product/header_name_product";
import Product from '../../components/product/product';
import Categories from '../../components/categories/categories';
import Best from "../../components/best/best";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";

export async function getStaticPaths() {

    return {
        paths: [
            { params: { category: 'headphones' } },
            { params: { category: 'earphones' } },
            { params: { category: 'speakers' } }
        ],
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    return { props: {} }
}


export default function Category() {

    const router = useRouter();

    interface CategoryI {
        category?: string
    }

    const { category }: CategoryI = router.query ?? { category: 'none' };

    // const pagesName = [
    //     'headphones',
    //     'earphones',
    //     'speakers'
    // ]

    const products = [1, 2, 3]


    // if ( ! pagesName.includes(category)) {
    //     return (
    //         <>
    //         </>
    //     )
    // }

    return (
        <div className={Style.container}>
            <HeaderNameProduct name={category} />

            <div className={Style.container_products}>

                {products.map((e, i) => {
                    return (
                        <Product
                            srcImg='/products/xx99_mark_ii_2.png'
                            name='XX99 Mark II Headphones'
                            description='The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
                            link=''
                            index={i}
                        />
                    )
                })}
            </div>

            <div className={Style.container_categories}>
                <Categories />
            </div>

            <div className={Style.container_best}>
                <Best />
            </div>


        </ div>
    )
}