import { useState } from "react";
import Style from "./checkout.module.sass";

import GoogleMapReact from 'google-map-react';

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

export default function Checkout() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        location: ''
    });

    const [showMap, setShowMap] = useState(false);

    return (


        <div>


            {
                !showMap
                    ? <> </>
                    : <div className={Style.mapPopup}>

                        <div className={Style.mapPopup_bg}></div>

                        <div className={Style.mapPopup_wrapper}>

                            <div className={Style.mapPopup_wrapper_navbar}>

                                <svg
                                    onClick={() => { setShowMap(false) }}
                                    className={Style.mapPopup_wrapper_navbar_backArrow}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257.57 451.85"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M0,225.92a31.56,31.56,0,0,1,9.26-22.37L203.55,9.27A31.64,31.64,0,0,1,248.3,54L76.39,225.92l171.9,171.91a31.64,31.64,0,0,1-44.75,44.74L9.26,248.29A31.52,31.52,0,0,1,0,225.92Z" /></g></g></svg>

                                <h3 className={Style.mapPopup_wrapper_navbar_title}>
                                    select your location
                                </h3>


                            </div>

                            <div className={Style.mapPopup_wrapper_navbar_map}>

                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyD-t57DZ8464VkpcD6CswgL_kOO1XpE4Iw' }}
                                    defaultCenter={{
                                        lat: 59.95,
                                        lng: 30.33
                                    }}
                                    defaultZoom={1}
                                >
                                </GoogleMapReact>

                            </div>


                        </div>

                    </div>

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
                            value={form.location}
                            onChange={(value) => { }}
                            onClick={() => {
                                setShowMap(true)
                            }}
                        />

                    </div>
                </div>

                <div className={Style.bg_form}>

                    <h2 className={Style.bg_form_pageSubtitle}>summary</h2>


                </div>



            </div>
        </div>
    )
}