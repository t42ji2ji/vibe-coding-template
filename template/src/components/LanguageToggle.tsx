import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"

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

export default LanguageToggle
