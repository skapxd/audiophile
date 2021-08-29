import Style from "./map_popup.module.sass";
import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";


interface LatLngI {
    lat: number
    lng: number
}
interface MapPopupI {
    onBack: () => void
    onChangeLocation: (latLng: LatLngI) => void
}

export default function MapPopup(data: MapPopupI) {

    let map: google.maps.Map
    let infoWindow: google.maps.InfoWindow;
    let markers: google.maps.Marker[] = []
    let latLng: LatLngI = {
        lat: 0,
        lng: 0
    }

    const loader = new Loader({
        apiKey: "AIzaSyArhQs7A008ckA6YIUZ07OPAb2TMG74Ncs",
        version: "weekly",
    });

    const initMap = () => {

        let listenerClick: google.maps.MapsEventListener;

        loader.load().then(() => {
            map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                disableDefaultUI: true,
                zoom: 5,
                center: {
                    lat: 0,
                    lng: 0
                },
            });
            infoWindow = new google.maps.InfoWindow();

            console.log('add event listener')
            listenerClick = map.addListener('click', (e) => {
                console.log(e)

                let lat = e.latLng.lat()
                let lng = e.latLng.lng()

                latLng = {
                    lat, lng
                }

                markers?.forEach((e) => {
                    e.setMap(null);
                })

                const marker = new google.maps.Marker({
                    position: latLng,
                    map
                })

                markers.push(marker)
            })
        });

        return () => {
            console.log('delete event listener')
            google.maps.event.removeListener(listenerClick);
        }
    }

    // initMap()
    useEffect(initMap, []);


    const success = (position: GeolocationPosition) => {
        latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        markers?.forEach((e) => {
            e.setMap(null);
        })

        const marker = new google.maps.Marker({
            position: latLng,
            map
        })

        markers.push(marker)
        infoWindow.open(map);
        map.setCenter(latLng);
    }

    const locationHandler = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                success,
                () => { },
                { enableHighAccuracy: true, maximumAge: 10000 }
            )
        }
    }




    return (
        <div className={Style.mapPopup}>

            <div
                className={Style.mapPopup_bg}
                onClick={() => {
                    data.onBack()
                    data.onChangeLocation(latLng)
                }}
            ></div>

            <div className={Style.mapPopup_wrapper}>

                <div className={Style.mapPopup_wrapper_navbar}>

                    <svg
                        onClick={() => {
                            data.onBack()
                            data.onChangeLocation(latLng)
                        }}
                        className={Style.mapPopup_wrapper_navbar_backArrow}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257.57 451.85"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M0,225.92a31.56,31.56,0,0,1,9.26-22.37L203.55,9.27A31.64,31.64,0,0,1,248.3,54L76.39,225.92l171.9,171.91a31.64,31.64,0,0,1-44.75,44.74L9.26,248.29A31.52,31.52,0,0,1,0,225.92Z" /></g></g></svg>

                    <h3 className={Style.mapPopup_wrapper_navbar_title}>
                        select your location
                    </h3>


                    <svg

                        onClick={() => {
                            data.onBack()
                            data.onChangeLocation(latLng)
                        }}
                        className={Style.mapPopup_wrapper_navbar_save}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.89 356.14"><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><path d="M9.89,218.34,137.51,346.2a33.83,33.83,0,0,0,47.86,0L474,57.92a33.84,33.84,0,0,0-.15-48l-.15-.14A33.84,33.84,0,0,0,426,9.9L185.35,250.26a33.84,33.84,0,0,1-47.84,0L57.77,170.51a33.84,33.84,0,0,0-47.94.08h0A33.84,33.84,0,0,0,9.89,218.34Z" /></g></g></svg>

                </div>

                <div className={Style.mapPopup_wrapper_navbar_map}>

                    <div style={{
                        height: '100%',
                        width: '100%'
                    }} id="map">

                    </div>


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
