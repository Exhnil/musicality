import { useMusicStore } from "@/store/useMusicStore"
import { LibraryIcon, ListMusic, PlayCircle, Users2 } from "lucide-react"
import StatsCard from "./StatsCard"
import { useTranslation } from "react-i18next"

const DashboardStats = () => {

    const { stats } = useMusicStore()
    const { t } = useTranslation()

    const statsData = [
        {
            icon: ListMusic,
            label: t("dashboard.total_songs"),
            value: stats.totalSongs.toString(),
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-500"
        },
        {
            icon: LibraryIcon,
            label: t("dashboard.total_albums"),
            value: stats.totalAlbums.toString(),
            bgColor: "bg-violet-500/10",
            iconColor: "text-violet-500"
        },
        {
            icon: Users2,
            label: t("dashboard.total_artists"),
            value: stats.totalArtist.toString(),
            bgColor: "bg-orange-500/10",
            iconColor: "text-orange-500"
        },
        {
            icon: PlayCircle,
            label: t("dashboard.total_users"),
            value: stats.totalUsers.toLocaleString(),
            bgColor: "bg-sky-500/10",
            iconColor: "text-sky-500"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat) => (
                <StatsCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    bgColor={stat.bgColor}
                    iconColor={stat.iconColor}
                />
            ))}
        </div>
    )
}

export default DashboardStats