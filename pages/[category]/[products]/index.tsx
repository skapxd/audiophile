import Style from "./index.module.sass";
import * as fs from 'fs';
import { join } from "path";
import { useState } from "react";

interface BoxModelI {
    qty: string
    name: string
}
interface ProductModelI {
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

export async function getServerSideProps(context: any) {

    const pathProducts = join(__dirname, '../../../../', 'public/json/product.json')

    const productString = fs.readFileSync(pathProducts, {
        encoding: 'utf-8'
    })

    const listOfProductModel: ListProductModelI = JSON.parse(productString);

    const url = (context.params.products as string).toLocaleLowerCase();

    let ifProductExist: boolean = false;
    let productModel: ProductModelI;

    listOfProductModel.listOfProduct.map((e) => {

        if (url === e.name.toLocaleLowerCase()) {
            ifProductExist = true
            productModel = e
        }
    })

    if (!ifProductExist) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            path: context.params,
            productModel
        },
    }
}

interface PropsProducts {
    path: any
    productModel: ProductModelI
}

export default function Product(data: PropsProducts) {

    const [qty, setQty] = useState(0)

    const addToCartHandler = () => {
        console.log('object');
    }


    // data.productModel.features = data.productModel.features.replace('\n', '<br>')

    return (

        <div className={Style.container}>
            <div className={Style.container_principal_product}>

                <div className={Style.container_principal_product_img}>
                    <img
                        src={data.productModel.imgUrl}
                        alt="" />

                </div>

                <h3 className={Style.container_principal_product_new}>
                    new product
                </h3>

                <h3 className={Style.container_principal_product_title}>
                    {data.productModel.name}
                </h3>

                <p className={Style.container_principal_product_description}>
                    {data.productModel.description}
                </p>

                <span className={Style.container_principal_product_price}>
                    ${data.productModel.price}
                </span>

                <div className={Style.container_principal_product_add_to_cart}>

                    <div className={Style.container_principal_product_add_to_cart_qty}>

                        <button

                            onClick={() => {
                                if (qty > 0) {
                                    setQty(qty - 1)
                                }
                            }}
                            className={Style.container_principal_product_add_to_cart_qty_icon}>
                            -
                        </button>


                        <div
                            className={Style.container_principal_product_add_to_cart_qty_number}>
                            {qty}
                        </div>


                        <button
                            onClick={() => {
                                setQty(qty + 1);
                            }}
                            className={Style.container_principal_product_add_to_cart_qty_icon}>
                            +
                        </button>

                    </div>

                    <button onClick={addToCartHandler}>
                        add to cart
                    </button>
                </div>

                <h3 className={Style.container_principal_product_title}>
                    features
                </h3>
                <p className={Style.container_principal_product_feature}>
                    {data.productModel.features}
                    <br />
                    a
                </p>

                <h3 className={Style.container_principal_product_title}>
                    in the box
                </h3>

                <ul className={Style.container_principal_product_box}>

                    {data.productModel.box.map((e) => {

                        return (
                            <li className={Style.container_principal_product_box_container}>
                                <div className={Style.container_principal_product_box_container_qty}>
                                    {e.qty}x
                                </div>
                                <div className={Style.container_principal_product_box_container_name}>
                                    {e.name}
                                </div>

                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}