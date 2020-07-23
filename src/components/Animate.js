// import { cube } from "./SceneObjects";
import { stats, render } from "./setup";

let requestID;
const startAnimationLoop = () => {
  stats.begin();
  render();
  stats.end();
  requestID = window.requestAnimationFrame(startAnimationLoop);
};

export { startAnimationLoop, requestID };
