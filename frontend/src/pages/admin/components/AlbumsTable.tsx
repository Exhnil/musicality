import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/store/useMusicStore"
import { Calendar, Music, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"

const AlbumsTable = () => {

  const { albums, deleteAlbum } = useMusicStore()
  const { t } = useTranslation()

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>{t("table.title")}</TableHead>
          <TableHead>{t("table.artist")}</TableHead>
          <TableHead>{t("table.release_year")}</TableHead>
          <TableHead>{t("table.songs")}</TableHead>
          <TableHead className="text-right">{t("table.actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img src={album.imageUrl} alt={album.title} className="w-10 h-10 rounded object-cover" />
            </TableCell>
            <TableCell className="font-medium">{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {album.releaseYear}
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Music className="h-4 w-4" />
                {album.songs.length} {t("table.songs")}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                  onClick={() => deleteAlbum(album._id)}>
                  <Trash2 className='size-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AlbumsTable