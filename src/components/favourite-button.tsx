import {WeatherData} from "@/api/types.ts";
import {useFavourite} from "@/hooks/use-favourite.ts";
import {Button} from "@/components/ui/button.tsx";
import {Star} from "lucide-react";
import {toast} from "sonner";

interface FavouriteButtonProps {
    data: WeatherData
}

export default function FavouriteButton({data}: FavouriteButtonProps) {
    const {addFavourite, removeFavourite, isFavourite} = useFavourite()
    const isCurrentlyFavourite = isFavourite(data.coord.lat, data.coord.lon)

    const handleToggleFavourite = () => {
        if (isCurrentlyFavourite) {
            removeFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.error(`Removed ${data.name} from favourites`)
        } else {
            addFavourite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            })
            toast.success(`Added ${data.name} to favourites`)
        }
    }

    return (
        <Button
            variant={isCurrentlyFavourite ? "default" : "outline"}
            size="icon"
            onClick={handleToggleFavourite}
            className={isCurrentlyFavourite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
        >
            <Star className={`h-4 w-4 ${isCurrentlyFavourite ? "fill-current" : ""}`}/>
        </Button>
    )
}