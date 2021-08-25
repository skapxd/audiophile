import { useReducer } from "react";
import popupReducer from "../reducers/show_popup_reducer";

export default function getPopupValues() {

    const [popupState, setPopup] = useReducer(popupReducer, false)

    return {
        popupState,
        setPopup
    }
}

