import { useEffect, useState } from "react";
import Storyline from "./types/Storyline";
import StorylineOption from "./types/StorylineOption";
import "./App.scss";

function App() {
  const [storyline, setStoryline] = useState<Storyline | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  useEffect(() => {
    fetch("./storyline.json")
      .then(res => res.json())
      .then(setStoryline)
      .catch(console.error);
  }, []);

  const currentEvent = storyline?.events.find(event => event.id === currentEventId);

  const goToFirstEvent = () => {
    if (storyline) {
      setCurrentEventId(storyline?.events[0].id);
    }
  };

  const selectOption = (option: StorylineOption) => {
    if (typeof option.goto === "string") {
      setCurrentEventId(option.goto);
    } else {
      let random = Math.random();
      for (const [id, probability] of Object.entries(option.goto)) {
        if (probability > random) {
          setCurrentEventId(id);
          return;
        }
        random -= probability;
      }
    }
  };

  return (
    <div className="story-box" key={currentEventId}>
      {
        storyline !== null
        ? (
          currentEventId === null
            ? (
              <>
                <h1 className="story-box__title">{storyline.title}</h1>
                <p className="story-box__description">{storyline.description}</p>
                <div className="story-box__options-container">
                  <button
                    className="story-box__option"
                    onClick={goToFirstEvent}
                  >
                    Let's go
                  </button>
                </div>
              </>
            )
            : (currentEvent &&
              <>
                <h2 className="story-box__title">{currentEvent.title}</h2>
                <p className="story-box__description">{currentEvent.text}</p>
                <div className="story-box__options-container">
                  {currentEvent.options.length > 0
                    ? (
                      currentEvent.options.map((option, index) =>
                        <button
                          key={index}
                          onClick={() => selectOption(option)}
                          className="story-box__option"
                        >
                          {option.text}
                        </button>
                      )
                    )
                    : (
                      <button
                        onClick={() => setCurrentEventId(null)}
                        className="story-box__option"
                      >
                        Reset
                      </button>
                    )
                  }
                </div>
              </>
            )
        )
        : (
          <p>Loading</p>
        )
      }
    </div>
  );
}

export default App;
