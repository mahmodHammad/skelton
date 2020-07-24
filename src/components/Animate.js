// import { cube } from "./SceneObjects";
import { stats, render,controls } from "./setup";

let requestID;
const startAnimationLoop = () => {
  stats.begin();
  render();
  controls.update()
  stats.end();
  requestID = window.requestAnimationFrame(startAnimationLoop);
};

export { startAnimationLoop, requestID };
