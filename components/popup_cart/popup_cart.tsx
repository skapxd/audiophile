import { useContext, useEffect, useState } from "react";
import { CustomContextApp, } from "../../context/custom_app_context";
import { CartActionI, CartReducerI, TypeActionCart } from "../../reducers/cart_reducer";
import Style from "./popup_cart.module.sass";
import Item from "./items/item";

export default function PopupCart() {

    const { cartPopupState, cartPopupDispatch }: CartReducerI = useContext(CustomContextApp);

    const [ifShowPopupCart, setIfShowPopupCart] = useState(cartPopupState.ifShow);


    useEffect(() => {

        setIfShowPopupCart(cartPopupState.ifShow)

    }, [cartPopupState.ifShow]);

    const bgHandler = () => {

        const action: CartActionI = {
            type: TypeActionCart.HIDDEN_CART,
        }
        cartPopupDispatch(action)

        setIfShowPopupCart(cartPopupState.ifShow)
    }

    const removeAllHandler = () => {
        const action: CartActionI = {
            type: TypeActionCart.REMOVE_ALL_PRODUCT
        }



        cartPopupDispatch(action)
    }

    let product = cartPopupState.products
    // let product = [1, 2, 3]

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


                            <button
                                onClick={removeAllHandler}
                                className={Style.container_wrapper_row_remove}>
                                Remove all
                            </button>
                        </div>


                        <div className={Style.container_wrapper_column}>

                            {product.map(({name, qty, price, img}) => {

                                const random = Math.random()
                                return (
                                    // <Item key={e} />
                                    <Item
                                        name={name}
                                        qty={qty}
                                        price={price}
                                        img={img}
                                        key={random}
                                    />
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
            }
        </>
    )
}