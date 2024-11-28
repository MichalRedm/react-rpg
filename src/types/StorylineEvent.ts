import StorylineOption from "./StorylineOption";

interface StorylineEvent {
  id: string;
  title: string;
  text: string;
  options?: StorylineOption[];
}

export default StorylineEvent;
