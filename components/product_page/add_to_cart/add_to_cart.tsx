import useCounter from "../../../hooks/counter_hook"
import Style from "./add_to_cart.module.sass";
import { CustomContextApp } from '../../../bloc/custom_context_app';
import { useContext, useEffect } from "react";
import { ProductActionI, TypeProductAction, ProductPayloadI, ListOfProductPayloadI } from '../../../bloc/reducers/product_reducer';
import { TotalPriceActionI, TypeTotalPriceAction } from "../../../bloc/reducers/total_price";
import { Decimal } from "decimal.js-light";


export default function AddToCart(data: ProductPayloadI) {

    const { counterState, counterIncrement, counterDecrement } = useCounter()

    const { productState, setProduct, setTotalPrice, totalPriceState } = useContext(CustomContextApp);

    useEffect(() => {

        let tempLocalPrice: number = 0
        const products: ProductPayloadI[] = productState.products ?? []

        products.forEach((e) => {

            tempLocalPrice += +(new Decimal(e.qty).mul(e.price))
        })

        const totalPriceAction: TotalPriceActionI = {
            payload: {
                value: tempLocalPrice
            },
            type: TypeTotalPriceAction.UPDATE
        }

        setTotalPrice(totalPriceAction)
    }, [productState]);


    const handlerAddToCartBtn = () => {

        const productAction: ProductActionI = {
            type: TypeProductAction.ADD_PRODUCT,
            payload: {
                id: data.id,
                img: data.img,
                name: data.name,
                price: data.price,
                qty: counterState,
            }
        }

        setProduct(productAction)


    }


    return (

        <div className={Style.add_to_cart}>

            <div className={Style.add_to_cart_qty}>

                <button

                    onClick={() => {
                        counterDecrement()
                    }}
                    className={Style.add_to_cart_qty_icon}>
                    -
                </button>


                <div
                    className={Style.add_to_cart_qty_number}>
                    {counterState}
                </div>


                <button
                    onClick={() => {
                        counterIncrement()
                    }}
                    className={Style.add_to_cart_qty_icon}>
                    +
                </button>

            </div>

            <button onClick={handlerAddToCartBtn}>
                add to cart
            </button>
        </div>

    )
}
