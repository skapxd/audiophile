import Style from "./product.module.sass";
import * as fs from 'fs';
import { join } from "path";
import { useState } from "react";
import Best from '../../../components/best/best';
import useCounter from "../../../hooks/counter_hook";
import AddToCart from "../../../components/product_page/components/add_to_cart";

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


    return (

        <div className={Style.bg}>


            <div className={Style.container}>
                <div className={Style.container_principal_product}>

                    <div className={Style.container_principal_product_img}>
                        <img
                            src={data.productModel.imgUrl}
                            alt="" />

                    </div>

                    <div className="column">
                        <h3 className={Style.container_principal_product_new}>
                            new product
                        </h3>

                        <h3 className={Style.container_principal_product_title}>
                            {data.productModel.name}
                        </h3>

                        <p
                            dangerouslySetInnerHTML={{ __html: data.productModel.description }}
                            className={Style.container_principal_product_description}>
                        </p>

                        <div className={Style.container_principal_product_price}>
                            ${data.productModel.price}
                        </div>

                        <AddToCart 
                        img={data.productModel.imgUrl}
                        price={Number(data.productModel.price)}
                        qty={0}
                        name={data.productModel.name}


                        />

                    </div>

                </div>

                <h3 className={Style.container_principal_product_title}>
                    features
                </h3>
                <p
                    dangerouslySetInnerHTML={{ __html: data.productModel.features }}
                    className={Style.container_principal_product_feature}>
                    {/*  */}
                </p>

                <h3 className={Style.container_principal_product_title}>
                    in the box
                </h3>

                <ul className={Style.container_principal_product_box}>

                    {data.productModel.box.map((e) => {

                        return (
                            <li 
                                key={e.name}
                                className={Style.container_principal_product_box_container}>
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

                <div className={Style.container_principal_product_best}>
                    <Best />
                </div>
            </div>
        </div>

    )
}