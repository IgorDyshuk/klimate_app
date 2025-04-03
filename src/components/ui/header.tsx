import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className={'container mx-auto px-4 flex h-16 items-center justify-between'}>
            <Link to="/">
                <img src={'/logo.png'} alt="Klimate logo" className={'h-14'} />
            </Link>

            <div>
                {/* search */}
                {/*theme toggle*/}
            </div>
        </div>
        </header>
    )
}