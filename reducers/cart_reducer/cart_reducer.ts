import { Dispatch } from "react"

export enum TypeActionCart {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    RESET = 'RESET',
    SHOW_CART = 'SHOW_CART',
    HIDDEN_CART = 'HIDDEN_CART',
}

export interface ProductPayloadI {
    img: string
    name: string
    price: number
    qty: number
}

export interface CartPayloadI {
    ifShow?: boolean
    products?: ProductPayloadI[]
}

export interface CartActionI {
    type: TypeActionCart
    payload?: CartPayloadI
}

export interface CartReducerI {
    state: CartPayloadI
    dispatch: Dispatch<CartActionI>
}


export default function cartReducer(state: CartPayloadI, action: CartActionI): CartPayloadI {

    switch (action.type) {
        case TypeActionCart.ADD:

            return { ...state, ...(action.payload) }

        case TypeActionCart.SHOW_CART:

            return { ...state, ifShow: true }

        case TypeActionCart.HIDDEN_CART:
            return { ...state, ifShow: false }

        default:
            return state
    }
}