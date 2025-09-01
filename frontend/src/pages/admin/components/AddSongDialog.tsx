/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { axiosInstance } from '@/lib/axios'
import { useMusicStore } from '@/store/useMusicStore'
import { Plus, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

interface NewSong {
    title: string;
    album: string;
    duration: string;
    artist: string;
}

export const AddSongDialog = () => {

    const { albums } = useMusicStore()
    const { t } = useTranslation()

    const [songDialogOpen, setSongDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newSong, setNewSong] = useState<NewSong>({
        title: "",
        artist: "",
        album: "",
        duration: "0"
    })
    const [files, setFiles] = useState<{
        audio: File | null, image: File | null
    }>({
        audio: null,
        image: null
    })

    const audioInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (!files.audio || !files.image) {
                return toast.error(t("errors.upload_both_image_audio"))
            }

            const formData = new FormData()
            formData.append("title", newSong.title)
            formData.append("artist", newSong.artist)
            formData.append("duration", newSong.duration)
            if (newSong.album && newSong.album !== "none") {
                formData.append("albumId", newSong.album)
            }
            formData.append("audioFile", files.audio)
            formData.append("imageFile", files.image)

            await axiosInstance.post("/admin/songs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })

            setNewSong({
                title: "",
                artist: "",
                album: "",
                duration: "0"
            })

            setFiles({
                audio: null,
                image: null
            })

            toast.success(t("songs.song_created"))
        } catch (error: any) {
            toast.error(t("errors.song_failed") + error.response.data.message)
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
            <DialogTrigger asChild>
                <Button className='bg-purple-500 hover:bg-purple-600 text-black'>
                    <Plus className='mr-2 h-4 w-4' />
                    {t("songs.add_song")}
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80hv] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>{t("songs.add_new_song")}</DialogTitle>
                    <DialogDescription>{t("songs.add_new_song_description")}</DialogDescription>
                </DialogHeader>

                <div className='space-y-4 py-4'>
                    <input
                        type='file'
                        accept='audio/*'
                        ref={audioInputRef}
                        hidden
                        onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))} />

                    <input
                        type='file'
                        accept='image/*'
                        ref={imageInputRef}
                        hidden
                        onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))} />

                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className='text-center'>
                            {files.image ? (
                                <div className='space-y-2'>
                                    <div className='text-sm text-purple-500'>{t("songs.image_selected")}</div>
                                    <div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
                                </div>
                            ) : (
                                <div>
                                    <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                                        <Upload className='h-6 w-6 text-zinc-400' />
                                    </div>
                                    <div className='text-sm text-zinc-400 mb-2'>{t("songs.upload_cover")}</div>
                                    <Button variant="outline" size="sm" className='text-xs'>
                                        {t("ui.choose_file")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>{t("songs.audio_file")}</label>
                        <div className='flex items-center gap-2'>
                            <Button variant="outline" onClick={() => audioInputRef.current?.click()} className='w-full'>
                                {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
                            </Button>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>{t("songs.title")}</label>
                        <Input
                            value={newSong.title}
                            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>{t("songs.artist")}</label>
                        <Input
                            value={newSong.artist}
                            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>{t("songs.duration_seconds")}</label>
                        <Input
                            type="number"
                            min="0"
                            value={newSong.duration}
                            onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>{t("songs.album_optional")}</label>
                        <Select
                            value={newSong.album}
                            onValueChange={(value) => setNewSong({ ...newSong, album: value })}
                        >
                            <SelectTrigger className='bg-zinc-800 border-zinc-700'>
                                <SelectValue placeholder={t("ui.select_album_placeholder")} />
                            </SelectTrigger>
                            <SelectContent className='bg-zinc-800 border-zinc-800' >
                                <SelectItem value='none'>{t("songs.no_album_single")}</SelectItem>
                                {albums.map((album) => (
                                    <SelectItem key={album._id} value={album._id}>
                                        {album.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setSongDialogOpen(false)} disabled={isLoading}>
                        {t("ui.cancel")}
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? t("songs.uploading") : t("songs.add_song")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
