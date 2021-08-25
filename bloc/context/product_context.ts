import { useReducer } from "react"
import productReducer, { ListOfProductPayloadI } from "../reducers/product_reducer"

export default function getProductValues() {
    const initCart: ListOfProductPayloadI = {}
    
    const [productState, setProduct] = useReducer(productReducer, initCart)

    return {
        productState,
        setProduct
    }
}