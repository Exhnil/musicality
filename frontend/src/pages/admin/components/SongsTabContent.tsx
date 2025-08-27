import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music } from 'lucide-react'
import SongsTable from './SongsTable'
import { AddSongDialog } from './AddSongDialog'
import { useTranslation } from 'react-i18next'

const SongsTabContent = () => {
    const { t } = useTranslation()
    return (
        <Card className="bg-zinc-800/50 border-zinc-700/50">
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='flex items-center gap-2'>
                            <Music className='size-5 text-purple-500' />
                            {t("songs.songs_library")}
                        </CardTitle>
                        <CardDescription>{t("songs.manage_tracks")}</CardDescription>
                    </div>
                    <AddSongDialog />
                </div>
            </CardHeader>

            <CardContent>
                <SongsTable />
            </CardContent>
        </Card>
    )
}

export default SongsTabContent