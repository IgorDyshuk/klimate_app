import {ForecastData} from "@/api/types.ts";
import {format} from "date-fns";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ArrowDown, ArrowUp, Droplets} from "lucide-react";
import {useEffect, useRef, useState} from "react";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }
}

export default function WeatherForecast({data}: WeatherForecastProps) {
    const dailyForecast = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.min(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;
    }, {} as Record<string, DailyForecast>);

    const nextDays = Object.values(dailyForecast).slice(0, 6);


    const formatTemp = (temp: number) => `${Math.round(temp)}°`

    const containerRef = useRef<HTMLDivElement>(null);
    const [isWide, setIsWide] = useState(true);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            setIsWide(entry.contentRect.width > 470);
        })
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div ref={containerRef} id={"forecast-div"} className={"grid gap-4"}>
                    {nextDays.map((day) => {
                            return <div
                                key={day.date}
                                className={"grid grid-cols-3 items-center gap-4 rounded-lg border p-4"}
                            >
                                <div>
                                    <p className={"font-medium text-nowrap"}>{format(new Date(day.date * 1000), "EEE, MMM d ")}</p>
                                    <p className={"text-sm text-muted-foreground capitalize text-nowrap"}>{day.weather.description}</p>
                                </div>

                                {/*temperature info*/}
                                <div className={`flex ${
                                    isWide
                                        ? "flex-row justify-center gap-4"
                                        : "flex-col-reverse items-end"
                                }`}>
                                    <span className={"flex items-center text-blue-500"}>
                                        <ArrowDown className="h-4 w-4 mr-1"/>
                                        {formatTemp(day.temp_min)}
                                    </span>
                                    <span className={"flex items-center text-red-500"}>
                                        <ArrowUp className="h-4 w-4 mr-1"/>
                                        {formatTemp(day.temp_max)}
                                    </span>
                                </div>

                                {/*detailed information*/}
                                <div className={`flex ${
                                    isWide
                                        ? "flex-row justify-end gap-4"
                                        : "flex-col-reverse items-center"
                                }`}>
                                    <span className={"flex items-center gap-1"}>
                                        <Droplets className={"h-4 w-4 text-blue-500"}/>
                                        <span className={"text-sm"}>{day.humidity}%</span>
                                    </span>
                                    <span className={"flex items-center gap-1"}>
                                        <Droplets className={"h-4 w-4 text-blue-500"}/>
                                        <span className={"text-sm text-nowrap"}>{day.wind}m/s</span>
                                    </span>
                                </div>
                            </div>
                        }
                    )}
                </div>
            </CardContent>
        </Card>

    )
}