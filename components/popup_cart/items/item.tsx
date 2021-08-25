import { useContext, useEffect } from "react";
import { CustomContextApp } from "../../../context/custom_app_context";
import useCounter from "../../../hooks/counter_hook";
import { CartReducerI, ProductPayloadI } from "../../../reducers/cart_reducer";
import Style from "./item.module.sass";

export default function Item(data: ProductPayloadI) {

    const { counterState, counterIncrement, counterDecrement } = useCounter()

    const { cartPopupDispatch, cartPopupState}: CartReducerI = useContext(CustomContextApp);

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [input]);

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
                    {/* {data.name.substr(0, 6)}... */}
                </h3>

                <h3
                    className={Style.container_info_price}>
                    $ {data.price}
                </h3>
            </div>

            <div className={Style.container_qty}>

                <button
                    onClick={counterDecrement}
                    className={Style.container_qty_icon}>
                    -
                </button>

                <div className={Style.container_qty_text}>
                    {counterState}
                </div>


                <button
                    onClick={counterIncrement}
                    className={Style.container_qty_icon}>
                    +
                </button>

            </div>


        </div>
    )

}