import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import "./Selection.css";

const LevelButtons = React.forwardRef((props, ref) => {
  return <div className="levelButtons" ref={ref} />;
});
LevelButtons.displayName = "LevelButtons";

var count;

function LevelSelection(props) {
  const levelButtons = useRef(null);
  const isMounted = useRef(false);
  const { level, setLevel } = props;

  useEffect(() => {
    async function effect() {
      await fetch(`/api/count/`)
        .then((response) => response.json())
        .then((data) => (count = data.count))
        .catch((error) => console.error(error));

      for (let i = 0; i < count; i++) {
        var button = document.createElement("button");
        button.textContent = i + 1;
        button.className = "levelButton";
        if (i + 1 == level) {
          button.className += " active";
        }
        button.addEventListener("click", () => setLevel(i + 1), false);
        levelButtons.current.appendChild(button);
      }
      button.id = "last";
    }
    effect();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      levelButtons.current.innerHTML = "";
      for (let i = 0; i < count; i++) {
        var button = document.createElement("button");
        button.textContent = i + 1;
        button.className = "levelButton";
        if (i + 1 == level) {
          button.className += " active";
        }
        button.addEventListener("click", () => setLevel(i + 1), false);
        levelButtons.current.appendChild(button);
      }
      button.id = "last";
    } else {
      isMounted.current = true;
    }
  }, [level]);

  return (
    <div>
      <SimpleBar scrollbarMinSize={234} scrollbarMaxSize={234}>
        <LevelButtons ref={levelButtons} />
      </SimpleBar>
    </div>
  );
}

LevelSelection.propTypes = {
  level: PropTypes.number,
  setLevel: PropTypes.func,
};

function MethodSelection(props) {
  const { method, setMethod } = props;
  return (
    <div className="methodButtons">
      <button
        className={`methodButton ${method == "player" ? "active" : ""}`}
        onClick={() => setMethod("player")}
      >
        Player
      </button>
      <button
        className={`methodButton ${method == "iterative" ? "active" : ""}`}
        onClick={() => setMethod("iterative")}
      >
        Iterative deepening
      </button>
      <button
        disabled={true}
        className={`methodButton ${method == "astar" ? "active" : ""}`}
        id="astar"
        onClick={() => setMethod("astar")}
      >
        A*
      </button>
    </div>
  );
}

MethodSelection.propTypes = {
  method: PropTypes.string,
  setMethod: PropTypes.func,
};

export { LevelSelection, MethodSelection };
