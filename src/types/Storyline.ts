import StorylineEvent from "./StorylineEvent";

interface Storyline {
  title: string;
  description: string;
  events: StorylineEvent[];
}

export default Storyline;
