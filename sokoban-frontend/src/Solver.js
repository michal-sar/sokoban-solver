import React, { useState } from "react";
import { WallLeft, WallMiddle, WallRight } from "./Walls";
import { LevelSelection, MethodSelection } from "./Selection";
import Sokoban from "./Sokoban";
import "./Solver.css";

function Solver() {
  const [level, setLevel] = useState(1);
  const [method, setMethod] = useState("player");

  return (
    <main>
      <WallLeft />
      <WallMiddle />
      <WallRight />
      <section>
        <h1>Sokoban</h1>
        <LevelSelection level={level} setLevel={setLevel} />
        <Sokoban level={level} method={method} setMethod={setMethod} />
        <MethodSelection method={method} setMethod={setMethod} />
      </section>
    </main>
  );
}

export default Solver;
