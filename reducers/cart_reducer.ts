import { Dispatch } from "react"
import { compareObject } from "../utils/compare_objects";

export enum TypeActionCart {
    ADD_PRODUCT = 'ADD_PRODUCT',
    UPDATE_PRODUCT = 'UPDATE_PRODUCT',

    REMOVE_PRODUCT = 'REMOVE_PRODUCT',
    REMOVE_ALL_PRODUCT = 'REMOVE_ALL_PRODUCT',

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
    products: ProductPayloadI[]
}

export interface CartActionI {
    type: TypeActionCart
    payload?: CartPayloadI
}

export interface CartReducerI {
    cartPopupState: CartPayloadI
    cartPopupDispatch: Dispatch<CartActionI>
}


export default function cartReducer(state: CartPayloadI, action: CartActionI): CartPayloadI {

    switch (action.type) {
        // -------------------
        case TypeActionCart.ADD_PRODUCT:

            console.log(TypeActionCart.ADD_PRODUCT)


            // En caso de que el producto exista no añadirlo 


            state.products.filter((e) => {

                let ifProductExist = compareObject({
                    object1: action.payload.products[0],
                    object2: e
                });
            });

            const newState = {
                ifShow: state.ifShow,
                products: [
                    ...(state.products ? state.products : []),
                    ...(action?.payload?.products),
                ],
            };

            return newState

        // -------------------
        case TypeActionCart.UPDATE_PRODUCT:
            // state.products.
            console.log(TypeActionCart.UPDATE_PRODUCT)
            return state

        // -------------------
        case TypeActionCart.REMOVE_ALL_PRODUCT:

            console.log(TypeActionCart.REMOVE_ALL_PRODUCT)

            return {
                ifShow: state.ifShow,
                products: []
            }

        // -------------------
        case TypeActionCart.SHOW_CART:

            console.log(TypeActionCart.SHOW_CART)

            return { ...state, ifShow: true }

        // -------------------
        case TypeActionCart.HIDDEN_CART:

            console.log(TypeActionCart.HIDDEN_CART)

            return { ...state, ifShow: false }

        // -------------------
        default:
            return { ...state }
    }
}