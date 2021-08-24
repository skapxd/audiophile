import { useContext, useEffect, useState } from "react";
import { PopUpCart, } from "../../context/product_context";
import { CartActionI, CartReducerI, TypeActionCart } from "../../reducers/cart_reducer/cart_reducer";
import Style from "./popup_cart.module.sass";

export default function PopupCart() {

    const { state, dispatch }: CartReducerI = useContext(PopUpCart);

    const [ifShowPopupCart, setIfShowPopupCart] = useState(state.ifShow);


    useEffect(() => {

        setIfShowPopupCart(state.ifShow)

    }, [state.ifShow]);

    const bgHandler = () => {

        const action: CartActionI = {
            type: TypeActionCart.HIDDEN_CART,
        }
        dispatch(action)

        setIfShowPopupCart(state.ifShow)
    }

    let product = [1, 2, 3]

    const PopupCartCopy = () => {
        return (
            <div className={Style.container}>

                <div className={Style.container_bg} onClick={bgHandler}>


                </div>

                <div className={Style.container_relative}>


                    <div className={Style.container_wrapper}>

                        <div className={Style.container_wrapper_row}>
                            <div className={Style.container_wrapper_row_cart_qty}>
                                CART (3)
                            </div>


                            <button className={Style.container_wrapper_row_remove}>
                                Remove all
                            </button>
                        </div>


                        <div className={Style.container_wrapper_column}>

                            {product.map((e) => {
                                return (
                                    <div
                                        key={e}
                                        className={Style.container_wrapper_row}>
                                        <img
                                            src=""
                                            alt=""
                                            className={Style.container_wrapper_row} />


                                    </div>
                                )
                            })}
                        </div>


                        <div className={Style.container_wrapper_row}>

                            <div className={Style.container_wrapper_row_total_title}>
                                total
                            </div>

                            <div className={Style.container_wrapper_row_total_value}>
                                $5.396
                            </div>

                        </div>

                        <button>
                            checkout
                        </button>



                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                ifShowPopupCart && <PopupCartCopy />
                // state.ifShow && <PopupCartCopy />
            }
        </>
    )
}