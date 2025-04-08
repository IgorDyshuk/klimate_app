import {useEffect, useState} from "react";
import type {Coordinates} from "@/api/types.ts";

interface GeoocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function useGetLocation() {
    const [locationData, setLocationData] = useState<GeoocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    })

    const getLocation = () => {
        setLocationData((prev) => ({...prev, isLoading: true, error: null}))

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolaction is not supported by your browser",
                isLoading: false,
            })
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    error: null,
                    isLoading: false,
                });
            },
            (error) => {
                let errorMessage: string;

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied. Please enable your location access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable. Please enable your location access.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                }

                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );

    }

    useEffect(() => {
        getLocation()
    }, [])

    return {
        ...locationData,
        getLocation,
    }
}