import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "@/components/ui/layout.tsx";
import {ThemeProvider} from "@/contex/theme-proider.tsx";
import WatherDashbord from "@/pages/wather-dashbord.tsx";
import CityPage from "@/pages/CityPage.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<WatherDashbord/>} />
                            <Route path="/city/:cityName" element={<CityPage/>} />
                        </Routes>
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
        </>
    )
}

export default App
