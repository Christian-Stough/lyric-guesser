export const artists: Artist[] = [
  {
    name: "Taylor Swift",
    id: 1,
    image: "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    songs: [
      "Bad Blood",
      "Blank Space",
      "Love Story",
      "Shake It Off",
      "You Belong With Me",
      "Delicate",
      "Wildest Dreams",
      "Style",
      "I Knew You Were Trouble",
      "22",
      "We Are Never Ever Getting Back Together",
      "Red",
      "Mean",
      "Mine",
      "The Man",
      "Lover",
      "Cardigan",
      "Exile",
      "The 1",
      "The Last Great American Dynasty",
    ],
  },
  {
    name: "Lil Wayne",
    id: 2,
    image: "https://i.scdn.co/image/ab6761610000e5ebc1c08e541eae3cc82c6988c4",
    songs: [
      "Lollipop",
      "6 Foot 7 Foot",
      "How To Love",
      "Mirror",
      "Mrs. Officer",
      "Drop The World",
      "Go DJ",
      "Got Money",
      "Fireman",
      "Right Above It",
      "Love Me",
      "She Will",
      "No Worries",
      "John",
    ],
  },
  {
    name: "Falling In Reverse",
    id: 3,
    image: "https://i.scdn.co/image/ab6761610000e5eb9c2da8f3600db8c68d1979ba",
    songs: [
      "Popular Monster",
      "The Drug In Me Is You",
      "Losing My Life",
      "Carry On",
      "Broken",
      "Just Like You",
      "Fashionably Late",
      "I'm Not a Vampire",
      "Alone",
      "Good Girls Bad Guys",
      "Raised by Wolves",
      "The Westerner",
    ],
  },
];

export interface Artist {
  name: string;
  id: number;
  image: string;
  songs: string[];
}
