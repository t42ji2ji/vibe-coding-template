import CustomCursor from "@/components/CustomCursor"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import Features from "@/pages/Features"
import { motion } from "framer-motion"
import { Globe } from 'lucide-react'
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

const LanguageToggle = () => {
    const { i18n } = useTranslation()

    const toggleLanguage = () => {
        const currentLang = i18n.language
        const newLang = currentLang === 'en' ? 'zh' : 'en'
        i18n.changeLanguage(newLang)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            tabIndex={0}
        >
            <Globe className="h-5 w-5" />
        </Button>
    )
}

const Home = () => {
    const [count, setCount] = useState(0)
    const { t } = useTranslation()

    const titleChars = t("app.title").split("")

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center p-4 flex-grow">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                    className="text-center"
                >
                    <h1 className="text-5xl sm:text-6xl font-bold mb-4 flex justify-center flex-wrap">
                        {titleChars.map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                    type: "spring",
                                    stiffness: 100
                                }}

                                className="inline-block mx-[1px] text-foreground"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-2">
                        {t("app.description")}
                    </p>
                    <p className="text-muted-foreground mb-8">
                        {t("app.createdBy")} <a href="https://www.threads.net/@dorara_hsieh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dorara_hsieh</a>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link to="/features">{t("buttons.exploreFeatures")}</Link>
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => setCount(count + 1)}>
                            {t("buttons.count", { count })}
                        </Button>
                    </div>
                </motion.div>
            </div>
            <footer className="container mx-auto py-8 px-4 border-t">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-muted-foreground">{t("app.copyright")}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Button variant="ghost" size="sm" asChild>
                            <a href="https://github.com/t42ji2ji/vibe-coding-template" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </Button>
                    </div>
                </div>
            </footer>

        </div>
    )
}

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