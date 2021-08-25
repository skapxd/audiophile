import useCounter from "../../../hooks/counter_hook"
import Style from "./add_to_cart.module.sass";
// import Style from "../product.module.sass";
import { CustomContextApp } from '../../../context/custom_app_context';
import { useContext } from "react";
import { CartReducerI, CartActionI, TypeActionCart, ProductPayloadI } from '../../../reducers/cart_reducer';

export default function AddToCart(data: ProductPayloadI) {

    const { counterState, counterIncrement, counterDecrement } = useCounter()

    const { cartPopupState, cartPopupDispatch }: CartReducerI = useContext(CustomContextApp);


    const handlerAddToCartBtn = () => {

        console.log('object');

        const action: CartActionI = {
            type: TypeActionCart.ADD_PRODUCT,
            payload: {
                // ifShow: false,
                products: [
                    {
                        img: data.img,
                        name: data.name,
                        price: data.price,
                        qty: data.qty,
                    }
                ]
            }

        }

        cartPopupDispatch(action)
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
