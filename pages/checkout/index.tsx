import { useContext, useEffect, useState } from "react";
import Link from 'next/link';

import { CustomContextApp } from '../../bloc/custom_context_app';

import CustomField from "../../components/checkout/custom_field/custom_field";
import MapPopup from "../../components/checkout/map_popup/map_popup";

import Style from "./checkout.module.sass";


export default function Checkout() {

    let map: JSX.Element = <MapPopup
    onBack={() => { setShowMap(false) }}
    onChangeLocation={(latLng) => {
        setForm((s) => ({
            ...s,
            latLng
        }))
    }}
/>;

    const { productState, totalPriceState } = useContext(CustomContextApp);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        latLng: {
            lat: 0,
            lng: 0,
        }
    });

    const [showMap, setShowMap] = useState(false);

    useEffect(() => {

        console.log('hola')
        map = (
            <MapPopup
                onBack={() => { setShowMap(false) }}
                onChangeLocation={(latLng) => {
                    setForm((s) => ({
                        ...s,
                        latLng
                    }))
                }}
            />
        )
        // return () => {
        //     cleanup
        // };
    }, [form.latLng]);

    return (

        <div>
            {
                !showMap
                    ? <> </>
                    : map
            }



            <div className={Style.bg}>

                <div className={Style.bg_form}>

                    <h2 className={Style.bg_form_pageTitle}>
                        checkout
                    </h2>

                    <h3 className={Style.bg_form_formTitle}>billing details</h3>

                    <div className={Style.bg_form_groupFields}>


                        <div
                            className={Style.bg_form_groupFields_customField}
                        >
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
                        </div>

                        <div
                            className={Style.bg_form_groupFields_customField}
                        >
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
                        </div>


                        <div
                            className={Style.bg_form_groupFields_customField}
                        >
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
                        </div>


                        <div
                            className={Style.bg_form_groupFields_customField}
                        >
                            <CustomField
                                name='location'
                                placeholder='click to open map'
                                disable={true}
                                value={form.latLng.lat === 0 ? '' : `lat: ${form.latLng.lat} - lng: ${form.latLng.lng}`}
                                onChange={(value) => { }}
                                onClick={() => {
                                    setShowMap(true)
                                }}
                            />
                        </div>

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