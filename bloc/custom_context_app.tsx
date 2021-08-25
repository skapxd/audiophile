import { createContext, Dispatch} from "react";
import { ProductActionI, ListOfProductPayloadI } from "./reducers/product_reducer";
import { TypePopUpAction } from "./reducers/show_popup_reducer";
import getProductValues from "./context/product_context";
import getPopupValues from "./context/popup_context";
import getTotalPriceValues from "./context/total_price_context";
import { TotalPriceActionI, TotalPricePayloadI } from "./reducers/total_price";

export interface CustomContextAppI {
    
    productState: ListOfProductPayloadI
    setProduct: Dispatch<ProductActionI>

    popupState: boolean
    setPopup: Dispatch<TypePopUpAction>

    totalPriceState: TotalPricePayloadI
    setTotalPrice: Dispatch<TotalPriceActionI>
}


export const CustomContextApp = createContext<CustomContextAppI>(undefined);


export function customContextValues() {

    const productsValues = getProductValues()

    const popupValues = getPopupValues()

    const totalPriceValues = getTotalPriceValues()


    const customContextValues: CustomContextAppI = {
        ...productsValues,
        ...popupValues,
        ...totalPriceValues
    };

    return customContextValues
}
