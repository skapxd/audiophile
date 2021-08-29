import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { CustomContextApp } from '../../bloc/custom_context_app';

import CustomField from "../../components/checkout/custom_field/custom_field";
import MapPopup from "../../components/checkout/map_popup/map_popup";

import Style from "./checkout.module.sass";

import { CreatePreferencePayload, PreferenceItem } from 'mercadopago/models/preferences/create-payload.model';
import { Environments } from "../../env/enviroments";
import { PreferenceCreateResponse } from "mercadopago/resources/preferences";
import { compareObject } from "../../utils/compare_objects";
import Decimal from "decimal.js-light";


export default function Checkout() {

    const { productState, totalPriceState } = useContext(CustomContextApp);

    const router = useRouter()

    const [form, setForm] = useState({

        ifPhoneValid: false,
        ifEmailValid: false,
        name: '',
        email: '',
        phone: '',
        latLng: {
            lat: 0,
            lng: 0,
        }
    });

    const handlerPayment = async () => {

        const items: PreferenceItem[] = productState.products.map((e) => {



            const item: PreferenceItem = {
                id: e.id.toString(),
                category_id: 'e',
                currency_id: 'COP',
                description: 'qeq',
                picture_url: e.img,
                title: e.name,
                quantity: e.qty,
                unit_price: +(new Decimal(e.price).mul(1.19).toFixed(3)).toString().replace('.', '')
            }
            return item
        })


        const [area_code, ...listNumber] = form.phone.split(' ')

        const number = +listNumber.join('')


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = {
            items,
            "payer": {
                "name": form.name,
                "email": form.email,
                "phone": {
                    "area_code": `${area_code}`,
                    "number": number
                }
            },
            "back_urls": {
                "success": `${Environments.interface.hostname}/success`,
                "failure": `${Environments.interface.hostname}/failure`,
                "pending": `${Environments.interface.hostname}/pending`
            },
            "auto_return": "approved",
            "notification_url": `${Environments.interface.hostname}/api/mercado_pago/notification`,
            "statement_descriptor": "audiophile",
            "expires": true
        }
        const postBody = JSON.stringify(raw)


        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: postBody,
            redirect: 'follow'
        };

        try {

            const resp = await fetch(`${Environments.interface.hostname}/api/mercado_pago`, requestOptions)
            const data = await resp.json()

            const client = {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
            window.open(
                data[Environments.interface.openLinkToPayMercadoPago],
                '',
                `resizable=no,toolbar=no,scrollbars=yes,height=${client.height},width=${client.width},top=145,left=235`
            );

        } catch (error) {
            console.log(error)
        }

    }

    const [showMap, setShowMap] = useState(false);

    return (

        <div>
            {
                !showMap
                    ? <> </>
                    : <MapPopup
                        onBack={() => { setShowMap(false) }}
                        onChangeLocation={(latLng) => {
                            setForm((s) => ({
                                ...s,
                                latLng
                            }))
                        }}
                    />
            }



            <div className={Style.bg}>

                <div className={Style.bg_checkout}>


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
                                    type='text'
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
                                    type='email'
                                    pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
                                    name='email address'
                                    placeholder='franken@luna.com'
                                    value={form.email}
                                    onChange={(value, isValid) => {
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
                                    pattern='\+[0-9 ]+'
                                    type='phone'
                                    name='phone number'
                                    placeholder='+57 300 000 0000'
                                    value={form.phone}
                                    onChange={(value, isValid) => {
                                        setForm((s) => ({
                                            ...s,
                                            phone: value,
                                            ifPhoneValid: value.length === 0 ? false : isValid,
                                        }))
                                    }}
                                />
                            </div>


                            <div
                                className={Style.bg_form_groupFields_customField}
                            >
                                <CustomField
                                    type='text'
                                    autocomplete='off'
                                    name='location'
                                    placeholder='click to open map'
                                    value={form.latLng.lat === 0 ? '' : `lat: ${form.latLng.lat} - lng: ${form.latLng.lng}`}
                                    onChange={(value) => { }}
                                    onClick={() => {
                                        setShowMap(true)
                                    }}
                                />
                            </div>

                        </div>
                    </div>


                </div>

                <div className={Style.bg_summary}>

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
                                $ {+totalPriceState.value.toFixed(3)}
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
                        <button
                            onClick={handlerPayment}
                            className={
                                form.ifPhoneValid
                                    && totalPriceState.value !== 0
                                    && form.name !== ''
                                    && form.email !== ''
                                    && !compareObject({ object1: form.latLng, object2: { lat: 0, lng: 0, } })
                                    ? Style.bg_form_resume_buttonPay
                                    : Style.bg_form_resume_buttonPay_disabled
                            }>
                            continue & pay
                        </button >
                    </div>

                </div>

            </div>
        </div>
    )
}

