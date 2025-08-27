import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

function AuthCallbackPage() {
    const { isLoaded, user } = useUser()
    const navigate = useNavigate()
    const syncAttempted = useRef(false)
    const { t } = useTranslation()

    useEffect(() => {
        const syncUser = async () => {
            if (!isLoaded || !user || syncAttempted.current) return;

            try {
                await axiosInstance.post("/auth/callback", {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl: user.imageUrl
                });
                syncAttempted.current = true;
            } catch (error) {
                console.log("Error in auth callback", error)
            } finally {
                navigate("/")
            }
        }
        syncUser()
    }, [isLoaded, user, navigate])


    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <Loader className="size-6 text-purple-500 animate-spin" />
                    <h3 className="text-zinc-400 text-xl font-bold">{t("auth.logged_in")}</h3>
                    <p className="text-zinc-400 text-sm">{t("auth.redirecting")}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default AuthCallbackPage