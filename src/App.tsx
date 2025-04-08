import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "@/components/ui/layout.tsx";
import {ThemeProvider} from "@/contex/theme-proider.tsx";
import WeatherDashboard from "@/pages/wather-dashbord.tsx";
import CityPage from "@/pages/CityPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

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
                <BrowserRouter>
                    <ThemeProvider defaultTheme="dark">
                        <Layout>
                            <Routes>
                                <Route path="/" element={<WeatherDashboard/>}/>
                                <Route path="/city/:cityName" element={<CityPage/>}/>
                            </Routes>
                        </Layout>
                    </ThemeProvider>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </>
    )
}

export default App
