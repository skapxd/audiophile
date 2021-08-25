import '../styles/normalize.css'
import Head from "next/head";
import Header from "../components/layout/header/header";
import Footer from '../components/layout/footer/footer';
import PopupCart from '../components/popup_cart/popup_cart';
import { CustomContextApp, customContextValues } from '../context/custom_app_context';

export default function App({ Component, pageProps }) {

    return (

        <>

            <Head>

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />

            </Head>

            <CustomContextApp.Provider value={customContextValues()}>

                <PopupCart />

                <Header />

                <Component {...pageProps} />

                <Footer />
            </CustomContextApp.Provider>
        </>
    )
}