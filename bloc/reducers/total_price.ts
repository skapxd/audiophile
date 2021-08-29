import { Decimal } from 'decimal.js-light';


export enum TypeTotalPriceAction {
    ADD = 'ADD',
    SUBTRACT = 'SUBTRACT',
    RESET = 'RESET',
    UPDATE = 'UPDATE',


}

export interface TotalPricePayloadI {
    value: number
}

export interface TotalPriceActionI {
    payload: TotalPricePayloadI
    type: TypeTotalPriceAction
}

export default function totalPriceReducer(state: TotalPricePayloadI, action: TotalPriceActionI): TotalPricePayloadI {


    switch (action.type) {
        case TypeTotalPriceAction.ADD:

            return {
                value: +(new Decimal(state.value).add(action.payload.value).toFixed(3))
            }

        // 
        case TypeTotalPriceAction.SUBTRACT:

            if (state.value > 0) {
                return {
                    value: +(new Decimal(state.value).minus(action.payload.value).toFixed(3))
                }

            }

            return state

        // 
        case TypeTotalPriceAction.RESET:

            return {
                value: 0
            }


        case TypeTotalPriceAction.UPDATE:

            return {
                value: action.payload.value
            }
        // 
        default:
            return state;
    }
}
