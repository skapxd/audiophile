import { useReducer } from 'react';
import totalPriceReducer, { TotalPricePayloadI } from '../reducers/total_price';
export default function getTotalPriceValues() {

    const initPrice: TotalPricePayloadI = {
        value: 0
    }

    const [totalPriceState, setTotalPrice] = useReducer(totalPriceReducer, initPrice)

    return {
        totalPriceState,
        setTotalPrice,
    }
}
