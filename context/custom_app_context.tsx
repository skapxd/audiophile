import { createContext, Dispatch, useReducer } from "react";
import { CartActionI, CartPayloadI } from "../reducers/cart_reducer";
import { TypePopUpAction } from "../reducers/show_popup";
import getCartValues from "./cart_context";
import getPopupValues from "./popup_context";

export interface CustomContextAppI {
    cartPopupState: CartPayloadI
    cartPopupDispatch: Dispatch<CartActionI>

    popupState: boolean
    setPopup: Dispatch<TypePopUpAction>
}

export const CustomContextApp: any = createContext(undefined);


export function customContextValues() {

    const cartValues = getCartValues()

    const popupValues = getPopupValues()


    const customContextValues: CustomContextAppI = {
        ...cartValues,
        ...popupValues,
    };

    return customContextValues
}
