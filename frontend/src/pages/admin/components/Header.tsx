import { UserButton } from "@clerk/clerk-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const Header = () => {
    const { t } = useTranslation()
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-8">
                <Link to="/" className="rounded-lg">
                    <img src="/musicality.png" className="size-10 rounded-full text-black" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">{t("dashboard.music_manager")}</h1>
                    <p className="text-zinc-400 mt-1">{t("dashboard.manage_music_catalog")}</p>
                </div>
            </div>
            <UserButton />
        </div>
    )
}

export default Header