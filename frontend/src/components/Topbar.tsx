import { SignedOut, UserButton } from "@clerk/clerk-react"
import { LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { SignInOAuthButton } from "./SignInOAuthButton"
import { useAuthStore } from "@/store/useAuthStore"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import Language from "@/layout/components/Language"

const Topbar = () => {
    const { isAdmin } = useAuthStore();
    const { t } = useTranslation();

    return (
        <div className=' rounded-t-lg flex items-center justify-between p-4 sticky top-0
         bg-zinc-900/75 backdrop-blur-md z-10'>
            <div className="flex items-center gap-2">
                <img className="size-8 rounded-full" alt="Logo" src="/musicality.png" />
                {t("ui.musicality")}

            </div>
            <div className="flex items-center gap-4">
                <Language />

                {isAdmin && (
                    <Link to={"/admin"}
                        className={cn(
                            buttonVariants({
                                variant: "outline"
                            })
                        )}>
                        <LayoutDashboardIcon className="size-4 mr-2" />
                        {t("dashboard.admin_dashboard")}
                    </Link>
                )}

                <SignedOut>
                    <SignInOAuthButton />
                </SignedOut>

                <UserButton />
            </div>
        </div>
    )
}

export default Topbar