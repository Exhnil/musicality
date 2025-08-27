import { Button } from "@/components/ui/button";
import { Home, Music2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-neutral-900 flex items-center justify-center">
            <div className="text-center space-y-8 px-4">
                <div className="flex justify-center animate-bounce">
                    <Music2 className="h-24 w-24 text-purple-500" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-7xl font-bold text-white">404</h1>
                    <h2 className="text-2xl font-semibold text-white">{t("errors.page_not_found")}</h2>
                    <p className="text-neutral-400 max-w-md mx-auto">{t("errors.silence_back_to_sound")}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full sm:w-auto cursor-pointer">
                        {t("errors.go_back")}
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        {t("errors.back_to_home")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage