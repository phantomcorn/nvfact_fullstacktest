import { useTranslation } from "react-i18next"

export default function LanguageSelect() {

    const {t, i18n} = useTranslation()
    const handleChange = (e) => {
        i18n.changeLanguage(e.target.value)
    }

    return (
        <select onChange={handleChange}>
            <option value="en">ENG</option>
            <option value="th">TH</option>
        </select>
    )
}