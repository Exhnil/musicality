import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Language = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline" size="sm" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {i18n.language.toUpperCase()}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() => changeLanguage("en")}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => changeLanguage("fr")}>
                        Français
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => changeLanguage("jp")}>
                        日本語
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Language