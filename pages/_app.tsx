import '../styles/normalize.css'
import Header from "../components/layout/header/header";
import Footer from '../components/layout/footer/footer';


export default function App({ Component, pageProps }) {
    return (

        <>
            <Header />

            <Component {...pageProps} />
            
            <Footer />
        </>
    )
}