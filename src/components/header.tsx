import {Link} from "react-router-dom";
import {useTheme} from "@/contex/theme-proider.tsx";
import {Moon, Sun} from "lucide-react";
import CitySearch from "@/components/city-search.tsx";

export default function Header() {
    const {theme, setTheme} = useTheme()
    const isDark = theme === "dark";

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-0 sm:py-1 lg:py-2 supports-[backdrop-filter]:bg-background/60 overflow-hidden">
            <div className={'container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'}>
                <Link to="/">
                    <img src={isDark ? '/klimate_app/logo.png' : '/klimate_app/logo2.png'} alt="Klimate logo"
                         className={'h-12 sm:h-12 md:h-13 lg:h-14'}/>
                </Link>

                <div className={"flex gap-4 "}>
                    {/* search */}
                    <div className="max-w-[160px] sm: max-w-none">
                        <CitySearch/>
                    </div>

                    {/*theme toggle*/}
                    <div onClick={() => setTheme(isDark ? "light" : "dark")}
                         className={`flex items-center cursor-pointer transition-transform duration-500
                         ${isDark ? "rotate-180" : "rotate-0"}
                         `}
                    >
                        {isDark ?
                            (
                                <Sun className={"h-6 w-6 text-yellow-500 rotate-0 transition-all"}/>
                            )
                            :
                            (
                                <Moon className={"h-6 w-6 text-blue-500 rotate-0 transition-all"}/>
                            )}
                    </div>
                </div>
            </div>
        </header>
    )
}