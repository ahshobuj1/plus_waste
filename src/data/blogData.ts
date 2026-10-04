export interface BlogPost {
  id: string;
  img: string;
  date: string;
  title: string;
  summary: string;
  links: { text: string; url: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "sample3",
    img: "/assets/image_109.jpg",
    date: "14 September",
    title: "Example post #1",
    summary: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.",
    links: [
      { text: "Book now", url: "#" },
      { text: "Call now", url: "#" }
    ]
  },
  {
    id: "sample2",
    img: "/assets/image_110.jpg",
    date: "28 August",
    title: "Example post #2",
    summary: "Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes.",
    links: [
      { text: "Learn more", url: "#" }
    ]
  },
  {
    id: "sample1",
    img: "/assets/image_111.jpg",
    date: "12 August",
    title: "Example post #3",
    summary: "Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.",
    links: []
  }
];
