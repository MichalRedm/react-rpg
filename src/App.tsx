import { useEffect, useState } from "react";
import Storyline from "./types/Storyline";
import "./App.scss";

function App() {
  const [storyline, setStoryline] = useState<Storyline | null>(null);

  useEffect(() => {
    fetch("./storyline.json")
      .then(res => res.json())
      .then(setStoryline)
      .catch(console.error);
  }, []);

  return storyline !== null
    ? (
      <>
        <p>{storyline.title}</p>
      </>
    )
    : (
      <p>Loading</p>
    );
}

export default App;
