import { Song } from "../models/song.model.js";
import { config } from "dotenv";
import mongoose from "mongoose";

config();

const songs = [
  {
    title: "Ravens in the Fog",
    artist: "Iron Hollow",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "song/1.mp3",
    duration: 214,
  },
  {
    title: "Throne of Ashes",
    artist: "Mythril Crown",
    imageUrl: "/cover-images/2.jpg",
    audioUrl: "song/2.mp3",
    duration: 245,
  },
  {
    title: "Bloodfire Hymn",
    artist: "Blightborne",
    imageUrl: "/cover-images/3.jpg",
    audioUrl: "song/3.mp3",
    duration: 202,
  },
  {
    title: "Echoes from the Deep",
    artist: "Abyssian Rise",
    imageUrl: "/cover-images/4.jpg",
    audioUrl: "song/4.mp3",
    duration: 276,
  },
  {
    title: "Oath of the Forgotten",
    artist: "Runeblade",
    imageUrl: "/cover-images/5.jpg",
    audioUrl: "song/5.mp3",
    duration: 230,
  },
  {
    title: "Stormbound",
    artist: "Iron Hollow",
    imageUrl: "/cover-images/6.jpg",
    audioUrl: "song/6.mp3",
    duration: 189,
  },
  {
    title: "Fangs of the Moon",
    artist: "Wolfspire",
    imageUrl: "/cover-images/7.jpg",
    audioUrl: "song/7.mp3",
    duration: 221,
  },
  {
    title: "Crownless and Free",
    artist: "Mythril Crown",
    imageUrl: "/cover-images/8.jpg",
    audioUrl: "song/8.mp3",
    duration: 251,
  },
  {
    title: "Through Iron Skies",
    artist: "Stormwrought",
    imageUrl: "/cover-images/9.jpg",
    audioUrl: "song/9.mp3",
    duration: 239,
  },
  {
    title: "The Last Ember",
    artist: "Ashspire",
    imageUrl: "/cover-images/10.jpg",
    audioUrl: "song/10.mp3",
    duration: 205,
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Song.deleteMany({});

    await Song.insertMany(songs);
    console.log("Songs seeded succesfully");
  } catch (error) {
    console.log("Error seeding songs", error);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();
