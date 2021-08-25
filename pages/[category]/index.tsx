import Style from "./index.module.sass";
import HeaderNameProduct from "../../components/layout/header_name_product/header_name_product";
import Product from '../../components/product/product';
import Categories from '../../components/categories/categories';
import Best from "../../components/best/best";
import { useRouter } from "next/router";
import * as fs from "fs";
import { join } from "path";

interface BoxModelI {
    qty: string
    name: string
}
interface ProductModelI {
    category: string
    imgUrl: string
    name: string
    description: string
    price: string
    features: string
    box: BoxModelI[]
}

interface ListProductModelI {
    listOfProduct: ProductModelI[]
}

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

    console.log(params);

    const pathProducts = join(__dirname, '../../../', 'public/json/product.json')

    console.log(pathProducts);

    const productString = fs.readFileSync(pathProducts, {
        encoding: 'utf-8'
    })

    const productsModel: ListProductModelI = JSON.parse(productString)

    const productModelCategoryEqualToCategoryUrl = productsModel.listOfProduct.filter((e, i) => {
        if (e.category === params.category) {
            console.log('product category equal to category url');
            console.log(i);
            return e
        }
    })

    // if (pro) {

    // }

    return {
        props: {
            products: productModelCategoryEqualToCategoryUrl,
            category: params.category
        }
    }
}


export default function Category({
    products,
    category
}: {
    products: ProductModelI[],
    category: string
}) {

    const router = useRouter();

    interface CategoryI {
        category?: string
    }

    // const { category }: CategoryI = router.query ?? { category: 'none' };

    // const products = [1, 2, 3]

    return (
        <div className={Style.container}>
            <HeaderNameProduct name={category} />

            <div className={Style.container_products}>

                {products.map((e, i) => {
                    return (
                        <Product
                            key={e.name}
                            srcImg={e.imgUrl}
                            name={e.name}
                            description={e.description}
                            link={`/${category}/${e.name}`}
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