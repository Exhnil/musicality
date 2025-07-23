import { Album } from "../models/album.model.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import { Song } from "../models/song.model.js";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Album.deleteMany({});
    await Song.deleteMany({});

    const createdSongs = await Song.insertMany([
      {
        title: "Ravens in the Fog",
        artist: "Iron Hollow",
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/songs/1.mp3",
        duration: 214,
      },
      {
        title: "Throne of Ashes",
        artist: "Mythril Crown",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/songs/2.mp3",
        duration: 245,
      },
      {
        title: "Bloodfire Hymn",
        artist: "Blightborne",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/songs/3.mp3",
        duration: 202,
      },
      {
        title: "Echoes from the Deep",
        artist: "Abyssian Rise",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/songs/4.mp3",
        duration: 276,
      },
      {
        title: "Oath of the Forgotten",
        artist: "Runeblade",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/songs/5.mp3",
        duration: 230,
      },
      {
        title: "Stormbound",
        artist: "Iron Hollow",
        imageUrl: "/cover-images/6.jpg",
        audioUrl: "/songs/6.mp3",
        duration: 189,
      },
      {
        title: "Fangs of the Moon",
        artist: "Wolfspire",
        imageUrl: "/cover-images/7.jpg",
        audioUrl: "/songs/7.mp3",
        duration: 221,
      },
      {
        title: "Crownless and Free",
        artist: "Mythril Crown",
        imageUrl: "/cover-images/8.jpg",
        audioUrl: "/songs/8.mp3",
        duration: 251,
      },
      {
        title: "Through Iron Skies",
        artist: "Stormwrought",
        imageUrl: "/cover-images/9.jpg",
        audioUrl: "/songs/9.mp3",
        duration: 239,
      },
      {
        title: "The Last Ember",
        artist: "Ashspire",
        imageUrl: "/cover-images/10.jpg",
        audioUrl: "/songs/10.mp3",
        duration: 205,
      },
    ]);

    const albums = [
      {
        title: "Winds of Ruin",
        artist: "Iron Hollow",
        imageUrl: "/albums/1.jpg",
        releaseYear: 2021,
        songs: createdSongs.slice(0, 1).map((song) => song._id),
      },
      {
        title: "Crownbreaker",
        artist: "Mythril Crown",
        imageUrl: "/albums/2.jpg",
        releaseYear: 2022,
        songs: createdSongs.slice(1, 2).map((song) => song._id),
      },
      {
        title: "Infernal Gospel",
        artist: "Blightborne",
        imageUrl: "/albums/3.jpg",
        releaseYear: 2020,
        songs: createdSongs.slice(2, 3).map((song) => song._id),
      },
      {
        title: "Deepchant",
        artist: "Abyssian Rise",
        imageUrl: "/albums/4.jpg",
        releaseYear: 2023,
        songs: createdSongs.slice(3, 4).map((song) => song._id),
      },
      {
        title: "Legends of the Fallen",
        artist: "Runeblade",
        imageUrl: "/albums/5.jpg",
        releaseYear: 2019,
        songs: createdSongs.slice(4, 5).map((song) => song._id),
      },
      {
        title: "Skyburn",
        artist: "Iron Hollow",
        imageUrl: "/albums/6.jpg",
        releaseYear: 2021,
        songs: createdSongs.slice(5, 6).map((song) => song._id),
      },
      {
        title: "Lunar Howl",
        artist: "Wolfspire",
        imageUrl: "/albums/7.jpg",
        releaseYear: 2022,
        songs: createdSongs.slice(6, 7).map((song) => song._id),
      },
      {
        title: "Embersong",
        artist: "Various Artists",
        imageUrl: "/albums/8.jpg",
        releaseYear: 2024,
        songs: createdSongs.slice(7, 10).map((song) => song._id),
      },
    ];

    const createdAlbums = await Album.insertMany(albums);

    for (let i = 0; i < createdAlbums.length; i++) {
      const album = createdAlbums[i];
      const albumSongs = albums[i].songs;

      await Song.updateMany(
        { _id: { $in: albumSongs } },
        { albumId: album._id }
      );
    }

    console.log("Albums seeded successfully");
  } catch (error) {
    console.log("Error seeding database", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
