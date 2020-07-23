import { cube } from "./SceneObjects";
import { stats, render } from "./setup";

let requestID;
const startAnimationLoop = () => {
  stats.begin();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  render();
  stats.end();
  requestID = window.requestAnimationFrame(startAnimationLoop);
};

export { startAnimationLoop, requestID };
