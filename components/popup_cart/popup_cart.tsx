import { useContext, useEffect, useState } from "react";
import { CustomContextApp } from '../../bloc/custom_context_app';
import { ProductActionI, TypeProductAction } from "../../bloc/reducers/product_reducer";
import { TypePopUpAction } from "../../bloc/reducers/show_popup_reducer";
import { TotalPriceActionI, TypeTotalPriceAction } from "../../bloc/reducers/total_price";

import Item from "./items/item";
import TotalPrice from "./total_price/total_price";
import Style from "./popup_cart.module.sass";
import Link from 'next/link';


export default function PopupCart() {

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
                                CART ({productState?.products?.length ?? 0})
                            </div>


                            <button
                                onClick={removeAllHandler}
                                className={Style.container_wrapper_row_remove}>
                                Remove all
                            </button>
                        </div>


                        <div className={Style.container_wrapper_column}>

                            {products?.map(({ name, qty, price, img, id }, i) => {

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

                        <Link href='/checkout'>
                            <a className={Style.button}>
                                checkout

                            </a>
                        </Link>

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