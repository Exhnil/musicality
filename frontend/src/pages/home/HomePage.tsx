import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/store/useMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import SectionGrid from "./components/SectionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/store/usePlayerStore";

const HomePage = () => {

    const {
        fetchMadeForYouSongs,
        fetchTrendingSongs,
        fetchFeatureSongs,
        madeForYouSongs,
        trendingSongs,
        featuredSongs,
        isLoading,
    } = useMusicStore();

    const { initializeQueue } = usePlayerStore()

    useEffect(() => {
        fetchMadeForYouSongs();
        fetchTrendingSongs();
        fetchFeatureSongs();
    }, [fetchMadeForYouSongs, fetchTrendingSongs, fetchFeatureSongs]);

    useEffect(() => {
        if (madeForYouSongs.length > 0 && trendingSongs.length > 0 && featuredSongs.length > 0) {
            const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
            initializeQueue(allSongs);
        }
    }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs])

    return (
        <div className="rounded-md h-full bg-gradient-to-b from-zinc-800 to-zinc-800">
            <Topbar />
            <ScrollArea className="h-[calc(100vh-100px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
                    <FeaturedSection />

                    <div className="space-y-8">
                        <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
                        <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default HomePage