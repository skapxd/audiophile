import { useCallback, useContext, useState } from "react";
import Style from "./checkout.module.sass";

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { CustomContextApp } from '../../bloc/custom_context_app';
import Link from 'next/link';

// declare const google: any;

interface CustomFieldI {
    name: string
    placeholder: string
    onChange: (value: string) => void
    disable?: boolean
    onClick?: () => void
    value?: string
}

const CustomField = (data: CustomFieldI) => {


    return (
        <div

            onClick={() => { data.onClick && data.onClick() }}
            className={Style.customFieldContainer}
        >

            <div className={Style.customFieldContainer_name}>
                {data.name}
            </div>

            <input
                type="text"
                className={Style.customFieldContainer_input}
                disabled={data.disable ?? false}

                id={data.name}
                name={data.name}
                value={data.value ?? ''}
                placeholder={data.placeholder}
                onChange={(e) => { data.onChange(e.target.value) }}

            />
        </div>
    )
}

function MapPopup({ onBack }: { onBack: () => void }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyArhQs7A008ckA6YIUZ07OPAb2TMG74Ncs"
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        // @ts-ignore
        const bounds = new window.google.maps.LatLngBounds([6.0249862, -75.4367498]);
        // const bounds = window.google.maps.LatLngBounds();


        console.log(bounds)
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const locationHandler = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                // setForm((s) => ({
                //     ...s,
                //     location: {
                //         lat: position.coords.latitude,
                //         lng: position.coords.longitude,
                //     }
                // }))

            })
        }
    }
    return (
        <div className={Style.mapPopup}>

            <div
                className={Style.mapPopup_bg}
                onClick={onBack}
            ></div>

            <div className={Style.mapPopup_wrapper}>

                <div className={Style.mapPopup_wrapper_navbar}>

                    <svg
                        onClick={onBack}
                        className={Style.mapPopup_wrapper_navbar_backArrow}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257.57 451.85"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M0,225.92a31.56,31.56,0,0,1,9.26-22.37L203.55,9.27A31.64,31.64,0,0,1,248.3,54L76.39,225.92l171.9,171.91a31.64,31.64,0,0,1-44.75,44.74L9.26,248.29A31.52,31.52,0,0,1,0,225.92Z" /></g></g></svg>

                    <h3 className={Style.mapPopup_wrapper_navbar_title}>
                        select your location
                    </h3>


                </div>

                <div className={Style.mapPopup_wrapper_navbar_map}>

                    {
                        !isLoaded
                            ? <></>
                            : (
                                <GoogleMap
                                    options={{ disableDefaultUI: true, }}
                                    onClick={map => {
                                        console.log(map);
                                        const lat = map.latLng.lat()
                                        console.log(lat)
                                    }}

                                    mapContainerStyle={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    zoom={4}
                                    center={{
                                        lat: 6.0249862,
                                        lng: -75.4367498
                                    }}
                                    onLoad={onLoad}
                                    onUnmount={onUnmount}
                                >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    <></>
                                </GoogleMap>
                            )
                    }


                    <div
                        onClick={locationHandler}
                        className={Style.mapPopup_wrapper_navbar_map_buttonLocation}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274.65 395.71">
                            <g id="Capa_2" data-name="Capa 2">
                                <g id="Capa_1-2" data-name="Capa 1">
                                    <path d="M137.32,0C61.6,0,0,61.61,0,137.33c0,72.89,124.59,243.18,129.9,250.39l4.95,6.73a3.06,3.06,0,0,0,5,0l4.95-6.73c5.31-7.21,129.9-177.5,129.9-250.39C274.65,61.61,213,0,137.32,0Zm0,88.14a49.19,49.19,0,1,1-49.19,49.19A49.24,49.24,0,0,1,137.32,88.14Z" />
                                </g>
                            </g>
                        </svg>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default function Checkout() {

    const { productState, totalPriceState } = useContext(CustomContextApp);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        location: {
            lat: 0,
            lng: 0,
        }
    });

    const [showMap, setShowMap] = useState(false);

    return (

        <div>
            {
                !showMap
                    ? <> </>
                    : <MapPopup
                        onBack={() => { setShowMap(false) }}
                    />
            }



            <div className={Style.bg}>

                <div className={Style.bg_form}>

                    <h2 className={Style.bg_form_pageTitle}>
                        checkout
                    </h2>

                    <div className={Style.bg_form_groupFields}>
                        <h3 className={Style.bg_form_groupFields_title}>billing details</h3>

                        <CustomField
                            name='name'
                            placeholder='franken luna'
                            value={form.name}
                            onChange={(value) => {
                                setForm((s) => ({
                                    ...s,
                                    name: value
                                }))
                            }}
                        />

                        <CustomField
                            name='email address'
                            placeholder='franken@luna.com'
                            value={form.email}
                            onChange={(value) => {
                                setForm((s) => ({
                                    ...s,
                                    email: value
                                }))
                            }}
                        />

                        <CustomField
                            name='phone number'
                            placeholder='300 000 0000'
                            value={form.phone}
                            onChange={(value) => {
                                setForm((s) => ({
                                    ...s,
                                    phone: value
                                }))
                            }}
                        />

                        <CustomField
                            name='location'
                            placeholder='click to open map'
                            disable={true}
                            value={form.location.lat === 0 ? '' : `lat: ${form.location.lat} - lng: ${form.location.lng}`}
                            onChange={(value) => { }}
                            onClick={() => {
                                setShowMap(true)
                            }}
                        />

                    </div>
                </div>

                <div className={Style.bg_form}>

                    <h2 className={Style.bg_form_pageSubtitle}>summary</h2>

                    {
                        productState.products?.map((e) => {

                            return (
                                <div
                                    key={e.id}
                                    className={Style.bg_form_summaryItem}
                                >

                                    <div
                                        className={Style.bg_form_summaryItem_img}
                                    >
                                        <img
                                            src={e.img}
                                            alt={e.name}
                                        />
                                    </div>


                                    <div
                                        className={Style.bg_form_summaryItem_info}
                                    >

                                        <h4
                                            className={Style.bg_form_summaryItem_info_name}
                                        >
                                            {e.name}
                                        </h4>


                                        <h4
                                            className={Style.bg_form_summaryItem_info_price}
                                        >
                                            $ {e.price}
                                        </h4>



                                    </div>
                                    <h4
                                        className={Style.bg_form_summaryItem_qty}
                                    >
                                        x  {e.qty}
                                    </h4>

                                </div>
                            )
                        })
                    }

                    <div className={Style.bg_form_resume}>
                        <h5 className={Style.bg_form_resume_title}>
                            Total
                        </h5>

                        <h5 className={Style.bg_form_resume_values}>
                            $ {+totalPriceState.value}
                        </h5>
                    </div>

                    <div className={Style.bg_form_resume}>
                        <h5 className={Style.bg_form_resume_title}>
                            Tax
                        </h5>

                        <h5 className={Style.bg_form_resume_values}>
                            $ {+(totalPriceState.value * 0.19).toFixed(3)}
                        </h5>
                    </div>


                    <div className={Style.bg_form_resume}>
                        <h5 className={Style.bg_form_resume_title}>
                            grand total
                        </h5>

                        <h5 className={Style.bg_form_resume_grandTotal}>
                            $ {+(totalPriceState.value * 1.19).toFixed(3)}
                        </h5>
                    </div>

                    <Link href='/pay'>
                        <a className={Style.bg_form_resume_buttonPay}>
                            continue & pay
                        </a >
                    </Link>
                </div>


            </div>
        </div>
    )
}