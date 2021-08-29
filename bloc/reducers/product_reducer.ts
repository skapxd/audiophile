
export enum TypeProductAction {
    ADD_PRODUCT = 'ADD_PRODUCT',

    REMOVE_PRODUCT = 'REMOVE_PRODUCT',
    REMOVE_ALL_PRODUCT = 'REMOVE_ALL_PRODUCT',

}

export interface ProductPayloadI {
    id: number
    img: string
    name: string
    price: number
    qty: number
}

export interface ListOfProductPayloadI {
    products?: ProductPayloadI[]
}

export interface ProductActionI {
    type: TypeProductAction
    payload?: ProductPayloadI
}

export default function productReducer(state: ListOfProductPayloadI, action: ProductActionI): ListOfProductPayloadI {

    if (action.type === TypeProductAction.ADD_PRODUCT) {

        let ifProductExist = false
        let newProduct = action.payload

        // En caso de que sea el primer producto, no ejecuta el if
        if (state.products) {

            state.products.forEach((e) => {

                if (e.id === newProduct.id) {
                    ifProductExist = true
                }

            });
        }

        let newState: ListOfProductPayloadI = {
            products: [...(state.products || [])]
        }

        // En caso de que el producto no exista, se añadirá 
        if (!ifProductExist) {

            newState = {
                products: [
                    ...(state.products || []),
                    newProduct
                ],
            };

        }

        // En caso de que el producto exista, se actualizara
        if (ifProductExist) {

            const listTemp = state.products.map((e) => {

                if (e.id === newProduct.id) {
                    return newProduct
                }

                return e
            });

            newState = {
                products: listTemp
            }
        }

        return newState

    }


    if (action.type === TypeProductAction.REMOVE_PRODUCT) {

        const productToDelete = action.payload

        const newState = state.products.filter((e) => {

            if (e.id === productToDelete.id) {
                return
            }
            return e
        })

        return {
            products: newState,
        }
    }

    if (action.type === TypeProductAction.REMOVE_ALL_PRODUCT) {
        return {
            products: []
        }
    }
}