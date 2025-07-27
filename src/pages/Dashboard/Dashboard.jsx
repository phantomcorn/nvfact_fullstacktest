import { useTranslation } from "react-i18next";

export default function Dashboard() {
    const {t, i18n} = useTranslation("dashboard")

    return (
        <div>
            Dashboard
        </div>
    )
}