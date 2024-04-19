export const artists: Artist[] = [
  {
    name: "Taylor Swift",
    id: 1,
    image: "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
    songs: [
      "Bad Blood",
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
      "The Drug In Me Is You",
      "Popular Monster",
      "Losing My Life",
      "Just Like You",
      "Fashionably Late",
      "Alone",
      "Good Girls Bad Guys",
      "Raised by Wolves",
      "The Westerner",
    ],
  },
  {
    name: "The Birthday Massacre",
    id: 4,
    image: "https://i.scdn.co/image/ab67616100005174916d2275e3b91d069e6e7683",
    songs: [
      "Red Stars",
      "Looking Glass",
      "In The Dark",
      "Blue",
      "To Die For",
      "Kill The Lights",
    ],
  },
  {
    name: "Lil Dicky",
    id: 5,
    image: "https://i.scdn.co/image/ab6761610000e5ebfd1780645d82ecbc3b5253cb",
    songs: ["Freaky Friday", "Earth", "Professional Rapper", "Pillow Talking"],
  },
  {
    name: "Olivia Rodrigo",
    id: 6,
    image: "https://i.scdn.co/image/ab6761610000e5ebe03a98785f3658f0b6461ec4",
    songs: [
      "good 4 u",
      "drivers license",
      "deja vu",
      "traitor",
      "brutal",
      "enough for you",
      "happier",
      "jealousy, jealousy",
      "favorite crime",
      "1 step forward, 3 steps back",
    ],
  },
];

export interface Artist {
  name: string;
  id: number;
  image: string;
  songs: string[];
}
