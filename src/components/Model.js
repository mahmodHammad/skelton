import { scene, render, camera, controls } from "./setup.js";
import { putBox, putLine } from "./SceneObjects";
import skelton from "../variables/skelton.js";
import { createPoles } from "./TextDisplayer";

import {
  extractBones,
  loadModel,
  getAbsolutePosition,
  getExactPosition,
  updatePlanes,
} from "./ModelLoader";

function createModel() {
  loadModel().then((gltf) => {
    scene.add(gltf.scene);

    const rootRangePosition = getAbsolutePosition(gltf);

    skelton.map(item=>{
      const headPos = getExactPosition(
        rootRangePosition,
        item.shift,
        item.direction
      );
      const helperPosition =headPos.helperPosition
      
      putBox(headPos.exactPosition);
      putLine(headPos.exactPosition,helperPosition);
      createPoles(item.label,helperPosition.x,helperPosition.y,helperPosition.z)
    })

    controls.addEventListener("change", (e) => {
      const cameraPosition = e.target.object.position;
      updatePlanes(cameraPosition);
    });
    render();
  });
}
function handleItemClick(item){
  console.log("item", item.target.id)
}

export { createModel ,handleItemClick};
