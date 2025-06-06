import './App.css'
import {HashRouter, Routes, Route} from "react-router-dom";
import Layout from "@/components/layout.tsx";
import {ThemeProvider} from "@/contex/theme-proider.tsx";
import WeatherDashboard from "@/pages/wather-dashbord.tsx";
import CityPage from "@/pages/city-page.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Toaster} from "sonner";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 15 * 60 * 1000,
            retry: false,
            refetchOnWindowFocus: false,
        }
    }
})

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <HashRouter>
                    <ThemeProvider defaultTheme="dark">
                        <Layout>
                            <Routes>
                                <Route path="/" element={<WeatherDashboard/>}/>
                                <Route path="/city/:cityName" element={<CityPage/>}/>
                            </Routes>
                        </Layout>
                        <Toaster richColors/>
                    </ThemeProvider>
                </HashRouter>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </>
    )
}

export default App
