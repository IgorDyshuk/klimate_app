import {Button} from "@/components/ui/button.tsx";
import {AlertTriangle, MapPin, RefreshCw} from "lucide-react";
import {useGetLocation} from "@/hooks/use-geolocation.ts";
import WeatherSkeleton from "@/components/loading-skeleton.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {useForecastQuery, useReverseGeocodeQuery, useWeatherQuery} from "@/hooks/use-weather.ts";
import CurrentWeather from "@/components/current-weather.tsx";
import HourlyTemperature from "@/components/hourly-temperature.tsx";
import WeatherDetails from "@/components/weather-details.tsx";
import WeatherForecast from "@/components/weather-forecst.tsx";
import FavouriteCities from "@/components/favourite-cities.tsx";

export default function WeatherDashboard() {
    const {
        coordinates,
        error: locationError,
        getLocation,
        isLoading: locationLoading,
    } = useGetLocation()

    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)
    const locationQuery = useReverseGeocodeQuery(coordinates)
    console.log(locationQuery)

    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };

    if (locationLoading) {
        return <WeatherSkeleton/>
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button onClick={getLocation} variant={"outline"} className={"w-fit"}>
                        <MapPin className="mr-2 h-4 w-4"/>
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather.</p>
                    <Button onClick={getLocation} variant={"outline"} className={"w-fit"}>
                        <MapPin className="mr-2 h-4 w-4"/>
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    const locationName = locationQuery.data?.[0]

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button onClick={handleRefresh} variant={"outline"} className={"w-fit"}>
                        <RefreshCw className="mr-2 h-4 w-4"/>
                        retry
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton/>
    }

    return (
        <div className={"space-y-4"}>
            <FavouriteCities/>
            <div className="flex items-center justify-between">
                <h1 className={"text-xl font-bold tracking-tight"}>My Location</h1>
                <Button variant={'outline'}
                        size={"icon"}
                        onClick={handleRefresh}
                        disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}/>
                </Button>
            </div>

            <div className="grid gap-6">
                <div className={"flex flex-col lg:flex-row gap-4"}>
                    {/*current weather*/}
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />

                    {/*hourly temperature*/}
                    <HourlyTemperature data={forecastQuery.data}/>
                </div>

                <div className={"grid gap-6 md:grid-cols-2 items-start"}>
                    {/*details*/}
                    <WeatherDetails data={weatherQuery.data}/>

                    {/*forecast*/}
                    <WeatherForecast data={forecastQuery.data}/>
                </div>
            </div>
        </div>
    )
}