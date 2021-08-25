import useCounter from "../../../hooks/counter_hook";
import { ProductActionI, ProductPayloadI, TypeProductAction } from "../../../bloc/reducers/product_reducer";
import Style from "./item.module.sass";
import { CustomContextApp } from "../../../bloc/custom_context_app";
import { useContext, useEffect } from "react";
import { TotalPriceActionI, TypeTotalPriceAction } from "../../../bloc/reducers/total_price";

interface Item extends ProductPayloadI {
    index: number
}


export default function Item(data: Item,) {

    const {
        setTotalPrice,
        totalPriceState,

        productState,
        setProduct,

    } = useContext(CustomContextApp);

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
                    {productState.products[data.index].qty}
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