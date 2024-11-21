interface StorylineOption {
  text: string;
  goto: string | { [id: string]: number }
}

export default StorylineOption;
