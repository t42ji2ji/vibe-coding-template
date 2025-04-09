import CustomCursor from "@/components/CustomCursor"
import { ThemeProvider } from "@/components/ThemeProvider"
import Features from "@/pages/Features"
import Home from "@/pages/Home"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LanguageToggle from "./components/LanguageToggle"
import { ThemeToggle } from "./components/ThemeToggle"

function App() {
    const [showCustomCursor, setShowCustomCursor] = useState(true)
    const [cursorColor, setCursorColor] = useState('#000000')
    const [cursorLightColor, setCursorLightColor] = useState('#ffffff')

    return (
        <ThemeProvider defaultTheme="system" storageKey="vibe-ui-theme">
            <BrowserRouter>
                {showCustomCursor && (
                    <CustomCursor
                        color={cursorColor}
                        lightColor={cursorLightColor}
                        invertOnDarkMode
                    />
                )}

                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>

                <Toaster position="top-center" />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/features"
                        element={
                            <Features
                                showCustomCursor={showCustomCursor}
                                setShowCustomCursor={setShowCustomCursor}
                                cursorColor={cursorColor}
                                setCursorColor={setCursorColor}
                                cursorLightColor={cursorLightColor}
                                setCursorLightColor={setCursorLightColor}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App 