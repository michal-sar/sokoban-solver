import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Sokoban.css";

const Layer0 = React.forwardRef((props, ref) => {
  return (
    <svg className="layer" id="layer0" viewBox="0 -0.5 244 244" ref={ref} />
  );
});
Layer0.displayName = "Layer0";

const Layer1 = React.forwardRef((props, ref) => {
  return (
    <svg className="layer" id="layer1" viewBox="0 -0.5 244 244" ref={ref} />
  );
});
Layer1.displayName = "Layer1";

function drawGem(layer, x, y) {
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  let d = `M${x + 8} ${y + 5}h3M${x + 6} ${y + 6}h7M${x + 6} ${y + 7}h2M${x + 11} ${y + 7}h2M${x + 5} ${y + 8}h2M${x + 12} ${y + 8}h2M${x + 5} ${y + 9}h2M${x + 12} ${y + 9}h2M${x + 5} ${y + 10}h2M${x + 12} ${y + 10}h2M${x + 6} ${y + 11}h2M${x + 11} ${y + 11}h2M${x + 6} ${y + 12}h7M${x + 8} ${y + 13}h3`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#1af");
  layer.appendChild(path);

  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  d = `M${x + 8} ${y + 4}h3M${x + 6} ${y + 5}h2M${x + 11} ${y + 5}h2M${x + 5} ${y + 6}h1M${x + 13} ${y + 6}h1M${x + 5} ${y + 7}h1M${x + 8} ${y + 7}h3M${x + 13} ${y + 7}h1M${x + 4} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 11} ${y + 8}h1M${x + 14} ${y + 8}h1M${x + 4} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 11} ${y + 9}h1M${x + 14} ${y + 9}h1M${x + 4} ${y + 10}h1M${x + 7} ${y + 10}h1M${x + 11} ${y + 10}h1M${x + 14} ${y + 10}h1M${x + 5} ${y + 11}h1M${x + 8} ${y + 11}h3M${x + 13} ${y + 11}h1M${x + 5} ${y + 12}h1M${x + 13} ${y + 12}h1M${x + 6} ${y + 13}h2M${x + 11} ${y + 13}h2M${x + 8} ${y + 14}h3`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#111");
  layer.appendChild(path);
}

function drawWall(layer, x, y) {
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  let d = `M${x + 1} ${y + 1}h3M${x + 5} ${y + 1}h7M${x + 1} ${y + 2}h3M${x + 5} ${y + 2}h7M${x + 13} ${y + 2}h1M${x + 1} ${y + 3}h3M${x + 5} ${y + 3}h7M${x + 13} ${y + 3}h2M${x + 13} ${y + 4}h2M${x + 1} ${y + 5}h7M${x + 9} ${y + 5}h3M${x + 14} ${y + 5}h1M${x + 1} ${y + 6}h7M${x + 9} ${y + 6}h3M${x + 13} ${y + 6}h1M${x + 1} ${y + 7}h7M${x + 9} ${y + 7}h3M${x + 13} ${y + 7}h2M${x + 13} ${y + 8}h2M${x + 1} ${y + 9}h3M${x + 5} ${y + 9}h7M${x + 14} ${y + 9}h1M${x + 1} ${y + 10}h3M${x + 5} ${y + 10}h7M${x + 13} ${y + 10}h1M${x + 1} ${y + 11}h3M${x + 5} ${y + 11}h7M${x + 13} ${y + 11}h2M${x + 13} ${y + 12}h2M${x + 2} ${y + 13}h3M${x + 6} ${y + 13}h7M${x + 14} ${y + 13}h1M${x + 3} ${y + 14}h3M${x + 7} ${y + 14}h7`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#f11");
  layer.appendChild(path);

  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  d = `M${x}  ${y}h13M${x} ${y + 1}h1M${x + 4} ${y + 1}h1M${x + 12} ${y + 1}h2M${x} ${y + 2}h1M${x + 4} ${y + 2}h1M${x + 12} ${y + 2}h1M${x + 14} ${y + 2}h1M${x} ${y + 3}h1M${x + 4} ${y + 3}h1M${x + 12} ${y + 3}h1M${x + 15} ${y + 3}h1M${x} ${y + 4}h13M${x + 15} ${y + 4}h1M${x} ${y + 5}h1M${x + 8} ${y + 5}h1M${x + 12} ${y + 5}h2M${x + 15} ${y + 5}h1M${x} ${y + 6}h1M${x + 8} ${y + 6}h1M${x + 12} ${y + 6}h1M${x + 14} ${y + 6}h2M${x} ${y + 7}h1M${x + 8} ${y + 7}h1M${x + 12} ${y + 7}h1M${x + 15} ${y + 7}h1M${x} ${y + 8}h13M${x + 15} ${y + 8}h1M${x} ${y + 9}h1M${x + 4} ${y + 9}h1M${x + 12} ${y + 9}h2M${x + 15} ${y + 9}h1M${x} ${y + 10}h1M${x + 4} ${y + 10}h1M${x + 12} ${y + 10}h1M${x + 14} ${y + 10}h2M${x} ${y + 11}h1M${x + 4} ${y + 11}h1M${x + 12} ${y + 11}h1M${x + 15} ${y + 11}h1M${x} ${y + 12}h13M${x + 15} ${y + 12}h1M${x + 1} ${y + 13}h1M${x + 5} ${y + 13}h1M${x + 13} ${y + 13}h1M${x + 15} ${y + 13}h1M${x + 2} ${y + 14}h1M${x + 6} ${y + 14}h1M${x + 14} ${y + 14}h2M${x + 3} ${y + 15}h13`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#111");
  layer.appendChild(path);
}

function drawBox0(layer, x, y) {
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  let d = `M${x + 1} ${y + 1}h1M${x + 3} ${y + 1}h7M${x + 11} ${y + 1}h1M${x + 1} ${y + 2}h1M${x + 11} ${y + 2}h1M${x + 13} ${y + 2}h1M${x + 1} ${y + 3}h1M${x + 3} ${y + 3}h1M${x + 5} ${y + 3}h3M${x + 9} ${y + 3}h1M${x + 11} ${y + 3}h1M${x + 14} ${y + 3}h1M${x + 1} ${y + 4}h1M${x + 4} ${y + 4}h1M${x + 6} ${y + 4}h1M${x + 8} ${y + 4}h1M${x + 11} ${y + 4}h1M${x + 13} ${y + 4}h1M${x + 1} ${y + 5}h1M${x + 3} ${y + 5}h1M${x + 5} ${y + 5}h1M${x + 7} ${y + 5}h1M${x + 9} ${y + 5}h1M${x + 11} ${y + 5}h1M${x + 14} ${y + 5}h1M${x + 1} ${y + 6}h1M${x + 3} ${y + 6}h2M${x + 6} ${y + 6}h1M${x + 8} ${y + 6}h2M${x + 11} ${y + 6}h1M${x + 13} ${y + 6}h1M${x + 1} ${y + 7}h1M${x + 3} ${y + 7}h1M${x + 5} ${y + 7}h1M${x + 7} ${y + 7}h1M${x + 9} ${y + 7}h1M${x + 11} ${y + 7}h1M${x + 14} ${y + 7}h1M${x + 1} ${y + 8}h1M${x + 4} ${y + 8}h1M${x + 6} ${y + 8}h1M${x + 8} ${y + 8}h1M${x + 11} ${y + 8}h1M${x + 13} ${y + 8}h1M${x + 1} ${y + 9}h1M${x + 3} ${y + 9}h1M${x + 5} ${y + 9}h3M${x + 9} ${y + 9}h1M${x + 11} ${y + 9}h1M${x + 14} ${y + 9}h1M${x + 1} ${y + 10}h1M${x + 11} ${y + 10}h1M${x + 13} ${y + 10}h1M${x + 1} ${y + 11}h1M${x + 3} ${y + 11}h7M${x + 11} ${y + 11}h1M${x + 14} ${y + 11}h1M${x + 13} ${y + 12}h1M${x + 2} ${y + 13}h1M${x + 4} ${y + 13}h1M${x + 6} ${y + 13}h1M${x + 8} ${y + 13}h1M${x + 10} ${y + 13}h1M${x + 12} ${y + 13}h1M${x + 14} ${y + 13}h1M${x + 3} ${y + 14}h1M${x + 5} ${y + 14}h1M${x + 7} ${y + 14}h1M${x + 9} ${y + 14}h1M${x + 11} ${y + 14}h1M${x + 13} ${y + 14}h1`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#1fa");
  layer.appendChild(path);

  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  d = `M${x}  ${y}h13M${x} ${y + 1}h1M${x + 2} ${y + 1}h1M${x + 10} ${y + 1}h1M${x + 12} ${y + 1}h2M${x} ${y + 2}h1M${x + 2} ${y + 2}h9M${x + 12} ${y + 2}h1M${x + 14} ${y + 2}h1M${x} ${y + 3}h1M${x + 2} ${y + 3}h1M${x + 4} ${y + 3}h1M${x + 8} ${y + 3}h1M${x + 10} ${y + 3}h1M${x + 12} ${y + 3}h2M${x + 15} ${y + 3}h1M${x} ${y + 4}h1M${x + 2} ${y + 4}h2M${x + 5} ${y + 4}h1M${x + 7} ${y + 4}h1M${x + 9} ${y + 4}h2M${x + 12} ${y + 4}h1M${x + 14} ${y + 4}h2M${x} ${y + 5}h1M${x + 2} ${y + 5}h1M${x + 4} ${y + 5}h1M${x + 6} ${y + 5}h1M${x + 8} ${y + 5}h1M${x + 10} ${y + 5}h1M${x + 12} ${y + 5}h2M${x + 15} ${y + 5}h1M${x} ${y + 6}h1M${x + 2} ${y + 6}h1M${x + 5} ${y + 6}h1M${x + 7} ${y + 6}h1M${x + 10} ${y + 6}h1M${x + 12} ${y + 6}h1M${x + 14} ${y + 6}h2M${x} ${y + 7}h1M${x + 2} ${y + 7}h1M${x + 4} ${y + 7}h1M${x + 6} ${y + 7}h1M${x + 8} ${y + 7}h1M${x + 10} ${y + 7}h1M${x + 12} ${y + 7}h2M${x + 15} ${y + 7}h1M${x} ${y + 8}h1M${x + 2} ${y + 8}h2M${x + 5} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 9} ${y + 8}h2M${x + 12} ${y + 8}h1M${x + 14} ${y + 8}h2M${x} ${y + 9}h1M${x + 2} ${y + 9}h1M${x + 4} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 10} ${y + 9}h1M${x + 12} ${y + 9}h2M${x + 15} ${y + 9}h1M${x} ${y + 10}h1M${x + 2} ${y + 10}h9M${x + 12} ${y + 10}h1M${x + 14} ${y + 10}h2M${x} ${y + 11}h1M${x + 2} ${y + 11}h1M${x + 10} ${y + 11}h1M${x + 12} ${y + 11}h2M${x + 15} ${y + 11}h1M${x} ${y + 12}h13M${x + 14} ${y + 12}h2M${x + 1} ${y + 13}h1M${x + 3} ${y + 13}h1M${x + 5} ${y + 13}h1M${x + 7} ${y + 13}h1M${x + 9} ${y + 13}h1M${x + 11} ${y + 13}h1M${x + 13} ${y + 13}h1M${x + 15} ${y + 13}h1M${x + 2} ${y + 14}h1M${x + 4} ${y + 14}h1M${x + 6} ${y + 14}h1M${x + 8} ${y + 14}h1M${x + 10} ${y + 14}h1M${x + 12} ${y + 14}h1M${x + 14} ${y + 14}h2M${x + 3} ${y + 15}h13`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#111");
  layer.appendChild(path);
}

function drawBox1(layer, x, y) {
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  let d = `M${x + 1} ${y + 1}h1M${x + 3} ${y + 1}h7M${x + 11} ${y + 1}h1M${x + 1} ${y + 2}h1M${x + 11} ${y + 2}h1M${x + 13} ${y + 2}h1M${x + 1} ${y + 3}h1M${x + 3} ${y + 3}h1M${x + 5} ${y + 3}h3M${x + 9} ${y + 3}h1M${x + 11} ${y + 3}h1M${x + 14} ${y + 3}h1M${x + 1} ${y + 4}h1M${x + 4} ${y + 4}h1M${x + 6} ${y + 4}h1M${x + 8} ${y + 4}h1M${x + 11} ${y + 4}h1M${x + 13} ${y + 4}h1M${x + 1} ${y + 5}h1M${x + 3} ${y + 5}h1M${x + 5} ${y + 5}h1M${x + 7} ${y + 5}h1M${x + 9} ${y + 5}h1M${x + 11} ${y + 5}h1M${x + 14} ${y + 5}h1M${x + 1} ${y + 6}h1M${x + 3} ${y + 6}h2M${x + 6} ${y + 6}h1M${x + 8} ${y + 6}h2M${x + 11} ${y + 6}h1M${x + 13} ${y + 6}h1M${x + 1} ${y + 7}h1M${x + 3} ${y + 7}h1M${x + 5} ${y + 7}h1M${x + 7} ${y + 7}h1M${x + 9} ${y + 7}h1M${x + 11} ${y + 7}h1M${x + 14} ${y + 7}h1M${x + 1} ${y + 8}h1M${x + 4} ${y + 8}h1M${x + 6} ${y + 8}h1M${x + 8} ${y + 8}h1M${x + 11} ${y + 8}h1M${x + 13} ${y + 8}h1M${x + 1} ${y + 9}h1M${x + 3} ${y + 9}h1M${x + 5} ${y + 9}h3M${x + 9} ${y + 9}h1M${x + 11} ${y + 9}h1M${x + 14} ${y + 9}h1M${x + 1} ${y + 10}h1M${x + 11} ${y + 10}h1M${x + 13} ${y + 10}h1M${x + 1} ${y + 11}h1M${x + 3} ${y + 11}h7M${x + 11} ${y + 11}h1M${x + 14} ${y + 11}h1M${x + 13} ${y + 12}h1M${x + 2} ${y + 13}h1M${x + 4} ${y + 13}h1M${x + 6} ${y + 13}h1M${x + 8} ${y + 13}h1M${x + 10} ${y + 13}h1M${x + 12} ${y + 13}h1M${x + 14} ${y + 13}h1M${x + 3} ${y + 14}h1M${x + 5} ${y + 14}h1M${x + 7} ${y + 14}h1M${x + 9} ${y + 14}h1M${x + 11} ${y + 14}h1M${x + 13} ${y + 14}h1`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#f1a");
  layer.appendChild(path);

  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // prettier-ignore
  d = `M${x}  ${y}h13M${x} ${y + 1}h1M${x + 2} ${y + 1}h1M${x + 10} ${y + 1}h1M${x + 12} ${y + 1}h2M${x} ${y + 2}h1M${x + 2} ${y + 2}h9M${x + 12} ${y + 2}h1M${x + 14} ${y + 2}h1M${x} ${y + 3}h1M${x + 2} ${y + 3}h1M${x + 4} ${y + 3}h1M${x + 8} ${y + 3}h1M${x + 10} ${y + 3}h1M${x + 12} ${y + 3}h2M${x + 15} ${y + 3}h1M${x} ${y + 4}h1M${x + 2} ${y + 4}h2M${x + 5} ${y + 4}h1M${x + 7} ${y + 4}h1M${x + 9} ${y + 4}h2M${x + 12} ${y + 4}h1M${x + 14} ${y + 4}h2M${x} ${y + 5}h1M${x + 2} ${y + 5}h1M${x + 4} ${y + 5}h1M${x + 6} ${y + 5}h1M${x + 8} ${y + 5}h1M${x + 10} ${y + 5}h1M${x + 12} ${y + 5}h2M${x + 15} ${y + 5}h1M${x} ${y + 6}h1M${x + 2} ${y + 6}h1M${x + 5} ${y + 6}h1M${x + 7} ${y + 6}h1M${x + 10} ${y + 6}h1M${x + 12} ${y + 6}h1M${x + 14} ${y + 6}h2M${x} ${y + 7}h1M${x + 2} ${y + 7}h1M${x + 4} ${y + 7}h1M${x + 6} ${y + 7}h1M${x + 8} ${y + 7}h1M${x + 10} ${y + 7}h1M${x + 12} ${y + 7}h2M${x + 15} ${y + 7}h1M${x} ${y + 8}h1M${x + 2} ${y + 8}h2M${x + 5} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 9} ${y + 8}h2M${x + 12} ${y + 8}h1M${x + 14} ${y + 8}h2M${x} ${y + 9}h1M${x + 2} ${y + 9}h1M${x + 4} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 10} ${y + 9}h1M${x + 12} ${y + 9}h2M${x + 15} ${y + 9}h1M${x} ${y + 10}h1M${x + 2} ${y + 10}h9M${x + 12} ${y + 10}h1M${x + 14} ${y + 10}h2M${x} ${y + 11}h1M${x + 2} ${y + 11}h1M${x + 10} ${y + 11}h1M${x + 12} ${y + 11}h2M${x + 15} ${y + 11}h1M${x} ${y + 12}h13M${x + 14} ${y + 12}h2M${x + 1} ${y + 13}h1M${x + 3} ${y + 13}h1M${x + 5} ${y + 13}h1M${x + 7} ${y + 13}h1M${x + 9} ${y + 13}h1M${x + 11} ${y + 13}h1M${x + 13} ${y + 13}h1M${x + 15} ${y + 13}h1M${x + 2} ${y + 14}h1M${x + 4} ${y + 14}h1M${x + 6} ${y + 14}h1M${x + 8} ${y + 14}h1M${x + 10} ${y + 14}h1M${x + 12} ${y + 14}h1M${x + 14} ${y + 14}h2M${x + 3} ${y + 15}h13`;
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#111");
  layer.appendChild(path);
}

function drawSokoban(layer, x, y, sokoban) {
  let d;

  if (!state.victory && state.direction == "e") {
    switch (sokoban) {
      case 0:
        sokoban = 1;
        break;
      case 2:
        sokoban = 3;
        break;
      case 6:
        sokoban = 7;
        break;
    }
  }

  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  switch (sokoban) {
    case 0:
      // prettier-ignore
      d = `M${x + 6} ${y + 1}h2M${x + 6} ${y + 2}h2M${x + 7} ${y + 3}h1M${x + 5} ${y + 4}h5M${x + 5} ${y + 5}h5M${x + 5} ${y + 6}h5M${x + 5} ${y + 7}h5M${x + 5} ${y + 8}h2M${x + 8} ${y + 8}h2M${x + 6} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 6} ${y + 10}h1M${x + 8} ${y + 10}h1M${x + 5} ${y + 11}h2M${x + 8} ${y + 11}h1`;
      break;
    case 1:
      // prettier-ignore
      d = `M${x + 7} ${y + 1}h2M${x + 7} ${y + 2}h2M${x + 7} ${y + 3}h1M${x + 5} ${y + 4}h5M${x + 5} ${y + 5}h5M${x + 5} ${y + 6}h5M${x + 5} ${y + 7}h5M${x + 5} ${y + 8}h2M${x + 8} ${y + 8}h2M${x + 6} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 6} ${y + 10}h1M${x + 8} ${y + 10}h1M${x + 6} ${y + 11}h1M${x + 8} ${y + 11}h2`;
      break;
    case 2:
      // prettier-ignore
      d = `M${x + 4} ${y + 1}h1M${x + 6} ${y + 1}h2M${x + 9} ${y + 1}h2M${x + 4} ${y + 2}h1M${x + 6} ${y + 2}h2M${x + 10} ${y + 2}h1M${x + 4} ${y + 3}h1M${x + 7} ${y + 3}h1M${x + 10} ${y + 3}h1M${x + 5} ${y + 4}h5M${x + 6} ${y + 5}h3M${x + 6} ${y + 6}h3M${x + 6} ${y + 7}h3M${x + 6} ${y + 8}h1M${x + 8} ${y + 8}h1M${x + 6} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 6} ${y + 10}h1M${x + 8} ${y + 10}h1M${x + 5} ${y + 11}h2M${x + 8} ${y + 11}h1`;
      break;
    case 3:
      // prettier-ignore
      d = `M${x + 4} ${y + 1}h2M${x + 7} ${y + 1}h2M${x + 10} ${y + 1}h1M${x + 4} ${y + 2}h1M${x + 7} ${y + 2}h2M${x + 10} ${y + 2}h1M${x + 4} ${y + 3}h1M${x + 7} ${y + 3}h1M${x + 10} ${y + 3}h1M${x + 5} ${y + 4}h5M${x + 6} ${y + 5}h3M${x + 6} ${y + 6}h3M${x + 6} ${y + 7}h3M${x + 6} ${y + 8}h1M${x + 8} ${y + 8}h1M${x + 6} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 6} ${y + 10}h1M${x + 8} ${y + 10}h1M${x + 6} ${y + 11}h1M${x + 8} ${y + 11}h2`;
      break;
    case 4:
      // prettier-ignore
      d = `M${x + 6} ${y + 1}h2M${x + 6} ${y + 2}h2M${x + 3} ${y + 3}h1M${x + 7} ${y + 3}h1M${x + 3} ${y + 4}h7M${x + 6} ${y + 5}h4M${x + 3} ${y + 6}h6M${x + 6} ${y + 7}h3M${x + 6} ${y + 8}h1M${x + 8} ${y + 8}h1M${x + 6} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 6} ${y + 10}h1M${x + 8} ${y + 10}h1M${x + 5} ${y + 11}h2M${x + 8} ${y + 11}h1`;
      break;
    case 5:
      // prettier-ignore
      d = `M${x + 7} ${y + 1}h2M${x + 7} ${y + 2}h2M${x + 7} ${y + 3}h1M${x + 11} ${y + 3}h1M${x + 5} ${y + 4}h7M${x + 5} ${y + 5}h4M${x + 6} ${y + 6}h6M${x + 6} ${y + 7}h3M${x + 6} ${y + 8}h1M${x + 8} ${y + 8}h1M${x + 6} ${y + 9}h1M${x + 8} ${y + 9}h1M${x + 6} ${y + 10}h1M${x + 8} ${y + 10}h1M${x + 6} ${y + 11}h1M${x + 8} ${y + 11}h2`;
      break;
    case 6:
      // prettier-ignore
      d = `M${x + 5} ${y + 1}h2M${x + 8} ${y + 1}h1M${x + 6} ${y + 2}h1M${x + 8} ${y + 2}h1M${x + 6} ${y + 3}h1M${x + 8} ${y + 3}h1M${x + 6} ${y + 4}h1M${x + 8} ${y + 4}h1M${x + 6} ${y + 5}h3M${x + 6} ${y + 6}h3M${x + 6} ${y + 7}h3M${x + 5} ${y + 8}h5M${x + 4} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 10} ${y + 9}h1M${x + 4} ${y + 10}h1M${x + 6} ${y + 10}h2M${x + 10} ${y + 10}h1M${x + 4} ${y + 11}h1M${x + 6} ${y + 11}h2M${x + 9} ${y + 11}h2`;
      break;
    case 7:
      // prettier-ignore
      d = `M${x + 6} ${y + 1}h1M${x + 8} ${y + 1}h2M${x + 6} ${y + 2}h1M${x + 8} ${y + 2}h1M${x + 6} ${y + 3}h1M${x + 8} ${y + 3}h1M${x + 6} ${y + 4}h1M${x + 8} ${y + 4}h1M${x + 6} ${y + 5}h3M${x + 6} ${y + 6}h3M${x + 6} ${y + 7}h3M${x + 5} ${y + 8}h5M${x + 4} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 10} ${y + 9}h1M${x + 4} ${y + 10}h1M${x + 7} ${y + 10}h2M${x + 10} ${y + 10}h1M${x + 4} ${y + 11}h2M${x + 7} ${y + 11}h2M${x + 10} ${y + 11}h1`;
      break;
  }
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#ff1");
  layer.appendChild(path);

  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  switch (sokoban) {
    case 0:
      // prettier-ignore
      d = `M${x + 6} ${y}h2M${x + 5} ${y + 1}h1M${x + 8} ${y + 1}h1M${x + 5} ${y + 2}h1M${x + 8} ${y + 2}h1M${x + 5} ${y + 3}h2M${x + 8} ${y + 3}h2M${x + 4} ${y + 4}h1M${x + 10} ${y + 4}h1M${x + 4} ${y + 5}h1M${x + 10} ${y + 5}h1M${x + 4} ${y + 6}h1M${x + 10} ${y + 6}h1M${x + 4} ${y + 7}h1M${x + 10} ${y + 7}h1M${x + 4} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 10} ${y + 8}h1M${x + 5} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 9} ${y + 9}h1M${x + 5} ${y + 10}h1M${x + 7} ${y + 10}h1M${x + 9} ${y + 10}h1M${x + 4} ${y + 11}h1M${x + 7} ${y + 11}h1M${x + 9} ${y + 11}h1M${x + 5} ${y + 12}h2M${x + 8} ${y + 12}h2`;
      break;
    case 1:
      // prettier-ignore
      d = `M${x + 7} ${y}h2M${x + 6} ${y + 1}h1M${x + 9} ${y + 1}h1M${x + 6} ${y + 2}h1M${x + 9} ${y + 2}h1M${x + 5} ${y + 3}h2M${x + 8} ${y + 3}h2M${x + 4} ${y + 4}h1M${x + 10} ${y + 4}h1M${x + 4} ${y + 5}h1M${x + 10} ${y + 5}h1M${x + 4} ${y + 6}h1M${x + 10} ${y + 6}h1M${x + 4} ${y + 7}h1M${x + 10} ${y + 7}h1M${x + 4} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 10} ${y + 8}h1M${x + 5} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 9} ${y + 9}h1M${x + 5} ${y + 10}h1M${x + 7} ${y + 10}h1M${x + 9} ${y + 10}h1M${x + 5} ${y + 11}h1M${x + 7} ${y + 11}h1M${x + 10} ${y + 11}h1M${x + 5} ${y + 12}h2M${x + 8} ${y + 12}h2`;
      break;
    case 2:
      // prettier-ignore
      d = `M${x + 4} ${y}h1M${x + 6} ${y}h2M${x + 9} ${y}h2M${x + 3} ${y + 1}h1M${x + 5} ${y + 1}h1M${x + 8} ${y + 1}h1M${x + 11} ${y + 1}h1M${x + 3} ${y + 2}h1M${x + 5} ${y + 2}h1M${x + 8} ${y + 2}h2M${x + 11} ${y + 2}h1M${x + 3} ${y + 3}h1M${x + 5} ${y + 3}h2M${x + 8} ${y + 3}h2M${x + 11} ${y + 3}h1M${x + 4} ${y + 4}h1M${x + 10} ${y + 4}h1M${x + 5} ${y + 5}h1M${x + 9} ${y + 5}h1M${x + 5} ${y + 6}h1M${x + 9} ${y + 6}h1M${x + 5} ${y + 7}h1M${x + 9} ${y + 7}h1M${x + 5} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 9} ${y + 8}h1M${x + 5} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 9} ${y + 9}h1M${x + 5} ${y + 10}h1M${x + 7} ${y + 10}h1M${x + 9} ${y + 10}h1M${x + 4} ${y + 11}h1M${x + 7} ${y + 11}h1M${x + 9} ${y + 11}h1M${x + 5} ${y + 12}h2M${x + 8} ${y + 12}h2`;
      break;
    case 3:
      // prettier-ignore
      d = `M${x + 4} ${y}h2M${x + 7} ${y}h2M${x + 10} ${y}h1M${x + 3} ${y + 1}h1M${x + 6} ${y + 1}h1M${x + 9} ${y + 1}h1M${x + 11} ${y + 1}h1M${x + 3} ${y + 2}h1M${x + 5} ${y + 2}h2M${x + 9} ${y + 2}h1M${x + 11} ${y + 2}h1M${x + 3} ${y + 3}h1M${x + 5} ${y + 3}h2M${x + 8} ${y + 3}h2M${x + 11} ${y + 3}h1M${x + 4} ${y + 4}h1M${x + 10} ${y + 4}h1M${x + 5} ${y + 5}h1M${x + 9} ${y + 5}h1M${x + 5} ${y + 6}h1M${x + 9} ${y + 6}h1M${x + 5} ${y + 7}h1M${x + 9} ${y + 7}h1M${x + 5} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 9} ${y + 8}h1M${x + 5} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 9} ${y + 9}h1M${x + 5} ${y + 10}h1M${x + 7} ${y + 10}h1M${x + 9} ${y + 10}h1M${x + 5} ${y + 11}h1M${x + 7} ${y + 11}h1M${x + 10} ${y + 11}h1M${x + 5} ${y + 12}h2M${x + 8} ${y + 12}h2`;
      break;
    case 4:
      // prettier-ignore
      d = `M${x + 6} ${y}h2M${x + 5} ${y + 1}h1M${x + 8} ${y + 1}h1M${x + 3} ${y + 2}h1M${x + 5} ${y + 2}h1M${x + 8} ${y + 2}h1M${x + 2} ${y + 3}h1M${x + 4} ${y + 3}h3M${x + 8} ${y + 3}h2M${x + 2} ${y + 4}h1M${x + 10} ${y + 4}h1M${x + 3} ${y + 5}h3M${x + 10} ${y + 5}h1M${x + 2} ${y + 6}h1M${x + 9} ${y + 6}h1M${x + 3} ${y + 7}h3M${x + 9} ${y + 7}h1M${x + 5} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 9} ${y + 8}h1M${x + 5} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 9} ${y + 9}h1M${x + 5} ${y + 10}h1M${x + 7} ${y + 10}h1M${x + 9} ${y + 10}h1M${x + 4} ${y + 11}h1M${x + 7} ${y + 11}h1M${x + 9} ${y + 11}h1M${x + 5} ${y + 12}h2M${x + 8} ${y + 12}h2`;
      break;
    case 5:
      // prettier-ignore
      d = `M${x + 7} ${y}h2M${x + 6} ${y + 1}h1M${x + 9} ${y + 1}h1M${x + 6} ${y + 2}h1M${x + 9} ${y + 2}h1M${x + 11} ${y + 2}h1M${x + 5} ${y + 3}h2M${x + 8} ${y + 3}h3M${x + 12} ${y + 3}h1M${x + 4} ${y + 4}h1M${x + 12} ${y + 4}h1M${x + 4} ${y + 5}h1M${x + 9} ${y + 5}h3M${x + 5} ${y + 6}h1M${x + 12} ${y + 6}h1M${x + 5} ${y + 7}h1M${x + 9} ${y + 7}h3M${x + 5} ${y + 8}h1M${x + 7} ${y + 8}h1M${x + 9} ${y + 8}h1M${x + 5} ${y + 9}h1M${x + 7} ${y + 9}h1M${x + 9} ${y + 9}h1M${x + 5} ${y + 10}h1M${x + 7} ${y + 10}h1M${x + 9} ${y + 10}h1M${x + 5} ${y + 11}h1M${x + 7} ${y + 11}h1M${x + 10} ${y + 11}h1M${x + 5} ${y + 12}h2M${x + 8} ${y + 12}h2`;
      break;
    case 6:
      // prettier-ignore
      d = `M${x + 5} ${y}h2M${x + 8} ${y}h2M${x + 4} ${y + 1}h1M${x + 7} ${y + 1}h1M${x + 9} ${y + 1}h1M${x + 5} ${y + 2}h1M${x + 7} ${y + 2}h1M${x + 9} ${y + 2}h1M${x + 5} ${y + 3}h1M${x + 7} ${y + 3}h1M${x + 9} ${y + 3}h1M${x + 5} ${y + 4}h1M${x + 7} ${y + 4}h1M${x + 9} ${y + 4}h1M${x + 5} ${y + 5}h1M${x + 9} ${y + 5}h1M${x + 5} ${y + 6}h1M${x + 9} ${y + 6}h1M${x + 5} ${y + 7}h1M${x + 9} ${y + 7}h1M${x + 4} ${y + 8}h1M${x + 10} ${y + 8}h1M${x + 3} ${y + 9}h1M${x + 5} ${y + 9}h2M${x + 8} ${y + 9}h2M${x + 11} ${y + 9}h1M${x + 3} ${y + 10}h1M${x + 5} ${y + 10}h1M${x + 8} ${y + 10}h2M${x + 11} ${y + 10}h1M${x + 3} ${y + 11}h1M${x + 5} ${y + 11}h1M${x + 8} ${y + 11}h1M${x + 11} ${y + 11}h1M${x + 4} ${y + 12}h1M${x + 6} ${y + 12}h2M${x + 9} ${y + 12}h2`;
      break;
    case 7:
      // prettier-ignore
      d = `M${x + 5} ${y}h2M${x + 8} ${y}h2M${x + 5} ${y + 1}h1M${x + 7} ${y + 1}h1M${x + 10} ${y + 1}h1M${x + 5} ${y + 2}h1M${x + 7} ${y + 2}h1M${x + 9} ${y + 2}h1M${x + 5} ${y + 3}h1M${x + 7} ${y + 3}h1M${x + 9} ${y + 3}h1M${x + 5} ${y + 4}h1M${x + 7} ${y + 4}h1M${x + 9} ${y + 4}h1M${x + 5} ${y + 5}h1M${x + 9} ${y + 5}h1M${x + 5} ${y + 6}h1M${x + 9} ${y + 6}h1M${x + 5} ${y + 7}h1M${x + 9} ${y + 7}h1M${x + 4} ${y + 8}h1M${x + 10} ${y + 8}h1M${x + 3} ${y + 9}h1M${x + 5} ${y + 9}h2M${x + 8} ${y + 9}h2M${x + 11} ${y + 9}h1M${x + 3} ${y + 10}h1M${x + 5} ${y + 10}h2M${x + 9} ${y + 10}h1M${x + 11} ${y + 10}h1M${x + 3} ${y + 11}h1M${x + 6} ${y + 11}h1M${x + 9} ${y + 11}h1M${x + 11} ${y + 11}h1M${x + 4} ${y + 12}h2M${x + 7} ${y + 12}h2M${x + 10} ${y + 12}h1`;
      break;
  }
  path.setAttribute("d", d);
  path.setAttribute("stroke", "#111");
  layer.appendChild(path);
}

function isBox(board, i, j) {
  return board[i][j] == "0" || board[i][j] == "1";
}
function isGem(board, i, j) {
  return board[i][j] == "x" || board[i][j] == "1";
}
function isWall(board, i, j) {
  return board[i][j] == "#";
}

function drawGems(layer, board) {
  layer.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (isGem(board, i, j)) {
        drawGem(layer, j * 12, i * 12);
      }
    }
  }
}

function drawRestHorizontal(
  layer,
  board,
  shiftXS = 0,
  shiftYS = 0,
  shiftXB = 0,
  shiftYB = 0,
  positionXB = 0,
  positionYB = 0,
  sokoban = 0,
) {
  layer.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      switch (board[i][j]) {
        case "#":
          drawWall(layer, j * 12, i * 12);
          break;
        case "0":
          i == positionYB && j == positionXB
            ? drawBox0(layer, shiftXB + j * 12, shiftYB + i * 12)
            : drawBox0(layer, j * 12, i * 12);
          break;
        case "1":
          i == positionYB && j == positionXB
            ? drawBox1(layer, shiftXB + j * 12, shiftYB + i * 12)
            : drawBox1(layer, j * 12, i * 12);
          break;
        case "o":
          drawSokoban(layer, 0.5 + shiftXS + j * 12, shiftYS + i * 12, sokoban); // 0.5 (?)
          break;
        case "*":
          drawSokoban(layer, 0.5 + shiftXS + j * 12, shiftYS + i * 12, sokoban); // 0.5 (?)
          break;
      }
    }
  }
}

function drawRestVertical(
  layer,
  board,
  shiftXS = 0,
  shiftYS = 0,
  shiftXB = 0,
  shiftYB = 0,
  positionXB = 0,
  positionYB = 0,
  sokoban = 0,
) {
  layer.innerHTML = "";
  for (let i = 0; i < board[0].length; i++) {
    for (let j = 0; j < board.length; j++) {
      switch (board[j][i]) {
        case "#":
          drawWall(layer, i * 12, j * 12);
          break;
        case "0":
          j == positionYB && i == positionXB
            ? drawBox0(layer, shiftXB + i * 12, shiftYB + j * 12)
            : drawBox0(layer, i * 12, j * 12);
          break;
        case "1":
          j == positionYB && i == positionXB
            ? drawBox1(layer, shiftXB + i * 12, shiftYB + j * 12)
            : drawBox1(layer, i * 12, j * 12);
          break;
        case "o":
          drawSokoban(layer, 0.5 + shiftXS + i * 12, shiftYS + j * 12, sokoban); // 0.5 (?)
          break;
        case "*":
          drawSokoban(layer, 0.5 + shiftXS + i * 12, shiftYS + j * 12, sokoban); // 0.5 (?)
          break;
      }
    }
  }
}

function checkVictory(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].indexOf("x") != -1 || board[i].indexOf("*") != -1) {
      return false;
    }
  }
  state.victory = true;
  return true;
}

function movePossible(board, move) {
  for (let i = 0; i < board.length; i++) {
    let j = board[i].indexOf("o");
    if (j == -1) j = board[i].indexOf("*");
    if (j != -1) {
      switch (move) {
        case "n":
          if (
            isWall(board, i - 1, j) ||
            (isBox(board, i - 1, j) &&
              (isWall(board, i - 2, j) || isBox(board, i - 2, j)))
          ) {
            return false;
          }
          break;
        case "s":
          if (
            isWall(board, i + 1, j) ||
            (isBox(board, i + 1, j) &&
              (isWall(board, i + 2, j) || isBox(board, i + 2, j)))
          ) {
            return false;
          }
          break;
        case "e":
          if (
            isWall(board, i, j + 1) ||
            (isBox(board, i, j + 1) &&
              (isWall(board, i, j + 2) || isBox(board, i, j + 2)))
          ) {
            return false;
          }
          break;
        case "w":
          if (
            isWall(board, i, j - 1) ||
            (isBox(board, i, j - 1) &&
              (isWall(board, i, j - 2) || isBox(board, i, j - 2)))
          ) {
            return false;
          }
          break;
      }
      return true;
    }
  }
}

function updateBoard(board, i1, j1, i2, j2, i3, j3) {
  if (board[i2][j2] == ".") {
    board[i1][j1] = board[i1][j1] == "o" ? "." : "x";
    board[i2][j2] = "o";
  } else if (board[i2][j2] == "x") {
    board[i1][j1] = board[i1][j1] == "o" ? "." : "x";
    board[i2][j2] = "*";
  } else if (board[i2][j2] == "0") {
    if (board[i3][j3] == ".") {
      board[i1][j1] = board[i1][j1] == "o" ? "." : "x";
      board[i2][j2] = "o";
      board[i3][j3] = "0";
    } else if (board[i3][j3] == "x") {
      board[i1][j1] = board[i1][j1] == "o" ? "." : "x";
      board[i2][j2] = "o";
      board[i3][j3] = "1";
    }
  } else if (board[i2][j2] == "1") {
    if (board[i3][j3] == ".") {
      board[i1][j1] = board[i1][j1] == "o" ? "." : "x";
      board[i2][j2] = "*";
      board[i3][j3] = "0";
    } else if (board[i3][j3] == "x") {
      board[i1][j1] = board[i1][j1] == "o" ? "." : "x";
      board[i2][j2] = "*";
      board[i3][j3] = "1";
    }
  }
}

function makeMove(board, move) {
  for (let i = 0; i < board.length; i++) {
    let j = board[i].indexOf("o");
    if (j == -1) j = board[i].indexOf("*");
    if (j != -1) {
      switch (move) {
        case "n":
          updateBoard(board, i, j, i - 1, j, i - 2, j);
          break;
        case "s":
          updateBoard(board, i, j, i + 1, j, i + 2, j);
          break;
        case "e":
          updateBoard(board, i, j, i, j + 1, i, j + 2);
          break;
        case "w":
          updateBoard(board, i, j, i, j - 1, i, j - 2);
          break;
      }
      return board;
    }
  }
}

async function animatePath(layer, board, path) {
  state.ready = false;

  let move;
  let position;
  let boardCopy = [];
  for (let i = 0; i < board.length; i++) boardCopy[i] = board[i].slice();

  while (path.length) {
    move = path.shift();
    if (movePossible(boardCopy, move)) {
      position = 0;

      await new Promise((resolve) => {
        interval = setInterval(() => {
          if (position == 11) {
            resolve();
          }

          position++;

          let sokobanX;
          let sokobanY;

          for (sokobanY = 0; sokobanY < board.length; sokobanY++) {
            if (boardCopy[sokobanY].includes("o")) {
              sokobanX = boardCopy[sokobanY].indexOf("o");
              break;
            }
            if (boardCopy[sokobanY].includes("*")) {
              sokobanX = boardCopy[sokobanY].indexOf("*");
              break;
            }
          }

          switch (move) {
            case "n":
              // prettier-ignore
              boardCopy[sokobanY - 1][sokobanX] == '0' ||
                boardCopy[sokobanY - 1][sokobanX] == '1'
                  ? drawRestVertical(layer, boardCopy, 0, -position, 0, -position, sokobanX, sokobanY - 1, 2)
                  : drawRestVertical(layer, boardCopy, 0, -position);
              break;
            case "s":
              // prettier-ignore
              boardCopy[sokobanY + 1][sokobanX] == '0' ||
                boardCopy[sokobanY + 1][sokobanX] == '1'
                  ? drawRestVertical(layer, boardCopy, 0, position, 0, position, sokobanX, sokobanY + 1, 6)
                  : drawRestVertical(layer, boardCopy, 0, position);
              break;
            case "e":
              state.direction = "e";
              // prettier-ignore
              boardCopy[sokobanY][sokobanX + 1] == '0' ||
                boardCopy[sokobanY][sokobanX + 1] == '1'
                  ? drawRestHorizontal(layer, boardCopy, position, 0, position, 0, sokobanX + 1, sokobanY, 5)
                  : drawRestHorizontal(layer, boardCopy, position, 0);
              break;
            case "w":
              state.direction = "w";
              // prettier-ignore
              boardCopy[sokobanY][sokobanX - 1] == '0' ||
                boardCopy[sokobanY][sokobanX - 1] == '1'
                  ? drawRestHorizontal(layer, boardCopy, -position, 0, -position, 0, sokobanX - 1, sokobanY, 4)
                  : drawRestHorizontal(layer, boardCopy, -position, 0);
              break;
          }
        }, 15);
      }).then(() => {
        clearInterval(interval);
        if (path.length) boardCopy = makeMove(boardCopy, move);
      });
    }
    if (state.player) break;
  }
}

async function dance(layer, board) {
  let position = 0;
  interval = setInterval(frame, 200);

  function frame() {
    if (position == 8) {
      position = 0;
    } else {
      drawRestHorizontal(layer, board, 0, 0, 0, 0, 0, 0, position);
      position++;
    }
  }
}

var state = { direction: "e", victory: false, ready: true, player: true };

var interval;

var pengine;

const getDirection = (key) => {
  switch (key) {
    case "ArrowUp":
    case "w":
      return "n";
    case "ArrowDown":
    case "s":
      return "s";
    case "ArrowRight":
    case "d":
      return "e";
    case "ArrowLeft":
    case "a":
      return "w";
  }
  return null;
};

async function getProlog(url) {
  let response = await fetch(url);
  let urlText = await response.text();
  return urlText;
}

function Sokoban(props) {
  const sokoban = useRef(null);
  const layer0 = useRef(null);
  const layer1 = useRef(null);
  const { level, method, setMethod } = props;

  let board;

  const handleKeyDown = async (event) => {
    if (method != "player") return;
    event.preventDefault();
    if (!state.ready) return;
    const direction = getDirection(event.key);
    if (!direction) return;
    if (!movePossible(board, direction) || state.victory) return;

    await animatePath(layer1.current, board, [direction]);
    board = makeMove(board, direction);
    if (checkVictory(board)) dance(layer1.current, board);
    else state.ready = true;
  };

  async function loadLevel() {
    clearInterval(interval);
    state.victory = false;
    state.ready = true;
    await fetch(`/api/board/${level}/`)
      .then((response) => response.json())
      .then((data) => (board = JSON.parse(data.board)))
      .catch((error) => console.error(error));

    layer0.current.setAttribute(
      "viewBox",
      "0 -0.5 " + (board[0].length * 12 + 4) + " " + (board.length * 12 + 4),
    );
    layer1.current.setAttribute(
      "viewBox",
      "0 -0.5 " + (board[0].length * 12 + 4) + " " + (board.length * 12 + 4),
    );
    drawGems(layer0.current, board);
    drawRestHorizontal(layer1.current, board);
  }

  function loadMethod() {
    if (method != "player") {
      state.player = false;
      (async function () {
        let urlText = await getProlog("static/prolog.pl");

        if (pengine) pengine.destroy();
        pengine = new Pengine({
          oncreate: handleCreate,
          onoutput: handleOutput,
          onfailure: handleFailure,
          onSuccess: handleSuccess,
          destroy: false,
          application: "swish",
          server: "https://swish.swi-prolog.org/pengine",
          src_text: urlText,
        });

        function handleCreate() {
          let prologBoard = JSON.stringify(board).replaceAll('"', "'");
          pengine.ask(`start_${method}(${prologBoard})`);
        }

        async function handleOutput() {
          if (!state.player)
            await animatePath(layer1.current, board, this.data);
          if (!state.player) pengine.next();
        }

        function handleFailure() {
          console.log("Failure!");
        }

        function handleSuccess() {
          console.log("Success!");
        }
      })();
    } else {
      sokoban.current.focus();
      state.player = true;
    }
  }

  useEffect(() => {
    if (method == "player") {
      loadLevel();
      loadMethod();
    } else setMethod("player");
  }, [level]);

  useEffect(() => {
    loadLevel();
    loadMethod();
  }, [method]);

  return (
    <div
      className="sokoban"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      ref={sokoban}
    >
      <Layer0 ref={layer0} />
      <Layer1 ref={layer1} />
    </div>
  );
}

Sokoban.propTypes = {
  level: PropTypes.number,
  method: PropTypes.string,
  setMethod: PropTypes.func,
};

export default Sokoban;
