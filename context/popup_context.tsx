import { useReducer } from "react";
import popupReducer from "../reducers/show_popup";

export default function getPopupValues() {

    const initPopup = false;
    const [popupState, setPopup] = useReducer(popupReducer, initPopup)

    return {
        popupState,
        setPopup
    }
}

