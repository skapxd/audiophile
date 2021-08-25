import { useContext, useEffect, useState } from "react";
import { CustomContextApp } from '../../bloc/custom_context_app';
import { ProductActionI, TypeProductAction } from "../../bloc/reducers/product_reducer";
import { TypePopUpAction } from "../../bloc/reducers/show_popup_reducer";
import { TotalPriceActionI, TypeTotalPriceAction } from "../../bloc/reducers/total_price";

import Item from "./items/item";
import TotalPrice from "./total_price/total_price";
import Style from "./popup_cart.module.sass";


export default function PopupCart() {
    const context = useContext(CustomContextApp);

    const {
        productState,
        setProduct,

        popupState,
        setPopup,

        setTotalPrice
    } = useContext(CustomContextApp);

    const [ifShowPopupCart, setIfShowPopupCart] = useState(popupState);

    useEffect(() => {
        setIfShowPopupCart(popupState)
    }, [popupState]);

    const bgHandler = () => {

        setPopup(TypePopUpAction.HIDDEN)

        setIfShowPopupCart(popupState)
    }

    const removeAllHandler = () => {

        const totalAction: TotalPriceActionI = {
            payload: { value: 0 },
            type: TypeTotalPriceAction.RESET
        }

        const productAction: ProductActionI = {
            type: TypeProductAction.REMOVE_ALL_PRODUCT
        }

        setProduct(productAction)

        setTotalPrice(totalAction)
    }

    let products = productState.products ?? []

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

                            {products.map(({ name, qty, price, img, id }, i ) => {

                                const random = Math.random()
                                return (
                                    <Item
                                        index={i}
                                        id={id}
                                        name={name}
                                        qty={qty}
                                        price={price}
                                        img={img}
                                        key={random}
                                    />
                                )
                            })}
                        </div>


                        <TotalPrice />

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