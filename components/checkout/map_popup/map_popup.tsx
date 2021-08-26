import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useState } from "react";

import Style from "./map_popup.module.sass";
export default function MapPopup({ onBack }: { onBack: () => void }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyArhQs7A008ckA6YIUZ07OPAb2TMG74Ncs"
    })

    // const [map, setMap] = useState(null)

    const [info, setInfo] = useState({
        lat: 6.0249862,
        lng: -75.4367498
    });

    const onLoad = useCallback(function callback(map) {
        // @ts-ignore
        const bounds = new window.google.maps.LatLngBounds(
            // [
            // 6.0249862, -75.4367498 
            // ]
        );
        // const bounds = window.google.maps.LatLngBounds();


        console.log(bounds)
        map.fitBounds(bounds);

        // setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        // setMap(null)
    }, [])

    const success = (position) => {

        setInfo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })

        // setInfo({
        //     lat: 6.0249862,
        //     lng: -75.4367498
        // })

        console.log(position)
    }

    const locationHandler = () => {


        // setInfo({
        //     lat: 6.0249862,
        //     lng: -75.4367498
        // })


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, () => { }, { enableHighAccuracy: true, maximumAge: 10000 })
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
                                    options={{
                                        disableDefaultUI: true,
                                        zoom: 4,
                                        center: {
                                            lat: info.lat,
                                            lng: info.lng,
                                        }
                                    }}
                                    onClick={map => {
                                        console.log(map);
                                        const lat = map.latLng.lat()
                                        const lng = map.latLng.lng()
                                        setInfo({ lng, lat })
                                        console.log(lat)
                                    }}

                                    mapContainerStyle={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    zoom={4}
                                    // @ts-ignore
                                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                                    center={{
                                        lat: info.lat,
                                        lng: info.lng
                                    }}
                                    onLoad={onLoad}
                                    onUnmount={onUnmount}
                                >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    <></>
                                    <Marker
                                        // @ts-ignore
                                        // animation={google.maps.Animation.DROP}
                                        position={{
                                            lat: info.lat,
                                            lng: info.lng,
                                        }}
                                    />
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
