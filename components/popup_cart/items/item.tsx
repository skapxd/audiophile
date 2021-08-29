import { ProductActionI, ProductPayloadI, TypeProductAction } from '../../../bloc/reducers/product_reducer';
import { CustomContextApp } from "../../../bloc/custom_context_app";
import { useContext, useEffect } from "react";
import { TotalPriceActionI, TypeTotalPriceAction } from "../../../bloc/reducers/total_price";

import Style from "./item.module.sass";

interface Item extends ProductPayloadI {
    index: number
}


export default function Item(data: Item) {


    const {
        setTotalPrice,
        totalPriceState,

        productState,
        setProduct,

    } = useContext(CustomContextApp);


    useEffect(() => {
        // Delete a product where qty is cero
        if (data.qty === 0) {
            const action: ProductActionI = {
                type: TypeProductAction.REMOVE_PRODUCT,
                payload: data
            }
            setProduct(action)
        }
        
    }, [data.qty]);


    const subtractCounterHandler = () => {

        if (data.qty > 0) {

            const totalPriceAction: TotalPriceActionI = {
                payload: {
                    value: data.price
                },
                type: TypeTotalPriceAction.SUBTRACT
            }


            const productAction: ProductActionI = {
                type: TypeProductAction.ADD_PRODUCT,
                payload: {
                    ...data,
                    qty: (data.qty - 1)
                }
            }

            setTotalPrice(totalPriceAction)

            setProduct(productAction)
        }


    }

    const addCounterHandler = () => {

        const totalPriceAction: TotalPriceActionI = {
            payload: {
                value: data.price
            },
            type: TypeTotalPriceAction.ADD
        }

        const productAction: ProductActionI = {
            type: TypeProductAction.ADD_PRODUCT,
            payload: {
                ...data,
                qty: (data.qty + 1)
            }
        }

        setTotalPrice(totalPriceAction)

        setProduct(productAction)

    }

    return (
        <div
            className={Style.container}>

            <div
                className={Style.container_img}
            >
                <img
                    src="/products/image-removebg-preview(47).png"
                    alt=""
                />

            </div>

            <div className={Style.container_info}>
                <h3
                    className={Style.container_info_name}>
                    {data.name}
                </h3>

                <h3
                    className={Style.container_info_price}>
                    $ {data.price}
                </h3>
            </div>

            <div className={Style.container_qty}>

                <button
                    onClick={subtractCounterHandler}
                    className={Style.container_qty_icon}>
                    -
                </button>

                <div className={Style.container_qty_text}>
                    {data.qty}
                </div>


                <button
                    onClick={addCounterHandler}
                    className={Style.container_qty_icon}>
                    +
                </button>

            </div>


        </div>
    )

}