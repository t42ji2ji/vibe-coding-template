import { useTheme } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { motion } from "framer-motion"
import i18n from "i18next"
import { ArrowLeft, Bell, ExternalLink, Home, Menu, Moon, Search, Settings, Sun, User } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

interface FeaturesProps {
    showCustomCursor: boolean;
    setShowCustomCursor: React.Dispatch<React.SetStateAction<boolean>>;
    cursorColor: string;
    setCursorColor: React.Dispatch<React.SetStateAction<string>>;
    cursorLightColor: string;
    setCursorLightColor: React.Dispatch<React.SetStateAction<string>>;
}

const Features = ({
    showCustomCursor,
    setShowCustomCursor,
    cursorColor,
    setCursorColor,
    cursorLightColor,
    setCursorLightColor
}: FeaturesProps) => {
    const navigate = useNavigate()
    const [isAnimated, setIsAnimated] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const { theme, setTheme } = useTheme()
    const { t } = useTranslation()

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    // Animation for the Framer Motion demo
    const boxAnimation = {
        initial: { scale: 1 },
        animate: isAnimated ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1
            }
        } : {}
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto pt-16 pb-16 px-4">

                <Button
                    variant="ghost"
                    className="flex items-center gap-2 mb-16 text-muted-foreground hover:text-primary"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={16} />
                    <span>{t("features.backToHome")}</span>
                </Button>

                {/* Features Section */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-center mb-16">{t("features.powerfulFeatures")}</h2>

                    <div className="space-y-24">
                        {/* Theme Provider (New Section) */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">

                                    {t("features.themeProvider.title")}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {t("features.themeProvider.description")}
                                </p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-emerald-400">
                                        <code>{`// 1. Wrap your app with ThemeProvider
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// 2. Use the theme anywhere in your app
const { theme, setTheme } = useTheme()

// 3. Add theme toggle component
<ThemeToggle />`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Theme Demo */}
                            <div className="flex justify-center">
                                <Card className="w-full max-w-sm">
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <h4 className="font-medium">{t("features.themeOptions")}</h4>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center justify-between">
                                                    <span>{t("features.currentTheme")}</span>
                                                    <span className="font-medium">{theme}</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <Button
                                                        variant={theme === "light" ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setTheme("light")}
                                                        className="w-full"
                                                    >
                                                        <Sun className="h-4 w-4 mr-2" />
                                                        {t("features.light")}
                                                    </Button>
                                                    <Button
                                                        variant={theme === "dark" ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setTheme("dark")}
                                                        className="w-full"
                                                    >
                                                        <Moon className="h-4 w-4 mr-2" />
                                                        {t("features.dark")}
                                                    </Button>
                                                    <Button
                                                        variant={theme === "system" ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setTheme("system")}
                                                        className="w-full"
                                                    >
                                                        <Settings className="h-4 w-4 mr-2" />
                                                        {t("features.system")}
                                                    </Button>
                                                </div>
                                                <div className="bg-card p-4 rounded-lg border">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm">{t("features.toggleTheme")}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                                            <span className="sr-only">{t("features.toggleTheme")}</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>

                        {/* TailwindCSS */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        Tailwind CSS
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.tailwind.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-blue-400">
                                        <code>{`<div className="flex items-center p-4
  bg-white dark:bg-slate-800 rounded-lg
  shadow-md hover:shadow-lg"
>
  <h3 className="text-xl font-bold">
    Simple & Powerful
  </h3>
</div>`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Tailwind Demo */}
                            <div className="flex justify-center">
                                <div className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all w-64">
                                    <h3 className="text-xl font-bold">Simple & Powerful</h3>
                                </div>
                            </div>
                        </motion.div>

                        {/* React Hot Toast */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://react-hot-toast.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        {t("features.toast.title")}
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.toast.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-pink-400">
                                        <code>{`import toast from 'react-hot-toast'

// Success toast
toast.success('Operation completed!')

// Error toast
toast.error('Something went wrong!')

// Promise toast
toast.promise(
  fetchData(),
  {
    loading: 'Loading...',
    success: 'Data fetched!',
    error: 'Error fetching data'
  }
)`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Toast Demo */}
                            <div className="flex justify-center">
                                <Card className="w-full max-w-sm">
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <h4 className="font-medium">{t("features.toast.tryToast")}</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toast.success(t("features.toast.successMessage"))}
                                                    className="w-full"
                                                >
                                                    {t("features.toast.success")}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toast.error(t("features.toast.errorMessage"))}
                                                    className="w-full"
                                                >
                                                    {t("features.toast.error")}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toast(t("features.toast.infoMessage"))}
                                                    className="w-full"
                                                >
                                                    {t("features.toast.info")}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toast(t("features.toast.warningMessage"), { icon: '⚠️' })}
                                                    className="w-full"
                                                >
                                                    {t("features.toast.warning")}
                                                </Button>
                                            </div>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => {
                                                    const promise = new Promise((resolve) => {
                                                        setTimeout(() => resolve('success'), 2000)
                                                    })
                                                    toast.promise(promise, {
                                                        loading: t("features.toast.loading"),
                                                        success: t("features.toast.successMessage"),
                                                        error: t("features.toast.errorMessage"),
                                                    })
                                                }}
                                                className="w-full"
                                            >
                                                {t("features.toast.promise")}
                                            </Button>

                                            <div className="space-y-2">
                                                <h4 className="font-medium">{t("features.toast.positions.title")}</h4>
                                                <p className="text-sm text-muted-foreground">{t("features.toast.positions.description")}</p>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toast.success(t("features.toast.successMessage"), { position: "top-left" })}
                                                        className="w-full"
                                                    >
                                                        {t("features.toast.positions.topLeft")}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toast.success(t("features.toast.successMessage"), { position: "top-center" })}
                                                        className="w-full"
                                                    >
                                                        {t("features.toast.positions.topCenter")}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toast.success(t("features.toast.successMessage"), { position: "top-right" })}
                                                        className="w-full"
                                                    >
                                                        {t("features.toast.positions.topRight")}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toast.success(t("features.toast.successMessage"), { position: "bottom-left" })}
                                                        className="w-full"
                                                    >
                                                        {t("features.toast.positions.bottomLeft")}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toast.success(t("features.toast.successMessage"), { position: "bottom-center" })}
                                                        className="w-full"
                                                    >
                                                        {t("features.toast.positions.bottomCenter")}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toast.success(t("features.toast.successMessage"), { position: "bottom-right" })}
                                                        className="w-full"
                                                    >
                                                        {t("features.toast.positions.bottomRight")}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>

                        {/* i18next */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://www.i18next.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        i18next
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.i18next.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-orange-400">
                                        <code>{`// 1. Initialize i18next
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    zh: { translation: zhTranslations }
  },
  lng: 'en',
  fallbackLng: 'en'
})

// 2. Use translations in components
const { t } = useTranslation()
t('features.title')

// 3. Change language
i18n.changeLanguage('zh')`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* i18next Demo */}
                            <div className="flex justify-center">
                                <Card className="w-full max-w-sm">
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <h4 className="font-medium">{t("features.i18next.languageOptions")}</h4>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center justify-between">
                                                    <span>{t("features.i18next.currentLanguage")}</span>
                                                    <span className="font-medium">{t("features.i18next.selected")}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => i18n.changeLanguage("en")}
                                                        className="w-full"
                                                    >
                                                        {t("features.i18next.english")}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => i18n.changeLanguage("zh")}
                                                        className="w-full"
                                                    >
                                                        {t("features.i18next.chinese")}
                                                    </Button>
                                                </div>
                                                <div className="bg-card p-4 rounded-lg border">
                                                    <div className="space-y-2">
                                                        <p className="text-sm">{t("features.i18next.example")}</p>
                                                        <p className="text-sm font-medium">{t("features.i18next.sampleText")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>

                        {/* Framer Motion */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        Framer Motion
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.framerMotion.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-green-400">
                                        <code>{`<motion.div
  animate={{ 
    scale: [1, 1.1, 1], 
    rotate: [0, 5, -5, 0] 
  }}
  transition={{ 
    duration: 0.5,
    repeat: Infinity,
    repeatDelay: 1
  }}
>
  Animated content
</motion.div>`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Framer Motion Demo */}
                            <div className="flex justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <motion.div
                                        className="bg-primary text-primary-foreground w-32 h-32 rounded-lg flex items-center justify-center shadow-lg"
                                        {...boxAnimation}
                                    >
                                        <span>Animated Box</span>
                                    </motion.div>
                                    <Button onClick={() => setIsAnimated(!isAnimated)}>
                                        {isAnimated ? "Stop Animation" : "Start Animation"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Shadcn/UI */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        Shadcn/UI
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.shadcn.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-purple-400">
                                        <code>{`import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." />
      <Button>Search</Button>
    </div>
  )
}`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Shadcn Demo */}
                            <div className="flex justify-center">
                                <Card className="w-full max-w-sm">
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <Input placeholder="Search..." />
                                                <Button>
                                                    <Search className="h-4 w-4 mr-2" />
                                                    Search
                                                </Button>
                                            </div>
                                            <div className="flex justify-between">
                                                <Button variant="outline" size="sm">Cancel</Button>
                                                <Button size="sm">Submit</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>

                        {/* React Router */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        React Router
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.reactRouter.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-yellow-400">
                                        <code>{`// Using the navigate hook
const navigate = useNavigate();

// Navigate programmatically
<Button onClick={() => navigate('/home')}>
  Go Home
</Button>

// Or use Link component
<Link to="/about">About</Link>`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* React Router Demo */}
                            <div className="flex justify-center">
                                <div className="w-full max-w-sm space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button onClick={() => navigate('/')}>
                                            <Home className="h-4 w-4 mr-2" />
                                            Home
                                        </Button>
                                        <Button variant="outline" onClick={() => navigate(-1)}>
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Go Back
                                        </Button>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg text-center text-sm text-muted-foreground">
                                        Try clicking the buttons to navigate!
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Lucide React */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        Lucide React
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.lucide.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-red-400">
                                        <code>{`import { 
  Home, 
  Settings, 
  User,
  Bell 
} from "lucide-react"

// Use in your components
<Bell size={24} />
<User className="h-6 w-6 text-blue-500" />`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Lucide React Demo */}
                            <div className="flex justify-center">
                                <div className="w-full max-w-sm">
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card hover:bg-accent transition-colors">
                                            <Home className="h-8 w-8" />
                                            <span className="text-xs">Home</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card hover:bg-accent transition-colors">
                                            <User className="h-8 w-8" />
                                            <span className="text-xs">User</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card hover:bg-accent transition-colors">
                                            <Settings className="h-8 w-8" />
                                            <span className="text-xs">Settings</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card hover:bg-accent transition-colors">
                                            <Bell className="h-8 w-8" />
                                            <span className="text-xs">Alerts</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center p-4 bg-card rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Menu className="h-5 w-5" />
                                            <span>Menu</span>
                                        </div>
                                        <Toggle
                                            pressed={isDarkMode}
                                            onPressedChange={setIsDarkMode}
                                            aria-label="Toggle theme"
                                        >
                                            {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                                        </Toggle>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CustomCursor */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    {t("features.customCursor.title")}
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.customCursor.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-cyan-400">
                                        <code>{`import CustomCursor from "@/components/CustomCursor"

// Use in your components
<CustomCursor 
  color="${cursorColor}" 
  lightColor="${cursorLightColor}"
  invertOnDarkMode={true}
/>`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Custom Cursor Demo */}
                            <div className="flex justify-center">
                                <Card className="w-full max-w-sm">
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-4">
                                                <Toggle
                                                    pressed={showCustomCursor}
                                                    onPressedChange={setShowCustomCursor}
                                                    className="w-full justify-between px-4"
                                                >
                                                    <span>{t("features.customCursor.enable")}</span>
                                                    <span>{showCustomCursor ? t("features.on") : t("features.off")}</span>
                                                </Toggle>

                                                <div className="flex gap-2 items-center">
                                                    <label htmlFor="color-picker" className="text-sm">
                                                        {t("features.customCursor.cursorColor")}:
                                                    </label>
                                                    <input
                                                        id="color-picker"
                                                        type="color"
                                                        value={cursorColor}
                                                        onChange={(e) => setCursorColor(e.target.value)}
                                                        className="w-10 h-10 rounded cursor-pointer"
                                                    />
                                                </div>

                                                <div className="flex gap-2 items-center">
                                                    <label htmlFor="light-color-picker" className="text-sm">
                                                        {t("features.customCursor.lightModeColor")}:
                                                    </label>
                                                    <input
                                                        id="light-color-picker"
                                                        type="color"
                                                        value={cursorLightColor}
                                                        onChange={(e) => setCursorLightColor(e.target.value)}
                                                        className="w-10 h-10 rounded cursor-pointer"
                                                    />
                                                </div>

                                                <div className="p-6 bg-slate-200 dark:bg-slate-800 rounded-lg text-center">
                                                    <div className="mb-2 text-sm">{t("features.customCursor.hoverText")}</div>
                                                    <div className="flex gap-4 justify-center">
                                                        <Button>{t("features.customCursor.clickable")}</Button>
                                                        <Button variant="outline">{t("features.customCursor.button")}</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>

                        {/* Vercel Deployment */}
                        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">
                                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                        {t("features.vercel.title")}
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </h3>
                                <p className="text-muted-foreground mb-4">{t("features.vercel.description")}</p>
                                <div className="bg-slate-900 p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm text-violet-400">
                                        <code>{`# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Visit your site`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Vercel Demo */}
                            <div className="flex justify-center">
                                <Card className="w-full max-w-sm">
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <h4 className="font-medium">{t("features.vercel.deploymentSteps")}</h4>
                                            <div className="flex flex-col gap-3">
                                                <div className="bg-card p-4 rounded-lg border">
                                                    <p className="text-sm mb-2">{t("features.vercel.installVercel")}</p>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText("npm i -g vercel")
                                                            toast.success("Command copied to clipboard!")
                                                        }}
                                                        className="w-full"
                                                    >
                                                        npm i -g vercel
                                                    </Button>
                                                </div>

                                                <div className="bg-card p-4 rounded-lg border">
                                                    <p className="text-sm mb-2">{t("features.vercel.deployCommand")}</p>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText("vercel")
                                                            toast.success("Command copied to clipboard!")
                                                        }}
                                                        className="w-full"
                                                    >
                                                        vercel
                                                    </Button>
                                                </div>

                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Features 