import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Library } from "lucide-react"
import AlbumsTable from "./AlbumsTable"
import AddAlbumDialog from "./AddAlbumDialog"
import { useTranslation } from "react-i18next"

const AlbumsTabContent = () => {
  const { t } = useTranslation()
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="h-5 w-5 text-violet-500" />
              {t("albums.albums_library")}
            </CardTitle>
            <CardDescription>{t("albums.manage_collection")}</CardDescription>
          </div>
          <AddAlbumDialog />
        </div>
      </CardHeader>

      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  )
}

export default AlbumsTabContent