import React from "react";
import "./Walls.css";

function WallLeft() {
  return (
    <svg
      className="WallLeft"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 3 16"
      shapeRendering="crispEdges"
    >
      <path
        stroke="#111"
        d="M0 0h3M0 1h1M0 2h1M0 3h1M0 4h3M0 5h1M0 6h1M0 7h1M0 8h3M0 9h1M0 10h1M0 11h1M0 12h3M1 13h1M2 14h1"
      />
      <path
        stroke="#f11"
        d="M1 1h2M1 2h2M1 3h2M1 5h2M1 6h2M1 7h2M1 9h2M1 10h2M1 11h2M2 13h1"
      />
    </svg>
  );
}

function WallMiddle() {
  return <div className="WallMiddle"></div>;
}

function WallRight() {
  return (
    <svg
      className="WallRight"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 4 16"
      shapeRendering="crispEdges"
    >
      <path
        stroke="#111"
        d="M0 0h1M0 1h2M0 2h1M2 2h1M0 3h1M3 3h1M0 4h1M3 4h1M0 5h2M3 5h1M0 6h1M2 6h2M0 7h1M3 7h1M0 8h1M3 8h1M0 9h2M3 9h1M0 10h1M2 10h2M0 11h1M3 11h1M0 12h1M3 12h1M1 13h1M3 13h1M2 14h2"
      />
      <path
        stroke="#f11"
        d="M1 2h1M1 3h2M1 4h2M2 5h1M1 6h1M1 7h2M1 8h2M2 9h1M1 10h1M1 11h2M1 12h2M2 13h1"
      />
      <path stroke="#999" d="M1 0h1" />
    </svg>
  );
}

export { WallLeft, WallMiddle, WallRight };
