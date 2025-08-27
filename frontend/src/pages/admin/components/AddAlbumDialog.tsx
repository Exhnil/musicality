/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios"
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next";

interface NewAlbum {
    title: string;
    artist: string;
    releaseYear: string
}

const AddAlbumDialog = () => {
    const { t } = useTranslation()
    const [albumDialogOpen, setAlbumDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newAlbum, setNewAlbum] = useState<NewAlbum>({
        title: "",
        artist: "",
        releaseYear: ""
    })

    const [imageFile, setImageFile] = useState<File | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            if (!imageFile) {
                return toast.error("Please upload an image")
            }

            const formData = new FormData();
            formData.append("title", newAlbum.title)
            formData.append("artist", newAlbum.artist)
            formData.append("releaseYear", newAlbum.releaseYear.toString())
            formData.append("imageFile", imageFile)

            await axiosInstance.post("/admin/albums", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            setNewAlbum({
                title: "",
                artist: "",
                releaseYear: ""
            })

            setImageFile(null)
            setAlbumDialogOpen(false)
            toast.success("Album created successfully")

        } catch (error: any) {
            toast.error("Failed to create album: " + error.message)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-violet-500 hover:bg-violet-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    {t("albums.add_album")}
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-700">
                <DialogHeader>
                    <DialogTitle>{t("albums.add_new_album")}</DialogTitle>
                    <DialogDescription>{t("albums.add_new_album_description")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="flex items-center justify-center p-6 border-2 border-dashed
                     border-zinc-700 rounded-lg cursor-pointer"
                        onClick={() => { fileInputRef.current?.click() }}
                    >
                        <div className="text-center">
                            <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                <Upload className="h-6 w-6 text-zinc-400" />
                            </div>
                            <div className="text-sm text-zinc-400 mb-2">
                                {imageFile ? imageFile.name : "Upload album cover"}
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                                {t("ui.choose_file")}
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("albums.title")}</label>
                        <Input
                            value={newAlbum.title}
                            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                            placeholder="Enter album title"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("albums.artist")}</label>
                        <Input
                            value={newAlbum.artist}
                            onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                            placeholder="Enter album artist"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("albums.release_year")}</label>
                        <Input
                            type="number"
                            value={newAlbum.releaseYear}
                            onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                            placeholder="Enter release year"
                            min={1900}
                            max={new Date().getFullYear()}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setAlbumDialogOpen(false)} disabled={isLoading}>
                        {t("ui.cancel")}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-violet-500 hover:bg-violet-600"
                        disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}>
                        {isLoading ? t("albums.creating") : t("albums.add_album")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddAlbumDialog