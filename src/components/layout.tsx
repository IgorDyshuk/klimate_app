import {PropsWithChildren} from 'react'
import Header from "@/components/header.tsx";

export default function Layout({children}: PropsWithChildren) {
    return (
        <div className="bg-gradient-to-br from-background to-muted ">
            <Header />
            <main className="min-h-screen container mx-auto sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <footer className={'border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60'}>
                <div className={'container mx-auto px-4 text-center text-grey-400'}>
                    <p>Made by IgorDyshuk</p>
                </div>
            </footer>
        </div>
    )
}