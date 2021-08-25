import { useReducer } from "react"
import cartReducer, { CartPayloadI } from "../reducers/cart_reducer"

export default function getCartValues() {
    const initCart: CartPayloadI = {
        products: [],
        ifShow: false
    }
    const [cartPopupState, cartPopupDispatch] = useReducer(cartReducer, initCart)

    return {
        cartPopupState,
        cartPopupDispatch
    }
}