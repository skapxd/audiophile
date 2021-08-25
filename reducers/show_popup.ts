export enum TypePopUpAction {
    SHOW,
    HIDDEN
}

interface PopupReducerI {
    state: boolean
    action: TypePopUpAction
}

export default function popupReducer(state: boolean, action: TypePopUpAction): boolean {

    switch (action) {
        case TypePopUpAction.SHOW:
            return true

        case TypePopUpAction.HIDDEN:
            return false;

        default:
            return false;
    }
}