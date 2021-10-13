import StoryCard from "./StoryCard";

const stories = [
  {
    name: "Waleed mirza",
    src: "https://picsum.photos/500/500?random=1",
    profile: "https://picsum.photos/200/300?random=1",
  },
  {
    name: "Kamran saifullah",
    src: "https://picsum.photos/500/500?random=1",
    profile: "https://picsum.photos/200/300?random=1",
  },
  {
    name: "Abdul rehamn",
    src: "https://picsum.photos/500/500?random=1",
    profile: "https://picsum.photos/200/300?random=1",
  },
  {
    name: "Hamza Mehbob",
    src: "https://picsum.photos/500/500?random=1",
    profile: "https://picsum.photos/200/300?random=1",
  },
  {
    name: "Sameer Shahid",
    src: "https://picsum.photos/500/500?random=1",
    profile: "https://picsum.photos/200/300?random=1",
  },
];
function Stories() {
  return (
    <div className="flex justify-center space-x-2 mx-auto">
      {stories.map((story) => {
        return (
          <StoryCard
            key={story.name}
            name={story.name}
            src={story.src}
            profile={story.profile}
          />
        );
      })}
    </div>
  );
}
export default Stories;
