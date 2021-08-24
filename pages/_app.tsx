import '../styles/normalize.css'
import Header from "../components/layout/header/header";
import Footer from '../components/layout/footer/footer';
import PopupCart from '../components/popup_cart/popup_cart';
import { PopUpCart, } from '../context/product_context';
import { useReducer, useState } from 'react';
import cartReducer from '../reducers/cart_reducer/cart_reducer';


export default function App({ Component, pageProps }) {

    const [state, dispatch] = useReducer(cartReducer, {})



    return (

        <>
            <PopUpCart.Provider value={{ state, dispatch }}>

                <PopupCart />

                <Header />

                <Component {...pageProps} />

                <Footer />
            </PopUpCart.Provider>
        </>
    )
}